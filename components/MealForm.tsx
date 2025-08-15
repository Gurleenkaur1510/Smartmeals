'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function MealForm({ meal }: { meal?: any }) {
  const router = useRouter();
  const [name, setName] = useState(meal?.name || '');
  const [description, setDescription] = useState(meal?.description || '');
  const [image, setImage] = useState(meal?.image || '');
  const [price, setPrice] = useState(meal?.price || '');

  const isEditing = !!meal;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = isEditing ? 'PUT' : 'POST';
    const url = isEditing ? `/api/meals/${meal._id}` : '/api/meals';
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, description, image, price }),
    });

    if (res.ok) {
      router.push('/dashboard');
    } else {
      alert('Failed to save meal');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
      <h2 className="text-2xl font-bold">{isEditing ? 'Edit Meal' : 'Add Meal'}</h2>
      <input
        type="text"
        placeholder="Meal Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full px-3 py-2 border rounded"
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full px-3 py-2 border rounded"
        required
      />
      <input
        type="url"
        placeholder="Image URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        className="w-full px-3 py-2 border rounded"
        required
      />
      <input
        type="number"
        step="0.01"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="w-full px-3 py-2 border rounded"
        required
      />
      <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
        {isEditing ? 'Update Meal' : 'Add Meal'}
      </button>
    </form>
  );
}
