import { z } from 'zod'
import { publicProcedure, router } from '../trpc'

export const mellowRouter = router({
    createSession: publicProcedure.mutation(async () => {
        const res = await fetch('https://api.mymellow.space/session/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ context: {} })
        })
        if (!res.ok) {
            let errorText = ''
            try {
                errorText = await res.text()
            } catch {}
            console.error('Mellow API session error:', res.status, errorText)
            throw new TRPCError({
                code: 'INTERNAL_SERVER_ERROR',
                message: `Failed to create session: ${res.status} ${errorText}`
            })
        }
        const data = await res.json()
        return data.sessionId || data.id || data.session_id
    }),

    sendMessage: publicProcedure
        .input(z.object({ sessionId: z.string(), message: z.string() }))
        .mutation(async ({ input }) => {
            const res = await fetch('https://api.mymellow.space/chat/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ sessionId: input.sessionId, message: input.message })
            })
            if (!res.ok) {
                let errorText = ''
                try {
                    errorText = await res.text()
                } catch {}
                console.error('Mellow API sendMessage error:', res.status, errorText)
                throw new TRPCError({
                    code: 'BAD_REQUEST',
                    message: `Failed to send message: ${res.status} ${errorText}`
                })
            }
            const data = await res.json()
            return data
        }),

    getHistory: publicProcedure.input(z.object({ sessionId: z.string() })).query(async ({ input }) => {
        try {
            const res = await fetch(`https://api.mymellow.space/chat/history/${input.sessionId}`)
            if (!res.ok) {
                console.warn(`Mellow API history not found: ${res.status}`)
                return []
            }
            const data = await res.json()
            return data || []
        } catch (err) {
            console.warn('Mellow API history fetch failed:', err)
            return []
        }
    })
})
