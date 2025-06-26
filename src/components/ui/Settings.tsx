import {
	allowPagesDisplayAtom,
	showSettingsModalAtom,
	showCustomizationModalAtom,
	selectedCustomizationAtom,
	showToastAtom,
	toastIntentAtom,
	toastMessageAtom,
	showConfirmDialogAtom,
	confirmDialogStateAtom,
	confirmDialogMessageAtom,
} from '@utils/store';
import { motion } from 'framer-motion';
import { useAtom } from 'jotai';
import { Button } from './Button';
import { useRouter } from 'next/navigation';
import { trpc } from '@utils/trpc';
import { handleError } from '@utils/client.util';
import { IoSave } from 'react-icons/io5';
import React from 'react';
import { setCookie } from 'nookies';
import { THEME_CONFIG } from '@utils/PatternController';

const SettingsAnimations = {
	hidden: {
		y: '-100%',
	},
	visible: {
		y: 0,
	},
	transition: {
		duration: 0.2,
	},
};

export const Settings = () => {
	const [, setShowSettingsModal] = useAtom(showSettingsModalAtom);
	const [, setAllowPagesDisplay] = useAtom(allowPagesDisplayAtom);
	const [, setShowCustomizationModalAtom] = useAtom(showCustomizationModalAtom);
	const [selectedCustomization, setSelectedCustomization] = useAtom(selectedCustomizationAtom);
	const [, setDisplayToast] = useAtom(showToastAtom);
	const [, setToastIntent] = useAtom(toastIntentAtom);
	const [, setToastMessage] = useAtom(toastMessageAtom);
	const router = useRouter();

	const [, setShowConfirmDialog] = useAtom(showConfirmDialogAtom);
	const [confirmDialogState, setConfirmDialogState] = useAtom(confirmDialogStateAtom);
	const [, setConfirmDialogMessage] = useAtom(confirmDialogMessageAtom);

	const [hasSwitchedTheme, setHasSwitchedTheme] = React.useState(false);

	// tRPC
	const updateThemeMutation = trpc.user.update.useMutation();
	const deleteAccountMutation = trpc.user.delete.useMutation();
	const utils = trpc.useContext();
	const { data: user } = trpc.user.me.useQuery(undefined, { refetchOnWindowFocus: false });

	// Get all background patterns from THEME_CONFIG
	const backgrounds = Object.entries(THEME_CONFIG);

	function getBgClassOrImage(pattern: string) {
		// If pattern starts with 'bg-', treat as Tailwind class, else treat as image url
		if (pattern.startsWith('bg-')) {
			return { className: pattern, style: undefined };
		}
		return {
			className: '',
			style: {
				backgroundImage: `url(${pattern})`,
				backgroundSize: 'cover',
				backgroundPosition: 'center',
			},
		};
	}

	async function handleClose() {
		setAllowPagesDisplay(true);
		setConfirmDialogState(false);
		setSelectedCustomization(0);
		setShowSettingsModal(false);
	}

	async function handleDelete() {
		if (!confirmDialogState) {
			setConfirmDialogMessage(
				'You will lose all your data and will not be able to recover it. You will be logged out.',
			);
			setShowConfirmDialog(true);
			return;
		} else {
			setShowConfirmDialog(false);
			deleteHelper();
		}
	}

	async function deleteHelper() {
		try {
			await deleteAccountMutation.mutateAsync({});

			// Logout
			setToastIntent('success');
			setToastMessage("You've successfully deleted your account.");
			setDisplayToast(true);

			setCookie(null, 'token', '', {
				maxAge: -1,
				path: '/',
			});
			router.refresh();
		} catch (err) {
			const message = await handleError(err);
			setToastIntent('error');
			setToastMessage(message);
			setDisplayToast(true);
		}
	}

	async function handleThemeSwitch() {
		try {
			console.log(`Updating theme to ${selectedCustomization}`);
			await updateThemeMutation.mutateAsync({
				styling: selectedCustomization,
			});
			setSelectedCustomization(0);
			utils.user.me.invalidate();
			setToastIntent('success');
			setToastMessage('Your background is now updated!');
			setDisplayToast(true);
		} catch (error) {
			const message = await handleError(error);
			setToastIntent('error');
			setToastMessage(message);
			setDisplayToast(true);
		}
	}

	async function handleHelp() {
		window.open('https://twitter.com/intent/tweet?screen_name=theathingapp', '_blank');
	}

	return (
		<motion.div
			className="absolute left-0 top-0 z-[998] flex min-h-screen w-screen flex-col items-center justify-center bg-white p-10"
			initial={SettingsAnimations.hidden}
			animate={SettingsAnimations.visible}
			exit={SettingsAnimations.hidden}
			transition={SettingsAnimations.transition}>
			<div className="absolute right-5 top-5 flex gap-5">
				{hasSwitchedTheme ? (
					<Button
						styles="opposite"
						width="fit"
						onClick={() => {
							handleThemeSwitch();
						}}>
						<IoSave />
					</Button>
				) : null}
				<Button
					styles="opposite"
					width="fit"
					onClick={() => {
						handleClose();
					}}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
					</svg>
				</Button>
			</div>
			<div className="flex min-w-fit flex-col items-center justify-between">
				<div className="mb-5 w-full items-start border-2 border-gray-300 p-10">
					<h1 className="text-2xl font-bold">Background</h1>
					<div className="my-4 grid grid-cols-3 gap-4 sm:flex">
						{backgrounds.map(([key, pattern], idx) => {
							const { className, style } = getBgClassOrImage(pattern as string);
							const isActive = user?.styling === idx;
							const isSelected = selectedCustomization === idx;
							return (
								<div
									key={key}
									className={`relative flex flex-col items-center justify-center rounded-lg border-2 cursor-pointer transition-all duration-200 ${
										isSelected
											? ''
											: isActive
												? 'border-green-600 ring-2 ring-green-600'
												: 'border-gray-200 hover:border-black'
									} ${className}`}
									style={{
										width: 80,
										height: 80,
										...(style || {}),
									}}
									onClick={() => {
										setSelectedCustomization(idx);
										setHasSwitchedTheme(true);
									}}>
									<span className="absolute left-1 top-1 z-10 rounded bg-white bg-opacity-80 px-2 py-0.5 text-xs font-bold text-black">
										{idx + 1}
									</span>
									{isSelected && (
										<span className="absolute right-1 top-1 z-10 text-black-600 font-bold">●</span>
									)}
									{!isSelected && isActive && (
										<span className="absolute right-1 top-1 z-10 text-green-600 font-bold">●</span>
									)}
								</div>
							);
						})}
					</div>
					<div className="my-2 flex flex-col items-center justify-center">
						<Button
							styles="opposite"
							width="full"
							onClick={() => {
								setShowCustomizationModalAtom(true);
								setHasSwitchedTheme(true);
							}}>
							View a FullScreen Preview
						</Button>
					</div>
				</div>
				<div className="m-5 w-full border-2 border-gray-300 p-10">
					<h1 className="text-2xl font-bold">Help</h1>
					<div className="my-2 flex flex-col items-center justify-center">
						<Button
							styles="twitter"
							width="full"
							onClick={() => {
								handleHelp();
							}}>
							Twitter
						</Button>
					</div>
				</div>
				<div className="mt-5 w-full border-2 border-red-400 p-10">
					<h1 className="text-2xl font-bold text-red-600">Danger</h1>
					<div className="my-2 flex-row justify-between">
						<Button
							type="button"
							styles="danger"
							width="full"
							onClick={() => {
								handleDelete();
							}}>
							{confirmDialogState ? 'Okay! Bye Bye.' : 'Delete Account'}
						</Button>
					</div>
				</div>
			</div>
		</motion.div>
	);
};
