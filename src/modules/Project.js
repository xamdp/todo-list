// import { createTodo } from "./factories/todoFactory.js";
// import { addTodo } from "./Todo.js";

export function getProjects() { }

// i don't understand, do i use the addTodo() from ./Todo? or what
export function createProject(name) {
	let todos = [];
	return {
		name,
		addTodo(todo) {
			todos.push(todo);
		},
		removeTodo() {
			todos.splice(i, 1);
		},
		getTodos() {
			return todos;
		},
	};
}
