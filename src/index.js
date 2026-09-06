import "./styles.css";

import { Header, MainContent, Sidebar, TodosContainer } from "./modules/DOM.js";
import { initListeners } from "./modules/Events.js";

// based on my previous restaurant project, I was creating god object
// which is bad, because it takes too many responsibility
function initializeTodo() {
	Sidebar();
	Header();
	MainContent();
	TodosContainer();
}

initializeTodo();
initListeners();
