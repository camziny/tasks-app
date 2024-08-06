"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import UpdateButton from "./UpdateButton";
import { toast } from "sonner";
import { updateTask } from "@/app/actions";
import DeleteTaskButton from "./DeleteTaskButton";

export default function UpdateTaskClientForm({ task }) {
  const [formData, setFormData] = useState({
    title: task.title,
    description: task.description,
    status: task.status,
    user_id: task.user_id,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      await updateTask(task.id, formData, formData.user_id);
      toast.success("Task updated successfully!");
      router.refresh();
    } catch (error) {
      console.error("Error during update:", error);
      toast.error("Failed to update task. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          required
        />
      </div>
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          rows={3}
          required
        />
      </div>
      <div>
        <label
          htmlFor="status"
          className="block text-sm font-medium text-gray-700"
        >
          Status
        </label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          required
        >
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <UpdateButton isSubmitting={isSubmitting} />
      <DeleteTaskButton taskId={task.id} />
    </form>
  );
}
