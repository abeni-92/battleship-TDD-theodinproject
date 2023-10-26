import { Gameboard, Ship } from "./index";

describe('Gameboard Module', () => {
  let testBoard;
  let testShip;
  beforeEach(() => {
    testBoard = new Gameboard();
    testBoard.initialize();
    testShip = new Ship(5);
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
    expect(testBoard.isPlacementPossible(testShip, -1, 0, true)).toBe(false);
  })
  test('out of boundary 2', () => {
    expect(testBoard.isPlacementPossible(testShip, 0, -1, false)).toBe(false);
  })
  test('out of boundary 3', () => {
    expect(testBoard.isPlacementPossible(testShip, 6, 2, true)).toBe(false);
  })
  test('out of boundary 4', () => {
    expect(testBoard.isPlacementPossible(testShip, 7, 2, false)).toBe(true);
  })

  // test isPlacementPossible and placeship for Already taken fields
  test('check for taken fields 1', () => {
    expect(testBoard.isPlacementPossible(testShip, 0, 0, true)).toEqual(true);
  })
  test('check for taken field 2', () => {
    testBoard.placeShip(testShip, 0, 0, true);
    expect(testBoard.isPlacementPossible(testShip, 0, 0, true)).toBe(false);
  })
  test('check for taken field 3', () => {
    testBoard.placeShip(testShip, 0, 0, true);
    expect(testBoard.isPlacementPossible(testShip, 5, 0, true)).toBe(true);
  })
  test('check for taken field 3', () => {
    testBoard.placeShip(testShip, 0, 0, false);
    expect(testBoard.isPlacementPossible(testShip, 1, 0, true)).toBe(true);
  })
  test('placeship 1', () => {
    expect(testBoard.placeShip(testShip, 0, 0, true)).toBe(true);
  })
  test('placeship 2', () => {
    expect(testBoard.placeShip(testShip, 6, 0, true)).toBe(false);
  })
})
