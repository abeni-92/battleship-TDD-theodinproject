import Ship from './ship.js';

// node env't
// const Ship = require('./ship');

const SIZE = 10;
export class Gameboard {

	constructor () {
	  this.board = [];
	  this.missedShots = [];
	  this.hitShots = [];
	  this.ships = [];
	  this.initialize();
	}
  
	initialize (){
	  for (let i = 0; i < SIZE; i++) {
		this.board[i] = [];
		this.missedShots[i] = [];
		for (let j = 0; j < SIZE; j++) {
		  this.board[i][j] = null;
		  this.missedShots[i][j] = false;
		}
	  }
	  return this.board;
	}
  
	placeShip (ship, row, col, isVertical) {
	  if (!this.isPlacementPossible(ship, row, col, isVertical)) return false
  
	  let sh = [];
	  if (isVertical) {
		for (let i = 0; i < ship.length; i++) {
		  this.board[row + i][col] = ship.name;
		  sh.push([row + i, col]);
		}
	  } else {
		  for (let i = 0; i < ship.length; i++) {
			this.board[row][col + i] = ship.name;
			sh.push([row, col + i]);
		  }
	  }
  
	  this.ships.push(sh);
	  return true
	}
  
	isPlacementPossible (ship, row, col, isVertical) {
	  // check if the position is within boundary
	  if (row < 0 || row >= SIZE || col < 0 || col >= SIZE) return false
  
	  if (isVertical) {
		if (row + ship.length > SIZE) return false
	  } else {
		  if (col + ship.length > SIZE) return false;
	  }
  
	  // check if the fields are aleady taken
	  if (isVertical) {
		for (let i = 0; i < ship.length; i++) {
		  if (this.board[row + i][col]) return false
		}
	  } else {
		for (let i = 0; i < ship.length; i++) {
		  if (this.board[row][col + i]) return false
		}
	  }
  
	  return true;
	}
  
	randomPlaceship() {
	  let ship1 = new Ship(5, 'Computer');
	  let ship2 = new Ship(4, 'Computer');
	  let ship3 = new Ship(3, 'Computer');
	  let ship4 = new Ship(3, 'Computer');
	  let ship5 = new Ship(2, 'Computer');
	  
	  let shipInstances = [ship1, ship2, ship3, ship4, ship5];
	  
	  
	  for (let s of shipInstances) {
		  let row, col;
  
		  const isVertical = Math.floor(Math.random() * 2) === 1 ? true : false;
		  if (isVertical) {
			  // Generate a random row and ensure the ship fits within the boundaries
			  row = Math.floor(Math.random() * (SIZE - s.length + 1));
			  col = Math.floor(Math.random() * SIZE);
		  } else {
			  // Generate a random column and ensure the ship fits within the boundaries
			  row = Math.floor(Math.random() * SIZE);
			  col = Math.floor(Math.random() * (SIZE - s.length + 1));
		  }
		  
		  while (!this.isPlacementPossible(s, row, col, isVertical)) {
			  const isVertical = Math.floor(Math.random() * 2) === 1 ? true : false;
			  if (isVertical) {
				  // Generate a random row and ensure the ship fits within the boundaries
				  row = Math.floor(Math.random() * (SIZE - s.length + 1));
				  col = Math.floor(Math.random() * SIZE);
			  } else {
				  // Generate a random column and ensure the ship fits within the boundaries
				  row = Math.floor(Math.random() * SIZE);
				  col = Math.floor(Math.random() * (SIZE - s.length + 1));
			  }
		  }

		  this.placeShip(s, row, col, isVertical)
		}
		  console.log(this.ships);
	  }  
  
	recieveAttack (x, y) {
	  if (x < 0 || y < 0 || x >= SIZE || y >= SIZE) return false;
  
	  if (this.missedShots[x][y] || this.hitShots.some(coord => coord[0] == x && coord[1] == y)) return false;
  
	  if (this.board[x][y] === null) {
		this.missedShots[x][y] = true;
		return 'Missed Shot';
	  } else {
		  this.hitShots.push([x,y]);
		  return 'Hit Shot';
	  }
  
	}
  
	isGameOver () {
	  if (this.ships.length === 0) return false;
  
	  for (let i = 0; i < this.ships.length; i++) {
		  let sh = this.ships[i]; 
		  for (let item of sh) {
			  if (!this.hitShots.some(coord => coord[0] === item[0] && coord[1] === item[1])) {
				  return false;
			  } 
		  }
	  }
  
	  return true;
	}
  
