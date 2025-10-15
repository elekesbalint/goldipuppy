"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const reviewStats = {
  totalReviews: 847,
  averageRating: 4.8,
  ratingBreakdown: {
    5: 712,
    4: 98,
    3: 23,
    2: 8,
    1: 6
  }
};

const reviews = [
  {
    id: 1,
    name: "Sarah Johnson",
    location: "California, USA",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5,
    date: "2024-01-15",
    puppyName: "Bella",
    breed: "Golden Retriever",
    title: "Amazing experience from start to finish!",
    review: "We couldn't be happier with our Golden Retriever, Bella! The entire process was smooth and professional. The team kept us updated throughout the delivery process, and Bella arrived healthy and happy. She's been the perfect addition to our family. The health documentation was complete and our local vet was impressed with the care she received.",
    photos: [
      "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=300&q=80",
      "https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=300&q=80"
    ],
    verified: true,
    helpful: 23
  },
  {
    id: 2,
    name: "Michael Chen",
    location: "London, UK",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5,
    date: "2024-01-10",
    puppyName: "Max",
    breed: "French Bulldog",
    title: "Excellent service and beautiful puppy",
    review: "Max is absolutely perfect! The delivery to the UK went smoothly despite the post-Brexit requirements. The team handled all the paperwork and kept us informed every step of the way. Max is healthy, well-socialized, and has the sweetest temperament. Highly recommend GoldiPuppy!",
    photos: [
      "https://images.unsplash.com/photo-1518715308788-3005759c61d3?auto=format&fit=crop&w=300&q=80"
    ],
    verified: true,
    helpful: 18
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    location: "Madrid, Spain",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    rating: 5,
    date: "2024-01-08",
    puppyName: "Luna",
    breed: "Pomeranian",
    title: "Perfect little companion",
    review: "Luna is everything we hoped for and more! She's tiny, adorable, and has such a loving personality. The breeder clearly took excellent care of her, and she came with all her vaccinations up to date. The customer support team was fantastic - they answered all our questions patiently and provided great advice for new puppy parents.",
    photos: [
      "https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=300&q=80"
    ],
    verified: true,
    helpful: 15
  },
  {
    id: 4,
    name: "David Wilson",
    location: "Toronto, Canada",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    rating: 4,
    date: "2024-01-05",
    puppyName: "Charlie",
    breed: "Labrador Retriever",
    title: "Great puppy, minor delivery delay",
    review: "Charlie is a wonderful addition to our family! He's healthy, playful, and great with our kids. The only minor issue was a 2-day delivery delay due to weather, but the team kept us informed and Charlie arrived safely. The health documentation was thorough and our vet gave him a clean bill of health.",
    photos: [],
    verified: true,
    helpful: 12
  },
  {
    id: 5,
    name: "Lisa Thompson",
    location: "Sydney, Australia",
    avatar: "https://randomuser.me/api/portraits/women/28.jpg",
    rating: 5,
    date: "2024-01-02",
    puppyName: "Ruby",
    breed: "Cavalier King Charles",
    title: "Worth the wait and investment",
    review: "The process to Australia took longer due to quarantine requirements, but it was worth every day of waiting! Ruby is absolutely gorgeous and has the sweetest temperament. The team helped us through all the import requirements and made the process as smooth as possible. She's been healthy and happy since day one.",
    photos: [
      "https://images.unsplash.com/photo-1518715308788-3005759c61d3?auto=format&fit=crop&w=300&q=80",
      "https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=300&q=80"
    ],
    verified: true,
    helpful: 20
  },
  {
    id: 6,
    name: "James Mueller",
    location: "Berlin, Germany",
    avatar: "https://randomuser.me/api/portraits/men/52.jpg",
    rating: 5,
    date: "2023-12-28",
    puppyName: "Milo",
    breed: "Shih Tzu",
    title: "Exceptional care and service",
    review: "Milo arrived in perfect condition! The care and attention to detail from GoldiPuppy was exceptional. From the initial consultation to delivery, every step was handled professionally. Milo is healthy, well-trained, and has adapted beautifully to our home. The ongoing support has been invaluable for first-time dog owners like us.",
    photos: [
      "https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=300&q=80"
    ],
    verified: true,
    helpful: 16
  }
];

