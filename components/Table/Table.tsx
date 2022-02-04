import React from "react";

import { Timesheet } from "../../types/Timesheet.types";
import TableContainer from "../TableContainer/TableContainer";

type TableProps = Pick<Timesheet, "total_hours" | "timesheet" | "namespace">;

const Table: React.FC<TableProps> = ({ namespace, timesheet, total_hours }) => {
  return (
    <div className="mt-2">
      <div className="flex flex-col">
        <TableContainer timesheet={timesheet} />
        <p className="font-semibold text-md text-slate-500 mt-6 self-end">
          {namespace} total:{" "}
          <span className="text-green-100 font-bold">{total_hours} hours</span>
        </p>
      </div>
    </div>
  );
};

export default Table;
