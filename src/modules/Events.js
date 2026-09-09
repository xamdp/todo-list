import { createTodo } from "./factories/todoFactory.js";
import { addTodo } from "./Todo.js";
import { createDescriptionInput, render } from "./DOM.js";

function handleAddTodoBtnClick() {
	const modal = document.getElementById("todo-modal");
	modal.style.display = "block";

	const addBtn = document.querySelector("#addTodoBtn");
	addBtn.classList.remove("active");
	addBtn.classList.toggle("hidden");
}

function closeTodoModal() {
	// closes the modal but then addTodoBtn is showed again and description input is reset
	const modal = document.getElementById("todo-modal");
	modal.style.display = "none";

	const addBtn = document.querySelector("#addTodoBtn");
	addBtn.classList.remove("hidden");
	addBtn.classList.toggle("active");

	// hide datepicker-input
	const dueDateInput = document.querySelector(".datepicker-input");
	dueDateInput.classList.toggle("hidden");
	dueDateInput.classList.toggle("active");

	// this is ugly, but works
	const descInput = document.querySelector("#desc-input");
	if (descInput === null) {
		return;
	}
	descInput.remove();
}

// this should handle the submitted todo from
function handleAddTodo() {
	const userInput = {
		title: document.querySelector("#title-input").value,
		desc: document.querySelector("#desc-input").value,
		dueDate: document.querySelector("#duedate-input").value, // i need to change this
		priority: document.querySelector("#priority-input").value, // this too
	};
	const newTodo = createTodo(userInput); // whats the difference of createTodo and addTodo
	addTodo(newTodo);
	render(); // idk yet, where this will be used
}

function descriptionBtnToggle() {
	if (document.querySelector("#desc-input")) return;
	createDescriptionInput();
}

function dueDateBtnToggle() {
	const dueDateInput = document.querySelector(".datepicker-input");
	dueDateInput.classList.toggle("active");
	dueDateInput.classList.remove("hidden");
}

export function initListeners() {
	document
		.querySelector(".add-todo-btn")
		.addEventListener("click", handleAddTodoBtnClick);

	document
		.querySelector("#cancelBtn")
		.addEventListener("click", closeTodoModal);

	document
		.querySelector("#addBtn")
		.addEventListener("submit", handleAddTodo, false);

	document
		.querySelector(".todo-desc")
		.addEventListener("click", descriptionBtnToggle);

	document
		.querySelector(".datepicker-toggle-btn")
		.addEventListener("click", dueDateBtnToggle);
}
