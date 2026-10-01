import TodoMenuIcon from "../../asset/icons/menu-todo.svg";
import TaskListIcon from "../../asset/icons/task-list.svg";
import ProjectBoxIcon from "../../asset/icons/box.svg";
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

export function viewProjectsSelection() {
	const viewProjectBtn = document.createElement("button");
	viewProjectBtn.type = "button";
	viewProjectBtn.classList.add("selection");

	const icon = document.createElement("div");
	icon.innerHTML = ProjectBoxIcon;
	icon.querySelector("svg").classList.add("selection-icon");

	const span = document.createElement("span");
	span.textContent = "Projects";

	viewProjectBtn.append(icon, span);
	return viewProjectBtn;
}
