// basically i think i need to store separate keys for default, and project lists
// 1 key for projects lists, 'abc123', 'def456', 'hij789' and so on, these are project ids, which store in projects key
// 1 key for default, which stores the todos created not associated with any projects
// and of course all the keys listed in projects.

export function createProject(name = "default") {
	let todos = [];
	return {
		id: crypto.randomUUID(),
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

export function saveProject(project) {
	// i don't if should i store it in projects list, the createdproject object already contains an id, so iguess yes.
	localStorage.setItem("projects", project.id);
}

export function getProjects() { }
