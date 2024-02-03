# flood-fill #

A simple 2D [flood fill](http://en.wikipedia.org/wiki/Flood_fill) with no stupid dependencies!

You could use this to re-implement Microsoft Paint's bucket fill in
JavaScript, or in procedural dungeon generation to identify disconnected rooms.

[![flood fill](https://raw.github.com/hughsk/flood-fill/master/example.gif)](http://en.wikipedia.org/wiki/File:Recursive_Flood_Fill_4_%28aka%29.gif)

## Usage ##

``` typescript
import { getGrid } from './mod.ts';

const size = { width: 50, height: 50 };
const grid = getGrid(size);

for (let x = 0; x < 50; x++) {
    grid.set({ x, y: 10 }, 1);
    grid.set({ x, y: 21 }, 1);
}
for (let y = 0; y < 50; y++) {
    grid.set({ x: 10, y }, 1);
    grid.set({ x: 22, y }, 1);
}

grid.fillPoint({ x: 30, y: 19 }, 2);

for (let y = 0; y < size.height; y++) {
    for (let x = 0; x < size.width; x++) {
        const text = new TextEncoder().encode(grid.get({ x, y }) ? "#" : " ");
        Deno.writeAllSync(Deno.stdout, text);
    }
    console.log();
}

```
