import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET - Get all puppies
export async function GET() {
  try {
    const { data: puppies, error } = await supabase
      .from('puppies')
      .select('*')
      .order('featured', { ascending: false })
      .order('name', { ascending: true });

    if (error) throw error;

    // Fetch images for all puppies and group them
    const ids = (puppies || []).map((p: any) => p.id);
    let imagesByPuppy: Record<string, string[]> = {};
    if (ids.length > 0) {
      const { data: images } = await supabase
        .from('puppy_images')
        .select('puppy_id,url,sort_order')
        .in('puppy_id', ids)
        .order('sort_order', { ascending: true })
        .order('created_at', { ascending: true });
      if (images) {
        for (const img of images) {
          const key = (img as any).puppy_id;
          if (!imagesByPuppy[key]) imagesByPuppy[key] = [];
          imagesByPuppy[key].push((img as any).url);
        }
      }
    }

    const withImages = (puppies || []).map((p: any) => ({
      ...p,
      images: imagesByPuppy[p.id] || (p.image ? [p.image] : []),
    }));

    return NextResponse.json(withImages);
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

    // Insert multiple images if provided
    if (Array.isArray(newPuppy.images) && newPuppy.images.length > 0) {
      const rows = newPuppy.images.map((url: string, idx: number) => ({
        puppy_id: data.id,
        url,
        sort_order: idx,
      }));
      await supabase.from('puppy_images').insert(rows);
    }

    return NextResponse.json({ ...data, images: newPuppy.images || (data.image ? [data.image] : []) }, { status: 201 });
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

    // If images array provided, replace existing mapping
    if (Array.isArray(updatedPuppy.images)) {
      // Clear existing
      await supabase.from('puppy_images').delete().eq('puppy_id', updatedPuppy.id);
      if (updatedPuppy.images.length > 0) {
        const rows = updatedPuppy.images.map((url: string, idx: number) => ({
          puppy_id: updatedPuppy.id,
          url,
          sort_order: idx,
        }));
        await supabase.from('puppy_images').insert(rows);
      }
    }

    return NextResponse.json({ ...data, images: updatedPuppy.images });
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

    // First, get the puppy to retrieve the image URL(s)
    const { data: puppy, error: fetchError } = await supabase
      .from('puppies')
      .select('image')
      .eq('id', id)
      .single();

    const { data: extraImages } = await supabase
      .from('puppy_images')
      .select('url')
      .eq('puppy_id', id);

    if (fetchError) throw fetchError;

    // Delete the puppy from database
    const { error: deleteError } = await supabase
      .from('puppies')
      .delete()
      .eq('id', id);

    if (deleteError) throw deleteError;

    // If puppy had image(s) stored in Supabase Storage, delete them
    const urlsToDelete = [puppy?.image, ...(extraImages?.map((r: any) => r.url) || [])].filter(Boolean) as string[];
    for (const u of urlsToDelete) {
      if (u && u.includes('supabase.co/storage')) {
      try {
        const url = new URL(u);
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
    console.error('Error deleting puppy:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to delete puppy' },
      { status: 500 }
    );
  }
}
