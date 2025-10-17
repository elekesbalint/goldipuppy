"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { validateCredentials, setAuthToken, generateAuthToken } from "@/lib/auth";

export default function AdminLoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (validateCredentials(formData.username, formData.password)) {
        const token = generateAuthToken();
        setAuthToken(token);
        router.push('/admin');
      } else {
        setError('Helytelen felhasználónév vagy jelszó');
      }
    } catch (err) {
      setError('Hiba történt a bejelentkezés során');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="inline-block bg-gradient-to-br from-orange-500 to-yellow-600 rounded-full p-6 mb-4 shadow-2xl">
            <span className="text-6xl">🐕</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            GoldiPuppy Admin
          </h1>
          <p className="text-gray-600">
            Jelentkezz be az admin panel eléréséhez
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Felhasználónév
              </label>
              <input
                type="text"
                required
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                placeholder="admin"
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Jelszó
              </label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                placeholder="••••••••"
                disabled={isLoading}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-orange-600 to-yellow-600 text-white font-bold py-4 rounded-lg hover:from-orange-700 hover:to-yellow-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Bejelentkezés...' : 'Bejelentkezés'}
            </button>
          </form>
        </div>

        {/* Back to site */}
        <div className="text-center mt-6">
          <a href="/" className="text-orange-600 hover:text-orange-700 text-sm">
            ← Vissza a főoldalra
          </a>
        </div>
      </div>
    </div>
  );
}

