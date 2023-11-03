const Ship = require('../src/ship');
const Gameboard = require('../src/gameboard');

describe('Ship Module', () => {
	let testShip, testBoard;
	beforeEach(() => {
	  testShip = new Ship(3, 'ship1');
	  testBoard = new Gameboard();
	  testBoard.placeShip(testShip, 0, 0, true);
	})
	test('hit method 1', () => {
	  expect(testShip.hit(-1, -1)).toBe(false);
	})
	test('hit method 2', () => {
	  expect(testShip.hit(1, 1)).toBe(true);
	  expect(testShip.isSunk()).toBe(false);
	})
	test('isSunk method 1', () => {
	  expect(testShip.isSunk()).toBe(false);
	})
	test('isSunk method 2', () => {
	  testShip.hit(0,0)
	  testShip.hit(1,0)
	  testShip.hit(2,0)
	  expect(testShip.isSunk()).toBe(true);
	})
  })