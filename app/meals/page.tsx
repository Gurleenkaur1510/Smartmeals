/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function MealsPage() {
  const [meals, setMeals] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const res = await fetch('/api/meals');
        if (!res.ok) {
          throw new Error('Failed to fetch meals');
        }
        const data = await res.json();
        setMeals(data);
      } catch (err) {
        setError('Failed to fetch meals');
      }
    };

    fetchMeals();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">All Meals</h1>

      {error && <p className="text-red-500">{error}</p>}
      {meals.length === 0 && !error && <p>No meals found.</p>}

      <ul className="space-y-2">
        {meals.map((meal: any) => (
          <li key={meal._id} className="border p-4 rounded-md">
            <h2 className="text-xl font-semibold">{meal.name}</h2>
            <p className="text-gray-700">Calories: {meal.calories}</p>
            <p className="text-gray-600">{meal.description}</p>
            <div className="flex gap-2 mt-2">
              <Link
                href={`/meals/edit/${meal._id}`}
                className="bg-yellow-500 text-white px-4 py-1 rounded"
              >
                Edit
              </Link>
              <button
                onClick={async () => {
                  if (confirm("Are you sure you want to delete this meal?")) {
                    const res = await fetch(`/api/meals/${meal._id}`, {
                      method: 'DELETE',
                    });
                    if (res.ok) {
                      setMeals(meals.filter((m: any) => m._id !== meal._id));
                    } else {
                      alert("Failed to delete meal");
                    }
                  }
                }}
                className="bg-red-500 text-white px-4 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
