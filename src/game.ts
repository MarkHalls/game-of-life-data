import seedrandom from "seedrandom";

import { countNeighbors, calcLivingCells } from "./utils";

export type Cell = [number, number];

export type GameGen = Bounds & Density;

export type Density = {
  density?: number;
};

export type Bounds = {
  xMax: number;
  xMin: number;
  yMax: number;
  yMin: number;
};

const next = (livingCells: readonly Cell[]): Cell[] => {
  const neighborCount = countNeighbors(livingCells);
  const living = calcLivingCells(livingCells, neighborCount);

  return living.map((cell) => {
    const [x, y] = cell.split(",");
    return [parseInt(x), parseInt(y)];
  });
};

const boundedNext = (bounds: Bounds, livingCells: readonly Cell[]): Cell[] => {
  const living = next(livingCells);

  return living.filter((cell) => {
    const [x, y] = cell;

    const { xMin, xMax, yMin, yMax } = bounds;

    if (x >= xMin && x <= xMax && y >= yMin && y <= yMax) {
      return true;
    } else {
      return false;
    }
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
  const random = Math.random().toString();

  return createSeeded(game, random);
};

const createSeeded = (game: GameGen, seed: string): Cell[] => {
  const rng = seedrandom.alea(seed);

  if (!game.density) {
    game.density = 0;
  }

  return naiveRandomCoords(game, rng);
};

//generates all possible coords, shuffles and returns a truncated list based on density requested.
const naiveRandomCoords = (game: GameGen, random: seedrandom.prng): Cell[] => {
  const { xMax, xMin, yMax, yMin, density = 0 } = game;

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

export {
  create,
  createSeeded,
  next,
  generateRandomPoint,
  naiveRandomCoords,
  boundedNext,
};
