import React from "react";

import { ParsedTimesheetDayLog, TimesheetProps } from "../../pages/[timesheet]";
import TableCell from "../TableCell/TableCell";

type TableRow = Pick<TimesheetProps<ParsedTimesheetDayLog>, "timesheet_log">;

const TableContainer: React.FC<TableRow> = ({ timesheet_log }) => {
  return (
    <>
      <div className="timesheet__table--container">
        <div className="timesheet__table--scrollable-wrapper">
          <div className="timesheet__table--row">
            {timesheet_log.map((day_value, index: number) => (
              <TableCell day_index={index + 1} day key={index} />
            ))}
          </div>
          <div className="timesheet__table--row">
            {timesheet_log.map((day: ParsedTimesheetDayLog, index: number) => (
              <TableCell {...day} key={index} />
            ))}
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .timesheet__table--scrollable-wrapper {
            overflow-x: scroll;
          }

          .timesheet__table--row {
            display: grid;
            grid-template-columns: repeat(
              ${timesheet_log.length},
              var(--cellHeight)
            );
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
        `}
      </style>
    </>
  );
};

export default TableContainer;
