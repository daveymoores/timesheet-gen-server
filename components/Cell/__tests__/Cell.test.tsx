import React from "react";
import renderer from "react-test-renderer";

import Cell from "../Cell";

describe("Cell", () => {
  it("renders Cell unchanged", () => {
    const tree = renderer.create(<Cell text={"Hello"} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
