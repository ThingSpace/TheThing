import { type Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
	title: 'Legal Information',
	description: 'Legal documents and policies for A Thing',
};

export default function LegalLayout({ children }: { children: React.ReactNode }) {
	return <>{children}</>;
}
