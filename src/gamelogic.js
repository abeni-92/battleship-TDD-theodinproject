// // browser env't
// import Ship from './ship.js';
// import Player from './player.js'
// // import { createInterface } from 'readline';

// // node env't
// // const Ship = require('./ship.js')
// // const Player = require('./player.js')

// // const readline = require('readline').createInterface({
// // 	input: process.stdin,
// // 	output: process.stdout
// //   });

// // browser env't
// // const readline = createInterface({
// // 	input: process.stdin,
// // 	output: process.stdout
// //   });

// const player1 = new Player('Player 1');
// const player2 = new Player('Player 2');
// const board1 = player1.gameBoard;
// const board2 = player2.gameBoard;

// let ship1 = new Ship(5, 'Player1');
		
// board1.placeShip(ship1, 0, 0, true);
// board2.randomPlaceship();

// let isPlayer1Turn = true;

// const gameLogic = () => {
// 	if (board1.isGameOver() || board2.isGameOver()) {
// 		console.log('Game Over');
// 		readline.close();
// 		return;
// 	}

// 	if (isPlayer1Turn) {
// 		readline.question(`Player 1's Turn (Enter X Position): `, (x1) => {
// 			readline.question(`Player 1's Turn (Enter Y Position): `, (y1) => {
// 				const result = player1.attack(parseInt(x1), parseInt(y1), board2);
// 				console.log(result);
				
// 				isPlayer1Turn = false;
// 				gameLogic();
// 			});
// 			});
// 	} else {
// 		player2.randomAttack(board1);
// 		// console.log(move);
// 		isPlayer1Turn = true;
// 		gameLogic();
// 	}
// }

// // browser env't
// export default gameLogic;

// // node env't
// // module.exports = gameLogic;