import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { appRouter } from '@server/trpc/router/_app';
import { createContextApp } from '@server/trpc/context';

export const runtime = 'nodejs';

// Make the handler async and await params
const handler = async (request: Request, context: { params: { endpoint: string } }) => {
	const { params } = context;
	return fetchRequestHandler({
		endpoint: `/api/recover/${params.endpoint}`,
		req: request,
		router: appRouter,
		createContext: createContextApp,
	});
};

export { handler as POST };
