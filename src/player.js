// browser env't
import Gameboard from './gameboard.js';

// node env't
// const Gameboard = require('./gameboard');

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
	//   console.log(x, y)
	  return [x, y];
	}
	// the input gameboard should be the other players gameboard
	attack (x, y, gameboard) {
	  if (this.alreadyHit(x, y) || gameboard.isOutOfBoundary(x, y)) return false;
  
	  this.alreadyHitPositions.push([x, y]);
	  gameboard.recieveAttack(x, y);
	//   console.log(x, y);
	  return [x, y]
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

// browser env't  
export default Player

// node env't
// module.exports = Player 