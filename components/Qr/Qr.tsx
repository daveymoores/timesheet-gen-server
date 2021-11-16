import React from "react";
import { io } from "socket.io-client";

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
  const [signature, setSignature] = React.useState({
    user_signature,
    approver_signature,
  });

  React.useEffect(() => {
    const socket = io();
    socket.on("signature_update", (data) => {
      console.log("received update");
      setSignature((signature) => ({
        ...signature,
        [data.signee]: data.signature,
      }));
    });
  }, []);

  return (
    <>
      <div className="qr">
        <QrGroup
          cellTitle="Signee: Davey Moores"
          signature={signature["user_signature"]}
          qrCode={user_sign_qr_code}
        />
        <QrGroup
          cellTitle="Approver: Jim Spencer Brown"
          signature={signature["approver_signature"]}
          qrCode={approver_sign_qr_code}
        />
      </div>
      <style jsx>{styles}</style>
    </>
  );
};

export default Qr;
