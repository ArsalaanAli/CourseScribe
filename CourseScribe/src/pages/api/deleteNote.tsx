import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "~/server/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST":
      try {
        return await DeleteNote(req, res);
      } catch (error) {
        return res.status(400);
      }
    default:
      return res.status(405).json({ message: "Method not allowed" });
  }
}

const DeleteNote = async (req: NextApiRequest, res: NextApiResponse) => {
  const body = JSON.parse(req.body);
  const notes = await prisma.notes.delete({
    where: { noteId: body["note"] },
  });
  return res.status(200).json({ data: notes });
};
