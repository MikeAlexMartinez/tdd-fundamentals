const isAlive = (cell, neighbours) =>
  neighbours === 3 || (cell && neighbours === 2)
    ? 1
    : 0;

const generate = (root) => new Array(root * root).fill(0);

const add = (...args) => args.reduce((a, c) => a + (c || 0), 0);

const leftColumnValues = (cells, index, width) =>
  index % width
    ? add(
      cells[index - 1],
      cells[index - width - 1],
      cells[index + width - 1],
    )
    : 0;

const rightColumnValues = (cells, index, width) =>
  (index + 1) % width
    ? add(
      cells[index + 1],
      cells[index - width + 1],
      cells[index + width + 1],
    )
    : 0;

const countNeighbours = (cells, index) => {
  const width = Math.sqrt(cells.length);
  return add(
    cells[index - width],
    cells[index + width],
    leftColumnValues(cells, index, width),
    rightColumnValues(cells, index, width)
  );
};

const regenerate = (cells) => cells.map((c, i) => isAlive(c, countNeighbours(cells, i)));

const createElement = className => {
  const element = document.createElement('div');
  element.className = className
  return element;
}

const drawGrid = (cells) => {
  const width = Math.sqrt(cells.length)
  const grid = document.getElementById('grid')
  const container = createElement('container')

  cells.forEach((cell) => {
    const cellElm = createElement(`cell ${cell === 0 ? 'dead' : 'live'}`)
    container.appendChild(cellElm)
  })

  grid.appendChild(container)
}

window.game = {
  isAlive,
  generate,
  regenerate,
  countNeighbours,
  drawGrid,
};