	isOutOfBoundary (x, y) {
	  return x < 0 || y < 0 || x >= SIZE || y >= SIZE ? true : false;
	}
	
	// landingUI () {
	// 	return `
	// 		<div class="flex flex-col justify-between items-center gap-12">
	// 			<input type="text" name="player-name" id="player-name" placeholder="Your Name..." class="px-4 py-2 border-none outline-none text-gray-600 placeholder:text-gray-600 text-lg focus:outline-1">
	// 			<p class="hidden error text-2xl text-red-500">Your Name is Required!</p>
	// 			<button id="start" class="bg-slate-50 text-slate-900 font-bold text-3xl p-4 hover:font-extrabold">START GAME</button>
	// 		</div>
	// 	`
	// }

	// gameboardUI () {
	// 	return `
	// 		<div class="text-center p-6 mx-auto">
	// 			<h2 class="text-xl my-2"><span id="player-name">ASD, </span>Place Your Ship <span id="ship-number">1</span></h2>
	// 			<button id="axis-btn" class="text-2xl px-4 py-2 bg-gray-600 hover:text-green-600">AXIS - <span id="axis">X</span></button>
	// 		</div>
			
	// 		<div class="grid grid-cols-10 gap-1">
	// 			<div class="p-4 rounded border-2 cursor-pointer item" data-col="0" data-row="0"></div>
	// 			<div class="p-4 rounded border-2 cursor-pointer item" data-col="1" data-row="0"></div>
	// 			<div class="p-4 rounded border-2 cursor-pointer item" data-col="2" data-row="0"></div>
	// 			<div class="p-4 rounded border-2 cursor-pointer item" data-col="3" data-row="0"></div>
	// 			<div class="p-4 rounded border-2 cursor-pointer item" data-col="4" data-row="0"></div>
	// 			<div class="p-4 rounded border-2 cursor-pointer item" data-col="5" data-row="0"></div>
	// 			<div class="p-4 rounded border-2 cursor-pointer item" data-col="6" data-row="0"></div>
	// 			<div class="p-4 rounded border-2 cursor-pointer item" data-col="7" data-row="0"></div>
	// 			<div class="p-4 rounded border-2 cursor-pointer item" data-col="8" data-row="0"></div>
	// 			<div class="p-4 rounded border-2 cursor-pointer item" data-col="9" data-row="0"></div>
				
	// 			<div class="p-4 rounded border-2 cursor-pointer item" data-col="0" data-row="1"></div>
	// 			<div class="p-4 rounded border-2 cursor-pointer item" data-col="1" data-row="1"></div>
	// 			<div class="p-4 rounded border-2 cursor-pointer item" data-col="2" data-row="1"></div>
	// 			<div class="p-4 rounded border-2 cursor-pointer item" data-col="3" data-row="1"></div>
	// 			<div class="p-4 rounded border-2 cursor-pointer item" data-col="4" data-row="1"></div>
	// 			<div class="p-4 rounded border-2 cursor-pointer item" data-col="5" data-row="1"></div>
	// 			<div class="p-4 rounded border-2 cursor-pointer item" data-col="6" data-row="1"></div>
	// 			<div class="p-4 rounded border-2 cursor-pointer item" data-col="7" data-row="1"></div>
	// 			<div class="p-4 rounded border-2 cursor-pointer item" data-col="8" data-row="1"></div>
	// 			<div class="p-4 rounded border-2 cursor-pointer item" data-col="9" data-row="1"></div>
				
	// 			<div class="p-4 rounded border-2 cursor-pointer item" data-col="0" data-row="2"></div>
	// 			<div class="p-4 rounded border-2 cursor-pointer item" data-col="1" data-row="2"></div>
	// 			<div class="p-4 rounded border-2 cursor-pointer item" data-col="2" data-row="2"></div>
	// 			<div class="p-4 rounded border-2 cursor-pointer item" data-col="3" data-row="2"></div>
	// 			<div class="p-4 rounded border-2 cursor-pointer item" data-col="4" data-row="2"></div>
	// 			<div class="p-4 rounded border-2 cursor-pointer item" data-col="5" data-row="2"></div>
	// 			<div class="p-4 rounded border-2 cursor-pointer item" data-col="6" data-row="2"></div>
	// 			<div class="p-4 rounded border-2 cursor-pointer item" data-col="7" data-row="2"></div>
	// 			<div class="p-4 rounded border-2 cursor-pointer item" data-col="8" data-row="2"></div>
	// 			<div class="p-4 rounded border-2 cursor-pointer item" data-col="9" data-row="2"></div>
				
