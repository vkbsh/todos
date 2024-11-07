import { EditTodo } from '@/components/todos';

export default function TodoPage({ params }: { params: { id: string } }) {
	return (
		<>
			<h1>Todo: #{params.id}</h1>
			<EditTodo id={params.id} />
		</>
	);
}
