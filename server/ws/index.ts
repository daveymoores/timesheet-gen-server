import * as socketIo from "socket.io";

const ws = (io: socketIo.Server) => {
  const socket_id: string[] = [];

  return io.on("connect", (socket: socketIo.Socket) => {
    socket_id.push(socket.id);

    // Remove subsequent connections with same ID
    if (socket_id[0] === socket.id) {
      io.removeAllListeners("connection");
    }

    socket.on("join", async (timesheet) => {
      try {
        console.log("Joining room: " + timesheet);
        await socket.join(timesheet);
      } catch (err) {
        console.log(err);
      }
    });
  });
};

export default ws;
