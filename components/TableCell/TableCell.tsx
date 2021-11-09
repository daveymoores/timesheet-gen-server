import React from "react";

import { ParsedTimesheetDayLog } from "../../pages/[timesheet]";

interface TableCellProps
  extends Partial<Pick<ParsedTimesheetDayLog, "weekend" | "hour">> {
  day?: boolean;
  day_index?: number;
}

const TableCell: React.FC<TableCellProps> = ({
  hour,
  weekend,
  day,
  day_index,
}) => {
  return (
    <>
      {day ? (
        <div className="timesheet__table--cell">{day_index}</div>
      ) : (
        <div
          className={`timesheet__table--cell ${
            weekend && "timesheet__table--cell-weekend"
          }`}
        >
          {hour}
        </div>
      )}
      <style jsx>{`
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
      `}</style>
    </>
  );
};

export default TableCell;
