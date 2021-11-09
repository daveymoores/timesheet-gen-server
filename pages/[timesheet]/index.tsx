import { MongoClient } from "mongodb";
import { GetServerSideProps } from "next";
import QRCode from "qrcode";
import { ParsedUrlQuery } from "querystring";
import React from "react";

import Cell from "../../components/Cell/Cell";
import Qr from "../../components/Qr/Qr";
import Table from "../../components/Table/Table";

interface QrCode {
  light: string;
  dark: string;
}

interface TimesheetDayLog {
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
}

const Timesheet: React.FC<{ params: TimesheetProps<ParsedTimesheetDayLog> }> =
  ({
    params: {
      name,
      email,
      namespace,
      project_number,
      client_name,
      client_contact_person,
      address,
      timesheet_log,
      month_year,
      total_hours,
      user_sign_qr_code,
      approver_sign_qr_code,
    },
  }) => {
    return (
      <>
        <article className="timesheet">
          <header>
            <h1 className="timesheet--title">Timesheet: {month_year}</h1>
          </header>

          <div className="timesheet--row">
            <div className="timesheet__cell-group">
              <Cell text="Client:" title />
              <Cell text={client_name} />
              <Cell text={client_contact_person} />
              <Cell text={address} />
            </div>

            <div className="timesheet__cell-group">
              <Cell text="Contractor:" title />
              <Cell text={name} />
              <Cell text={email} />
            </div>
          </div>

          <div className="timesheet--row">
            <div className="timesheet__cell-group">
              <Cell text={`Project: ${namespace}`} title />
              <Cell text={`Project number: ${project_number}`} title />
            </div>
          </div>

          <Table timesheet_log={timesheet_log} total_hours={total_hours} />

          <Qr
            user_sign_qr_code={user_sign_qr_code}
            approver_sign_qr_code={approver_sign_qr_code}
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

          .timesheet--row {
            display: flex;
            align-items: start;
          }

          .timesheet--title {
            font-size: 52px;
            margin: 80px 0 80px 0;
          }

          .timesheet__cell-group {
            display: flex;
            flex-direction: column;
            align-items: start;
            margin: 0 60px 60px 0;
          }
        `}</style>
      </>
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
  TimesheetGenServerResponse<TimesheetProps<TimesheetDayLog>>,
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

  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("MONGODB_URI is not set");
  }

  const client = new MongoClient(uri);

  const run = async (random_path: string | undefined) => {
    try {
      await client.connect();
      const database = client.db("timesheet-gen");
      const timesheet_collection = database.collection("timesheet-temp-paths");

      const query = { random_path };
      return await timesheet_collection.findOne(query);
    } finally {
      await client.close();
    }
  };

  const data = await run(context?.params?.timesheet);

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      params: {
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
            "http://localhost:3000",
            "#e1f7de",
            "#1e2027"
          ),
          dark: await generateQR("http://localhost:3000", "#1e2027", "#e1f7de"),
        },
        approver_sign_qr_code: {
          light: await generateQR(
            "http://localhost:3000",
            "#e1f7de",
            "#1e2027"
          ),
          dark: await generateQR("http://localhost:3000", "#1e2027", "#e1f7de"),
        },
      },
    },
  };
};

export default Timesheet;
