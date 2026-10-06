import EditIcon from "../../asset/icons/edit.svg";
import DeleteIcon from "../../asset/icons/delete.svg";

export function todoCheckbox() {
	const checkbox = document.createElement("input");
	checkbox.className = "todo-checkbox";
	checkbox.type = "checkbox";
	return checkbox;
}

function todoTags(todo) {
	const tags = document.createElement("div");
	tags.className = "todo-tags";

	const date = document.createElement("span");
	date.textContent = todo.dueDate;
	date.className = "date";

	const priority = document.createElement("p");
	priority.textContent = todo.priority;
	priority.className = "priority";

	// const project = document.createElement("p");
	// project.textContent = project.name;
	// project.dataset.projectId = project.id;

	tags.append(date, priority);
	return tags;
}

export function todoDetail(todo) {
	const actionsContainer = document.createElement("div");
	actionsContainer.className = "todo";
	actionsContainer.dataset.id = todo.id;

	const title = document.createElement("p");
	title.textContent = todo.title;
	title.className = "name";

	const description = document.createElement("p");
	description.textContent = todo.description;
	description.className = "description";

	const tags = todoTags(todo);
	actionsContainer.append(title, description, tags);
	return actionsContainer;
}

export function todoButtons(todo) {
	const buttons = document.createElement("div");
	buttons.className = "btn-group";
	const editBtn = editButton();
	const delBtn = deleteButton(todo);
	buttons.append(editBtn, delBtn);
	return buttons;
}

function editButton() {
	const editBtn = document.createElement("button");
	editBtn.type = "button";
	editBtn.className = "edit-btn";
	const icon = document.createElement("div");
	icon.innerHTML = EditIcon;
	icon.querySelector("svg").classList.add("edit-icon");
	editBtn.append(icon);
	return editBtn;
}

export function deleteButton(todo) {
	const delBtn = document.createElement("button");
	delBtn.type = "button";
	delBtn.className = "del-btn";
	delBtn.dataset.id = todo.id;
	delBtn.dataset.projectId = todo.project.projectId;
	const icon = document.createElement("div");
	icon.innerHTML = DeleteIcon;
	icon.querySelector("svg").classList.add("delete-icon");
	delBtn.append(icon);
	return delBtn;
}
