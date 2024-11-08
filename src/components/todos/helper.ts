import { Todo } from '@/lib/drizzle/schema';

const fetchData = async <T>(url: string, options?: RequestInit) => {
	try {
		const res = await fetch(url, {
			headers: {
				'Content-Type': 'application/json',
				...options?.headers,
			},
			...options,
		});

		const json: { data: T } = await res.json();

		return json.data;
	} catch (e) {
		console.error(`Error with request to ${url}:`, e);
		return null;
	}
};

export const getTodos = () => fetchData<Todo[]>('/api/todos');
export const getTodo = (id: string) => fetchData<Todo>(`/api/todos?id=${id}`);
export const createTodo = (title: string, userId: string) =>
	fetchData<Todo>('/api/todos', {
		method: 'POST',
		body: JSON.stringify({ title, userId }),
	});
export const updateTodo = (todo: Todo) =>
	fetchData<Todo>(`/api/todos?id=${todo.id}`, {
		method: 'PUT',
		body: JSON.stringify(todo),
	});
export const deleteTodo = (todo: Todo) =>
	fetchData(`/api/todos?id=${todo.id}`, {
		method: 'DELETE',
	});
