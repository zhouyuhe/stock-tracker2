import io from "socket.io-client";

const HOST = window.location.hostname;
const PORT = 4000;
const SERVER = `${HOST}:${PORT}`;

const createSocketService = () => {
  let socket: SocketOperation;

  function get() {
    return socket || (socket = io(SERVER));
  }

  return { get };
};

export const socketService = createSocketService();
export type SocketService = typeof socketService;
export type SocketOperation = Pick<SocketIOClient.Socket, "on" | "emit">;
