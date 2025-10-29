"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";

const breedData: Record<string, any> = {
  "golden-retriever": {
    name: "Golden Retriever",
    img: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=800&q=80",
    desc: "Golden Retrievers are friendly, intelligent, and devoted dogs. They make excellent family pets and are known for their gentle temperament.",
    size: "Large",
    popularity: "Very Popular",
    characteristics: [
      { name: "Temperament", value: "Friendly, Intelligent, Devoted", icon: "😊" },
      { name: "Size", value: "Large (55-75 lbs)", icon: "📏" },
      { name: "Lifespan", value: "10-12 years", icon: "⏰" },
      { name: "Exercise", value: "High", icon: "🏃" },
      { name: "Grooming", value: "Moderate", icon: "✂️" },
      { name: "Training", value: "Easy", icon: "🎓" },
    ],
    puppies: [], // Will be populated dynamically
  },
  "french-bulldog": {
    name: "French Bulldog",
    img: "https://images.unsplash.com/photo-1518715308788-3005759c61d3?auto=format&fit=crop&w=800&q=80",
    desc: "French Bulldogs are playful, adaptable, and smart companions. Perfect for apartment living with their calm demeanor.",
    size: "Small",
    popularity: "Popular",
    characteristics: [
      { name: "Temperament", value: "Playful, Adaptable, Smart", icon: "😊" },
      { name: "Size", value: "Small (20-28 lbs)", icon: "📏" },
      { name: "Lifespan", value: "10-12 years", icon: "⏰" },
      { name: "Exercise", value: "Low", icon: "🚶" },
      { name: "Grooming", value: "Low", icon: "✂️" },
      { name: "Training", value: "Moderate", icon: "🎓" },
    ],
    puppies: [],
  },
  "pomeranian": {
    name: "Pomeranian",
    img: "https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=800&q=80",
    desc: "Pomeranians are lively, bold, and affectionate small dogs. They make excellent companions with their fluffy coat and big personality.",
    size: "Toy",
    popularity: "Popular",
    characteristics: [
      { name: "Temperament", value: "Lively, Bold, Affectionate", icon: "😊" },
      { name: "Size", value: "Toy (3-7 lbs)", icon: "📏" },
      { name: "Lifespan", value: "12-16 years", icon: "⏰" },
      { name: "Exercise", value: "Low", icon: "🚶" },
      { name: "Grooming", value: "High", icon: "✂️" },
      { name: "Training", value: "Moderate", icon: "🎓" },
    ],
    puppies: [],
  },
  "labrador-retriever": {
    name: "Labrador Retriever",
    img: "https://images.unsplash.com/photo-1551717743-49959800b1f6?auto=format&fit=crop&w=800&q=80",
    desc: "Labrador Retrievers are outgoing, even-tempered, and gentle dogs. They are excellent family pets and love water activities.",
    size: "Large",
    popularity: "Very Popular",
    characteristics: [
      { name: "Temperament", value: "Outgoing, Even-tempered, Gentle", icon: "😊" },
      { name: "Size", value: "Large (55-80 lbs)", icon: "📏" },
      { name: "Lifespan", value: "10-12 years", icon: "⏰" },
      { name: "Exercise", value: "High", icon: "🏃" },
      { name: "Grooming", value: "Moderate", icon: "✂️" },
      { name: "Training", value: "Easy", icon: "🎓" },
    ],
    puppies: [],
  },
  "cavalier-king-charles": {
    name: "Cavalier King Charles",
    img: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=800&q=80",
    desc: "Cavalier King Charles Spaniels are affectionate, graceful, and gentle lapdogs with a royal demeanor.",
    size: "Small",
    popularity: "Popular",
    characteristics: [
      { name: "Temperament", value: "Affectionate, Graceful, Gentle", icon: "😊" },
      { name: "Size", value: "Small (13-18 lbs)", icon: "📏" },
      { name: "Lifespan", value: "12-15 years", icon: "⏰" },
      { name: "Exercise", value: "Moderate", icon: "🚶" },
      { name: "Grooming", value: "Moderate", icon: "✂️" },
      { name: "Training", value: "Easy", icon: "🎓" },
    ],
    puppies: [],
  },
  "yorkshire-terrier": {
    name: "Yorkshire Terrier",
    img: "https://images.unsplash.com/photo-1551717743-49959800b1f6?auto=format&fit=crop&w=800&q=80",
    desc: "Yorkshire Terriers are small but fearless dogs with elegant coats and brave personalities. Perfect apartment companions.",
    size: "Toy",
    popularity: "Popular",
    characteristics: [
      { name: "Temperament", value: "Fearless, Elegant, Confident", icon: "😊" },
      { name: "Size", value: "Toy (4-7 lbs)", icon: "📏" },
      { name: "Lifespan", value: "13-16 years", icon: "⏰" },
      { name: "Exercise", value: "Low", icon: "🚶" },
      { name: "Grooming", value: "High", icon: "✂️" },
      { name: "Training", value: "Moderate", icon: "🎓" },
    ],
    puppies: [],
  },
};

