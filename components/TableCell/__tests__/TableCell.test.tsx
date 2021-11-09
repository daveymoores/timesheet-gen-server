import React from "react";
import renderer from "react-test-renderer";

import TableCell from "../TableCell";

describe("TableCell", () => {
  it("renders TableCell unchanged", () => {
    const tree = renderer.create(<TableCell />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
