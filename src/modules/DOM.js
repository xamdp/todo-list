
export function Sidebar() {
	const sidebar = document.createElement("div")
	sidebar.className = "sidebar"

	sidebar.textContent = "Todo List"
	document.querySelector(".container").prepend(sidebar)

}

export function Header() {
	const header = document.createElement("header")
	header.className = "heading"

	header.textContent = "My Todo List"

	document.querySelector(".content-wrapper").prepend(header)
}

export function MainContent() {
	const mainContent = document.createElement("div")
	mainContent.className = "main-content"

	mainContent.textContent = "This is main content"

	document.querySelector(".content-wrapper").append(mainContent)
}

export function TodosContainer() {
	const todosContainer = document.createElement("div")
	todosContainer.className = "todos-container"
	document.querySelector(".main-content").append(todosContainer)

	const addNewTodoBtn = document.createElement("button")
	addNewTodoBtn.className = "add-todo-btn"
	addNewTodoBtn.textContent = "+ Add Todo"
	todosContainer.append(addNewTodoBtn);
}


// this createTodoForm, must be called when I click the add todo btn
export function createTodoForm() {
	const dialog = document.createElement("dialog")
	dialog.id = "todo-modal"
	const todoForm = document.createElement("form")
	const title = document.createElement("input")
	const description = document.createElement("input")
	const dueDate = document.createElement("input")
	const priority = document.createElement("input")
	todoForm.append(title, description, dueDate, priority);
	dialog.appendChild(todoForm)
	document.body.appendChild(dialog);
	return dialog;
}

export function createTodoItem(todo) {
	// returns <div> with checkbox, title, etc
	// no listeners
}

export function render(container, htmlTag) {
}



