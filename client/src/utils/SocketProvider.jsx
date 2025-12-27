import { createContext, useContext, useEffect, useRef } from "react";
import { getSocket } from "@/socket";

const SocketContext = createContext(null);

export const SocketProvider = ({ role, children }) => {
  const socketRef = useRef(null);

  useEffect(() => {
    if (socketRef.current) return;

    const socket = getSocket(role);

    if (!socket) {
      console.warn("⚠️ Socket not created: token missing");
      return;
    }

    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("🟢 Global socket connected:", socket.id);
    });

    socket.on("disconnect", (reason) => {
      console.log("🔴 Global socket disconnected:", reason);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, [role]);

  return (
    <SocketContext.Provider value={socketRef.current}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
