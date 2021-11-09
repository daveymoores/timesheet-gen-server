import React from "react";

import { ParsedTimesheetDayLog } from "../../pages/[timesheet]";
import styles from "./TableCell.styles";

interface TableCellProps
  extends Partial<Pick<ParsedTimesheetDayLog, "weekend" | "hours">> {
  day?: boolean;
  day_index?: number;
}

const TableCell: React.FC<TableCellProps> = ({
  hours,
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
          className={`timesheet__table--cell${
            weekend ? " timesheet__table--cell-weekend" : ""
          }`}
        >
          {hours}
        </div>
      )}
      <style jsx>{styles}</style>
    </>
  );
};

export default TableCell;
