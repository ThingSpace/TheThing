import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Navigation } from '@components/ui/Static/Navigation';
import '../styles/globals.css';
import Providers from '@components/Providers';
import RandomTitle from '@components/RandomTitle';
import { ClientSuspense } from '@components/ui/ClientSuspense';

// Fix duplicate/interleaved declarations and syntax errors
const inter = Inter({ subsets: ['latin'] });

const titleVariants = [
	"we are with you",
	"sometimes you are not alone",
	"you got this",
	"you are enough",
	"just breathe",
	"<3 You got this"
];

function getRandomTitle() {
	return titleVariants[Math.floor(Math.random() * titleVariants.length)] ?? "A Thing";
}

export const metadata: Metadata = {
	openGraph: {
		type: 'website',
		locale: 'en_US',
		url: 'https://athing.space',
		siteName: 'A Thing',
		images: ['/banner.png'],
	},
	twitter: {
		site: '@theathingapp',
	},
	description:
		'A Thing is a safe, anonymous space for self-expression where you can share your thoughts, keep private journals, and connect with others who understand. No judgments. No traces. Just you being you.',
	title: {
		default: getRandomTitle(),
		template: '%s | A Thing',
	},
	themeColor: '#000000',
};

interface RootLayoutProps {
	children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={inter.className}>
				<RandomTitle />
				<Providers>
					<Navigation />
					<ClientSuspense fallback={
						<div className="flex min-h-screen w-screen items-center justify-center text-lg font-mono">Loading...</div>
					}>
						<main>{children}</main>
					</ClientSuspense>
				</Providers>
			</body>
		</html>
	);
}
