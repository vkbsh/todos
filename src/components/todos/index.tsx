'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FilePenLine, Trash } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';

import { Todo } from '@/lib/drizzle/schema';
import useClerkAuth from '@/hooks/useClerkAuth';

import {
	getTodo,
	getTodos,
	createTodo,
	updateTodo,
	deleteTodo,
} from './helper';

export function TodoList() {
	const router = useRouter();
	const queryClient = useQueryClient();
	const [title, setTitle] = useState('');
	const { user } = useClerkAuth();
	const userId = user?.id ?? '';

	const { data: todos = [] } = useQuery({
		queryKey: ['todos'],
		queryFn: () => getTodos(),
		initialData: [],
	});

	const mutationCreate = useMutation({
		mutationFn: (title: string) => createTodo(title, userId),
		onSuccess: () => {
			setTitle('');
			queryClient.invalidateQueries({ queryKey: ['todos'] });
		},
	});

	const mutationUpdate = useMutation({
		mutationFn: (todo: Todo) => updateTodo(todo),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['todos'] });
		},
	});

	const mutationDelete = useMutation({
		mutationFn: (todo: Todo) => deleteTodo(todo),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['todos'] });
		},
	});

	const toggleTodo = (todo: Todo) => {
		mutationUpdate.mutate({ ...todo, completed: !todo.completed });
	};

	return (
		<div className="flex flex-col gap-2 md:max-w-2xl md:mx-auto">
			<form
				onSubmit={(e) => {
					e.preventDefault();
					mutationCreate.mutate(title);
				}}
				className="flex flex-row gap-2">
				<Input
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					placeholder="What needs to be done?"
				/>
				<Button disabled={!title} type="submit">
					Add Todo
				</Button>
			</form>
			<ul className="flex flex-col gap-2">
				<AnimatePresence initial={false}>
					{todos?.length &&
						todos.map((todo) => (
							<motion.li
								layout
								key={todo.id}
								initial={{ opacity: 0, height: 0 }}
								animate={{ opacity: 1, height: 'auto' }}
								exit={{ opacity: 0, height: 0 }}
								transition={{
									opacity: { duration: 0.2 },
									height: { duration: 0.3 },
								}}
								className="flex flex-row items-center justify-between gap-2">
								<Label className="truncate flex flex-row items-center gap-2 cursor-pointer">
									<Checkbox
										checked={todo.completed}
										onClick={() => toggleTodo(todo)}
									/>
									<span
										className={
											todo.completed
												? 'line-through'
												: 'truncate'
										}>
										{todo.title}
									</span>
								</Label>
								<span className="flex flex-row items-center gap-2">
									<Button
										size="icon"
										variant="ghost"
										onClick={() =>
											router.push(`/todos/${todo.id}`)
										}>
										<FilePenLine />
									</Button>
									<Button
										size="icon"
										variant="destructive"
										onClick={() =>
											mutationDelete.mutate(todo)
										}>
										<Trash />
									</Button>
								</span>
							</motion.li>
						))}
				</AnimatePresence>
			</ul>
		</div>
	);
}

export function EditTodo({ id }: { id: string }) {
	const router = useRouter();
	const queryClient = useQueryClient();
	const [localTodo, setLocalTodo] = useState<Todo | null>(null);

	const { data: todo, error } = useQuery({
		queryKey: ['todo', id],
		queryFn: () => getTodo(id),
	});

	useEffect(() => {
		if (todo) {
			setLocalTodo(todo as Todo);
		}
	}, [todo]);

	const mutationUpdate = useMutation({
		mutationFn: (todo: Todo) => updateTodo(todo),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['todo', id] });
			queryClient.invalidateQueries({ queryKey: ['todos'] });
		},
	});

	const mutationDelete = useMutation({
		mutationFn: (todo: Todo) => deleteTodo(todo),
		onSuccess: () => {
			router.push('/todos');
		},
	});

	if (error) {
		return (
			<div className="flex flex-col gap-2">
				<span className="text-center text-red-500">
					No todo found with id: {id}
				</span>
				<Button onClick={() => router.push('/todos')}>Go Back</Button>
			</div>
		);
	}

	if (!localTodo) {
		return <div>Loading...</div>;
	}

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				mutationUpdate.mutate(localTodo);
			}}
			className="flex flex-col gap-2">
			<Label className="flex flex-col gap-2">
				<span>Title</span>
				<Input
					onChange={(e) =>
						setLocalTodo({ ...localTodo, title: e.target.value })
					}
					value={localTodo.title}
				/>
			</Label>
			<Label className="flex flex-col gap-2">
				<span>Description</span>
				<Textarea
					onChange={(e) =>
						setLocalTodo({
							...localTodo,
							description: e.target.value,
						})
					}
					value={localTodo.description ?? ''}
				/>
			</Label>
			<Label className="flex flex-row gap-2">
				<span>Completed</span>
				<Checkbox
					checked={localTodo.completed}
					onClick={() =>
						setLocalTodo({
							...localTodo,
							completed: !localTodo.completed,
						})
					}
				/>
			</Label>
			<div className="flex flex-row gap-4">
				<Button type="submit">Save</Button>
				<Button variant="ghost" onClick={() => router.push('/todos')}>
					Cancel
				</Button>
				<Button
					variant="destructive"
					className="ml-auto"
					onClick={() => mutationDelete.mutate(localTodo)}>
					Delete
				</Button>
			</div>
		</form>
	);
}
