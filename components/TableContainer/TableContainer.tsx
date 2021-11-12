import React from "react";

import { ParsedTimesheetDayLog, TimesheetProps } from "../../pages/[timesheet]";
import TableCell from "../TableCell/TableCell";
import styles from "./TableContainer.styles";

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
          .timesheet__table--row {
            grid-template-columns: repeat(
              ${timesheet_log.length},
              var(--cellHeight)
            );
          }
        `}
      </style>
      <style jsx>{styles}</style>
    </>
  );
};

export default TableContainer;
