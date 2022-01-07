import React from "react";

import { Timesheet } from "../../types/Timesheet.types";
import Cell from "../Cell/Cell";
import TableContainer from "../TableContainer/TableContainer";
import styles from "./Table.styles";

type TableProps = Pick<Timesheet, "total_hours" | "timesheet">;

const Table: React.FC<TableProps> = ({ timesheet, total_hours }) => {
  return (
    <React.Fragment>
      <div className="timesheet__table">
        <div className="timesheet__table--wrapper">
          <Cell text={`Days:`} title />
          <TableContainer timesheet_log={timesheet} />
          <Cell text={`Total hours worked: ${total_hours}`} title />
        </div>
      </div>
      <style jsx>
        {`
          .timesheet__table {
            max-width: calc(
              ${timesheet.length} * var(--cellHeight) + ${timesheet.length} *
                var(--lineWidth)
            );
            margin: auto;
          }
        `}
      </style>
      <style jsx>{styles}</style>
    </React.Fragment>
  );
};

export default Table;
