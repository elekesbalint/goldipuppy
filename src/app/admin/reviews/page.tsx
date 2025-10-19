"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Review {
  id: number;
  puppy_id: string | null; // UUID string
  puppy_name: string;
  customer_name: string;
  customer_email?: string;
  rating: number;
  review_text: string;
  is_approved: boolean;
  created_at: string;
  approved_at?: string;
  approved_by?: string;
}

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved'>('pending');
  const [processingId, setProcessingId] = useState<number | null>(null);

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/admin/reviews', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setReviews(data);
      } else {
        console.error('Failed to load reviews');
      }
    } catch (error) {
      console.error('Error loading reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (reviewId: number) => {
    setProcessingId(reviewId);
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/admin/reviews', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          id: reviewId,
          is_approved: true,
        }),
      });

      if (response.ok) {
        await loadReviews();
        alert('Review approved successfully!');
      } else {
        alert('Failed to approve review');
      }
    } catch (error) {
      console.error('Error approving review:', error);
      alert('Error approving review');
    } finally {
      setProcessingId(null);
    }
  };

  const handleUnapprove = async (reviewId: number) => {
    setProcessingId(reviewId);
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/admin/reviews', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          id: reviewId,
          is_approved: false,
        }),
      });

      if (response.ok) {
        await loadReviews();
        alert('Review unapproved successfully!');
      } else {
        alert('Failed to unapprove review');
      }
    } catch (error) {
      console.error('Error unapproving review:', error);
      alert('Error unapproving review');
    } finally {
      setProcessingId(null);
    }
  };

  const handleDelete = async (reviewId: number) => {
    if (!confirm('Are you sure you want to delete this review? This action cannot be undone.')) {
      return;
    }

    setProcessingId(reviewId);
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`/api/admin/reviews?id=${reviewId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        await loadReviews();
        alert('Review deleted successfully!');
      } else {
        alert('Failed to delete review');
      }
    } catch (error) {
      console.error('Error deleting review:', error);
      alert('Error deleting review');
    } finally {
      setProcessingId(null);
    }
  };

  const filteredReviews = reviews.filter(review => {
    if (filter === 'all') return true;
    if (filter === 'pending') return !review.is_approved;
    if (filter === 'approved') return review.is_approved;
    return true;
  });

  const pendingCount = reviews.filter(r => !r.is_approved).length;
  const approvedCount = reviews.filter(r => r.is_approved).length;

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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl animate-spin mb-4">⭐</div>
          <p className="text-xl text-gray-600">Loading reviews...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">Review Management ⭐</h1>
              <p className="text-gray-600">Approve or reject customer reviews</p>
            </div>
            <Link
              href="/admin"
              className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition"
            >
              ← Back to Dashboard
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-lg p-6 shadow">
              <div className="text-3xl font-bold text-blue-600">{reviews.length}</div>
              <div className="text-gray-600 font-semibold">Total Reviews</div>
            </div>
            <div className="bg-yellow-50 rounded-lg p-6 shadow border-2 border-yellow-300">
              <div className="text-3xl font-bold text-yellow-600">{pendingCount}</div>
              <div className="text-gray-600 font-semibold">Pending Approval</div>
            </div>
            <div className="bg-green-50 rounded-lg p-6 shadow border-2 border-green-300">
              <div className="text-3xl font-bold text-green-600">{approvedCount}</div>
              <div className="text-gray-600 font-semibold">Approved</div>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2 bg-white rounded-lg p-2 shadow">
            <button
              onClick={() => setFilter('all')}
              className={`flex-1 py-2 px-4 rounded-lg font-semibold transition ${
                filter === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              All ({reviews.length})
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`flex-1 py-2 px-4 rounded-lg font-semibold transition ${
                filter === 'pending'
                  ? 'bg-yellow-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Pending ({pendingCount})
            </button>
            <button
              onClick={() => setFilter('approved')}
              className={`flex-1 py-2 px-4 rounded-lg font-semibold transition ${
                filter === 'approved'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Approved ({approvedCount})
            </button>
          </div>
        </div>

        {/* Reviews List */}
        {filteredReviews.length === 0 ? (
          <div className="bg-white rounded-lg p-12 shadow text-center">
            <div className="text-6xl mb-4">📭</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No Reviews</h3>
            <p className="text-gray-600">
              {filter === 'pending' && 'No reviews pending approval'}
              {filter === 'approved' && 'No approved reviews yet'}
              {filter === 'all' && 'No reviews submitted yet'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredReviews.map((review) => (
              <div
                key={review.id}
                className={`bg-white rounded-lg p-6 shadow hover:shadow-lg transition ${
                  !review.is_approved ? 'border-l-4 border-yellow-500' : 'border-l-4 border-green-500'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-xl font-bold text-white">
                        {review.customer_name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-bold text-lg text-gray-800">{review.customer_name}</div>
                        <div className="text-sm text-gray-500">{review.customer_email || 'No email'}</div>
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
                  <div className="flex items-center gap-2">
                    {review.is_approved ? (
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                        ✓ Approved
                      </span>
                    ) : (
                      <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-semibold">
                        ⏳ Pending
                      </span>
                    )}
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-gray-700 leading-relaxed">{review.review_text}</p>
                </div>

                {review.approved_at && (
                  <div className="text-sm text-gray-500 mb-4">
                    Approved at: {formatDate(review.approved_at)} by {review.approved_by}
                  </div>
                )}

                <div className="flex gap-2">
                  {!review.is_approved ? (
                    <button
                      onClick={() => handleApprove(review.id)}
                      disabled={processingId === review.id}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
                    >
                      {processingId === review.id ? 'Processing...' : '✓ Approve'}
                    </button>
                  ) : (
                    <button
                      onClick={() => handleUnapprove(review.id)}
                      disabled={processingId === review.id}
                      className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition disabled:opacity-50"
                    >
                      {processingId === review.id ? 'Processing...' : '↩ Unapprove'}
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(review.id)}
                    disabled={processingId === review.id}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition disabled:opacity-50"
                  >
                    {processingId === review.id ? 'Deleting...' : '🗑 Delete'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

