import * as socketIo from "socket.io";

import { TimesheetServer } from "../../pages/[timesheet]";

const change_event =
  (io: socketIo.Server) =>
  (next: {
    documentKey: string;
    fullDocument: TimesheetServer;
    updateDescription: { updatedFields: TimesheetServer };
  }) => {
    console.log("Mongodb change event!");
    // at the very least there should be document ID
    if (!next.documentKey) {
      throw new Error("No data returned");
    }

    try {
      const modified_timesheet = next?.fullDocument?.random_path;
      const updateFields = next?.updateDescription?.updatedFields;

      // if fields haven't been updated then prevent this from firing
      if (!updateFields) {
        return;
      }

      if (!modified_timesheet) {
        throw new Error(
          "Couldn't find the modified timesheet from change stream"
        );
      }

      const signee = Object.keys(updateFields).find(
        (key: string) => key.indexOf("_signature") > -1
      ) as "user_signature" | "approver_signature";

      const payload = {
        signature: signee ? updateFields[signee] : null,
        signee,
        error: false,
      };

      io.to(modified_timesheet).emit("signature_update", payload);
    } catch (err) {
      console.error(err);
    }
  };

export default change_event;
