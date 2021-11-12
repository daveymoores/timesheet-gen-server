import css from "styled-jsx/css";

export default css`
  nav {
    display: flex;
    justify-content: space-between;
    align-items: stretch;

    max-width: var(--max-content-width);
    width: 100%;
    height: var(--cellHeight);
    border: var(--lineWidth) solid var(--lightGreen);
    margin: 0 auto;
  }

  @media (prefers-color-scheme: dark) {
    nav {
      border: var(--lineWidth) solid var(--lightGreen);
    }
  }

  @media (prefers-color-scheme: light) {
    nav {
      border: var(--lineWidth) solid var(--darkGrey);
    }
  }

  nav > span {
    border-top: none;
    border-bottom: none;
    border-left: none;
    font-size: 18px;
    font-weight: 700;
    letter-spacing: 0.05em;
  }

  @media screen and (max-width: 501px) {
    nav > span {
      border-right: none;
    }
  }

  ul {
    display: flex;
    justify-content: center;
    align-items: stretch;

    list-style: none;

    padding: 0;
    margin: 0;
  }

  li {
    border-top: none;
    border-bottom: none;
    border-right: none;
  }
`;
