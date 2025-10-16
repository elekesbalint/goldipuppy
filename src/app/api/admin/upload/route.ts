import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Upload image to Supabase Storage and return its public URL
export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const folder = (formData.get('folder') as string) || 'public';

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string;

    if (!supabaseUrl || !serviceKey) {
      return NextResponse.json({ error: 'Supabase env vars missing' }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, serviceKey);

    const fileExt = file.name.split('.').pop()?.toLowerCase() || 'jpg';
    const baseName = file.name.replace(/[^a-zA-Z0-9-_\.]/g, '').replace(/\.+$/, '');
    const fileName = `${Date.now()}-${baseName}.${fileExt}`;
    const path = `${folder}/${fileName}`;

    const arrayBuffer = await file.arrayBuffer();
    const { error: uploadError } = await supabase.storage
      .from('puppy-images')
      .upload(path, Buffer.from(arrayBuffer), {
        contentType: file.type || 'image/jpeg',
        upsert: false,
      });

    if (uploadError) {
      return NextResponse.json({ error: uploadError.message }, { status: 400 });
    }

    const { data } = supabase.storage.from('puppy-images').getPublicUrl(path);

    return NextResponse.json({ path, url: data.publicUrl });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Upload failed' }, { status: 500 });
  }
}


// Delete image from Supabase Storage by path or public URL
export async function DELETE(request: Request) {
  try {
    const body = await request.json().catch(() => ({} as any));
    const { path, url } = body as { path?: string; url?: string };

    if (!path && !url) {
      return NextResponse.json({ error: 'Provide path or url to delete' }, { status: 400 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string;

    if (!supabaseUrl || !serviceKey) {
      return NextResponse.json({ error: 'Supabase env vars missing' }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, serviceKey);

    // Infer storage path if only public URL provided
    let storagePath = path || '';
    if (!storagePath && url) {
      // Expected public URL format:
      // {SUPABASE_URL}/storage/v1/object/public/puppy-images/<path>
      const marker = '/storage/v1/object/public/puppy-images/';
      const idx = url.indexOf(marker);
      if (idx !== -1) {
        storagePath = url.substring(idx + marker.length);
      }
    }

    if (!storagePath) {
      return NextResponse.json({ error: 'Could not resolve storage path' }, { status: 400 });
    }

    const { error: removeError } = await supabase.storage
      .from('puppy-images')
      .remove([storagePath]);

    if (removeError) {
      return NextResponse.json({ error: removeError.message }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Delete failed' }, { status: 500 });
  }
}


