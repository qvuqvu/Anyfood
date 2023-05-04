import { NextResponse } from "next/server";

import { useSession } from "next-auth/react";
import type { NextApiRequest, NextApiResponse } from "next";
export default async function postListing(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { data: session } = useSession();

  if (!session?.user) {
    return NextResponse.error();
  }
  if (req.method === "POST") {
    // extract the data from the request body
    const { title, content, images, address, tags } = req.body;

    const response = await fetch("http://localhost:2002/api/v1/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        content,
        images,
        address,
        tags,
      }),
    });

    const data = await response.json();

    console.log(data);
    res.status(200).json({ message: "Post created successfully!" });
  } else {
    // return a 405 error for all other request methods
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}
