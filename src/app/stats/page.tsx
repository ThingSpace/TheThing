import StatsClient from './StatsClient';
import { prisma } from '@server/db/client';
import { getCloudflareAnalytics } from '@utils/cloudflare';
import type { StatisticsProps } from '@utils/client.typing';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Statistics',
	description: 'The Server Statistics Of A Thing.',
	openGraph: {
		title: 'Statistics',
		description: 'The Server Statistics Of A Thing.',
		url: 'https://athing.space/stats',
		siteName: 'A Thing',
		images: ['/banner.png'],
		type: 'website',
		locale: 'en_US',
	},
	twitter: {
		site: '@theathingapp',
		card: 'summary_large_image',
		title: 'Statistics',
		description: 'The Server Statistics Of A Thing.',
		images: ['/banner.png'],
	},
};

async function getStats(): Promise<StatisticsProps> {
	const totalUserCount = await prisma.user.count();
	const last24HoursUserCount = await prisma.user.count({
		where: {
			createdAt: {
				gte: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
			},
		},
	});
	const postCount = await prisma.post.count({ where: { isPublished: true } });
	const journalCount = await prisma.journal.count({ where: { isPublic: true } });
	// uniqueCountries is not used in the layout, but you can add it if needed
	await getCloudflareAnalytics();
	return {
		totalUserCount,
		last24HoursUserCount,
		postCount,
		journalCount,
	};
}

export default async function StatsPage() {
	const stats = await getStats();
	return <StatsClient stats={stats} />;
}
