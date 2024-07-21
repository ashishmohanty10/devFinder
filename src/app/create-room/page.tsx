import { CreateRoomForm } from "./create-room-form";

export default function CreateRoomPage() {
  return (
    <div className="flex flex-col space-y-8">
      <h1 className="text-4xl font-bold pt-12">Create-Room...</h1>

      <CreateRoomForm />
    </div>
  );
}
