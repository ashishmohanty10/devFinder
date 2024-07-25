"use server";

import { auth } from "@/auth";
import { StreamChat } from "stream-chat";

export async function generateTokenAction() {
  const session = await auth();

  const userId = session?.user?.id ?? "";

  if (!session) {
    throw new Error("No session");
  }
  const api_key = process.env.GET_STREAM_API_KEY!;
  const api_secret = process.env.STREAM_TOKEN_SECRET;

  const serverClient = StreamChat.getInstance(api_key, api_secret);
  const token = serverClient.createToken(userId);

  return token;
}
