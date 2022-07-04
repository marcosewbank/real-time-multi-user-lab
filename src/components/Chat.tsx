import React, { useEffect, useState } from "react";
import { Box, List, ListIcon, ListItem } from "@chakra-ui/react";
import { useSocket } from "../hooks/useSocket";
import { MdCheckCircle, MdFace } from "react-icons/md";
import Message from "./Message";

interface IMessages {
  messages: IMessage[];
}

interface IMessage {
  id: number;
  name: string;
  message: string;
}

export const Chat = ({ messages }: IMessages) => {
  const [messagesList, setMessageList] = useState<IMessage[]>(messages);

  const { socket, handleSocketPost } = useSocket(
    `http://localhost:3000/${process.env.BASE_URL}` ?? ""
  );

  useEffect(() => {
    if (socket) {
      // update chat on new message dispatched
      socket.on("message", (message: any) => {
        setMessageList((oldState) => {
          return [...oldState, message];
        });
      });
    }
  }, [socket]);

  return (
    <Box p="2rem">
      <List spacing={3}>
        {messagesList.length ? (
          messagesList.map(({ name, message }, i) => (
            <ListItem key={"msg-" + i}>
              <ListIcon as={MdCheckCircle} color="green.500" />
              {name}: {message}
            </ListItem>
          ))
        ) : (
          <Box h="5rem" display="flex" alignItems="center">
            No chat messages
          </Box>
        )}
      </List>
      <Message handleSocketPost={handleSocketPost} />
    </Box>
  );
};
