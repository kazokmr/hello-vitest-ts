import { expect, test } from "vitest";

const fetchData = () =>
  new Promise(resolve => setTimeout(resolve, 1000, "lemon"));

test.concurrent.skip.each(
  Array.from(new Array(100).keys()).map(n => ({
    n,
    expected: "lemon",
  })),
)(`fetchData $n`, async ({ n, expected }) => {
  console.log(n);
  await expect(fetchData()).resolves.toBe(expected);
});
