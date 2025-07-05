'use client';
import React from 'react';
import { type NextPage } from 'next';
import { motion } from 'framer-motion';

import { useRouter } from 'next/navigation';
import { IoArrowBack } from 'react-icons/io5';

const TermsOfServicePage: NextPage = () => {
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
				<h1 className="text-4xl font-bold">Terms of Service</h1>
				<div className="flex flex-col gap-4">
					<p className="font-normal">
						Welcome to A Thing! These Terms of Service ("Terms") govern your use of our platform. By accessing or using
						A Thing, you agree to be bound by these Terms.
					</p>
					<h2 className="text-xl font-bold">1. Acceptance of Terms</h2>
					<p className="font-normal">
						By creating an account or using A Thing, you confirm that you have read, understood, and agree to be bound
						by these Terms, including our Privacy Policy. If you do not agree with any part of these Terms, you may not
						use our services.
					</p>
					<h2 className="text-xl font-bold">2. User Conduct</h2>
					<p className="font-normal">
						You agree to use A Thing responsibly and in accordance with our rules and guidelines. You must not post any
						content that is illegal, hateful, harassing, threatening, discriminatory, or violates the privacy of others.
						We have a zero-tolerance policy for hate speech and harassment.
					</p>
					<h2 className="text-xl font-bold">3. Anonymity and Data</h2>
					<p className="font-normal">
						A Thing is designed for anonymity. We do not collect personally identifiable information. You are
						responsible for maintaining the anonymity of your content. We do not store any data that can be tied back to
						your real identity.
					</p>
					<h2 className="text-xl font-bold">4. Content Ownership and Responsibility</h2>
					<p className="font-normal">
						You retain ownership of the content you create on A Thing. However, by posting public content, you grant A
						Thing a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, publish, and distribute
						your content on the platform. You are solely responsible for the content you post.
					</p>
					<h2 className="text-xl font-bold">5. Account Termination</h2>
					<p className="font-normal">
						We reserve the right to suspend or terminate your account at our sole discretion, without prior notice, if
						you violate these Terms or engage in any conduct that we deem harmful to the platform or its users. You may
						delete your account at any time, which will result in the permanent removal of all your associated data.
					</p>
					<h2 className="text-xl font-bold">6. Disclaimer of Warranties</h2>
					<p className="font-normal">
						A Thing is provided "as is" and "as available" without any warranties of any kind, either express or
						implied. We do not guarantee that the platform will be uninterrupted, error-free, or secure.
					</p>
					<h2 className="text-xl font-bold">7. Limitation of Liability</h2>
					<p className="font-normal">
						In no event shall A Thing or its creators be liable for any indirect, incidental, special, consequential, or
						punitive damages arising out of or in connection with your use of the platform.
					</p>
					<h2 className="text-xl font-bold">8. Governing Law</h2>
					<p className="font-normal">
						These Terms shall be governed by and construed in accordance with the laws of Canada, without regard to its
						conflict of law principles.
					</p>
					<h2 className="text-xl font-bold">9. Changes to Terms</h2>
					<p className="font-normal">
						We may revise these Terms from time to time. The most current version will always be posted on this page. By
						continuing to use A Thing after changes become effective, you agree to be bound by the revised Terms.
					</p>
					<p className="font-normal">These Terms were last updated on June 18, 2025.</p>
				</div>
			</div>
		</motion.div>
	);
};

export default TermsOfServicePage;
