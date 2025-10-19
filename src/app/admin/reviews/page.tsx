"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import AdminProtectedRoute from '@/components/AdminProtectedRoute';

interface Review {
  id: number;
  puppy_id: string | null;
  puppy_name: string;
  customer_name: string;
  customer_email?: string;
  rating: number;
  review_text: string;
  is_approved: boolean;
  created_at: string;
}

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<number | null>(null);

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    try {
      const response = await fetch('/api/reviews');
      if (response.ok) {
        const data = await response.json();
        setReviews(data);
      }
    } catch (error) {
      console.error('Error loading reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (reviewId: number) => {
    if (!confirm('Biztosan törölni szeretnéd ezt a véleményt?')) {
      return;
    }

    setProcessingId(reviewId);
    try {
      const response = await fetch(`/api/admin/reviews?id=${reviewId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await loadReviews();
        alert('Vélemény sikeresen törölve!');
      } else {
        alert('Hiba történt a törlés során');
      }
    } catch (error) {
      console.error('Error deleting review:', error);
      alert('Hiba történt a törlés során');
    } finally {
      setProcessingId(null);
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < rating ? "text-yellow-400" : "text-gray-300"}>
        ⭐
      </span>
    ));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('hu-HU', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <AdminProtectedRoute>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl animate-spin mb-4">⭐</div>
            <p className="text-xl text-gray-600">Loading reviews...</p>
          </div>
        </div>
      </AdminProtectedRoute>
    );
  }

  return (
    <AdminProtectedRoute>
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-4xl font-bold text-gray-800 mb-2">Vélemények kezelése ⭐</h1>
                <p className="text-gray-600">Nézd meg és töröld a felhasználói véleményeket</p>
              </div>
              <Link
                href="/admin"
                className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition"
              >
                ← Vissza
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white rounded-lg p-6 shadow">
                <div className="text-3xl font-bold text-blue-600">{reviews.length}</div>
                <div className="text-gray-600 font-semibold">Összes vélemény</div>
              </div>
              <div className="bg-green-50 rounded-lg p-6 shadow border-2 border-green-300">
                <div className="text-3xl font-bold text-green-600">
                  {(reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length || 0).toFixed(1)}
                </div>
                <div className="text-gray-600 font-semibold">Átlag értékelés</div>
              </div>
              <div className="bg-yellow-50 rounded-lg p-6 shadow border-2 border-yellow-300">
                <div className="text-3xl font-bold text-yellow-600">
                  {reviews.filter(r => r.rating === 5).length}
                </div>
                <div className="text-gray-600 font-semibold">5 csillagos</div>
              </div>
            </div>
          </div>

          {/* Reviews List */}
          {reviews.length === 0 ? (
            <div className="bg-white rounded-lg p-12 shadow text-center">
              <div className="text-6xl mb-4">📭</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Nincs vélemény</h3>
              <p className="text-gray-600">Még nem érkezett vélemény.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-white rounded-lg p-6 shadow hover:shadow-lg transition border-l-4 border-blue-500"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-xl font-bold text-white">
                          {review.customer_name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-bold text-lg text-gray-800">{review.customer_name}</div>
                          <div className="text-sm text-gray-500">{review.customer_email || 'Nincs email'}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 mb-3">
                        <div className="flex">{renderStars(review.rating)}</div>
                        <span className="text-sm text-gray-500">•</span>
                        <span className="text-sm text-gray-500">{formatDate(review.created_at)}</span>
                        <span className="text-sm text-gray-500">•</span>
                        <span className="text-sm font-semibold text-purple-600">🐕 {review.puppy_name}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <p className="text-gray-700 leading-relaxed">{review.review_text}</p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleDelete(review.id)}
                      disabled={processingId === review.id}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition disabled:opacity-50"
                    >
                      {processingId === review.id ? 'Törlés...' : '🗑 Törlés'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminProtectedRoute>
  );
}

