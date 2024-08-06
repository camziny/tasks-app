import UpdateTaskClientForm from "./UpdateTaskClientForm";

export default function TaskListPage({ tasks }) {
  return (
    <div>
      {tasks.length === 0 ? (
        <p className="text-center text-gray-500">No tasks available.</p>
      ) : (
        tasks.map((task) => (
          <div key={task.id} className="bg-white shadow-md rounded-lg p-6 mb-4">
            <h3 className="text-xl font-semibold mb-2">{task.title}</h3>
            <p className="text-gray-700 mb-4">{task.description}</p>
            <div className="flex space-x-4">
              <UpdateTaskClientForm task={task} />
            </div>
          </div>
        ))
      )}
    </div>
  );
}
