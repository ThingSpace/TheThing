import { NextRequest } from 'next/server';
import { prisma } from '@server/db/client';

export async function POST(req: NextRequest) {
	const { username } = await req.json();
	if (!username || typeof username !== 'string') {
		return new Response(JSON.stringify({ exists: false }), { status: 400 });
	}
	const user = await prisma.user.findUnique({
		where: { username: username.trim() },
		select: { id: true },
	});
	return new Response(JSON.stringify({ exists: !!user }), { status: 200 });
}
