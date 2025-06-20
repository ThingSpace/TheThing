'use client';

import { trpcReact } from '@utils/trpc';
import { QueryClient } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { httpBatchLink, loggerLink } from '@trpc/client';
import superjson from 'superjson';

interface TRPCProviderProps {
	children: ReactNode;
	queryClient: QueryClient;
}

const trpcClient = trpcReact.createClient({
	links: [
		loggerLink({
			enabled: (opts) =>
				process.env.NODE_ENV === 'development' || 
				(opts.direction === 'down' && opts.result instanceof Error),
		}),
		httpBatchLink({
			url:
				typeof window !== 'undefined'
					? '/api/trpc'
					: process.env.VERCEL_URL
						? `https://${process.env.VERCEL_URL}/api/trpc`
						: `http://localhost:${process.env.PORT ?? 3000}/api/trpc`,
			transformer: superjson,
		}),
	],
});

export default function TRPCProvider({ children, queryClient }: TRPCProviderProps) {
	return (
		<trpcReact.Provider client={trpcClient} queryClient={queryClient}>
			{children}
		</trpcReact.Provider>
	);
}