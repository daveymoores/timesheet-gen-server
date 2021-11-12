import React from "react";
import renderer from "react-test-renderer";

import Button from "../Button";

describe("Button", () => {
  it("renders button unchanged", () => {
    const tree = renderer.create(<Button text={"Click here"} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
