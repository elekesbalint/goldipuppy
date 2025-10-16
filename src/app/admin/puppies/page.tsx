"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import AdminProtectedRoute from "@/components/AdminProtectedRoute";

interface Puppy {
  id: string;
  name: string;
  breed: string;
  breedSlug: string;
  price: number;
  status: 'available' | 'reserved' | 'sold';
  gender: 'Male' | 'Female';
  age: string;
  size: 'Toy' | 'Small' | 'Large';
  location: string;
  description: string;
  image: string;
  featured: boolean;
}

export default function AdminPuppiesPage() {
  const [puppies, setPuppies] = useState<Puppy[]>([]);
  const [breeds, setBreeds] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingPuppy, setEditingPuppy] = useState<Puppy | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState<Partial<Puppy>>({
    name: '',
    breed: '',
    breedSlug: '',
    price: 0,
    status: 'available',
    gender: 'Male',
    age: '',
    size: 'Small',
    location: '',
    description: '',
    image: '',
    featured: false,
  });

  // Load puppies and breeds
  useEffect(() => {
    loadPuppies();
    loadBreeds();
  }, []);

  const loadBreeds = async () => {
    try {
      const response = await fetch('/api/admin/breeds');
      const data = await response.json();
      setBreeds(data);
    } catch (error) {
      console.error('Failed to load breeds:', error);
    }
  };

  const loadPuppies = async () => {
    try {
      const response = await fetch('/api/admin/puppies');
      const data = await response.json();
      setPuppies(data);
    } catch (error) {
      console.error('Failed to load puppies:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const url = '/api/admin/puppies';
      const method = editingPuppy ? 'PUT' : 'POST';
      
      const dataToSend = editingPuppy 
        ? { ...formData, id: editingPuppy.id }
        : formData;

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        await loadPuppies();
        resetForm();
        alert(editingPuppy ? 'Kiskutya frissítve!' : 'Kiskutya hozzáadva!');
      }
    } catch (error) {
      console.error('Failed to save puppy:', error);
      alert('Hiba történt a mentés során');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Biztosan törölni szeretnéd ezt a kiskutyát?')) return;

    try {
      const response = await fetch(`/api/admin/puppies?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await loadPuppies();
        alert('Kiskutya törölve!');
      }
    } catch (error) {
      console.error('Failed to delete puppy:', error);
      alert('Hiba történt a törlés során');
    }
  };

  const handleEdit = (puppy: Puppy) => {
    setEditingPuppy(puppy);
    setFormData(puppy);
    setShowForm(true);
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingPuppy(null);
    setFormData({
      name: '',
      breed: '',
      breedSlug: '',
      price: 0,
      status: 'available',
      gender: 'Male',
      age: '',
      size: 'Small',
      location: '',
      description: '',
      image: '',
      featured: false,
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
            <h1 className="text-4xl font-bold text-gray-900">Kiskutyák kezelése</h1>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors font-semibold"
          >
            {showForm ? 'Mégse' : '+ Új kiskutya'}
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {editingPuppy ? 'Kiskutya szerkesztése' : 'Új kiskutya hozzáadása'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Név *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Fajta *
                  </label>
                  <select
                    required
                    value={formData.breed}
                    onChange={(e) => {
                      const selectedBreed = breeds.find(b => b.name === e.target.value);
                      if (selectedBreed) {
                        setFormData({ 
                          ...formData, 
                          breed: selectedBreed.name, 
                          breedSlug: selectedBreed.slug 
                        });
                      }
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="">Válassz fajtát...</option>
                    {breeds.map((breed) => (
                      <option key={breed.id} value={breed.name}>
                        {breed.name}
                      </option>
                    ))}
                  </select>
                  {breeds.length === 0 && (
                    <p className="text-sm text-red-600 mt-1">
                      Nincs fajta! Először adj hozzá fajtákat az{' '}
                      <Link href="/admin/breeds" className="underline">
                        admin/breeds
                      </Link>{' '}
                      oldalon.
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ár (USD) *
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Státusz *
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="available">Elérhető</option>
                    <option value="reserved">Lefoglalva</option>
                    <option value="sold">Eladva</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nem *
                  </label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="Male">Hím</option>
                    <option value="Female">Nőstény</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Életkor *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="pl. 8 weeks"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Méret *
                  </label>
                  <select
                    value={formData.size}
                    onChange={(e) => setFormData({ ...formData, size: e.target.value as any })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="Toy">Toy</option>
                    <option value="Small">Kicsi</option>
                    <option value="Large">Nagy</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Helyszín *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Kép
                </label>
                <div className="space-y-2">
                  {formData.image && (
                    <div className="flex items-center gap-3">
                      <img src={formData.image} alt="preview" className="w-32 h-32 object-cover rounded" />
                      <button
                        type="button"
                        onClick={async () => {
                          if (!formData.image) return;
                          if (!confirm('Biztosan törlöd a képet a tárhelyről is?')) return;
                          try {
                            const res = await fetch('/api/admin/upload', {
                              method: 'DELETE',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify({ url: formData.image }),
                            });
                            if (!res.ok) {
                              const data = await res.json().catch(() => ({} as any));
                              alert(data.error || 'Törlési hiba');
                              return;
                            }
                            setFormData({ ...formData, image: '' });
                          } catch (e) {
                            alert('Törlési hiba');
                          }
                        }}
                        className="px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-xs font-medium"
                      >
                        Kép törlése
                      </button>
                    </div>
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
                    {formData.image && (
                      <button
                        type="button"
                        onClick={() => {
                          // Replace: simply trigger file picker by clicking the input
                          // Users can pick a new file; previous image can be left as-is or deleted first.
                          // We programmatically focus the input for better UX.
                          (document.activeElement as HTMLElement)?.blur();
                        }}
                        className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-xs font-medium"
                      >
                        Kép cseréje
                      </button>
                    )}
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Leírás *
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                />
                <label htmlFor="featured" className="ml-2 text-sm text-gray-700">
                  Kiemelt kiskutya
                </label>
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition-colors font-semibold"
                >
                  {editingPuppy ? 'Frissítés' : 'Hozzáadás'}
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
              Összes kiskutya ({puppies.length})
            </h2>
          </div>
          
          {puppies.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              Még nincsenek kiskutyák. Kattints az "Új kiskutya" gombra a hozzáadáshoz!
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {puppies.map((puppy) => (
                <div key={puppy.id} className="p-6 hover:bg-gray-50">
                  <div className="flex items-start gap-4">
                    {/* Image */}
                    <img
                      src={puppy.image}
                      alt={puppy.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    
                    {/* Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {puppy.name}
                            {puppy.featured && (
                              <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                                ⭐ Kiemelt
                              </span>
                            )}
                          </h3>
                          <p className="text-gray-600">{puppy.breed}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold text-orange-600">
                            ${puppy.price}
                          </p>
                          <span className={`inline-block px-2 py-1 text-xs rounded ${
                            puppy.status === 'available' ? 'bg-green-100 text-green-800' :
                            puppy.status === 'reserved' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {puppy.status === 'available' ? 'Elérhető' :
                             puppy.status === 'reserved' ? 'Lefoglalva' : 'Eladva'}
                          </span>
                        </div>
                      </div>
                      
                      <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-gray-600">
                        <div>👤 {puppy.gender === 'Male' ? 'Hím' : 'Nőstény'}</div>
                        <div>📅 {puppy.age}</div>
                        <div>📏 {puppy.size}</div>
                        <div>📍 {puppy.location}</div>
                      </div>
                      
                      <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                        {puppy.description}
                      </p>
                      
                      <div className="mt-4 flex gap-2">
                        <button
                          onClick={() => handleEdit(puppy)}
                          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm font-medium"
                        >
                          Szerkesztés
                        </button>
                        <button
                          onClick={() => handleDelete(puppy.id)}
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

