const inputField = document.querySelector(".inputField");
const checkBtn = document.querySelector(".check");
const againBtn = document.querySelector(".again");
const msg = document.querySelector(".msg");
const body = document.querySelector("body");
const leftDiv = document.querySelector(".left");
const guesses = document.querySelector(".guesses");
const title = document.querySelector(".title");
const result = document.querySelector(".result");

againBtn.style.visibility = "hidden";
// window.addEventListener("load", () => {
// 	inputField.focus();
// });
let random = Math.ceil(Math.random() * 20);
let score = 10;
let highestScore = 0;
console.log(random);

inputField.addEventListener("input", () => {
    inputField.value = inputField.value.replace(/[e\.-]/gi, "");
});

inputField.addEventListener("focus", () => {
	msg.innerText = "Game Started!";
	inputField.style.outline = "none";
});

const checkClick = () => {
	if (!inputField.value) {
		Swal.fire({
			icon: "error",
			title: "Oops...",
			text: "The input field cannot be empty.!",
		});
	} else if (inputField.value == random) {
		msg.textContent = " Conguratulations! You Won 👏 🎉";
		body.style.background = "linear-gradient(to right, #dce35b, #45b649)";
		leftDiv.style.display = "none";
		let icon = document.createElement("img");
		icon.src = "./assets/smile-icon.png";
		icon.className = "smile";
		result.textContent = "";
		result.appendChild(icon);
		againBtn.style.visibility = "visible";
		guesses.textContent = --score;
	} else {
		if (score > 1) {
			score--;
			guesses.textContent = score;
			inputField.value < random
				? (msg.textContent = "Higher 👆")
				: (msg.textContent = "Lower👇");
		} else {
			guesses.textContent = 0;
			msg.textContent = `Game Over! ¯\\_(ツ)_/¯`;
			title.textContent = "👇The Number Was👇 ";
			result.textContent = random;
			body.style.background =
				"linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)";
			againBtn.style.visibility = "visible";
			leftDiv.style.display = "none";
		}
	}
};
checkBtn.addEventListener("click", checkClick);
againBtn.addEventListener("click", () => {
	body.style.background =
		"linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%)";
	leftDiv.style.display = "flex";
	inputField.value = "";
	msg.textContent = "Game starting...";
	againBtn.style.visibility = "hidden";
	title.textContent = "Guess The Number";
	result.textContent = "?";
	guesses.textContent = 10;
	score = 10;
	random = Math.ceil(Math.random() * 20);
	console.log(random);
});
