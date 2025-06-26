import { NextRequest } from 'next/server';
import { prisma } from '@server/db/client';
import { hashPassword } from '@utils/server.util';

export async function POST(req: NextRequest) {
	const { username, password } = await req.json();
	if (!username || !password || typeof username !== 'string' || typeof password !== 'string') {
		return new Response(JSON.stringify({ success: false }), { status: 400 });
	}
	const user = await prisma.user.findUnique({
		where: { username: username.trim() },
	});
	if (!user) {
		return new Response(JSON.stringify({ success: false }), { status: 404 });
	}
	const hashed = await hashPassword(password);
	await prisma.user.update({
		where: { username: username.trim() },
		data: { password: hashed },
	});
	return new Response(JSON.stringify({ success: true }), { status: 200 });
}
