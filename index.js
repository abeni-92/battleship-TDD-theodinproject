import Gameboard from "./src/gameboard.js	";
import Ship from "./src/ship.js";
import Player from "./src/player.js";
// import gameLogic from "./src/gamelogic.js";

// gameLogic();

const start = document.getElementById("start");
const playerName = document.getElementById("player-name");
const errorMessage = document.querySelector(".error");

const computerPlayer = new Player('computer');
const humanPlayer = new Player('human')

const computerPlayerGameboard = computerPlayer.gameBoard;
const humanPlayerGameboard = humanPlayer.gameBoard;


const mainBody = document.getElementById("main-body");
const playerShips = [new Ship(5, 'player'), new Ship(4, 'player'), new Ship(3, 'player'), new Ship(3, 'player'), new Ship(2, 'player')];
let count = 0;

// Start button to redirect human player to the gameboard to place their ships
if (start) {
	start.addEventListener("click", () => {
		if (playerName.value != "") {
			location.href = "./gameboard.html";		
			// computerGameboard.randomPlaceship();	
		} else {
			errorMessage.classList.remove("hidden");	
		}
	})
}

// Change Direction of ship placement
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

// Gameboard for the human player to place ships
if (mainBody){
	mainBody.querySelectorAll('.item').forEach(item => {
		item.addEventListener("mouseover", (e) => {
			let x = parseInt(e.target.dataset.row);
			let y = parseInt(e.target.dataset.col);

			if (count < 5) {
				if (humanPlayerGameboard.isPlacementPossible(playerShips[count], x, y, isVertical)) {
					if(isVertical) {
						for (let i = 0; i < playerShips[count].length; i++) {
								let z = x + i;
								let elt = mainBody.querySelector(`[data-row="${z}"][data-col="${y}"]`)
								elt.classList.add("bg-white")
						}
					} else {
						for (let i = 0; i < playerShips[count].length; i++) {
							let z = y + i;
							let elt = mainBody.querySelector(`[data-row="${x}"][data-col="${z}"]`)
							elt.classList.add("bg-white")
						}
					}
				} else {	
					e.target.classList.add("bg-red-900")
					e.target.classList.add("cursor-not-allowed", "bg-red-900")
					// console.log(e.target)
					// console.log("can not")
				}
			}
		})

		item.addEventListener("mouseout", (e) => {
			let x = parseInt(e.target.dataset.row);
			let y = parseInt(e.target.dataset.col);
			
			if (count < 5) {
				if (humanPlayerGameboard.isPlacementPossible(playerShips[count], x, y, isVertical)) {
					if(isVertical) {
						for (let i = 0; i < playerShips[count].length; i++) {
								let z = x + i;
								let elt = mainBody.querySelector(`[data-row="${z}"][data-col="${y}"]`)
								elt.classList.remove("bg-white")
						}
					} else {
						for (let i = 0; i < playerShips[count].length; i++) {
							let z = y + i;
							let elt = mainBody.querySelector(`[data-row="${x}"][data-col="${z}"]`)
							elt.classList.remove("bg-white")
						}
					}
				} else {
					e.target.classList.remove("bg-red-900")
				}
			}
		})

		item.addEventListener("click", (e) => {
			let x = parseInt(e.target.dataset.row);
			let y = parseInt(e.target.dataset.col);
			if (count < 5) {
				if(humanPlayerGameboard.placeShip(playerShips[count], x, y, isVertical)) {
					if(isVertical) {
						for (let i = 0; i < playerShips[count].length; i++) {
								let z = x + i;
								let elt = mainBody.querySelector(`[data-row="${z}"][data-col="${y}"]`)
								elt.classList.add("bg-white")
						}
					} else {
						for (let i = 0; i < playerShips[count].length; i++) {
							let z = y + i;
							let elt = mainBody.querySelector(`[data-row="${x}"][data-col="${z}"]`)
							elt.classList.add("bg-white")
						}
					}
					count++;
				}
			} else {
				console.log("finished")
				location.href = "./play.html";
			}
		})
	})
}

// putting computer ships at random positions
let computerShips = computerPlayerGameboard.randomPlaceship();

console.log(computerShips)

// Player ground for the human player and computer
const yourWater = document.querySelector(".your");
const enemyWater = document.querySelector(".enemy");

// do not allow to play on your board
if (yourWater) {
	yourWater.querySelectorAll(".item").forEach(item => {
		item.addEventListener("mouseover", (e) => {
			e.target.classList.add("cursor-not-allowed")
		})
	})
}

let humanTurn = true;
const turn = document.querySelector('.turn');

const gameLogic = () => {
	if (computerPlayerGameboard.isGameOver()) {
		turn.textContent = 'You Win!'
		console.log('You Win!');
		return;
	}

	if (humanPlayerGameboard.isGameOver()) {
		turn.textContent = 'You Lose!'
		console.log('You Lose')
		return;
	}

	if (humanTurn) {
		console.log('your turn')
		turn.textContent = 'It\'s Your Turn!';
		if (enemyWater) {
			enemyWater.querySelectorAll(".item").forEach(item => {
				item.addEventListener("mouseover", (e) => {
					let x = e.target.dataset.row;
					let y = e.target.dataset.col;
					
					if (!humanPlayer.alreadyHitPositions.some(coord => coord[0] == x && coord[1] == y)) {		
						e.target.classList.add("bg-green-400")
					} else {
						e.target.classList.add("cursor-not-allowed")
						e.target.classList.add("bg-red-900")
					}
				})
		
				item.addEventListener("mouseout", (e) => {
					let x = e.target.dataset.row;
					let y = e.target.dataset.col;
					if (!humanPlayer.alreadyHitPositions.some(coord => coord[0] == x && coord[1] == y)) {		
						e.target.classList.remove("bg-green-400")
					} else {
						e.target.classList.remove("cursor-not-allowed")
						e.target.classList.remove("bg-red-900")
					}
				})

				item.addEventListener("click", (e) => {
					if(humanTurn) {
						let x = e.target.dataset.row;
						let y = e.target.dataset.col;
						if(humanPlayer.attack(x, y, computerPlayerGameboard)) {
								e.target.classList.add("bg-green-400")
								humanTurn = false
								console.log(computerPlayerGameboard.hitShots)
								gameLogic()

						} else {
							e.target.classList.add("cursor-not-allowed")
						}
					}
				})
			})
		}
	} else {
		console.log('computer turn')
		turn.textContent = 'It\'s Computer\'s turn!';

		setTimeout(() => {
			computerPlayer.randomAttack(humanPlayerGameboard);
			humanTurn = true
			gameLogic()
		}, 1500)
	}
}


gameLogic();






