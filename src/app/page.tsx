import { database } from "@/db/database";

export default async function Home() {
  const allItems = await database.query.room.findMany();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        {allItems.map((item) => (
          <div key={item.userId}>{item.name}</div>
        ))}
      </div>
    </main>
  );
}
