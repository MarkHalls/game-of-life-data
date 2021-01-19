# Game of Life Data

### A simple library of functions for generating and consuming game of life data.

# Getting Started

Generate a random set of game of life xy coordinates.

```js
import { create, next } from "@mark-halls/game-of-life-data";

// specify the dimensions of our starting data and how many points we want
const gameSettings = {
  xMin: 0,
  xMax: 100,
  yMin: 0,
  yMax: 100,
  density: 0.3, //a number between 0 and 1, 0.3 is 30% coverage
};

const coords = create(gameSettings);
```

Get the next set of cell coordinates using game of life rules

```js
const newCoords = next(coords);
```

# Seeding a game

You can also create a seeded game for reproducible grids

```js
import { createSeeded, next } from "@mark-halls/game-of-life-data";

// specify the dimensions of our starting data and how many points we want
const gameSettings = {
  xMin: 0,
  xMax: 100,
  yMin: 0,
  yMax: 100,
  density: 0.3, //a number between 0 and 1, 0.3 is 30% coverage
};

const seed = "Any String";

const coords = createSeeded(gameSettings, seed);
```
