import css from "styled-jsx/css";

export default css`
  header {
    display: flex;
    justify-content: space-between;
    align-items: stretch;
  }

  button {
    width: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    border: none;
  }

  @media (prefers-color-scheme: dark) {
    button {
      border-left: var(--lineWidth) solid var(--lightGreen);
    }
  }

  @media (prefers-color-scheme: light) {
    button {
      border-left: var(--lineWidth) solid var(--darkGreen);
    }
  }

  h3 {
    text-align: left;
    font-size: 16px;
    font-weight: 500;
    padding: 1em;
    margin: 0;
  }

  code {
    display: block;
    padding: 2em;
    text-align: center;
  }

  @media (prefers-color-scheme: dark) {
    code {
      border-top: var(--lineWidth) solid var(--lightGreen);
      background-color: var(--mistyGrey);
    }
  }

  @media (prefers-color-scheme: light) {
    code {
      border-top: var(--lineWidth) solid var(--darkGreen);
      background-color: var(--mistyGrey);
    }
  }

  section {
    margin-bottom: 50px;
  }

  @media (prefers-color-scheme: dark) {
    section {
      border: var(--lineWidth) solid var(--lightGreen);
    }
  }

  @media (prefers-color-scheme: light) {
    section {
      border: var(--lineWidth) solid var(--darkGreen);
    }
  }
`;
