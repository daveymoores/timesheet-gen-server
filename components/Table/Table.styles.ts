import css from "styled-jsx/css";

export default css`
  .timesheet__table .timesheet__table--wrapper {
    display: flex;
    flex-direction: column;
  }

  :global(.timesheet__table .timesheet__cell--title:nth-child(1)) {
    align-self: flex-start;
    border-bottom: none;
  }

  :global(.timesheet__table .timesheet__cell--title:last-child) {
    align-self: flex-end;
  }
`;
