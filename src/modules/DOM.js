import DescriptionIcon from "../asset/icons/description.svg";
import DateIcon from "../asset/icons/date.svg";
import PriorityIcon from "../asset/icons/priority.svg";
import CancelIcon from "../asset/icons/cancel.svg";
import ArrowUpIcon from "../asset/icons/arrow-up.svg";
import TodoIcon from "../asset/icons/todo.svg";
import PriorityFlag from "../asset/icons/flag.svg";
import TodoMenuIcon from "../asset/icons/menu-todo.svg";

export function Sidebar() {
	const sidebar = document.createElement("div");
	sidebar.className = "sidebar";

	const sidebarHeader = document.createElement("div");
	sidebarHeader.className = "sidebar-header";
	const sidebarHeading = document.createElement("h2");
	sidebarHeading.className = "sidebar-heading";
	sidebarHeading.textContent = "My Todo List";
	const sidebarIcon = document.createElement("div");
	sidebarIcon.innerHTML = TodoIcon;
	sidebarIcon.querySelector("svg").classList.add("sidebar-icon");

	sidebarHeader.append(sidebarIcon, sidebarHeading);
	sidebar.append(sidebarHeader);
	const menuSidebar = MenuSidebar();
	sidebar.append(menuSidebar);
	document.querySelector(".container").prepend(sidebar);
}

function MenuSidebar() {
	const menuSidebar = document.createElement("div");
	menuSidebar.className = "menu-sidebar";

	const menuTitle = document.createElement("h3");
	menuTitle.className = "menu-title";
	menuTitle.textContent = "Menu";

	const menu = document.createElement("div");
	menu.className = "menu";

	const addTodoSelection = document.createElement("div");
	addTodoSelection.className = "selection";

	const icon = document.createElement("div");
	icon.innerHTML = TodoMenuIcon;
	icon.querySelector("svg").classList.add("menu-add-icon");

	const addTodoBtn = document.createElement("button");
	addTodoBtn.textContent = "Add Todo";
	addTodoBtn.className = "show-modal";

	addTodoSelection.append(icon, addTodoBtn);

	menu.append(addTodoSelection);
	menuSidebar.prepend(menuTitle, menu);
	return menuSidebar;
}

export function Header() {
	const header = document.createElement("header");
	header.className = "heading";

	header.textContent = "Todos";

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

	const todosList = document.createElement("div");
	todosList.className = "todos-list";
	todosContainer.prepend(todosList);

	const form = createTodoForm();
	todosContainer.append(form);
	const card = addTodoCard();
	todosContainer.append(card);
}

function addTodoCard() {
	const cardDiv = document.createElement("div");
	cardDiv.className = "card-div";
	const todoIcon = document.createElement("div");
	todoIcon.className = "todo-icon";
	todoIcon.innerHTML = TodoIcon;

	const cardText = document.createElement("p");
	cardText.className = "card-text";
	cardText.textContent = "Create some tasks for your projects here!";

	const addNewTodoBtn = document.createElement("button");
	addNewTodoBtn.id = "addTodoBtn";
	addNewTodoBtn.classList.add("add-todo-btn");
	addNewTodoBtn.textContent = "+  Add Todo";
	cardDiv.append(todoIcon, cardText, addNewTodoBtn);
	return cardDiv;
}

// hides card-div if there is todos present in the .todos-list container
export function hideAddTodoCard() {
	const cardDiv = document.querySelector(".card-div");
	const todosList = document.querySelector(".todos-list");
	console.log("are they same?", cardDiv === todosList);
	cardDiv.replaceChildren();
}

export function displayTodos(todos) {
	todos.forEach((todo) => {
		const todoContainer = document.createElement("div");
		todoContainer.className = "todo-container";

		const checkbox = document.createElement("input");
		checkbox.className = "todo-checkbox";
		checkbox.type = "checkbox";

		const actionsContainer = document.createElement("div");
		actionsContainer.className = "todo";

		const title = document.createElement("p");
		title.textContent = todo.title;

		const description = document.createElement("p");
		description.textContent = todo.description;

		const date = document.createElement("span");
		date.textContent = todo.dueDate;

		const priority = document.createElement("p");
		priority.textContent = todo.priority;

		actionsContainer.append(title, description, date, priority);
		todoContainer.append(checkbox, actionsContainer);
		document.querySelector(".todos-list").append(todoContainer);
	});
}

