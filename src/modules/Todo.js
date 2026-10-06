export let defaultTodos = []; // this is the default project

// i need to add a todo and a project.id, project.id is the key for getTodos
export function addTodo(todo, project = "default") {
	const todos = getTodos(project);
	console.log(todos);
	todos.push(todo); // pushing todo to array, and refreshing the page
	localStorage.setItem(project, JSON.stringify(todos));
}

// get the single todo based on id, this would work for searching
function getTodo(id) { }

export function deleteTodo(project, id) {
	const todos = JSON.parse(localStorage.getItem(project));
	const toDeleteTodo = todos.find((todo) => todo.id === id);
	const index = todos.findIndex((todo) => todo.id === toDeleteTodo.id);
	if (index > -1) {
		todos.splice(index, 1);
		localStorage.setItem(project, JSON.stringify(todos));
	} else {
		console.log("delete failed", index);
	}
}

// basically this works, i just need to link it to edit button
export function editTodo(id) {
	const todos = JSON.parse(localStorage.getItem("default")) || [];
	const toUpdateTodo = todos.find((todo) => todo.id === id);
	console.log(todos);

	if (toUpdateTodo) {
		toUpdateTodo.title = "new title";
		toUpdateTodo.description = "new description";
		toUpdateTodo.dueDate = "2026-9-28";
		toUpdateTodo.priority = "Priority 1";
	}

	localStorage.setItem("default", JSON.stringify(todos));
}

export function getTodos(project = "default") {
	if (localStorage.getItem(project) === null) {
		localStorage.setItem(project, JSON.stringify([]));
	}

	const raw = localStorage.getItem(project);
	const todos = JSON.parse(raw);
	return todos;
}
