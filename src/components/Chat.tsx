import React, { useState, useEffect, useRef } from "react";
import SocketIOClient from "socket.io-client";
import {
  Container,
  Heading,
  Box,
  List,
  ListIcon,
  ListItem,
  Input,
  Button,
} from "@chakra-ui/react";
import { MdCheckCircle } from "react-icons/md";

type Props = {};

const user = "User_" + String(new Date().getTime()).substr(-3);

interface IMsg {
  user: string;
  msg: string;
}

export const Chat = (props: Props) => {
  const inputRef = useRef(null);
  // connected flag
  const [connected, setConnected] = useState<boolean>(false);

  // init chat and message
  const [chat, setChat] = useState<IMsg[]>([]);
  const [msg, setMsg] = useState<string>("");

  useEffect((): any => {
    // connect to socket server
    const socket = SocketIOClient.connect(process.env.BASE_URL ?? "", {
      path: "/api/socketio",
    });

    // log socket connection
    socket.on("connect", () => {
      console.log("SOCKET CONNECTED!", socket.id);
      setConnected(true);
    });

    // update chat on new message dispatched
    socket.on("message", (message: IMsg) => {
      chat.push(message);
      setChat([...chat]);
    });

    // socket disconnet onUnmount if exists
    if (socket) return () => socket.disconnect();
  }, []);

  const sendMessage = async () => {
    if (msg) {
      // build message obj
      const message: IMsg = {
        user,
        msg,
      };

      // dispatch message to other users
      const resp = await fetch("https://localhost:3000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      });

      // reset field if OK
      if (resp.ok) setMsg("");
    }

    // focus after click
    inputRef?.current?.focus();
  };

  return (
    <Container maxW="75%" color="white">
      <Box>
        <Heading as="h1">Realtime Chat App</Heading>
        <Heading as="h2">in Next.js and Socket.io</Heading>
      </Box>
      <List spacing={3}>
        {chat.length ? (
          chat.map((chat, i) => (
            <ListItem key={"msg_" + i}>
              <ListIcon as={MdCheckCircle} color="green.500" />
              {chat.user === user ? "Me" : chat.user}: {chat.msg}
            </ListItem>
          ))
        ) : (
          <Box h="5rem" display="flex" alignItems="center">
            No chat messages
          </Box>
        )}
      </List>

      <Box display="flex">
        <Input
          ref={inputRef}
          type="text"
          value={msg}
          placeholder={connected ? "Type a message..." : "Connecting..."}
          disabled={!connected}
          onChange={(e) => {
            setMsg(e.target.value);
          }}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
        />
        <Button onClick={sendMessage} disabled={!connected}>
          SEND
        </Button>
      </Box>
    </Container>
  );
};
