import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface MessagesCreateData {
  data: MessagesCreateInput;
}

interface MessagesCreateInput {
  name: string;
  message: string;
}

export async function getMessages() {
  const messages = await prisma.messages.findMany();

  return messages;
}

export async function createMessage(data: MessagesCreateData) {
  const newMessage = await prisma.messages.create(data);

  return newMessage;
}

export async function deleteMessage(id: number) {
  const newMessage = await prisma.messages.delete({
    where: {
      id,
    },
  });

  return newMessage;
}
