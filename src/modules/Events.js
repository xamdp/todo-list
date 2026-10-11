// import { createTodo } from "./factories/todoFactory.js";
import { addTodo, deleteTodo, editTodo, getTodo, getTodos } from "./Todo.js";
import {
	clearDisplay,
	createDescriptionInput,
	deleteConfirmationModal,
	displayEditTodoForm,
	displayProject,
	displayTodoHeading,
	displayTodos,
	hideAddTodoCard,
	renderFieldProjectSelect,
	showAddTodoCard,
	addTodoCard,
} from "./DOM.js";
import {
	checkDateInput,
	getProjectId,
	submitTodoLogic,
	toggleProjectCancelBtn,
	unselectProject,
	resetForm,
	editTodoLogic,
} from "./helpers.js";
import { createProject, getProjects, saveProject } from "./Project.js";
import { renderSidebarProjectSelect } from "./components/SidebarComponent.js";

function handleAddTodoBtnClick() {
	const modal = document.getElementById("todo-modal");
	modal.showModal();
}

function closeTodoModal() {
	const modal = document.getElementById("todo-modal");
	// delete modal.dataset.id;
	modal.dataset.editingTodoId = "null"; // bro this took me hours to figure out, i just need to set back the default id when the modal closes
	modal.close();

	const projectFieldWrapper = document.querySelector(
		".project-field-wrapper",
	);
	projectFieldWrapper.classList.remove("hide-project");
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

// display the selected project from the sidebar
function selectedProject(event) {
	const selected = event.target.closest(".project-select").dataset.id;
	if (!selected) return;

	const projects = getProjects();
	const project = projects.find((project) => project.projectId === selected);
	if (project) {
		// i think i need to call getTodos here, and pass the matchProject
		const todos = getTodos(project.projectId);
		clearDisplay();
		displayProject(project);
		displayTodos(todos);
	} else {
		console.log(`No project exist with the id: ${selected}`);
	}
}

function handleSubmit(event) {
	event.preventDefault();
	// hideAddTodoCard(); might not use this for a momemt, this is distracting me
	let editingTodoId =
		document.getElementById("todo-modal").dataset.editingTodoId;
	// console.log(editingTodoId);
	// if editingTodoId is not null, meaning I am editing a todo
	if (editingTodoId !== "null") {
		editTodoLogic();
		editingTodoId = "null";
	} else if (editingTodoId === "null") {
		// if null, meaning I am submitting a new todo
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

	const todo = getTodo(todoId, projectId); // this only return one todo, based on the clicked edit-btn
	displayEditTodoForm(todo);
}

function openDeleteModal(event) {
	const toDelete = event.target.closest(".del-btn");
	if (!toDelete) return;
	const deleteModal = document.querySelector(".delete-modal");
	deleteModal.showModal();
	const yesDelBtn = document.querySelector("#yes-del-btn");
	yesDelBtn.dataset.id = toDelete.dataset.id;
	yesDelBtn.dataset.projectId = toDelete.dataset.projectId;
}

function closeDeleteModal() {
	const deleteModal = document.querySelector(".delete-modal");
	deleteModal.close();
	const yesDelBtn = document.querySelector("#yes-del-btn");
	yesDelBtn.dataset.id = "";
	yesDelBtn.dataset.projectId = "";
}

function handleDelete() {
	const toDelete = document.querySelector("#yes-del-btn");
	const isProjectId = toDelete.dataset.projectId;
	const projectId = isProjectId !== "undefined" ? isProjectId : "default";
	const todo = toDelete.dataset.id;
	// i should only delete, when i click the  yes btn
	deleteTodo(projectId, todo);
	closeDeleteModal();
	const todos = getTodos(projectId);
	clearDisplay();
	displayTodos(todos);
}

// this only display the default todos when todos from sidebar is clicked
function handleDisplayTodos() {
	// const cardDiv = document.querySelector(".card-div");
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

// displays the selected project in project field
function displaySelectedProject(event) {
	const selected = event.target.closest(".select-project");
	if (!selected) return;
	// console.log(selected);
	const projectsDropdown = document.querySelector(".projects-dropdown");
	const selectedProjectId = selected.dataset.projectId;
	const selectedProjectName = selected.dataset.projectName;
	let projectSelectionBtn = document.querySelector(".project-selection");
	let projectSelectionText = document
		.querySelector(".project-selection")
		.querySelector("p");
	toggleProjectCancelBtn();
	projectSelectionText.textContent = selectedProjectName;
	projectSelectionBtn.dataset.projectId = selectedProjectId;
	projectSelectionBtn.dataset.projectName = selectedProjectName;
	// projectSelectionBtn.setAttribute("data-id", selectedProjectId);
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
		projectName: projectName,
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
	document
		.querySelector("#addTodoBtn")
		.addEventListener("click", handleAddTodoBtnClick);

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
		.addEventListener("click", openDeleteModal);

	document
		.querySelector("#yes-del-btn")
		.addEventListener("click", handleDelete);

	document
		.querySelector("#no-del-btn")
		.addEventListener("click", closeDeleteModal);

	document
		.querySelector(".todos-container")
		.addEventListener("click", handleEditTodoBtnClick);
}
