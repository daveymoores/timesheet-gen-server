import React, { ReactInstance } from "react";
import ReactToPrint from "react-to-print";

import Button from "../../components/Button/Button";
import Timesheet from "../../components/Timesheet/Timesheet";

const Demo = () => {
  const componentRef = React.useRef<ReactInstance>(null);

  return (
    <div className="container">
      <article className="timesheet">
        <ReactToPrint
          trigger={() => <Button text="Print" />}
          content={() => componentRef.current}
        />
        <Timesheet
          ref={componentRef}
          {...props}
          timesheet_log={timesheet_log}
        />
      </article>
      <style jsx>{`
        .timesheet {
          max-width: calc(
            ${timesheet_log.length} * var(--cellHeight) +
              ${timesheet_log.length} * var(--lineWidth)
          );
          margin: auto;
        }
      `}</style>
    </div>
  );
};
