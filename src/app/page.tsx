import { Button } from "@/components/ui/button";
import Link from "next/link";

import { CirclePlus, GithubIcon } from "lucide-react";
import { getRooms } from "@/data-access/room";
import { auth } from "@/auth";
import { SignIn } from "@/components/sign-in";
import { SearchBar } from "./Search-bar";
import RoomCard from "@/components/roomCard";

export default async function Home({
  searchParams,
}: {
  searchParams: {
    search: string;
  };
}) {
  const rooms = await getRooms(searchParams.search);

  const session = await auth();

  if (!session) {
    return (
      <div className="p-12 flex flex-col items-center">
        <h1>Please Sign In to create and Join Rooms</h1>
        <SignIn />
      </div>
    );
  }
  return (
    <main className="min-h-screen p-16">
      <div className="flex justify-between mb-8">
        <h1 className="text-4xl font-bold">Find Dev Rooms</h1>
        <Button asChild>
          <Link href={"/create-room"} className="flex items-center gap-2">
            <CirclePlus />
            <>Create Room</>
          </Link>
        </Button>
      </div>

      <SearchBar />

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {rooms.map((room) => (
          <RoomCard key={room.id} room={room} />
        ))}
      </div>
    </main>
  );
}
