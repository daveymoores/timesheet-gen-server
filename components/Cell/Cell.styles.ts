import css from "styled-jsx/css";

export default css`
  .timesheet__cell {
    margin-top: calc(-1 * var(--lineWidth));
    padding: 0.82em 1.2em;
    font-size: 16px;
    text-align: center;
  }

  .timesheet__cell:first-child {
    margin-top: 0;
  }

  .timesheet__cell p {
    padding: 0;
    margin: 0;
  }

  .timesheet__cell--title {
    font-weight: 600;
  }

  @media (prefers-color-scheme: dark) {
    .timesheet__cell {
      border: var(--lineWidth) solid var(--lightGreen);
    }

    .timesheet__cell--title {
      background-color: var(--mistyGrey);
    }
  }

  @media (prefers-color-scheme: light) {
    .timesheet__cell {
      border: var(--lineWidth) solid var(--darkGrey);
    }

    .timesheet__cell--title {
      background-color: var(--mistyGreen);
    }
  }
`;
