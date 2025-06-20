import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Data Retention Policy',
	description: 'Data Retention Policy for A Thing',
};

export default function LegalDataRetentionLayout({ children }: { children: React.ReactNode }) {
	return children;
}
