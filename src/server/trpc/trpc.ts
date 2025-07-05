import { initTRPC, TRPCError } from '@trpc/server'
import { getClientInfo, rateLimiter } from '@utils/server.util'
import superjson from 'superjson'
import { type Context, type ContextApp } from './context'

const NODE_ENV = process.env.NODE_ENV as string

// Union type for both context types
type UnionContext = Context | ContextApp

const t = initTRPC.context<UnionContext>().create({
    transformer: superjson,
    errorFormatter({ shape }) {
        return shape
    }
})

/**
 * This middleware is used to check if the user is logged in by checking the session cookie.
 * A session cookie is set when the user logs in. It is an JWT token that contains the user's id.
 * @param ctx, the context of the request
 * @param next, the next middleware
 */
const isAuthenticated = t.middleware(async ({ ctx, next }) => {
    if (!ctx.session) {
        throw new TRPCError({ code: 'UNAUTHORIZED' })
    }

    return next({
        ctx: {
            user: ctx.session
        }
    })
})

const rateLimit = t.middleware(async ({ ctx, next }) => {
    // Getting the Client IP.
    if (NODE_ENV === 'production') {
        // Handle both NextApiRequest and Request types
        let clientInfo

        // Type guard: check if ctx.req.headers has a 'get' method (Fetch API Request)
        if (ctx.req && typeof ctx.req.headers === 'object' && typeof (ctx.req.headers as Headers).get === 'function') {
            // App Router - Request object
            const headers = ctx.req.headers as Headers
            const ip = headers.get('x-forwarded-for') || headers.get('x-real-ip') || 'unknown'
            const host = headers.get('host') || 'unknown'
            clientInfo = { ip, host }
        } else if (
            ctx.req &&
            typeof ctx.req.headers === 'object' &&
            // NextApiRequest: headers is a plain object, has cookies property
            'cookies' in ctx.req
        ) {
            // Pages Router - NextApiRequest
            clientInfo = getClientInfo(ctx.req)
        } else {
            // Fallback for unknown request types
            clientInfo = { ip: 'unknown', host: 'unknown' }
        }

        if (!clientInfo.ip || !clientInfo.host) {
            throw new TRPCError({ code: 'FORBIDDEN', message: 'The request is denied.' })
        }

        try {
            await rateLimiter.consume(clientInfo.ip, 2)
        } catch {
            throw new TRPCError({ code: 'TOO_MANY_REQUESTS', message: 'Too many requests.' })
        }
    }
    return next()
})

export const router = t.router

// This is the procedure for public routes
export const publicProcedure = t.procedure.use(rateLimit)

// This is the procedure for authenticated routes
export const protectedProcedure = t.procedure.use(isAuthenticated)
