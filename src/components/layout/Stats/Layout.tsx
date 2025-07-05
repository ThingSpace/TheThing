'use client';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import type { StatisticsProps } from '@utils/client.typing';
import { IoArrowBack } from 'react-icons/io5';
import { formatNumber } from '@utils/client.util';

const StatsPage = ({ stats }: { stats: StatisticsProps }) => {
	const router = useRouter();
	return (
		<motion.div
			className={`flex h-screen w-screen flex-col items-center justify-center bg-opacity-[10%] bg-clouds-pattern p-10 font-spacemono font-semibold text-black`}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.5 }}>
			<div className="absolute left-10 top-10 flex">
				<button
					className="rounded-full border-2 bg-white p-2 text-black transition-colors duration-200 hover:bg-black hover:text-white"
					onClick={() => router.back()}>
					<IoArrowBack className="h-10 w-10" />
				</button>
			</div>
			<div className="flex flex-col gap-5 lg:flex-row">
				<div className="flex flex-col border-2 border-gray-300 bg-white p-5 hover:border-black">
					<h1 className="text-2xl">Total User Count</h1>
					<div className="flex flex-row items-end gap-2">
						<h3 className="mt-2 flex text-5xl font-bold">{formatNumber(stats.totalUserCount)}</h3>
						<p className="flex text-sm">Total Users</p>
					</div>
				</div>
				<div className="flex flex-col border-2 border-gray-300 bg-white p-5 hover:border-black">
					<h1 className="text-2xl">Daily Sign Up&apos;s</h1>
					<div className="flex flex-row items-end gap-2">
						<h3 className="mt-2 flex text-5xl font-bold">{formatNumber(stats.last24HoursUserCount)}</h3>
						<p className="flex text-sm">Users ( -24 hours)</p>
					</div>
				</div>
				<div className="flex flex-col border-2 border-gray-300 bg-white p-5 hover:border-black">
					<h1 className="text-2xl">Total Notes</h1>
					<div className="flex flex-row items-end gap-2">
						<h3 className="mt-2 flex text-5xl font-bold">{formatNumber(stats.postCount)}</h3>
						<p className="flex text-sm">Notes</p>
					</div>
				</div>
				<div className="flex flex-col border-2 border-gray-300 bg-white p-5 hover:border-black">
					<h1 className="text-2xl">Total Journals</h1>
					<div className="flex flex-row items-end gap-2">
						<h3 className="mt-2 flex text-5xl font-bold">{formatNumber(stats.journalCount)}</h3>
						<p className="flex text-sm">Journals</p>
					</div>
				</div>
			</div>
			<div className="mt-8 flex w-full items-center justify-center">
				<div className="rounded-md bg-gray-100 px-4 py-2 text-center text-sm text-gray-700 border border-gray-200 shadow-sm max-w-xl">
					Note: The data is precise and is calculated directly off the database every 30 minutes.
				</div>
			</div>
		</motion.div>
	);
};

export default StatsPage;
