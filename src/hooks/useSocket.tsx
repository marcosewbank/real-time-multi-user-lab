import { useState, useEffect } from "react";
import SocketIOClient from "socket.io-client";

export const useSocket = (url: string) => {
  const [socket, setSocket] = useState<any>(null);

  useEffect((): any => {
    const newSocket = SocketIOClient.connect(process.env.BASE_URL ?? "", {
      path: "/api/socketio",
    });

    setSocket(newSocket);

    if (newSocket) return () => newSocket.disconnect();
  }, []);

  const handleSocketPost = async (data: string) => {
    await fetch("http://localhost:3000/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  };

  return { socket, handleSocketPost };
};
