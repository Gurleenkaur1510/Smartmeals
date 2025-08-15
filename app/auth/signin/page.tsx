'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function SignInPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const router = useRouter();
  const searchParams = useSearchParams();

  const error = searchParams.get('error');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn('credentials', {
      redirect: false,
      email: form.email,
      password: form.password,
    });

    if (res?.ok) {
      router.push('/dashboard');
    } else {
      router.push('/auth/signin?error=InvalidCredentials');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 border rounded shadow bg-white">
      <h2 className="text-3xl font-bold mb-6 text-center">Sign In</h2>
      {error && <p className="text-red-500 text-center mb-4">Invalid email or password</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full mb-4 p-3 border rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full mb-4 p-3 border rounded"
          required
        />
        <button type="submit" className="w-full bg-green-600 text-white p-3 rounded hover:bg-green-700">
          Sign In
        </button>
      </form>
    </div>
  );
}
