import React, { useEffect, useState } from "react";
import { Box, Button, Input, List, ListIcon, ListItem } from "@chakra-ui/react";
import { useSocket } from "../hooks/useSocket";
import { MdCheckCircle } from "react-icons/md";

export const Test = () => {
  const [messageList, setMessageList] = useState<string[]>([]);
  const { socket, handleSocketPost } = useSocket(
    `http://localhost:3000/${process.env.BASE_URL}` ?? ""
  );

  useEffect(() => {
    if (socket) {
      // update chat on new message dispatched
      socket.on("message", (message: any) => {
        console.log(
          "🚀 ~ file: useSocket.tsx ~ line 20 ~ useEffect ~ message",
          message
        );

        setMessageList((oldState) => {
          return [...oldState, message];
        });
      });
    }
  }, [socket]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const messageInput = event.currentTarget.elements.namedItem(
      "message"
    ) as HTMLInputElement;

    handleSocketPost(messageInput.value);

    messageInput.value = "";
  };

  return (
    <Box>
      <List spacing={3}>
        {messageList.length ? (
          messageList.map((chat, i) => (
            <ListItem key={"msg_" + i}>
              <ListIcon as={MdCheckCircle} color="green.500" />
              {chat}
              {/* {chat.user === user ? "Me" : chat.user}: {chat.msg} */}
            </ListItem>
          ))
        ) : (
          <Box h="5rem" display="flex" alignItems="center">
            No chat messages
          </Box>
        )}
      </List>
      <form onSubmit={handleSubmit}>
        <Input id="message" placeholder="Send your message" />
        <Button type="submit">Send</Button>
      </form>
    </Box>
  );
};
