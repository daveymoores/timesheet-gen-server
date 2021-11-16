import { Document, ObjectId } from "mongodb";
import { GetServerSideProps } from "next";
import QRCode from "qrcode";
import { ParsedUrlQuery } from "querystring";
import React, { ReactInstance } from "react";
import ReactToPrint from "react-to-print";
import { io } from "socket.io-client";

import Button from "../../components/Button/Button";
import Timesheet from "../../components/Timesheet/Timesheet";
import connect_to_db from "../../utils/connect_to_db";
import get_env_vars, { ENV_VARS } from "../../utils/get_env_vars";
import palette from "../../utils/palette";

export interface QrCode {
  light: string;
  dark: string;
}

export interface TimesheetDayLog {
  hours: number;
  user_edited: 0 | 1;
  weekend: 0 | 1;
}

export interface ParsedTimesheetDayLog
  extends Omit<TimesheetDayLog, "user_edited" | "weekend"> {
  user_edited: boolean;
  weekend: boolean;
}

export interface TimesheetProps<T> {
  timesheet: string;
  name: string;
  email: string;
  namespace: string;
  project_number: string;
  client_name: string;
  client_contact_person: string;
  address: string;
  timesheet_log: T[];
  total_hours: number;
  month_year: string;
  user_sign_qr_code: QrCode;
  approver_sign_qr_code: QrCode;
  user_signature: string;
  approver_signature: string;
}

export interface TimesheetServer extends TimesheetProps<TimesheetDayLog> {
  random_path: string;
}

const Index: React.FC<{ params: TimesheetProps<ParsedTimesheetDayLog> }> = ({
  params: { timesheet, timesheet_log, ...props },
}) => {
  const componentRef = React.useRef<ReactInstance>(null);

  React.useEffect(() => {
    const socket = io();
    socket.on("connect", async () => {
      socket.emit("join", timesheet);
    });
  }, []);

  return (
    <React.Fragment>
      <article className="timesheet">
        <ReactToPrint
          trigger={() => <Button text="Print" />}
          content={() => componentRef.current}
        />
        <Timesheet
          ref={componentRef}
          {...props}
          timesheet_log={timesheet_log}
        />
      </article>
      <style jsx>{`
        .timesheet {
          max-width: calc(
            ${timesheet_log.length} * var(--cellHeight) +
              ${timesheet_log.length} * var(--lineWidth)
          );
          margin: auto;
        }
      `}</style>
    </React.Fragment>
  );
};

interface TimesheetGenServerResponse<T> {
  props: {
    params: T;
  };
}

interface Context extends ParsedUrlQuery {
  timesheet: string;
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const getServerSideProps: GetServerSideProps<
  TimesheetGenServerResponse<TimesheetServer>,
  Context
> = async (context) => {
  const generateQR = async (text: string, light: string, dark: string) => {
    try {
      return await QRCode.toString(text, {
        type: "svg",
        color: {
          light,
          dark,
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  const env_vars = get_env_vars(ENV_VARS);

  const run = async (
    random_path: string | undefined
  ): Promise<Document | null> => {
    try {
      const { mongoCollection } = await connect_to_db(env_vars);
      const query = { random_path };
      return await mongoCollection.findOne(query);
    } catch (error) {
      throw new Error(`Unable to connect to db: ${error}`);
    }
  };

  const data = await run(context?.params?.timesheet);

  if (!data) {
    return {
      notFound: true,
    };
  }

  const id = new ObjectId(data._id).toString();

  return {
    props: {
      params: {
        id,
        timesheet: data.random_path,
        name: data.name,
        email: data.email,
        namespace: data.namespace,
        client_name: data.client_name,
        client_contact_person: data.client_contact_person,
        address: data.address,
        timesheet_log: JSON.parse(data.timesheet).map(
          (day: TimesheetDayLog): ParsedTimesheetDayLog => ({
            ...day,
            user_edited: !!day.user_edited,
            weekend: !!day.weekend,
          })
        ),
        total_hours: data.total_hours,
        month_year: data.month_year,
        project_number: 4567,
        user_sign_qr_code: {
          light: await generateQR(
            `${env_vars.SITE_URL}/${data.random_path}/sign?id=${id}&by=user`,
            palette.LIGHT_GREEN,
            palette.DARK_GREY
          ),
          dark: await generateQR(
            `${env_vars.SITE_URL}/${data.random_path}/sign?id=${id}&by=user`,
            palette.DARK_GREY,
            palette.LIGHT_GREEN
          ),
        },
        approver_sign_qr_code: {
          light: await generateQR(
            `${env_vars.SITE_URL}/${data.random_path}/sign?id=${id}&by=approver`,
            palette.LIGHT_GREEN,
            palette.DARK_GREY
          ),
          dark: await generateQR(
            `${env_vars.SITE_URL}/${data.random_path}/sign?id=${id}&by=approver`,
            palette.DARK_GREY,
            palette.LIGHT_GREEN
          ),
        },
        user_signature: data.user_signature || null,
        approver_signature: data.approver_signature || null,
      },
    },
  };
};

export default Index;
