import React from "react";

import { ParsedTimesheetDayLog, TimesheetProps } from "../../pages/[timesheet]";
import Cell from "../Cell/Cell";
import TableContainer from "../TableContainer/TableContainer";
import styles from "./Table.styles";

type TableProps = Pick<
  TimesheetProps<ParsedTimesheetDayLog>,
  "timesheet_log" | "total_hours"
>;

const Table: React.FC<TableProps> = ({ timesheet_log, total_hours }) => {
  return (
    <>
      <div className="timesheet__table">
        <div className="timesheet__table--wrapper">
          <Cell text={`Days:`} title />
          <TableContainer timesheet_log={timesheet_log} />
          <Cell text={`Total hours worked: ${total_hours}`} title />
        </div>
      </div>
      <style jsx>
        {`
          .timesheet__table {
            max-width: calc(
              ${timesheet_log.length} * var(--cellHeight) +
                ${timesheet_log.length} * var(--lineWidth)
            );
            margin: auto;
          }
        `}
      </style>
      <style jsx>{styles}</style>
    </>
  );
};

export default Table;
