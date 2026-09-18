let defaultTodos = []; // this is the default project

function addTodo(todo) {
	defaultTodos.push(todo);
	localStorage.setItem("default", JSON.stringify(defaultTodos));
	// console.log(defaultTodos);
}

// get the single todo based on id
function getTodo(id) { }

function deleteTodo(id) { }

function editTodo(id) { }

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
