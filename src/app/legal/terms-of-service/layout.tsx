import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Terms of Service',
	description: 'Terms of Service for A Thing.',
};

export default function LegalTermsOfServiceLayout({ children }: { children: React.ReactNode }) {
	return children;
}
