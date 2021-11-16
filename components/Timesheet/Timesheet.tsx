import React, { ForwardedRef, LegacyRef, ReactInstance } from "react";

import { ParsedTimesheetDayLog, TimesheetProps } from "../../pages/[timesheet]";
import Cell from "../Cell/Cell";
import Qr from "../Qr/Qr";
import Table from "../Table/Table";

// eslint-disable-next-line react/display-name
const Timesheet = React.forwardRef<
  ReactInstance,
  Omit<TimesheetProps<ParsedTimesheetDayLog>, "timesheet">
>(
  (
    {
      name,
      email,
      namespace,
      project_number,
      client_name,
      client_contact_person,
      address,
      timesheet_log,
      month_year,
      total_hours,
      user_sign_qr_code,
      approver_sign_qr_code,
      user_signature,
      approver_signature,
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
            <Cell text={client_name} />
            <Cell text={client_contact_person} />
            <Cell text={address} />
          </div>

          <div className="timesheet__cell-group">
            <Cell text="Contractor:" title />
            <Cell text={name} />
            <Cell text={email} />
          </div>
        </div>

        <div className="timesheet--row">
          <div className="timesheet__cell-group">
            <Cell text={`Project: ${namespace}`} title />
            <Cell text={`Project number: ${project_number}`} title />
          </div>
        </div>

        <Table timesheet_log={timesheet_log} total_hours={total_hours} />

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
              grid-template-columns: repeat(
                ${timesheet_log.length},
                var(--cellHeight)
              );
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
