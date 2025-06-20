'use client';
import React from 'react';
import { type NextPage } from 'next';
import { motion } from 'framer-motion';

import { useRouter } from 'next/navigation';
import { IoArrowBack } from 'react-icons/io5';

const AcceptableUsePage: NextPage = () => {
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
				<h1 className="text-4xl font-bold">Acceptable Use Policy</h1>
				<div className="flex flex-col gap-4">
					<section>
						<h2 className="text-xl font-bold">Permitted Use</h2>
						<p className="font-normal">
							- Personal expression and journaling
							<br />
							- Sharing experiences anonymously
							<br />
							- Supporting other community members
							<br />- Creative writing and storytelling
						</p>
					</section>

					<section>
						<h2 className="text-xl font-bold">Prohibited Content</h2>
						<p className="font-normal">
							- Hate speech or discrimination
							<br />
							- Personal attacks or harassment
							<br />
							- Explicit or adult content
							<br />
							- Spam or commercial promotion
							<br />
							- Impersonation or identity theft
							<br />- Malicious links or code
						</p>
					</section>

					<section>
						<h2 className="text-xl font-bold">Content Guidelines</h2>
						<p className="font-normal">
							- Keep interactions respectful
							<br />
							- Use content warnings when appropriate
							<br />
							- Avoid sharing identifiable information
							<br />- Report violations promptly
						</p>
					</section>

					<section>
						<h2 className="text-xl font-bold">Account Usage</h2>
						<p className="font-normal">
							- One account per person
							<br />
							- No automated posting
							<br />
							- No circumventing bans
							<br />- No exploitation of platform vulnerabilities
						</p>
					</section>

					<section>
						<h2 className="text-xl font-bold">Enforcement</h2>
						<p className="font-normal">
							- Violations result in content removal
							<br />
							- Repeated violations lead to account suspension
							<br />
							- Serious violations result in immediate permanent ban
							<br />- All moderation decisions are final
						</p>
					</section>
				</div>
			</div>
		</motion.div>
	);
};

export default AcceptableUsePage;
