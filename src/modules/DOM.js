import DescriptionIcon from "../asset/icons/description.svg";
import DateIcon from "../asset/icons/date.svg";
import PriorityIcon from "../asset/icons/priority.svg";
import CancelIcon from "../asset/icons/cancel.svg";
import ArrowUpIcon from "../asset/icons/arrow-up.svg";

export function Sidebar() {
	const sidebar = document.createElement("div");
	sidebar.className = "sidebar";

	sidebar.textContent = "Todo List";
	document.querySelector(".container").prepend(sidebar);
}

export function Header() {
	const header = document.createElement("header");
	header.className = "heading";

	header.textContent = "My Todo List";

	document.querySelector(".content-wrapper").prepend(header);
}

export function MainContent() {
	const mainContent = document.createElement("div");
	mainContent.className = "main-content";

	document.querySelector(".content-wrapper").append(mainContent);
}

export function TodosContainer() {
	const todosContainer = document.createElement("div");
	todosContainer.className = "todos-container";
	document.querySelector(".main-content").append(todosContainer);

	const form = createTodoForm();
	todosContainer.prepend(form);

	const card = addTodoCard();
	todosContainer.append(card);
}

function addTodoCard() {
	const cardDiv = document.createElement("div");
	cardDiv.className = "card-div";

	const addNewTodoBtn = document.createElement("button");
	addNewTodoBtn.id = "addTodoBtn";
	addNewTodoBtn.className = "add-todo-btn";
	addNewTodoBtn.textContent = "+  Add Todo";
	cardDiv.append(addNewTodoBtn);
	return cardDiv;
}

// this createTodoForm, must be called when I click the add todo btn
export function createTodoForm() {
	const dialog = document.createElement("dialog");
	dialog.id = "todo-modal";
	// at initial page load, modal form is not visible
	dialog.style.display = "none";
	const todoForm = document.createElement("form");
	todoForm.className = "todo-form";

	const title = document.createElement("div");
	title.className = "todo-title";
	const titleInput = document.createElement("input");
	titleInput.id = "title-input";
	titleInput.placeholder = "Finish the Todo User Interface";
	title.append(titleInput);

	// this is where I also append the formBtns
	const outerContainer = document.createElement("div");
	outerContainer.className = "outer-container";

	// trying to group fields, except the title
	const fieldsContainer = document.createElement("div");
	fieldsContainer.className = "fields-container";

	// i need to make a new listener that will create the desc input when the description btn is clicked
	const description = document.createElement("button");
	description.type = "button";
	description.className = "todo-desc";
	const descriptionText = document.createElement("p");
	descriptionText.textContent = "Description";
	const descriptionIcon = document.createElement("div");
	descriptionIcon.innerHTML = DescriptionIcon;
	descriptionIcon.querySelector("svg").classList.add("desc-icon");
	description.append(descriptionIcon, descriptionText);

	// it seems that date-fns is only for calculating date not for UI
	// const dueDate = document.createElement("button");
	// dueDate.type = "button";
	// dueDate.className = "todo-duedate";
	// const dueDateText = document.createElement("p");
	// dueDateText.textContent = "Date";
	// const dueDateIcon = document.createElement("div");
	// dueDateIcon.innerHTML = DateIcon;
	// dueDateIcon.querySelector("svg").classList.add("duedate-icon");
	// dueDate.append(dueDateIcon, dueDateText);

	const dueDate = datePicker();

	// in priority, i need to create a dropdown selection up to 4 priority levels
	const priority = document.createElement("button");
	priority.type = "button";
	priority.className = "todo-priority";
	const priorityText = document.createElement("p");
	priorityText.textContent = "Priority";
	const priorityIcon = document.createElement("div");
	priorityIcon.innerHTML = PriorityIcon;
	priorityIcon.querySelector("svg").classList.add("priority-icon");
	priority.append(priorityIcon, priorityText);

	fieldsContainer.append(description, dueDate, priority);
	outerContainer.append(fieldsContainer);
	todoForm.append(title, outerContainer);
	dialog.append(todoForm);

	// must append this formBtns to the fields container
	const formBtns = document.createElement("div");
	formBtns.className = "form-btns";

	const cancelBtn = document.createElement("button");
	cancelBtn.id = "cancelBtn";
	cancelBtn.className = "cancel-btn";
	cancelBtn.type = "button";
	cancelBtn.innerHTML = CancelIcon;
	cancelBtn.querySelector("svg").classList.add("cancel-icon");

	// add/submit btn, different from the other addTodoBtn
	const addBtn = document.createElement("button");
	addBtn.id = "addBtn";
	addBtn.className = "add-btn";
	addBtn.type = "button";
	addBtn.innerHTML = ArrowUpIcon;
	addBtn.querySelector("svg").classList.add("arrow-up-icon");

	formBtns.append(cancelBtn, addBtn);
	outerContainer.append(formBtns);

	return dialog;
}

function datePicker() {
	const dateToggle = document.createElement("span"); // container
	dateToggle.className = "datepicker-toggle";

	const toggleBtn = document.createElement("button"); // this should be button
	toggleBtn.type = "button";
	toggleBtn.className = "datepicker-toggle-btn";

	const calendarIcon = document.createElement("div"); // icon inside div
	calendarIcon.innerHTML = DateIcon;
	calendarIcon.querySelector("svg").classList.add("calendar-icon");

	const dueDateText = document.createElement("p");
	dueDateText.textContent = "Date";

	toggleBtn.append(calendarIcon, dueDateText);

	const dueDateInput = document.createElement("input"); // input, hidden by default
	dueDateInput.type = "date";
	dueDateInput.className = "datepicker-input";
	dueDateInput.classList.toggle("hidden");
	dateToggle.append(toggleBtn, dueDateInput);

	return dateToggle;
}

export function createDescriptionInput() {
	const descInput = document.createElement("input");
	descInput.id = "desc-input";
	descInput.placeholder = "Description of my todo";
	document.querySelector(".todo-title").append(descInput);
}

// export function createDueDateInput() {
// 	document.querySelector(".todo-duedate").append(dueDateInput);
// }

// this is to render the created todo from the todo modal
export function createTodoItem(todo) {
	// returns <div> with checkbox, title, etc
}

// maybe I can reuse this when todo objects are created
export function render(container, htmlTag) {
	container.append(htmlTag);
}
