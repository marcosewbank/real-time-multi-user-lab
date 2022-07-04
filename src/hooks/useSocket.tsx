import { useState, useEffect } from "react";
import SocketIOClient from "socket.io-client";

interface IMessage {
  name: string;
  message: string;
}

export const useSocket = (url: string) => {
  const [socket, setSocket] = useState<any>(null);

  useEffect((): any => {
    const newSocket = SocketIOClient.connect(process.env.BASE_URL ?? "", {
      path: "/api/socketio",
    });

    setSocket(newSocket);

    if (newSocket) return () => newSocket.disconnect();
  }, []);

  const handleSocketPost = async (data: IMessage) => {
    console.log(
      "🚀 ~ file: useSocket.tsx ~ line 23 ~ handleSocketPost ~ data",
      data
    );

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
