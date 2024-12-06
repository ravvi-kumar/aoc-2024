const input = Deno.readTextFileSync("./input.txt").split("\n");
// console.log(input);

const founds: number[][] = [];

function checkXMAS(str: string) {
  if (str === "XMAS" || str === "SAMX") {
    return true;
  }
  return false;
}

function checkPossibilities({
  indexX,
  indexY,
  arr,
}: {
  indexX: number;
  indexY: number;
  arr: string[][];
}) {
  const poss1 = posibilityOne({ arr: arr, indexX, indexY });
  const poss2 = posibilityTwo({ arr: arr, indexX, indexY });
  const poss3 = posibilityThree({ arr: arr, indexX, indexY });
  const poss4 = posibilityFour({ arr: arr, indexX, indexY });

  if (poss1) {
    founds.push([indexY, indexX]);
  }
  if (poss2) {
    founds.push([indexY, indexX]);
  }
  if (poss3) {
    founds.push([indexY, indexX]);
  }
  if (poss4) {
    founds.push([indexY, indexX]);
  }
}

function posibilityOne({
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
    const two = arr[indexY][indexX + 1];
    const three = arr[indexY][indexX + 2];
    const four = arr[indexY][indexX + 3];

    const str = one + two + three + four;
    return checkXMAS(str);
  } catch (_) {
    return false;
  }
}

function posibilityTwo({
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
    const two = arr[indexY + 1][indexX];
    const three = arr[indexY + 2][indexX];
    const four = arr[indexY + 3][indexX];

    const str = one + two + three + four;
    return checkXMAS(str);
  } catch (_) {
    return false;
  }
}

function posibilityThree({
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
    const four = arr[indexY + 3][indexX + 3];

    const str = one + two + three + four;
    return checkXMAS(str);
  } catch (_) {
    return false;
  }
}

function posibilityFour({
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
    const two = arr[indexY + 1][indexX - 1];
    const three = arr[indexY + 2][indexX - 2];
    const four = arr[indexY + 3][indexX - 3];

    const str = one + two + three + four;
    return checkXMAS(str);
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
