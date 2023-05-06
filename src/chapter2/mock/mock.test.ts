import {describe, expect, test, vi} from "vitest";

describe("vi.fun()", () => {
    test("mock object specification", () => {
        // Mockオブジェクトを生成
        const mockFunction = vi.fn();
        // Mockオブジェクトを一回実行する（引数はfooとbar で 戻り値は undefined (デフォルト値))
        expect(mockFunction("foo", "bar")).toBe(undefined);
        // Mockオブジェクトは mock プロパティを持つ
        expect(mockFunction).toHaveProperty("mock");
        // mockプロパティは callsプロパティを持つ
        expect(mockFunction.mock).toHaveProperty("calls");
        // callsプロパティには要素が１つ渡されている （最初の `mockFunction("foo", "bar")` の実行時の引数を指している)
        expect(mockFunction.mock.calls).toHaveLength(1);
        // callsプロパティの１つ目の要素の引数が渡されている
        expect(mockFunction.mock.calls[0]).toEqual(["foo", "bar"]);
        // mockプロパティは resultsプロパティを持つ
        expect(mockFunction.mock).toHaveProperty("results");
        // resultsプロパティには要素が１つ渡されている （最初の `mockFunction("foo", "bar")` の実行時の結果を指している)
        expect(mockFunction.mock.results).toHaveLength(1);
        // resultsプロパティの１つ目の要素の結果の値（戻り値）は undefined である
        expect(mockFunction.mock.results[0].value).toBe(undefined);
        // Mockオブジェクトの１つ目の呼び出し結果は正常終了だった (return: 正常終了, throw: 異常終了, incomplete: 実行中)
        expect(mockFunction.mock.results[0].type).toBe("return");
    });
});

test("return `Hello`", () => {
    // Mock関数に戻り値をセット (引数なしで常に"Hello"を返す)
    const mockFunction = vi.fn(() => "Hello");
    expect(mockFunction()).toBe("Hello");
    expect(mockFunction.mock.calls).toHaveLength(1);
    expect(mockFunction.mock.calls[0]).toEqual([]);
});

test("return `Hello` once then it returns `Goodbye`", () => {
    const mockFunction = vi.fn()
        .mockImplementationOnce(() => "Hello")      // 初回の実行時は "Hello" を返す
        .mockImplementationOnce(() => "Goodbye");   // 2回目の実行時は ”Goodbye” を返す ※3回目以降は未指定なので undefined
    expect(mockFunction()).toBe("Hello");
    expect(mockFunction()).toBe("Goodbye");
    expect(mockFunction()).toBe(undefined);
    expect(mockFunction.mock.results).toHaveLength(3);
});