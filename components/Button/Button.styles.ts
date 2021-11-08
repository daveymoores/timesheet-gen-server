import css from "styled-jsx/css";

export default css`
  button {
    height: 50px;
    padding: 0 3em;
    border: none;
    font-weight: 500;
  }

  @media (prefers-color-scheme: dark) {
    button {
      background-color: var(--lightGreen);
      color: var(--darkGrey);
    }
  }

  @media (prefers-color-scheme: light) {
    button {
      background-color: var(--lightGreen);
      color: var(--lightGreen);
    }
  }
`;
