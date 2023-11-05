/* ====================== variables ===================== */
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
const point = document.querySelector(".point");
const multi = document.querySelector(".multi");
//
/* =================== // localstorage ================== */
let maxRandom = localStorage.getItem("maxRandom")
	? parseInt(localStorage.getItem("maxRandom"), 10)
	: 20;
let difficulty = localStorage.getItem("difficulty") || "Easy";
/* ===================================================== */
againBtn.style.visibility = "hidden";
inputField.style.outline = "none";
let random = Math.ceil(Math.random() * maxRandom);
let score = 10;

// load page
let timerInterval;
Swal.fire({
	title: "Game Starting...",
	html: "The game will start in <b></b> milliseconds.",
	timer: 2000,
	timerProgressBar: true,
	didOpen: () => {
		Swal.showLoading();
		const b = Swal.getHtmlContainer().querySelector("b");
		timerInterval = setInterval(() => {
			b.textContent = Swal.getTimerLeft();
		}, 100);
	},
	willClose: () => {
		clearInterval(timerInterval);
	},
}).then((result) => {
	/* Read more about handling dismissals below */
	if (result.dismiss === Swal.DismissReason.timer) {
		console.log("I was closed by the timer");
	}
});
//

/// ====================== difficult ===================== */

const applyEasyStyle = () => {
	difficult.textContent = "Easy";
	multi.textContent = "";
	difficult.style.backgroundColor = "limegreen";
	difficult.style.color = "#fff";
	difficult.style.padding = ".7rem 2.2rem";
	level.textContent = "😏(1-20)";
	maxRandom = 20;
};

const applyDifficultStyle = () => {
	// Swal.fire({
	// 	icon: "info",
	// 	title: " x2 😈",
	// 	text: "DOUBLE SCORE & Difficult",
	// });
	difficult.textContent = "Difficult";
	multi.textContent = "x2 Point";
	difficult.style.backgroundColor = "red";
	difficult.style.color = "#fff";
	difficult.style.padding = ".7rem ";
	level.textContent = "😈(1-50)";
	maxRandom = 50;
};
//

//loading
window.addEventListener("load", () => {
	inputField.focus();
	if (difficulty === "Difficult") {
		applyDifficultStyle();
	} else {
		applyEasyStyle();
	}
	random = Math.ceil(Math.random() * maxRandom);
	console.log(random); // debug
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
	console.log("yeni sayi ", random);
	inputField.classList.remove("win-repeat");
});
/// ================== end of difficult ================== */

// input value controller
inputField.addEventListener("input", () => {
	title.innerText = "Game Started!";
	inputField.value = inputField.value.replace(/[e\.-]/gi, "");
	if (
		difficulty === "Easy" &&
		(inputField.value > 20 || inputField.value == 0)
	) {
		inputField.value = inputField.value.slice(0, -1);
	} else {
		(inputField.value > 50 || inputField.value == 0) &&
			(inputField.value = inputField.value.slice(0, -1));
	}
});

// enter
let counter = 0;
body.addEventListener("keyup", (e) => {
	if (e.key === "Enter") {
		if (
			!inputField.value &&
			!inputField.classList.contains("error-focused")
		) {
			inputField.focus();
			inputField.classList.add("error-focused");
		} else if (
			!inputField.value &&
			inputField.classList.contains("error-focused")
		) {
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "The input field cannot be empty.!",
			});
			inputField.classList.remove("error-focused");
		} else if (inputField.value != random) {
			checkClick();
		} else if (
			inputField.value == random &&
			!inputField.classList.contains("win-repeat")
		) {
			swal();
			winFunc();
			inputField.classList.add("win-repeat");
			// counter = 1;
		} else {
			console.log("aa");
			console.log(inputField.value);
			console.log(random);
			console.log(counter);
		}
	}
});

const checkClick = () => {
	if (!inputField.value) {
		Swal.fire({
			icon: "error",
			title: "Oops...",
			text: "The input field cannot be empty.!",
		});
	} else if (inputField.value == random) {
		swal();
		winFunc();
	} else {
		if (score > 1) {
			score--;
			preGue.textContent = inputField.value;
			guesses.textContent = score;
			if (inputField.value < random) {
				msg.textContent = "Higher 👆";
				result.innerText = "";
				result.appendChild(increase);
				playInc();
			} else {
				msg.textContent = "Lower👇";
				result.innerText = "";
				result.appendChild(decrease);
				playDec();
			}
			// ? ( msg.textContent = "Higher 👆")
			// : (msg.textContent = "Lower👇");
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
			point.textContent = 0;
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
	preGue.textContent = "";
	point.textContent = 0;
	random = Math.ceil(Math.random() * maxRandom);
	inputField.classList.remove("win-repeat");
	console.log(random);
});

let winFunc = () => {
	msg.textContent = " Conguratulations! You Got It  👏 🎉";
	body.style.background = "linear-gradient(to right, #dce35b, #45b649)";
	leftDiv.style.display = "none";
	let icon = document.createElement("img");
	icon.src = "./assets/smile-icon.png";
	icon.className = "smile";
	result.textContent = "";
	result.appendChild(icon);
	againBtn.style.visibility = "visible";
	difficulty === "Easy"
		? (point.textContent = score * 10)
		: (point.textContent = score * 20);
	guesses.textContent = score;
	preGue.textContent = inputField.value;
	msg.textContent = "End of Game";
};

// shake btns
//decrease
let decrease = document.createElement("img");
decrease.src = "./assets/decrease.png";
decrease.className = "decrease";
//increase
let increase = document.createElement("img");
increase.src = "./assets/decrease.png";
increase.className = "increase";

//swal func
let swal = () => {
	let swalWidth = 700;
	let swalPadding = "3em";
	let swalTitle = "Congratulations! You Got It 👏 🎉";

	const mediaQuery = window.matchMedia("(max-width: 400px)");
	if (mediaQuery.matches) {
		swalWidth = "90%"; // Genişlik şimdi ekranın %90'ı olacak
		swalPadding = "1em"; // Padding değerini azalt
		swalTitle = "You Got It! 🎉"; // Başlığı kısalt
	}
	Swal.fire({
		title: swalTitle,
		width: swalWidth,
		padding: swalPadding,
		color: "#716add",
		background: "#fff url(https://sweetalert2.github.io/images/trees.png)",
		backdrop: `
		  rgba(0,0,123,0.4)
		  url("https://sweetalert2.github.io/images/nyan-cat.gif")
		  left top
		  no-repeat
		`,
	});
};



playDec();
pauseInc();
function playDec() {
	decrease.style.animationPlayState = "running";
}

function pauseDec() {
	decrease.style.animationPlayState = "paused";
}

function playInc() {
	increase.style.animationPlayState = "running";
}

function pauseInc() {
	increase.style.animationPlayState = "paused";
}
