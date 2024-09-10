import { auth } from "@/auth";
import { CreateRoomForm } from "./create-room-form";
import { redirect } from "next/navigation";
import { SignIn } from "@/components/sign-in";

export default async function CreateRoomPage() {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    redirect("/api/auth/signin?callbackUrl=/craete-room");
  }

  return (
    <div className="flex flex-col space-y-8">
      <h1 className="text-4xl font-bold pt-12">Create-Room...</h1>

      {user ? <CreateRoomForm /> : <SignIn />}
    </div>
  );
}
