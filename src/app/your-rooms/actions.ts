"use server";

import { auth } from "@/auth";
import { deleteRoom, getRoom } from "@/data-access/room";
import { revalidatePath } from "next/cache";

export async function deleteRoomAction(roomId: string) {
  const session = await auth();

  if (!session) {
    throw new Error("User not authenticated");
  }

  const room = await getRoom(roomId);
  // sis the user create this room
  if (room?.userId !== session.user?.id) {
    throw new Error("User not authenticated");
  }
  await deleteRoom(roomId);

  revalidatePath("/your-rooms");
}
