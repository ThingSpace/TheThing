import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'DMCA Policy',
	description: 'DMCA Policy for A Thing',
};

export default function LegalDMCALayout({ children }: { children: React.ReactNode }) {
	return children;
}
