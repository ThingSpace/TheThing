import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'MIT License',
	description: 'MIT License for A Thing',
};

export default function LegalLicenseLayout({ children }: { children: React.ReactNode }) {
	return children;
}
