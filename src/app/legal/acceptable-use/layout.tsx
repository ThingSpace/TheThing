import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Acceptable Use Policy',
	description: 'Acceptable Use Policy for A Thing',
};

export default function LegalAcceptableUseLayout({ children }: { children: React.ReactNode }) {
	return children;
}
