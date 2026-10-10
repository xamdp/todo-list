import "./styles.css";

import {
	addTodoCard,
	clearDisplay,
	displayTodos,
	Header,
	MainContent,
	showAddTodoCard,
	Sidebar,
	TodosContainer,
} from "./modules/DOM.js";
import { initListeners } from "./modules/Events.js";
import { getTodos, defaultTodos } from "./modules/Todo.js";

// based on my previous restaurant project, I was creating god object
// which is bad, because it takes too many responsibility
function initializeTodoList() {
	const data = getTodos();
	if (data.length === 0) {
		showAddTodoCard();
	}
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
initializeTodoList();
initListeners();
