"use client";
import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

function LoginPageContent() {
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-blue-50 flex items-center justify-center p-6">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-12 w-20 h-20 bg-green-200/30 rounded-full animate-bounce" style={{animationDelay: '0s', animationDuration: '3s'}}></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-blue-200/30 rounded-full animate-bounce" style={{animationDelay: '1s', animationDuration: '4s'}}></div>
        <div className="absolute bottom-40 left-1/3 w-12 h-12 bg-yellow-200/30 rounded-full animate-bounce" style={{animationDelay: '2s', animationDuration: '5s'}}></div>
        <div className="absolute bottom-20 right-12 w-24 h-24 bg-pink-200/30 rounded-full animate-bounce" style={{animationDelay: '0.5s', animationDuration: '3.5s'}}></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="inline-block bg-gradient-to-br from-green-500 to-emerald-600 rounded-full p-6 mb-6 shadow-2xl">
            <img 
              src="https://btjvjemmqwhtoyiifkcn.supabase.co/storage/v1/object/public/puppy-images/public/logo.jpeg" 
              alt="GoldiPuppy Logo" 
              className="w-16 h-16 object-contain"
            />
          </div>
          <h1 className="text-4xl font-black text-gray-800 mb-2">
            <span className="bg-gradient-to-r from-green-600 via-emerald-600 to-blue-600 bg-clip-text text-transparent">
              Welcome!
            </span>
          </h1>
          <p className="text-gray-600 text-lg">Sign in to your GoldiPuppy account</p>
        </div>

        {/* Login Form */}
        <div className="bg-white/90 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-gray-200">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-2xl text-center font-semibold">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                📧 Email Address
              </label>
              <input 
                className="w-full rounded-2xl border-2 border-gray-200 px-6 py-4 focus:outline-none focus:ring-4 focus:ring-green-200 focus:border-green-400 transition-all hover:shadow-lg text-lg text-gray-800" 
                type="email" 
                placeholder="your@email.com" 
                value={email} 
                onChange={e=>setEmail(e.target.value)} 
                required 
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                🔐 Password
              </label>
              <input 
                className="w-full rounded-2xl border-2 border-gray-200 px-6 py-4 focus:outline-none focus:ring-4 focus:ring-green-200 focus:border-green-400 transition-all hover:shadow-lg text-lg text-gray-800" 
                type="password" 
                placeholder="Your password" 
                value={password} 
                onChange={e=>setPassword(e.target.value)} 
                required 
              />
            </div>

            <button 
              disabled={loading} 
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold text-xl py-4 rounded-2xl hover:scale-105 hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 group"
            >
              {loading ? (
                <>
                  <span className="animate-spin">⏳</span>
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <span className="group-hover:animate-bounce">🚀</span>
                  <span>Sign In</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600 mb-4">Don't have an account?</p>
            <Link 
              href="/auth/register" 
              className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold px-8 py-3 rounded-2xl hover:scale-105 hover:shadow-xl transition-all duration-300"
            >
              ✨ Create Account
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500">
          <p className="text-sm">© 2025 GoldiPuppy. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-emerald-50 to-blue-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <LoginPageContent />
    </Suspense>
  );
}