export function createTodoForm() {
	const dialog = document.createElement("dialog");
	dialog.id = "todo-modal";
	const todoForm = document.createElement("form");
	todoForm.className = "todo-form";

	const userInput = createUserInput();

	const outerContainer = document.createElement("div");
	outerContainer.className = "outer-container";

	const fieldsContainer = document.createElement("div");
	fieldsContainer.className = "fields-container";

	const description = createDescriptionField();
	const dueDate = datePicker();
	const priority = createPriorityField();
	const priorities = createPriorityDropdown();

	priority.append(priorities);

	fieldsContainer.append(description, dueDate, priority);
	outerContainer.append(fieldsContainer);
	todoForm.append(userInput, outerContainer);
	dialog.append(todoForm);

	// must append this formBtns to the fields container
	const formBtns = document.createElement("div");
	formBtns.className = "form-btns";

	const cancelBtn = createCancelBtn();
	const addBtn = createAddBtn();

	formBtns.append(cancelBtn, addBtn);
	outerContainer.append(formBtns);

	return dialog;
}

function createAddBtn() {
	const addBtn = document.createElement("button");
	addBtn.id = "addBtn";
	addBtn.className = "add-btn";
	addBtn.type = "submit";
	addBtn.innerHTML = ArrowUpIcon;
	addBtn.querySelector("svg").classList.add("arrow-up-icon");
	return addBtn;
}

function createCancelBtn() {
	const cancelBtn = document.createElement("button");
	cancelBtn.id = "cancelBtn";
	cancelBtn.className = "cancel-btn";
	cancelBtn.type = "button";
	cancelBtn.innerHTML = CancelIcon;
	cancelBtn.querySelector("svg").classList.add("cancel-icon");
	return cancelBtn;
}

function createUserInput() {
	const title = document.createElement("div");
	title.className = "todo-title";

	const titleDateContainer = document.createElement("div");
	titleDateContainer.className = "title-date-container";

	const dateText = document.createElement("p");
	dateText.className = "date-text";
	dateText.classList.toggle("hidden");

	const priorityText = document.createElement("p");
	priorityText.className = "priority-text";
	priorityText.classList.toggle("hidden");

	const titleInput = document.createElement("input");
	titleInput.required = true;
	titleInput.id = "title-input";
	titleInput.placeholder = "Finish the Todo User Interface";

	titleDateContainer.append(dateText, priorityText, titleInput);
	title.append(titleDateContainer);
	return title;
}

function createDescriptionField() {
	const description = document.createElement("button");
	description.type = "button";
	description.className = "todo-desc";
	const descriptionText = document.createElement("p");
	descriptionText.textContent = "Description";
	const descriptionIcon = document.createElement("div");
	descriptionIcon.innerHTML = DescriptionIcon;
	descriptionIcon.querySelector("svg").classList.add("desc-icon");
	description.append(descriptionIcon, descriptionText);
	return description;
}

function createPriorityField() {
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
	return priority;
}

function createPriorityDropdown() {
	const priorities = document.createElement("div");
	priorities.className = "priorities-dropdown";

	const firstPrio = document.createElement("div");
	firstPrio.className = "priority-select";
	const flag1 = document.createElement("div");
	flag1.innerHTML = PriorityFlag;
	flag1.querySelector("svg").classList.add("priority-flag");
	const text1 = document.createElement("p");
	text1.textContent = "Priority 1";
	firstPrio.append(flag1, text1);

	const secondPrio = document.createElement("div");
	secondPrio.className = "priority-select";
	const flag2 = document.createElement("div");
	flag2.innerHTML = PriorityFlag;
	flag2.querySelector("svg").classList.add("priority-flag");
	const text2 = document.createElement("p");
	text2.textContent = "Priority 2";
	secondPrio.append(flag2, text2);

	const thirdPrio = document.createElement("div");
	thirdPrio.className = "priority-select";
	const flag3 = document.createElement("div");
	flag3.innerHTML = PriorityFlag;
	flag3.querySelector("svg").classList.add("priority-flag");
	const text3 = document.createElement("p");
	text3.textContent = "Priority 3";
	thirdPrio.append(flag3, text3);

	const fourthPrio = document.createElement("div");
	fourthPrio.className = "priority-select";
	const flag4 = document.createElement("div");
	flag4.innerHTML = PriorityFlag;
	flag4.querySelector("svg").classList.add("priority-flag");
	const text4 = document.createElement("p");
	text4.textContent = "Priority 4";
	fourthPrio.append(flag4, text4);
	priorities.append(firstPrio, secondPrio, thirdPrio, fourthPrio);
	priorities.classList.toggle("hidden");
	return priorities;
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
	dueDateInput.required = true;
	dueDateInput.type = "date";
	dueDateInput.className = "datepicker-input";
	dateToggle.append(toggleBtn, dueDateInput);

	return dateToggle;
}

export function createDescriptionInput() {
	const descInput = document.createElement("input");
	descInput.required = true;
	descInput.id = "desc-input";
	descInput.placeholder = "Description of my todo";
	document.querySelector(".todo-title").append(descInput);
}

export function clearDisplay() {
	document.querySelector(".todos-list").replaceChildren();
}

export function createTodoItem(todo) {
	// returns <div> with checkbox, title, etc
}

export function render(container, htmlTag) {
	container.append(htmlTag);
}
