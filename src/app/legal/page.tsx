'use client';
import React from 'react';
import { type NextPage } from 'next';
import { motion } from 'framer-motion';

import { useRouter } from 'next/navigation';
import { IoArrowBack } from 'react-icons/io5';
import Link from 'next/link';

const legalDocuments = [
	{
		title: 'Terms of Service',
		description: 'The rules and guidelines that govern your use of A Thing',
		href: '/legal/terms-of-service',
		priority: 'high',
		external: false,
	},
	{
		title: 'Privacy Policy',
		description: 'How we protect your privacy and handle your data',
		href: '/legal/privacy-policy',
		priority: 'high',
		external: false,
	},
	{
		title: 'Data Retention',
		description: 'How long we keep your data and when we delete it',
		href: '/legal/data-retention',
		priority: 'high',
		external: false,
	},
	{
		title: 'Acceptable Use',
		description: 'Guidelines for appropriate platform usage',
		href: '/legal/acceptable-use',
		priority: 'medium',
		external: false,
	},
	{
		title: 'Cookie Policy',
		description: 'Information about our minimal cookie usage',
		href: '/legal/cookie-policy',
		priority: 'medium',
		external: false,
	},
	{
		title: 'DMCA Policy',
		description: 'Copyright infringement reporting procedures',
		href: '/legal/dmca',
		priority: 'medium',
		external: false,
	},
	{
		title: 'Accessibility',
		description: 'Our commitment to platform accessibility',
		href: '/legal/accessibility',
		priority: 'medium',
		external: false,
	},
	{
		title: 'MIT License',
		description: 'Our open source licensing terms',
		href: '/legal/license',
		priority: 'low',
		external: false,
	},
];

const LegalHub: NextPage = () => {
	const router = useRouter();

	return (
		<motion.div
			className="flex min-h-screen w-screen flex-col items-center justify-start bg-opacity-[10%] bg-clouds-pattern p-10 font-spacemono text-black"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.5 }}>
			<div className="absolute left-5 top-5 cursor-pointer rounded-full bg-white p-2" onClick={() => router.back()}>
				<IoArrowBack className="h-10 w-10 p-2 text-black" />
			</div>

			<div className="flex w-full max-w-4xl flex-col gap-8">
				<div className="flex flex-col gap-4 border-2 bg-white p-8 hover:border-black">
					<h1 className="text-4xl font-bold">Legal Information</h1>
					<p className="text-gray-600">
						Our commitment to transparency means all our policies are written in plain language. We believe you should
						understand exactly how A Thing works and how your data is handled.
					</p>
				</div>

				<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
					{legalDocuments.map((doc) => (
						<Link
							key={doc.href}
							href={doc.href}
							target={doc.external ? '_blank' : '_self'}
							rel={doc.external ? 'noopener noreferrer' : ''}>
							<motion.div
								className={`flex h-full flex-col gap-2 border-2 bg-white p-6 hover:border-black ${doc.priority === 'high' ? 'border-black' : 'border-gray-200'}`}
								whileHover={{ scale: 1.02 }}
								transition={{ duration: 0.2 }}>
								<h2 className="text-xl font-bold">{doc.title}</h2>
								<p className="text-sm text-gray-600">{doc.description}</p>
								{doc.external && <span className="mt-2 text-xs text-gray-500">Opens in new tab ↗</span>}
							</motion.div>
						</Link>
					))}
				</div>

				<div className="flex flex-col gap-4 border-2 bg-white p-8 hover:border-black">
					<h2 className="text-2xl font-bold">Questions?</h2>
					<p className="font-normal">
						If you have questions about our policies, contact us at{' '}
						<a href="mailto:legal@athing.space" className="text-blue-600 hover:underline">
							legal@athing.space
						</a>{' '}
						or reach out through{' '}
						<a
							href="https://github.com/ThingSpace/TheThing/issues"
							className="text-blue-600 hover:underline"
							target="_blank"
							rel="noopener noreferrer">
							GitHub
						</a>{' '}
						or{' '}
						<a
							href="https://twitter.com/theathingapp"
							className="text-blue-600 hover:underline"
							target="_blank"
							rel="noopener noreferrer">
							Twitter
						</a>
						.
					</p>
				</div>
			</div>
		</motion.div>
	);
};

export default LegalHub;
