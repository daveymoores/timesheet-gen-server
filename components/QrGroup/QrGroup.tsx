import Image from "next/image";
import React from "react";
import CanvasDraw from "react-canvas-draw";
import useSystemTheme from "react-use-system-theme";
import { io } from "socket.io-client";

import { QrCode } from "../../pages/[timesheet]";
import palette from "../../utils/palette";
import Cell from "../Cell/Cell";
import styles from "./QrGroup.styles";

interface QrGroupProps {
  cellTitle: string;
  signature: string;
  qrCode: QrCode;
  signeeType: "user_signature" | "approver_signature";
}

interface Signature {
  lines: Line[];
  width: number;
  height: number;
}

interface Line {
  points: { x: number; y: number }[];
  brushColor: string;
  brushRadius: string;
}

const modifyBrushColor = (signature: string, color: string): Signature => {
  try {
    const signatureJson = JSON.parse(signature);
    const lines = signatureJson.lines.map((line: Line) => ({
      ...line,
      brushColor: color,
    }));

    return {
      ...signatureJson,
      lines,
    };
  } catch (err) {
    throw new Error("Error parsing the signature string");
  }
};

const QrGroup: React.FC<QrGroupProps> = ({
  cellTitle,
  signature,
  qrCode,
  signeeType,
}) => {
  const systemTheme = useSystemTheme("dark");
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
      const modifiedSignature = JSON.stringify(
        modifyBrushColor(
          signeeSignature,
          systemTheme === "dark" ? palette.LIGHT_GREEN : palette.DARK_GREY
        )
      );
      canvasRef.current.loadSaveData(modifiedSignature);
    }
  }, [canvasRef.current, signeeSignature]);

  return (
    <>
      <div className="qr__group">
        <Cell text={cellTitle} title />
        {signeeSignature && typeof window !== "undefined" ? (
          <React.Fragment>
            <CanvasDraw
              className="render-canvas"
              ref={canvasRef}
              canvasHeight={230}
              canvasWidth={230}
              brushColor={
                systemTheme === "dark" ? palette.LIGHT_GREEN : palette.DARK_GREY
              }
              backgroundColor={
                systemTheme === "dark" ? palette.DARK_GREY : palette.LIGHT_GREEN
              }
              hideGrid
              disabled
            />
            {/*<CanvasDraw*/}
            {/*  className="print-canvas"*/}
            {/*  ref={canvasRef}*/}
            {/*  canvasHeight={230}*/}
            {/*  canvasWidth={230}*/}
            {/*  brushColor={palette.DARK_GREY}*/}
            {/*  backgroundColor="#FFFFFF"*/}
            {/*  hideGrid*/}
            {/*  disabled*/}
            {/*/>*/}
          </React.Fragment>
        ) : (
          <Image
            className="qr_code"
            src={`data:image/svg+xml;utf8,${encodeURIComponent(
              qrCode[systemTheme as "light" | "dark"]
            )}`}
            width={230}
            height={230}
          />
        )}
      </div>
      <style jsx>{styles}</style>
    </>
  );
};

export default QrGroup;
