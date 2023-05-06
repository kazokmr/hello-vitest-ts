import {afterEach, describe, expect, test, vi} from "vitest";

describe("Math.random with spyOn", () => {

    afterEach(() => {
        // 全てのMock関数を元の関数に戻す
        vi.restoreAllMocks();
    });

    test("Math.random return 1", () => {
        vi.spyOn(Math, "random").mockImplementation(() => 1); // Math.random関数が呼ばれたら常に 1 を返す
        expect(Math.random()).toBe(1);
    });

    test("Math.random return under 1", () => {
        // spyOn関数を利用していないので実際の Math.random()関数の結果が返る
        expect(Math.random()).toBeLessThan(1);
    });
});
