import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET - Get all puppies
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('puppies')
      .select('*')
      .order('featured', { ascending: false })
      .order('name', { ascending: true });

    if (error) throw error;

    return NextResponse.json(data || []);
  } catch (error) {
    console.error('Error fetching puppies:', error);
    return NextResponse.json([], { status: 500 });
  }
}

// POST - Create new puppy
export async function POST(request: NextRequest) {
  try {
    const newPuppy = await request.json();
    
    const puppyData = {
      name: newPuppy.name,
      breed: newPuppy.breed,
      breed_slug: newPuppy.breedSlug || newPuppy.breed_slug,
      price: Number(newPuppy.price),
      status: newPuppy.status || 'available',
      gender: newPuppy.gender,
      age: newPuppy.age || '',
      size: newPuppy.size || 'Medium',
      location: newPuppy.location || '',
      description: newPuppy.description || '',
      image: newPuppy.image || '',
      featured: newPuppy.featured || false,
      deposit_status: newPuppy.deposit_status || 'none',
      deposit_due_at: newPuppy.deposit_due_at || null,
      deposit_reference: newPuppy.deposit_reference || null,
    };

    const { data, error } = await supabase
      .from('puppies')
      .insert([puppyData])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data, { status: 201 });
  } catch (error: any) {
    console.error('Error creating puppy:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create puppy' },
      { status: 500 }
    );
  }
}

// PUT - Update puppy
export async function PUT(request: NextRequest) {
  try {
    const updatedPuppy = await request.json();
    
    if (!updatedPuppy.id) {
      return NextResponse.json(
        { error: 'Puppy ID required' },
        { status: 400 }
      );
    }

    const puppyData = {
      name: updatedPuppy.name,
      breed: updatedPuppy.breed,
      breed_slug: updatedPuppy.breedSlug || updatedPuppy.breed_slug,
      price: Number(updatedPuppy.price),
      status: updatedPuppy.status || 'available',
      gender: updatedPuppy.gender,
      age: updatedPuppy.age || '',
      size: updatedPuppy.size || 'Medium',
      location: updatedPuppy.location || '',
      description: updatedPuppy.description || '',
      image: updatedPuppy.image || '',
      featured: updatedPuppy.featured || false,
      deposit_status: updatedPuppy.deposit_status ?? undefined,
      deposit_due_at: updatedPuppy.deposit_due_at ?? undefined,
      deposit_reference: updatedPuppy.deposit_reference ?? undefined,
    };

    const { data, error } = await supabase
      .from('puppies')
      .update(puppyData)
      .eq('id', updatedPuppy.id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Error updating puppy:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update puppy' },
      { status: 500 }
    );
  }
}

// DELETE - Delete puppy
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: 'Puppy ID required' },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from('puppies')
      .delete()
      .eq('id', id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error deleting puppy:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to delete puppy' },
      { status: 500 }
    );
  }
}
