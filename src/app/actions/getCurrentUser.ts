import { getServerSession } from "next-auth/next";

import { authOptions } from "@/pages/api/auth/[...nextauth]";

export async function getSession() {
  return await getServerSession(authOptions);
}

export default async function getCurrentUser() {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }

    const currentUser = await fetch("/api/currentUser");
    const data = await currentUser.json();
    // if (!currentUser) {
    //   return null;
    // }
    return data;
  
  } catch (error: any) {
    return null;
  }
}
