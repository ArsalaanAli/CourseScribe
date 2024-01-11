import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "~/server/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST":
      return await GetData(req, res);
    default:
      return res.status(405).json({ message: "Method not allowed" });
  }
}

const GetData = async (req: NextApiRequest, res: NextApiResponse) => {
  const body = JSON.parse(req.body);
  const notes = await prisma.notes.findMany({
    where: { userId: body["user"] },
  });
  return res.status(200).json({ data: notes });
};
