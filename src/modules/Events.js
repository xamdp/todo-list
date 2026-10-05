import { createTodo } from "./factories/todoFactory.js";
import { addTodo, getTodos } from "./Todo.js";
import {
	clearDisplay,
	createDescriptionInput,
	displayProject,
	displayTodoHeading,
	displayTodos,
	renderFieldProjectSelect,
} from "./DOM.js";
import { checkDateInput, getProjectId } from "./helpers.js";
import { createProject, getProjects, saveProject } from "./Project.js";
import { renderSidebarProjectSelect } from "./components/SidebarComponent.js";

function handleAddTodoBtnClick() {
	const modal = document.getElementById("todo-modal");
	modal.showModal();

	// const addBtnDiv = document.querySelector(".card-div");
	// addBtnDiv.classList.toggle("hidden");
}

function closeTodoModal() {
	const modal = document.getElementById("todo-modal");
	modal.close();

	const dueDateInput = document.querySelector(".datepicker-input");

	const priorityText = document.querySelector(".priority-text");
	priorityText.classList.add("hidden");
	priorityText.classList.remove("active");

	const descInput = document.querySelector("#desc-input");
	if (descInput === null) {
		return;
	}
	descInput.remove();
}

function closeProjectModal() {
	const modal = document.getElementById("project-modal");
	modal.close();
}

function resetForm() {
	const todoForm = document.querySelector(".todo-form");
	const dateText = document.querySelector(".date-text");
	const priorityText = document.querySelector(".priority-text");
	todoForm.reset();
	dateText.textContent = "";
	dateText.classList.toggle("hidden");
	priorityText.textContent = "";
	priorityText.classList.toggle("hidden");
}

function selectedProject(event) {
	const selected = event.target.closest(".project-select").dataset.id;
	console.log(selected);

	const projects = getProjects();
	const project = projects.find((project) => project.id === selected);
	if (project) {
		// i think i need to call getTodos here, and pass the matchProject
		const todos = getTodos(project.id);
		console.log(todos);
		clearDisplay();
		displayProject(project);
		displayTodos(todos);
	} else {
		console.log(`No project exist with the id: ${selected}`);
	}
}

function handleAddTodo() {
	const userInput = {
		title: document.querySelector("#title-input").value,
		description: document.querySelector("#desc-input").value,
		dueDate: document.querySelector(".date-text").textContent,
		priority: document.querySelector(".priority-text").textContent,
	};
	const newTodo = createTodo(userInput);
	const projectId = getProjectId();
	const projects = getProjects();
	const project = projects.find((project) => project.id === projectId);
	if (project) {
		addTodo(newTodo, projectId); // this works for now, because I am using the default project, here to, i need to pass the project.id
		resetForm();
		const dataToDisplay = getTodos(projectId); // need to pass here the project.id
		clearDisplay();
		displayProject(project);
		displayTodos(dataToDisplay);
	} else {
		addTodo(newTodo);
		resetForm();
		const dataToDisplay = getTodos();
		clearDisplay();
		displayTodos(dataToDisplay);
	}
}

function handleDisplayTodos() {
	const todos = getTodos();
	clearDisplay();
	displayTodoHeading();
	displayTodos(todos);
}

function handleEditTodo() {
	// how should i get the todo id, uponn clicking edit btn
	// i think i need to add a data-id in .todo div
	const userInput = {
		title: title,
		description: description,
		dueDate: dueDate,
		priority: priority,
	};
}

function descriptionBtnToggle() {
	if (document.querySelector("#desc-input")) return;
	createDescriptionInput();
}

// .date-text should not be hidden when the user decided to change the date
function dueDateBtnToggle(event) {
	const dateText = document.querySelector(".date-text");
	dateText.classList.remove("hidden");
	// text-content should not set antything if the target.value holds no value
	dateText.textContent = event.target.value;
	checkDateInput();
}

function priorityBtnToggle(e) {
	const priorityDropdown = document.querySelector(".priorities-dropdown");
	const prioritySelect = e.target.closest(".priority-select");
	if (prioritySelect) {
		// i could also update the textContent of the priority field btn
		priorityDropdown.hidePopover();
	}
}

