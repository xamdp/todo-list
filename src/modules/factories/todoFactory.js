export function createTodo({
	title,
	description,
	dueDate,
	priority,
	project,
	status,
}) {
	return {
		id: crypto.randomUUID(),
		title: title,
		description: description,
		dueDate: dueDate,
		priority: priority,
		project: project,
		status: status,
	};
}
