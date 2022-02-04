import React, { ForwardedRef, LegacyRef, ReactInstance } from "react";

import { TimesheetProps } from "../../types/Timesheet.types";
import Qr from "../Qr/Qr";
import Table from "../Table/Table";

interface Props extends Omit<TimesheetProps, "timesheet"> {
  days: number;
  printButton: JSX.Element;
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
      printButton,
    },
    ref: ForwardedRef<ReactInstance>
  ) => {
    return (
      <div ref={ref as unknown as LegacyRef<HTMLDivElement> | undefined}>
        <div className="grid grid-cols-12">
          <div className="col-span-10 col-start-2">
            <header className="mt-10 flex flex-row gap-3 justify-between">
              <div>
                <h2 className="font-semibold text-slate-500 text-lg">
                  Timesheet
                </h2>
                <h1 className="font-bold text-green-100 text-5xl">
                  {month_year}
                </h1>
              </div>

              {printButton}
            </header>

            <div className="mt-10 flex gap-20">
              <div className="mt-10 flex flex-col gap-2">
                <h3 className="font-semibold text-slate-500 text-lg mb-1">
                  Client
                </h3>
                <p className="font-bold text-2xl mb-2">{client.client_name}</p>
                <p className="font-semibold text-xl">
                  {client.client_contact_person}
                </p>
                <p className="font-semibold text-lg flex flex-col">
                  {client.client_address.split(/\n/).map((text, index) => (
                    <span key={index}>{text}</span>
                  ))}
                </p>
              </div>

              <div className="mt-10 flex flex-col gap-2">
                <h3 className="font-semibold text-slate-500 text-lg mb-1 ">
                  Contractor
                </h3>
                <div className="flex flex-row gap-4">
                  <div className="rounded-full bg-slate-500 h-10 w-10 m-1" />
                  <div className="flex flex-col">
                    <p className="font-bold text-2xl mb-2">{user.name}</p>
                    <p className="font-semibold text-xl">{user.email}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {timesheets.map((timesheet, index) => (
          <React.Fragment key={index}>
            <div>
              <div className="mt-16 flex flex-col gap-2">
                <h3 className="font-semibold text-slate-500 text-lg">
                  Project
                </h3>
                <p className="font-bold text-2xl mb-2">{timesheet.namespace}</p>
                <p className="font-bold text-2xl mb-2">
                  {timesheet.project_number}
                </p>
              </div>
            </div>
            <Table
              namespace={timesheet.namespace}
              timesheet={timesheet.timesheet}
              total_hours={timesheet.total_hours}
            />
          </React.Fragment>
        ))}
        <div className="flex text-center w-full justify-center mt-16">
          <h3 className="flex flex-col">
            <span className="font-semibold text-slate-500 text-xl mb-1">
              Total hours
            </span>
            <span className="text-green-100 font-bold text-6xl">
              {timesheets.reduce(
                (partialSum, { total_hours }) => partialSum + total_hours,
                0
              )}
            </span>
          </h3>
        </div>
        <Qr
          user_sign_qr_code={user_sign_qr_code}
          approver_sign_qr_code={approver_sign_qr_code}
          user_signature={user_signature}
          approver_signature={approver_signature}
        />
      </div>
    );
  }
);

export default Timesheet;
