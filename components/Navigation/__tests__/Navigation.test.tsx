import { render, screen } from "@testing-library/react";
import React from "react";
import renderer from "react-test-renderer";

import Navigation from "../Navigation";

describe("Navigation", () => {
  it("renders a title", () => {
    render(<Navigation />);

    const nav = screen.getByRole("navigation");

    expect(nav).toBeInTheDocument();
  });

  it("renders navigation unchanged", () => {
    const tree = renderer.create(<Navigation />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
