require("../game");

const { isAlive, generate, regenerate, countNeighbours, drawGrid } = window.game;

describe('game of life', () => {
  describe('isAlive algorithm', () => {
    test('dead cell with no neighbours should return 0', () => {
      expect(isAlive()).toEqual(0)
    })
    test('dead cell with 3 neightbours should return 1', () => {
      expect(isAlive(0, 3)).toEqual(1)
    })
    test('livse cell with 0 neighbours should return 0', () => {
      expect(isAlive(1, 0)).toEqual(0)
    })
    test('live cell with 2 neighbours should return 1', () => {
      expect(isAlive(1, 2)).toEqual(1)
    })
  })
  describe('generate function', () => {
    test('should create an array of x * x', () => {
      expect(generate(1)).toEqual([0])
      expect(generate(2)).toEqual([0, 0, 0, 0])
    })
  })

  describe('countNeighbours function', () => {
    test('should count 0 for array of one in length', () => {
      expect(countNeighbours([1], 0)).toEqual(0)
    })
    describe('2*2 Grid', () => {
      let grid
      beforeEach(() => {
        grid = [1, 1, 1, 0]
      })
      test('should count 2 neigbours for index 0', () => {
        expect(countNeighbours(grid, 0)).toEqual(2);
      })
      test('should count 2 neighbours for index 1', () => {
        expect(countNeighbours(grid, 1)).toEqual(2);
      })
      test('should count 2 neighbours for index 2', () => {
        expect(countNeighbours(grid, 2)).toEqual(2);
      })
      test('should count 3 neighbours for index 3', () => {
        expect(countNeighbours(grid, 3)).toEqual(3);
      })
    })
    describe('3*3 Grid', () => {
      let grid
      beforeEach(() => {
        grid = [
          1, 1, 1,
          0, 0, 0,
          0, 0, 0,
        ]
      })
      test('should count 3 neightbours for index 4', () => {
        expect(countNeighbours(grid, 4)).toEqual(3)
      })
      test('should count 0 neightbours for index 7', () => {
        expect(countNeighbours(grid, 7)).toEqual(0)
      })
      test('should count 1 neightbours for index 0', () => {
        expect(countNeighbours(grid, 0)).toEqual(1)
      })
    })
  })

  describe('regenerate function', () => {
    test('should not update dead cells', () => {
      const cells = generate(1)
      expect(regenerate(cells)).toEqual(cells)
    })
    test('should kill live cells with no neighbours', () => {
      const cells = [1] // a single live cell in 1 x 1 grid
      const expectedCells = [0] // a single dead cell in same size grid
      expect(regenerate(cells)).toEqual(expectedCells)
    })
    test('should return all live cells', () => {
      const cells = [1, 1, 1, 0]
      expect(regenerate(cells)).toEqual([1, 1, 1, 1])
    })
  })

  describe('browser grid', () => {
    test('should display 1 dead cell', () => {
      document.body.innerHTML = '<div id="grid"></div>'
      drawGrid([0])
      expect(document.querySelectorAll('.container').length).toEqual(1)
      expect(document.querySelectorAll('.cell.dead').length).toEqual(1)
    })
    test('should display 1 live cell', () => {
      document.body.innerHTML = '<div id="grid"></div>'
      drawGrid([1])
      expect(document.querySelectorAll('.container').length).toEqual(1)
      expect(document.querySelectorAll('.cell.live').length).toEqual(1)
    })
    test('should display 4 cells, 2 live, 2 dead', () => {
      document.body.innerHTML = '<div id="grid"></div>'
      drawGrid([0, 0, 1, 1])
      expect(document.querySelectorAll('.cell').length).toEqual(4)
      expect(document.querySelectorAll('.cell.live').length).toEqual(2)
      expect(document.querySelectorAll('.cell.dead').length).toEqual(2)
    })
  })
})