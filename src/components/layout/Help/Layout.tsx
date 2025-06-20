'use client';
import React from 'react';
import { type NextPage } from 'next';
import { motion } from 'framer-motion';

import { useRouter } from 'next/navigation';
import { IoArrowBack, IoSearch } from 'react-icons/io5';

const FAQData = {
	getting_started: {
		title: 'Getting Started',
		items: [
			{
				q: 'What is A Thing?',
				a: "A Thing is an open-source platform for anonymous self-expression, journaling, and community support. It's designed to be a safe space where you can share your thoughts without judgment.",
			},
			{
				q: 'How does account creation work?',
				a: "When you sign up, we generate a random username for you. You only need to provide a password. We do this to maintain anonymity and prevent username tracking across platforms. Your random username can't be changed, ensuring consistent anonymity.",
			},
			{
				q: 'What if I forget my password?',
				a: "Since we don't collect any personal information like email addresses, we can't provide password recovery. Please save your credentials securely. If you lose access, you'll need to create a new account.",
			},
			{
				q: 'Is it completely free?',
				a: 'Yes, A Thing is completely free and open-source. We believe in accessible mental wellness and self-expression for everyone.',
			},
		],
	},
	privacy_security: {
		title: 'Privacy & Security',
		items: [
			{
				q: 'How is my privacy protected?',
				a: 'We use end-to-end encryption for private journals, collect minimal data, and never store personally identifiable information. Our open-source code allows for complete transparency.',
			},
			{
				q: 'Can I delete my account and data?',
				a: 'Yes, you can delete your account and all associated data at any time. The deletion is permanent and irreversible.',
			},
			{
				q: 'Are my private journals really private?',
				a: 'Absolutely. Private journals are encrypted and only accessible to you. Not even our administrators can read them.',
			},
			{
				q: 'How anonymous am I really?',
				a: "Very. We generate random usernames, don't collect emails, and don't track IP addresses. Even we can't identify who you are.",
			},
			{
				q: 'Can I change my random username?',
				a: 'No, to prevent user tracking and maintain consistency in anonymity, random usernames are permanent.',
			},
		],
	},
	features: {
		title: 'Features & Usage',
		items: [
			{
				q: "What's the difference between notes and journals?",
				a: 'Notes are quick, public thoughts shared with the community. Journals are longer-form entries that can be either private or public, perfect for detailed reflection.',
			},
			{
				q: 'Can I format my posts?',
				a: 'Yes, we support Markdown formatting for both notes and journals. This includes headers, lists, bold, italic, and code blocks.',
			},
			{
				q: 'Is there a limit to how much I can post?',
				a: "Notes have a character limit for brevity, while journals have a much higher limit. There's no limit to how many entries you can create.",
			},
			{
				q: 'Can I edit or delete my posts?',
				a: 'Yes, you have full control over your content. You can edit or delete any of your posts at any time.',
			},
			{
				q: "What's the difference between public and private journals?",
				a: 'Public journals are visible to everyone, while private journals are encrypted and only visible to you. You can toggle between public and private when creating a journal.',
			},
		],
	},
	troubleshooting: {
		title: 'Troubleshooting',
		items: [
			{
				q: 'My random username feels too identifiable',
				a: "You can create a new account with a new random username. Just remember that your old account and its content won't be accessible unless you saved the credentials.",
			},
			{
				q: "I'm seeing inappropriate content",
				a: 'Use the report button immediately. Our moderators review reports quickly and take necessary action to maintain community standards.',
			},
			{
				q: "The site isn't loading properly",
				a: 'Try clearing your browser cache and cookies. If issues persist, check our status page or report the problem on GitHub.',
			},
			{
				q: 'Can I reset my password if I still have my username?',
				a: 'Yes. Please email support@athing.space with your username and a new bcrypt-hashed password generated from https://bcrypt-generator.com/. Our team will manually update your password.',
			},
		],
	},
	community: {
		title: 'Community & Support',
		items: [
			{
				q: 'How can I report inappropriate content?',
				a: 'Use the report button on any post to alert moderators. We take all reports seriously and aim to respond within 24 hours.',
			},
			{
				q: 'Can I contribute to the project?',
				a: 'Yes! Visit our GitHub repository to contribute code, report bugs, or suggest features. We welcome all forms of contribution.',
			},
			{
				q: "How do I get help if I'm in crisis?",
				a: "While we provide a space for expression, we're not a substitute for professional help. Please visit our Resources page for crisis hotlines and mental health services.",
			},
			{
				q: 'Are there any community events?',
				a: 'Yes! We occasionally host themed journaling days and community discussions. Check the announcements section for updates.',
			},
			{
				q: 'Can I share my journal entries on other platforms?',
				a: "Yes, but please be mindful of privacy. Don't share others' content without permission, and consider your own privacy when sharing.",
			},
		],
	},
};

const HelpPage: NextPage = () => {
	const [searchTerm, setSearchTerm] = React.useState('');
	const router = useRouter();

	const filteredFAQs = React.useMemo(() => {
		if (!searchTerm) return FAQData;

		const filtered: Partial<typeof FAQData> = {};
		Object.entries(FAQData).forEach(([key, category]) => {
			const items = category.items.filter(
				(item) =>
					item.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
					item.a.toLowerCase().includes(searchTerm.toLowerCase()),
			);
			if (items.length) (filtered as any)[key] = { ...category, items };
		});
		return filtered;
	}, [searchTerm]);

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
				<div className="flex flex-col gap-4 rounded-lg border-2 border-dashed bg-white p-8 hover:border-black">
					<h1 className="text-4xl font-bold">Help & FAQ</h1>
					<div className="relative">
						<IoSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
						<input
							type="text"
							placeholder="Search FAQ..."
							className="w-full rounded-md border-2 border-gray-200 py-2 pl-10 pr-4 focus:border-black focus:outline-none"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
						/>
					</div>
				</div>

				{Object.entries(filteredFAQs).map(([key, category]) => (
					<motion.div
						key={key}
						className="flex flex-col gap-4 rounded-lg border-2 border-dashed bg-white p-8 hover:border-black"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.3 }}>
						<h2 className="text-2xl font-bold">{category.title}</h2>
						<div className="flex flex-col gap-6">
							{category.items.map((item, index) => (
								<div key={index} className="flex flex-col gap-2">
									<h3 className="text-lg font-semibold">{item.q}</h3>
									<p className="font-normal text-gray-700">{item.a}</p>
								</div>
							))}
						</div>
					</motion.div>
				))}

				<div className="flex flex-col gap-4 border-2 bg-white p-8 hover:border-black">
					<h2 className="text-2xl font-bold">Still Need Help?</h2>
					<p className="font-normal">
						Email us at{' '}
						<a href="mailto:hey@athing.space" className="text-blue-600 underline hover:text-blue-800">
							hey@athing.space
						</a>{' '}
						or reach out to us on{' '}
						<a href="https://twitter.com/theathingapp" className="text-blue-600 underline hover:text-blue-800">
							Twitter
						</a>{' '}
						or create an issue on{' '}
						<a
							href="https://github.com/ThingSpace/TheThing/issues"
							className="text-blue-600 underline hover:text-blue-800">
							GitHub
						</a>
						.
					</p>
				</div>
			</div>
		</motion.div>
	);
};

export default HelpPage;
