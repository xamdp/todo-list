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
}

initializeTodo();
initListeners();
initializeTodoList();

const school = createProject("School");
const hw = createTodo({ title: "Math HW" });

const work = createProject("Work");
const job = createTodo({
	title: "find a job",
	description: "my job",
	dueDate: "2026-09-22",
	priority: "Priority 1",
});
school.addTodo(hw);
console.log(school.getTodos());

work.addTodo(job);
console.log(work.getTodos());
