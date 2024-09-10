import { auth } from "@/auth";
import { database } from "@/db/database";
import { room } from "@/db/schema";
import { eq, like } from "drizzle-orm";

export async function getRooms(search: string | undefined) {
  const where = search ? like(room.tags, `%${search}%`) : undefined;
  const rooms = await database.query.room.findMany({
    where,
  });
  return rooms;
}

export async function getUserRooms() {
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
  return await database.query.room.findFirst({
    where: eq(room.id, roomId),
  });
}

export async function deleteRoom(roomId: string) {
  await database.delete(room).where(eq(room.id, roomId));
}
