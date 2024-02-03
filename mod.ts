export type Grid = {
  width: number;
  height: number;
  cells: Uint32Array;

  floodFill: (x: number, y: number) => FloodFillResult;

  fill: (value: number) => void;
  set: (x: number, y: number, value: number) => void;
  get: (x: number, y: number) => number;
};

export type FloodFillResult = {
  filledGrid: Grid;
  cellCount: number;
  startValue: number;
  startX: number;
  startY: number;
};

export const createGrid = (width: number, height: number): Grid => {
  const cells = new Uint32Array(width * height);

  const fill = (value: number): void => {
    cells.fill(value);
  };

  const set = (x: number, y: number, value: number): void => {
    x = x | 0;
    y = y | 0;
    cells[y * width + x] = value;
  };

  const get = (x: number, y: number): number => {
    x = x | 0;
    y = y | 0;
    return cells[y * width + x];
  };

  const floodFill = (x: number, y: number): FloodFillResult => {
    x = x | 0;
    y = y | 0;

    const filledGrid = createGrid(width, height);
    const enqueued = createGrid(width, height);
    const startValue = get(x, y);
    let cellCount = 0;

    const queue = [];

    const enqueue = (x: number, y: number) => {
      // Outside the grid
      if (x < 0 || x >= width || y < 0 || y >= height) return;

      // Already in queue
      if (enqueued.get(x, y) !== 0) return;

      // Already visited
      if (filledGrid.get(x, y) !== 0) return;

      enqueued.set(x, y, 1);
      queue.push({ x, y });
    };

    enqueue(x, y);

    while (queue.length > 0) {
      const { x, y } = queue.shift();

      // Outside the grid
      if (x < 0 || x >= width || y < 0 || y >= height) continue;

      // Current value to check
      const value = get(x, y);

      // Not of the same kind
      if (value !== startValue) continue;

      // Already visited
      if (filledGrid.get(x, y) !== 0) continue;

      // Mark as visited
      filledGrid.set(x, y, 1);
      cellCount++;

      // Visit neighbors
      enqueue(x - 1, y);
      enqueue(x + 1, y);
      enqueue(x, y - 1);
      enqueue(x, y + 1);
    }

    return {
      filledGrid,
      cellCount,
      startValue,
      startX: x,
      startY: y,
    };
  };

  return {
    width,
    height,
    cells,

    fill,
    floodFill,
    set,
    get,
  };
};
