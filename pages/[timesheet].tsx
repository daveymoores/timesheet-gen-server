import { MongoClient } from "mongodb";
import { GetServerSideProps } from "next";
import { ParsedUrlQuery } from "querystring";
import React from "react";

import TableCell from "../components/TableCell/TableCell";

interface TimesheetDayLog {
  hour: number;
  user_edited: 0 | 1;
  weekend: 0 | 1;
}

export interface ParsedTimesheetDayLog
  extends Omit<TimesheetDayLog, "user_edited" | "weekend"> {
  user_edited: boolean;
  weekend: boolean;
}

interface TimesheetProps<T> {
  timesheet: string;
  name: string;
  email: string;
  namespace: string;
  client_name: string;
  client_contact_person: string;
  address: string;
  timesheet_log: T[];
  total_hours: number;
  month_year: string;
}

const Timesheet: React.FC<{ params: TimesheetProps<ParsedTimesheetDayLog> }> =
  ({ params: { timesheet_log } }) => {
    return (
      <>
        <article className="timesheet">
          <header>
            <h1 className="timesheet--title">Timesheet: November, 2021</h1>

            <div className="timesheet__table--wrapper">
              <div className="timesheet__cell timesheet__cell--title">
                Days:
              </div>
              <div className="timesheet__table--container">
                <div className="timesheet__table--row">
                  {timesheet_log.map((day_value, index: number) => (
                    <TableCell day_index={index + 1} day key={index} />
                  ))}
                </div>
                <div className="timesheet__table--row">
                  {timesheet_log.map(
                    (day: ParsedTimesheetDayLog, index: number) => (
                      <TableCell {...day} key={index} />
                    )
                  )}
                </div>
              </div>
              <div className="timesheet__cell timesheet__cell--title">
                Total: 125
              </div>
            </div>
          </header>
        </article>
        <style jsx>{`
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

          .timesheet__cell {
            margin-top: calc(-1 * var(--lineWidth));
            padding: 20px;
            font-size: 16px;
          }

          @media (prefers-color-scheme: dark) {
            .timesheet__cell {
              border: var(--lineWidth) solid var(--lightGreen);
            }
          }

          @media (prefers-color-scheme: light) {
            .timesheet__cell {
              border: var(--lineWidth) solid var(--darkGrey);
            }
          }

          .timesheet__cell:first-child {
            margin-top: 0;
          }

          .timesheet__cell p {
            padding: 0;
            margin: 0;
          }

          .timesheet__cell--title {
            font-weight: 600;
          }

          @media (prefers-color-scheme: dark) {
            .timesheet__cell--title {
              background-color: var(--mistyGrey);
            }
          }

          @media (prefers-color-scheme: light) {
            .timesheet__cell--title {
              background-color: var(--mistyGreen);
            }
          }

          .timesheet__table {
            display: flex;
            justify-content: center;
          }

          .timesheet__table--wrapper {
            display: flex;
            flex-direction: column;
          }

          .timesheet__cell--title:nth-child(1) {
            align-self: flex-start;
            border-bottom: none;
          }

          .timesheet__cell--title:last-child {
            align-self: flex-end;
          }

          @media (prefers-color-scheme: dark) {
            .timesheet__table--container {
              border: var(--lineWidth) solid var(--lightGreen);
            }
          }

          @media (prefers-color-scheme: light) {
            .timesheet__table--container {
              border: var(--lineWidth) solid var(--darkGrey);
            }
          }

          .timesheet__table--row {
            display: grid;
            grid-template-columns: repeat(31, var(--cellHeight));
            grid-template-rows: repeat(1, var(--cellHeight));
            grid-gap: var(--lineWidth);
          }

          @media (prefers-color-scheme: dark) {
            .timesheet__table--row:first-child {
              border-bottom: var(--lineWidth) solid var(--lightGreen);
            }
          }

          @media (prefers-color-scheme: light) {
            .timesheet__table--row:first-child {
              border-bottom: var(--lineWidth) solid var(--darkGrey);
            }
          }

          @media (prefers-color-scheme: dark) {
            .timesheet__table--row {
              background-color: var(--lightGreen);
            }
          }

          @media (prefers-color-scheme: light) {
            .timesheet__table--row {
              background-color: var(--darkGrey);
            }
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
  // Replace the uri string with your MongoDB deployment's connection string.
  const uri =
    "mongodb+srv://timesheet-gen-admin:W5%25tqY3D%233gby%2Ad3O@cluster0.i9dct.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
  const client = new MongoClient(uri);

  const run = async (random_path: string | undefined) => {
    try {
      await client.connect();
      const database = client.db("timesheet-gen");
      const timesheet_collection = database.collection("timesheet-temp-paths");
      // Query for a movie that has the title 'Back to the Future'
      const query = { random_path };
      return await timesheet_collection.findOne(query);
    } finally {
      // Ensures that the client will close when you finish/error
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
      },
    },
  };
};

export default Timesheet;