	// 			<div class="p-4 rounded border-2 cursor-pointer item" data-col="0" data-row="3"></div>
	// 			<div class="p-4 rounded border-2 cursor-pointer item" data-col="1" data-row="3"></div>
	// 			<div class="p-4 rounded border-2 cursor-pointer item" data-col="2" data-row="3"></div>
	// 			<div class="p-4 rounded border-2 cursor-pointer item" data-col="3" data-row="3"></div>
	// 			<div class="p-4 rounded border-2 cursor-pointer item" data-col="4" data-row="3"></div>
	// 			<div class="p-4 rounded border-2 cursor-pointer item" data-col="5" data-row="3"></div>
	// 			<div class="p-4 rounded border-2 cursor-pointer item" data-col="6" data-row="3"></div>
	// 			<div class="p-4 rounded border-2 cursor-pointer item" data-col="7" data-row="3"></div>
	// 			<div class="p-4 rounded border-2 cursor-pointer item" data-col="8" data-row="3"></div>
	// 			<div class="p-4 rounded border-2 cursor-pointer item" data-col="9" data-row="3"></div>
				
	// 			<div class="p-4 rounded border-2 cursor-pointer item" data-col="0" data-row="4"></div>
	// 			<div class="p-4 rounded border-2 cursor-pointer item" data-col="1" data-row="4"></div>
	// 			<div class="p-4 rounded border-2 cursor-pointer item" data-col="2" data-row="4"></div>
	// 			<div class="p-4 rounded border-2 cursor-pointer item" data-col="3" data-row="4"></div>
	// 			<div class="p-4 rounded border-2 cursor-pointer item" data-col="4" data-row="4"></div>
	// 			<div class="p-4 rounded border-2 cursor-pointer item" data-col="5" data-row="4"></div>
	// 			<div class="p-4 rounded border-2 cursor-pointer item" data-col="6" data-row="4"></div>
	// 			<div class="p-4 rounded border-2 cursor-pointer item" data-col="7" data-row="4"></div>
	// 			<div class="p-4 rounded border-2 cursor-pointer item" data-col="8" data-row="4"></div>
	// 			<div class="p-4 rounded border-2 cursor-pointer item" data-col="9" data-row="4"></div>
				
	// 			<div class="p-4 rounded border-2 cursor-pointer item" data-col="0" data-row="5"></div>
	// 			<div class="p-4 rounded border-2 cursor-pointer item" data-col="1" data-row="5"></div>
	// 			<div class="p-4 rounded border-2 cursor-pointer item" data-col="2" data-row="5"></div>
	// 			<div class="p-4 rounded border-2 cursor-pointer item" data-col="3" data-row="5"></div>
	// 			<div class="p-4 rounded border-2 cursor-pointer item" data-col="4" data-row="5"></div>
	// 			<div class="p-4 rounded border-2 cursor-pointer item" data-col="5" data-row="5"></div>
	// 			<div class="p-4 rounded border-2 cursor-pointer item" data-col="6" data-row="5"></div>
	// 			<div class="p-4 rounded border-2 cursor-pointer item" data-col="7" data-row="5"></div>
	// 			<div class="p-4 rounded border-2 cursor-pointer item" data-col="8" data-row="5"></div>
	// 			<div class="p-4 rounded border-2 cursor-pointer item" data-col="9" data-row="5"></div>
				
	// 			<div class="p-4 rounded border-2 cursor-pointer item" data-col="0" data-row="6"></div>
	// 			<div class="p-4 rounded border-2 cursor-pointer item" data-col="1" data-row="6"></div>
	// 			<div class="p-4 rounded border-2 cursor-pointer item" data-col="2" data-row="6"></div>
	// 			<div class="p-4 rounded border-2 cursor-pointer item" data-col="3" data-row="6"></div>
	// 			<div class="p-4 rounded border-2 cursor-pointer item" data-col="4" data-row="6"></div>
	// 			<div class="p-4 rounded border-2 cursor-pointer item" data-col="5" data-row="6"></div>
	// 			<div class="p-4 rounded border-2 cursor-pointer item" data-col="6" data-row="6"></div>
	// 			<div class="p-4 rounded border-2 cursor-pointer item" data-col="7" data-row="6"></div>
	// 			<div class="p-4 rounded border-2 cursor-pointer item" data-col="8" data-row="6"></div>
	// 			<div class="p-4 rounded border-2 cursor-pointer item" data-col="9" data-row="6"></div>
								
