export function createTodo({ title, description, dueDate, priority }) {
	return {
		id: crypto.randomUUID(),
		title: title,
		description: description,
		dueDate: dueDate,
		priority: priority,
	};
}
