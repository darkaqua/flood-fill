# flood-fill #

A simple 2D [flood fill](http://en.wikipedia.org/wiki/Flood_fill) with no stupid dependencies!

You could use this to re-implement Microsoft Paint's bucket fill in
JavaScript, or in procedural dungeon generation to identify disconnected rooms.

[![flood fill](https://raw.github.com/hughsk/flood-fill/master/example.gif)](http://en.wikipedia.org/wiki/File:Recursive_Flood_Fill_4_%28aka%29.gif)

## Usage ##

``` typescript
import { getGrid } from './mod.ts';

const grid = createGrid(50, 50);

for (let x = 0; x < 50; x++) {
    grid.set(x, 10, 1);
    grid.set(x, 21, 1);
}
for (let y = 0; y < 50; y++) {
    grid.set(10, y, 1);
    grid.set(22, y, 1);
}

const result = grid.floodFill(30, 19);

let output = "";

for (let y = 0; y < grid.height; y++) {
    for (let x = 0; x < grid.width; x++) {
        const cell = grid.cells[y * grid.width + x];
        const filledCell = result.filledGrid.cells[y * grid.width + x];
        
        output += cell !== 0 ? "#" : filledCell !== 0 ? "@" : " ";
    }
    
    if (y < grid.height - 1) {
        output += "\n";
    }
}

console.log(output);

```
