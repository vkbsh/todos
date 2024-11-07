'use client';

import { useState } from 'react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import Link from 'next/link';

export type Todo = {
	id: string;
	title: string;
	completed: boolean;
	description?: string;
};

const mockTodos: Todo[] = [
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

export function TodoList() {
	const [newTodo, setNewTodo] = useState('');
	const [todos, setTodos] = useState<Todo[]>(mockTodos);

	const addTodo = (todo: Todo) => {
		setTodos([...todos, todo]);
	};

	const removeTodo = (id: string) => {
		setTodos(todos.filter((todo) => todo.id !== id));
	};

	const toggleTodo = (id: string) => {
		setTodos(
			todos.map((todo) => {
				if (todo.id === id) {
					return { ...todo, completed: !todo.completed };
				}
				return todo;
			}),
		);
	};

	const submit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		addTodo({
			id: Math.random().toString(),
			title: newTodo,
			completed: false,
		});

		setNewTodo('');
	};

	return (
		<div>
			<form onSubmit={submit}>
				<Label className="flex flex-row gap-2">
					<Input
						value={newTodo}
						onChange={(e) => setNewTodo(e.target.value)}
						placeholder="What needs to be done?"
					/>
				</Label>
				<Button type="submit">Add Todo</Button>
			</form>
			<ul>
				{todos.map((todo) => (
					<li key={todo.id}>
						<Label>
							<Checkbox
								checked={todo.completed}
								onClick={() => toggleTodo(todo.id)}
							/>
							<span>{todo.title}</span>
							<Link href={`/todos/${todo.id}`}>Edit</Link>
							<Button onClick={() => removeTodo(todo.id)}>
								Delete
							</Button>
						</Label>
					</li>
				))}
			</ul>
		</div>
	);
}

export function EditTodo({ todo }: { todo: Todo }) {
	return (
		<div>
			<Label>
				<span>Completed</span>
				<Checkbox />
			</Label>
		</div>
	);
}
