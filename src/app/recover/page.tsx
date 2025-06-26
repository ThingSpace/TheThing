'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { IoArrowBack } from 'react-icons/io5';
import { Button } from '@components/ui/Button';
import { trpc } from '@utils/trpc';

const skillQuestions = [
	'What month and year did you create your account?',
	'What is the first word of your first journal entry title?',
	'What is the first word of your most recent note?',
	'What is the title of your first journal?',
	'What is the first word of your oldest journal entry (if you have one)?',
	'What theme number do you currently have set? (Enter a number from 1 to 10)',
];

export default function RecoveryPage() {
	const router = useRouter();
	const [step, setStep] = React.useState(0);
	const [username, setUsername] = React.useState('');
	const [usernameError, setUsernameError] = React.useState('');
	const [questions, setQuestions] = React.useState<string[]>([]);
	const [answers, setAnswers] = React.useState<string[]>([]);
	const [answersError, setAnswersError] = React.useState('');
	const [password, setPassword] = React.useState('');
	const [passwordError, setPasswordError] = React.useState('');
	const [success, setSuccess] = React.useState(false);

	const checkUsernameMutation = trpc.recover.checkUsername.useMutation();
	const verifyAnswersMutation = trpc.recover.verifyAnswers.useMutation();
	const updatePasswordMutation = trpc.recover.updatePassword.useMutation();

	const handleUsernameSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setUsernameError('');
		const trimmedUsername = username.trim();
		if (!trimmedUsername) {
			setUsernameError('Please enter your username.');
			return;
		}
		const res = await checkUsernameMutation.mutateAsync({ username: trimmedUsername });
		if (!res.exists) {
			setUsernameError('Username not found.');
			return;
		}
		// Pick 2 random questions
		const shuffled = [...skillQuestions].sort(() => 0.5 - Math.random());
		setQuestions(shuffled.slice(0, 2));
		setAnswers(['', '']);
		setStep(1);
	};

	const handleAnswersSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setAnswersError('');
		if (answers.some(a => !a.trim())) {
			setAnswersError('Please answer all questions.');
			return;
		}
		const res = await verifyAnswersMutation.mutateAsync({ username, answers });
		if (!res.correct) {
			setAnswersError('Answers incorrect. Please try again or contact support.');
			return;
		}
		setStep(2);
	};

	const handlePasswordSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setPasswordError('');
		if (!password || password.length < 8) {
			setPasswordError('Password must be at least 8 characters.');
			return;
		}
		const res = await updatePasswordMutation.mutateAsync({ username, password });
		if (res.success) {
			setSuccess(true);
		} else {
			setPasswordError('Failed to update password. Please try again.');
		}
	};

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
			<div className="flex w-full max-w-2xl flex-col gap-8">
				<div className="flex flex-col gap-4 rounded-lg border-2 border-dashed bg-white p-8 hover:border-black">
					<h1 className="text-4xl font-bold">Account Recovery</h1>
					{success ? (
						<div className="text-green-700">
							Your password has been updated! You can now log in with your new password.
						</div>
					) : step === 0 ? (
						<form className="flex flex-col gap-4" onSubmit={handleUsernameSubmit}>
							<label className="flex flex-col gap-1">
								<span className="font-semibold">Username</span>
								<input
									type="text"
									className="rounded border border-gray-300 p-2"
									value={username}
									onChange={e => setUsername(e.target.value)}
									required
								/>
							</label>
							{usernameError && <span className="text-red-600">{usernameError}</span>}
							<Button type="submit" width="fit" disabled={checkUsernameMutation.isLoading}>Next</Button>
						</form>
					) : step === 1 ? (
						<form className="flex flex-col gap-4" onSubmit={handleAnswersSubmit}>
							{questions.map((q, i) => (
								<label key={i} className="flex flex-col gap-1">
									<span className="font-semibold">{q}</span>
									<input
										type="text"
										className="rounded border border-gray-300 p-2"
										value={answers[i]}
										onChange={e => {
											const newAnswers = [...answers];
											newAnswers[i] = e.target.value;
											setAnswers(newAnswers);
										}}
										required
									/>
								</label>
							))}
							{answersError && <span className="text-red-600">{answersError}</span>}
							<Button type="submit" width="fit" disabled={verifyAnswersMutation.isLoading}>Next</Button>
						</form>
					) : (
						<form className="flex flex-col gap-4" onSubmit={handlePasswordSubmit}>
							<label className="flex flex-col gap-1">
								<span className="font-semibold">New Password</span>
								<input
									type="password"
									className="rounded border border-gray-300 p-2"
									value={password}
									onChange={e => setPassword(e.target.value)}
									required
								/>
							</label>
							{passwordError && <span className="text-red-600">{passwordError}</span>}
							<Button type="submit" width="fit" disabled={updatePasswordMutation.isLoading}>Update Password</Button>
						</form>
					)}
					<div className="my-2 rounded-md border-l-4 border-blue-400 bg-blue-50 px-4 py-2 text-sm text-blue-900">
						<strong>Note:</strong> You will be required to answer some skill testing questions about your account to verify ownership.
					</div>
                    <div className="my-2 rounded-md border-l-4 border-yellow-400 bg-yellow-50 px-4 py-2 text-sm text-yellow-900">
						<strong>Alert: </strong>If you cannot remember your skill testing questions, you will not be able to recover your account. This is a security measure to protect your data. You can try contacting us at{' '}
                        <a href="mailto:support@athing.space" className="text-blue-600 hover:underline">support@athing.space</a> for further assistance, however in most cases, we will still attempt to verify ownership and may not be able to assist you if you cannot answer the questions.  
					</div>
				</div>
			</div>
		</motion.div>
	);
}
