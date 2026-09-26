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
import { getTodos } from "./modules/Todo.js";
import { createProject } from "./modules/Project.js";
import { createTodo } from "./modules/factories/todoFactory.js";
import { isTodosExist } from "./modules/helpers.js";

// based on my previous restaurant project, I was creating god object
// which is bad, because it takes too many responsibility
function initializeTodoList() {
	const data = getTodos();
	clearDisplay();
	displayTodos(data);
}

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

const work = createProject("Work");
const job = createTodo({
	title: "find a job",
	description: "my job",
	dueDate: "2026-09-22",
	priority: "Priority 1",
});

work.addTodo(job);
console.log(work.getTodos());
