import Image from "next/image";
import React from "react";

import { ParsedTimesheetDayLog, TimesheetProps } from "../../pages/[timesheet]";
import Cell from "../Cell/Cell";

type QrProps = Pick<
  TimesheetProps<ParsedTimesheetDayLog>,
  "user_sign_qr_code" | "approver_sign_qr_code"
>;

const Qr: React.FC<QrProps> = ({
  user_sign_qr_code,
  approver_sign_qr_code,
}) => {
  return (
    <>
      <div className="qr">
        <div className="qr__group">
          <Cell text="Signed: Davey Moores" title />
          <Image
            src={`data:image/svg+xml;utf8,${encodeURIComponent(
              user_sign_qr_code.dark
            )}`}
            width={230}
            height={230}
          />
        </div>

        <div className="qr__group">
          <Cell text="Approver: Jim Spencer Brown" title />
          <Image
            src={`data:image/svg+xml;utf8,${encodeURIComponent(
              approver_sign_qr_code.dark
            )}`}
            width={230}
            height={230}
          />
        </div>
      </div>
      <style jsx>
        {`
          .qr {
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            align-items: center;
            margin: 100px auto 25px;
            max-width: var(--max-content-width);
          }

          @media screen and (min-width: 900px) {
            .qr {
              flex-direction: row;
            }
          }

          .qr__group {
            display: flex;
            flex-direction: column;
            margin-bottom: 25px;
          }
        `}
      </style>
    </>
  );
};

export default Qr;
