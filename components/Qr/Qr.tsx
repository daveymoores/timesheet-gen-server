import React from "react";

import SocketIoContext from "../../context/SocketIoContext";
import { TimesheetProps } from "../../types/Timesheet.types";
import QrGroup from "../QrGroup/QrGroup";
import styles from "./Qr.styles";

export type QrProps = Pick<
  TimesheetProps,
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
  const { socket } = React.useContext(SocketIoContext);
  const [signature, setSignature] = React.useState({
    user_signature,
    approver_signature,
  });

  React.useEffect(() => {
    if (!socket) return;
    socket.on("signature_update", (data) => {
      console.log(data);
      setSignature((signature) => ({
        ...signature,
        [data.signee]: data.signature,
      }));
    });
  }, [socket]);

  return (
    <>
      <div className="qr">
        {user_sign_qr_code && (
          <QrGroup
            cellTitle="Signee: Davey Moores"
            signature={signature["user_signature"]}
            qrCode={user_sign_qr_code}
          />
        )}
        {approver_sign_qr_code && (
          <QrGroup
            cellTitle="Approver: Jim Spencer Brown"
            signature={signature["approver_signature"]}
            qrCode={approver_sign_qr_code}
          />
        )}
      </div>
      <style jsx>{styles}</style>
    </>
  );
};

export default Qr;
