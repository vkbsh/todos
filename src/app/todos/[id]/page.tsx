import { EditTodo } from '@/components/todos';
import { Todo } from '@/types';

const getTodoById = (id: string): Todo => {
	return {
		id,
		title: 'My Mock Todo',
		completed: false,
		description: 'This is a mock todo',
	};
};

export default function TodoPage({ params }: { params: { id: string } }) {
	const todo = getTodoById(params.id);

	return (
		<>
			<h1>Todo: #{todo.id}</h1>
			<EditTodo todo={todo} />
		</>
	);
}
