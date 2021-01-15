import { create, next, Cell } from "./game";

it(`returns a list of random points`, () => {
  const cellArr = create({ xMin: 0, xMax: 10, yMin: 0, yMax: 10, density: 1 });

  expect(cellArr.length).toBe(100);
});

it(`returns the next set of data points`, () => {
  const originalLivingCells: Cell[] = [
    [0, 0],
    [0, 1],
    [0, 2],
  ];

  const newLivingCells = next(originalLivingCells);

  expect(newLivingCells).toEqual([
    [-1, 1],
    [0, 1],
    [1, 1],
  ]);
});
