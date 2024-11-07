import { drizzle } from 'drizzle-orm/d1';
import { NextRequest } from 'next/server';
import { getRequestContext } from '@cloudflare/next-on-pages';

import { Todo } from '@/types';

export const runtime = 'edge';

const mockData: Todo[] = [
	{
		id: '1',
		title: 'Todo 1',
		completed: false,
	},
	{
		id: '2',
		title: 'Todo 2',
		completed: false,
	},
	{
		id: '3',
		title: 'Todo 3',
		completed: false,
	},
];

export async function GET(request: NextRequest) {
	const id = request.nextUrl.searchParams.get('id');

	// const d1 = getRequestContext().env.DB;
	// const db = drizzle(d1);

	if (id) {
		return Response.json({
			data: mockData.find((todo) => todo.id === id),
		});
	}

	return Response.json({
		data: mockData,
	});
}

export async function POST(request: NextRequest) {
	const body = await request.json();

	console.log('body: ', body);

	// TODO: validate body

	// const d1 = getRequestContext().env.DB;
	// const db = drizzle(d1);

	return Response.json({
		data: body,
	});
}

export async function PUT(request: NextRequest) {
	const body = await request.json();

	console.log('body: ', body);

	// TODO: validate body

	// const d1 = getRequestContext().env.DB;
	// const db = drizzle(d1);

	return Response.json({
		data: body,
	});
}

export async function DELETE(request: NextRequest) {
	const id = request.nextUrl.searchParams.get('id');

	// const d1 = getRequestContext().env.DB;
	// const db = drizzle(d1);

	if (!id) {
		return Response.json({
			error: 'No id provided',
		});
	}

	return Response.json({
		data: 'Todo with id ' + id + ' deleted',
	});
}
