async function getData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks/`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Page() {
  const data = await getData();
  console.log("data", data);

  return (
    <main>
      <h1>Task List</h1>
      <ul>
        {data.map((task: any) => (
          <li key={task.id}>
            {task.title} - {task.status}
          </li>
        ))}
      </ul>
    </main>
  );
}
