import React from "react";

import { TimesheetDayLog } from "../../types/Timesheet.types";
import TableCell from "../TableCell/TableCell";
import styles from "./TableContainer.styles";

interface TableRow {
  timesheet: TimesheetDayLog[];
}

const TableContainer: React.FC<TableRow> = ({ timesheet }) => {
  return (
    <>
      <div className="timesheet__table--container">
        <div className="timesheet__table--scrollable-wrapper">
          <div className="timesheet__table--row">
            {timesheet.map((day_value, index: number) => (
              <TableCell day_index={index + 1} day key={index} />
            ))}
          </div>
          <div className="timesheet__table--row">
            {timesheet.map((day, index: number) => (
              <TableCell {...day} key={index} />
            ))}
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .timesheet__table--row {
            grid-template-columns: repeat(
              ${timesheet.length},
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
