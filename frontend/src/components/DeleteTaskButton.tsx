import { deleteTask } from "@/app/actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function DeleteTaskButton({ taskId }) {
  const router = useRouter();

  const handleDelete = async (event: any) => {
    event.preventDefault();

    try {
      await deleteTask(taskId);
      toast.success("Task deleted successfully!");
      router.refresh();
    } catch (error) {
      console.error("Error during delete:", error);
      toast.error("Failed to delete task. Please try again.");
    }
  };

  return (
    <button
      onClick={handleDelete}
      type="button"
      className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
    >
      Delete
    </button>
  );
}
