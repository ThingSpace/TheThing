'use client';
import { Button } from '@components/ui/Button';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { AiFillBackward } from 'react-icons/ai';

const NotFoundAnimations = {
	hidden: { opacity: 0 },
	visible: { opacity: 1 },
	transition: { duration: 0.5 },
};

const upliftingMessages = [
	"Even the best explorers get lost sometimes. But every detour is a chance to discover something new about yourself.",
	"You're not alone—everyone takes a wrong turn now and then. This is just a pause, not the end of your journey.",
	"Every journey has detours. You're still on the right path, and sometimes the most beautiful places are found by accident.",
	"Lost? Maybe you'll find something wonderful here. Remember, every step forward is progress, even if it's unexpected.",
	"404, but your story isn't over. Keep going! The next page might be the one you've been searching for.",
	"Sometimes the best discoveries happen by accident. Trust yourself and keep moving forward.",
	"You're doing great. Let's get you back on track—your next breakthrough could be just a click away.",
	"Hey, it's okay! We'll help you find your way. Every setback is a setup for a comeback.",
	"Remember: You matter, your journey matters, and brighter days are ahead. Let's keep going together.",
	"Lost pages are just new beginnings. Take a breath, reset, and know that support is always here for you.",
];

function getRandomMessage() {
	return upliftingMessages[Math.floor(Math.random() * upliftingMessages.length)];
}

export default function NotFound() {
	const router = useRouter();

	return (
		<motion.div
			className="flex min-h-screen w-screen flex-col items-center justify-center bg-opacity-[10%] bg-clouds-pattern p-10 font-spacemono text-black"
			initial={NotFoundAnimations.hidden}
			animate={NotFoundAnimations.visible}
			exit={NotFoundAnimations.hidden}
			transition={NotFoundAnimations.transition}>
			<div
				className="absolute left-5 top-5 cursor-pointer rounded-full bg-white p-2"
				onClick={() => router.back()}>
				<AiFillBackward className="h-10 w-10 p-2 text-black" />
			</div>
			<div className="flex w-full max-w-2xl flex-col gap-8 border-2 bg-white p-8 hover:border-black items-center">
				<h1 className="text-7xl font-black text-pink-600">404</h1>
				<h2 className="text-2xl font-bold">Page Not Found</h2>
				<p className="mb-2 text-lg text-gray-700 text-center">{getRandomMessage()}</p>
				<Button
					flex="row"
					width="fit"
					onClick={() => {
						router.back();
					}}>
					<AiFillBackward className="h-6 w-6" />
					<span className="ml-2">Head Back</span>
				</Button>
				<div className="mt-6 flex flex-col items-center gap-2">
					<span className="text-sm text-gray-500 text-center">Need help? Visit our</span>
					<a
						href="/help"
						className="rounded-full bg-blue-50 px-4 py-2 text-blue-700 font-semibold hover:bg-blue-100 transition"
					>
						Help & FAQ
					</a>
					<span className="text-sm text-gray-500 text-center mt-2">Additional Resources:</span>
					<div className="flex flex-wrap justify-center gap-2">
						<a
							href="/resources"
							className="rounded-full bg-green-50 px-4 py-2 text-green-700 font-semibold hover:bg-green-100 transition"
							target="_blank"
							rel="noopener noreferrer"
						>
							Mental Health & Crisis Support
						</a>
						<a
							href="https://twitter.com/theathingapp"
							className="rounded-full bg-blue-100 px-4 py-2 text-blue-800 font-semibold hover:bg-blue-200 transition"
							target="_blank"
							rel="noopener noreferrer"
						>
							Twitter
						</a>
						<a
							href="https://github.com/ThingSpace/TheThing"
							className="rounded-full bg-gray-100 px-4 py-2 text-gray-800 font-semibold hover:bg-gray-200 transition"
							target="_blank"
							rel="noopener noreferrer"
						>
							GitHub
						</a>
					</div>
				</div>
			</div>
		</motion.div>
	);
}