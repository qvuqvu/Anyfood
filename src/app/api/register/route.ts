import { NextResponse } from "next/server";
import { NextApiRequest } from "next";
import { NextApiResponse } from "next";
import { NextRequest } from "next/server";

export default async function registerHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    phoneNumber,
    birthDay,
  } = req.body;

  const apiUrl = "http://localhost:2002/api/v1/user/register/email";

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      phoneNumber,
      birthDay,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    return res.status(response.status).json(errorData);
  }

  res.status(200).json({ message: "Registration successful" });
}
