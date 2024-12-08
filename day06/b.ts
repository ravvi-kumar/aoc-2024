const input = Deno.readTextFileSync("./input.txt").split("\n");
console.log(input);

const board = input.map((line) => line.split(""));
console.log(board);

let position = [0, 0];
let starting = [0, 0];

// find starting point
input.forEach((line, idx) => {
  if (line.includes("^")) {
    const point = line.indexOf("^");
    position = [idx, point];
    starting = [idx, point];
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
  return [-1, 0]; // LEFT
}

function checkLoop(startY: number, startX: number): boolean {
  if (startY === starting[0] && startX === starting[1]) return false;

  const visited = new Set<string>();
  let pos = [...starting];
  let dir = "UP";

  while (true) {
    const [moveX, moveY] = getMovement(dir);
    const nextY = pos[0] + moveY;
    const nextX = pos[1] + moveX;

    if (
      nextY < 0 ||
      nextX < 0 ||
      nextY >= board.length ||
      nextX >= board[0].length
    ) {
      return false;
    }

    if (board[nextY][nextX] === "#" || (nextY === startY && nextX === startX)) {
      const state = `${pos[0]},${pos[1]},${dir}`;
      if (visited.has(state)) {
        return true;
      }
      visited.add(state);
      dir = getNextDirection(dir);
    } else {
      pos = [nextY, nextX];
    }
  }
}

let loopCount = 0;

// Test each position on the board
for (let i = 0; i < board.length; i++) {
  for (let j = 0; j < board[i].length; j++) {
    if (board[i][j] === "#") continue;
    if (checkLoop(i, j)) {
      loopCount++;
    }
  }
}

console.log(loopCount, "TOTAL");
