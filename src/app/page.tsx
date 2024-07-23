import { Button } from "@/components/ui/button";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Room } from "@/db/schema";
import { CirclePlus, GithubIcon } from "lucide-react";
import { getRooms } from "@/data-access/room";
import { auth } from "@/auth";
import { SignIn } from "@/components/sign-in";
import { splitTags, TagsList } from "@/components/tags-list";

function RoomCard({ room }: { room: Room }) {
  return (
    <Card className="h-[350px] flex flex-col justify-evenly drop-shadow-md">
      <CardHeader>
        <CardTitle>{room.name}</CardTitle>
        <CardDescription className="h-10 text-ellipsis overflow-hidden">
          {room.description}...
        </CardDescription>
      </CardHeader>
      <CardContent>
        {room.githubRepo && (
          <Link
            href={room.githubRepo}
            target="_blank"
            className="flex items-center gap-2"
            rel="noopener noreferrer"
          >
            <GithubIcon />
            <span className="text-sm">Github Link</span>
          </Link>
        )}
      </CardContent>

      <CardContent>
        <TagsList tags={splitTags(room.tags)} />
      </CardContent>

      <CardFooter>
        <Button asChild className="drop-shadow-sm">
          <Link href={`/room/${room.id}`}>Join Room</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export default async function Home() {
  const rooms = await getRooms();

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
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {rooms.map((room) => (
          <RoomCard key={room.id} room={room} />
        ))}
      </div>
    </main>
  );
}
