"use client";
import { useState, ChangeEvent, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

// No more fallback data - using admin API only

// Helper function to get reserved puppies from localStorage (client-side only)
const getReservedPuppies = (): string[] => {
  if (typeof window === 'undefined') return [];
  try {
    const reserved = localStorage.getItem('reservedPuppies');
    return reserved ? JSON.parse(reserved) : [];
  } catch {
    return [];
  }
};

export default function PuppiesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    breed: "",
    gender: "",
    size: "",
    priceMin: "",
    priceMax: "",
    available: "", // Show all puppies by default (not just available)
  });
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState("grid");
  const [reservedPuppies, setReservedPuppies] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [visibleCards, setVisibleCards] = useState<string[]>([]);
  const [cmsPuppies, setCmsPuppies] = useState<any[]>([]);
  const [breeds, setBreeds] = useState<any[]>([]);
  const [mounted, setMounted] = useState(false);
  const numberFormatter = new Intl.NumberFormat('en-US');
  const filtersSectionRef = useRef<HTMLDivElement | null>(null);
  const resultsSectionRef = useRef<HTMLDivElement | null>(null);

  // Handle client-side mounting
  useEffect(() => {
    setMounted(true);
    setReservedPuppies(getReservedPuppies());
  }, []);

  useEffect(() => {
    async function loadFromCms() {
      try {
        // Load puppies from API
        const res = await fetch('/api/admin/puppies');
        const puppiesData = await res.json();
        
        // Map the data to the format expected by the UI
        const mapped = puppiesData.map((puppy: any) => ({
          id: puppy.id,
          name: puppy.name,
          breed: puppy.breed,
          breedSlug: puppy.breedSlug || puppy.breed_slug,
          img: (puppy.images && puppy.images[0]) || puppy.image,
          price: puppy.price,
          gender: puppy.gender,
          age: puppy.age,
          size: puppy.size,
          location: puppy.location,
          desc: puppy.description,
          available: puppy.status === 'available',
          featured: puppy.featured,
          reserved: puppy.status === 'reserved',
          images: puppy.images || (puppy.image ? [puppy.image] : []),
        }));
        
        console.log('Loaded from admin API:', mapped);
        // Always use admin data, even if empty
        setCmsPuppies(mapped);
      } catch (error) {
        console.error('Error loading from admin API:', error);
        // No fallback - show empty if error
        setCmsPuppies([]);
      }
    }

    async function loadBreeds() {
      try {
        // Load breeds from API
        const res = await fetch('/api/admin/breeds');
        const breedsData = await res.json();
        console.log('Loaded breeds:', breedsData);
        setBreeds(breedsData);
      } catch (error) {
        console.error('Error loading breeds:', error);
        setBreeds([]);
      }
    }
    
    loadFromCms();
    loadBreeds();
  }, []);



  // Trigger animations on component mount
  useEffect(() => {
    setIsLoaded(true);
    // Set page-specific background
    document.documentElement.style.background = 'linear-gradient(to bottom right, #fffbeb, #fed7aa, #fef3c7)';
    document.body.style.background = 'linear-gradient(to bottom right, #fffbeb, #fed7aa, #fef3c7)';
    
    return () => {
      // Reset background on cleanup
      document.documentElement.style.background = '';
      document.body.style.background = '';
    };
  }, []);

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const filteredPuppies = cmsPuppies
    .filter(puppy => {
      const searchMatch = searchTerm === "" || 
        puppy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        puppy.breed.toLowerCase().includes(searchTerm.toLowerCase()) ||
        puppy.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
        puppy.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      const breedMatch = !filters.breed || puppy.breed === filters.breed;
      const genderMatch = !filters.gender || puppy.gender === filters.gender;
      const sizeMatch = !filters.size || puppy.size === filters.size;
      const priceMinMatch = !filters.priceMin || puppy.price >= Number(filters.priceMin);
      const priceMaxMatch = !filters.priceMax || puppy.price <= Number(filters.priceMax);
      const availableMatch = !filters.available || filters.available === "all" || 
        (filters.available === "available" && puppy.available) ||
        (filters.available === "sold" && !puppy.available);
      
      return searchMatch && breedMatch && genderMatch && sizeMatch && priceMinMatch && priceMaxMatch && availableMatch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "age":
          return parseInt(a.age) - parseInt(b.age);
        case "name":
          return a.name.localeCompare(b.name);
        case "featured":
        default:
          return b.featured ? 1 : -1;
      }
    });

  // Handle card animations when filtered puppies change
  useEffect(() => {
    setVisibleCards([]); // Reset visible cards
    
    const timer = setTimeout(() => {
      filteredPuppies.forEach((puppy, index) => {
        setTimeout(() => {
          setVisibleCards(prev => [...prev, puppy.id]);
        }, index * 100);
      });
    }, 100);

    return () => clearTimeout(timer);
  }, [filteredPuppies.length]);

  return (
    <div className="min-h-screen font-sans overflow-x-hidden">
      {/* Animated floating elements */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-4 h-4 bg-[var(--accent)]/20 rounded-full animate-bounce" style={{animationDelay: '0s', animationDuration: '3s'}}></div>
        <div className="absolute top-40 right-20 w-6 h-6 bg-yellow-400/20 rounded-full animate-bounce" style={{animationDelay: '1s', animationDuration: '4s'}}></div>
        <div className="absolute top-60 left-1/3 w-3 h-3 bg-orange-400/20 rounded-full animate-bounce" style={{animationDelay: '2s', animationDuration: '5s'}}></div>
        <div className="absolute bottom-40 right-10 w-5 h-5 bg-[var(--accent)]/20 rounded-full animate-bounce" style={{animationDelay: '0.5s', animationDuration: '3.5s'}}></div>
        <div className="absolute bottom-20 left-20 w-4 h-4 bg-yellow-500/20 rounded-full animate-bounce" style={{animationDelay: '1.5s', animationDuration: '4.5s'}}></div>
      </div>

      {/* Hero Section - Egyedi design a Puppies oldalhoz */}
      <section className={`relative min-h-[80vh] flex items-center justify-center py-20 overflow-hidden transition-all duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        {/* Background Video/Images Carousel */}
        <div className="absolute inset-0 z-0">
          <div className="grid grid-cols-3 grid-rows-2 h-full gap-1">
            <div className="relative overflow-hidden group">
              <Image 
                src="https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=600&q=80" 
                alt="Happy puppy 1" 
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/40 to-transparent z-10"></div>
            </div>
            <div className="relative overflow-hidden group">
              <Image 
                src="https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=600&q=80" 
                alt="Happy puppy 2" 
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/40 to-transparent z-10"></div>
            </div>
            <div className="relative overflow-hidden group">
              <Image 
                src="https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=600&q=80" 
                alt="Happy puppy 3" 
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/40 to-transparent z-10"></div>
            </div>
            <div className="relative overflow-hidden group">
              <Image 
                src="https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=600&q=80" 
                alt="Happy puppy 4" 
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/40 to-transparent z-10"></div>
            </div>
            <div className="relative overflow-hidden group">
              <Image 
                src="https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=600&q=80" 
                alt="Happy puppy 5" 
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/40 to-transparent z-10"></div>
            </div>
            <div className="relative overflow-hidden group">
              <Image 
                src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&w=600&q=80" 
                alt="Happy puppy 6" 
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/40 to-transparent z-10"></div>
            </div>
          </div>
          <div className="absolute inset-0 bg-black/50 z-5"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/60 z-10"></div>
        </div>

        {/* Main Content */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 text-center">
          {/* Main Title */}
          <div className={`mb-8 sm:mb-12 transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black text-white mb-4 sm:mb-6 leading-none">
              <span className="block bg-gradient-to-r from-amber-500 via-orange-400 to-yellow-500 bg-clip-text text-transparent animate-pulse">
                FIND YOUR
              </span>
              <span className="block text-white drop-shadow-2xl">
                PERFECT
              </span>
              <span className="block bg-gradient-to-r from-emerald-400 via-teal-500 to-sky-500 bg-clip-text text-transparent animate-pulse">
                PUPPY
              </span>
            </h1>
            <p className="text-lg sm:text-2xl md:text-3xl text-white/90 drop-shadow-lg max-w-4xl mx-auto leading-relaxed px-4">
              Over <span className="font-bold text-[var(--accent)]">{filteredPuppies.length}</span> healthy, happy puppies waiting for their forever homes
            </p>
          </div>

          {/* Stats Grid */}
          <div className={`grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 mb-8 sm:mb-12 transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="bg-white/95 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-4 sm:p-6 hover:scale-105 hover:bg-white transition-all duration-300 group">
              <div className="text-2xl sm:text-4xl font-black text-[var(--accent)] mb-1 sm:mb-2 group-hover:animate-pulse">
                {filteredPuppies.length}
              </div>
              <div className="text-xs sm:text-sm font-bold text-gray-700">Available Now</div>
              <div className="text-lg sm:text-2xl mt-1 sm:mt-2 group-hover:animate-bounce">🐕</div>
            </div>
            <div className="bg-white/95 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-4 sm:p-6 hover:scale-105 hover:bg-white transition-all duration-300 group">
              <div className="text-2xl sm:text-4xl font-black text-green-600 mb-1 sm:mb-2 group-hover:animate-pulse">
                100%
              </div>
              <div className="text-xs sm:text-sm font-bold text-gray-700">Health Certified</div>
              <div className="text-lg sm:text-2xl mt-1 sm:mt-2 group-hover:animate-bounce">🏥</div>
            </div>
            <div className="bg-white/95 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-4 sm:p-6 hover:scale-105 hover:bg-white transition-all duration-300 group">
              <div className="text-2xl sm:text-4xl font-black text-blue-600 mb-1 sm:mb-2 group-hover:animate-pulse">
                50+
              </div>
              <div className="text-xs sm:text-sm font-bold text-gray-700">Countries Served</div>
              <div className="text-lg sm:text-2xl mt-1 sm:mt-2 group-hover:animate-bounce">🌍</div>
            </div>
            <div className="bg-white/95 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-4 sm:p-6 hover:scale-105 hover:bg-white transition-all duration-300 group">
              <div className="text-2xl sm:text-4xl font-black text-purple-600 mb-1 sm:mb-2 group-hover:animate-pulse">
                24/7
              </div>
              <div className="text-xs sm:text-sm font-bold text-gray-700">Support</div>
              <div className="text-lg sm:text-2xl mt-1 sm:mt-2 group-hover:animate-bounce">💬</div>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className={`flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center px-4 transition-all duration-1000 delay-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <button
              onClick={() => {
                resultsSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="bg-gradient-to-r from-[var(--accent)] to-yellow-600 text-white font-bold text-lg sm:text-xl px-8 sm:px-10 py-3 sm:py-4 rounded-full shadow-2xl hover:scale-110 hover:shadow-3xl transition-all duration-300 flex items-center justify-center gap-3 group touch-manipulation"
            >
              <span className="group-hover:animate-bounce">🔍</span>
              <span className="whitespace-nowrap">Browse All Puppies</span>
            </button>
            <button
              onClick={() => {
                filtersSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="bg-white/95 backdrop-blur-lg text-gray-800 font-bold text-lg sm:text-xl px-8 sm:px-10 py-3 sm:py-4 rounded-full shadow-2xl hover:scale-110 hover:shadow-3xl transition-all duration-300 flex items-center justify-center gap-3 group border-2 border-white/50 touch-manipulation"
            >
              <span className="group-hover:animate-bounce">🎯</span>
              <span className="whitespace-nowrap">Find My Match</span>
            </button>
          </div>

          {/* Scroll Indicator */}
          <div className={`absolute bottom-10 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
            <div className="flex flex-col items-center text-white/70 animate-bounce">
              <span className="text-sm font-medium mb-2">Scroll to explore</span>
              <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
                <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

              {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none z-15 overflow-hidden">
          <div className="absolute top-20 left-20 text-4xl animate-float opacity-30" style={{animationDelay: '0s'}}>🐾</div>
          <div className="absolute top-40 right-32 text-3xl animate-float opacity-20" style={{animationDelay: '2s'}}>❤️</div>
          <div className="absolute bottom-40 left-32 text-5xl animate-float opacity-25" style={{animationDelay: '4s'}}>🎾</div>
          <div className="absolute bottom-20 right-20 text-3xl animate-float opacity-30" style={{animationDelay: '1s'}}>🦴</div>
          <div className="absolute top-1/2 left-10 text-2xl animate-float opacity-20" style={{animationDelay: '3s'}}>⭐</div>
          <div className="absolute top-1/3 right-10 text-4xl animate-float opacity-25" style={{animationDelay: '5s'}}>✨</div>
        </div>
      </section>

      {/* Search Bar */}
      <section className={`max-w-6xl mx-auto px-4 mb-6 sm:mb-8 transition-all duration-1000 delay-900 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
        <div className="relative max-w-2xl mx-auto group">
          <input
            type="text"
            placeholder="Search puppies by name, breed..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border-2 border-gray-200 px-4 sm:px-6 py-3 sm:py-4 pl-10 sm:pl-12 text-base sm:text-lg focus:outline-none focus:ring-4 focus:ring-[var(--accent)]/30 focus:border-[var(--accent)] transition-all shadow-lg hover:shadow-xl group-hover:scale-105 touch-manipulation"
          />
          <div className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg sm:text-xl group-hover:animate-pulse">
            🔍
          </div>
          <div className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs sm:text-sm animate-pulse opacity-50 hidden sm:block">
            Type to search...
          </div>
        </div>
      </section>

      {/* Filters */}
      <section ref={filtersSectionRef} className={`max-w-6xl mx-auto px-4 mb-8 sm:mb-12 transition-all duration-1000 delay-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
        <div className="bg-white/95 backdrop-blur-lg shadow-2xl rounded-2xl sm:rounded-3xl p-4 sm:p-8 border-2 border-[var(--accent)]/20 hover:shadow-3xl hover:border-[var(--accent)]/40 transition-all duration-300 group">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-[var(--foreground)] mb-2 group-hover:animate-pulse">🔍 Filter Your Perfect Puppy</h2>
            <p className="text-gray-600 text-sm sm:text-base">Use the filters below to find exactly what you're looking for</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-4 sm:mb-6">
            <div className="hover:scale-105 transition-transform duration-300">
              <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                🐕 Breed
              </label>
              <select
                name="breed"
                value={filters.breed}
                onChange={handleFilterChange}
                className="w-full rounded-xl border-2 border-gray-200 px-3 sm:px-4 py-3 text-sm sm:text-base focus:outline-none focus:ring-4 focus:ring-[var(--accent)]/30 focus:border-[var(--accent)] transition-all hover:shadow-lg hover:border-[var(--accent)]/50 touch-manipulation"
              >
                <option value="">All Breeds</option>
                {breeds.map((breed) => (
                  <option key={breed.id} value={breed.name}>
                    {breed.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="hover:scale-105 transition-transform duration-300">
              <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                ⚥ Gender
              </label>
              <select
                name="gender"
                value={filters.gender}
                onChange={handleFilterChange}
                className="w-full rounded-xl border-2 border-gray-200 px-3 sm:px-4 py-3 text-sm sm:text-base focus:outline-none focus:ring-4 focus:ring-[var(--accent)]/30 focus:border-[var(--accent)] transition-all hover:shadow-lg hover:border-[var(--accent)]/50 touch-manipulation"
              >
                <option value="">Any Gender</option>
                <option value="Male">Male ♂</option>
                <option value="Female">Female ♀</option>
              </select>
            </div>

            <div className="hover:scale-105 transition-transform duration-300">
              <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                📏 Size
              </label>
              <select
                name="size"
                value={filters.size}
                onChange={handleFilterChange}
                className="w-full rounded-xl border-2 border-gray-200 px-3 sm:px-4 py-3 text-sm sm:text-base focus:outline-none focus:ring-4 focus:ring-[var(--accent)]/30 focus:border-[var(--accent)] transition-all hover:shadow-lg hover:border-[var(--accent)]/50 touch-manipulation"
              >
                <option value="">Any Size</option>
                <option value="Toy">Toy 🧸</option>
                <option value="Small">Small 🐕</option>
                <option value="Large">Large 🐕‍🦺</option>
              </select>
            </div>

            <div className="hover:scale-105 transition-transform duration-300">
              <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                📊 Availability
              </label>
              <select
                name="available"
                value={filters.available}
                onChange={handleFilterChange}
                className="w-full rounded-xl border-2 border-gray-200 px-3 sm:px-4 py-3 text-sm sm:text-base focus:outline-none focus:ring-4 focus:ring-[var(--accent)]/30 focus:border-[var(--accent)] transition-all hover:shadow-lg hover:border-[var(--accent)]/50 touch-manipulation"
              >
                <option value="available">Available Only ✅</option>
                <option value="all">All Puppies 📋</option>
                <option value="sold">Sold ❌</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <div className="hover:scale-105 transition-transform duration-300">
              <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                💰 Min Price (€)
              </label>
              <input
                type="number"
                name="priceMin"
                value={filters.priceMin}
                onChange={handleFilterChange}
                placeholder="0"
                className="w-full rounded-xl border-2 border-gray-200 px-3 sm:px-4 py-3 text-sm sm:text-base focus:outline-none focus:ring-4 focus:ring-[var(--accent)]/30 focus:border-[var(--accent)] transition-all hover:shadow-lg hover:border-[var(--accent)]/50 touch-manipulation"
              />
            </div>

            <div className="hover:scale-105 transition-transform duration-300">
              <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                💎 Max Price (€)
              </label>
              <input
                type="number"
                name="priceMax"
                value={filters.priceMax}
                onChange={handleFilterChange}
                placeholder="3000"
                className="w-full rounded-xl border-2 border-gray-200 px-3 sm:px-4 py-3 text-sm sm:text-base focus:outline-none focus:ring-4 focus:ring-[var(--accent)]/30 focus:border-[var(--accent)] transition-all hover:shadow-lg hover:border-[var(--accent)]/50 touch-manipulation"
              />
            </div>

            <div className="hover:scale-105 transition-transform duration-300 sm:col-span-2 lg:col-span-1">
              <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                📈 Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full rounded-xl border-2 border-gray-200 px-3 sm:px-4 py-3 text-sm sm:text-base focus:outline-none focus:ring-4 focus:ring-[var(--accent)]/30 focus:border-[var(--accent)] transition-all hover:shadow-lg hover:border-[var(--accent)]/50 touch-manipulation"
              >
                <option value="featured">⭐ Featured First</option>
                <option value="price-low">💸 Price: Low to High</option>
                <option value="price-high">💰 Price: High to Low</option>
                <option value="age">👶 Age: Youngest First</option>
                <option value="name">🔤 Name: A to Z</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Results Header */}
      <section className={`max-w-6xl mx-auto px-4 mb-6 sm:mb-8 transition-all duration-1000 delay-1100 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg border border-[var(--accent)]/10 hover:shadow-xl transition-all duration-300">
          <div className="text-lg sm:text-xl font-bold text-[var(--foreground)] flex items-center gap-2 sm:gap-3">
            <span className="text-xl sm:text-2xl animate-pulse">🐾</span>
            <span className="hover:animate-pulse transition-all duration-300 text-center sm:text-left">
              {filteredPuppies.length} {filteredPuppies.length === 1 ? 'puppy' : 'puppies'} found
            </span>
            {filteredPuppies.length > 0 && (
              <span className="ml-1 sm:ml-2 text-base sm:text-lg animate-bounce">✨</span>
            )}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode("grid")}
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg flex items-center gap-1 sm:gap-2 text-sm sm:text-base touch-manipulation ${
                viewMode === "grid" 
                  ? "bg-gradient-to-r from-[var(--accent)] to-yellow-600 text-white animate-pulse" 
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300 hover:text-gray-900"
              }`}
            >
              <span>⚏</span>
              <span className="hidden sm:inline">Grid View</span>
              <span className="sm:hidden">Grid</span>
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg flex items-center gap-1 sm:gap-2 text-sm sm:text-base touch-manipulation ${
                viewMode === "list" 
                  ? "bg-gradient-to-r from-[var(--accent)] to-yellow-600 text-white animate-pulse" 
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300 hover:text-gray-900"
              }`}
            >
              <span>☰</span>
              <span className="hidden sm:inline">List View</span>
              <span className="sm:hidden">List</span>
            </button>
          </div>
        </div>
      </section>

      {/* Puppies Grid/List */}
      <section ref={resultsSectionRef} className="max-w-6xl mx-auto px-4 pb-20">
        {filteredPuppies.length === 0 ? (
          <div className={`text-center py-16 transition-all duration-1000 delay-1200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            <div className="text-8xl mb-6 animate-bounce">🐕</div>
            <h3 className="text-3xl font-bold text-gray-600 mb-4">No puppies found</h3>
            <p className="text-gray-500 mb-8">Try adjusting your filters to see more results.</p>
            <button
              onClick={() => setFilters({ breed: "", gender: "", size: "", priceMin: "", priceMax: "", available: "available" })}
              className="bg-gradient-to-r from-[var(--accent)] to-yellow-600 text-white font-bold rounded-full px-8 py-4 shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300 animate-pulse"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className={
            viewMode === "grid" 
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10" 
              : "space-y-4 sm:space-y-6"
          }>
            {filteredPuppies.map((puppy, index) => (
              <div
                key={puppy.id}
                className={`bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-gray-100 overflow-hidden hover:scale-105 hover:shadow-2xl transition-all duration-500 group ${
                  viewMode === "list" ? "flex flex-col sm:flex-row" : "flex flex-col"
                } ${!puppy.available ? "opacity-75" : ""} ${
                  visibleCards.includes(puppy.id) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{
                  transitionDelay: `${index * 100}ms`
                }}
              >
                <div className={`relative overflow-hidden ${viewMode === "list" ? "sm:w-64 flex-shrink-0 h-48 sm:h-full" : "h-64"}`}>
                  <Image 
                    src={puppy.img} 
                    alt={puppy.name} 
                    fill
                    sizes={viewMode === "list" ? "(max-width: 640px) 100vw, 256px" : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"}
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  {puppy.featured && (
                    <div className="absolute top-4 left-4 bg-[var(--accent)] text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg animate-pulse">
                      ⭐ Featured
                    </div>
                  )}
                  {!puppy.available && (
                    <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                      Sold
                    </div>
                  )}
                  {puppy.available && (puppy.reserved || reservedPuppies.includes(puppy.id)) && (
                    <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                      Reserved
                    </div>
                  )}
                  {puppy.available && !(puppy.reserved || reservedPuppies.includes(puppy.id)) && (
                    <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg animate-pulse">
                      Available
                    </div>
                  )}
                  
                  {/* Heart overlay on hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="text-6xl text-white animate-pulse">💕</div>
                  </div>
                </div>
                
                <div className={`p-4 sm:p-6 lg:p-8 flex flex-col ${viewMode === "list" ? "flex-1" : ""}`}>
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl sm:text-2xl font-bold text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors duration-300">{puppy.name}</h3>
                    <div className="text-right">
                      <div className="text-xl sm:text-2xl font-bold text-[var(--accent)] group-hover:animate-pulse">€{numberFormatter.format(puppy.price)}</div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4">
                    <span className="bg-blue-100 text-blue-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold hover:bg-blue-200 transition-colors duration-300">
                      {puppy.breed}
                    </span>
                    <span className="bg-purple-100 text-purple-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold hover:bg-purple-200 transition-colors duration-300">
                      {puppy.gender}
                    </span>
                    <span className="bg-green-100 text-green-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold hover:bg-green-200 transition-colors duration-300">
                      {puppy.age}
                    </span>
                    <span className="bg-orange-100 text-orange-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold hover:bg-orange-200 transition-colors duration-300">
                      {puppy.size}
                    </span>
                  </div>

                  <p className="text-gray-700 mb-3 sm:mb-4 leading-relaxed flex-1 group-hover:text-gray-900 transition-colors duration-300 text-sm sm:text-base">{puppy.desc}</p>
                  
                  <div className="flex items-center gap-2 mb-4 sm:mb-6 text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
                    <span className="text-base sm:text-lg animate-pulse">📍</span>
                    <span className="text-xs sm:text-sm">{puppy.location}</span>
                  </div>

                  <div className="flex gap-2 sm:gap-3">
                    <Link 
                      href={`/breeds/${puppy.breedSlug}/puppy/${puppy.id}`}
                      className="flex-1 bg-gradient-to-r from-[var(--accent)] to-yellow-600 text-white text-center rounded-full px-4 sm:px-6 py-2 sm:py-3 font-bold shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 hover:from-yellow-600 hover:to-[var(--accent)] text-sm sm:text-base touch-manipulation"
                    >
                      <span className="hidden sm:inline">{puppy.available ? "View Details 👀" : "View (Sold) 💔"}</span>
                      <span className="sm:hidden">{puppy.available ? "View 👀" : "Sold 💔"}</span>
                    </Link>
                    <button className="bg-gray-100 text-gray-700 rounded-full px-3 sm:px-4 py-2 sm:py-3 font-semibold hover:bg-red-100 hover:text-red-500 transition-all duration-300 hover:scale-110 group/heart touch-manipulation">
                      <span className="group-hover/heart:animate-pulse">♡</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Bottom CTA */}
      <section className={`bg-gradient-to-r from-amber-50 to-white py-16 max-w-6xl mx-auto px-4 rounded-3xl mb-16 transition-all duration-1000 delay-1300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-[var(--foreground)] mb-4 hover:animate-pulse transition-all duration-300 cursor-default">
            Need help choosing the right puppy? 🤔
          </h2>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Our puppy specialists are here to help you find the perfect match for your family and lifestyle. ✨
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact" className="bg-gradient-to-r from-[var(--accent)] to-yellow-600 text-white font-bold rounded-full px-8 py-4 shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300 hover:from-yellow-600 hover:to-[var(--accent)] animate-pulse">
              Contact Specialist 📞
            </Link>
            <Link href="/breeds" className="bg-white text-[var(--accent)] font-bold rounded-full px-8 py-4 shadow-xl border-2 border-[var(--accent)] hover:scale-105 hover:shadow-2xl hover:bg-[var(--accent)] hover:text-white transition-all duration-300">
              Browse by Breed 🐕‍🦺
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
} 