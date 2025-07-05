import { type inferAsyncReturnType } from '@trpc/server';
import { type CreateNextContextOptions } from '@trpc/server/adapters/next';
import { type FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';
import { getSession } from '@utils/server.util';
import type { NextApiRequest } from 'next';

import { prisma } from '../db/client';
import * as jwt from 'jsonwebtoken';

/** Use this helper for:
 * - testing, so we dont have to mock Next.js' req/res
 * - trpc's `createSSGHelpers` where we don't have req/res
 * @see https://beta.create.t3.gg/en/usage/trpc#-servertrpccontextts
 **/
export const createContextInner = async () => {
	return {
		prisma,
	};
};

/**
 * Context for Pages Router (API routes)
 * This is the actual context you'll use in your pages router
 * @link https://trpc.io/docs/context
 **/
export const createContext = async (opts: CreateNextContextOptions) => {
	const session = (await getSession(opts, prisma)) as string | null;
	const req = opts.req as NextApiRequest;

	return {
		session,
		req,
		prisma,
	};
};

/**
 * Context for App Router (Route Handlers)
 * This context is used with the fetch adapter in app router
 **/
export const createContextApp = async (opts: FetchCreateContextFnOptions) => {
	// For app router, we need to extract session differently since we don't have res
	// You might need to adjust this based on how your getSession function works
	const session = await getSessionFromRequest(opts.req);
	
	return {
		session,
		req: opts.req,
		prisma,
	};
};

// Helper function to get session from request in app router context
async function getSessionFromRequest(req: Request): Promise<string | null> {
	try {
		const cookies = req.headers.get('cookie');
		if (!cookies) return null;
		const tokenCookie = cookies
			.split(';')
			.find(c => c.trim().startsWith('token='));
		if (!tokenCookie) return null;
		const token = tokenCookie.split('=')[1];
		const secret = process.env.JWT_SECRET as string;
		if (!token || !secret) return null;
		const decoded = jwt.verify(token, secret) as { id: string };
		const userData = await prisma.user.findUnique({ where: { id: decoded.id } });
		if (userData?.isBlacklisted) return null;
		return decoded.id;
	} catch (error) {
		console.error('Error extracting session:', error);
		return null;
	}
}

export type Context = inferAsyncReturnType<typeof createContext>;
export type ContextApp = inferAsyncReturnType<typeof createContextApp>;