import { signIn } from "@/auth";
import { LogIn } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

export function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <Button type="submit" className="flex items-center gap-1" asChild>
        <Link href={"/api/auth/signin"}>
          <LogIn />
          Signin with Google
        </Link>
      </Button>
    </form>
  );
}
