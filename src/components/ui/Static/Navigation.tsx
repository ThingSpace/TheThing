'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { IoMenu, IoClose } from 'react-icons/io5';
import {
	Home,
	BarChart2,
	Shield,
	HelpCircle,
	Info,
	LogIn,
	UserPlus,
	Scale,
	ChevronDown,
	ChevronUp,
	Settings,
	LogOut,
} from 'lucide-react';
import { trpc } from '@utils/trpc';
import { setCookie } from 'nookies';
import { useRouter, usePathname } from 'next/navigation';

const publicItems = [
	{ href: '/', label: 'Home', icon: <Home className="h-5 w-5" /> },
	{ href: '/about', label: 'About', icon: <Info className="h-5 w-5" /> },
	{ href: '/stats', label: 'Statistics', icon: <BarChart2 className="h-5 w-5" /> },
	{ href: '/resources', label: 'Resources', icon: <UserPlus className="h-5 w-5" /> },
	{ href: '/rules', label: 'Guidelines', icon: <Shield className="h-5 w-5" /> },
	{ href: '/help', label: "FAQ's", icon: <HelpCircle className="h-5 w-5" /> },
];

const authenticatedItems = [
	{ href: '/app', label: 'Space', icon: <Home className="h-5 w-5" /> },
	{ href: '/profile', label: 'Profile', icon: <UserPlus className="h-5 w-5" /> },
	{ href: '/app/settings', label: 'Settings', icon: <Settings className="h-5 w-5" /> },
];

const legalItems = [
	{ href: '/legal', label: 'Legal Hub' },
	{ href: '/legal/acceptable-use', label: 'Acceptable Use' },
	{ href: '/legal/data-retention', label: 'Data Retention' },
	{ href: '/legal/cookie-policy', label: 'Cookie Policy' },
	{ href: '/legal/accessibility', label: 'Accessibility' },
	{ href: '/legal/privacy-policy', label: 'Privacy Policy' },
	{ href: '/legal/terms-of-service', label: 'Terms of Service' },
	{ href: '/legal/dmca', label: 'DMCA Policy' },
	{ href: '/legal/license', label: 'MIT License' },
];

const getTimeBasedGreeting = () => {
	const hour = new Date().getHours();
	if (hour < 12) return 'Good Morning 👋';
	if (hour < 17) return 'Good Afternoon 👋';
	return 'Good Evening 👋';
};

const encouragingMessages = [
	"Hope you're doing well today",
	'Your thoughts matter',
	'Take care of yourself',
	"You're not alone here",
	'Feel free to express yourself',
	'This is your safe space',
	"We're glad you're here",
	'Take it one day at a time',
	'Your story is important',
	'Remember to breathe',
	'You are enough, just as you are',
	'Progress, not perfection',
	'Small steps count',
	'You make a difference',
	'It’s okay to rest',
	'Be gentle with yourself',
	'You’re stronger than you think',
	'Your feelings are valid',
	'You belong here',
	'Let today be a fresh start',
	'You are not your thoughts',
];

