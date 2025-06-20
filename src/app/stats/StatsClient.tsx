'use client';
import dynamic from 'next/dynamic';
import type { StatisticsProps } from '@utils/client.typing';

const StatsLayout = dynamic(() => import('@components/layout/Stats/Layout'), { ssr: false });

export default function StatsClient({ stats }: { stats: StatisticsProps }) {
	return <StatsLayout stats={stats} />;
}
