"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { strapiFetch, type StrapiCollectionResponse } from "@/lib/strapi";

const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL ?? "";

const breeds = [
  {
    name: "Golden Retriever",
    img: "https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=400&q=80",
    desc: "Friendly, intelligent, and devoted family dog.",
    slug: "golden-retriever",
    popularity: "Very Popular",
    size: "Large",
  },
  {
    name: "French Bulldog",
    img: "https://images.unsplash.com/photo-1518715308788-3005759c61d3?auto=format&fit=crop&w=400&q=80",
    desc: "Playful, adaptable, and smart companion.",
    slug: "french-bulldog",
    popularity: "Popular",
    size: "Small",
  },
  {
    name: "Pomeranian",
    img: "https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=400&q=80",
    desc: "Lively, bold, and affectionate small dog.",
    slug: "pomeranian",
    popularity: "Popular",
    size: "Toy",
  },
  {
    name: "Labrador Retriever",
    img: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=400&q=80",
    desc: "Outgoing, even-tempered, and gentle.",
    slug: "labrador-retriever",
    popularity: "Very Popular",
    size: "Large",
  },
  {
    name: "Cavalier King Charles",
    img: "https://images.unsplash.com/photo-1518715308788-3005759c61d3?auto=format&fit=crop&w=400&q=80",
    desc: "Affectionate, graceful, and gentle lapdog.",
    slug: "cavalier-king-charles",
    popularity: "Popular",
    size: "Small",
  },
  {
    name: "Shih Tzu",
    img: "https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=400&q=80",
    desc: "Charming, lively, and friendly companion.",
    slug: "shih-tzu",
    popularity: "Popular",
    size: "Small",
  },
  {
    name: "Yorkshire Terrier",
    img: "https://images.unsplash.com/photo-1551717743-49959800b1f6?auto=format&fit=crop&w=400&q=80",
    desc: "Small but fearless, elegant and confident.",
    slug: "yorkshire-terrier",
    popularity: "Popular",
    size: "Toy",
  },
];

