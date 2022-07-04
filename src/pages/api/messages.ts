import { NextApiRequest, NextApiResponse } from "next-api";
import { createMessage, getMessages } from "../../lib/messages";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  if (method === "GET") {
    const messages = await getMessages();

    return res.status(200).json({
      data: messages,
    });
  } else if (method === "POST") {
    const { name, message } = req.body;

    const newMessage = await createMessage({ name, message });
    console.log("🚀 ~ file: messages.ts ~ line 20 ~ newMessage", newMessage);

    return res.status(201).json({ newMessage });
  }

  return res.status(404).json({ message: "Rout not found." });
}
