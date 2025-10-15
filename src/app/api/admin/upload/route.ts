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


