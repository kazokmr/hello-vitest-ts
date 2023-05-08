import { expect, test, vi } from "vitest";
import axios from "axios";
import Users from "./users.ts";

vi.mock("axios");

test("should fetch all users", async () => {
  const users = [{ name: "Bob" }];
  const resp = { data: users };

  // axios.get関数が呼ばれたら resp の値を返す
  // (axios as Mocked<typeof axios>).get.mockResolvedValue(resp);
  vi.mocked(axios.get).mockResolvedValue(resp);

  // Users.search() 関数の戻り値が usersと一致すること
  await expect(Users.search()).resolves.toEqual(users);
});
