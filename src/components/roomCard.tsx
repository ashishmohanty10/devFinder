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
import { GithubIcon } from "lucide-react";
import { TagsList } from "@/components/tags-list";
import { splitTags } from "@/lib/utils";

export default function RoomCard({ room }: { room: Room }) {
  return (
    <Card className="h-[350px] flex flex-col justify-evenly drop-shadow-md">
      <CardHeader>
        <div>
          <CardTitle>{room.name}</CardTitle>
          <CardDescription className="h-10 text-ellipsis overflow-hidden">
            {room.description}...
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        {room.githubRepo && (
          <Link
            href={room.githubRepo}
            target="_blank"
            className="flex items-center gap-2 w-fit animate-pulse"
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
