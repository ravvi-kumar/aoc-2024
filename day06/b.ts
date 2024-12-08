const input = Deno.readTextFileSync("./example2.txt").split("\n");
console.log(input);

const board = input.map((line) => line.split(""));
console.log(board);

let position = [0, 0];

// find starting point
input.forEach((line, idx) => {
  if (line.includes("^")) {
    const point = line.indexOf("^");
    position = [idx, point];
  }
});

console.log(position, "STARTING POINT", board[position[0]][position[1]]);

let direction = "UP";
let moveX = 0;
let moveY = -1;

function getNextDirection() {
  let nextDirection = direction;
  if (direction === "UP") {
    nextDirection = "RIGHT";
  } else if (direction === "RIGHT") {
    nextDirection = "DOWN";
  } else if (direction === "DOWN") {
    nextDirection = "LEFT";
  } else if (direction === "LEFT") {
    nextDirection = "UP";
  }
  return nextDirection;
}

function turn() {
  console.log("direction", direction);
  const nextDirection = getNextDirection();

  if (nextDirection === "UP") {
    moveX = 0;
    moveY = -1;
  } else if (nextDirection === "DOWN") {
    moveX = 0;
    moveY = 1;
  } else if (nextDirection === "LEFT") {
    moveX = -1;
    moveY = 0;
  } else if (nextDirection === "RIGHT") {
    moveX = 1;
    moveY = 0;
  }
  direction = nextDirection;

  console.log("turn", direction);
}

let nextPosition: number[] | undefined = position;
const moves: string[] = [`${position[0]},${position[1]}`];

function move() {
  const y = position[0] + moveY;
  const x = position[1] + moveX;
  nextPosition = [y, x];
  console.log("nextPosition", nextPosition);
  if (y < 0 || x < 0 || y >= board.length || x >= board[y].length) {
    nextPosition = undefined;
  } else if (board[y][x] === "#") {
    turn();
  } else {
    position = nextPosition;
    moves.push(`${y},${x}`);
  }
}

while (nextPosition !== undefined) {
  move();
}
const moveCount = new Set(moves).size;

console.log(moveCount, "MOVES");
