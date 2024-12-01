const lines = Deno.readTextFileSync("./input.txt").split("\n");
console.log(lines);

const nums = lines.map((l) => l.split(" ").filter((l) => l !== ""));
console.log(nums);
const left = nums.map((l) => parseInt(l[0]));
const right = nums.map((l) => parseInt(l[1]));
console.log(left);
console.log(right);

const sortedLeft = left.sort((a, b) => a - b);
const sortedRight = right.sort((a, b) => a - b);

console.log(sortedLeft);
console.log(sortedRight);

const distances = sortedLeft.map((num, index) =>
  Math.abs(num - sortedRight[index])
);

console.log(distances);

const totalDistance = distances.reduce((acc, curr) => acc + curr, 0);
console.log(totalDistance);
