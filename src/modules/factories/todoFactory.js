export function createTodo({ title, desc, dueDate, priority }) {
	return {
		title: title,
		description: desc,
		dueDate: dueDate,
		priority: priority,
	};
}
