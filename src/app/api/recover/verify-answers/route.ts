import { NextRequest } from 'next/server';
import { prisma } from '@server/db/client';

export async function POST(req: NextRequest) {
	const { username, answers } = await req.json();
	if (!username || !Array.isArray(answers)) {
		return new Response(JSON.stringify({ correct: false }), { status: 400 });
	}
	const user = await prisma.user.findUnique({
		where: { username: username.trim() },
		include: {
			journals: { orderBy: { createdAt: 'asc' }, take: 1 },
			posts: { orderBy: { createdAt: 'desc' }, take: 1 },
		},
	});
	if (!user) return new Response(JSON.stringify({ correct: false }), { status: 200 });

	let correct = 0;
	const createdAt = user.createdAt;
	const expectedMonthYear = createdAt
		? `${createdAt.toLocaleString('default', { month: 'long' })} ${createdAt.getFullYear()}`
		: '';
	if (
		answers[0] &&
		expectedMonthYear &&
		answers[0].toLowerCase().replace(/\s+/g, '') === expectedMonthYear.toLowerCase().replace(/\s+/g, '')
	) {
		correct++;
	}
	const firstJournal = user.journals?.[0]?.title || '';
	const expectedFirstWord = firstJournal.split(/\s+/)[0] || '';
	if (
		answers[1] &&
		expectedFirstWord &&
		answers[1].toLowerCase() === expectedFirstWord.toLowerCase()
	) {
		correct++;
	}
	const lastNote = user.posts?.[0]?.text || '';
	const expectedNote = lastNote.split(/\s+/).slice(0, 5).join(' ').toLowerCase();
	if (
		answers[2] &&
		expectedNote &&
		answers[2].toLowerCase().includes(expectedNote)
	) {
		correct++;
	}
	return new Response(JSON.stringify({ correct: correct >= 2 }), { status: 200 });
}
