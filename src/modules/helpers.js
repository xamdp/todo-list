import { hideAddTodoCard } from "./DOM.js";

export function checkDateInput() {
	// will add more checks here
	const dateText = document.querySelector(".date-text");
	if (dateText.textContent === "") {
		dateText.style.backgroundColor = "#FFFFFF";
	} else {
		dateText.style.backgroundColor = "pink";
	}
}

export function isTodosExist() {
	const cardDiv = document.querySelector(".card-div");
	if (cardDiv.hasChildNodes()) hideAddTodoCard();
}