	// 			<div class="p-4 rounded border-2 cursor-pointer item" data-col="0" data-row="7"></div>
	// 			<div class="p-4 rounded border-2 cursor-pointer item" data-col="1" data-row="7"></div>
	// 			<div class="p-4 rounded border-2 cursor-pointer item" data-col="2" data-row="7"></div>
	// 			<div class="p-4 rounded border-2 cursor-pointer item" data-col="3" data-row="7"></div>
	// 			<div class="p-4 rounded border-2 cursor-pointer item" data-col="4" data-row="7"></div>
	// 			<div class="p-4 rounded border-2 cursor-pointer item" data-col="5" data-row="7"></div>
	// 			<div class="p-4 rounded border-2 cursor-pointer item" data-col="6" data-row="7"></div>
	// 			<div class="p-4 rounded border-2 cursor-pointer item" data-col="7" data-row="7"></div>
	// 			<div class="p-4 rounded border-2 cursor-pointer item" data-col="8" data-row="7"></div>
	// 			<div class="p-4 rounded border-2 cursor-pointer item" data-col="9" data-row="7"></div>
				
	// 			<div class="p-4 rounded border-2 cursor-pointer item" data-col="0" data-row="8"></div>
	// 			<div class="p-4 rounded border-2 cursor-pointer item" data-col="1" data-row="8"></div>
	// 			<div class="p-4 rounded border-2 cursor-pointer item" data-col="2" data-row="8"></div>
	// 			<div class="p-4 rounded border-2 cursor-pointer item" data-col="3" data-row="8"></div>
	// 			<div class="p-4 rounded border-2 cursor-pointer item" data-col="4" data-row="8"></div>
	// 			<div class="p-4 rounded border-2 cursor-pointer item" data-col="5" data-row="8"></div>
	// 			<div class="p-4 rounded border-2 cursor-pointer item" data-col="6" data-row="8"></div>
	// 			<div class="p-4 rounded border-2 cursor-pointer item" data-col="7" data-row="8"></div>
	// 			<div class="p-4 rounded border-2 cursor-pointer item" data-col="8" data-row="8"></div>
	// 			<div class="p-4 rounded border-2 cursor-pointer item" data-col="9" data-row="8"></div>
				
	// 			<div class="p-4 rounded border-2 cursor-pointer item" data-col="0" data-row="9"></div>
	// 			<div class="p-4 rounded border-2 cursor-pointer item" data-col="1" data-row="9"></div>
	// 			<div class="p-4 rounded border-2 cursor-pointer item" data-col="2" data-row="9"></div>
	// 			<div class="p-4 rounded border-2 cursor-pointer item" data-col="3" data-row="9"></div>
	// 			<div class="p-4 rounded border-2 cursor-pointer item" data-col="4" data-row="9"></div>
	// 			<div class="p-4 rounded border-2 cursor-pointer item" data-col="5" data-row="9"></div>
	// 			<div class="p-4 rounded border-2 cursor-pointer item" data-col="6" data-row="9"></div>
	// 			<div class="p-4 rounded border-2 cursor-pointer item" data-col="7" data-row="9"></div>
	// 			<div class="p-4 rounded border-2 cursor-pointer item" data-col="8" data-row="9"></div>
	// 			<div class="p-4 rounded border-2 cursor-pointer item" data-col="9" data-row="9"></div>
	// 		</div>
	// 	`;
	
	// }

	// handleAxis () {

	// 	let board = document.createElement('div');
	// 	board.innerHTML = this.gameboardUI();
		
	// 	const axisBtn = board.querySelector("#axis-btn");
	// 	const axis = board.querySelector("#axis");

	// 	axisBtn.addEventListener("click", () => {
	// 		if (axis.textContent === 'X') {
	// 			axis.textContent = 'Y'
	// 			isVertical = true;
	// 		} else {
	// 			axis.textContent = 'X'
	// 			isVertical = false
	// 		}
	// 	})
	// }
  
	getEmptyField () {
	  let result = 0;
	  for (let i = 0; i < SIZE; i++) {
		for (let j = 0; j < SIZE; j++) {
		  if (this.board[i][j] == null) {
			result += 1
		  }
		}
	  }
	  return result;
	}
  
  }

//  browser env't
export default Gameboard

// node env't
// module.exports = Gameboard