export default function BreedPage() {
  const params = useParams();
  const breedSlug = params?.breed as string;
  const [breed, setBreed] = useState<any>(null);
  
  const [isLoaded, setIsLoaded] = useState(false);
  const [visibleCharacteristics, setVisibleCharacteristics] = useState<number[]>([]);
  const [visiblePuppies, setVisiblePuppies] = useState<number[]>([]);

  // Load breed data and puppies from admin API
  useEffect(() => {
    async function loadBreedData() {
      try {
        // First, get the breed from admin API
        const breedResponse = await fetch('/api/admin/breeds');
        const allBreeds = await breedResponse.json();
        const foundBreed = allBreeds.find((b: any) => b.slug === breedSlug);
        
        if (foundBreed) {
          // Get puppies for this breed from admin API
          const puppyResponse = await fetch('/api/admin/puppies');
          const allPuppies = await puppyResponse.json();
          
          const breedPuppies = allPuppies
            .filter((puppy: any) => (puppy.breedSlug || puppy.breed_slug) === breedSlug)
            .map((puppy: any) => ({
              name: puppy.name,
              img: puppy.image,
              price: puppy.price,
              gender: puppy.gender,
              desc: puppy.description,
              reserved: puppy.status === 'reserved' || puppy.status === 'sold',
              id: puppy.id,
              age: puppy.age,
              location: puppy.location,
              available: puppy.status === 'available'
            }));

          // Build breed object from admin data
          setBreed({
            name: foundBreed.name,
            img: foundBreed.image || "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=800&q=80",
            desc: foundBreed.description || "",
            size: foundBreed.size || "Medium",
            popularity: "Popular",
            characteristics: [
              { name: "Temperament", value: foundBreed.temperament || "Friendly, Loyal", icon: "😊" },
              { name: "Size", value: foundBreed.size || "Medium", icon: "📏" },
              { name: "Lifespan", value: foundBreed.lifespan || "10-15 years", icon: "⏰" },
              { name: "Exercise", value: foundBreed.exercise || "Moderate", icon: "🏃" },
              { name: "Grooming", value: foundBreed.grooming || "Moderate", icon: "✂️" },
              { name: "Training", value: foundBreed.training || "Easy", icon: "🎓" },
            ],
            puppies: breedPuppies
          });
        } else {
          // Fallback to static data if breed not found in admin
          const baseBreed = breedData[breedSlug];
          if (baseBreed) {
            // Get puppies for static breed
            const puppyResponse = await fetch('/api/admin/puppies');
            const allPuppies = await puppyResponse.json();
            
            const breedPuppies = allPuppies
              .filter((puppy: any) => (puppy.breedSlug || puppy.breed_slug) === breedSlug)
              .map((puppy: any) => ({
                name: puppy.name,
                img: (puppy.images && puppy.images[0]) || puppy.image,
                images: puppy.images || (puppy.image ? [puppy.image] : []),
                price: puppy.price,
                gender: puppy.gender,
                desc: puppy.description,
                reserved: puppy.status === 'reserved' || puppy.status === 'sold',
                id: puppy.id,
                age: puppy.age,
                location: puppy.location,
                available: puppy.status === 'available'
              }));

            setBreed({
              ...baseBreed,
              puppies: breedPuppies
            });
          }
        }
      } catch (error) {
        console.error('Error loading breed data:', error);
        setBreed(null);
      }
    }
    loadBreedData();
  }, [breedSlug]);

  // Trigger animations on component mount
  useEffect(() => {
    setIsLoaded(true);
    // Set page-specific background
    document.documentElement.style.background = 'linear-gradient(to bottom right, #f8fafc, #f1f5f9, #dbeafe)';
    document.body.style.background = 'linear-gradient(to bottom right, #f8fafc, #f1f5f9, #dbeafe)';
    
    return () => {
      // Reset background on cleanup
      document.documentElement.style.background = '';
      document.body.style.background = '';
    };
  }, []);

  // Handle characteristic animations
  useEffect(() => {
    if (!breed) return;
    
    const timer = setTimeout(() => {
      breed.characteristics.forEach((_: any, index: number) => {
        setTimeout(() => {
          setVisibleCharacteristics(prev => [...prev, index]);
        }, index * 100);
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, [breed]);

  // Handle puppy card animations
  useEffect(() => {
    if (!breed) return;
    
    const timer = setTimeout(() => {
      breed.puppies.forEach((_: any, index: number) => {
        setTimeout(() => {
          setVisiblePuppies(prev => [...prev, index]);
        }, index * 150);
      });
    }, 1200);

    return () => clearTimeout(timer);
  }, [breed]);

  if (!breed) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white via-amber-50 to-white">
        <div className="text-center">
          <div className="text-8xl mb-6 animate-bounce">🐕</div>
          <h1 className="text-3xl font-bold mb-4 text-gray-700">Breed not found</h1>
          <p className="text-gray-500 mb-8">The breed you're looking for doesn't exist in our database.</p>
          <Link href="/breeds" className="bg-gradient-to-r from-[var(--accent)] to-yellow-600 text-white font-bold rounded-full px-8 py-4 shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300">
            Back to breeds 🐾
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-sans flex flex-col items-center py-16 px-4 overflow-x-hidden">
      {/* Animated floating elements */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-24 left-12 w-6 h-6 bg-[var(--accent)]/20 rounded-full animate-bounce" style={{animationDelay: '0s', animationDuration: '3.5s'}}></div>
        <div className="absolute top-48 right-24 w-4 h-4 bg-blue-400/20 rounded-full animate-bounce" style={{animationDelay: '1s', animationDuration: '4s'}}></div>
        <div className="absolute top-72 left-1/3 w-5 h-5 bg-green-400/20 rounded-full animate-bounce" style={{animationDelay: '2s', animationDuration: '5s'}}></div>
        <div className="absolute bottom-48 right-12 w-7 h-7 bg-purple-400/20 rounded-full animate-bounce" style={{animationDelay: '0.5s', animationDuration: '3s'}}></div>
        <div className="absolute bottom-24 left-24 w-4 h-4 bg-orange-400/20 rounded-full animate-bounce" style={{animationDelay: '1.5s', animationDuration: '4.5s'}}></div>
      </div>

      {/* Hero Section - Egyedi design az adott breed oldalhoz */}
      <section className={`relative bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50 min-h-screen flex items-center justify-center py-20 pb-56 md:pb-64 overflow-hidden transition-all duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        {/* Breed-specific Pattern Background */}
        <div className="absolute inset-0 overflow-hidden opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.4'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm30 0c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}></div>
        </div>

        {/* Split Layout */}
        <div className="relative z-30 max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Breed Info */}
          <div className={`transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-3xl animate-bounce">
                  🏆
                </div>
                <div className="text-sm font-bold text-gray-600 uppercase tracking-wider">
                  Premium Dog Breed
                </div>
              </div>
              
              <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black text-gray-800 mb-6 leading-none">
                <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {breed.name.split(' ')[0]}
                </span>
                {breed.name.split(' ').length > 1 && (
                  <span className="block text-gray-800">
                    {breed.name.split(' ').slice(1).join(' ')}
                  </span>
                )}
              </h1>
              
              <div className="flex items-center gap-6 mb-8">
                <div className="bg-white/80 backdrop-blur-lg rounded-full px-6 py-3 shadow-lg border-2 border-blue-200 hover:border-blue-400 transition-all duration-300 group">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl group-hover:animate-bounce">{breed.characteristics.find((c: any) => c.name === 'Size')?.icon || '📏'}</span>
                    <span className="font-bold text-gray-800">{breed.size}</span>
                  </div>
                </div>
                
                <div className="bg-white/80 backdrop-blur-lg rounded-full px-6 py-3 shadow-lg border-2 border-purple-200 hover:border-purple-400 transition-all duration-300 group">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl group-hover:animate-bounce">
                      {breed.popularity === 'High' ? '🔥' : breed.popularity === 'Medium' ? '⭐' : '💎'}
                    </span>
                    <span className="font-bold text-gray-800">{breed.popularity}</span>
                  </div>
                </div>
              </div>
              
              <p className="text-xl text-gray-600 leading-relaxed mb-8 max-w-2xl">
                {breed.desc}
              </p>
              
              <div className="flex flex-wrap gap-4">
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-xl px-10 py-4 rounded-full shadow-2xl hover:scale-110 hover:shadow-3xl transition-all duration-300 flex items-center gap-3 group">
                  <span className="group-hover:animate-bounce">🐕</span>
                  View Available Puppies
                </button>
                <button className="bg-white/80 backdrop-blur-lg text-gray-700 font-bold text-xl px-10 py-4 rounded-full shadow-xl hover:scale-110 hover:shadow-2xl hover:bg-white transition-all duration-300 flex items-center gap-3 group border border-gray-300">
                  <span className="group-hover:animate-bounce">💬</span>
                  Ask About This Breed
                </button>
              </div>
            </div>
          </div>

          {/* Right Side - Image & Stats */}
          <div className={`transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            {/* Main Breed Image */}
            <div className="relative mb-8 group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative bg-white rounded-3xl p-4 shadow-2xl group-hover:shadow-3xl transition-all duration-500 hover:scale-105">
                <div className="relative w-full h-80 rounded-2xl overflow-hidden">
                  <Image
                    src={breed.img}
                    alt={breed.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="absolute top-8 right-8 bg-white/90 backdrop-blur-lg rounded-full p-3 shadow-lg">
                  <div className="text-2xl animate-pulse">
                    {breed.popularity === 'High' ? '🔥' : breed.popularity === 'Medium' ? '⭐' : '💎'}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {breed.characteristics.slice(0, 4).map((char: any, index: number) => (
                <div 
                  key={index}
                  className={`bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group border border-gray-200 hover:border-blue-300 ${
                    visibleCharacteristics.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                  }`}
                  style={{
                    transitionDelay: `${700 + index * 100}ms`
                  }}
                >
                  <div className="text-3xl mb-3 group-hover:animate-bounce transition-all duration-300">
                    {char.icon}
                  </div>
                  <div className="font-bold text-gray-800 text-sm mb-1 group-hover:text-blue-600 transition-colors duration-300">
                    {char.name}
                  </div>
                  <div className="text-gray-600 text-xs group-hover:text-gray-800 transition-colors duration-300">
                    {char.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Stats Strip */}
        <div className={`absolute bottom-10 md:bottom-20 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-900 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <div className="bg-white/90 backdrop-blur-lg rounded-full px-8 py-4 shadow-xl border border-gray-200 flex items-center gap-8">
            <div className="text-center group hover:scale-110 transition-transform duration-300">
              <div className="text-2xl font-black text-blue-600 group-hover:animate-pulse">
                {breed.puppies.length}
              </div>
              <div className="text-xs font-bold text-gray-600">Available Now</div>
              <div className="text-lg group-hover:animate-bounce">🐕</div>
            </div>
            
            <div className="w-px h-8 bg-gray-300"></div>
            
            <div className="text-center group hover:scale-110 transition-transform duration-300">
              <div className="text-2xl font-black text-green-600 group-hover:animate-pulse">
                100%
              </div>
              <div className="text-xs font-bold text-gray-600">Health Certified</div>
              <div className="text-lg group-hover:animate-bounce">🏥</div>
            </div>
            
            <div className="w-px h-8 bg-gray-300"></div>
            
            <div className="text-center group hover:scale-110 transition-transform duration-300">
              <div className="text-2xl font-black text-purple-600 group-hover:animate-pulse">
                4.9
              </div>
              <div className="text-xs font-bold text-gray-600">Rating</div>
              <div className="text-lg group-hover:animate-bounce">⭐</div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className={`absolute bottom-6 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex flex-col items-center text-gray-400 animate-bounce">
            <span className="text-xs font-medium mb-1">Learn more</span>
            <div className="w-4 h-6 border border-gray-400 rounded-full flex justify-center">
              <div className="w-0.5 h-2 bg-gray-400 rounded-full mt-1 animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-20 left-20 text-4xl text-blue-200 animate-float opacity-30" style={{animationDelay: '0s'}}>🐕‍🦺</div>
          <div className="absolute top-40 right-32 text-5xl text-purple-200 animate-float opacity-20" style={{animationDelay: '2s'}}>🏆</div>
          <div className="absolute bottom-40 left-32 text-3xl text-pink-200 animate-float opacity-25" style={{animationDelay: '4s'}}>❤️</div>
          <div className="absolute bottom-20 right-20 text-4xl text-blue-200 animate-float opacity-30" style={{animationDelay: '1s'}}>🎾</div>
          <div className="absolute top-1/2 left-10 text-2xl text-purple-200 animate-float opacity-20" style={{animationDelay: '3s'}}>⭐</div>
          <div className="absolute top-1/3 right-10 text-6xl text-pink-200 animate-float opacity-15" style={{animationDelay: '5s'}}>🐾</div>
        </div>
      </section>

      {/* Breed characteristics */}
      <div className={`w-full max-w-5xl mb-16 transition-all duration-1000 delay-900 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
        <h2 className="text-3xl font-bold text-[var(--foreground)] mb-8 text-center hover:animate-pulse transition-all duration-300 cursor-default">
          🏷️ Breed Characteristics 📊
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {breed.characteristics.map((char: any, i: number) => (
            <div 
              key={`char-${char.name}-${i}`} 
              className={`bg-white rounded-2xl shadow-lg border-l-4 border-[var(--accent)] p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 group ${
                visibleCharacteristics.includes(i) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{
                transitionDelay: `${1000 + i * 100}ms`
              }}
            >
              <div className="flex items-center gap-4 mb-2">
                <div className="text-3xl group-hover:animate-bounce transition-all duration-300">{char.icon}</div>
                <div className="font-bold text-[var(--foreground)] text-lg group-hover:text-[var(--accent)] transition-colors duration-300">{char.name}</div>
              </div>
              <div className="text-gray-700 font-medium group-hover:text-gray-900 transition-colors duration-300">{char.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Available puppies */}
      <div className={`w-full max-w-5xl mb-16 transition-all duration-1000 delay-1100 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
        <h2 className="text-3xl font-bold text-[var(--foreground)] mb-8 text-center hover:animate-pulse transition-all duration-300 cursor-default">
          🐾 Available Puppies 💕
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {breed.puppies.map((puppy: any, i: number) => (
            <div 
              key={`puppy-${puppy.name}-${i}`} 
              className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:scale-105 hover:shadow-2xl transition-all duration-500 group puppy-card ${
                visiblePuppies.includes(i) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{
                transitionDelay: `${1200 + i * 150}ms`
              }}
            >
              <div className="relative overflow-hidden h-48">
                {/* Main image */}
                <Image 
                  src={puppy.img} 
                  alt={puppy.name} 
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-4 right-4 bg-gradient-to-r from-[var(--accent)] to-yellow-600 text-white rounded-full px-3 py-1 font-bold shadow animate-pulse">
                  💰 €{puppy.price}
                </div>
                
                {/* Image count indicator */}
                {puppy.images && puppy.images.length > 1 && (
                  <div className="absolute top-4 left-4 bg-black/70 text-white rounded-full px-2 py-1 text-xs font-bold">
                    📸 {puppy.images.length}
                  </div>
                )}
                
                {/* Heart overlay on hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="text-5xl text-white animate-pulse">💕</div>
                </div>
              </div>
              
              {/* Additional images preview */}
              {puppy.images && puppy.images.length > 1 && (
                <div className="flex gap-1 p-2 bg-gray-50">
                  {puppy.images.slice(1, 4).map((img: string, idx: number) => (
                    <div key={idx} className="relative w-12 h-12 rounded overflow-hidden">
                      <Image 
                        src={img} 
                        alt={`${puppy.name} ${idx + 2}`} 
                        fill
                        sizes="48px"
                        className="object-cover" 
                      />
                    </div>
                  ))}
                  {puppy.images.length > 4 && (
                    <div className="w-12 h-12 bg-gray-300 rounded flex items-center justify-center text-xs font-bold text-gray-600">
                      +{puppy.images.length - 4}
                    </div>
                  )}
                </div>
              )}
              <div className="p-6">
                <h3 className="text-xl font-bold text-[var(--foreground)] mb-2 group-hover:text-[var(--accent)] transition-colors duration-300">{puppy.name}</h3>
                <div className={`mb-2 text-sm font-semibold px-3 py-1 rounded-full inline-block transition-all duration-300 hover:scale-110 ${
                  puppy.gender === 'Male' ? 'bg-blue-100 text-blue-800' : 'bg-pink-100 text-pink-800'
                }`}>
                  {puppy.gender === 'Male' ? '♂️' : '♀️'} {puppy.gender}
                </div>
                <p className="text-gray-700 mb-4 group-hover:text-gray-900 transition-colors duration-300">{puppy.desc}</p>
                <Link 
                  href={`/breeds/${breedSlug}/puppy/${puppy.id}`} 
                  className="bg-gradient-to-r from-[var(--accent)] to-yellow-600 text-white rounded-full px-5 py-2 font-semibold shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 hover:from-yellow-600 hover:to-[var(--accent)] inline-block"
                >
                  View profile 👀
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact CTA */}
      <div className={`w-full max-w-3xl text-center bg-gradient-to-r from-amber-50 to-white rounded-3xl p-12 shadow-xl transition-all duration-1000 delay-1300 hover:shadow-2xl hover:scale-105 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
        <h2 className="text-3xl font-bold text-[var(--foreground)] mb-4 hover:animate-pulse transition-all duration-300 cursor-default">
          Ready to Find Your Perfect Puppy? 🎉
        </h2>
        <p className="text-xl text-gray-700 mb-8">
          Contact us today to learn more about our available {breed.name} puppies and reserve your new family member. ✨
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/contact" className="bg-gradient-to-r from-[var(--accent)] to-yellow-600 text-white font-bold rounded-full px-8 py-4 shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300 hover:from-yellow-600 hover:to-[var(--accent)] animate-pulse">
            Contact Us 📞
          </Link>
          <Link href="/breeds" className="bg-white text-[var(--accent)] font-bold rounded-full px-8 py-4 shadow-xl border-2 border-[var(--accent)] hover:scale-105 hover:shadow-2xl hover:bg-[var(--accent)] hover:text-white transition-all duration-300">
            View All Breeds 🐕‍🦺
          </Link>
        </div>
      </div>
    </div>
  );
} 