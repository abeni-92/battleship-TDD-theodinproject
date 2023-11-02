
const SIZE = 10;

class Ship {
  constructor(length, name) {
    this.name = name;
    this.length = length;
    this.hits = [];
  }

  hit (x, y) {
    if (x < 0 || y < 0 || x >= SIZE || y >= SIZE || this.hits.some(coord => coord[0] === x && coord[1] === y))  return false

    this.hits.push([x, y]);
    return true
  }

  isSunk () {
    return this.hits.length === this.length;
  }
}

class Gameboard {

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
          sh.push([row, col + 1]);
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

	// this.ships.push(ship1);
	console.log(this.ships);

	const row = Math.floor(Math.random() * 10);
	const col = Math.floor(Math.random() * 10);
	const isVertical = Math.floor(Math.random() * 2) === 1 ? true : false;	

	let successfulPlacement = 0;

	while (successfulPlacement < 1) {
		if (this.placeShip(ship1, row, col, isVertical)) {
			successfulPlacement += 1;
		}
	}

  }

  recieveAttack (x, y) {
    if (x < 0 || y < 0 || x >= SIZE || y >= SIZE) return false;

	if (this.missedShots[x][y]) return false;

	// if (this.missedShots[x][y] == true || this.hitShots.some(coord => coord[0] === x && coord[1] === y)) return false

    if (this.board[x][y] === null) {
      this.missedShots[x][y] = true;
      return 'Missed Shot';
    } else {
		// const shipName = this.board[x][y];
		// const ship = this.ships.find((s) => s.name === shipName);
		this.hitShots.push([x,y]);
		// console.log(ship);
		// if (ship.hit(x, y)) {
			return 'Hit Shot';

		// } else {
		// 	return 'Already Hit'
		// }

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

class Player {
  constructor (name) {
    this.name = name;
    this.gameBoard = new Gameboard();
    this.ships = [];
    this.alreadyHitPositions = [];
  }

  randomAttack(gameboard) {
    let x = Math.floor(Math.random() * 10);
    let y = Math.floor(Math.random() * 10);

    while (this.alreadyHitPositions.includes(x, y)) {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);
    }
    this.alreadyHitPositions.push([x, y]);
    gameboard.recieveAttack(x, y);
	console.log(x, y)
	return x, y;
  }
  // the input gameboard should be the other players game board
  attack (x, y, gameboard) {
    if (this.alreadyHit(x, y) || gameboard.isOutOfBoundary(x, y)) return false;

    this.alreadyHitPositions.push([x, y]);
	gameboard.recieveAttack(x, y);
	console.log(x, y);
	return 'Attacked'
	// return x, y;
  }

  alreadyHit(x, y) {
    for (let i = 0; i < this.alreadyHitPositions.length; i++) {
      if (this.alreadyHitPositions[i][0] == x && this.alreadyHitPositions[i][1] == y) {
        return true
      }
    }
    return false;
  }

}

const readline = require('readline').createInterface({
	input: process.stdin,
	output: process.stdout
  });

const player1 = new Player('Player 1');
const player2 = new Player('Player 2');

let ship1 = new Ship(5);

let board1 = player1.gameBoard;
let board2 = player2.gameBoard;

board1.placeShip(ship1, 0, 0, true);
board2.randomPlaceship();


function gameLoop() {
	if (board1.isGameOver() || board2.isGameOver()) {
		console.log('Game Over');
		readline.close();
		return;
	}

	if (isPlayer1Turn) {
		readline.question(`Player 1's Turn (Enter X Position): `, (x1) => {
			readline.question(`Player 1's Turn (Enter Y Position): `, (y1) => {
			  const result = player1.attack(parseInt(x1), parseInt(y1), board2);
			  console.log(result);
			//   gameLoop();
			  isPlayer1Turn = false;
			  gameLoop();
			});
		  });
	} else {
		player2.randomAttack(board1);
		// console.log(move);
		isPlayer1Turn = true;
		gameLoop();
	}
}

let isPlayer1Turn = true;
gameLoop();

// while(!board1.isGameOver() && !board2.isGameOver()) {
//   let x1 = readline.question('Enter X Position: ');
//   let y1 = readline.question('Enter Y Position: ');
//   player1.attack(x1, y1, board2);
// //   player2.randomAttack(player1.gameBoard);
// }

module.exports = { Ship, Gameboard, Player };