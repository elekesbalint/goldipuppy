"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

// No more static puppy data - using admin API only

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

export default function PuppyProfile({ params }: { params: Promise<{ breed: string; puppy: string }> }) {
  const [resolvedParams, setResolvedParams] = useState<{ breed: string; puppy: string } | null>(null);
  const [puppy, setPuppy] = useState<any>(null);
  const [isReserved, setIsReserved] = useState(false);
  
  useEffect(() => {
    async function resolveParams() {
      const awaitedParams = await params;
      setResolvedParams(awaitedParams);
      
      try {
        // Get puppy data from admin API
        const response = await fetch('/api/admin/puppies');
        const allPuppies = await response.json();
        const foundPuppy = allPuppies.find((p: any) => 
          p.id.toLowerCase() === awaitedParams.puppy.toLowerCase() ||
          p.name.toLowerCase() === awaitedParams.puppy.toLowerCase()
        );
        
        if (foundPuppy) {
          // Convert to the expected format for the UI
          const puppyForUI = {
            id: foundPuppy.id,
            name: foundPuppy.name,
            breed: foundPuppy.breed,
            breedSlug: foundPuppy.breedSlug || foundPuppy.breed_slug,
            img: foundPuppy.image,
            image: foundPuppy.image,
            price: foundPuppy.price,
            gender: foundPuppy.gender,
            age: foundPuppy.age,
            size: foundPuppy.size,
            status: foundPuppy.status,
            featured: foundPuppy.featured,
            dob: "2024-04-10", // Default value - you can enhance this later
            description: foundPuppy.description,
            temperament: "Friendly, playful, loyal", // Default - enhance later
            weight: "3.2 kg", // Default - enhance later
            vaccinations: "Up to date",
            microchip: "Yes",
            parents: [
              {
                name: "Mother",
                breed: foundPuppy.breed,
                img: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=200&q=80",
                titles: "Champion bloodline",
              },
              {
                name: "Father", 
                breed: foundPuppy.breed,
                img: "https://images.unsplash.com/photo-1518715308788-3005759c61d3?auto=format&fit=crop&w=200&q=80",
                titles: "Health tested",
              },
            ],
            shipping: {
              regions: ["EU", "Hungary", "Europe"],
              deliveryTime: "2-4 weeks",
              price: "€150-300",
            },
            healthCertificate: "Complete health certificate included",
            reserved: foundPuppy.status === 'reserved' || foundPuppy.status === 'sold',
            location: foundPuppy.location
          };
          setPuppy(puppyForUI);
        } else {
          // Puppy not found in admin data
          setPuppy(null);
        }
      } catch (error) {
        console.error('Error loading puppy data:', error);
        setPuppy(null);
      }
    }
    resolveParams();
  }, [params]);
  
  useEffect(() => {
    if (!resolvedParams || !puppy) return;
    
    // Check localStorage for reserved status
    const reservedPuppies = getReservedPuppies();
    setIsReserved(puppy?.reserved || reservedPuppies.includes(resolvedParams.puppy));
  }, [puppy?.reserved, resolvedParams, puppy]);
  if (!resolvedParams) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[var(--accent)]"></div>
        <p className="mt-4 text-gray-600">Loading...</p>
      </div>
    );
  }

  if (!puppy) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4">Puppy not found</h1>
        <Link href={`/breeds/${resolvedParams.breed}`} className="text-[var(--accent)] underline">Back to breed</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background)] font-sans flex flex-col items-center py-16 px-4">
      <div className="w-full max-w-3xl mb-10">
        <Link href={`/breeds/${resolvedParams.breed}`} className="text-[var(--accent)] underline mb-4 inline-block">← Back to breed</Link>
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="relative w-64 h-64 rounded-2xl overflow-hidden shadow mb-4 md:mb-0">
            <Image src={puppy.img} alt={puppy.name} fill sizes="256px" className="object-cover" />
          </div>
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-[var(--foreground)] mb-2">{puppy.name}</h1>
            <div className="text-xl text-gray-600 mb-4">{puppy.breed} • {puppy.gender} • {puppy.age}</div>
            <div className="text-3xl font-bold text-[var(--accent)] mb-4">€{puppy.price}</div>
            <p className="text-gray-700 leading-relaxed">{puppy.description}</p>
          </div>
        </div>
      </div>

      {/* Puppy details */}
      <div className="w-full max-w-5xl mb-16">
        <h2 className="text-3xl font-bold text-[var(--foreground)] mb-8 text-center">About {puppy.name}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="font-bold text-[var(--foreground)] mb-2">Basic Info</h3>
            <div className="space-y-2 text-gray-700">
              <div>Breed: {puppy.breed}</div>
              <div>Gender: {puppy.gender}</div>
              <div>Age: {puppy.age}</div>
              <div>Date of Birth: {puppy.dob}</div>
              <div>Weight: {puppy.weight}</div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="font-bold text-[var(--foreground)] mb-2">Health</h3>
            <div className="space-y-2 text-gray-700">
              <div>Vaccinations: {puppy.vaccinations}</div>
              <div>Microchip: {puppy.microchip}</div>
              <div>Temperament: {puppy.temperament}</div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="font-bold text-[var(--foreground)] mb-2">Shipping</h3>
            <div className="space-y-2 text-gray-700">
              <div>Regions: {puppy.shipping.regions.join(", ")}</div>
              <div>Delivery Time: {puppy.shipping.deliveryTime}</div>
              <div>Shipping Cost: {puppy.shipping.price}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Parents section removed by request */}

      {/* Shipping info */}
      <div className="w-full max-w-3xl mb-16">
        <h2 className="text-3xl font-bold text-[var(--foreground)] mb-8 text-center">Shipping Information</h2>
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="text-center">
              <div className="text-3xl mb-2">🌍</div>
              <div className="font-bold text-[var(--foreground)]">Worldwide Delivery</div>
              <div className="text-gray-600 text-sm">Available to {puppy.shipping.regions.join(", ")}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">⏰</div>
              <div className="font-bold text-[var(--foreground)]">Delivery Time</div>
              <div className="text-gray-600 text-sm">{puppy.shipping.deliveryTime}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">💰</div>
              <div className="font-bold text-[var(--foreground)]">Shipping Cost</div>
              <div className="text-gray-600 text-sm">{puppy.shipping.price}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to action */}
      <div className="w-full max-w-3xl text-center bg-gradient-to-r from-amber-50 to-white rounded-3xl p-12 shadow-xl">
        {isReserved ? (
          <>
            <div className="mb-6">
              <div className="inline-block bg-orange-100 border-2 border-orange-400 rounded-full px-6 py-3 mb-4">
                <span className="text-2xl">🔒</span>
                <span className="ml-2 text-xl font-bold text-orange-800">Reserved</span>
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-600 mb-4">{puppy.name} is Currently Reserved</h2>
            <p className="text-xl text-gray-600 mb-8">
              This puppy has been reserved by another family. Check out our other available puppies or ask about our waiting list!
            </p>
            <div className="flex flex-wrap gap-4 justify-center mb-6">
              <Link 
                href="/puppies"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-full px-8 py-4 shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300 inline-block"
              >
                View Other Puppies
              </Link>
              <Link 
                href={`/contact?puppy=${encodeURIComponent(puppy.name)}&action=waitlist`}
                className="bg-white text-gray-700 font-bold rounded-full px-8 py-4 shadow-xl border-2 border-gray-300 hover:scale-105 hover:shadow-2xl transition-all duration-300"
              >
                Join Waiting List
              </Link>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-3xl font-bold text-[var(--foreground)] mb-4">Ready to Welcome {puppy.name}?</h2>
            <p className="text-xl text-gray-700 mb-8">
              Contact us today to reserve {puppy.name} and start the process of bringing your new family member home.
            </p>
            <div className="flex flex-wrap gap-4 justify-center mb-6">
              <Link
                href={`/reserve?puppy=${encodeURIComponent(puppy.name)}&puppyId=${puppy.id}`}
                className="bg-gradient-to-r from-[var(--accent)] to-yellow-600 text-white font-bold rounded-full px-8 py-4 shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300"
              >
                Reserve {puppy.name}
              </Link>
              <Link 
                href={`/contact?puppy=${encodeURIComponent(puppy.name)}&action=question`}
                className="bg-white text-[var(--accent)] font-bold rounded-full px-8 py-4 shadow-xl border-2 border-[var(--accent)] hover:scale-105 hover:shadow-2xl transition-all duration-300"
              >
                Ask Questions
              </Link>
            </div>
          </>
        )}
        <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-green-600 text-xl">✓</span>
            <span className="font-bold text-green-800">Health Certificate Included</span>
          </div>
          <p className="text-center text-gray-600 mt-4 text-sm">
            {puppy.healthCertificate}
          </p>
        </div>
      </div>
    </div>
  );
} 