export let defaultTodos = []; // this is the default project

export function addTodo(todo) {
	const todos = getTodos();
	console.log(todos);
	todos.push(todo); // pushing todo to array, and refreshing the page
	localStorage.setItem("default", JSON.stringify(todos));
}

// get the single todo based on id
function getTodo(id) { }

export function deleteTodo(id) { }

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

export function getTodos() {
	if (localStorage.getItem("default") === null) {
		localStorage.setItem("default", "[]");
	}

	const raw = localStorage.getItem("default");
	const todos = JSON.parse(raw);
	return todos;
}
