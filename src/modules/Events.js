import { createTodo } from "./factories/todoFactory.js";
import { addTodo, getTodos } from "./Todo.js";
import { clearDisplay, createDescriptionInput, displayTodos } from "./DOM.js";
import { checkDateInput } from "./helpers.js";
import { add } from "date-fns";

function handleAddTodoBtnClick() {
	const modal = document.getElementById("todo-modal");
	modal.classList.toggle("active");

	const addBtnDiv = document.querySelector(".card-div");
	addBtnDiv.classList.toggle("hidden");
}

function closeTodoModal() {
	// closes the modal but then addTodoBtn is showed again and description input is reset
	const modal = document.getElementById("todo-modal");
	modal.classList.toggle("active");

	const addBtnDiv = document.querySelector(".card-div");
	addBtnDiv.classList.remove("hidden");
	// addBtnDiv.classList.toggle("active");

	// hide datepicker-input, ** it seems, i don't need to hide this
	const dueDateInput = document.querySelector(".datepicker-input");
	// dueDateInput.classList.add("hidden");

	const priorityText = document.querySelector(".priority-text");
	priorityText.classList.add("hidden");
	priorityText.classList.remove("active");

	// this is ugly, but works
	const descInput = document.querySelector("#desc-input");
	if (descInput === null) {
		return;
	}
	descInput.remove();
}

function resetForm() {
	const todoForm = document.querySelector(".todo-form");
	const dateText = document.querySelector(".date-text");
	const priorityText = document.querySelector(".priority-text");
	todoForm.reset();
	// reset the date
	dateText.textContent = "";
	dateText.classList.toggle("hidden");
	// reset the priority
	priorityText.textContent = "";
	priorityText.classList.toggle("hidden");
}

// this should handle the submitted todo from
function handleAddTodo() {
	// i need to put some logic here that verifies the inputs
	const userInput = {
		title: document.querySelector("#title-input").value,
		description: document.querySelector("#desc-input").value,
		dueDate: document.querySelector(".date-text").textContent,
		priority: document.querySelector(".priority-text").textContent,
	};
	const newTodo = createTodo(userInput);
	addTodo(newTodo);
	resetForm();
	const dataToDisplay = getTodos();
	clearDisplay();
	displayTodos(dataToDisplay);
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

function priorityBtnToggle() {
	const priorityDropdown = document.querySelector(".priorities-dropdown");
	priorityDropdown.classList.toggle("hidden");
}

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

export function initListeners() {
	const cardDiv = document.querySelector(".card-div");
	cardDiv.addEventListener("click", (event) => {
		const addBtn = event.target.closest(".add-todo-btn");

		if (!addBtn || !cardDiv.contains(addBtn)) return;
		console.log("addbtn clicked", addBtn);
	});

	document
		.querySelector(".show-modal")
		.addEventListener("click", handleAddTodoBtnClick);

	// document
	// 	.querySelector(".add-todo-btn")
	// 	.addEventListener("click", handleAddTodoBtnClick);

	document
		.querySelector("#cancelBtn")
		.addEventListener("click", closeTodoModal);

	document.querySelector(".todo-form").addEventListener("submit", (event) => {
		event.preventDefault();
		handleAddTodo();
	});

	document
		.querySelector(".todo-desc")
		.addEventListener("click", descriptionBtnToggle);

	document
		.querySelector(".datepicker-input")
		.addEventListener("input", dueDateBtnToggle);

	document
		.querySelector(".todo-priority")
		.addEventListener("click", priorityBtnToggle);

	document
		.querySelector(".todos-container")
		.addEventListener("click", handleCloseDropdown);

	document.querySelectorAll(".priority-select").forEach((priority) => {
		priority.addEventListener("click", displaySelectedPriority);
	});
}
