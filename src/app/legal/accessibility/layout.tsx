import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Accessibility Statement',
	description: 'Accessibility Statement for A Thing',
};

export default function LegalAccessibilityLayout({ children }: { children: React.ReactNode }) {
	return children;
}
