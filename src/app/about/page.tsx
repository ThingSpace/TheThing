import React from 'react';
import Layout from '@components/layout/About/Layout';
import { prisma } from '@server/db/client';
import { getCloudflareAnalytics } from '@utils/cloudflare';
import type { Metadata } from 'next';

interface AboutStats {
	userCount: number;
	notesCount: number;
	journalsCount: number;
	countriesCount: number;
}

async function getAboutStats(): Promise<AboutStats> {
	try {
		const [userCount, notesCount, journalsCount, countriesCountRaw] = await Promise.all([
			prisma.user.count(),
			prisma.post.count({ where: { isPublished: true } }),
			prisma.journal.count(),
			getCloudflareAnalytics(),
		]);
		const countriesCount = countriesCountRaw ?? 0;
		return {
			userCount,
			notesCount,
			journalsCount,
			countriesCount,
		};
	} catch (error) {
		console.error('Error fetching about stats:', error);
		return {
			userCount: 0,
			notesCount: 0,
			journalsCount: 0,
			countriesCount: 0,
		};
	}
}

export const metadata: Metadata = {
	title: 'About Us',
	description: 'Learn more about A Thing and our mission for anonymous self-expression.',
	openGraph: {
		title: 'About Us',
		description: 'Learn more about A Thing and our mission for anonymous self-expression.',
		url: 'https://athing.space/about',
		siteName: 'A Thing',
		images: ['/banner.png'],
		type: 'website',
		locale: 'en_US',
	},
	twitter: {
		site: '@theathingapp',
		card: 'summary_large_image',
		title: 'About Us',
		description: 'Learn more about A Thing and our mission for anonymous self-expression.',
		images: ['/banner.png'],
	},
};

export default async function AboutPage() {
	const stats = await getAboutStats();

	return <Layout stats={stats} />;
}
