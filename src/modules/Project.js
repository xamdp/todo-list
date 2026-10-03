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
	// i need to get projects first and write it
	const projects = getProjects();
	console.log(projects);
	projects.push(project);

	localStorage.setItem("projects", JSON.stringify(projects)); // bru, so it should be the array, not the individual object
}

export function getProjects() {
	if (localStorage.getItem("projects") === null) {
		localStorage.setItem("projects", JSON.stringify([]));
	}

	const raw = localStorage.getItem("projects");
	const projects = JSON.parse(raw);
	return projects;
}
