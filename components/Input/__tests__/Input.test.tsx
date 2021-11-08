import React from "react";
import renderer from "react-test-renderer";

import Input from "../Input";

describe("Input", () => {
  it("renders input unchanged", () => {
    const tree = renderer.create(<Input />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
