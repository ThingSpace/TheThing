import { motion } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';

const LoadingStyles = cva(
	'h-4 w-screen animate-pulse-slow bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))]',
	{
		variants: {
			styles: {
				normal: 'from-gray-700 via-gray-900 to-black',
				opposite: 'from-gray-200 via-white to-white',
			},
		},
		defaultVariants: {
			styles: 'normal',
		},
	},
);

export interface LoadingProps extends VariantProps<typeof LoadingStyles> {
	styles?: 'normal' | 'opposite';
}

export const Loading: React.FC<LoadingProps> = ({ ...props }) => {
	return (
		<motion.div
			className="absolute left-0 top-0 flex w-full"
			initial={{ y: -100 }}
			animate={{ y: 0 }}
			exit={{ y: -100 }}
			transition={{ duration: 0.5 }}>
			<div className={LoadingStyles(props)}></div>
		</motion.div>
	);
};

export const FullScreenLoading: React.FC = () => (
	<div className="flex min-h-screen w-screen items-center justify-center bg-opacity-[10%] bg-clouds-pattern">
		<motion.div
			initial={{ opacity: 0.7 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0.7 }}
			transition={{
				duration: 1.5,
				ease: 'easeInOut',
			}}
			className="flex flex-col items-center"
		>
			<div className="flex items-center justify-center text-2xl font-mono text-black">
				Loading
				<motion.span
					animate={{ opacity: [0.2, 1, 0.2], y: [0, -6, 0] }}
					transition={{ repeat: Infinity, duration: 1, delay: 0, repeatType: 'loop' }}
					className="inline-block"
				>
					.
				</motion.span>
				<motion.span
					animate={{ opacity: [0.2, 1, 0.2], y: [0, -6, 0] }}
					transition={{ repeat: Infinity, duration: 1, delay: 0.2, repeatType: 'loop' }}
					className="inline-block"
				>
					.
				</motion.span>
				<motion.span
					animate={{ opacity: [0.2, 1, 0.2], y: [0, -6, 0] }}
					transition={{ repeat: Infinity, duration: 1, delay: 0.4, repeatType: 'loop' }}
					className="inline-block"
				>
					.
				</motion.span>
			</div>
		</motion.div>
	</div>
);
