import Gameboard from "./src/gameboard.js	";
import Ship from "./src/ship.js";

// import gameLogic from "./src/gamelogic.js";

// gameLogic();

const start = document.getElementById("start");
const playerName = document.getElementById("player-name")
const errorMessage = document.querySelector(".error");

if (start) {
	start.addEventListener("click", () => {
		if (playerName.value != "") {
			location.href = "./gameboard.html"
		} else {
			errorMessage.classList.remove("hidden");	
		}
	})
}

const axisBtn = document.getElementById("axis-btn");
const axis = document.getElementById("axis");
let isVertical = false;

if (axisBtn) {
	axisBtn.addEventListener("click", () => {
		
		if (axis.textContent === 'X') {
			axis.textContent = 'Y'
			isVertical = true;
		} else {
			axis.textContent = 'X'
			isVertical = false
		}
	})
}

const mainBody = document.getElementById("main-body");
const ship = new Ship(5, 'ASDF');
const gameboard = new Gameboard();

mainBody.querySelectorAll('.item').forEach(item => {
	item.addEventListener("mouseover", (e) => {
		let x = parseInt(e.target.dataset.row);
		let y = parseInt(e.target.dataset.col);
		
		if (gameboard.isPlacementPossible(ship, x, y, isVertical)) {
			if(isVertical) {
				for (let i = 0; i < ship.length; i++) {
						let z = x + i;
						let elt = mainBody.querySelector(`[data-row="${z}"][data-col="${y}"]`)
						elt.classList.add("bg-white")
				}
			} else {
				for (let i = 0; i < ship.length; i++) {
					let z = y + i;
					let elt = mainBody.querySelector(`[data-row="${x}"][data-col="${z}"]`)
					elt.classList.add("bg-white")
				}
			}
		} else {	
			console.log("can not")
			let elt = mainBody.querySelector(`[data-row="${x}"][data-col="${y}"]`)
			elt.classList.remove("cursor-pointer")
			elt.classList.add("cursor-not-allowed")
			// elt.classList.add("cursor-not-allowed", "bg-red")
			console.log(elt)
		}
	})

	item.addEventListener("mouseout", (e) => {
		let x = parseInt(e.target.dataset.row);
		let y = parseInt(e.target.dataset.col);
		
		if (gameboard.isPlacementPossible(ship, x, y, isVertical)) {
			if(isVertical) {
				for (let i = 0; i < ship.length; i++) {
						let z = x + i;
						let elt = mainBody.querySelector(`[data-row="${z}"][data-col="${y}"]`)
						elt.classList.remove("bg-white")
				}
			} else {
				for (let i = 0; i < ship.length; i++) {
					let z = y + i;
					let elt = mainBody.querySelector(`[data-row="${x}"][data-col="${z}"]`)
					elt.classList.remove("bg-white")
				}
			}
		} 
		// else {	
		// 	console.log("can not")
		// 	let elt = mainBody.querySelector(`[data-row="${x}"][data-col="${y}"]`)
		// 	elt.classList.remove("cursor-pointer")
		// 	elt.classList.add("cursor-not-allowed", "bg-red")
		// 	console.log(elt)
		// }
	})
})








