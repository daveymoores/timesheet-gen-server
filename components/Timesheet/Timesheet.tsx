import React, { ForwardedRef, LegacyRef, ReactInstance } from "react";

import { TimesheetProps } from "../../types/Timesheet.types";
import Cell from "../Cell/Cell";
import Qr from "../Qr/Qr";
import Table from "../Table/Table";

interface Props extends Omit<TimesheetProps, "timesheet"> {
  days: number;
}

// eslint-disable-next-line react/display-name
const Timesheet = React.forwardRef<ReactInstance, Props>(
  (
    {
      timesheets,
      client,
      user,
      month_year,
      user_sign_qr_code,
      approver_sign_qr_code,
      user_signature,
      approver_signature,
      days,
    },
    ref: ForwardedRef<ReactInstance>
  ) => {
    return (
      <div
        ref={ref as unknown as LegacyRef<HTMLDivElement> | undefined}
        className="timesheet--wrapper"
      >
        <header>
          <h1 className="timesheet--title">Timesheet: {month_year}</h1>
        </header>

        <div className="timesheet--row">
          <div className="timesheet__cell-group">
            <Cell text="Client:" title />
            <Cell text={client.client_name} />
            <Cell text={client.client_contact_person} />
            <Cell text={client.client_address} />
          </div>

          <div className="timesheet__cell-group">
            <Cell text="Contractor:" title />
            <Cell text={user.name} />
            <Cell text={user.email} />
          </div>
        </div>

        {timesheets.map((timesheet, index) => (
          <React.Fragment key={index}>
            <div className="timesheet--row">
              <div className="timesheet__cell-group">
                <Cell text={`Project: ${timesheet.namespace}`} title />
                <Cell
                  text={`Project number: ${timesheet.project_number}`}
                  title
                />
              </div>
            </div>
            <Table
              timesheet={timesheet.timesheet}
              total_hours={timesheet.total_hours}
            />
          </React.Fragment>
        ))}
        <style jsx>
          {`
            :global(.timesheet--wrapper .timesheet__table--row) {
              grid-template-columns: repeat(${days}, var(--cellHeight));
            }
          `}
        </style>
        <Qr
          user_sign_qr_code={user_sign_qr_code}
          approver_sign_qr_code={approver_sign_qr_code}
          user_signature={user_signature}
          approver_signature={approver_signature}
        />
        <style jsx>{`
          @media print {
            .timesheet--wrapper {
              --cellHeight: 21px;
              --lineWidth: 2px;

              padding: 30px;
            }

            .timesheet--wrapper .timesheet--title {
              font-size: 30px;
              margin: 0 0 40px;
            }

            :global(.timesheet--wrapper .timesheet__table--scrollable-wrapper) {
              overflow-x: hidden;
            }

            :global(.timesheet--wrapper .timesheet__cell) {
              margin-top: calc(-1 * var(--lineWidth));
              padding: 0.42em 0.6em;
              font-size: 14px;
              border-width: var(--lineWidth);
            }

            :global(.timesheet--wrapper .timesheet__table--row) {
              grid-template-rows: repeat(1, var(--cellHeight));
              grid-gap: var(--lineWidth);
            }

            :global(.timesheet--wrapper .timesheet__table--cell) {
              height: var(--cellHeight);
              width: var(--cellHeight);
              font-size: 14px;
            }

            :global(.timesheet--wrapper .qr) {
              flex-direction: row;
            }

            :global(.timesheet--wrapper .render-canvas) {
              display: none;
            }

            :global(.timesheet--wrapper .print-canvas) {
              display: block;
            }
          }

          .timesheet--row {
            display: flex;
            align-items: start;
          }

          .timesheet--title {
            font-size: 52px;
            margin: 80px 0 80px 0;
          }

          .timesheet__cell-group {
            display: flex;
            flex-direction: column;
            align-items: start;
            margin: 0 60px 60px 0;
          }
        `}</style>
      </div>
    );
  }
);

export default Timesheet;
