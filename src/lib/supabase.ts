import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://btjvjemmqwhtoyiifkcn.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ0anZqZW1tcXdodG95aWlma2NuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA1MDg1NTgsImV4cCI6MjA3NjA4NDU1OH0.YG1wAHkvYKwBcdUxiT8IzY-CS7ptNMXy1BvgfV_-qVM';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Database Types
export interface Breed {
  id: string;
  name: string;
  slug: string;
  description: string;
  image?: string;
  size?: string;
  temperament?: string;
  lifespan?: string;
  exercise?: string;
  grooming?: string;
  training?: string;
  created_at?: string;
}

export interface Puppy {
  id: string;
  name: string;
  breed: string;
  breed_slug: string;
  price: number;
  status: 'available' | 'reserved' | 'sold';
  gender: 'Male' | 'Female';
  age: string;
  size: 'Toy' | 'Small' | 'Large';
  location: string;
  description: string;
  image: string;
  featured: boolean;
  created_at?: string;
}

