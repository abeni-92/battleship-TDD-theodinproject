import Ship from "./src/ship.js";
import Player from "./src/player.js";

// landing page
const home = document.getElementById("home-main");
const start = document.getElementById("start");
const playerName = document.getElementById("player-name");
const errorMessage = document.querySelector(".error");

// on the gameboard page to placeships
const displayName = document.getElementById("display-name");
const gameBoard = document.getElementById("gameboard");
const mainBody = document.getElementById("main-body");

// on the play field
const playBoard = document.getElementById("playboard");
const yourWater = document.querySelector(".your");
const enemyWater = document.querySelector(".enemy");

const shipNumber = document.getElementById("ship-number")
const playerShips = [new Ship(5, 'player'), new Ship(4, 'player'), new Ship(3, 'player'), new Ship(3, 'player'), new Ship(2, 'player')];

const computerPlayer = new Player('computer');
const humanPlayer = new Player('human')

const computerPlayerGameboard = computerPlayer.gameBoard;
const humanPlayerGameboard = humanPlayer.gameBoard;

let count = 0;
let shipNum = 1;

// Start button to redirect human player to the gameboard to place their ships
start.addEventListener("click", () => {
	if (playerName.value != "") {
		home.classList.add("hidden");
		home.classList.remove("flex");
		
		displayName.textContent = playerName.value.toUpperCase();
		gameBoard.classList.remove("hidden");
		gameBoard.classList.add("flex");
		computerPlayerGameboard.randomPlaceship();	
		// console.log(computerPlayerGameboard.ships)
	} else {
		errorMessage.classList.remove("hidden");	
	}
})

playerName.addEventListener("keypress", (e) => {
	if (e.key == "Enter" && playerName.value != '') {
		home.classList.add("hidden");
		home.classList.remove("flex");
		
		displayName.textContent = playerName.value.toUpperCase();
		gameBoard.classList.remove("hidden");
		gameBoard.classList.add("flex");
		computerPlayerGameboard.randomPlaceship();	
		// console.log(computerPlayerGameboard.ships)
	} else {
		errorMessage.classList.remove("hidden");	
	}
})


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
mainBody.querySelectorAll('.item').forEach(item => {
	shipNumber.textContent = shipNum;
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
				e.target.classList.add("cursor-not-allowed", "bg-red-500")
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
				e.target.classList.remove("bg-red-500", "cursor-not-allowed")
			}
		}
	})

	item.addEventListener("click", (e) => {
		let x = parseInt(e.target.dataset.row);
		let y = parseInt(e.target.dataset.col);
		if (count < 5) { 
			shipNumber.textContent = shipNum;
			if(humanPlayerGameboard.placeShip(playerShips[count], x, y, isVertical)) {
				// humanPlayerGameboard.placeShip(playerShips[count], x, y, isVertical);
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
				shipNum++;
			}
		}
	})
})

mainBody.addEventListener("mouseup", () => {
	if(count == 4) {
		setTimeout(() => {
				console.log("finished setup!")
				console.log(humanPlayerGameboard.ships);
				console.log(computerPlayerGameboard.ships);
				playBoard.classList.remove("hidden");
				playBoard.classList.add("flex");

				gameBoard.classList.add("hidden");
				gameBoard.classList.remove("flex");
			}, 500);
	}
})


// do not allow to play on your board
yourWater.querySelectorAll(".item").forEach(item => {
	item.addEventListener("mouseover", (e) => {
		e.target.classList.remove("cursor-pointer")
		e.target.classList.add("cursor-not-allowed")
	})
})

let humanTurn = true;
const turn = document.querySelector('.turn');
const gameEnd = document.querySelector('.gameover');
const winner = document.querySelector('.winner');
const playAgain = document.querySelector('.play-again')

const gameLogic = () => {
	if (computerPlayerGameboard.isGameOver()) {
		console.log('You Win!')
		playBoard.classList.remove("flex");
		playBoard.classList.add("hidden");
		gameEnd.classList.remove("hidden");
		gameEnd.classList.add("flex");
		winner.textContent = 'You Win!';
		playAgain.addEventListener("click", () => {
			window.location.href = './'
		})
		// return;
	}

	if (humanPlayerGameboard.isGameOver()) {
		console.log('You Lose!')
		playBoard.classList.remove("flex");
		playBoard.classList.add("hidden");
		gameEnd.classList.remove("hidden");
		gameEnd.classList.add("flex");
		winner.textContent = 'You Lose!';
		// return;
	}

	if (humanTurn) {
		// console.log('your turn')
		turn.textContent = 'It\'s Your Turn!';
		
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
						computerPlayerGameboard.ships.forEach(ship => {
							ship.flat();
							if (ship.some(coord => coord[0] == x && coord[1] == y)) {
								e.target.classList.add("bg-red-400")
							} else {
								e.target.classList.add("bg-green-400")
							}
						})
						
						humanTurn = false
						gameLogic()
						// console.log(computerPlayerGameboard.hitShots)
					} else {
						e.target.classList.add("cursor-not-allowed")
					}
				}
			})
		})
		
	} else {
		// console.log('computer turn')
		turn.textContent = 'It\'s Computer\'s turn!';

		setTimeout(() => {
			let move = computerPlayer.randomAttack(humanPlayerGameboard);

			let x = move[0];
			let y = move[1];
			// console.log(x,y)

			let position = yourWater.querySelector([`[data-row="${x}"][data-col="${y}"]`]);
			let shipCoordinates = humanPlayerGameboard.ships.flat();

			if (shipCoordinates.some(coord => coord[0] == x && coord[1] == y)) {
				position.classList.add("bg-red-400")
			} else {
				position.classList.add("bg-green-400")
			}
	
			humanTurn = true
			gameLogic()
		}, 1500)
	}
}

gameLogic();






