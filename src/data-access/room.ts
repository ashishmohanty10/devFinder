import { auth } from "@/auth";
import { database } from "@/db/database";
import { room } from "@/db/schema";
import { eq, like } from "drizzle-orm";
import { unstable_noStore } from "next/cache";

export async function getRooms(search: string | undefined) {
  unstable_noStore;
  const where = search ? like(room.tags, `%${search}%`) : undefined;
  const rooms = await database.query.room.findMany({
    where,
  });
  return rooms;
}

export async function getUserRooms() {
  unstable_noStore;
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    throw new Error("userId is not found");
  }

  if (!session) {
    throw new Error("You must be logged in to create this room");
  }

  const rooms = await database.query.room.findMany({
    where: eq(room.userId, userId),
  });
  return rooms;
}

export async function getRoom(roomId: string) {
  unstable_noStore;

  return await database.query.room.findFirst({
    where: eq(room.id, roomId),
  });
}

export async function DeleteRoomAction(roomId: string) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    throw new Error("userId is not found");
  }

  await database.delete(room).where(eq(room.id, roomId));
}
