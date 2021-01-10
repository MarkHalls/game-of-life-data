import { Cell } from "./index";
import { countNeighbors, calcLivingCells } from "./utils";

it(`returns a dict of neighbor counts`, () => {
  const neighbors = countNeighbors([
    [0, 0],
    [0, 1],
    [0, 2],
  ]);

  expect(neighbors).toEqual({
    "-1,-1": 1,
    "-1,0": 2,
    "-1,1": 3,
    "0,-1": 1,
    "0,1": 2,
    "1,-1": 1,
    "1,0": 2,
    "1,1": 3,
    "-1,2": 2,
    "0,0": 1,
    "0,2": 1,
    "1,2": 2,
    "-1,3": 1,
    "0,3": 1,
    "1,3": 1,
  });
});

it(`returns a list of strings of living cells`, () => {
  const originalLivingCells: Cell[] = [
    [0, 0],
    [0, 1],
    [0, 2],
  ];

  const neighborCount = countNeighbors(originalLivingCells);
  const livingCells = calcLivingCells(originalLivingCells, neighborCount);

  expect(livingCells).toEqual(["-1,1", "0,1", "1,1"]);
});
