
const SIZE = 10;

class Ship {
  constructor(length, name) {
    this.name = name;
    this.length = length;
    this.hits = [];
  }

  hit (x, y) {
    if (x < 0 || y < 0 || x >= SIZE || y >= SIZE || this.hits.includes([x, y])) return false
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
    // console.log(this.ships);
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

  recieveAttack (x, y) {
    if (x < 0 || y < 0 || x >= SIZE || y >= SIZE) return false;

    if (this.board[x][y] == null) {
      this.missedShots[x][y] = true;
      return 'Missed Shot';
    } else {
      this.hitShots.push([x,y]);
      return 'Hit Shot';
    }
  }

  isGameOver (ships) {
    if (this.hitShots.length === 17) return true;

    // for (let i = 0; i < ships.length; i++) {
    //   if (ships[i].isSunk()) return true;
    // }
    for (ships of ships) {
      if (ships.isSunk()) return true
    }
   
    return false;
    
    }

  isOutOfBoundary (x, y) {
    // if (x < 0 || y < 0 || x >= SIZE || y >= SIZE) return true
    return x < 0 || y < 0 || x >= SIZE || y >= SIZE ? true : false;
    // return false
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
  }
  // the input gameboard should be the other players game board
  attack (x, y, gameboard) {
    if (this.alreadyHit(x, y) || gameboard.isOutOfBoundary(x, y)) return false;

    this.alreadyHitPositions.push([x, y]);
    gameboard.recieveAttack(x, y);
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

const player1 = new Player('Player 1');
const player2 = new Player('Player 2');
let ship1 = new Ship(3);
player1.gameBoard.placeShip(ship1, 0, 0, true);
player1.gameBoard.ships.push(ship1);
player2.gameBoard.placeShip(ship1, 0, 1, true);
player2.gameBoard.ships.push(ship1);

// while(!player1.gameBoard.isGameOver() || !player2.gameBoard.isGameOver()) {
//   let x = input('Enter X Position: ');
//   let y = input('Enter Y Position: ');
//   player1.attack(x, y, player2.gameBoard);
//   player2.randomAttack(player1.gameBoard);
// }

module.exports = { Ship, Gameboard, Player };