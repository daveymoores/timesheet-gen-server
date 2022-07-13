import React from "react";
import * as socketIo from "socket.io-client";

interface Socket {
  socket: socketIo.Socket;
}

const changeStreamServerURI = process.env.NEXT_PUBLIC_CHANGE_STREAM_SERVER_URL;
const SocketIoContext = React.createContext<Socket>({} as Socket);
const socket = changeStreamServerURI && socketIo.connect(changeStreamServerURI);

export const SocketIoProvider: React.FC = ({ children }) => {
  if (!socket) return <>{children}</>;
  return (
    <SocketIoContext.Provider value={{ socket }}>
      {children}
    </SocketIoContext.Provider>
  );
};

export default SocketIoContext;
