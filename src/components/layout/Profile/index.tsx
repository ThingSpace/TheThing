'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { IoArrowBack } from 'react-icons/io5';

function formatDate(dateString: string | Date) {
	const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
	return date.toLocaleDateString(undefined, {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});
}

export interface ProfileLayoutProps {
	user: {
		username: string;
		id: string;
		createdAt?: string | Date;
		styling?: number;
		flaggedPosts?: any[];
		reviewPosts?: any[];
		sensitiveMessage?: string | null;
	};
	onBack?: () => void;
}

export const ProfileLayout: React.FC<ProfileLayoutProps> = ({ user, onBack }) => (
	<motion.div
		className="flex min-h-screen w-screen flex-col items-center justify-start bg-opacity-[10%] bg-clouds-pattern p-10 font-spacemono text-black"
		initial={{ opacity: 0 }}
		animate={{ opacity: 1 }}
		exit={{ opacity: 0 }}
		transition={{ duration: 0.5 }}>
		<div className="absolute left-5 top-5 cursor-pointer rounded-full bg-white p-2" onClick={onBack}>
			<IoArrowBack className="h-10 w-10 p-2 text-black" />
		</div>
		<div className="flex w-full max-w-xl flex-col gap-8 border-2 bg-white p-8 hover:border-black">
			<h1 className="text-4xl font-bold mb-2">My Profile</h1>
			<div className="flex flex-col gap-4">
				<div>
					<span className="font-semibold">Username:</span>{' '}
					<span className="font-mono text-lg">@{user.username}</span>
				</div>
				<div>
					<span className="font-semibold">User ID:</span>{' '}
					<span className="font-mono text-xs">{user.id}</span>
				</div>
				<div>
					<span className="font-semibold">Account Created:</span>{' '}
					<span>{user.createdAt ? formatDate(user.createdAt) : 'Unknown'}</span>
				</div>
				<div>
					<span className="font-semibold">Theme:</span>{' '}
					<span>
						{typeof user.styling === 'number'
							? `#${user.styling + 1} (${user.styling})`
							: 'Default'}
					</span>
				</div>
			</div>

			{user.flaggedPosts && user.flaggedPosts.length > 0 && (
				<div className="mt-4 rounded-md border-l-4 border-yellow-400 bg-yellow-50 px-4 py-2 text-yellow-900">
					<strong>Flagged Posts:</strong>
					<ul className="list-disc ml-5 mt-2">
						{user.flaggedPosts.map((post: any) => (
							<li key={post.id}>
								<span className="font-mono text-xs">"{post.text.slice(0, 60)}"</span>
								{post.flagReason && (
									<span className="ml-2 text-xs text-gray-600">({post.flagReason})</span>
								)}
							</li>
						))}
					</ul>
				</div>
			)}

			{user.reviewPosts && user.reviewPosts.length > 0 && (
				<div className="mt-4 rounded-md border-l-4 border-orange-400 bg-orange-50 px-4 py-2 text-orange-900">
					<strong>Posts Requiring Review:</strong>
					<ul className="list-disc ml-5 mt-2">
						{user.reviewPosts.map((post: any) => (
							<li key={post.id}>
								<span className="font-mono text-xs">"{post.text.slice(0, 60)}"</span>
								{post.flagReason && (
									<span className="ml-2 text-xs text-gray-600">({post.flagReason})</span>
								)}
							</li>
						))}
					</ul>
				</div>
			)}

			{user.sensitiveMessage && (
				<div className="mt-4 rounded-md border-l-4 border-red-400 bg-red-50 px-4 py-2 text-red-900">
					<strong>Important:</strong> {user.sensitiveMessage}
				</div>
			)}

			<div className="mt-4 text-sm text-gray-600">
				For privacy and security, your account is anonymous and cannot be linked to your real identity.
			</div>
		</div>
	</motion.div>
);
