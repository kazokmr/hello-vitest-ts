import {
  beforeEach,
  describe,
  expect,
  Mock,
  SpyInstance,
  test,
  vi,
} from "vitest";

describe("#reset mocks with vi.fn", () => {
  const targetDate = "2020-12-25";
  const mockDate = new Date("2019-12-25");
  let spyDate: SpyInstance<never, string | Date>;
  let mockFn: Mock<string[], Date>;

  beforeEach(() => {
    // spyOnを使ってglobalオブジェクト(JavaScriptの標準組み込みオブジェクト)のDate関数をMock化する
    spyDate = vi.spyOn(global, "Date").mockImplementation(() => mockDate);
    // Mock関数の実装方法によって、mockRestoreの仕様が変わる
    mockFn = vi.fn().mockImplementation(() => mockDate);
    // mockFn = vi.fn(() => mockDate);
  });

  test("vi.clearAllMocks", () => {
    expect(new Date(targetDate)).toEqual(mockDate);
    expect(spyDate.mock.calls).toHaveLength(1);
    expect(spyDate.mock.calls[0]).toEqual(["2020-12-25"]);
    expect(spyDate.mock.results).toEqual([{ type: "return", value: mockDate }]);

    expect(mockFn(targetDate)).toEqual(mockDate);
    expect(mockFn.mock.calls).toHaveLength(1);
    expect(mockFn.mock.calls[0]).toEqual(["2020-12-25"]);
    expect(mockFn.mock.results).toEqual([{ type: "return", value: mockDate }]);

    vi.clearAllMocks();

    // ClearするとMockの実行情報(mockプロパティ)がリセットされる
    expect(spyDate.mock.calls).toHaveLength(0);
    expect(spyDate.mock.calls).toEqual([]);
    expect(spyDate.mock.results).toEqual([]);

    expect(mockFn.mock.calls).toHaveLength(0);
    expect(mockFn.mock.calls).toEqual([]);
    expect(mockFn.mock.results).toEqual([]);

    // Mock化したDate関数は維持される
    expect(new Date(targetDate)).toEqual(mockDate);
    expect(mockFn(targetDate)).toEqual(mockDate);
  });

  test("vi.resetAllMocks", () => {
    expect(new Date(targetDate)).toEqual(mockDate);
    expect(spyDate.mock.calls).toHaveLength(1);
    expect(spyDate.mock.calls[0]).toEqual(["2020-12-25"]);
    expect(spyDate.mock.results).toEqual([{ type: "return", value: mockDate }]);

    expect(mockFn(targetDate)).toEqual(mockDate);
    expect(mockFn.mock.calls).toHaveLength(1);
    expect(mockFn.mock.calls[0]).toEqual(["2020-12-25"]);
    expect(mockFn.mock.results).toEqual([{ type: "return", value: mockDate }]);

    vi.resetAllMocks();

    // mockプロパティは clearと同じくリセットされる
    expect(mockFn.mock.calls).toHaveLength(0);
    expect(mockFn.mock.calls).toEqual([]);
    expect(mockFn.mock.results).toEqual([]);

    expect(mockFn.mock.calls).toHaveLength(0);
    expect(mockFn.mock.calls).toEqual([]);
    expect(mockFn.mock.results).toEqual([]);

    // Mock化されたDate関数の実装もクリアされる
    expect(new Date(targetDate)).toEqual({}); // vi.spyOn() は 空のオブジェクト"{}"を返す
    expect(mockFn(targetDate)).toEqual(undefined); // vi.fn() は 実装自体が未定義となる
  });

  test("vi.restoreAllMocks", () => {
    expect(new Date(targetDate)).toEqual(mockDate);
    expect(spyDate.mock.calls).toHaveLength(1);
    expect(spyDate.mock.calls[0]).toEqual(["2020-12-25"]);
    expect(spyDate.mock.results).toEqual([{ type: "return", value: mockDate }]);

    expect(mockFn(targetDate)).toEqual(mockDate);
    expect(mockFn.mock.calls).toHaveLength(1);
    expect(mockFn.mock.calls[0]).toEqual(["2020-12-25"]);
    expect(mockFn.mock.results).toEqual([{ type: "return", value: mockDate }]);

    vi.restoreAllMocks();

    // mockプロパティは clearと同じくリセットされる
    expect(spyDate.mock.calls).toHaveLength(0);
    expect(spyDate.mock.calls).toEqual([]);
    expect(spyDate.mock.results).toEqual([]);

    expect(mockFn.mock.calls).toHaveLength(0);
    expect(mockFn.mock.calls).toEqual([]);
    expect(mockFn.mock.results).toEqual([]);

    // vi.spyOn()で定義したMock関数は開放され通常のDate関数に戻る
    expect(new Date(targetDate)).not.toEqual(targetDate);
    expect(new Date(targetDate)).toEqual(new Date(targetDate));

    // vi.fn()で定義したMock関数
    expect(mockFn(targetDate)).toEqual(undefined); // vi.fun().mockImplementation(impl) で定義すると resetと同じ挙動
    // expect(mockFn(targetDate)).toEqual(mockDate);    // vi.fun(impl)でモック関数を定義していると実装内容で再処理する
  });
});
