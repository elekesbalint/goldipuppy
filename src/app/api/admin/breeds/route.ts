import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// Helper function to create URL-safe slugs
function createSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD') // Decompose accented characters
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/[^a-z0-9\s-]/g, '') // Remove special chars
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Remove duplicate hyphens
    .trim();
}

// GET - Get all breeds
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('breeds')
      .select('*')
      .order('name', { ascending: true });

    if (error) throw error;

    return NextResponse.json(data || []);
  } catch (error) {
    console.error('Error fetching breeds:', error);
    return NextResponse.json([], { status: 500 });
  }
}

// POST - Create new breed
export async function POST(request: NextRequest) {
  try {
    const newBreed = await request.json();
    
    // Generate slug from name
    const slug = createSlug(newBreed.name);
    
    const breedData = {
      name: newBreed.name,
      slug,
      description: newBreed.description || '',
      image: newBreed.image || null,
      size: newBreed.size || null,
      temperament: newBreed.temperament || null,
      lifespan: newBreed.lifespan || null,
      exercise: newBreed.exercise || null,
      grooming: newBreed.grooming || null,
      training: newBreed.training || null,
    };

    const { data, error } = await supabase
      .from('breeds')
      .insert([breedData])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data, { status: 201 });
  } catch (error: any) {
    console.error('Error creating breed:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create breed' },
      { status: 500 }
    );
  }
}

// PUT - Update breed
export async function PUT(request: NextRequest) {
  try {
    const updatedBreed = await request.json();
    
    if (!updatedBreed.id) {
      return NextResponse.json(
        { error: 'Breed ID required' },
        { status: 400 }
      );
    }

    // Update slug if name changed
    const slug = createSlug(updatedBreed.name);
    
    const breedData = {
      name: updatedBreed.name,
      slug,
      description: updatedBreed.description || '',
      image: updatedBreed.image || null,
      size: updatedBreed.size || null,
      temperament: updatedBreed.temperament || null,
      lifespan: updatedBreed.lifespan || null,
      exercise: updatedBreed.exercise || null,
      grooming: updatedBreed.grooming || null,
      training: updatedBreed.training || null,
    };

    const { data, error } = await supabase
      .from('breeds')
      .update(breedData)
      .eq('id', updatedBreed.id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Error updating breed:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update breed' },
      { status: 500 }
    );
  }
}

// DELETE - Delete breed
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: 'Breed ID required' },
        { status: 400 }
      );
    }

    // First, get the breed to retrieve the image URL
    const { data: breed, error: fetchError } = await supabase
      .from('breeds')
      .select('image')
      .eq('id', id)
      .single();

    if (fetchError) throw fetchError;

    // Delete the breed from database
    const { error: deleteError } = await supabase
      .from('breeds')
      .delete()
      .eq('id', id);

    if (deleteError) throw deleteError;

    // If breed had an image stored in Supabase Storage, delete it
    if (breed?.image && breed.image.includes('supabase.co/storage')) {
      try {
        const url = new URL(breed.image);
        const pathParts = url.pathname.split('/');
        const bucketIndex = pathParts.indexOf('puppy-images');
        
        if (bucketIndex !== -1) {
          const filePath = pathParts.slice(bucketIndex + 1).join('/');
          
          const { error: storageError } = await supabase.storage
            .from('puppy-images')
            .remove([filePath]);
          
          if (storageError) {
            console.error('Error deleting image from storage:', storageError);
            // Don't fail the whole operation if image deletion fails
          }
        }
      } catch (imgError) {
        console.error('Error processing image deletion:', imgError);
        // Don't fail the whole operation if image deletion fails
      }
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error deleting breed:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to delete breed' },
      { status: 500 }
    );
  }
}
