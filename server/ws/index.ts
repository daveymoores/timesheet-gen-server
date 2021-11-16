import { ChangeStream, Collection } from "mongodb";
import * as socketIo from "socket.io";

import { TimesheetServer } from "../../pages/[timesheet]";

const ws = (
  io: socketIo.Server,
  collection: Collection<TimesheetServer>,
  changeStream: ChangeStream<TimesheetServer>,
  path: string
) => {
  const socket_id: string[] = [];
  return io.on("connect", (socket: socketIo.Socket) => {
    socket_id.push(socket.id);

    // Remove subsequent connections with same ID
    if (socket_id[0] === socket.id) {
      io.removeAllListeners("connection");
    }

    socket.on("join", async (timesheet) => {
      try {
        socket.join(timesheet);
        console.log(`User has joined ${timesheet}`);
      } catch (err) {
        console.log(err);
      }
    });

    console.log(">>>>> 1");
    // this will fire for every update to the db
    changeStream.on("change", async (next) => {
      console.log(">>>>>> 2");
      if (!next.documentKey) {
        throw new Error("No data returned");
      }

      try {
        // ...so lets check for which document has been updated and compare it to the path
        const document = await collection.findOne(next.documentKey, {});
        const modified_timesheet = document?.random_path;

        const updateFields = next?.updateDescription?.updatedFields;

        if (!modified_timesheet) {
          throw new Error("There was an error");
        }

        if (!updateFields) {
          socket.emit("signature_update", {
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

        console.log("activeRoom: ", path);
        console.log("timesheet: ", modified_timesheet);
        if (modified_timesheet === path) {
          socket.emit("signature_update", payload);
        }
      } catch (err) {
        console.error(err);
      }
    });
  });
};

export default ws;
