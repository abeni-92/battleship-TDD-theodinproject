import { Gameboard, Ship, Player } from "./index";

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


describe('Gameboard Module', () => {
  let testBoard, ships = [];
  let testShip1, testShip2, testShip3, testShip4, testShip5;
  beforeEach(() => {
    testBoard = new Gameboard();
    testShip1 = new Ship(5, 'ship1');
    testShip2 = new Ship(4, 'ship2');
    testShip3 = new Ship(3, 'ship3');
    testShip4 = new Ship(3, 'ship4');
    testShip5 = new Ship(2, 'ship5');
    ships.push(testShip1, testShip2, testShip3, testShip4, testShip5);
  })

  test('checking initialize method', () => {   
    expect(testBoard.initialize()).toEqual([
        [
          null, null, null,
          null, null, null,
          null, null, null,
          null
        ],
        [
          null, null, null,
          null, null, null,
          null, null, null,
          null
        ],
        [
          null, null, null,
          null, null, null,
          null, null, null,
          null
        ],
        [
          null, null, null,
          null, null, null,
          null, null, null,
          null
        ],
        [
          null, null, null,
          null, null, null,
          null, null, null,
          null
        ],
        [
          null, null, null,
          null, null, null,
          null, null, null,
          null
        ],
        [
          null, null, null,
          null, null, null,
          null, null, null,
          null
        ],
        [
          null, null, null,
          null, null, null,
          null, null, null,
          null
        ],
        [
          null, null, null,
          null, null, null,
          null, null, null,
          null
        ],
        [
          null, null, null,
          null, null, null,
          null, null, null,
          null
        ]
    ]);
  })

  // test isPlacementPossible for out of boundary
  test('out of boundary 1', () => {
    expect(testBoard.isPlacementPossible(testShip1, -1, 0, true)).toBe(false);
  })
  test('out of boundary 2', () => {
    expect(testBoard.isPlacementPossible(testShip1, 0, -1, false)).toBe(false);
  })
  test('out of boundary 3', () => {
    expect(testBoard.isPlacementPossible(testShip1, 6, 2, true)).toBe(false);
  })
  test('out of boundary 4', () => {
    expect(testBoard.isPlacementPossible(testShip1, 7, 2, false)).toBe(true);
  })

  // test isPlacementPossible and placeship for Already taken fields
  test('check for taken fields 1', () => {
    expect(testBoard.isPlacementPossible(testShip1, 0, 0, true)).toEqual(true);
    
  })
  test('check for taken field 2', () => {
    testBoard.placeShip(testShip1, 0, 0, true);
    testBoard.placeShip(testShip2, 0, 1, true);
    testBoard.placeShip(testShip3, 0, 2, true);
    testBoard.placeShip(testShip4, 0, 3, true);
    expect(testBoard.isPlacementPossible(testShip5, 0, 3, true)).toBe(false);
  })
  test('check for taken field 3', () => {
    testBoard.placeShip(testShip1, 0, 0, true);
    expect(testBoard.isPlacementPossible(testShip1, 5, 0, true)).toBe(true);
  })
  test('check for taken field 3', () => {
    testBoard.placeShip(testShip1, 0, 0, false);
    expect(testBoard.isPlacementPossible(testShip1, 1, 0, true)).toBe(true);
    expect(testBoard.isPlacementPossible(testShip1, 0, 1, true)).toBe(false);
  })

  // placeShip Method
  test('placeship 1', () => {
    expect(testBoard.placeShip(testShip1, 0, 0, true)).toBe(true);
  })
  test('placeship 2', () => {
    expect(testBoard.placeShip(testShip1, 6, 0, true)).toBe(false)
  })

  // recieveAttack Method
  test('out of Boundary 1', () => {
    expect(testBoard.recieveAttack(-1, 0)).toBe(false);
  })
  test('out of Boundary 1', () => {
    expect(testBoard.recieveAttack(0, -1)).toBe(false);
  })
  test('Hit shot', () => {
    testBoard.placeShip(testShip1, 0, 0, true);
    testBoard.placeShip(testShip2, 0, 1, true);
    testBoard.placeShip(testShip3, 0, 2, true);
    testBoard.placeShip(testShip4, 0, 3, true);
    testBoard.placeShip(testShip5, 0, 4, true);
    expect(testBoard.recieveAttack(0, 0)).toBe('Hit Shot');
    expect(testBoard.recieveAttack(1, 0)).toBe('Hit Shot');
    expect(testBoard.recieveAttack(1, 1)).toBe('Hit Shot');
    expect(testBoard.recieveAttack(4, 6)).toBe('Missed Shot');
  })
  test('missed shot', () => {
    testBoard.placeShip(testShip1, 0, 0, true);
    expect(testBoard.recieveAttack(9, 9)).toBe('Missed Shot');
  })

  // gameOver Method
  test('checking if the game is over by making hitshots 17', () => {
    testBoard.hitShots.length = 17;
    expect(testBoard.isGameOver()).toBe(true);
  })
  test('check gameover  1', () => {
    expect(testBoard.isGameOver(ships)).toBe(false);
  })
  test('check gameover 2', () => {
    testBoard.placeShip(testShip1, 0, 0, true);
    testBoard.placeShip(testShip2, 0, 1, true);
    testBoard.placeShip(testShip3, 0, 2, true);
    testBoard.placeShip(testShip4, 0, 3, true);
    testBoard.placeShip(testShip5, 0, 4, true);
    testShip1.hit(0, 0)
    expect(testBoard.isGameOver(ships)).toBe(false);
  })
  test('check gameover 2', () => {
    testBoard.placeShip(testShip1, 0, 0, true);
    testBoard.placeShip(testShip2, 0, 1, true);
    testBoard.placeShip(testShip3, 0, 2, true);
    testBoard.placeShip(testShip4, 0, 3, true);
    testBoard.placeShip(testShip5, 0, 4, true);
    testShip1.hit(0, 0)
    testShip1.hit(1, 0)
    testShip1.hit(2, 0)
    testShip1.hit(3, 0)
    testShip1.hit(4, 0)
    testShip2.hit(0, 1)
    testShip2.hit(1, 1)
    testShip2.hit(2, 1)
    testShip2.hit(3, 1)
    testShip3.hit(0, 2)
    testShip3.hit(1, 2)
    testShip3.hit(2, 2)
    testShip4.hit(0, 3)
    testShip4.hit(1, 3)
    testShip4.hit(2, 3)
    testShip5.hit(0, 4)
    testShip5.hit(1, 4)
    expect(testBoard.isGameOver(ships)).toBe(true);
  })
})


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
    expect(player1.attack (0, 0, player2.gameBoard)).toBe();
  })
})