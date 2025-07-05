'use client';
import React from 'react';
import { trpc } from '@utils/trpc';
import { useRouter } from 'next/navigation';
import { FullScreenLoading } from '@components/ui/Loading';
import { ProfileLayout } from '@components/layout/Profile';

export default function ProfilePage() {
	const router = useRouter();
	const { data: user, isLoading } = trpc.user.me.useQuery(undefined, {
		refetchOnWindowFocus: false,
	});

	if (isLoading) {
		return <FullScreenLoading />;
	}

	if (!user) {
		router.replace('/auth/login');
		return null;
	}

	return <ProfileLayout user={user} onBack={() => router.back()} />;
}