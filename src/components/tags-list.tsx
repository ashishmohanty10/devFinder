"use client";

import { useRouter } from "next/navigation";
import { Badge } from "./ui/badge";

export function TagsList({ tags }: { tags: string[] }) {
  const router = useRouter();
  return (
    <div className="flex gap-2 flex-wrap">
      {tags.map((tags) => (
        <Badge
          className="w-fit"
          key={tags}
          onClick={() => {
            router.push(`/?search=${tags}`);
          }}
          tabIndex={0}
          role="button"
        >
          {tags}
        </Badge>
      ))}
    </div>
  );
}
