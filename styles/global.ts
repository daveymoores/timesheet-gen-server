import css from "styled-jsx/css";

import palette from "../utils/palette";

export default css.global`
  :root {
    --darkGrey: ${palette.DARK_GREY};
    --mistyGrey: ${palette.MISTY_GREY};
    --lightGreen: ${palette.LIGHT_GREEN};
    --mistyGreen: ${palette.MISTY_GREEN};
    --lightPink: ${palette.LIGHT_PINK};

    --lineWidth: 3px;
    --cellHeight: 44px;
    --max-content-width: 1180px;

    --fontFamilyInter: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
      Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
      sans-serif, "Inter", sans-serif;
    --fontFamilySourceCodePro: "Source Code Pro", monospace;
  }

  html,
  body {
    height: auto;
    box-sizing: border-box;
    font-family: var(--fontFamilyInter);
    letter-spacing: 0.03em;
  }

  @media (prefers-color-scheme: dark) {
    body {
      background-color: var(--darkGrey);
      border: var(--lineWidth) solid var(--lightGreen);
      color: var(--lightGreen);
    }
  }

  @media (prefers-color-scheme: light) {
    body {
      background-color: var(--lightGreen);
      border: var(--lineWidth) solid var(--darkGrey);
      color: var(--darkGrey);
    }
  }

  a {
    text-decoration: none;
  }

  @media (prefers-color-scheme: dark) {
    a {
      color: var(--lightGreen);
    }
  }

  @media (prefers-color-scheme: light) {
    body {
      color: var(--darkGrey);
    }
  }

  .t-gen--cell {
    display: flex;
    align-items: center;
    padding-right: 1em;
    padding-left: 1em;
  }

  @media (prefers-color-scheme: dark) {
    .t-gen--cell {
      background-color: var(--darkGrey);
      border: var(--lineWidth) solid var(--lightGreen);
      color: var(--lightGreen);
    }
  }

  @media (prefers-color-scheme: light) {
    .t-gen--cell {
      background-color: var(--lightGreen);
      border: var(--lineWidth) solid var(--darkGreen);
      color: var(--darkGrey);
    }
  }
`;
