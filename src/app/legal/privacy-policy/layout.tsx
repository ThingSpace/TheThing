import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Privacy Policy',
	description: 'Privacy Policy for A Thing.',
};

export default function LegalPrivacyPolicyLayout({ children }: { children: React.ReactNode }) {
	return children;
}
