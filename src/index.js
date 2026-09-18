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
