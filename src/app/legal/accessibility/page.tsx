'use client';
import React from 'react';
import { type NextPage } from 'next';
import { motion } from 'framer-motion';

import { useRouter } from 'next/navigation';
import { IoArrowBack } from 'react-icons/io5';

const AccessibilityPage: NextPage = () => {
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
				<h1 className="text-4xl font-bold">Accessibility Statement</h1>
				<div className="flex flex-col gap-4">
					<section>
						<h2 className="text-xl font-bold">Our Commitment</h2>
						<p className="font-normal">
							A Thing is committed to ensuring digital accessibility for people of all abilities. We aim to conform to
							WCAG 2.1 Level AA standards.
						</p>
					</section>

					<section>
						<h2 className="text-xl font-bold">Key Features</h2>
						<p className="font-normal">
							- Keyboard navigation support
							<br />
							- Screen reader compatibility
							<br />
							- High contrast mode
							<br />
							- Resizable text
							<br />
							- Alt text for images
							<br />- ARIA landmarks and labels
						</p>
					</section>

					<section>
						<h2 className="text-xl font-bold">Known Issues</h2>
						<p className="font-normal">
							We're actively working to improve:
							<br />
							- Complex widget interactions
							<br />
							- Dynamic content updates
							<br />- Mobile responsiveness
						</p>
					</section>

					<section>
						<h2 className="text-xl font-bold">Feedback</h2>
						<p className="font-normal">
							We welcome your feedback on the accessibility of A Thing. Please report issues through:
							<br />- Email:{' '}
							<a href="mailto:support@athing.space" className="text-blue-600 hover:underline">
								support@athing.space
							</a>
							<br />-{' '}
							<a href="https://github.com/ThingSpace/TheThing/issues" className="text-blue-600 hover:underline">
								GitHub Issues
							</a>
							<br />-{' '}
							<a href="https://twitter.com/theathingapp" className="text-blue-600 hover:underline">
								Twitter DM
							</a>
						</p>
					</section>

					<section>
						<h2 className="text-xl font-bold">Continuous Improvement</h2>
						<p className="font-normal">
							We regularly review and update our accessibility features. Our development process includes accessibility
							testing and validation.
						</p>
					</section>
				</div>
			</div>
		</motion.div>
	);
};

export default AccessibilityPage;
