import css from "styled-jsx/css";

export default css`
  footer {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: stretch;

    max-width: var(--max-content-width);
    width: 100%;
    height: auto;
    margin: 0 auto;
  }

  @media (prefers-color-scheme: dark) {
    footer {
      border: var(--lineWidth) solid var(--lightGreen);
    }
  }

  @media (prefers-color-scheme: light) {
    footer {
      border: var(--lineWidth) solid var(--darkGrey);
    }
  }

  .bottom-bar {
    height: var(--cell-height);
    display: flex;
    justify-content: space-between;
    align-items: stretch;
  }

  @media (prefers-color-scheme: dark) {
    .bottom-bar {
      border-top: var(--lineWidth) solid var(--lightGreen);
    }
  }

  @media (prefers-color-scheme: light) {
    .bottom-bar {
      border-top: var(--lineWidth) solid var(--darkGrey);
    }
  }

  ul {
    display: flex;
    justify-content: center;
    align-items: stretch;

    list-style: none;

    padding: 0;
    margin: 0 0 0 auto;
  }

  li {
    border-top: none;
    border-bottom: none;
    border-right: none;
  }

  li:nth-child(2) {
    padding: 0.7em 0.7em 0.7em 0;
    border-left: none;
  }
`;
