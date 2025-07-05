import Layout from '@components/layout/Resources/Layout';
import { type Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Resources',
	description: 'Mental health resources and crisis support',
	openGraph: {
		title: 'Resources',
		description: 'Mental health resources and crisis support.',
		url: 'https://athing.space/resources',
		siteName: 'A Thing',
		images: ['/banner.png'],
		type: 'website',
		locale: 'en_US',
	},
	twitter: {
		site: '@theathingapp',
		card: 'summary_large_image',
		title: 'Resources',
		description: 'Mental health resources and crisis support.',
		images: ['/banner.png'],
	},
};

export default function Resources() {
	return <Layout />;
}
