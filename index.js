
const SIZE = 10;

class Ship {
  constructor(length) {
    this.length = length;
    this.hits = [];
  }

  hit (position) {
    if (position < 0 || position > SIZE || this.hits.includes(position)) return false
    this.hits.push(position);
  }

  isSunk () {
    return this.hits.length === this.length;
  }
}

class Gameboard {

  constructor () {
    this.board = [];
    this.missedShots = [];
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

    if (isVertical) {
      for (let i = 0; i < ship.length; i++) {
        this.board[row + i][col] = ship
      }
    } else {
        for (let i = 0; i < ship.length; i++) {
          this.board[row][col + i] = ship
        }
    }

    return true
  }

  isPlacementPossible (ship, row, col, isVertical) {
    // check if the position is within boundary
    if (row < 0 || row > SIZE || col < 0 || col > SIZE) return false

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
  
}

module.exports = { Ship, Gameboard };