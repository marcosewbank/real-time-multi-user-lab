import { NextApiRequest, NextApiResponse } from "next";
import { createMessage, deleteMessage, getMessages } from "../../lib/messages";

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
  }

  if (method === "POST") {
    const { name, message } = JSON.parse(req.body);

    const newMessage = await createMessage({ data: { name, message } });

    return res.status(201).json({ newMessage });
  }

  if (method === "DELETE") {
    const removedMessage = await deleteMessage(JSON.parse(req.body));

    return res.status(201).json(removedMessage);
  }

  return res.status(404).json({ message: "Rout not found." });
}
