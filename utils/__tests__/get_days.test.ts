import getDays from "../get_days";

describe("getDays", () => {
  it("gets days in the month", () => {
    expect(getDays("April, 2021")).toEqual(30);
    expect(getDays("December, 2022")).toEqual(31);
    expect(getDays("February, 2023")).toEqual(28);
    // Leap year
    expect(getDays("February, 2024")).toEqual(29);
  });
});
