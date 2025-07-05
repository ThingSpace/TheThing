import { z } from 'zod'
import { router, publicProcedure } from '../trpc'
import { hashPassword } from '@utils/server.util'
import { TRPCError } from '@trpc/server'

export const recoverRouter = router({
    checkUsername: publicProcedure
        .input(z.object({ username: z.string().trim().min(3).max(30) }))
        .mutation(async ({ input, ctx }) => {
            const user = await ctx.prisma.user.findUnique({
                where: { username: input.username }
            })
            return { exists: !!user }
        }),
    verifyAnswers: publicProcedure
        .input(z.object({ username: z.string().trim(), answers: z.array(z.string()) }))
        .mutation(async ({ input, ctx }) => {
            const user = await ctx.prisma.user.findUnique({
                where: { username: input.username },
                include: {
                    journals: { orderBy: { id: 'asc' }, take: 1 },
                    posts: { orderBy: { id: 'desc' }, take: 1 }
                }
            })
            if (!user) return { correct: false }

            let correct = 0

            // Q1: Account creation month/year
            const createdAt = user.createdAt
            const expectedMonthYear = createdAt
                ? `${createdAt.toLocaleString('default', { month: 'long' })} ${createdAt.getFullYear()}`
                : ''
            if (
                input.answers[0] &&
                expectedMonthYear &&
                input.answers[0].toLowerCase().replace(/\s+/g, '') ===
                    expectedMonthYear.toLowerCase().replace(/\s+/g, '')
            ) {
                correct++
            }

            // Q2: Title of first journal
            const expectedJournalTitle = user.journals?.[0]?.title || ''
            if (
                input.answers[1] &&
                expectedJournalTitle &&
                input.answers[1].toLowerCase() === expectedJournalTitle.toLowerCase()
            ) {
                correct++
            }

            // Q3: Theme number (styling, 0-based, so 0-10)
            const expectedTheme = typeof user.styling === 'number' ? user.styling.toString() : ''
            const acceptedThemeAnswers = [
                expectedTheme,
                (user.styling + 1).toString() // Accept both 0-based and 1-based answers
            ]
            if (
                input.answers[2] &&
                expectedTheme &&
                acceptedThemeAnswers.includes(input.answers[2].replace(/\D/g, ''))
            ) {
                correct++
            }

            // Q4: First word of most recent note
            const mostRecentNote = user.posts?.[0]?.text || ''
            const expectedFirstNoteWord = mostRecentNote.split(/\s+/)[0] || ''
            if (
                input.answers[3] &&
                expectedFirstNoteWord &&
                input.answers[3].toLowerCase() === expectedFirstNoteWord.toLowerCase()
            ) {
                correct++
            }

            // Require at least 2/4 correct for recovery
            return { correct: correct >= 2 }
        }),
    updatePassword: publicProcedure
        .input(z.object({ username: z.string().trim(), password: z.string().min(8).max(100) }))
        .mutation(async ({ input, ctx }) => {
            const user = await ctx.prisma.user.findUnique({
                where: { username: input.username }
            })
            if (!user) throw new TRPCError({ code: 'NOT_FOUND', message: 'User not found.' })
            const hashed = await hashPassword(input.password)
            await ctx.prisma.user.update({
                where: { username: input.username },
                data: { password: hashed }
            })
            return { success: true }
        })
})
