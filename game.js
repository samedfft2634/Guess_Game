const inputField = document.querySelector(".inputField");
const checkBtn = document.querySelector(".check");
const againBtn = document.querySelector(".again");
const msg = document.querySelector(".msg");
const body = document.querySelector("body");
const leftDiv = document.querySelector(".left");
const guesses = document.querySelector(".guesses");
const title = document.querySelector(".title");
const result = document.querySelector(".result");
const preGue = document.querySelector(".prev");
const difficult = document.querySelector(".difficult");
const level = document.querySelector(".dif-level");

let maxRandom = localStorage.getItem("maxRandom") ? parseInt(localStorage.getItem("maxRandom"),10) : 20
let difficulty = localStorage.getItem("difficulty") || "Easy";

	
againBtn.style.visibility = "hidden";
window.addEventListener("load", () => {
	inputField.focus();
});
inputField.style.outline = "none";
let random = Math.ceil(Math.random() * maxRandom);
let score = 10;
console.log(random);

//difficulty
const applyEasyStyle = () => {
    difficult.textContent = "Easy";
    difficult.style.backgroundColor = "limegreen";
    difficult.style.color = "#fff";
    difficult.style.padding = ".7rem 2.2rem";
    level.textContent = "😏(1-20)";
    maxRandom = 20;
};

const applyDifficultStyle = () => {
    difficult.textContent = "Difficult";
    difficult.style.backgroundColor = "red";
    difficult.style.color = "#fff";
    difficult.style.padding = ".7rem ";
    level.textContent = "😈(1-50)";
    maxRandom = 50;
};
//

//loading
window.addEventListener("load", () => {
    if (difficulty === "Difficult") {
        applyDifficultStyle();
    } else {
        applyEasyStyle();
    }
    random = Math.ceil(Math.random() * maxRandom);
});
//

// event listener 
difficult.addEventListener("click", () => {
    if (difficulty === "Easy") {
        difficulty = "Difficult";
        applyDifficultStyle();
    } else {
        difficulty = "Easy";
        applyEasyStyle();
    }
    localStorage.setItem("difficulty", difficulty);
    localStorage.setItem("maxRandom", maxRandom.toString());
    random = Math.ceil(Math.random() * maxRandom);
    console.log("yeni sayi ",random);
});


// input value controller
inputField.addEventListener("input", () => {
	inputField.value = inputField.value.replace(/[e\.-]/gi, "");
	if(difficulty === "Easy" && ((inputField.value > 20 || inputField.value == 0))){
		inputField.value =inputField.value.slice(0,-1)
	} else {
		(inputField.value > 50 || inputField.value == 0) 
		&& (inputField.value = inputField.value.slice(0,-1))
		
	}
});

inputField.addEventListener("focus", () => {
	title.innerText = "Game Started!";
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
			preGue.textContent = inputField.value;
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
			preGue.textContent = inputField.value;
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
	difficult.click()
	preGue.textContent = "";
	console.log(random);
});