// i might no longer need this, popovertarget and popover attr does the job
function handleCloseDropdown(event) {
	const priorityDropdown = document.querySelector(".priorities-dropdown");
	const priorityBtn = document.querySelector(".todo-priority");
	if (!priorityBtn.contains(event.target)) {
		priorityDropdown.classList.add("hidden");
	}
}

function displaySelectedPriority(event) {
	const priorityText = document.querySelector(".priority-text");
	const selectedPriority = event.currentTarget.querySelector("p").textContent;
	priorityText.textContent = selectedPriority;
	priorityText.classList.remove("hidden");
}

function displaySelectedProject(event) {
	const selected = event.target.closest(".select-project");
	console.log(selected);
	const projectsDropdown = document.querySelector(".projects-dropdown");
	const selectedProjectId = selected.dataset.id;
	const selectedProjectName = selected.dataset.name;
	let projectSelectionBtn = document.querySelector(".project-selection");
	let projectSelectionText = document
		.querySelector(".project-selection")
		.querySelector("p");
	projectSelectionText.textContent = selectedProjectName;
	projectSelectionBtn.setAttribute("data-id", selectedProjectId);
	projectsDropdown.hidePopover();
}

function handleCreateProject(event) {
	event.preventDefault();
	const projectModal = document.querySelector("#project-modal");
	if (projectModal.open) {
		projectModal.close();
	} else {
		projectModal.showModal();
	}
}

function handleAddProject(e) {
	if (e) e.preventDefault();
	const projectName = document.querySelector(".project-name-input").value;
	const project = createProject(projectName);
	saveProject(project);

	const sidebarDropdown = document.querySelector("#project-choices");
	if (sidebarDropdown) {
		const projectSelect = renderSidebarProjectSelect(project);
		sidebarDropdown.append(projectSelect);
	}
	document.querySelector(".project-name-input").value = "";

	const fieldDropdown = document.querySelector("#projects-choices");
	if (fieldDropdown) {
		const selectProject = renderFieldProjectSelect(project);
		fieldDropdown.append(selectProject);
	}
}

export function initListeners() {
	// const cardDiv = document.querySelector(".card-div");
	// cardDiv.addEventListener("click", (event) => {
	// 	const addBtn = event.target.closest(".add-todo-btn");
	//
	// 	if (!addBtn || !cardDiv.contains(addBtn)) return;
	// 	handleAddTodoBtnClick();
	// });

	document
		.querySelector(".show-modal")
		.addEventListener("click", handleAddTodoBtnClick);

	document
		.querySelector("#cancelBtn")
		.addEventListener("click", closeTodoModal);

	document.querySelector(".todo-form").addEventListener("submit", (event) => {
		event.preventDefault();
		handleAddTodo();
	});

	document
		.querySelector(".show-todos")
		.addEventListener("click", handleDisplayTodos);

	document
		.querySelector("#projectAddBtn")
		.addEventListener("click", handleAddProject);

	document
		.querySelector("#projectCancelBtn")
		.addEventListener("click", closeProjectModal);

	document
		.querySelector(".todo-desc")
		.addEventListener("click", descriptionBtnToggle);

	document
		.querySelector(".datepicker-input")
		.addEventListener("input", dueDateBtnToggle);

	document
		.querySelector(".todo-priority")
		.addEventListener("click", priorityBtnToggle);

	document.querySelectorAll(".priority-select").forEach((priority) => {
		priority.addEventListener("click", displaySelectedPriority);
	});

	// instead of using querySelectorAll('.select-project').forEach(), it listens now to the container itself
	// listener in the todo form project dropdown
	document
		.querySelector(".projects-dropdown")
		.addEventListener("click", displaySelectedProject);

	// listener in the sidebar
	document
		.querySelector(".project-dropdown")
		.addEventListener("click", selectedProject);

	document
		.querySelector(".create-project-btn")
		.addEventListener("click", handleCreateProject);

	// document
	// 	.querySelector(".edit-btn")
	// 	.addEventListener("click", handleEditTodo);
}
