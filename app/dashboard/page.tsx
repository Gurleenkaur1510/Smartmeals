// app/dashboard/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react";

type UserType = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role?: string | null;
};
export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<UserType | null>(null);

  const router = useRouter();
  const handleDelete = async (id: string) => {
  if (confirm("Are you sure you want to delete this meal?")) {
    const res = await fetch(`/api/meals/${id}`, { method: 'DELETE' });
    if (res.ok) {
      router.refresh(); // or reload meals
    } else {
      alert("Failed to delete");
    }
  }
};


  useEffect(() => {
    async function checkAuth() {
      const session = await getSession();
      if (!session) {
        router.push("/auth/signin");
      } else {
        setUser(session.user);
      }
      setLoading(false);
    }
    checkAuth();
  }, );

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4 text-center">Welcome, {user?.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border rounded p-4 shadow hover:shadow-md transition">
          <h2 className="text-xl font-semibold">📅 Meal Planner</h2>
          <p className="text-gray-600">Plan your weekly meals easily.</p>
          <button
            className="mt-2 bg-green-600 text-white px-4 py-2 rounded"
            onClick={() => router.push("/meal-planner")}
          >
            Open Planner
          </button>
        </div>

        <div className="border rounded p-4 shadow hover:shadow-md transition">
          <h2 className="text-xl font-semibold">🍱 Manage Meals</h2>
          <p className="text-gray-600">Create, update, or delete meals.</p>
          <button
            className="mt-2 bg-blue-600 text-white px-4 py-2 rounded"
            onClick={() => router.push("/meals")}
          >
            View Meals
          </button>
        </div>
      </div>
    </div>
  );
}
