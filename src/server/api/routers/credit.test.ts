const { get } = vi.hoisted(() => ({ get: vi.fn() }));

vi.mock("@/server/redis", () => ({ redis: { get } }));
vi.mock("@/server/db", () => ({ db: {} }));

import { getCredits, getUserCredits } from "./credit";

describe("credit keys", () => {
  beforeEach(() => {
    get.mockReset();
    get.mockResolvedValue(3);
  });

  it("keys anonymous credits by the first forwarded IP", async () => {
    const headers = new Headers({ "x-forwarded-for": "203.0.113.7, 10.0.0.1" });

    expect(await getCredits(undefined, headers)).toEqual({
      key: "anonymous_credits:203.0.113.7",
      credits: 3,
    });
    expect(get).toHaveBeenCalledWith("anonymous_credits:203.0.113.7");
  });

  it("falls back to x-real-ip, then to localhost", async () => {
    const realIp = new Headers({ "x-real-ip": "198.51.100.4" });

    expect((await getCredits(undefined, realIp)).key).toBe(
      "anonymous_credits:198.51.100.4",
    );
    expect((await getCredits(undefined, new Headers())).key).toBe(
      "anonymous_credits:127.0.0.1",
    );
  });

  it("keys signed-in credits by user id", async () => {
    expect(await getUserCredits("user_123")).toEqual({
      key: "user_credits:user_123",
      credits: 3,
    });
  });
});
