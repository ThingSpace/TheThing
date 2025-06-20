'use client';
import React from 'react';
import { type NextPage } from 'next';
import { motion } from 'framer-motion';

import { useRouter } from 'next/navigation';
import { IoArrowBack } from 'react-icons/io5';

const CookiePolicyPage: NextPage = () => {
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
				<h1 className="text-4xl font-bold">Cookie Policy</h1>
				<div className="flex flex-col gap-6">
					<section className="flex flex-col gap-3">
						<p className="font-normal">
							At A Thing, we prioritize privacy and minimize data collection. Our cookie usage is intentionally limited
							to essential functions only.
						</p>
					</section>

					<section className="flex flex-col gap-3">
						<h2 className="text-xl font-bold">Essential Cookies</h2>
						<p className="font-normal">We use only one type of cookie:</p>
						<ul className="list-disc pl-6 font-normal">
							<li>
								Authentication token: A session cookie that keeps you logged in and expires when you close your browser
							</li>
						</ul>
					</section>

					<section className="flex flex-col gap-3">
						<h2 className="text-xl font-bold">What We Don&apos;t Use</h2>
						<p className="font-normal">We explicitly do not use:</p>
						<ul className="list-disc pl-6 font-normal">
							<li>Analytics or tracking cookies</li>
							<li>Advertising cookies</li>
							<li>Third-party cookies</li>
							<li>Persistent cookies</li>
							<li>Behavioral tracking</li>
						</ul>
					</section>

					<section className="flex flex-col gap-3">
						<h2 className="text-xl font-bold">Your Control</h2>
						<p className="font-normal">
							While you can control cookies through your browser settings, please note that our authentication cookie is
							required to maintain your login session. Disabling it will prevent you from using your account.
						</p>
					</section>

					<section className="flex flex-col gap-3">
						<h2 className="text-xl font-bold">Updates</h2>
						<p className="font-normal">
							This policy was last updated on June 18, 2025. Any changes to our cookie usage will be reflected here.
						</p>
					</section>
				</div>
			</div>
		</motion.div>
	);
};

export default CookiePolicyPage;
