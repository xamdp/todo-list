import TodoMenuIcon from "../../asset/icons/menu-todo.svg";
import TaskListIcon from "../../asset/icons/task-list.svg";
import ProjectBoxIcon from "../../asset/icons/box.svg";
import CreateProjectIcon from "../../asset/icons/create-project.svg";
import ProjectSelectIcon from "../../asset/icons/project-select.svg";

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

	const projectName = document.createElement("div");
	projectName.className = "project-name";
	const nameLabel = document.createElement("label");
	nameLabel.textContent = "Project Name";
	const nameInput = document.createElement("input");
	nameInput.className = "project-name-input";
	projectName.append(nameLabel, nameInput);

	projectForm.append(projectName);
	dialog.append(projectForm);
	return dialog;
}

// this should act like a dropdown same with priority-dropdown
export function viewProjectsSelection() {
	const viewProjectBtn = document.createElement("button");
	viewProjectBtn.type = "button";
	viewProjectBtn.classList.add("selection", "projects");

	const icon = document.createElement("div");
	icon.innerHTML = ProjectBoxIcon;
	icon.querySelector("svg").classList.add("selection-icon");

	const span = document.createElement("span");
	span.textContent = "Projects";

	const dropdown = projectDropdown();
	viewProjectBtn.append(icon, span, dropdown);

	return viewProjectBtn;
}

// i think i need to pass the created project id and name in here, so i don't need to manually create them.
function projectDropdown() {
	const dropdown = document.createElement("div");
	dropdown.className = "project-dropdown";
	dropdown.classList.toggle("hidden");

	const firstProject = document.createElement("div");
	firstProject.className = "project-select";
	const icon = document.createElement("div");
	icon.innerHTML = ProjectSelectIcon;
	icon.querySelector("svg").classList.add("project-icon");
	const text = document.createElement("p");
	text.textContent = "Work";
	firstProject.append(icon, text);

	dropdown.append(firstProject);

	return dropdown;
}
