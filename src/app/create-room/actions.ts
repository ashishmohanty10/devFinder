"use server";

import { Room, room } from "@/db/schema";
import { database } from "@/db/database";
import { auth } from "@/auth";

export async function createRoomAction(roomData: Omit<Room, "id" | "userId">) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    throw new Error("userId is not found");
  }

  if (!session) {
    throw new Error("You must be looged in to create this room");
  }

  await database?.insert(room).values({
    ...roomData,
    userId: userId,
  });
}
