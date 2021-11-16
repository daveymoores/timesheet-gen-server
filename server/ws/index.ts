import { ChangeStream, Collection } from "mongodb";
import * as socketIo from "socket.io";

import { TimesheetServer } from "../../pages/[timesheet]";

const ws = (
  io: socketIo.Server,
  collection: Collection<TimesheetServer>,
  changeStream: ChangeStream<TimesheetServer>
) => {
  const socket_id: string[] = [];
  return io.sockets.on("connection", (socket: socketIo.Socket) => {
    socket_id.push(socket.id);

    // Remove subsequent connections with same ID
    if (socket_id[0] === socket.id) {
      io.removeAllListeners("connection");
    }

    socket.on("join", async (timesheet) => {
      console.log("join id >", timesheet);
      try {
        socket.join(timesheet);
        console.log(`User has joined ${timesheet}`);
      } catch (err) {
        console.log(err);
      }
    });

    changeStream.on("change", async (next) => {
      const regex = new RegExp(`^[\\/^](\\w+)`);

      if (!socket?.request?.headers?.referer) {
        throw new Error("Referrer not found");
      }

      const pathname = new URL(socket.request.headers.referer).pathname;
      const matches: RegExpExecArray | null = regex.exec(pathname);
      const activeRoom = (matches || [])[1];

      if (!activeRoom || !pathname) {
        throw new Error("Path not found");
      } else if (!next.documentKey) {
        throw new Error("No data returned");
      }

      try {
        const document = await collection.findOne(next.documentKey, {});
        const timesheet = document?.random_path;

        const updateFields = next?.updateDescription?.updatedFields;

        if (!timesheet) {
          throw new Error("There was an error");
        }

        if (!updateFields) {
          io.sockets.in(timesheet).emit("signature_update", {
            signature: null,
            error: true,
          });
          changeStream.close();
          return;
        }

        const signee = Object.keys(updateFields).find(
          (key: string) => key.indexOf("_signature") > -1
        );

        const payload = {
          signature: signee ? updateFields[signee] : null,
          signee,
          error: false,
        };

        console.log("activeRoom: ", activeRoom);
        console.log("timesheet: ", timesheet);
        if (timesheet === activeRoom) {
          io.sockets.emit("signature_update", payload);
        }
      } catch (err) {
        console.error(err);
      }
    });
  });
};

export default ws;
