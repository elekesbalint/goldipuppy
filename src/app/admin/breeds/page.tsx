"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import AdminProtectedRoute from "@/components/AdminProtectedRoute";

interface Breed {
  id: string;
  name: string;
  slug: string;
  description: string;
  image?: string;
  size?: string;
  temperament?: string;
  lifespan?: string;
  exercise?: string;
  grooming?: string;
  training?: string;
}

export default function AdminBreedsPage() {
  const [breeds, setBreeds] = useState<Breed[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingBreed, setEditingBreed] = useState<Breed | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState<Partial<Breed>>({
    name: '',
    description: '',
    image: '',
    size: 'Medium',
    temperament: '',
    lifespan: '10-15 years',
    exercise: 'Moderate',
    grooming: 'Moderate',
    training: 'Easy',
  });

  // Load breeds
  useEffect(() => {
    loadBreeds();
  }, []);

  const loadBreeds = async () => {
    try {
      const response = await fetch('/api/admin/breeds');
      const data = await response.json();
      setBreeds(data);
    } catch (error) {
      console.error('Failed to load breeds:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const url = '/api/admin/breeds';
      const method = editingBreed ? 'PUT' : 'POST';
      
      const dataToSend = editingBreed 
        ? { ...formData, id: editingBreed.id }
        : formData;

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        await loadBreeds();
        resetForm();
        alert(editingBreed ? 'Fajta frissítve!' : 'Fajta hozzáadva!');
      }
    } catch (error) {
      console.error('Failed to save breed:', error);
      alert('Hiba történt a mentés során');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Biztosan törölni szeretnéd ezt a fajtát?')) return;

    try {
      const response = await fetch(`/api/admin/breeds?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await loadBreeds();
        alert('Fajta törölve!');
      }
    } catch (error) {
      console.error('Failed to delete breed:', error);
      alert('Hiba történt a törlés során');
    }
  };

  const handleEdit = (breed: Breed) => {
    setEditingBreed(breed);
    setFormData(breed);
    setShowForm(true);
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingBreed(null);
    setFormData({
      name: '',
      description: '',
      image: '',
      size: 'Medium',
      temperament: '',
      lifespan: '10-15 years',
      exercise: 'Moderate',
      grooming: 'Moderate',
      training: 'Easy',
    });
  };

  if (isLoading) {
    return (
      <AdminProtectedRoute>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-xl text-gray-600">Betöltés...</div>
        </div>
      </AdminProtectedRoute>
    );
  }

  return (
    <AdminProtectedRoute>
      <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <Link href="/admin" className="text-orange-600 hover:text-orange-700 mb-2 inline-block">
              ← Vissza az Admin Panelra
            </Link>
            <h1 className="text-4xl font-bold text-gray-900">Fajták kezelése</h1>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors font-semibold"
          >
            {showForm ? 'Mégse' : '+ Új fajta'}
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {editingBreed ? 'Fajta szerkesztése' : 'Új fajta hozzáadása'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fajta neve *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="pl. Golden Retriever"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Leírás *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Rövid leírás a fajtáról..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Kép (opcionális)
                </label>
                <div className="space-y-2">
                  {formData.image && (
                    <img src={formData.image} alt="preview" className="w-32 h-32 object-cover rounded" />
                  )}
                  <div className="flex items-center gap-3">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        setIsUploading(true);
                        try {
                          const fd = new FormData();
                          fd.append('file', file);
                          fd.append('folder', 'public');
                          const res = await fetch('/api/admin/upload', { method: 'POST', body: fd });
                          const data = await res.json();
                          if (res.ok) {
                            setFormData({ ...formData, image: data.url });
                          } else {
                            alert(data.error || 'Feltöltési hiba');
                          }
                        } finally {
                          setIsUploading(false);
                        }
                      }}
                      className="block w-full text-sm text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
                    />
                    <span className="text-sm text-gray-500">{isUploading ? 'Feltöltés...' : ''}</span>
                  </div>
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="vagy illeszd be az URL-t"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Méret
                  </label>
                  <select
                    value={formData.size}
                    onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="Toy">Toy (1-7 kg)</option>
                    <option value="Small">Small (7-15 kg)</option>
                    <option value="Medium">Medium (15-25 kg)</option>
                    <option value="Large">Large (25-45 kg)</option>
                    <option value="Giant">Giant (45+ kg)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Élettartam
                  </label>
                  <input
                    type="text"
                    value={formData.lifespan}
                    onChange={(e) => setFormData({ ...formData, lifespan: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="pl. 10-15 years"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Testmozgás igény
                  </label>
                  <select
                    value={formData.exercise}
                    onChange={(e) => setFormData({ ...formData, exercise: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="Low">Alacsony</option>
                    <option value="Moderate">Közepes</option>
                    <option value="High">Magas</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ápolási igény
                  </label>
                  <select
                    value={formData.grooming}
                    onChange={(e) => setFormData({ ...formData, grooming: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="Low">Alacsony</option>
                    <option value="Moderate">Közepes</option>
                    <option value="High">Magas</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Taníthatóság
                  </label>
                  <select
                    value={formData.training}
                    onChange={(e) => setFormData({ ...formData, training: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="Easy">Könnyű</option>
                    <option value="Moderate">Közepes</option>
                    <option value="Difficult">Nehéz</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Temperamentum
                  </label>
                  <input
                    type="text"
                    value={formData.temperament}
                    onChange={(e) => setFormData({ ...formData, temperament: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="pl. Friendly, Loyal, Playful"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition-colors font-semibold"
                >
                  {editingBreed ? 'Frissítés' : 'Hozzáadás'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors font-semibold"
                >
                  Mégse
                </button>
              </div>
            </form>
          </div>
        )}

        {/* List */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              Összes fajta ({breeds.length})
            </h2>
          </div>
          
          {breeds.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              Még nincsenek fajták. Kattints az "Új fajta" gombra a hozzáadáshoz!
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {breeds.map((breed) => (
                <div key={breed.id} className="p-6 hover:bg-gray-50">
                  <div className="flex items-start gap-4">
                    {/* Image */}
                    {breed.image && (
                      <img
                        src={breed.image}
                        alt={breed.name}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                    )}
                    
                    {/* Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {breed.name}
                          </h3>
                          <p className="text-sm text-gray-500">
                            Slug: {breed.slug}
                          </p>
                        </div>
                      </div>
                      
                      <p className="mt-2 text-sm text-gray-600">
                        {breed.description}
                      </p>
                      
                      <div className="mt-4 flex gap-2">
                        <button
                          onClick={() => handleEdit(breed)}
                          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm font-medium"
                        >
                          Szerkesztés
                        </button>
                        <button
                          onClick={() => handleDelete(breed.id)}
                          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm font-medium"
                        >
                          Törlés
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
    </AdminProtectedRoute>
  );
}

