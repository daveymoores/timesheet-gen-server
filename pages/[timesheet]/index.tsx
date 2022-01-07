import { ObjectId } from "mongodb";
import { GetServerSideProps } from "next";
import QRCode from "qrcode";
import { ParsedUrlQuery } from "querystring";
import React, { ReactInstance } from "react";
import ReactToPrint from "react-to-print";

import Button from "../../components/Button/Button";
import Timesheet from "../../components/Timesheet/Timesheet";
import SocketIoContext from "../../context/SocketIoContext";
import {
  TimesheetProps,
  TimesheetResponseProps,
} from "../../types/Timesheet.types";
import connect_to_db from "../../utils/connect_to_db";
import getDays from "../../utils/get_days";
import get_env_vars, { ENV_VARS } from "../../utils/get_env_vars";
import palette from "../../utils/palette";

const Index: React.FC<{ params: TimesheetProps }> = ({
  params: { timesheets, path, ...props },
}) => {
  const componentRef = React.useRef<ReactInstance>(null);
  const { socket } = React.useContext(SocketIoContext);

  const days = getDays(props.month_year);

  React.useEffect(() => {
    socket.on("connect", () => {
      console.log("Socket.io client connected");
      socket.emit("join", path);
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
          path={path}
          timesheets={timesheets}
          days={days}
        />
      </article>
      <style jsx>{`
        .timesheet {
          max-width: calc(
            ${days} * var(--cellHeight) + ${days} * var(--lineWidth)
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

interface NotFound {
  notFound: boolean;
}

interface Context extends ParsedUrlQuery {
  timesheet: string;
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const getServerSideProps: GetServerSideProps<
  TimesheetGenServerResponse<TimesheetResponseProps>,
  Context
> = async (
  context
): Promise<TimesheetGenServerResponse<TimesheetProps> | NotFound> => {
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
  ): Promise<TimesheetResponseProps | null> => {
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

  const {
    timesheets,
    client,
    random_path: path,
    month_year,
    user,
    _id,
    user_signature,
    approver_signature,
  } = data;

  const id = new ObjectId(_id).toString();

  return {
    props: {
      params: {
        id,
        path,
        timesheets,
        client,
        user,
        month_year,
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
        user_signature: user_signature || null,
        approver_signature: approver_signature || null,
      },
    },
  };
};

export default Index;
