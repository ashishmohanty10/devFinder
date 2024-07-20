import { database } from "@/db/database";

export default async function Home() {
  const items = await database?.query.testing.findMany();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        {items.map((item) => (
          <div key={item.id}>{item.name}</div>
        ))}
      </div>
    </main>
  );
}
