const input = Deno.readTextFileSync("./input.txt").split("\n");
console.log(input);

const board = input.map((line) => line.split(""));
console.log(board);

let position = [0, 0];

input.forEach((line, idx) => {
  if (line.includes("^")) {
    const point = line.indexOf("^");
    position = [idx, point];
  }
});

console.log(position, "STARTING POINT", board[position[0]][position[1]]);

function getNextDirection(currentDirection: string) {
  if (currentDirection === "UP") return "RIGHT";
  if (currentDirection === "RIGHT") return "DOWN";
  if (currentDirection === "DOWN") return "LEFT";
  return "UP";
}

function getMovement(direction: string): [number, number] {
  if (direction === "UP") return [0, -1];
  if (direction === "RIGHT") return [1, 0];
  if (direction === "DOWN") return [0, 1];
  return [-1, 0];
}

let nextPosition: number[] = position;
const moves: string[] = [`${position[0]},${position[1]}`];
let direction = "UP";

function move() {
  const [moveX, moveY] = getMovement(direction);
  const y = position[0] + moveY;
  const x = position[1] + moveX;
  nextPosition = [y, x];

  if (y < 0 || x < 0 || y >= board.length || x >= board[y].length) {
    return false
  } else if (board[y][x] === "#") {
    direction = getNextDirection(direction);
  } else {
    position = nextPosition;
    moves.push(`${y},${x}`);
  }
  return true
}

let canContinue = true;
while (canContinue) {
  canContinue = move();
}
const moveCount = new Set(moves).size;

console.log(moveCount, "MOVES");
