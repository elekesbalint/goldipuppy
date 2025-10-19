"use client";
import { useState } from "react";
import Link from "next/link";
import AdminProtectedRoute from "@/components/AdminProtectedRoute";
import { clearAuthToken } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();

  const handleLogout = () => {
    clearAuthToken();
    router.push('/admin/login');
  };

  return (
    <AdminProtectedRoute>
      <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Admin Panel
            </h1>
            <p className="text-gray-600">
              Kezeld a kiskutyákat és fajtákat egyszerűen
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors font-semibold"
          >
            Kijelentkezés
          </button>
        </div>

        {/* Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Link
            href="/admin/puppies"
            className="block p-8 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border-2 border-transparent hover:border-orange-500"
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mr-4">
                <span className="text-2xl">🐕</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Kiskutyák</h2>
            </div>
            <p className="text-gray-600">
              Kiskutyák hozzáadása, szerkesztése és törlése
            </p>
          </Link>

          <Link
            href="/admin/breeds"
            className="block p-8 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border-2 border-transparent hover:border-orange-500"
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mr-4">
                <span className="text-2xl">📋</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Fajták</h2>
            </div>
            <p className="text-gray-600">
              Kutyafajták kezelése és leírásuk szerkesztése
            </p>
          </Link>
        </div>

        {/* Quick Links */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Gyors linkek
          </h3>
          <div className="space-y-2">
            <Link
              href="/"
              className="block text-orange-600 hover:text-orange-700 hover:underline"
            >
              ← Vissza a weboldalra
            </Link>
            <Link
              href="/puppies"
              className="block text-orange-600 hover:text-orange-700 hover:underline"
            >
              Kiskutyák oldal megtekintése
            </Link>
            <Link
              href="/breeds"
              className="block text-orange-600 hover:text-orange-700 hover:underline"
            >
              Fajták oldal megtekintése
            </Link>
          </div>
        </div>
      </div>
    </div>
    </AdminProtectedRoute>
  );
}

