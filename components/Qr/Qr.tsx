import React from "react";

import { ParsedTimesheetDayLog, TimesheetProps } from "../../pages/[timesheet]";
import QrGroup from "../QrGroup/QrGroup";
import styles from "./Qr.styles";

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
          qrCode={user_sign_qr_code}
          signeeType={"user_signature"}
        />
        <QrGroup
          cellTitle="Approver: Jim Spencer Brown"
          signature={approver_signature}
          qrCode={approver_sign_qr_code}
          signeeType={"approver_signature"}
        />
      </div>
      <style jsx>{styles}</style>
    </>
  );
};

export default Qr;
