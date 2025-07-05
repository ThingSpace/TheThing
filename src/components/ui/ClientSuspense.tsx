'use client';
import { Suspense } from 'react';
import { FullScreenLoading, Loading } from '@components/ui/Loading';

export function ClientSuspense({ children }: { children: React.ReactNode }) {
	return (
		<Suspense fallback={<FullScreenLoading />}>
			{children}
		</Suspense>
	);
}
