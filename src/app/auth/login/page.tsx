"use client";
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) { setError(error.message); return; }
    const next = searchParams.get('next') || '/dashboard';
    router.push(next);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow p-8">
        <h1 className="text-2xl font-bold mb-6">Login</h1>
        {error && <div className="mb-4 text-sm text-red-600">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input className="w-full border rounded-lg px-4 py-3" type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
          <input className="w-full border rounded-lg px-4 py-3" type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} required />
          <button disabled={loading} className="w-full bg-green-600 text-white font-bold py-3 rounded-lg disabled:opacity-50">{loading? 'Logging in...' : 'Login'}</button>
        </form>
        <p className="mt-4 text-sm">No account? <a href="/auth/register" className="text-green-700 underline">Register</a></p>
      </div>
    </div>
  );
}