export default function ReviewsPage() {
  const [filterRating, setFilterRating] = useState("all");
  const [filterBreed, setFilterBreed] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [isLoaded, setIsLoaded] = useState(false);
  const [visibleStats, setVisibleStats] = useState<number[]>([]);
  const [visibleReviews, setVisibleReviews] = useState<number[]>([]);
  const reviewsListRef = useRef<HTMLDivElement | null>(null);

  // Trigger animations on component mount
  useEffect(() => {
    setIsLoaded(true);
    // Set page-specific background
    document.documentElement.style.background = 'linear-gradient(to bottom right, #fdf2f8, #f3e8ff, #dbeafe)';
    document.body.style.background = 'linear-gradient(to bottom right, #fdf2f8, #f3e8ff, #dbeafe)';
    
    return () => {
      // Reset background on cleanup
      document.documentElement.style.background = '';
      document.body.style.background = '';
    };
  }, []);

  // Handle stats animations
  useEffect(() => {
    const timer = setTimeout(() => {
      [0, 1, 2, 3, 4].forEach((index) => {
        setTimeout(() => {
          setVisibleStats(prev => [...prev, index]);
        }, index * 200);
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Handle review animations when filters change
  useEffect(() => {
    setVisibleReviews([]);
    const timer = setTimeout(() => {
      filteredReviews.forEach((_, index) => {
        setTimeout(() => {
          setVisibleReviews(prev => [...prev, index]);
        }, index * 150);
      });
    }, 300);

    return () => clearTimeout(timer);
  }, [filterRating, filterBreed, sortBy]);

  const filteredReviews = reviews
    .filter(review => {
      const ratingMatch = filterRating === "all" || review.rating === parseInt(filterRating);
      const breedMatch = filterBreed === "all" || review.breed === filterBreed;
      return ratingMatch && breedMatch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "oldest":
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case "highest":
          return b.rating - a.rating;
        case "lowest":
          return a.rating - b.rating;
        case "helpful":
          return b.helpful - a.helpful;
        case "newest":
        default:
          return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    });

  const renderStars = (rating: number, size: string = "text-lg") => {
    return (
      <div className={`flex ${size}`}>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`${star <= rating ? "text-yellow-400 animate-pulse" : "text-gray-300"} hover:scale-110 transition-transform duration-300`}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen font-sans overflow-x-hidden">
      {/* Animated floating elements */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-20 left-8 w-5 h-5 bg-[var(--accent)]/20 rounded-full animate-bounce" style={{animationDelay: '0s', animationDuration: '3.2s'}}></div>
        <div className="absolute top-44 right-16 w-6 h-6 bg-yellow-400/20 rounded-full animate-bounce" style={{animationDelay: '1s', animationDuration: '4.1s'}}></div>
        <div className="absolute top-68 left-1/3 w-4 h-4 bg-pink-400/20 rounded-full animate-bounce" style={{animationDelay: '2s', animationDuration: '5.2s'}}></div>
        <div className="absolute bottom-44 right-8 w-7 h-7 bg-green-400/20 rounded-full animate-bounce" style={{animationDelay: '0.5s', animationDuration: '3.7s'}}></div>
        <div className="absolute bottom-20 left-20 w-5 h-5 bg-blue-400/20 rounded-full animate-bounce" style={{animationDelay: '1.5s', animationDuration: '4.3s'}}></div>
      </div>

      {/* Hero Section - Egyedi design a Reviews oldalhoz */}
      <section className={`relative bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 min-h-[80vh] flex items-center justify-center py-20 overflow-hidden transition-all duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        {/* Animated Reviews Background */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          {reviews.slice(0, 6).map((review, i) => (
            <div
              key={`floating-review-${review.id}-${i}`}
              className="absolute bg-white rounded-2xl p-4 shadow-lg animate-float"
              style={{
                top: `${15 + (i * 12) % 70}%`,
                left: `${5 + (i * 15) % 85}%`,
                width: `${200 + (i % 3) * 50}px`,
                animationDelay: `${i * 0.8}s`,
                animationDuration: `${4 + (i % 3)}s`,
                transform: `rotate(${-10 + i * 4}deg)`
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <img src={review.avatar} alt={review.name} className="w-8 h-8 rounded-full" />
                <div className="text-xs font-bold">{review.name}</div>
              </div>
              <div className="flex mb-2">
                                        {[...Array(review.rating)].map((_, starI) => (
                          <span key={`star-${review.id}-${starI}`} className="text-yellow-400 text-sm">★</span>
                        ))}
              </div>
              <div className="text-xs text-gray-600 line-clamp-2">
                "{review.review.slice(0, 80)}..."
              </div>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 text-center">
          {/* Title Section */}
          <div className={`mb-16 transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="flex justify-center items-center gap-6 mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center text-4xl animate-bounce">
                ⭐
              </div>
              <div className="text-7xl sm:text-8xl lg:text-9xl font-black text-gray-800">
                <span className="block bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                  CUSTOMER
                </span>
              </div>
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-4xl animate-pulse">
                💕
              </div>
            </div>
            <h1 className="text-8xl sm:text-9xl font-black text-gray-800 mb-8">
              REVIEWS
            </h1>
            <div className="flex justify-center items-center gap-6 mb-8">
              <div className="h-2 w-32 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full animate-pulse"></div>
              <span className="text-4xl animate-bounce">😊</span>
              <div className="h-2 w-32 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full animate-pulse"></div>
            </div>
            <p className="text-2xl sm:text-3xl text-gray-600 max-w-5xl mx-auto leading-relaxed">
              <span className="font-bold text-pink-600">{new Intl.NumberFormat('en-US').format(reviewStats.totalReviews)}</span> happy families and their beloved puppies
            </p>
          </div>

          {/* Featured Reviews Carousel */}
          <div className={`mb-16 transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {reviews.slice(0, 3).map((review, index) => (
                <div 
                  key={review.id}
                  className="bg-white/90 backdrop-blur-lg rounded-3xl p-8 shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-500 group border-2 border-transparent hover:border-pink-300"
                  style={{
                    transitionDelay: `${index * 200}ms`
                  }}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <img 
                      src={review.avatar} 
                      alt={review.name} 
                      className="w-16 h-16 rounded-full border-4 border-pink-200 group-hover:border-pink-400 transition-all duration-300 group-hover:scale-110" 
                    />
                    <div>
                      <div className="font-bold text-gray-800 text-lg group-hover:text-pink-600 transition-colors duration-300">
                        {review.name}
                      </div>
                      <div className="text-gray-600 text-sm">{review.location}</div>
                      <div className="flex mt-1">
                        {[...Array(review.rating)].map((_, starI) => (
                          <span key={`star-featured-${review.id}-${starI}`} className="text-yellow-400 text-lg animate-pulse">★</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="font-bold text-xl text-gray-800 mb-4 group-hover:text-purple-600 transition-colors duration-300">
                    "{review.title}"
                  </h3>
                  
                  <p className="text-gray-600 text-sm leading-relaxed mb-6 group-hover:text-gray-800 transition-colors duration-300">
                    {review.review.slice(0, 150)}...
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="bg-pink-100 rounded-full px-4 py-2 group-hover:bg-pink-200 transition-colors duration-300">
                      <span className="text-pink-800 font-bold text-sm">🐕 {review.puppyName}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500">
                      <span className="text-sm">👍 {review.helpful}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Rating Overview */}
          <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 transition-all duration-1000 delay-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur-lg rounded-3xl p-6 border border-yellow-400/30 hover:scale-105 transition-all duration-300 group">
              <div className="text-5xl font-black text-yellow-600 mb-2 group-hover:animate-pulse">
                {reviewStats.averageRating}
              </div>
              <div className="text-sm font-bold text-gray-700">Average Rating</div>
              <div className="text-2xl mt-2 group-hover:animate-bounce">⭐</div>
            </div>
            
            <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-lg rounded-3xl p-6 border border-green-400/30 hover:scale-105 transition-all duration-300 group">
              <div className="text-5xl font-black text-green-600 mb-2 group-hover:animate-pulse">
                {Math.round((reviewStats.ratingBreakdown[5] / reviewStats.totalReviews) * 100)}%
              </div>
              <div className="text-sm font-bold text-gray-700">5-Star Reviews</div>
              <div className="text-2xl mt-2 group-hover:animate-bounce">🌟</div>
            </div>
            
            <div className="bg-gradient-to-br from-pink-500/20 to-purple-500/20 backdrop-blur-lg rounded-3xl p-6 border border-pink-400/30 hover:scale-105 transition-all duration-300 group">
              <div className="text-5xl font-black text-pink-600 mb-2 group-hover:animate-pulse">
                {new Intl.NumberFormat('en-US').format(reviewStats.totalReviews)}
              </div>
              <div className="text-sm font-bold text-gray-700">Total Reviews</div>
              <div className="text-2xl mt-2 group-hover:animate-bounce">💕</div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-lg rounded-3xl p-6 border border-blue-400/30 hover:scale-105 transition-all duration-300 group">
              <div className="text-5xl font-black text-blue-600 mb-2 group-hover:animate-pulse">
                99%
              </div>
              <div className="text-sm font-bold text-gray-700">Recommend Us</div>
              <div className="text-2xl mt-2 group-hover:animate-bounce">🎉</div>
            </div>
          </div>

          {/* CTA Section */}
          <div className={`transition-all duration-1000 delay-900 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-3xl p-1 inline-block mb-8">
              <div className="bg-white rounded-3xl px-12 py-8">
                <h2 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent mb-6">
                  Join Our Happy Family! ✨
                </h2>
                <p className="text-gray-600 mb-6 text-lg">
                  See why thousands of families trust us with finding their perfect puppy companion
                </p>
                <div className="flex flex-wrap gap-6 justify-center">
                  <button
                    onClick={() => {
                      reviewsListRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                    className="bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold text-xl px-12 py-5 rounded-full shadow-2xl hover:scale-110 hover:shadow-3xl transition-all duration-300 flex items-center gap-3 group"
                  >
                    <span className="group-hover:animate-bounce">📖</span>
                    Read All Reviews
                  </button>
                  <Link href="/contact" className="bg-white/80 backdrop-blur-lg text-gray-700 font-bold text-xl px-12 py-5 rounded-full shadow-2xl hover:scale-110 hover:shadow-3xl hover:bg-white transition-all duration-300 flex items-center gap-3 group border border-gray-300">
                    <span className="group-hover:animate-bounce">✍️</span>
                    Write a Review
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className={`absolute bottom-10 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
            <div className="flex flex-col items-center text-gray-500 animate-bounce">
              <span className="text-sm font-medium mb-2">Browse all reviews</span>
              <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
                <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-20 left-20 text-4xl text-pink-200 animate-float opacity-50" style={{animationDelay: '0s'}}>😊</div>
          <div className="absolute top-40 right-32 text-5xl text-purple-200 animate-float opacity-40" style={{animationDelay: '2s'}}>💕</div>
          <div className="absolute bottom-40 left-32 text-3xl text-blue-200 animate-float opacity-30" style={{animationDelay: '4s'}}>⭐</div>
          <div className="absolute bottom-20 right-20 text-4xl text-pink-200 animate-float opacity-50" style={{animationDelay: '1s'}}>🎉</div>
          <div className="absolute top-1/2 left-10 text-2xl text-purple-200 animate-float opacity-40" style={{animationDelay: '3s'}}>✨</div>
          <div className="absolute top-1/3 right-10 text-6xl text-blue-200 animate-float opacity-30" style={{animationDelay: '5s'}}>🌟</div>
        </div>
      </section>

      {/* Review Statistics */}
      <section className={`py-20 max-w-6xl mx-auto px-4 mb-16 transition-all duration-1000 delay-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-12 hover:shadow-2xl hover:scale-105 transition-all duration-300">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-[var(--foreground)] mb-4 hover:animate-pulse transition-all duration-300 cursor-default">
              ⭐ Customer Satisfaction 📊
            </h2>
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="text-6xl font-bold text-[var(--accent)] hover:animate-pulse transition-all duration-300 cursor-default">
                {reviewStats.averageRating}
              </div>
              <div>
                {renderStars(Math.round(reviewStats.averageRating), "text-3xl")}
                <div className="text-gray-600 mt-2">
                  Based on {new Intl.NumberFormat('en-US').format(reviewStats.totalReviews)} reviews
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[5, 4, 3, 2, 1].map((rating, index) => {
              const count = reviewStats.ratingBreakdown[rating as keyof typeof reviewStats.ratingBreakdown];
              const percentage = (count / reviewStats.totalReviews) * 100;
              
              return (
                <div 
                  key={rating} 
                  className={`flex flex-col items-center hover:scale-105 transition-all duration-300 group ${
                    visibleStats.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{
                    transitionDelay: `${1000 + index * 200}ms`
                  }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold group-hover:text-[var(--accent)] transition-colors duration-300">{rating}</span>
                    <span className="text-yellow-400 group-hover:animate-bounce transition-all duration-300">★</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 mb-2 group-hover:shadow-md transition-shadow duration-300">
                    <div
                      className="bg-[var(--accent)] h-3 rounded-full transition-all duration-1000 hover:bg-yellow-500"
                      style={{ 
                        width: `${percentage}%`,
                        transitionDelay: `${1200 + index * 200}ms`
                      }}
                    ></div>
                  </div>
                  <div className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
                    {count} ({percentage.toFixed(1)}%)
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className={`max-w-6xl mx-auto px-4 mb-12 transition-all duration-1000 delay-900 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
        <div className="bg-white/95 backdrop-blur-lg shadow-2xl rounded-3xl p-8 border-2 border-[var(--accent)]/20 hover:shadow-3xl hover:border-[var(--accent)]/40 transition-all duration-300">
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-[var(--foreground)] hover:animate-pulse transition-all duration-300 cursor-default">
              🔍 Filter & Sort Reviews 📝
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="hover:scale-105 transition-transform duration-300">
              <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                ⭐ Filter by Rating
              </label>
              <select
                value={filterRating}
                onChange={(e) => setFilterRating(e.target.value)}
                className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 focus:outline-none focus:ring-4 focus:ring-[var(--accent)]/30 focus:border-[var(--accent)] transition-all hover:shadow-lg hover:border-[var(--accent)]/50"
              >
                <option value="all">All Ratings</option>
                <option value="5">5 Stars ⭐⭐⭐⭐⭐</option>
                <option value="4">4 Stars ⭐⭐⭐⭐</option>
                <option value="3">3 Stars ⭐⭐⭐</option>
                <option value="2">2 Stars ⭐⭐</option>
                <option value="1">1 Star ⭐</option>
              </select>
            </div>

            <div className="hover:scale-105 transition-transform duration-300">
              <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                🐕 Filter by Breed
              </label>
              <select
                value={filterBreed}
                onChange={(e) => setFilterBreed(e.target.value)}
                className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 focus:outline-none focus:ring-4 focus:ring-[var(--accent)]/30 focus:border-[var(--accent)] transition-all hover:shadow-lg hover:border-[var(--accent)]/50"
              >
                <option value="all">All Breeds</option>
                <option value="Golden Retriever">Golden Retriever 🦴</option>
                <option value="French Bulldog">French Bulldog 🐾</option>
                <option value="Pomeranian">Pomeranian 🧸</option>
                <option value="Labrador Retriever">Labrador Retriever 🎾</option>
                <option value="Cavalier King Charles">Cavalier King Charles 👑</option>
                <option value="Shih Tzu">Shih Tzu 🌸</option>
              </select>
            </div>

            <div className="hover:scale-105 transition-transform duration-300">
              <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                📈 Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 focus:outline-none focus:ring-4 focus:ring-[var(--accent)]/30 focus:border-[var(--accent)] transition-all hover:shadow-lg hover:border-[var(--accent)]/50"
              >
                <option value="newest">🕐 Newest First</option>
                <option value="oldest">📅 Oldest First</option>
                <option value="highest">⭐ Highest Rating</option>
                <option value="lowest">📊 Lowest Rating</option>
                <option value="helpful">👍 Most Helpful</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews List */}
      <section ref={reviewsListRef} className={`max-w-6xl mx-auto px-4 pb-20 transition-all duration-1000 delay-1100 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[var(--foreground)] hover:animate-pulse transition-all duration-300 cursor-default">
            📝 {filteredReviews.length} {filteredReviews.length === 1 ? 'Review' : 'Reviews'}
          </h2>
        </div>

        <div className="space-y-8">
          {filteredReviews.map((review, index) => (
            <div 
              key={review.id} 
              className={`bg-white rounded-3xl shadow-xl border border-gray-100 p-8 hover:shadow-2xl hover:scale-105 transition-all duration-500 group ${
                visibleReviews.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{
                transitionDelay: `${300 + index * 150}ms`
              }}
            >
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Customer Info */}
                <div className="lg:w-64 flex-shrink-0">
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={review.avatar}
                      alt={review.name}
                      className="w-16 h-16 rounded-full object-cover border-4 border-[var(--accent)] shadow-lg hover:scale-110 hover:animate-bounce transition-all duration-300"
                    />
                    <div>
                      <div className="font-bold text-[var(--foreground)] flex items-center gap-2 group-hover:text-[var(--accent)] transition-colors duration-300">
                        {review.name}
                        {review.verified && (
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold hover:bg-green-200 transition-colors duration-300 animate-pulse">
                            ✅ Verified
                          </span>
                        )}
                      </div>
                      <div className="text-gray-600 text-sm group-hover:text-gray-800 transition-colors duration-300">{review.location}</div>
                      <div className="text-gray-500 text-sm">
                        {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(review.date))}
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-2xl p-4 hover:bg-gray-100 transition-colors duration-300 group-hover:shadow-md">
                    <div className="text-sm text-gray-600 mb-1">Puppy</div>
                    <div className="font-semibold text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors duration-300">{review.puppyName}</div>
                    <div className="text-sm text-gray-600">{review.breed}</div>
                  </div>
                </div>

                {/* Review Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    {renderStars(review.rating)}
                    <h3 className="text-xl font-bold text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors duration-300">{review.title}</h3>
                  </div>

                  <p className="text-gray-700 leading-relaxed mb-6 group-hover:text-gray-900 transition-colors duration-300">{review.review}</p>

                  {/* Photos */}
                  {review.photos.length > 0 && (
                    <div className="mb-6">
                      <div className="flex gap-4 overflow-x-auto">
                        {review.photos.map((photo, photoIndex) => (
                          <img
                            key={photoIndex}
                            src={photo}
                            alt={`${review.puppyName} photo ${photoIndex + 1}`}
                            className="w-24 h-24 object-cover rounded-xl shadow-lg flex-shrink-0 hover:scale-110 transition-transform cursor-pointer hover:shadow-xl duration-300"
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Helpful */}
                  <div className="flex items-center justify-between">
                    <button className="flex items-center gap-2 text-gray-600 hover:text-[var(--accent)] hover:scale-105 transition-all duration-300 group/btn">
                      <span className="group-hover/btn:animate-bounce">👍</span>
                      <span className="text-sm">Helpful ({review.helpful})</span>
                    </button>
                    <button className="text-gray-400 hover:text-gray-600 hover:scale-105 transition-all duration-300">
                      <span className="text-sm">Report</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredReviews.length === 0 && (
          <div className="text-center py-16 animate-pulse">
            <div className="text-8xl mb-6 animate-bounce">⭐</div>
            <h3 className="text-3xl font-bold text-gray-600 mb-4">No reviews found</h3>
            <p className="text-gray-500 mb-8">Try adjusting your filters to see more results.</p>
            <button
              onClick={() => {
                setFilterRating("all");
                setFilterBreed("all");
                setSortBy("newest");
              }}
              className="bg-gradient-to-r from-[var(--accent)] to-yellow-600 text-white font-bold rounded-full px-8 py-4 shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300 animate-pulse"
            >
              Clear All Filters 🔄
            </button>
          </div>
        )}
      </section>

      {/* Write Review CTA */}
      <section className={`bg-gradient-to-r from-amber-50 to-white py-16 max-w-6xl mx-auto px-4 rounded-3xl mb-16 transition-all duration-1000 delay-1300 hover:shadow-xl hover:scale-105 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
        <div className="text-center">
          <div className="text-6xl mb-6 animate-bounce">✍️</div>
          <h2 className="text-3xl font-extrabold text-[var(--foreground)] mb-4 hover:animate-pulse transition-all duration-300 cursor-default">
            Share Your Experience 💝
          </h2>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Did you get a puppy from us? We'd love to hear about your experience and see photos of your new family member! ✨
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact" className="bg-gradient-to-r from-[var(--accent)] to-yellow-600 text-white font-bold rounded-full px-8 py-4 shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300 animate-pulse">
              Write a Review ✍️
            </Link>
            <Link href="/puppies" className="bg-white text-[var(--accent)] font-bold rounded-full px-8 py-4 shadow-xl border-2 border-[var(--accent)] hover:scale-105 hover:shadow-2xl hover:bg-[var(--accent)] hover:text-white transition-all duration-300">
              Find Your Puppy 🐕
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
} 