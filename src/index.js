import "./styles.css";

import {
	clearDisplay,
	displayTodos,
	Header,
	MainContent,
	Sidebar,
	TodosContainer,
} from "./modules/DOM.js";
import { initListeners } from "./modules/Events.js";
import { getTodos, defaultTodos } from "./modules/Todo.js";
import { createProject, saveProject } from "./modules/Project.js";
import { createTodo } from "./modules/factories/todoFactory.js";

// based on my previous restaurant project, I was creating god object
// which is bad, because it takes too many responsibility
function initializeTodoList() {
	const data = getTodos();
	clearDisplay();
	displayTodos(data);
}

// this shows the default todos
function initializeTodo() {
	Sidebar();
	Header();
	MainContent();
	TodosContainer();
	// isTodosExist();
}

initializeTodo();
initListeners();
initializeTodoList();

// const work = createProject("Work");
// const job = createTodo({
// 	title: "find a job",
// 	description: "my job",
// 	dueDate: "2026-09-22",
// 	priority: "Priority 1",
// });

// console.log(work); // this now contains a project id, via createProject

// work.addTodo(job);
// console.log(work.getTodos());

// saveProject(work);