export default function BreedsPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [visibleCards, setVisibleCards] = useState<string[]>([]);
  const [cmsBreeds, setCmsBreeds] = useState<typeof breeds>([]);
  const categoriesRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    async function loadFromCms() {
      try {
        // Load from our new JSON-based API
        const res = await fetch('/api/admin/breeds');
        const breedsData = await res.json();
        
        const mapped = breedsData.map((breed: any) => ({
          name: breed.name,
          img: breed.image || "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=400&q=80",
          desc: breed.description || "",
          slug: breed.slug,
          popularity: "Popular",
          size: "Large",
        }));
        
        // Always use admin data, even if empty
        setCmsBreeds(mapped);
      } catch (e) {
        // keep fallback to static breeds on error
        console.log('Using fallback breeds data');
      }
    }
    loadFromCms();
  }, []);

  // Trigger animations on component mount
  useEffect(() => {
    setIsLoaded(true);
    // Set page-specific background
    document.documentElement.style.background = 'linear-gradient(to bottom right, #eef2ff, #f3e8ff, #fce7f3)';
    document.body.style.background = 'linear-gradient(to bottom right, #eef2ff, #f3e8ff, #fce7f3)';
    
    return () => {
      // Reset background on cleanup
      document.documentElement.style.background = '';
      document.body.style.background = '';
    };
  }, []);

  // Handle card animations
  useEffect(() => {
    const timer = setTimeout(() => {
      cmsBreeds.forEach((breed, index) => {
        setTimeout(() => {
          setVisibleCards(prev => [...prev, breed.slug]);
        }, index * 150);
      });
    }, 800);

    return () => clearTimeout(timer);
  }, [cmsBreeds]);

  return (
    <div className="min-h-screen font-sans flex flex-col overflow-x-hidden">
      {/* Animated floating elements */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-32 left-16 w-5 h-5 bg-[var(--accent)]/20 rounded-full animate-bounce" style={{animationDelay: '0s', animationDuration: '4s'}}></div>
        <div className="absolute top-64 right-32 w-7 h-7 bg-blue-400/20 rounded-full animate-bounce" style={{animationDelay: '1.5s', animationDuration: '5s'}}></div>
        <div className="absolute top-96 left-1/4 w-4 h-4 bg-purple-400/20 rounded-full animate-bounce" style={{animationDelay: '2.5s', animationDuration: '3.5s'}}></div>
        <div className="absolute bottom-64 right-16 w-6 h-6 bg-green-400/20 rounded-full animate-bounce" style={{animationDelay: '1s', animationDuration: '4.5s'}}></div>
        <div className="absolute bottom-32 left-32 w-5 h-5 bg-orange-400/20 rounded-full animate-bounce" style={{animationDelay: '3s', animationDuration: '3s'}}></div>
      </div>

      {/* Hero Section - Egyedi design a Breeds oldalhoz */}
      <section className={`relative bg-gradient-to-br from-indigo-900/80 via-purple-900/80 to-pink-900/80 backdrop-blur-sm min-h-[80vh] flex items-center justify-center py-20 overflow-hidden transition-all duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        {/* Interactive Breed Circles Background */}
        <div className="absolute inset-0 overflow-hidden">
              {cmsBreeds.map((breed, index) => (
            <div
              key={`circle-${breed.slug}-${index}`}
              className={`absolute rounded-full overflow-hidden opacity-20 hover:opacity-60 transition-all duration-500 hover:scale-110 group cursor-pointer`}
              style={{
                width: `${120 + (index % 3) * 40}px`,
                height: `${120 + (index % 3) * 40}px`,
                top: `${15 + (index * 13) % 70}%`,
                left: `${10 + (index * 17) % 80}%`,
                animationDelay: `${index * 0.2}s`
              }}
            >
              <img 
                src={breed.img} 
                alt={breed.name} 
                className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-black/50 group-hover:from-white/10 group-hover:to-black/30 transition-all duration-500"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white font-bold text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center">
                  {breed.name}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="relative z-20 max-w-6xl mx-auto px-4 text-center">
          {/* Main Title */}
          <div className={`mb-16 transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="mb-8">
              <span className="inline-block text-6xl animate-bounce mb-4">🏆</span>
            </div>
            <h1 className="text-7xl sm:text-8xl lg:text-9xl font-black text-white mb-8 leading-none">
              <span className="block bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                DISCOVER
              </span>
              <span className="block text-white drop-shadow-2xl">
                YOUR PERFECT
              </span>
              <span className="block bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                BREED
              </span>
            </h1>
            <p className="text-2xl sm:text-3xl text-white/90 drop-shadow-lg max-w-4xl mx-auto leading-relaxed">
              Explore <span className="font-bold text-yellow-400">{cmsBreeds.length}</span> premium dog breeds, each with unique characteristics and charm
            </p>
          </div>

          {/* Interactive Breed Preview Cards */}
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {cmsBreeds.slice(0, 3).map((breed, index) => (
              <div key={`preview-${breed.slug}-${index}`} className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 hover:bg-white/20 hover:scale-105 transition-all duration-500 group border border-white/20">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden border-4 border-white/30 group-hover:border-white/60 transition-all duration-300">
                  <img 
                    src={breed.img} 
                    alt={breed.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors duration-300">
                  {breed.name}
                </h3>
                <div className="flex justify-center items-center gap-2 mb-3">
                  <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                    breed.popularity === 'High' ? 'bg-red-500/80 text-white' :
                    breed.popularity === 'Medium' ? 'bg-yellow-500/80 text-white' :
                    'bg-green-500/80 text-white'
                  }`}>
                    {breed.popularity === 'High' ? '🔥' : breed.popularity === 'Medium' ? '⭐' : '💎'} {breed.popularity}
                  </div>
                  <div className="px-3 py-1 rounded-full text-xs font-bold bg-white/20 text-white">
                    {breed.size}
                  </div>
                </div>
                <p className="text-white/80 text-sm leading-relaxed">
                  {breed.desc.slice(0, 60)}...
                </p>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className={`flex flex-wrap gap-6 justify-center mb-16 transition-all duration-1000 delay-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <button
              onClick={() => {
                categoriesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-xl px-12 py-5 rounded-full shadow-2xl hover:scale-110 hover:shadow-3xl transition-all duration-300 flex items-center gap-3 group"
            >
              <span className="group-hover:animate-spin">🎯</span>
              Find My Breed Match
            </button>
            <button
              onClick={() => {
                gridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="bg-white/20 backdrop-blur-lg text-white font-bold text-xl px-12 py-5 rounded-full shadow-2xl hover:scale-110 hover:shadow-3xl hover:bg-white/30 transition-all duration-300 flex items-center gap-3 group border border-white/30"
            >
              <span className="group-hover:animate-bounce">📖</span>
              Browse All Breeds
            </button>
          </div>

          {/* Breed Categories */}
          <div ref={categoriesRef} className={`transition-all duration-1000 delay-900 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="flex flex-wrap gap-4 justify-center">
              <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-lg rounded-full px-6 py-3 text-white/90 border border-white/20 hover:scale-105 hover:bg-white/10 transition-all duration-300 group">
                <span className="font-bold">🏠 Family Dogs</span>
                <span className="ml-2 group-hover:animate-bounce inline-block">4</span>
              </div>
              <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 backdrop-blur-lg rounded-full px-6 py-3 text-white/90 border border-white/20 hover:scale-105 hover:bg-white/10 transition-all duration-300 group">
                <span className="font-bold">🎾 Active Breeds</span>
                <span className="ml-2 group-hover:animate-bounce inline-block">3</span>
              </div>
              <div className="bg-gradient-to-r from-pink-500/20 to-red-500/20 backdrop-blur-lg rounded-full px-6 py-3 text-white/90 border border-white/20 hover:scale-105 hover:bg-white/10 transition-all duration-300 group">
                <span className="font-bold">🧸 Small Companions</span>
                <span className="ml-2 group-hover:animate-bounce inline-block">2</span>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className={`absolute bottom-10 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
            <div className="flex flex-col items-center text-white/60 animate-bounce">
              <span className="text-sm font-medium mb-2">Explore breeds below</span>
              <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center">
                <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-10 text-4xl text-white/10 animate-float" style={{animationDelay: '0s'}}>🐕‍🦺</div>
          <div className="absolute top-1/3 right-20 text-5xl text-white/10 animate-float" style={{animationDelay: '2s'}}>🦴</div>
          <div className="absolute bottom-1/4 left-20 text-3xl text-white/10 animate-float" style={{animationDelay: '4s'}}>🎾</div>
          <div className="absolute bottom-1/3 right-10 text-4xl text-white/10 animate-float" style={{animationDelay: '1s'}}>❤️</div>
          <div className="absolute top-1/2 left-1/3 text-2xl text-white/10 animate-float" style={{animationDelay: '3s'}}>⭐</div>
          <div className="absolute top-2/3 right-1/3 text-6xl text-white/10 animate-float" style={{animationDelay: '5s'}}>🏆</div>
        </div>
      </section>

      {/* Breeds Grid */}
      <section ref={gridRef} className="flex-1 max-w-7xl mx-auto px-4 w-full pb-20">
        <div className={`text-center mb-12 transition-all duration-1000 delay-900 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <h2 className="text-3xl font-bold text-[var(--foreground)] mb-4 hover:animate-pulse transition-all duration-300 cursor-default">
            🌟 Popular Dog Breeds 🌟
          </h2>
          <p className="text-gray-600 text-lg">
            Choose from our selection of beloved family companions
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 w-full">
          {cmsBreeds.map((breed, index) => (
            <div 
              key={`grid-${breed.slug}-${index}`} 
              className={`bg-white rounded-3xl shadow-xl border border-gray-100 flex flex-col overflow-hidden hover:scale-105 hover:shadow-2xl transition-all duration-500 group puppy-card ${
                visibleCards.includes(breed.slug) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{
                transitionDelay: `${800 + index * 150}ms`
              }}
            >
              <div className="relative overflow-hidden">
                <img 
                  src={breed.img} 
                  alt={breed.name} 
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-bold shadow-lg animate-pulse ${
                  breed.popularity === 'Very Popular' 
                    ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white' 
                    : 'bg-gradient-to-r from-[var(--accent)] to-yellow-600 text-white'
                }`}>
                  {breed.popularity === 'Very Popular' ? '🔥 ' : '⭐ '}{breed.popularity}
                </div>
                
                {/* Heart overlay on hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="text-6xl text-white animate-pulse">🐕💕</div>
                </div>
              </div>
              
              <div className="p-8 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-3">
                  <h2 className="text-2xl font-bold text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors duration-300">{breed.name}</h2>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-110 ${
                    breed.size === 'Large' ? 'bg-blue-100 text-blue-800 hover:bg-blue-200' :
                    breed.size === 'Small' ? 'bg-green-100 text-green-800 hover:bg-green-200' :
                    'bg-purple-100 text-purple-800 hover:bg-purple-200'
                  }`}>
                    {breed.size === 'Large' ? '🐕‍🦺' : breed.size === 'Small' ? '🐕' : '🧸'} {breed.size}
                  </span>
                </div>
                <p className="text-gray-700 text-center mb-6 leading-relaxed flex-1 group-hover:text-gray-900 transition-colors duration-300">{breed.desc}</p>
                <div className="flex gap-3">
                  <Link 
                    href={`/breeds/${breed.slug}`} 
                    className="flex-1 bg-gradient-to-r from-[var(--accent)] to-yellow-600 text-white text-center rounded-full px-6 py-3 font-bold shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 hover:from-yellow-600 hover:to-[var(--accent)]"
                  >
                    View Puppies 👀
                  </Link>
                  <button className="bg-gray-100 text-gray-700 rounded-full px-4 py-3 font-semibold hover:bg-red-100 hover:text-red-500 transition-all duration-300 hover:scale-110 group/heart">
                    <span className="group-hover/heart:animate-pulse">♡</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className={`bg-gradient-to-r from-amber-50 to-white py-16 max-w-6xl mx-auto px-4 w-full rounded-3xl mb-16 transition-all duration-1000 delay-1200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--foreground)] mb-6 hover:animate-pulse transition-all duration-300 cursor-default">
            Can't find the perfect breed? 🤔
          </h2>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Contact our breed specialists for personalized recommendations based on your lifestyle and preferences. ✨
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact" className="bg-gradient-to-r from-[var(--accent)] to-yellow-600 text-white font-bold rounded-full px-8 py-4 shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300 hover:from-yellow-600 hover:to-[var(--accent)] animate-pulse">
              Contact Specialist 📞
            </Link>
            <Link href="/quiz" className="bg-white text-[var(--accent)] font-bold rounded-full px-8 py-4 shadow-xl border-2 border-[var(--accent)] hover:scale-105 hover:shadow-2xl hover:bg-[var(--accent)] hover:text-white transition-all duration-300">
              Take Breed Quiz 📝
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
} 