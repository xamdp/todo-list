import "./styles.css";

import {
	clearDisplay,
	displayTodos,
	Header,
	MainContent,
	Sidebar,
	TodosContainer,
	displayDafaultTodos,
} from "./modules/DOM.js";
import { initListeners } from "./modules/Events.js";
import { getTodos } from "./modules/Todo.js";

// based on my previous restaurant project, I was creating god object
// which is bad, because it takes too many responsibility
function initializeTodoList() {
	const data = getTodos();
	if (data?.length === 0) {
		clearDisplay();
		displayDafaultTodos();
	} else {
		clearDisplay();
		displayTodos(data);
	}
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
initializeTodoList();
initListeners();
