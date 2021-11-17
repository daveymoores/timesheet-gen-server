import React from "react";
import * as socketIo from "socket.io-client";

interface Socket {
  socket: socketIo.Socket;
}

const SocketIoContext = React.createContext<Socket>({} as Socket);

export const SocketIoProvider: React.FC = ({ children }) => (
  <SocketIoContext.Provider value={{ socket: socketIo.io() }}>
    {children}
  </SocketIoContext.Provider>
);

export default SocketIoContext;
