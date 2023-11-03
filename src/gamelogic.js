const Ship = require('./ship');
const Player = require('./player');

const readline = require('readline').createInterface({
	input: process.stdin,
	output: process.stdout
  });

const player1 = new Player('Player 1');
const player2 = new Player('Player 2');
const board1 = player1.gameBoard;
const board2 = player2.gameBoard;

let ship1 = new Ship(5, 'Player1');
		
board1.placeShip(ship1, 0, 0, true);
board2.randomPlaceship();

let isPlayer1Turn = true;

const gameLoop = () => {
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

module.exports = gameLoop;