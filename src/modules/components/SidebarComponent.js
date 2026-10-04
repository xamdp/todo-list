import TodoMenuIcon from "../../asset/icons/menu-todo.svg";
import TaskListIcon from "../../asset/icons/task-list.svg";
import ProjectBoxIcon from "../../asset/icons/box.svg";
import CreateProjectIcon from "../../asset/icons/create-project.svg";
import ProjectSelectIcon from "../../asset/icons/project-select.svg";

import CancelIcon from "../../asset/icons/cancel.svg";
import ArrowUpIcon from "../../asset/icons/arrow-up.svg";
import { getProjects } from "../Project.js";

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

export function createProjectSelection() {
	const createProjectBtn = document.createElement("button");
	createProjectBtn.type = "button";
	createProjectBtn.classList.add("selection", "create-project-btn");

	const icon = document.createElement("div");
	icon.innerHTML = CreateProjectIcon;
	icon.querySelector("svg").classList.add("selection-icon");

	const span = document.createElement("span");
	span.textContent = "Create Project";

	createProjectBtn.append(icon, span);
	return createProjectBtn;
}

export function createProjectForm() {
	const dialog = document.createElement("dialog");
	dialog.id = "project-modal";

	const projectForm = document.createElement("form");
	projectForm.className = "project-form";

	const heading = document.createElement("h3");
	heading.textContent = "Add Project";

	const projectName = document.createElement("div");
	projectName.className = "project-name";
	const nameLabel = document.createElement("label");
	nameLabel.textContent = "Name";
	const nameInput = document.createElement("input");
	nameInput.className = "project-name-input";
	projectName.append(nameLabel, nameInput);

	const formBtns = document.createElement("div");
	formBtns.className = "form-btns";

	const cancelBtn = createCancelBtn();
	const addBtn = createAddBtn();

	formBtns.append(cancelBtn, addBtn);

	projectForm.append(heading, projectName);
	dialog.append(projectForm, formBtns);
	return dialog;
}

// this should act like a dropdown same with priority-dropdown
export function viewProjectsSelection() {
	const viewProjectBtn = document.createElement("button");
	viewProjectBtn.type = "button";
	viewProjectBtn.setAttribute("popovertarget", "project-choices");
	viewProjectBtn.classList.add("selection", "projects");

	const icon = document.createElement("div");
	icon.innerHTML = ProjectBoxIcon;
	icon.querySelector("svg").classList.add("selection-icon");

	const span = document.createElement("span");
	span.textContent = "Projects";

	const projects = getProjects();

	const dropdown = projectDropdown(projects);
	viewProjectBtn.append(icon, span, dropdown);

	return viewProjectBtn;
}

// i think i need to pass the created project id and name in here, so i don't need to manually create them.
function projectDropdown(projects) {
	const dropdown = document.createElement("div");
	dropdown.className = "project-dropdown";
	dropdown.id = "project-choices";
	dropdown.setAttribute("popover", "auto");

	projects.forEach((project) => {
		const projectSelect = document.createElement("div");
		projectSelect.className = "project-select";
		projectSelect.dataset.id = project.id;
		const icon = document.createElement("div");
		icon.innerHTML = ProjectSelectIcon;
		icon.querySelector("svg").classList.add("project-icon");
		const text = document.createElement("p");
		const name =
			project.name.charAt(0).toUpperCase() + project.name.slice(1); // might create a function for this, capitalize first letter
		text.textContent = name;
		projectSelect.append(icon, text);

		dropdown.append(projectSelect);
	});

	return dropdown;
}

function createAddBtn() {
	const addBtn = document.createElement("button");
	addBtn.id = "projectAddBtn";
	addBtn.className = "add-btn";
	addBtn.type = "submit";
	addBtn.innerHTML = ArrowUpIcon;
	addBtn.querySelector("svg").classList.add("arrow-up-icon");
	return addBtn;
}

function createCancelBtn() {
	const cancelBtn = document.createElement("button");
	cancelBtn.id = "projectCancelBtn";
	cancelBtn.className = "cancel-btn";
	cancelBtn.type = "button";
	cancelBtn.innerHTML = CancelIcon;
	cancelBtn.querySelector("svg").classList.add("cancel-icon");
	return cancelBtn;
}
