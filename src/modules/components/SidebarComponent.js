import TodoMenuIcon from "../../asset/icons/menu-todo.svg";
import TaskListIcon from "../../asset/icons/task-list.svg";
export function addTodoSelection() {
	const addTodoBtn = document.createElement("button");
	addTodoBtn.type = "button";
	addTodoBtn.classList.add("selection", "show-modal");

	const icon = document.createElement("div");
	icon.innerHTML = TodoMenuIcon;
	icon.querySelector("svg").classList.add("selection-icon");

	const span = document.createElement("span");
	span.textContent = "Add Todo";

	addTodoBtn.append(icon, span);
	return addTodoBtn;
}

export function viewTodosSelection() {
	const viewTodosBtn = document.createElement("button");
	viewTodosBtn.type = "button";
	viewTodosBtn.classList.add("selection", "show-todos"); // need to create .show-todos

	const icon = document.createElement("div");
	icon.innerHTML = TaskListIcon;
	icon.querySelector("svg").classList.add("selection-icon");

	const span = document.createElement("span");
	span.textContent = "Todos";

	viewTodosBtn.append(icon, span);
	return viewTodosBtn;
}
