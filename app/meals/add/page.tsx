// app/meals/add/page.tsx
'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddMealPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    calories: "",
    description: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/meals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push("/meals");
      } else {
        alert("Failed to add meal");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to add meal");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Add Meal</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          placeholder="Meal Name"
          value={formData.name}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          name="calories"
          placeholder="Calories"
          type="number"
          value={formData.calories}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          Add
        </button>
      </form>
    </div>
  );
}
