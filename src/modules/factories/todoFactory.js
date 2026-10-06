export function createTodo({ title, description, dueDate, priority, project }) {
	return {
		id: crypto.randomUUID(),
		title: title,
		description: description,
		dueDate: dueDate,
		priority: priority,
		project: project,
	};
}
