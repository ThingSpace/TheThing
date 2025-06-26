import React from 'react';
import { motion } from 'framer-motion';
import { useAtom } from 'jotai';
import {
	allowPagesDisplayAtom,
	selectedCustomizationAtom,
	showCustomizationModalAtom,
	showSettingsModalAtom,
	showToastAtom,
	toastIntentAtom,
	toastMessageAtom,
} from '@utils/store';
import { Button } from './Button';
import { THEME_CONFIG } from '@utils/PatternController';

const CustomizationAnimations = {
	hidden: {
		y: '100%',
	},
	visible: {
		y: 0,
	},
	transition: {
		duration: 0.2,
	},
};
const length = Object.keys(THEME_CONFIG).length;

export const Customization = () => {
	const [, setShowCustomizationModal] = useAtom(showCustomizationModalAtom);
	const [showSettingsModal] = useAtom(showSettingsModalAtom);
	const [, setAllowPagesDisplay] = useAtom(allowPagesDisplayAtom);
	const [selectedTheme, setSelectedTheme] = useAtom(selectedCustomizationAtom);
	const [, setToastIntent] = useAtom(toastIntentAtom);
	const [, setToastMessage] = useAtom(toastMessageAtom);
	const [, setShowToast] = useAtom(showToastAtom);

	async function handleClose() {
		if (!showSettingsModal) {
			setAllowPagesDisplay(true);
		}
		setShowCustomizationModal(false);
	}

	function getBgClassOrImage(pattern: string) {
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

	// Always show fullscreen preview of the selected background
	const pattern = THEME_CONFIG[selectedTheme];
	const { className, style } = getBgClassOrImage(pattern);

	return (
		<motion.div
			className={`fixed left-0 top-0 z-[1000] flex min-h-screen w-screen flex-col items-center justify-center ${className}`}
			style={{
				...style,
				backgroundColor: style?.backgroundImage ? undefined : 'white',
			}}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.3 }}>
			<div className="absolute right-5 top-5">
				<Button
					styles="opposite"
					width="fit"
					onClick={handleClose}>
					Close Preview
				</Button>
			</div>
			
			{/* Improved, responsive background selector */}
			<div className="absolute bottom-4 left-1/2 z-10 flex w-full -translate-x-1/2 flex-wrap justify-center px-2 sm:px-0">
				<div className="flex flex-row flex-wrap justify-center gap-2 sm:gap-4 max-w-full overflow-x-auto rounded-full bg-white/90 shadow-lg px-4 py-2 backdrop-blur-md">
					{[...Array(length)].map((_, i) => {
						const { className: thumbClass, style: thumbStyle } = getBgClassOrImage(THEME_CONFIG[i]);
						return (
							<button
								key={i}
								type="button"
								aria-label={`Select theme ${i + 1}`}
								className={
									`relative flex flex-col items-center justify-center rounded-lg border-2 cursor-pointer transition-all duration-200 focus:outline-none ` +
									(selectedTheme === i
										? 'border-black ring-2 ring-black'
										: 'border-gray-200 hover:border-black') +
									(thumbClass ? ` ${thumbClass}` : '')
								}
								style={{
									width: 48,
									height: 48,
									...(thumbStyle || {}),
								}}
								onClick={() => {
									setSelectedTheme(i);
									setToastIntent('success');
									setToastMessage('Your theme has been selected!');
									setShowToast(true);
								}}>
								<span className="absolute left-1 top-1 z-10 rounded bg-white bg-opacity-80 px-1.5 py-0.5 text-xs font-bold text-black">
									{i + 1}
								</span>
							</button>
						);
					})}
				</div>
			</div>
		</motion.div>
	);
};