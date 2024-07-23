import { signIn } from "@/auth";
import { Button } from "./ui/button";
import { LogIn } from "lucide-react";

export function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <Button type="submit" className="flex items-center gap-1">
        <LogIn />
        Signin with Google
      </Button>
    </form>
  );
}
