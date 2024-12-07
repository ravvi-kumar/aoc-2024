const input = Deno.readTextFileSync("./input.txt").split("\n");
console.log(input);

const breakIndex = input.findIndex((line) => line === "");
const pages = input.slice(0, breakIndex);
const orderings = input.slice(breakIndex + 1);

console.log(pages, "pages");
console.log(orderings, "orderings");

let total = 0;

orderings.forEach((ordering) => {
  const middle = isOrderingValid(ordering);
  if (middle) {
    console.log(middle);
    total += middle;
  }
});
console.log(total, "total");

function isOrderingValid(ordering: string) {
  const order = ordering.split(",").map((item) => parseInt(item));
  let isValid = false;
  for (const [index, item] of order.entries()) {
    if (index === order.length - 1) {
      isValid = true;
      break;
    }
    const next = order[index + 1];
    // console.log(item, next, "item, next");
    const founds = pages
      .filter((page) => page.startsWith(`${item}|`))
      .map((ord) => ord.split("|")[1]);

    const itemIndex = founds.indexOf(`${next}`);
    if (itemIndex === -1) {
      isValid = false;
      break;
    }
  }
  if (!isValid) {
    return false;
  }
  return getMiddle(order);
}

function getMiddle(arr: number[]) {
  console.log(arr, "arr");
  const middle = Math.floor(arr.length / 2);
  return arr[middle];
}
