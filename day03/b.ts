const input = Deno.readTextFileSync("./input.txt").split("\n").join("");
console.log(input);

function safeCheck(line: string) {
  const matches = line.match(/mul\((\d+),(\d+)\)|do\(\)|don't\(\)/g);
  console.dir(matches);
  const filteredMatches: string[] = [];
  let continueLoop = true;
  for (const match of matches || []) {
    if (match === "don't()") {
      continueLoop = false;
    } else if (match === "do()") {
      continueLoop = true;
    }
    if (continueLoop && match !== "do()") {
      filteredMatches.push(match);
    }
  }
  console.dir(filteredMatches);

  const nums = filteredMatches?.map((match) => {
    const [first, second] = match
      .replace("mul(", "")
      .replace(")", "")
      .split(",");
    console.log("first", first, "second", second);

    const mul = parseInt(first) * parseInt(second);
    return mul;
  });
  console.log("nums", nums);
  return nums;
}

const nums = safeCheck(input);
const sum = nums?.reduce((acc, cur) => acc + cur, 0);
console.log("sum", sum);
