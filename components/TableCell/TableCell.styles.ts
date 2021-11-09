import css from "styled-jsx/css";

export default css`
  .timesheet__table--cell {
    display: flex;
    align-items: center;
    justify-content: center;
    height: var(--cellHeight);
    width: var(--cellHeight);
  }

  @media (prefers-color-scheme: dark) {
    .timesheet__table--cell {
      background-color: var(--darkGrey);
    }

    .timesheet__table--cell-hour {
      background-color: var(--mistyGrey);
    }

    .timesheet__table--cell-weekend {
      background-color: var(--lightGreen);
      color: var(--darkGrey);
    }
  }

  @media (prefers-color-scheme: light) {
    .timesheet__table--cell {
      background-color: var(--lightGreen);
    }

    .timesheet__table--cell-hour {
      background-color: var(--mistyGreen);
    }

    .timesheet__table--cell-weekend {
      background-color: var(--darkGrey);
      color: var(--lightGreen);
    }
  }
`;
