import Gameboard from "./src/gameboard.js	";

// import gameLogic from "./src/gamelogic.js";

// gameLogic();


const playerName = document.getElementById("player-name");
const start = document.getElementById("start");
const errorMessage = document.querySelector(".error");
// const main = document.getElementById("main");
const body = document.querySelector("body");


const gameboard = new Gameboard();

start.addEventListener("click", () => {
	if (playerName.value == "") {
		errorMessage.classList.remove("hidden");
	} else {
		// body.innerHTML = "";
		body.innerHTML = gameboard.gameboardUI();
		
		const axisBtn = document.getElementById("axis-btn");
		const axis = document.getElementById("axis");
		
		axisBtn.addEventListener("click", () => {
			if (axis.textContent === 'X') {
				axis.textContent = 'Y'
			} else {
				axis.textContent = 'X'
			}
		})

		body.querySelectorAll(".item").forEach(item => {
			item.addEventListener("mouseover", (e) => {
				console.log(e.target.dataset.row)
			})
		})

		
	}
})






