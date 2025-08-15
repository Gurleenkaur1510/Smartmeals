/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function MealPlannerPage() {
  const [plans, setPlans] = useState<any>({});
  const [meals, setMeals] = useState([]);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  useEffect(() => {
    fetchPlans();
    fetchMeals();
  }, []);

  async function fetchPlans() {
    const res = await fetch('/api/meal-plans');
    const data = await res.json();
    const mapped = Object.fromEntries(data.map((p: any) => [p.day, p.mealId]));
    setPlans(mapped);
  }

  async function fetchMeals() {
    const res = await fetch('/api/meals');
    const data = await res.json();
    setMeals(data);
  }

  async function assignMeal(day: string, mealId: string) {
    await axios.post('/api/mealplans', { day, mealId });
    fetchPlans();
    setSelectedDay(null);
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Weekly Meal Planner</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {weekdays.map(day => (
          <div key={day} className="border p-4 rounded shadow">
            <h2 className="font-semibold">{day}</h2>
            {plans[day] ? (
              <>
                <img src={plans[day].image} alt={plans[day].name} className="h-24 w-24 object-cover" />
                <p>{plans[day].name}</p>
                <button onClick={() => setSelectedDay(day)} className="mt-2 bg-green-600 text-white px-3 py-1 rounded">
                  Change Meal
                </button>
              </>
            ) : (
              <button onClick={() => setSelectedDay(day)} className="mt-2 bg-green-600 text-white px-3 py-1 rounded">
                Assign Meal
              </button>
            )}

            {selectedDay === day && (
              <div className="mt-2">
                <select onChange={(e) => assignMeal(day, e.target.value)} className="w-full">
                  <option value="">Select a meal</option>
                  {meals.map((meal: any) => (
                    <option key={meal._id} value={meal._id}>{meal.name}</option>
                  ))}
                </select>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
