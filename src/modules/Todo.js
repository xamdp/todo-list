let defaultTodos = []; // this is the default project

function addTodo(todo) {
	defaultTodos.push(todo);
	localStorage.setItem("default", JSON.stringify(defaultTodos));
	// console.log(defaultTodos);
}

// get the single todo based on id
function getTodo(id) { }

function deleteTodo(id) { }

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

function getTodos() {
	if (localStorage.getItem("default") === null) {
		localStorage.setItem("default", "[]");
		localStorage.getItem("default");
		return;
	}

	const raw = localStorage.getItem("default");
	const todos = JSON.parse(raw);
	return todos;
}

export { addTodo, deleteTodo, getTodos };
