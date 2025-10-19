"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

interface Review {
  id: number;
  puppy_name: string;
  customer_name: string;
  customer_email?: string;
  rating: number;
  review_text: string;
  created_at: string;
  is_approved: boolean;
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [sortBy, setSortBy] = useState("newest");
  const [filterRating, setFilterRating] = useState("all");
  const reviewsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsLoaded(true);
    loadReviews();
  }, []);

  const loadReviews = async () => {
    try {
      const response = await fetch('/api/reviews');
      const data = await response.json();
      console.log('📊 Reviews loaded:', data);
      console.log('📊 First review rating:', data[0]?.rating);
      setReviews(data);
    } catch (error) {
      console.error('Failed to load reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = () => {
    if (reviews.length === 0) {
      return {
        totalReviews: 0,
        averageRating: 0,
        ratingBreakdown: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
      };
    }

    const breakdown = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    let totalRating = 0;

    reviews.forEach(review => {
      breakdown[review.rating as keyof typeof breakdown]++;
      totalRating += review.rating;
    });

    return {
      totalReviews: reviews.length,
      averageRating: totalRating / reviews.length,
      ratingBreakdown: breakdown
    };
  };

  const stats = calculateStats();

  const filteredAndSortedReviews = reviews
    .filter(review => {
      if (filterRating === "all") return true;
      return review.rating === parseInt(filterRating);
    })
    .sort((a, b) => {
      if (sortBy === "newest") {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      } else if (sortBy === "oldest") {
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      } else if (sortBy === "highest") {
        return b.rating - a.rating;
      } else if (sortBy === "lowest") {
        return a.rating - b.rating;
      }
      return 0;
    });

  const scrollToReviews = () => {
    reviewsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className="text-2xl">
        {i < rating ? '⭐' : '☆'}
      </span>
    ));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl animate-spin mb-4">🐕</div>
          <p className="text-xl text-gray-600">Loading reviews...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-sans bg-gradient-to-br from-white via-blue-50 to-purple-50">
      {/* Hero Section */}
      <section className={`relative py-20 overflow-hidden transition-all duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/40 via-purple-100/40 to-pink-100/40"></div>
        
        <div className={`relative z-10 max-w-7xl mx-auto px-4 text-center transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-block mb-6 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg">
            <span className="text-sm font-bold text-purple-600 flex items-center gap-2">
              <span className="text-2xl">⭐</span>
              CUSTOMER REVIEWS
            </span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-gray-800 mb-6">
            <span className="block mb-2">What Our</span>
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              Happy Families Say
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            Real stories from real customers who found their perfect puppy through GoldiPuppy 🐕
          </p>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12">
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-6 shadow-xl border border-purple-100">
              <div className="text-5xl font-black text-purple-600 mb-2">{stats.totalReviews}</div>
              <div className="text-gray-600 font-semibold">Total Reviews</div>
            </div>
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-6 shadow-xl border border-pink-100">
              <div className="text-5xl font-black text-pink-600 mb-2">{stats.averageRating.toFixed(1)}</div>
              <div className="text-gray-600 font-semibold flex items-center justify-center gap-1">
                Average Rating {renderStars(Math.round(stats.averageRating))}
              </div>
            </div>
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-6 shadow-xl border border-blue-100">
              <div className="text-5xl font-black text-blue-600 mb-2">{stats.ratingBreakdown[5]}</div>
              <div className="text-gray-600 font-semibold">5-Star Reviews</div>
            </div>
          </div>

          <button 
            onClick={scrollToReviews}
            className="mt-8 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg px-10 py-4 rounded-full shadow-2xl hover:scale-110 hover:shadow-3xl transition-all duration-300 flex items-center gap-3 mx-auto group"
          >
            <span className="group-hover:animate-bounce">📖</span>
            Read Reviews
          </button>
        </div>
      </section>

      {/* Rating Breakdown */}
      <section className="py-12 bg-white/60 backdrop-blur-lg">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-black text-gray-800 mb-8 text-center">Rating Distribution</h2>
          <div className="space-y-4">
            {[5, 4, 3, 2, 1].map((rating) => {
              const count = stats.ratingBreakdown[rating as keyof typeof stats.ratingBreakdown];
              const percentage = stats.totalReviews > 0 ? (count / stats.totalReviews) * 100 : 0;
              
              return (
                <div key={rating} className="flex items-center gap-4">
                  <div className="flex items-center gap-1 w-24">
                    <span className="font-bold text-gray-700">{rating}</span>
                    <span className="text-yellow-400">⭐</span>
                  </div>
                  <div className="flex-1 bg-gray-200 rounded-full h-4 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-yellow-400 to-orange-400 h-full rounded-full transition-all duration-1000"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <div className="w-16 text-right font-bold text-gray-700">{count}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Reviews List */}
      <section ref={reviewsRef} className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-12 justify-center">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-6 py-3 rounded-full border-2 border-gray-300 focus:outline-none focus:ring-4 focus:ring-purple-200 focus:border-purple-400 font-semibold text-gray-700 bg-white"
            >
              <option value="newest">📅 Newest First</option>
              <option value="oldest">📅 Oldest First</option>
              <option value="highest">⭐ Highest Rated</option>
              <option value="lowest">⭐ Lowest Rated</option>
            </select>

            <select
              value={filterRating}
              onChange={(e) => setFilterRating(e.target.value)}
              className="px-6 py-3 rounded-full border-2 border-gray-300 focus:outline-none focus:ring-4 focus:ring-purple-200 focus:border-purple-400 font-semibold text-gray-700 bg-white"
            >
              <option value="all">⭐ All Ratings</option>
              <option value="5">⭐ 5 Stars</option>
              <option value="4">⭐ 4 Stars</option>
              <option value="3">⭐ 3 Stars</option>
              <option value="2">⭐ 2 Stars</option>
              <option value="1">⭐ 1 Star</option>
            </select>
          </div>

          {/* Reviews Grid */}
          {filteredAndSortedReviews.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-9xl mb-6">🐕</div>
              <h3 className="text-3xl font-bold text-gray-800 mb-4">No Reviews Yet</h3>
              <p className="text-xl text-gray-600 mb-8">Be the first to share your experience!</p>
              <Link 
                href="/puppies"
                className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-full px-10 py-4 shadow-xl hover:scale-110 transition-all"
              >
                Browse Puppies 🐕
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredAndSortedReviews.map((review, index) => (
                <div
                  key={review.id}
                  className={`bg-white rounded-3xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-500 hover:scale-105 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-3xl font-bold text-white">
                        {review.customer_name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-bold text-lg text-gray-800">{review.customer_name}</div>
                        <div className="text-sm text-gray-500">{formatDate(review.created_at)}</div>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      {renderStars(review.rating)}
                    </div>
                  </div>

                  {/* Puppy Info */}
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-4 mb-6">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">🐕</span>
                      <div>
                        <div className="text-sm font-semibold text-gray-600">Puppy</div>
                        <div className="font-bold text-purple-700">{review.puppy_name}</div>
                      </div>
                    </div>
                  </div>

                  {/* Review Text */}
                  <p className="text-gray-700 leading-relaxed mb-6">
                    {review.review_text}
                  </p>

                  {/* Verified Badge */}
                  <div className="flex items-center gap-2 text-sm">
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold flex items-center gap-1">
                      <span>✓</span>
                      Verified Purchase
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-purple-100 to-pink-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="text-6xl mb-6">🎉</div>
          <h2 className="text-4xl sm:text-5xl font-black text-gray-800 mb-6">
            Ready to Find Your
            <span className="block mt-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Perfect Puppy?
            </span>
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join hundreds of happy families who found their furry companion through GoldiPuppy
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link 
              href="/puppies"
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg px-10 py-4 rounded-full shadow-2xl hover:scale-110 hover:shadow-3xl transition-all duration-300 flex items-center gap-3 group"
            >
              <span className="group-hover:animate-bounce">🐕</span>
              Browse Puppies
            </Link>
            <Link 
              href="/breeds"
              className="bg-white text-gray-700 font-bold text-lg px-10 py-4 rounded-full shadow-xl border-2 border-gray-300 hover:scale-110 hover:shadow-2xl hover:border-purple-400 transition-all duration-300 flex items-center gap-3 group"
            >
              <span className="group-hover:animate-bounce">📚</span>
              Explore Breeds
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
