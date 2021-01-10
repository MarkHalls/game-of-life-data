import { update, Cell } from "./index";

it(`returns a list of living cell coords`, () => {
  const originalLivingCells: Cell[] = [
    [0, 0],
    [0, 1],
    [0, 2],
  ];

  const newLivingCells = update(originalLivingCells);

  expect(newLivingCells).toEqual([
    [-1, 1],
    [0, 1],
    [1, 1],
  ]);
});
