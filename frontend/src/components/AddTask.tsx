"use client";
import React, { useState } from "react";
import SubmitButton from "./SubmitButton";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function AddTaskForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "pending",
    user_id: "1",
  });
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

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/tasks/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        toast.success("Task added successfully!");
        router.refresh();
      } else {
        const errorData = await response.json();
        toast.error(`Failed to add task: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error during form submission:", error);
      toast.error("Failed to add task. Please try again.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-gray-800 p-8 border border-gray-700 rounded-md shadow-lg my-5">
      <h1 className="text-2xl font-bold text-white mb-6">Add New Task</h1>
      <form id="task-form" onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-100 mb-1"
          >
            Task Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter task title"
            className="border border-gray-600 bg-gray-100 text-gray-800 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-100 mb-1"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter task description"
            className="border border-gray-600 bg-gray-100 text-gray-800 p-3 rounded w-full h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-100 mb-1"
          >
            Status
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="border border-gray-600 bg-gray-100 text-gray-800 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <SubmitButton formId="task-form" formData={formData} />
      </form>
    </div>
  );
}
