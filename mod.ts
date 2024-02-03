type SimpleVector2d = [number, number];

type Vector2d = {
  x: number;
  y: number;
};

type Size = {
  width: number;
  height: number;
};

export const getGrid = ({ width, height }: Size) => {
  const data: number[][] = [];

  for (let y = 0; y < height; y++) {
    data[y] = [];
    for (let x = 0; x < width; x++) data[y][x] = 0;
  }
  const _set = ([x, y]: SimpleVector2d, filler: number) =>
    (data[y][x] = filler);

  const _get = ([x, y]: SimpleVector2d): number => {
    return data[y] ? data[y][x] : null;
  };

  const set = ({ x, y }: Vector2d, filler: number) => _set([x, y], filler);
  const get = ({ x, y }: Vector2d): number => _get([x, y]);

  const getData = (): number[][] => data;

  const fillPoint = ({ x, y }: Vector2d, filler: number) => {
    const empty = _get([x, y]);

    const queueX = [x];
    const queueY = [y];

    let minPositionX: number = x;
    let minPositionY: number = y;
    let maxPositionX: number = x;
    let maxPositionY: number = y;

    let area = 0;

    while (queueY.length) {
      const currentX = queueX.pop();
      const currentY = queueY.pop();

      minPositionX = currentX < minPositionX ? currentX : minPositionX;
      maxPositionY = currentX > maxPositionY ? currentX : maxPositionY;

      let north: number;
      let south: number;

      if (_get([currentX, currentY]) === empty) {
        north = south = currentY;

        do {
          north--;
        } while (_get([currentX, north]) === empty && north >= 0);

        do {
          south++;
        } while (_get([currentX, south]) === empty && south < height);

        minPositionY = north + 1 < minPositionY ? north + 1 : minPositionY;
        maxPositionX = south - 1 > maxPositionX ? south - 1 : maxPositionX;

        for (let n = north + 1; n < south; n++) {
          _set([currentX, n], filler);
          area++;

          if (_get([currentX - 1, n]) === empty) {
            queueX.push(currentX - 1);
            queueY.push(n);
          }

          if (_get([currentX + 1, n]) === empty) {
            queueX.push(currentX + 1);
            queueY.push(n);
          }
        }
      }
    }
  };

  return {
    set,
    get,
    getData,
    fillPoint,
  };
};
