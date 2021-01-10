import { Cell } from "./index";

const countNeighbors = (
  livingCells: readonly Cell[]
): Readonly<{ [cellCoords: string]: number }> => {
  const neighbors: { [cellCoords: string]: number } = {};

  for (const cell of livingCells) {
    const [x, y] = cell;

    for (let xOffset = -1; xOffset <= 1; xOffset++) {
      for (let yOffset = -1; yOffset <= 1; yOffset++) {
        if (!(xOffset === 0 && yOffset === 0)) {
          neighbors[`${x + xOffset},${y + yOffset}`] =
            `${x + xOffset},${y + yOffset}` in neighbors
              ? neighbors[`${x + xOffset},${y + yOffset}`] + 1
              : 1;
        }
      }
    }
  }

  return neighbors;
};

const calcLivingCells = (
  livingCells: readonly Cell[],
  neighborList: Readonly<{ [cellCoords: string]: number }>
): readonly string[] => {
  const cellList = [];

  const livingCellString = livingCells.map((cell) => {
    const [x, y] = cell;
    return `${x},${y}`;
  });

  for (const [cell, count] of Object.entries(neighborList)) {
    if (livingCellString.includes(cell)) {
      // Any live cell with fewer than two live neighbours dies, as if by underpopulation.
      // Any live cell with two or three live neighbours lives on to the next generation.
      // Any live cell with more than three live neighbours dies, as if by overpopulation.
      if (count === 2 || count === 3) {
        cellList.push(cell);
      }
    } else {
      // Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
      if (count === 3) {
        cellList.push(cell);
      }
    }
  }

  return cellList;
};

export { countNeighbors, calcLivingCells };