export const Navigation = () => {
	const [isOpen, setIsOpen] = React.useState(false);
	const [isLegalOpen, setIsLegalOpen] = React.useState(false);
	const [isBasicsOpen, setIsBasicsOpen] = React.useState(false);
	const [randomMessage, setRandomMessage] = React.useState('');
	const router = useRouter();
	const pathname = usePathname();

	// Pick a new message every time the menu is opened
	React.useEffect(() => {
		if (isOpen) {
			const message =
				encouragingMessages.length > 0
					? encouragingMessages[Math.floor(Math.random() * encouragingMessages.length)]
					: '';
			setRandomMessage(message ?? '');
		}
	}, [isOpen]);

	// Query user data - will return null if not authenticated
	const { data: user, isLoading } = trpc.user.me.useQuery(undefined, {
		retry: false,
		refetchOnWindowFocus: false,
	});

	const handleLogout = () => {
		setCookie(null, 'token', '', {
			maxAge: -1,
			path: '/',
		});
		router.refresh();
		setIsOpen(false);
	};

	const navigationItems = user ? authenticatedItems : [...publicItems];
	if (!user && !isLoading) {
		navigationItems.push({ href: '/auth/login', label: 'Login', icon: <LogIn className="h-5 w-5" /> });
	}

	// Move path check here, after all hooks are initialized
	if (pathname?.startsWith('/app')) {
		return null;
	}

	return (
		<>
			<button
				onClick={() => setIsOpen(true)}
				className="fixed bottom-5 left-5 z-50 rounded-full bg-black p-3 text-white shadow-lg hover:bg-gray-800"
				aria-label="Open navigation">
				<IoMenu className="h-6 w-6" />
			</button>

			<AnimatePresence>
				{isOpen && (
					<>
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 0.5 }}
							exit={{ opacity: 0 }}
							onClick={() => setIsOpen(false)}
							className="fixed inset-0 z-40 bg-black"
						/>
						<motion.div
							initial={{ x: '-100%' }}
							animate={{ x: 0 }}
							exit={{ x: '-100%' }}
							transition={{ type: 'spring', damping: 20 }}
							className="fixed left-0 top-0 z-50 h-full w-[300px] bg-white p-5 shadow-xl">
							<div className="flex items-center justify-between border-b border-gray-200 pb-4">
								<div className="flex flex-col gap-1">
									<div className="flex items-center gap-2">
										<motion.div
											className="flex items-center gap-2"
											whileHover={{ scale: 1.05 }}
											transition={{ type: 'spring', stiffness: 400, damping: 10 }}>
											<img src="/logo.png" alt="A Thing Logo" className="h-8 w-8" />
											<span className="text-xl font-bold">A Thing</span>
										</motion.div>
										
									</div>
									{user && (
										<p className="text-sm text-gray-600">
											{getTimeBasedGreeting()}, friend!
										</p>
									)}
									{user && randomMessage && <p className="text-sm text-gray-600">{randomMessage}</p>}
								</div>
								<button
									onClick={() => setIsOpen(false)}
									className="rounded-full p-2 hover:bg-gray-100"
									aria-label="Close navigation">
									<IoClose className="h-6 w-6" />
								</button>
							</div>
							<nav className="mt-4">
								<ul className="space-y-2">
									{navigationItems.map((item) => (
										<li key={item.href}>
											<Link
												href={item.href}
												className="flex items-center gap-3 rounded-lg p-3 hover:bg-gray-100"
												onClick={() => setIsOpen(false)}>
												{item.icon}
												{item.label}
											</Link>
										</li>
									))}

									{user && (
										<>
											<li>
												<button
													onClick={handleLogout}
													className="flex w-full items-center gap-3 rounded-lg p-3 hover:bg-gray-100">
													<LogOut className="h-5 w-5" />
													Logout
												</button>
											</li>
											<li>
												<button
													onClick={() => setIsBasicsOpen(!isBasicsOpen)}
													className="flex w-full items-center justify-between rounded-lg p-3 hover:bg-gray-100">
													<div className="flex items-center gap-3">
														<Info className="h-5 w-5" />
														The Basics
													</div>
													{isBasicsOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
												</button>
												<AnimatePresence>
													{isBasicsOpen && (
														<motion.ul
															initial={{ height: 0, opacity: 0 }}
															animate={{ height: 'auto', opacity: 1 }}
															exit={{ height: 0, opacity: 0 }}
															className="overflow-hidden pl-11">
															{publicItems.map((item) => (
																<li key={item.href}>
																	<Link
																		href={item.href}
																		className="flex items-center gap-2 py-2 hover:text-gray-600"
																		onClick={() => setIsOpen(false)}>
																		{item.icon}
																		{item.label}
																	</Link>
																</li>
															))}
														</motion.ul>
													)}
												</AnimatePresence>
											</li>
										</>
									)}

									<li>
										<button
											onClick={() => setIsLegalOpen(!isLegalOpen)}
											className="flex w-full items-center justify-between rounded-lg p-3 hover:bg-gray-100">
											<div className="flex items-center gap-3">
												<Scale className="h-5 w-5" />
												Legal Stuff
											</div>
											{isLegalOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
										</button>
										<AnimatePresence>
											{isLegalOpen && (
												<motion.ul
													initial={{ height: 0, opacity: 0 }}
													animate={{ height: 'auto', opacity: 1 }}
													exit={{ height: 0, opacity: 0 }}
													className="overflow-hidden pl-11">
													{legalItems.map((item) => (
														<li key={item.href}>
															<Link
																href={item.href}
																className="block py-2 hover:text-gray-600"
																onClick={() => setIsOpen(false)}>
																{item.label}
															</Link>
														</li>
													))}
												</motion.ul>
											)}
										</AnimatePresence>
									</li>
								</ul>
							</nav>
						</motion.div>
					</>
				)}
			</AnimatePresence>
		</>
	);
};
