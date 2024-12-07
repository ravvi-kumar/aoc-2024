const input = Deno.readTextFileSync("./input.txt").split("\n");
console.log(input);

const breakIndex = input.findIndex((line) => line === "");
const pages = input.slice(0, breakIndex);
const orderings = input.slice(breakIndex + 1);

console.log(pages, "pages");
console.log(orderings, "orderings");

let total = 0;

orderings.forEach((ordering) => {
  const inValids = getInValids(ordering);
  if (inValids) {
    console.log("invalids", inValids);
    const middle = validate(inValids.join(","));
    if (middle) {
      console.log(middle);
      total += middle;
    }
  }
});
console.log(total, "total");

function getInValids(ordering: string) {
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
    return order;
  }
  return false;
}

function validate(ordering: string) {
  let order = ordering.split(",").map((item) => parseInt(item));
  const newOrder = [...order];
  let isValid = true;

  for (const [index, item] of order.entries()) {
    if (index === order.length - 1) {
      if (!isValid) {
        return validate(newOrder.join(","));
      }
      break;
    }
    const next = order[index + 1];
    // console.log(item, next, "item, next");
    const found1 = pages
      .filter((page) => page.startsWith(`${item}|`))
      .map((ord) => ord.split("|")[1]);

    const itemIndex = found1.indexOf(`${next}`);
    if (itemIndex === -1) {
      isValid = false;
      //   console.log("invalid", order);
      const found2 = pages.filter((page) => page.startsWith(`${next}|${item}`));

      if (found2.length > 0) {
        swap(newOrder, index, index + 1);
        order = [...newOrder];
      }
      console.log(newOrder, "newOrder");
    }
  }

  return getMiddle(newOrder);
}

function getMiddle(arr: number[]) {
  //   console.log(arr, "arr");
  const middle = Math.floor(arr.length / 2);
  return arr[middle];
}

function swap(arr: number[], index1: number, index2: number) {
  const temp = arr[index1];
  arr[index1] = arr[index2];
  arr[index2] = temp;
}
