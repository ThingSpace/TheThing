'use client';
import React from 'react';
import { type NextPage } from 'next';
import { motion } from 'framer-motion';

import { useRouter } from 'next/navigation';
import { IoArrowBack } from 'react-icons/io5';

const DataRetentionPage: NextPage = () => {
	const router = useRouter();

	return (
		<motion.div
			className="flex min-h-screen w-screen flex-col items-center justify-center bg-opacity-[10%] bg-clouds-pattern p-10 font-spacemono font-semibold text-black"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.5 }}>
			<div className="absolute left-5 top-5 cursor-pointer rounded-full bg-white p-2" onClick={() => router.back()}>
				<IoArrowBack className="h-10 w-10 p-2 text-black" />
			</div>
			<div className="flex w-full max-w-3xl flex-col gap-5 border-2 bg-white p-5 hover:border-black">
				<h1 className="text-4xl font-bold">Data Retention Policy</h1>
				<div className="flex flex-col gap-4">
					<section>
						<h2 className="text-xl font-bold">Active Account Data</h2>
						<p className="font-normal">
							- Public posts are retained until manually deleted by the user
							<br />
							- Private journals are stored encrypted and retained until deleted by the user
							<br />- Account metadata (creation date, settings) kept while account is active
						</p>
					</section>

					<section>
						<h2 className="text-xl font-bold">Account Deletion</h2>
						<p className="font-normal">
							When you delete your account:
							<br />
							- All posts and journals are permanently deleted within 24 hours
							<br />
							- Account metadata is immediately deleted
							<br />
							- Encrypted data is securely wiped
							<br />- No recovery is possible after deletion
						</p>
					</section>

					<section>
						<h2 className="text-xl font-bold">Inactive Accounts</h2>
						<p className="font-normal">
							- Accounts inactive for 2 years receive deletion warning
							<br />
							- After 2 years + 30 days, inactive accounts are automatically deleted
							<br />- Users can prevent deletion by logging in
						</p>
					</section>

					<section>
						<h2 className="text-xl font-bold">Backup Policy</h2>
						<p className="font-normal">
							- System backups are encrypted and retained for 30 days
							<br />
							- Backups are automatically purged after 30 days
							<br />- Deleted content is removed from backups within 30 days
						</p>
					</section>

					<section>
						<h2 className="text-xl font-bold">Data Export</h2>
						<p className="font-normal">
							Users can export their data at any time:
							<br />
							- Download all public posts
							<br />
							- Export private journals (encrypted)
							<br />- Request account metadata
						</p>
					</section>
				</div>
			</div>
		</motion.div>
	);
};

export default DataRetentionPage;
