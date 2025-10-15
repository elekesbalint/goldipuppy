export interface Puppy {
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

// Fallback static data
export const defaultPuppies: Puppy[] = [
  // Golden Retriever
  {
    id: "sunny",
    name: "Sunny",
    breed: "Golden Retriever",
    breedSlug: "golden-retriever",
    price: 1200,
    status: "available",
    gender: "Male",
    age: "8 weeks",
    size: "Large",
    location: "Budapest, Hungary",
    description: "Playful, healthy, ready for a loving home. Great with kids!",
    image: "https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=400&q=80",
    featured: true,
  },
  {
    id: "bella",
    name: "Bella",
    breed: "Golden Retriever",
    breedSlug: "golden-retriever",
    price: 1300,
    status: "reserved",
    gender: "Female",
    age: "10 weeks",
    size: "Large",
    location: "Budapest, Hungary",
    description: "Gentle, affectionate, perfect for families.",
    image: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=400&q=80",
    featured: true,
  },
  {
    id: "charlie",
    name: "Charlie",
    breed: "Golden Retriever",
    breedSlug: "golden-retriever",
    price: 1250,
    status: "available",
    gender: "Male",
    age: "9 weeks",
    size: "Large",
    location: "Debrecen, Hungary",
    description: "Energetic and friendly, loves to play fetch. Excellent temperament.",
    image: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=400&q=80",
    featured: false,
  },
  
  // French Bulldog
  {
    id: "max",
    name: "Max",
    breed: "French Bulldog",
    breedSlug: "french-bulldog",
    price: 1500,
    status: "available",
    gender: "Male",
    age: "12 weeks",
    size: "Small",
    location: "Budapest, Hungary",
    description: "Playful, adaptable, and smart companion. Great for apartments.",
    image: "https://images.unsplash.com/photo-1518715308788-3005759c61d3?auto=format&fit=crop&w=400&q=80",
    featured: false,
  },
  {
    id: "luna",
    name: "Luna",
    breed: "French Bulldog",
    breedSlug: "french-bulldog",
    price: 1600,
    status: "available",
    gender: "Female",
    age: "10 weeks",
    size: "Small",
    location: "Szeged, Hungary",
    description: "Sweet and calm personality, loves cuddles and gentle play.",
    image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=400&q=80",
    featured: true,
  },
  {
    id: "rocky",
    name: "Rocky",
    breed: "French Bulldog",
    breedSlug: "french-bulldog",
    price: 1550,
    status: "sold",
    gender: "Male",
    age: "14 weeks",
    size: "Small",
    location: "Pécs, Hungary",
    description: "Confident and playful, great with children and other pets.",
    image: "https://images.unsplash.com/photo-1605568427561-40dd23c2acea?auto=format&fit=crop&w=400&q=80",
    featured: false,
  },

  // Pomeranian
  {
    id: "mimi",
    name: "Mimi",
    breed: "Pomeranian",
    breedSlug: "pomeranian",
    price: 1100,
    status: "available",
    gender: "Female",
    age: "8 weeks",
    size: "Toy",
    location: "Budapest, Hungary",
    description: "Tiny but brave, fluffy and adorable. Perfect lap dog.",
    image: "https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=400&q=80",
    featured: true,
  },
  {
    id: "teddy",
    name: "Teddy",
    breed: "Pomeranian",
    breedSlug: "pomeranian",
    price: 1200,
    status: "available",
    gender: "Male",
    age: "9 weeks",
    size: "Toy",
    location: "Győr, Hungary",
    description: "Lively and bold personality, loves attention and being spoiled.",
    image: "https://images.unsplash.com/photo-1551717743-49959800b1f6?auto=format&fit=crop&w=400&q=80",
    featured: false,
  },
  {
    id: "princess",
    name: "Princess",
    breed: "Pomeranian",
    breedSlug: "pomeranian",
    price: 1150,
    status: "reserved",
    gender: "Female",
    age: "7 weeks",
    size: "Toy",
    location: "Miskolc, Hungary",
    description: "Elegant and graceful, loves to be pampered. Very photogenic!",
    image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=400&q=80",
    featured: false,
  },

  // Labrador Retriever
  {
    id: "buddy",
    name: "Buddy",
    breed: "Labrador Retriever",
    breedSlug: "labrador-retriever",
    price: 1000,
    status: "available",
    gender: "Male",
    age: "11 weeks",
    size: "Large",
    location: "Budapest, Hungary",
    description: "Friendly and outgoing, perfect family dog. Loves swimming!",
    image: "https://images.unsplash.com/photo-1551717743-49959800b1f6?auto=format&fit=crop&w=400&q=80",
    featured: true,
  },
  {
    id: "molly",
    name: "Molly",
    breed: "Labrador Retriever",
    breedSlug: "labrador-retriever",
    price: 1050,
    status: "available",
    gender: "Female",
    age: "9 weeks",
    size: "Large",
    location: "Kecskemét, Hungary",
    description: "Gentle and patient, excellent with children. Very trainable.",
    image: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=400&q=80",
    featured: false,
  },

  // Cavalier King Charles
  {
    id: "oscar",
    name: "Oscar",
    breed: "Cavalier King Charles",
    breedSlug: "cavalier-king-charles",
    price: 1400,
    status: "available",
    gender: "Male",
    age: "10 weeks",
    size: "Small",
    location: "Budapest, Hungary",
    description: "Affectionate and graceful, perfect lapdog with royal demeanor.",
    image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=400&q=80",
    featured: false,
  },
  {
    id: "ruby",
    name: "Ruby",
    breed: "Cavalier King Charles",
    breedSlug: "cavalier-king-charles",
    price: 1450,
    status: "available",
    gender: "Female",
    age: "8 weeks",
    size: "Small",
    location: "Székesfehérvár, Hungary",
    description: "Sweet and gentle nature, loves to be close to family members.",
    image: "https://images.unsplash.com/photo-1605568427561-40dd23c2acea?auto=format&fit=crop&w=400&q=80",
    featured: true,
  },

  // Yorkshire Terrier
  {
    id: "tiny",
    name: "Tiny",
    breed: "Yorkshire Terrier",
    breedSlug: "yorkshire-terrier",
    price: 1300,
    status: "available",
    gender: "Male",
    age: "8 weeks",
    size: "Toy",
    location: "Budapest, Hungary",
    description: "Small but fearless, elegant coat and brave personality.",
    image: "https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=400&q=80",
    featured: false,
  },
  {
    id: "duchess",
    name: "Duchess",
    breed: "Yorkshire Terrier",
    breedSlug: "yorkshire-terrier",
    price: 1350,
    status: "reserved",
    gender: "Female",
    age: "9 weeks",
    size: "Toy",
    location: "Veszprém, Hungary",
    description: "Elegant and confident, beautiful silky coat. Great apartment dog.",
    image: "https://images.unsplash.com/photo-1551717743-49959800b1f6?auto=format&fit=crop&w=400&q=80",
    featured: false,
  },
];

// Helper function to get breed slug from breed name
export function getBreedSlug(breedName: string): string {
  return breedName.toLowerCase().replace(/\s+/g, '-');
}

// Get puppies - simply return default puppies
export function getPuppies(): Puppy[] {
  return defaultPuppies;
}
