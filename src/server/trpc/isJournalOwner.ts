import { TRPCError } from '@trpc/server';
import type { Context } from '../trpc/context';

/**
 * Middleware to ensure the user is the owner of the journal.
 * Expects the input to have a `journalId` property and the context to have the user id.
 */
export const isJournalOwner = (t: any) =>
	t.middleware(async (opts: { ctx: any; next: any; input: any }) => {
		const { ctx, next, input } = opts;
		const { prisma, user } = ctx;
		const journalId = input?.journalId;
		if (!journalId) {
			throw new TRPCError({ code: 'BAD_REQUEST', message: 'Missing journalId.' });
		}
		const journal = await prisma.journal.findUnique({ where: { id: journalId } });
		if (!journal || journal.userId !== user) {
			throw new TRPCError({ code: 'UNAUTHORIZED', message: 'You are not the owner of this journal.' });
		}
		return next();
	});
