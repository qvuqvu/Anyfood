import { authOptions } from './../../../pages/api/auth/[...nextauth]';

import { getServerSession } from "next-auth/next"
import type { NextApiRequest, NextApiResponse } from 'next'
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions)
  if (!session?.user?.email) {
    return null;
  }

  const email = session.user.email;

  res.status(200).json({ email });
}
