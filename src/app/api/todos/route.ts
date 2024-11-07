import { drizzle } from 'drizzle-orm/d1';
import { NextRequest } from 'next/server';
import { getRequestContext } from '@cloudflare/next-on-pages';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
	// const d1 = getRequestContext().env.DB;
	// const db = drizzle(d1);

	return Response.json({
		data: [
			{ id: 1, title: 'Todo 1', description: '', completed: false },
			{ id: 2, title: 'Todo 2', description: '', completed: false },
		],
	});
}
