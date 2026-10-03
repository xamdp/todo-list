import { createTodo } from "./factories/todoFactory.js";
import { addTodo, getTodos } from "./Todo.js";
import { clearDisplay, createDescriptionInput, displayTodos } from "./DOM.js";
import { checkDateInput } from "./helpers.js";
import { createProject, saveProject } from "./Project.js";

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

function handleAddTodo() {
	const userInput = {
		title: document.querySelector("#title-input").value,
		description: document.querySelector("#desc-input").value,
		dueDate: document.querySelector(".date-text").textContent,
		priority: document.querySelector(".priority-text").textContent,
	};
	// i need a way to read the current selected project and pass that as argument for createTodo
	const project = createProject(); // i should not run createProject everytime I create a todo
	const newTodo = createTodo(userInput);
	project.addTodo(newTodo);
	addTodo(newTodo, project.name); // this works for now, because I am using the default project
	resetForm();
	const dataToDisplay = getTodos(project.name);
	clearDisplay();
	displayTodos(dataToDisplay);
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

function projectsBtnToggle() {
	const projectDropwdown = document.querySelector(".project-dropdown");
	projectDropwdown.classList.toggle("hidden");
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
	const projectName = document.querySelector(".project-name-input").value;
	const project = createProject(projectName);
	saveProject(project);
	console.log("hi", project);
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

	// document
	// 	.querySelector(".todos-container")
	// 	.addEventListener("click", handleCloseDropdown);

	document.querySelectorAll(".priority-select").forEach((priority) => {
		priority.addEventListener("click", displaySelectedPriority);
	});

	document
		.querySelector(".create-project-btn")
		.addEventListener("click", handleCreateProject);

	document
		.querySelector(".projects")
		.addEventListener("click", projectsBtnToggle);

	// document
	// 	.querySelector(".edit-btn")
	// 	.addEventListener("click", handleEditTodo);
}
