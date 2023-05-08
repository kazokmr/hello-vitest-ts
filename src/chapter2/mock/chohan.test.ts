import { describe, expect, test, vi } from "vitest";
import { chohan } from "./chohan.ts";

// seed関数をMock化する
vi.mock("./seed", () => {
  return {
    seed: vi
      .fn()
      .mockImplementationOnce(() => 2) // 1回目は 2（偶数）を出す
      .mockImplementationOnce(() => 1), // 2回目は 1 (奇数) を出す
  };
});

describe("chohan", () => {
  test("returns 丁 when seed returns an even number like 2", () => {
    expect(chohan()).toBe("丁");
  });
  test("returns 半 when seed returns an odd number like 1", () => {
    expect(chohan()).toBe("半");
  });
});
