import seedrandom from "seedrandom";

import { countNeighbors, calcLivingCells } from "./utils";

export type Cell = [number, number];

export type GameGen = {
  xMax: number;
  xMin: number;
  yMax: number;
  yMin: number;
  density: number;
};

const next = (livingCells: readonly Cell[]): Cell[] => {
  const neighborCount = countNeighbors(livingCells);
  const living = calcLivingCells(livingCells, neighborCount);

  return living.map((cell) => {
    const [x, y] = cell.split(",");
    return [parseInt(x), parseInt(y)];
  });
};

const generateRandomPoint = (game: GameGen, rng: seedrandom.prng): Cell => {
  const { xMax, xMin, yMax, yMin } = game;

  const xCenter = xMax - xMin;
  const yCenter = yMax - yMin;

  const radius = xCenter;

  const randInRadius = radius * Math.sqrt(rng());

  const randCircumference = 2 * Math.PI * rng();

  const x = (randInRadius * Math.cos(randCircumference)) / Math.cos(yCenter);

  const y = randInRadius * Math.sin(randCircumference);

  const cell: Cell = [x + xCenter, y + yCenter];

  return cell;
};

const create = (game: GameGen): Cell[] => {
  return createSeeded(game, seedrandom.alea().toString());
};

const createSeeded = (game: GameGen, seed: string): Cell[] => {
  const rng = seedrandom.alea(seed);

  return naiveRandomCoords(game, rng);
};

//generates all possible coords, shuffles and returns a truncated list based on density requested.
const naiveRandomCoords = (game: GameGen, random: seedrandom.prng): Cell[] => {
  const { xMax, xMin, yMax, yMin, density } = game;

  const cellSet: Set<Cell> = new Set();

  for (let x = xMin; x < xMax; x++) {
    for (let y = yMin; y < yMax; y++) {
      cellSet.add([x, y]);
    }
  }

  const cellArr: Cell[] = [...cellSet];

  // shuffle
  for (let i = cellArr.length - 1; i > 0; i--) {
    let j = Math.floor(random() * (i + 1));

    [cellArr[i], cellArr[j]] = [cellArr[j], cellArr[i]];
  }

  return cellArr.slice(0, Math.floor(cellArr.length * density));
};

export { create, createSeeded, next, generateRandomPoint, naiveRandomCoords };
