'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { FilePenLine, Trash } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';

import { Todo } from '@/types';

export function TodoList() {
	const [newTodo, setNewTodo] = useState('');
	const [todos, setTodos] = useState<Todo[]>([]);

	useQuery({
		queryKey: ['todos'],
		queryFn: async () => {
			try {
				const res = await fetch('/api/todos');
				const { data } = (await res.json()) as { data: Todo[] };

				if (data?.length) {
					setTodos(data);
				}
			} catch (e) {
				console.error('Error fetching todos: ', e);
			}
		},
	});

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

	const submitAddTodo = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		addTodo({
			id: Math.random().toString(),
			title: newTodo,
			completed: false,
		});

		setNewTodo('');
	};

	return (
		<div className="flex flex-col gap-2">
			<form onSubmit={submitAddTodo} className="flex flex-row gap-2">
				<Input
					value={newTodo}
					onChange={(e) => setNewTodo(e.target.value)}
					placeholder="What needs to be done?"
				/>

				<Button disabled={!newTodo} type="submit">
					Add Todo
				</Button>
			</form>
			<ul className="flex flex-col gap-2">
				{todos.map((todo) => (
					<li
						key={todo.id}
						className="flex flex-row items-center justify-between gap-2">
						<Label className="truncate flex flex-row items-center gap-2">
							<Checkbox
								checked={todo.completed}
								onClick={() => toggleTodo(todo.id)}
							/>
							<span
								className={
									todo.completed ? 'line-through' : 'truncate'
								}>
								{todo.title}
							</span>
						</Label>
						<span className="flex flex-row items-center gap-2">
							<Link href={`/todos/${todo.id}`}>
								<FilePenLine />
							</Link>
							<Button
								size="icon"
								variant="destructive"
								onClick={() => removeTodo(todo.id)}>
								<Trash />
							</Button>
						</span>
					</li>
				))}
			</ul>
		</div>
	);
}

export function EditTodo({ id }: { id: string }) {
	const [todo, setTodo] = useState<Todo | null>(null);

	useQuery({
		queryKey: ['todo', id],
		queryFn: async () => {
			try {
				const res = await fetch('/api/todos?id=' + id);
				const { data } = (await res.json()) as { data: Todo };

				if (data) {
					setTodo(data);
				}
			} catch (e) {
				console.error('Error fetching todo: ', id, e);
			}
		},
	});

	const submitUpdateTodo = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!todo) {
			return;
		}

		console.log(todo);

		// TODO: add mutation to update todo

		// 	setTodo(data);
	};

	const deleteTodo = () => {
		// TODO: add mutation to delete todo
		console.log('delete todo', todo?.id);
	};

	return (
		<form onSubmit={submitUpdateTodo} className="flex flex-col gap-2">
			<Label className="flex flex-col gap-2">
				<span>Title</span>
				<Input value={todo?.title} />
			</Label>
			<Label className="flex flex-col gap-2">
				<span>Description</span>
				<Textarea value={todo?.description} />
			</Label>
			<Label className="flex flex-row gap-2">
				<span>Completed</span>
				<Checkbox checked={todo?.completed} />
			</Label>
			<Label className="flex flex-row gap-2">
				<Button type="submit" disabled>
					Save
				</Button>
				<Button variant="destructive" disabled onClick={deleteTodo}>
					Delete
				</Button>
			</Label>
		</form>
	);
}
