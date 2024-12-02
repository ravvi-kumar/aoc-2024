const input = Deno.readTextFileSync("./input.txt").split("\n");

const lines = input.map((line) => line.split(/\s+/).map((x) => parseInt(x)));

function checkSafe(...arr: number[]) {
  let safe = false;
  const acc = arr[0] - arr[1] < 0;
  let prev = arr[0];

  for (const [i, cur] of arr.entries()) {
    if (i === 0) {
      continue;
    }
    prev = arr[i - 1];

    const diff = Math.abs(prev - cur);
    if (prev - cur > 0) {
      if (acc === true) {
        safe = false;
        break;
      }
    } else if (prev - cur < 0) {
      if (acc === false) {
        safe = false;
        break;
      }
    }

    if (diff > 3) {
      safe = false;
      break;
    } else if (diff === 0) {
      safe = false;
      break;
    } else {
      safe = true;
      //   break;
    }
  }
  return safe;
}

let count = 0;
for (const cur of lines) {
  const safe = checkSafe(...cur);
  if (safe) {
    count++;
  } else {
    for (let i = 0; i < cur.length; i++) {
      const safe = checkSafe(...cur.slice(0, i), ...cur.slice(i + 1));
      if (safe) {
        count++;
        break;
      }
    }
  }
}
console.log("count", count);
