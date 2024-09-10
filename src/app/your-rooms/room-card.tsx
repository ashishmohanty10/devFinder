"use client";

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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Room } from "@/db/schema";
import { GithubIcon, TrashIcon } from "lucide-react";
import { TagsList } from "@/components/tags-list";
import { splitTags } from "@/lib/utils";
import { deleteRoomAction } from "./actions";

export default function YourRoomCard({ room }: { room: Room }) {
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

      <CardFooter className="flex gap-2">
        <Button asChild className="drop-shadow-sm">
          <Link href={`/room/${room.id}`}>Join Room</Link>
        </Button>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              className="drop-shadow-sm flex items-center gap-2"
              variant={"destructive"}
            >
              <TrashIcon className="w-4 h-4" />
              <span className="text-base">Join Room</span>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                room and any data associated with it.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => deleteRoomAction(room.id)}>
                Yes, Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
}
