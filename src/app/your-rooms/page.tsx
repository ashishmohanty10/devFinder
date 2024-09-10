import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CirclePlus, GithubIcon } from "lucide-react";
import { getUserRooms } from "@/data-access/room";
import { auth } from "@/auth";
import YourRoomCard from "./room-card";
import { unstable_noStore } from "next/cache";
import { redirect } from "next/navigation";

export default async function YourRoomPage({
  searchParams,
}: {
  searchParams: {
    search: string;
  };
}) {
  unstable_noStore();
  const session = await auth();

  if (!session) {
    redirect(`/api/auth/signin?callbackUrl=/your-rooms`);
  }
  const rooms = await getUserRooms();
  return (
    <main className="min-h-screen p-16">
      <div className="flex justify-between mb-8">
        <h1 className="text-4xl font-bold">Find Dev Rooms</h1>
        <Button asChild>
          <Link href={"/create-room"} className="flex items-center gap-2">
            <CirclePlus />
            Create Room
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {rooms.map((room) => (
          <YourRoomCard key={room.id} room={room} />
        ))}
      </div>
    </main>
  );
}
