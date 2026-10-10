// import { createTodo } from "./factories/todoFactory.js";
import { addTodo, deleteTodo, editTodo, getTodo, getTodos } from "./Todo.js";
import {
	clearDisplay,
	createDescriptionInput,
	displayEditTodoForm,
	displayProject,
	displayTodoHeading,
	displayTodos,
	renderFieldProjectSelect,
} from "./DOM.js";
import {
	checkDateInput,
	getProjectId,
	submitTodoLogic,
	toggleProjectCancelBtn,
	unselectProject,
	resetForm,
} from "./helpers.js";
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
	modal.dataset.id = "default"; // bro this took me hours to figure out, i just need to set back the default id when the modal closes
	modal.close();

	const dateText = document.querySelector(".date-text");
	dateText.classList.add("hidden");
	dateText.classList.remove("active");

	const priorityText = document.querySelector(".priority-text");
	priorityText.classList.add("hidden");
	priorityText.classList.remove("active");

	const titleInput = document.querySelector("#title-input");
	titleInput.value = "";
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

function selectedProject(event) {
	const selected = event.target.closest(".project-select").dataset.id;
	if (!selected) return;
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

function handleSubmit(event) {
	event.preventDefault();
	const editingTodoId = document.getElementById("todo-modal").dataset.id;
	console.log(editingTodoId);
	if (editingTodoId !== "default" && editingTodoId !== "") {
		const todo = {
			title: document.querySelector("#title-input").value,
			description: document.querySelector("#desc-input").value,
			dueDate: document.querySelector(".datepicker-input").value,
			priority: document.querySelector(".priority-text").textContent,
		};
		const project = getProjectId();
		console.log(project);
		editTodo(todo, editingTodoId, project.projectId);
		resetForm();
		const dataToDisplay = getTodos(project.projectId); // need to pass here the project.id
		clearDisplay();
		displayProject(project);
		displayTodos(dataToDisplay);
	} else if (editingTodoId === "default") {
		// for adding todo
		submitTodoLogic();
	} else {
		console.log("bru, whats wrong");
	}
}

function handleEditTodoBtnClick(event) {
	const editBtn = event.target.closest(".edit-btn");
	if (!editBtn) return;

	const todoId = editBtn.dataset.id;
	const projectId = editBtn.dataset.projectId;

	const project = projectId != "undefined" ? projectId : "default";

	const todo = getTodo(todoId, project); // this only return one todo, based on the clicked edit-btn
	displayEditTodoForm(todo);
}

function handleDeleteTodo(event) {
	const toDelete = event.target.closest(".del-btn");
	if (!toDelete) return;
	// console.log(toDelete.dataset.id, toDelete.dataset.projectId);
	const isProjectId = toDelete.dataset.projectId;
	const projectId = isProjectId !== "undefined" ? isProjectId : "default";
	console.log(projectId);
	const todo = toDelete.dataset.id;
	deleteTodo(projectId, todo);
	const todos = getTodos(projectId);
	clearDisplay();
	displayTodos(todos);
}

// this only display the default todos when todos from sidebar is clicked
function handleDisplayTodos() {
	const todos = getTodos();
	clearDisplay();
	displayTodoHeading();
	displayTodos(todos);
}

function descriptionBtnToggle() {
	if (document.querySelector("#desc-input")) return;
	createDescriptionInput();
}

// for now this works
function dueDateBtnToggle(event) {
	const dateText = document.querySelector(".date-text");
	const input = event.currentTarget.value;
	if (input === "") {
		dateText.classList.add("hidden");
	}

	if (input) {
		dateText.classList.remove("hidden");
		dateText.textContent = input;
		checkDateInput();
	}
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

// for dropdown in todo form
function displaySelectedProject(event) {
	const selected = event.target.closest(".select-project");
	if (!selected) return;
	// console.log(selected);
	const projectsDropdown = document.querySelector(".projects-dropdown");
	const selectedProjectId = selected.dataset.id;
	const selectedProjectName = selected.dataset.name;
	let projectSelectionBtn = document.querySelector(".project-selection");
	let projectSelectionText = document
		.querySelector(".project-selection")
		.querySelector("p");
	toggleProjectCancelBtn();
	projectSelectionText.textContent = selectedProjectName;
	projectSelectionBtn.setAttribute("data-id", selectedProjectId);
	projectsDropdown.hidePopover();
}

function handleCancelProject() {
	unselectProject();
	console.log("hi");
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
	const projectObj = {
		name: projectName,
	};
	const project = createProject(projectObj);
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

	document
		.querySelector(".todo-form")
		.addEventListener("submit", handleSubmit);

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
		.addEventListener("change", dueDateBtnToggle);

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

	document
		.querySelector(".cancel-project-btn")
		.addEventListener("click", handleCancelProject);

	// listener in the sidebar
	document
		.querySelector(".project-dropdown")
		.addEventListener("click", selectedProject);

	document
		.querySelector(".create-project-btn")
		.addEventListener("click", handleCreateProject);

	document
		.querySelector(".todos-container")
		.addEventListener("click", handleDeleteTodo);

	document
		.querySelector(".todos-container")
		.addEventListener("click", handleEditTodoBtnClick);
}
