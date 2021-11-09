import React from "react";
import renderer from "react-test-renderer";

import Command, { CommandProps } from "../Command";

const props: CommandProps = {
  code: "timesheet-gen edit -h 5 -d 8 -m 10 -y 2021",
  heading: "Initialise for current directory",
};

describe("Command", () => {
  it("renders footer unchanged", () => {
    const tree = renderer.create(<Command {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
