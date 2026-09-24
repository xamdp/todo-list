export function getProjects() { }

export function createProject(name) {
	let todos = [];
	return {
		name,
		addTodo(todo) {
			todos.push(todo);
		},
		removeTodo(id) {
			const index = todos.findIndex((todo) => todo.id === id);
			if (index < 0) return;
			todos.splice(index, 1);
		},
		getTodos() {
			return todos;
		},
	};
}
