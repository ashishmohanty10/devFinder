import { splitTags, TagsList } from "@/components/tags-list";
import { getRoom } from "@/data-access/room";
import { GithubIcon } from "lucide-react";
import Link from "next/link";

interface RoomPageProps {
  params: {
    roomId: string;
  };
}

export default async function RoomPage({ params }: RoomPageProps) {
  const roomId = params.roomId;
  const room = await getRoom(roomId);

  if (!room) {
    return <div>No room of this ID found</div>;
  }

  return (
    <div className="grid grid-cols-4 min-h-screen">
      <div className="col-span-3  pr-1 p-4">
        <div className=" p-4 rounded-lg border bg-card text-card-foreground shadow-sm text-lg">
          Video Player
        </div>
      </div>

      <div className="col-span-1  p-4 pl-2">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4 flex flex-col space-y-5">
          <div className="flex items-center justify-between ">
            <h1 className="text-lg font-medium">{room?.name}</h1>
            {room.githubRepo && (
              <Link
                href={room.githubRepo}
                target="_blank"
                className="flex items-center justify-center gap-2 w-8 h-8 animate-buttonheartbeat  rounded-full"
                rel="noopener noreferrer"
              >
                <GithubIcon />
              </Link>
            )}
          </div>

          <h2 className="text-sm font-normal">{room?.description}</h2>

          <TagsList tags={splitTags(room.tags)} />
        </div>
      </div>
    </div>
  );
}
