import css from "styled-jsx/css";

export default css`
  button {
    height: 44px;
    padding: 0 3em;
    border: none;
    font-weight: 500;
  }

  @media (prefers-color-scheme: dark) {
    button {
      background-color: var(--lightGreen);
      color: var(--darkGrey);
    }

    .button--invert {
      background-color: var(--darkGrey);
      color: var(--lightGreen);
      border: var(--lineWidth) solid var(--lightGreen);
    }
  }

  @media (prefers-color-scheme: light) {
    button {
      background-color: var(--darkGrey);
      color: var(--lightGreen);
    }

    .button--invert {
      background-color: var(--lightGreen);
      color: var(--darkGrey);
      border: var(--lineWidth) solid var(--darkGrey);
    }
  }
`;
