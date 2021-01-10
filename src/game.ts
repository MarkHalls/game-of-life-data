import { countNeighbors, calcLivingCells } from "./utils";

export type Cell = [number, number];

const update = (livingCells: readonly Cell[]): Cell[] => {
  const neighborCount = countNeighbors(livingCells);
  const living = calcLivingCells(livingCells, neighborCount);

  return living.map((cell) => {
    const [x, y] = cell.split(",");
    return [parseInt(x), parseInt(y)];
  });
};

export { update };
