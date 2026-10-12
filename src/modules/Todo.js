export let defaultTodos = []; // this is the default project

// i need to add a todo and a project.id, project.id is the key for getTodos
export function addTodo(todo, project) {
	console.log(project);
	const todos = getTodos(project);
	// console.log(todos);
	todos.push(todo); // pushing todo to array, and refreshing the page
	console.log(todos);
	localStorage.setItem(project, JSON.stringify(todos));
}

// get the single todo based on id, this would work for searching
export function getTodo(id, project) {
	const todos = JSON.parse(localStorage.getItem(project)) || [];
	const todo = todos.find((todo) => todo.id === id);
	// console.log(todo);
	return todo;
}

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

export function updateTodoStatus(id, project, status) {
	const todos = JSON.parse(localStorage.getItem(project)) || [];
	const todo = todos.find((todo) => todo.id === id);

	if (!todo) return;

	todo.status = status;
	localStorage.setItem(project, JSON.stringify(todos));
}

// accepts the todo obj and id of todo
export function editTodo(todo, id, project) {
	// i should restrict user to change projects when editing a todo
	const todos = JSON.parse(localStorage.getItem(project)) || [];
	const toUpdateTodo = todos.find((todo) => todo.id === id);
	if (!toUpdateTodo) {
		console.log("No todo found in this project id:", project);
		return;
	}

	if (toUpdateTodo) {
		toUpdateTodo.title = todo.title;
		toUpdateTodo.description = todo.description;
		toUpdateTodo.dueDate = todo.dueDate;
		toUpdateTodo.priority = todo.priority;
	}
	console.log(toUpdateTodo);

	localStorage.setItem(project, JSON.stringify(todos));
}

export function getTodos(project = "default") {
	if (localStorage.getItem(project) === null) {
		localStorage.setItem(project, JSON.stringify([]));
	}

	const raw = localStorage.getItem(project);
	const todos = JSON.parse(raw);
	return todos;
}
