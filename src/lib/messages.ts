import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getMessages() {
  const messages = await prisma.messages.findMany();

  return messages;
}

export async function createMessage(data: { name: string; message: string }) {
  const newMessage = await prisma.messages.create({
    data,
  });

  return newMessage;
}
