import { io } from "socket.io-client";

let socket = null;

export const getSocket = (role) => {
  const tokenKey =
    role === "buyer"
      ? "buyerAccessToken"
      : role === "seller"
      ? "sellerAccessToken"
      : "lenderAccessToken";

  const token = localStorage.getItem(tokenKey);

  if (!token) {
    console.warn("⚠️ No token found, socket not connected");
    return null;
  }

  if (!socket) {
    socket = io("http://localhost:3000", {
      auth: {
        token
      },
      transports: ["websocket"],
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1000
    });
  }

  return socket;
};
