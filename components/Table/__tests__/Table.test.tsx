import React from "react";
import renderer from "react-test-renderer";

import Table from "../Table";

describe("Table", () => {
  it("renders Table unchanged", () => {
    const tree = renderer
      .create(
        <Table
          timesheet_log={[{ user_edited: false, hours: 0, weekend: false }]}
          total_hours={48}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
