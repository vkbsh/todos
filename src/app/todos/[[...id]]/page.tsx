import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs/server';

import { EditTodo } from '@/components/todos';
import { TodoList } from '@/components/todos';

export const runtime = 'edge';

export default async function TodoPage({ params }: { params: { id: string } }) {
	const { userId } = await auth();

	if (!userId) {
		return redirect('/');
	}

	if (!params.id) {
		return <TodoList />;
	}
	return <EditTodo id={params.id} />;
}
