import Image from "next/image";
import React from "react";
import CanvasDraw from "react-canvas-draw";
import { io } from "socket.io-client";

import palette from "../../utils/palette";
import Cell from "../Cell/Cell";

interface QrGroupProps {
  cellTitle: string;
  signature: string;
  qrCodeLight: string;
  qrCodeDark: string;
  signeeType: "user_signature" | "approver_signature";
}

const QrGroup: React.FC<QrGroupProps> = ({
  cellTitle,
  signature,
  qrCodeDark,
  qrCodeLight,
  signeeType,
}) => {
  const canvasRef = React.useRef<CanvasDraw>(null);
  const [signeeSignature, setSigneeSignature] = React.useState("");

  React.useEffect(() => {
    if (signature) setSigneeSignature(signature);
  }, [signature]);

  React.useEffect(() => {
    const socket = io();
    socket.on("signature_update", (data) => {
      if (data.signee === signeeType) {
        setSigneeSignature(data.signature);
      }
    });
  }, []);

  React.useEffect(() => {
    if (canvasRef.current && signeeSignature) {
      canvasRef.current.loadSaveData(signeeSignature);
    }
  }, [canvasRef.current, signeeSignature]);

  return (
    <>
      <div className="qr__group">
        <Cell text={cellTitle} title />
        {signeeSignature && typeof window !== "undefined" ? (
          <CanvasDraw
            ref={canvasRef}
            canvasHeight={230}
            canvasWidth={230}
            brushColor={palette.LIGHT_GREEN}
            backgroundColor={palette.DARK_GREY}
            hideGrid
            disabled
          />
        ) : (
          <Image
            className="qr_code"
            src={`data:image/svg+xml;utf8,${encodeURIComponent(qrCodeDark)}`}
            width={230}
            height={230}
          />
        )}
      </div>
      <style jsx>
        {`
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

export default QrGroup;
