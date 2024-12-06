const input = Deno.readTextFileSync("./input.txt").split("\n");
// console.log(input);

const founds: number[][] = [];

function checkXMAS(str: string) {
  if (str === "MAS" || str === "SAM") {
    return true;
  }
  return false;
}

function checkPossibilities({
  arr,
  indexX,
  indexY,
}: {
  indexX: number;
  indexY: number;
  arr: string[][];
}) {
  try {
    const one = arr[indexY][indexX];
    const two = arr[indexY + 1][indexX + 1];
    const three = arr[indexY + 2][indexX + 2];

    const str = one + two + three;
    const pos1 = checkXMAS(str);

    const one0 = arr[indexY][indexX + 2];
    const two0 = arr[indexY + 1][indexX + 1];
    const three0 = arr[indexY + 2][indexX];

    const str0 = one0 + two0 + three0;
    const pos2 = checkXMAS(str0);

    if (pos1 && pos2) {
      founds.push([indexY, indexX]);
    }
  } catch (_) {
    return false;
  }
}

const words = input.map((line) => line.split(""));

for (const indexY in words) {
  for (const indexX in words[indexY]) {
    checkPossibilities({
      indexX: Number(indexX),
      indexY: Number(indexY),
      arr: words,
    });
  }
}

console.log("founds", founds.length);
