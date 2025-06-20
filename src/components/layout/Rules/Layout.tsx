'use client';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import React from 'react';
import { IoArrowBack, IoClose } from 'react-icons/io5';

const RulesData = {
	0: {
		title: 'Freedom of Expression & Zero Tolerance for Hate',
		description:
			"Express yourself freely, but remember that freedom comes with responsibility. We have zero tolerance for hate speech, discrimination, harassment, or content that promotes violence. Every voice matters, but it must respect others' dignity.",
	},
	1: {
		title: 'Privacy is Sacred',
		description:
			"When sharing personal stories, always use fictional names and alter identifying details. Never share private information about yourself or others. Doxing or attempting to reveal someone's identity will result in an immediate ban.",
	},
	2: {
		title: 'Mindful Interaction',
		description:
			"Disagree with respect. If content doesn't resonate with you, simply scroll past. Don't engage in hostile arguments or personal attacks. Remember: behind every post is a real person with real feelings.",
	},
	3: {
		title: 'Content Guidelines',
		description:
			'Keep content appropriate and legal under Canadian law. No explicit content, spam, or commercial promotion. Posts should be genuine expressions, not attempts to manipulate or mislead.',
	},
	4: {
		title: 'Mental Health Awareness',
		description:
			"While we encourage sharing feelings and experiences, we're not a substitute for professional help. If you or someone seems in crisis, please seek appropriate professional support. We'll provide resources when needed.",
	},
	5: {
		title: 'Community Responsibility',
		description:
			"Help maintain our safe space. Report violations, but don't engage with trolls. Your active participation in keeping this space healthy is crucial. Remember: we're all in this together.",
	},
};

const RulesPage = () => {
	const [showRuleInfo, setShowRuleInfo] = React.useState(false);
	const [ruleInfo, setRuleInfo] = React.useState(RulesData[0]);
	const router = useRouter();

	return (
		<motion.div
			className={`flex min-h-screen w-screen flex-col items-center justify-center bg-opacity-[10%] bg-clouds-pattern p-10 font-spacemono font-semibold text-black`}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.5 }}>
			<div className="mt-[60px] flex w-full flex-col gap-5 lg:flex-row">
				<div className="absolute left-5 top-5 cursor-pointer rounded-full bg-white p-2" onClick={() => router.back()}>
					<IoArrowBack className="h-10 w-10 p-2 text-black" />
				</div>
				<div className="flex w-fit flex-col justify-center gap-5 border-2 bg-white p-5 hover:border-black">
					<h1 className="text-2xl font-bold">Welcome to Our Community</h1>
					<div className="flex flex-col font-normal">
						<p className="prose max-w-none">
							At <b className="font-semibold text-green-600 underline decoration-wavy">A Thing</b>, we believe in the
							power of authentic expression. This is your space to share, reflect, and connect - safely and anonymously.
							<br />
							<br />
							Our community thrives on trust and mutual respect. While we encourage open dialogue and diverse
							perspectives, we maintain strict guidelines to ensure everyone feels secure and respected.
							<br />
							<br />
							Breaking these rules <b className="font-semibold text-red-600">will result in immediate action</b>,
							typically a permanent ban. We take our community's safety seriously.
							<br />
							<br />
							Have suggestions? Reach out on{' '}
							<a
								href="https://twitter.com/intent/tweet?screen_name=theathingapp"
								className="cursor-pointer font-semibold text-blue-600 underline decoration-wavy"
								target="_blank"
								rel="noreferrer">
								Twitter
							</a>
							. Let's build this space together.
							<br />
							<br />
							With love and care,
							<br />
							The A Thing Team
						</p>
					</div>
				</div>
				<div className="flex flex-col border-2 bg-white p-5 hover:border-black">
					<h1 className="mb-4 text-2xl font-bold">Community Guidelines</h1>
					<div className="flex flex-col space-y-2 font-normal">
						{Object.entries(RulesData).map(([key, rule]) => (
							<h6
								key={key}
								className="cursor-pointer p-3 transition-colors duration-200 hover:bg-black hover:text-white"
								onClick={() => {
									setRuleInfo(rule);
									setShowRuleInfo(true);
								}}>
								{parseInt(key) + 1}. {rule.title}
							</h6>
						))}
					</div>
				</div>
				{showRuleInfo ? (
					<motion.div
						className="fixed left-[50%] top-[50%] flex h-fit w-[300px] -translate-x-[50%] -translate-y-[50%] flex-col gap-2 border-2 border-black bg-white p-10 lg:w-fit"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.2 }}>
						<div
							className="absolute -right-5 -top-5 cursor-pointer rounded-full border-2 border-black bg-white p-5"
							onClick={() => setShowRuleInfo(false)}>
							<IoClose className="sq-6" />
						</div>
						<h1 className="text-2xl font-bold">What?</h1>
						<p className="font-normal">{ruleInfo.title}</p>
						<h1 className="text-2xl font-bold">Why?</h1>
						<p className="font-normal">{ruleInfo.description}</p>
					</motion.div>
				) : null}
			</div>
		</motion.div>
	);
};

export default RulesPage;
