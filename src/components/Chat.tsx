import React, { useEffect, useState } from "react";
import {
  Badge,
  Box,
  Divider,
  List,
  ListIcon,
  ListItem,
} from "@chakra-ui/react";
import { useSocket } from "../hooks/useSocket";
import { MdCheckCircle, MdDeleteForever } from "react-icons/md";
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

  const handleDelete = async (id: number) => {
    setMessageList((oldState) => {
      const newMessages = oldState.filter((message) => id !== message.id);

      return newMessages;
    });

    await fetch("/api/messages", {
      method: "DELETE",
      body: JSON.stringify(id),
    });
  };

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
    <Box>
      <List spacing={3} maxHeight="70vh" overflow="hidden" overflowY="scroll">
        {messagesList.length ? (
          messagesList.map(({ name, message, id }) => (
            <ListItem key={id} mb="0.5rem">
              <Box display="flex" alignItems="center" mb="0.5rem">
                <ListIcon as={MdCheckCircle} color="green.500" />
                <Badge
                  variant="solid"
                  colorScheme="green"
                  borderRadius="sm"
                  padding="0.25rem"
                  mr="0.25rem"
                >
                  {name}
                </Badge>
                : {message}
                <ListIcon
                  as={MdDeleteForever}
                  onClick={() => handleDelete(id)}
                  color="green.500"
                  marginLeft="auto"
                />
              </Box>
              <Divider mb="0.5rem" />
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
