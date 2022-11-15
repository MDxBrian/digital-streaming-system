import { ratingAvg, checkUsers } from "../utils/common";

describe("Utils common functions", () => {
  test("should return value of Rating Avg.", () => {
    const res = ratingAvg([4,2,3,1]);
    expect(res).toBeCalled;
  });

  test("should checkUsers if exist.", () => {
    const res = checkUsers()
    expect(res).toBeTruthy();
  });
});