"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function UpdateButton({ isSubmitting }) {
  return (
    <button
      type="submit"
      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      disabled={isSubmitting}
    >
      {isSubmitting ? "Updating..." : "Update Task"}
    </button>
  );
}
