import { type Metadata } from 'next';
import Layout from '@components/layout/Help/Layout';

export const metadata: Metadata = {
	title: 'Help & FAQ',
	description: 'Frequently Asked Questions and Help for A Thing.',
	openGraph: {
		title: 'Help & FAQ',
		description: 'Frequently Asked Questions and Help for A Thing.',
		url: 'https://athing.space/help',
		siteName: 'A Thing',
		images: ['/banner.png'],
		type: 'website',
		locale: 'en_US',
	},
	twitter: {
		site: '@theathingapp',
		card: 'summary_large_image',
		title: 'Help & FAQ',
		description: 'Frequently Asked Questions and Help for A Thing.',
		images: ['/banner.png'],
	},
};

export default function HelpPage() {
	return <Layout />;
}
