const lines = Deno.readTextFileSync("./input.txt").split("\n");
console.log(lines);

const nums = lines.map((l) => l.split(" ").filter((l) => l !== ""));
console.log(nums);
const left = nums.map((l) => parseInt(l[0]));
const right = nums.map((l) => parseInt(l[1]));
console.log(left);
console.log(right);

const similarNums = left.map((num) => {
  const numCount = right.filter((r) => r === num).length;
  return num * numCount;
});

console.log(similarNums);

const total = similarNums.reduce((acc, curr) => acc + curr, 0);
console.log(total);
