import React from "react";
import { createTaskAction } from "@/app/actions";
import SubmitButton from "./SubmitButton";

export default function TaskForm() {
  return (
    <div className="max-w-2xl mx-auto bg-gray-800 p-8 border border-gray-700 rounded-md shadow-lg my-5">
      <h1 className="text-2xl font-bold text-white mb-6">Task Creation Form</h1>
      <form id="task-form" action={createTaskAction} className="space-y-6">
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
            placeholder="Enter task title"
            className="border border-gray-600 bg-stone-100 text-gray-800 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            placeholder="Enter task description"
            className="border border-gray-600 bg-stone-100 text-gray-800 p-3 rounded w-full h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            className="border border-gray-600 bg-stone-100 text-gray-800 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <input type="hidden" name="user_id" value="1" />{" "}
        <SubmitButton formId="task-form" />
      </form>
    </div>
  );
}
