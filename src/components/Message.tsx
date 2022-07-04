import React, { useState } from "react";
import { Box, Button, Input } from "@chakra-ui/react";
import { createMessage } from "../lib/messages";

type Props = {};

const Message = (props: any) => {
  const [nickname, setNickName] = useState<string | null>();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const messageInput = event.currentTarget.elements.namedItem(
      "message"
    ) as HTMLInputElement;

    const message = {
      name: nickname ?? "Anonymous",
      message: messageInput.value ?? " ",
    };

    props.handleSocketPost(message);

    await fetch("/api/messages", {
      method: "POST",
      body: JSON.stringify(message),
    });

    messageInput.value = "";
  };

  return (
    <Box display="flex" flexDirection="row">
      {nickname ? (
        <Button
          onClick={() => {
            setNickName(null);
          }}
        >
          {nickname ? nickname : "Anonymous"}
        </Button>
      ) : (
        <Input
          placeholder="Add a nickname"
          maxW="150px"
          mr="0.25rem"
          onBlur={(event) => {
            setNickName(event.target.value);
          }}
        />
      )}
      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection="row">
          <Input
            id="message"
            placeholder="Send your message"
            maxW="300px"
            mr="0.25rem"
            ml="0.25rem"
          />
          <Button type="submit">Send</Button>
        </Box>
      </form>
    </Box>
  );
};

export default Message;
