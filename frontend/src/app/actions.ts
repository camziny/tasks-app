"use server";

import { TaskFormData } from "@/types";

export async function createTaskAction(formData: FormData) {
  const data: TaskFormData = {
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    status: formData.get("status") as string,
    user_id: formData.get("user_id") as string,
  };

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to create task");
    }
  } catch (error) {
    console.error("Error creating task:", error);
    throw new Error("Failed to create task");
  }
}

export async function updateTask(taskId, formData, userId) {
  const updatedData = {
    ...formData,
    user_id: userId,
  };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/tasks/${taskId}/`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    }
  );

  if (!res.ok) {
    const errorData = await res.json();
    console.error("Backend error response:", errorData);
    throw new Error("Failed to update task");
  }

  return res.json();
}

export async function deleteTask(taskId: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/tasks/${taskId}/`,
    {
      method: "DELETE",
    }
  );

  if (!res.ok) {
    const errorData = await res.json();
    console.error("Backend error response:", errorData);
    throw new Error("Failed to delete task");
  }

  return res;
}
