import React from "react";
import renderer from "react-test-renderer";

import NewsletterSubscribe from "../NewsletterSubscribe";

describe("NewsletterSubscribe", () => {
  it("renders NewsletterSubscribe unchanged", () => {
    const tree = renderer.create(<NewsletterSubscribe />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
