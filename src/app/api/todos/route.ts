import { cookies } from 'next/headers';
import { eq, desc } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/d1';
import { NextRequest } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { getRequestContext } from '@cloudflare/next-on-pages';

import { todos, Todo } from '@/lib/drizzle/schema';

export const runtime = 'edge';

const getQueryId = (request: NextRequest): string | null =>
	request.nextUrl.searchParams.get('id');

const getDB = () => {
	const d1 = getRequestContext().env.DB;
	return drizzle(d1);
};

export async function GET(request: NextRequest) {
	const db = getDB();
	const rawId = getQueryId(request) as string;
	const id = parseInt(rawId);
	const { userId } = await auth();

	if (id) {
		try {
			const todo = await db.select().from(todos).where(eq(todos.id, id));

			return Response.json({
				data: todo[0],
			});
		} catch (e) {
			// @ts-ignore
			return Response.json({ error: e.message }, { status: 400 });
		}
	}

	try {
		const todoList = await db
			.select()
			.from(todos)
			.orderBy(desc(todos.createdAt))
			.where(eq(todos.userId, userId as string))
			.all();

		return Response.json({
			data: todoList,
		});
	} catch (e) {
		// @ts-ignore
		return Response.json({ error: e.message }, { status: 400 });
	}
}

export async function POST(request: NextRequest) {
	const db = getDB();
	const body: Todo = await request.json();

	try {
		const todo = await db
			.insert(todos)
			.values({
				title: body.title,
				userId: body.userId,
			})
			.returning();

		return Response.json({
			data: todo[0],
		});
	} catch (e) {
		// @ts-ignore
		return Response.json({ error: e.message }, { status: 400 });
	}
}

export async function PUT(request: NextRequest) {
	const db = getDB();
	const rawId = getQueryId(request) as string;
	const id = parseInt(rawId);
	const body: Todo = await request.json();

	if (!id) {
		return new Response('id is required', { status: 400 });
	}

	try {
		const todo = await db
			.update(todos)
			.set({
				id: body.id,
				title: body.title,
				description: body.description,
				completed: body.completed,
			})
			// TODO: userId from headers
			.where(eq(todos.id, body.id))
			.returning();

		return Response.json({
			data: todo[0],
		});
	} catch (error) {
		return Response.json({ error }, { status: 400 });
	}
}

export async function DELETE(request: NextRequest) {
	const db = getDB();
	const rawId = getQueryId(request) as string;
	const id = parseInt(rawId);

	if (!id) {
		return new Response('id is required', { status: 400 });
	}

	const deletedTodo = await db
		.delete(todos)
		// TODO: userId from headers
		.where(eq(todos.id, id))
		.returning();

	return Response.json({ data: deletedTodo });
}
