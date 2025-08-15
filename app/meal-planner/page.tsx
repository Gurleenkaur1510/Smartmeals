'use client';

import { useEffect, useState } from 'react';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

type Meal = {
  _id?: string;
  title: string;
  image: string;
  calories: number;
  description?: string;
};

const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default function MealPlannerPage() {
  const [allMeals, setAllMeals] = useState<Meal[]>([]);
  const [planner, setPlanner] = useState<Record<string, Meal>>({});
  const router = useRouter();

  // Redirect if not logged in
  useEffect(() => {
    const checkSession = async () => {
      const session = await getSession();
      if (!session) router.push('/auth/signin');
    };
    checkSession();
  }, [router]);

  // Fetch meals
  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const res = await fetch('/api/meals');
        const data = await res.json();
        setAllMeals(data.meals || []);
      } catch (err) {
        console.error('Error fetching meals:', err);
      }
    };
    fetchMeals();
  }, []);

  // Fetch saved planner
  useEffect(() => {
    const fetchPlanner = async () => {
      try {
        const res = await fetch('/api/mealplans');
        const data = await res.json();
        const map: Record<string, Meal> = {};
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data?.plans?.forEach((plan: any) => {
          map[plan.day] = {
            _id: plan._id,
            title: plan.title,
            image: plan.image,
            calories: plan.calories,
            description: plan.description,
          };
        });
        setPlanner(map);
      } catch (err) {
        console.error('Error loading planner:', err);
      }
    };
    fetchPlanner();
  }, []);

  const assignMeal = async (day: string) => {
    if (!allMeals.length) return;
    const randomMeal = allMeals[Math.floor(Math.random() * allMeals.length)];
    setPlanner((prev) => ({ ...prev, [day]: randomMeal }));

    try {
      await fetch('/api/mealplans', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ day, ...randomMeal }),
      });
    } catch (err) {
      console.error('Failed to save meal plan:', err);
    }
  };

  return (
    <main className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Weekly Meal Planner</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {weekdays.map((day) => (
          <div key={day} className="border p-4 rounded-md bg-white shadow">
            <h2 className="text-xl font-semibold mb-2">{day}</h2>

            {planner[day]?.image && (
              <Image
                src={planner[day].image}
                alt={`Meal for ${day}`}
                width={200}
                height={150}
                className="rounded mb-2"
              />
            )}

            {planner[day]?.title && (
              <p className="text-lg font-medium mb-2">{planner[day].title}</p>
            )}

            <button
              onClick={() => assignMeal(day)}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              {planner[day] ? 'Change Meal' : 'Assign Meal'}
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
