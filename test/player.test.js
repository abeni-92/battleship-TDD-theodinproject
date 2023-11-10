import Player from '../src/player.js';
// const Player = require('../src/player');

describe('Player Module', () => {
	let player1, player2;
	beforeEach(() => {
	  player1 = new Player('Player 1');
	  player2 = new Player('Player 2');
	})
  
	test('test for intializing Player', () => {
	  expect(new Player('Abebe').name).toBe('Abebe');
	})
	test('test for attack', () => {
	  expect(player1.attack (-1, 0, player2.gameBoard)).toBe(false);
	  expect(player1.attack (0, 0, player2.gameBoard)).toBe('Attacked');
	  expect(player1.attack (0, 0, player2.gameBoard)).toBe(false);
	})
  })