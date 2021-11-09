import React from "react";

interface CellProps {
  text: string;
  title?: boolean;
}

const Cell: React.FC<CellProps> = ({ text, title }) => {
  return (
    <>
      <div
        className={`timesheet__cell${title ? " timesheet__cell--title" : ""}`}
      >
        <p>{text}</p>
      </div>
      <style jsx>{`
        .timesheet__cell {
          margin-top: calc(-1 * var(--lineWidth));
          padding: 20px;
          font-size: 16px;
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
      `}</style>
    </>
  );
};

export default Cell;
