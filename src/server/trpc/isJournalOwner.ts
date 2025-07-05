import { TRPCError } from '@trpc/server'
import type { Context } from '../trpc/context'

/**
 * Middleware to ensure the user is the owner of the journal.
 * Expects the input to have a `journalId` property and the context to have the user id.
 */
import { MiddlewareBuilder } from '@trpc/server'
import { Context } from '../trpc/context'

export const isJournalOwner = (t: MiddlewareBuilder<Context>) =>
    // Explicitly type next as () => Promise<unknown>
    t.middleware(async (opts: { ctx: Context; next: () => Promise<unknown>; input: { journalId: string } }) => {
        const { ctx, next, input } = opts
        const { prisma, user } = ctx
        const journalId = input?.journalId
        if (!journalId) {
            throw new TRPCError({ code: 'BAD_REQUEST', message: 'Missing journalId.' })
        }
        const journal = await prisma.journal.findUnique({ where: { id: journalId } })
        if (!journal || journal.userId !== user) {
            throw new TRPCError({ code: 'UNAUTHORIZED', message: 'You are not the owner of this journal.' })
        }
        return next()
    })
