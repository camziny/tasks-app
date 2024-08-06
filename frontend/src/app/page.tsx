import TaskListPage from "@/components/TaskList";
import Link from "next/link";

async function getData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks/`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Page() {
  const data = await getData();

  return (
    <main>
      <div className="p-2 bg-gray-500 text-white text-center">
        <Link href="/add-task">Add a Task</Link>
      </div>
      <TaskListPage tasks={data} />
    </main>
  );
}
