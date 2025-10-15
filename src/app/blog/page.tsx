"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const blogCategories = [
  { id: "all", name: "All Articles", icon: "📚" },
  { id: "puppy-care", name: "Puppy Care", icon: "🐶" },
  { id: "training", name: "Training", icon: "🎾" },
  { id: "health", name: "Health", icon: "🏥" },
  { id: "nutrition", name: "Nutrition", icon: "🍖" },
  { id: "breeds", name: "Breed Guides", icon: "📖" },
  { id: "lifestyle", name: "Lifestyle", icon: "🏡" }
];

const blogPosts = [
  {
    id: 1,
    title: "The Complete Guide to Puppy Training: First 30 Days",
    slug: "complete-guide-puppy-training-first-30-days",
    excerpt: "Essential training tips for your new puppy's first month at home. Learn the fundamentals of house training, basic commands, and establishing routines.",
    content: "Full article content would go here...",
    category: "training",
    author: "Dr. Sarah Mitchell",
    authorAvatar: "https://randomuser.me/api/portraits/women/44.jpg",
    publishDate: "2024-01-20",
    readTime: "8 min read",
    featuredImage: "https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=800&q=80",
    tags: ["training", "puppies", "house-training", "commands"],
    views: 2847,
    likes: 156
  },
  {
    id: 2,
    title: "Golden Retriever Health: Common Issues and Prevention",
    slug: "golden-retriever-health-common-issues-prevention",
    excerpt: "Learn about the most common health issues in Golden Retrievers and how to prevent them through proper care, nutrition, and regular check-ups.",
    content: "Full article content would go here...",
    category: "health",
    author: "Dr. Michael Chen",
    authorAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
    publishDate: "2024-01-18",
    readTime: "12 min read",
    featuredImage: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=800&q=80",
    tags: ["golden-retriever", "health", "prevention", "veterinary"],
    views: 1923,
    likes: 89
  },
  {
    id: 3,
    title: "Best Nutrition for Growing Puppies: A Complete Guide",
    slug: "best-nutrition-growing-puppies-complete-guide",
    excerpt: "Everything you need to know about feeding your puppy for optimal growth and development. Includes feeding schedules, portion sizes, and food recommendations.",
    content: "Full article content would go here...",
    category: "nutrition",
    author: "Emma Rodriguez",
    authorAvatar: "https://randomuser.me/api/portraits/women/65.jpg",
    publishDate: "2024-01-15",
    readTime: "10 min read",
    featuredImage: "https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=800&q=80",
    tags: ["nutrition", "puppies", "feeding", "growth"],
    views: 3156,
    likes: 201
  },
  {
    id: 4,
    title: "Preparing Your Home for a New Puppy: Essential Checklist",
    slug: "preparing-home-new-puppy-essential-checklist",
    excerpt: "A comprehensive checklist of everything you need to puppy-proof your home and create a safe, welcoming environment for your new family member.",
    content: "Full article content would go here...",
    category: "puppy-care",
    author: "David Wilson",
    authorAvatar: "https://randomuser.me/api/portraits/men/45.jpg",
    publishDate: "2024-01-12",
    readTime: "6 min read",
    featuredImage: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=800&q=80",
    tags: ["puppy-care", "home-preparation", "safety", "checklist"],
    views: 2634,
    likes: 143
  },
  {
    id: 5,
    title: "French Bulldog Care: Special Considerations for Flat-Faced Breeds",
    slug: "french-bulldog-care-special-considerations-flat-faced-breeds",
    excerpt: "Learn about the unique care requirements for French Bulldogs and other brachycephalic breeds, including breathing, exercise, and temperature management.",
    content: "Full article content would go here...",
    category: "breeds",
    author: "Dr. Lisa Thompson",
    authorAvatar: "https://randomuser.me/api/portraits/women/28.jpg",
    publishDate: "2024-01-10",
    readTime: "9 min read",
    featuredImage: "https://images.unsplash.com/photo-1518715308788-3005759c61d3?auto=format&fit=crop&w=800&q=80",
    tags: ["french-bulldog", "brachycephalic", "breathing", "care"],
    views: 1876,
    likes: 92
  },
  {
    id: 6,
    title: "Socializing Your Puppy: Building Confidence and Good Behavior",
    slug: "socializing-puppy-building-confidence-good-behavior",
    excerpt: "The importance of early socialization and how to safely expose your puppy to new experiences, people, and other animals during their critical development period.",
    content: "Full article content would go here...",
    category: "training",
    author: "James Mueller",
    authorAvatar: "https://randomuser.me/api/portraits/men/52.jpg",
    publishDate: "2024-01-08",
    readTime: "11 min read",
    featuredImage: "https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=800&q=80",
    tags: ["socialization", "behavior", "confidence", "development"],
    views: 2198,
    likes: 128
  },
  {
    id: 7,
    title: "Creating a Dog-Friendly Garden: Plants, Safety, and Fun",
    slug: "creating-dog-friendly-garden-plants-safety-fun",
    excerpt: "Design a beautiful garden that's safe and enjoyable for your dog. Learn about dog-safe plants, toxic plants to avoid, and fun garden features for pets.",
    content: "Full article content would go here...",
    category: "lifestyle",
    author: "Sophie Green",
    authorAvatar: "https://randomuser.me/api/portraits/women/33.jpg",
    publishDate: "2024-01-05",
    readTime: "7 min read",
    featuredImage: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=800&q=80",
    tags: ["garden", "safety", "plants", "outdoor"],
    views: 1654,
    likes: 87
  },
  {
    id: 8,
    title: "Understanding Puppy Behavior: What's Normal and When to Worry",
    slug: "understanding-puppy-behavior-normal-when-worry",
    excerpt: "Decode your puppy's behavior patterns and learn to distinguish between normal puppy antics and signs that may require professional attention.",
    content: "Full article content would go here...",
    category: "puppy-care",
    author: "Dr. Robert Kim",
    authorAvatar: "https://randomuser.me/api/portraits/men/38.jpg",
    publishDate: "2024-01-03",
    readTime: "13 min read",
    featuredImage: "https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=800&q=80",
    tags: ["behavior", "development", "psychology", "signs"],
    views: 2945,
    likes: 174
  }
];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    // Set page-specific background
    document.documentElement.style.background = 'linear-gradient(to bottom right, #f8fafc, #f1f5f9, #dbeafe)';
    document.body.style.background = 'linear-gradient(to bottom right, #f8fafc, #f1f5f9, #dbeafe)';
    
    return () => {
      // Reset background on cleanup
      document.documentElement.style.background = '';
      document.body.style.background = '';
    };
  }, []);

  const filteredPosts = blogPosts
    .filter(post => {
      const categoryMatch = selectedCategory === "all" || post.category === selectedCategory;
      const searchMatch = searchTerm === "" || 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      return categoryMatch && searchMatch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "oldest":
          return new Date(a.publishDate).getTime() - new Date(b.publishDate).getTime();
        case "popular":
          return b.views - a.views;
        case "liked":
          return b.likes - a.likes;
        case "newest":
        default:
          return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
      }
    });

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(new Date(dateString));
  };

    return (
    <div className="min-h-screen font-sans">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-20 gap-8 relative max-w-6xl mx-auto px-4 w-full mb-16">
        <div className="w-full max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-2xl mb-10 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent)]/30 to-transparent z-10"></div>
          <img
            src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&w=1200&q=80"
            alt="Dog care and training blog"
            className="w-full h-80 object-cover object-center"
          />
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <div className="text-center text-white">
              <h1 className="text-5xl sm:text-7xl font-extrabold drop-shadow-2xl mb-4">
                Blog
              </h1>
              <p className="text-xl sm:text-2xl drop-shadow-lg max-w-3xl mx-auto">
                Expert advice for happy, healthy puppies
              </p>
            </div>
          </div>
        </div>
        <p className="text-xl text-gray-700 max-w-3xl text-center leading-relaxed">
          Discover expert tips, guides, and insights to help you raise a happy, healthy, and well-trained puppy.
        </p>
      </section>

      {/* Search and Categories */}
      <section className="max-w-6xl mx-auto px-4 mb-12">
        <div className="bg-white/95 backdrop-blur-lg shadow-2xl rounded-3xl p-8 border-2 border-[var(--accent)]/20">
          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="Search articles, topics, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-xl border-2 border-gray-200 px-6 py-4 pl-12 text-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-[var(--accent)] transition-all"
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl">
                🔍
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-3 justify-center mb-6">
            {blogCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  selectedCategory === category.id
                    ? "bg-gradient-to-r from-[var(--accent)] to-yellow-600 text-white shadow-xl scale-105"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-102"
                }`}
              >
                <span>{category.icon}</span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>

          {/* Sort Options */}
          <div className="flex justify-center">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-xl border-2 border-gray-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-[var(--accent)] transition-all"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="popular">Most Popular</option>
              <option value="liked">Most Liked</option>
            </select>
          </div>
        </div>
      </section>

      {/* Results Header */}
      <section className="max-w-6xl mx-auto px-4 mb-8">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-[var(--foreground)]">
            {filteredPosts.length} {filteredPosts.length === 1 ? 'Article' : 'Articles'}
            {searchTerm && ` for "${searchTerm}"`}
          </h2>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="max-w-6xl mx-auto px-4 pb-20">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-8xl mb-6">📚</div>
            <h3 className="text-3xl font-bold text-gray-600 mb-4">No articles found</h3>
            <p className="text-gray-500 mb-8">Try adjusting your search or category filters.</p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
                setSortBy("newest");
              }}
              className="bg-gradient-to-r from-[var(--accent)] to-yellow-600 text-white font-bold rounded-full px-8 py-4 shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredPosts.map((post) => (
              <article key={post.id} className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden hover:scale-105 hover:shadow-2xl transition-all duration-300 group">
                <div className="relative overflow-hidden">
                  <img
                    src={post.featuredImage}
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-[var(--accent)] text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                      {blogCategories.find(cat => cat.id === post.category)?.name}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                    {post.readTime}
                  </div>
                </div>

                <div className="p-8">
                  <h3 className="text-xl font-bold text-[var(--foreground)] mb-3 line-clamp-2 group-hover:text-[var(--accent)] transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-700 mb-4 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center gap-3 mb-4">
                    <img
                      src={post.authorAvatar}
                      alt={post.author}
                      className="w-10 h-10 rounded-full object-cover border-2 border-[var(--accent)]"
                    />
                    <div>
                      <div className="font-semibold text-gray-800 text-sm">{post.author}</div>
                      <div className="text-gray-500 text-xs">{formatDate(post.publishDate)}</div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs font-semibold"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        👁️ {new Intl.NumberFormat('en-US').format(post.views)}
                      </span>
                      <span className="flex items-center gap-1">
                        ❤️ {post.likes}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => alert(`Coming soon: ${post.title}\n\nThis article will be available soon. Thank you for your interest!`)}
                    className="block w-full bg-gradient-to-r from-[var(--accent)] to-yellow-600 text-white text-center rounded-full px-6 py-3 font-bold shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer"
                  >
                    Read Article
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Newsletter Signup */}
      <section className="bg-gradient-to-r from-amber-50 to-white py-16 max-w-6xl mx-auto px-4 rounded-3xl mb-16">
        <div className="text-center">
          <div className="text-6xl mb-6">📧</div>
          <h2 className="text-3xl font-extrabold text-[var(--foreground)] mb-4">
            Stay Updated
          </h2>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Get the latest puppy care tips, training guides, and expert advice delivered straight to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 rounded-full border-2 border-[var(--accent)] px-6 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition-all"
            />
            <button className="bg-gradient-to-r from-[var(--accent)] to-yellow-600 text-white font-bold rounded-full px-8 py-3 shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300 whitespace-nowrap">
              Subscribe
            </button>
          </div>
          <p className="text-gray-500 text-sm mt-4">
            No spam, unsubscribe anytime. We respect your privacy.
          </p>
        </div>
      </section>

      {/* Popular Topics */}
      <section className="max-w-6xl mx-auto px-4 pb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-[var(--foreground)] mb-4">
            Popular Topics
          </h2>
          <p className="text-xl text-gray-700">
            Explore our most read articles by topic
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {blogCategories.slice(1).map((category) => {
            const categoryPosts = blogPosts.filter(post => post.category === category.id);
            const totalViews = categoryPosts.reduce((sum, post) => sum + post.views, 0);
            
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 text-center hover:scale-105 hover:shadow-2xl transition-all duration-300 group"
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                  {category.icon}
                </div>
                <h3 className="font-bold text-[var(--foreground)] mb-2 text-sm">
                  {category.name}
                </h3>
                <div className="text-xs text-gray-500">
                  {categoryPosts.length} articles
                </div>
                <div className="text-xs text-gray-400">
                  {new Intl.NumberFormat('en-US').format(totalViews)} views
                </div>
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
} 