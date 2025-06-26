import { z } from 'zod';
import { router, publicProcedure } from '../trpc';
import { hashPassword } from '@utils/server.util';
import { TRPCError } from '@trpc/server';

// Skill questions based on available, meaningful, and hard-to-guess data
const skillQuestions = [
	'What month and year did you create your account?',
	'What is the first word of your first journal entry title?',
	'What is the first word of your most recent note?',
	'What is the title of your first journal?',
	'What is the first word of your oldest journal entry (if you have one)?',
	'What theme number do you currently have set? (Enter a number from 1 to 10)',
];

export const recoverRouter = router({
	checkUsername: publicProcedure
		.input(z.object({ username: z.string().trim().min(3).max(30) }))
		.mutation(async ({ input, ctx }) => {
			const user = await ctx.prisma.user.findUnique({
				where: { username: input.username },
			});
			return { exists: !!user };
		}),
	verifyAnswers: publicProcedure
		.input(z.object({ username: z.string().trim(), answers: z.array(z.string()) }))
		.mutation(async ({ input, ctx }) => {
			const user = await ctx.prisma.user.findUnique({
				where: { username: input.username },
				include: {
					journals: { orderBy: { createdAt: 'asc' }, take: 1 },
					posts: { orderBy: { createdAt: 'desc' }, take: 1 },
				},
			});
			if (!user) return { correct: false }

			let correct = 0;

			// Q1: Account creation month/year
			const createdAt = user.createdAt;
			const expectedMonthYear = createdAt
				? `${createdAt.toLocaleString('default', { month: 'long' })} ${createdAt.getFullYear()}`
				: '';
			if (
				input.answers[0] &&
				expectedMonthYear &&
				input.answers[0].toLowerCase().replace(/\s+/g, '') === expectedMonthYear.toLowerCase().replace(/\s+/g, '')
			) {
				correct++;
			}

			// Q2: First word of first journal entry title
			const firstJournalTitle = user.journals?.[0]?.title || '';
			const expectedFirstJournalWord = firstJournalTitle.split(/\s+/)[0] || '';
			if (
				input.answers[1] &&
				expectedFirstJournalWord &&
				input.answers[1].toLowerCase() === expectedFirstJournalWord.toLowerCase()
			) {
				correct++;
			}

			// Q3: First word of most recent note
			const mostRecentNote = user.posts?.[0]?.text || '';
			const expectedFirstNoteWord = mostRecentNote.split(/\s+/)[0] || '';
			if (
				input.answers[2] &&
				expectedFirstNoteWord &&
				input.answers[2].toLowerCase() === expectedFirstNoteWord.toLowerCase()
			) {
				correct++;
			}

			// Q4: Title of first journal
			const expectedJournalTitle = user.journals?.[0]?.title || '';
			if (
				input.answers[3] &&
				expectedJournalTitle &&
				input.answers[3].toLowerCase() === expectedJournalTitle.toLowerCase()
			) {
				correct++;
			}

			// Q5: First word of oldest journal entry (if any)
			const oldestJournalEntry = user.journals?.[0]?.entries?.[0]?.text || '';
			const expectedFirstOldestEntryWord = oldestJournalEntry.split(/\s+/)[0] || '';
			if (
				input.answers[4] &&
				expectedFirstOldestEntryWord &&
				input.answers[4].toLowerCase() === expectedFirstOldestEntryWord.toLowerCase()
			) {
				correct++;
			}

			// Q6: Theme number (styling, 1-based)
			const expectedTheme = typeof user.styling === 'number' ? (user.styling + 1).toString() : '';
			if (
				input.answers[5] &&
				expectedTheme &&
				input.answers[5].replace(/\D/g, '') === expectedTheme
			) {
				correct++;
			}

			// Require at least 3/6 correct for recovery
			return { correct: correct >= 3 };
		}),
	updatePassword: publicProcedure
		.input(z.object({ username: z.string().trim(), password: z.string().min(8).max(100) }))
		.mutation(async ({ input, ctx }) => {
			const user = await ctx.prisma.user.findUnique({
				where: { username: input.username },
			});
			if (!user) throw new TRPCError({ code: 'NOT_FOUND', message: 'User not found.' });
			const hashed = await hashPassword(input.password);
			await ctx.prisma.user.update({
				where: { username: input.username },
				data: { password: hashed },
			});
			return { success: true };
		}),
});
