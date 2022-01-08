import React from "react";
import renderer from "react-test-renderer";

import TableContainer from "../TableContainer";

describe("TableContainer", () => {
  it("renders TableContainer unchanged", () => {
    const tree = renderer
      .create(
        <TableContainer
          timesheet={[{ user_edited: false, hours: 0, weekend: false }]}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
