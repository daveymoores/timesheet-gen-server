import css from "styled-jsx/css";

export default css`
  .timesheet__table--scrollable-wrapper {
    overflow-x: scroll;
  }

  .timesheet__table--row {
    display: grid;
    grid-template-rows: repeat(1, var(--cellHeight));
    grid-gap: var(--lineWidth);
  }

  .timesheet__table--row:nth-child(2) {
    margin-top: var(--lineWidth);
  }

  @media (prefers-color-scheme: dark) {
    .timesheet__table--container {
      border: var(--lineWidth) solid var(--lightGreen);
    }

    .timesheet__table--scrollable-wrapper {
      background-color: var(--lightGreen);
    }
  }

  @media (prefers-color-scheme: light) {
    .timesheet__table--container {
      border: var(--lineWidth) solid var(--darkGrey);
    }
    .timesheet__table--scrollable-wrapper {
      background-color: var(--darkGrey);
    }
  }
`;
