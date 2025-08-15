'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function EditMealPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id?.toString();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    calories: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    const fetchMeal = async () => {
      try {
        const res = await fetch(`/api/meals/${id}`);
        if (!res.ok) throw new Error('Failed to fetch meal');
        const data = await res.json();
        setFormData({
          name: data.name,
          description: data.description,
          calories: data.calories.toString(),
        });
      } catch (err) {
        setError('Failed to fetch meal');
      }
    };

    fetchMeal();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`/api/meals/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Failed to update meal');
      router.push('/meals');
    } catch (err) {
      setError('Failed to update meal');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Meal</h1>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Meal Name"
          className="w-full p-2 border"
          required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full p-2 border"
          required
        />
        <input
          type="number"
          name="calories"
          value={formData.calories}
          onChange={handleChange}
          placeholder="Calories"
          className="w-full p-2 border"
          required
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? 'Updating...' : 'Update Meal'}
        </button>
      </form>
    </div>
  );
}
