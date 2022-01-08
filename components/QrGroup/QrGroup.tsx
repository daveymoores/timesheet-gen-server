import Image from "next/image";
import React from "react";
import CanvasDraw from "react-canvas-draw";
import useSystemTheme from "react-use-system-theme";

import { QrCode } from "../../types/Timesheet.types";
import palette from "../../utils/palette";
import Cell from "../Cell/Cell";
import styles from "./QrGroup.styles";

interface QrGroupProps {
  cellTitle: string;
  signature: string;
  qrCode: QrCode;
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

export enum SystemTheme {
  LIGHT = "light",
  DARK = "dark",
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

const modifySignature = (signature: string, color: palette) => {
  return JSON.stringify(modifyBrushColor(signature, color));
};

// eslint-disable-next-line react/display-name
const QrGroup: React.FC<QrGroupProps> = React.memo(
  ({ cellTitle, signature, qrCode }) => {
    const systemTheme: SystemTheme = useSystemTheme(SystemTheme.DARK);
    const renderCanvasRef = React.useRef<CanvasDraw>(null);
    const printCanvasRef = React.useRef<CanvasDraw>(null);
    const signatureJson = JSON.parse(signature);

    React.useEffect(() => {
      if (renderCanvasRef.current && printCanvasRef.current && signature) {
        // change signature colour by system theme for web version
        renderCanvasRef.current.loadSaveData(
          modifySignature(
            signature,
            systemTheme === "dark" ? palette.LIGHT_GREEN : palette.DARK_GREY
          )
        );
        // print version is always dark
        printCanvasRef.current.loadSaveData(
          modifySignature(signature, palette.DARK_GREY)
        );
      }
    }, [renderCanvasRef.current, printCanvasRef.current, signature]);

    return (
      <>
        <div className="qr__group">
          <Cell text={cellTitle} title />
          {signature && typeof window !== "undefined" ? (
            <React.Fragment>
              <div className="render-canvas">
                <CanvasDraw
                  className="render-canvas"
                  ref={renderCanvasRef}
                  canvasHeight={signatureJson.height}
                  canvasWidth={signatureJson.width}
                  brushColor={
                    systemTheme === "dark"
                      ? palette.LIGHT_GREEN
                      : palette.DARK_GREY
                  }
                  backgroundColor={
                    systemTheme === "dark"
                      ? palette.DARK_GREY
                      : palette.LIGHT_GREEN
                  }
                  hideGrid
                  disabled
                />
              </div>
              <div className="print-canvas">
                <CanvasDraw
                  className="print-canvas"
                  ref={printCanvasRef}
                  canvasHeight={230}
                  canvasWidth={230}
                  brushColor={palette.DARK_GREY}
                  backgroundColor="#FFFFFF"
                  hideGrid
                  disabled
                />
              </div>
            </React.Fragment>
          ) : (
            <Image
              className="qr_code"
              src={`data:image/svg+xml;utf8,${encodeURIComponent(
                qrCode[systemTheme] as string
              )}`}
              width={230}
              height={230}
            />
          )}
        </div>
        <style jsx>{styles}</style>
      </>
    );
  }
);

export default QrGroup;
