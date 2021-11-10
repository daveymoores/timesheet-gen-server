import Image from "next/image";
import React from "react";
import CanvasDraw from "react-canvas-draw";

import { ParsedTimesheetDayLog, TimesheetProps } from "../../pages/[timesheet]";
import palette from "../../utils/palette";
import Cell from "../Cell/Cell";

type QrProps = Pick<
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
  const userCanvasRef = React.useRef<CanvasDraw>(null);
  const approverCanvasRef = React.useRef<CanvasDraw>(null);

  React.useEffect(() => {
    if (userCanvasRef.current && user_signature) {
      userCanvasRef.current.loadSaveData(user_signature);
    }

    if (approverCanvasRef.current && approver_signature) {
      approverCanvasRef.current.loadSaveData(approver_signature);
    }
  }, [
    userCanvasRef.current,
    user_signature,
    approverCanvasRef.current,
    approver_signature,
  ]);

  return (
    <>
      <div className="qr">
        <div className="qr__group">
          <Cell text="Signee: Davey Moores" title />
          {user_signature && typeof window !== "undefined" ? (
            <CanvasDraw
              ref={userCanvasRef}
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
              src={`data:image/svg+xml;utf8,${encodeURIComponent(
                user_sign_qr_code.dark
              )}`}
              width={230}
              height={230}
            />
          )}
        </div>

        <div className="qr__group">
          <Cell text="Approver: Jim Spencer Brown" title />
          {approver_signature && typeof window !== "undefined" ? (
            <CanvasDraw
              ref={approverCanvasRef}
              canvasHeight={230}
              canvasWidth={230}
              brushColor={palette.LIGHT_GREEN}
              backgroundColor={palette.DARK_GREY}
              hideGrid
              disabled
            />
          ) : (
            <Image
              src={`data:image/svg+xml;utf8,${encodeURIComponent(
                approver_sign_qr_code.dark
              )}`}
              width={230}
              height={230}
            />
          )}
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
