import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Cookie Policy',
	description: 'Cookie Policy for A Thing',
};

export default function LegalCookiePolicyLayout({ children }: { children: React.ReactNode }) {
	return children;
}
