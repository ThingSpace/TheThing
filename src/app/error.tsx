'use client';
import { Button } from '@components/ui/Button';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { AiFillBackward } from 'react-icons/ai';

const ErrorAnimations = {
	hidden: { opacity: 0 },
	visible: { opacity: 1 },
	transition: { duration: 0.5 },
};

const errorMessages = [
	"Something went wrong, but this isn't the end. Every challenge is a chance to grow, and we're here to help you through it.",
	"Oops! Even the best systems have hiccups. Take a deep breath—your journey continues, and support is always nearby.",
	"Errors happen, but your progress isn't lost. We're working to fix things, and you're not alone in this.",
	"Sometimes life throws curveballs, even in code. Remember: setbacks are temporary, and brighter moments are ahead.",
	"Don't worry, we're on it! In the meantime, know that your voice and your presence here matter.",
	"Glitches are just reminders that nothing is perfect—but your effort is. Thank you for being here.",
	"Hang tight! We're resolving things as quickly as possible. Your patience and courage are appreciated.",
	"Every error is a step toward improvement. Thank you for helping us make A Thing better for everyone.",
];

function getRandomErrorMessage() {
	return errorMessages[Math.floor(Math.random() * errorMessages.length)];
}

export default function Error() {
	const router = useRouter();

	return (
		<motion.div
			className="flex min-h-screen w-screen flex-col items-center justify-center bg-opacity-[10%] bg-clouds-pattern p-10 font-spacemono text-black"
			initial={ErrorAnimations.hidden}
			animate={ErrorAnimations.visible}
			exit={ErrorAnimations.hidden}
			transition={ErrorAnimations.transition}>
			<div
				className="absolute left-5 top-5 cursor-pointer rounded-full bg-white p-2"
				onClick={() => router.back()}>
				<AiFillBackward className="h-10 w-10 p-2 text-black" />
			</div>
			<div className="flex w-full max-w-2xl flex-col gap-8 border-2 bg-white p-8 hover:border-black items-center">
				<h1 className="text-7xl font-black text-red-600 drop-shadow-lg">500</h1>
				<h2 className="text-2xl font-bold text-black">Something went wrong!</h2>
				<p className="mb-2 max-w-xl text-lg text-gray-700 text-center">
					{getRandomErrorMessage()}
					<br />
					If this keeps happening, please{' '}
					<a
						href="mailto:support@athing.space"
						className="text-blue-600 underline hover:text-blue-800">
						contact support
					</a>{' '}
					or{' '}
					<a
						href="https://github.com/ThingSpace/TheThing/issues"
						target="_blank"
						rel="noopener noreferrer"
						className="text-blue-600 underline hover:text-blue-800">
						report a bug
					</a>
					.
				</p>
				<Button
					flex="row"
					width="fit"
					onClick={() => {
						router.back();
					}}>
					<AiFillBackward className="h-6 w-6" />
					<span className="ml-2">Go Back</span>
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
