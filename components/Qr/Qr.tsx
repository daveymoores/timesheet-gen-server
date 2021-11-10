import React from "react";

import { ParsedTimesheetDayLog, TimesheetProps } from "../../pages/[timesheet]";
import QrGroup from "../QrGroup/QrGroup";

export type QrProps = Pick<
  TimesheetProps<ParsedTimesheetDayLog>,
  | "user_sign_qr_code"
  | "approver_sign_qr_code"
  | "user_signature"
  | "approver_signature"
>;

const Qr: React.FC<QrProps> = ({
  user_sign_qr_code,
  approver_sign_qr_code,
  user_signature,
  approver_signature,
}) => {
  return (
    <>
      <div className="qr">
        <QrGroup
          cellTitle="Signee: Davey Moores"
          signature={user_signature}
          qrCodeLight={user_sign_qr_code.light}
          qrCodeDark={user_sign_qr_code.dark}
          signeeType={"user_signature"}
        />
        <QrGroup
          cellTitle="Approver: Jim Spencer Brown"
          signature={approver_signature}
          qrCodeLight={approver_sign_qr_code.light}
          qrCodeDark={approver_sign_qr_code.dark}
          signeeType={"approver_signature"}
        />
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
        `}
      </style>
    </>
  );
};

export default Qr;
