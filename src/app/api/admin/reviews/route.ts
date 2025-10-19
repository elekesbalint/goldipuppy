import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Check authentication
function isAuthenticated(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization');
  return authHeader === `Bearer ${process.env.ADMIN_TOKEN || 'goldipuppy-admin-2025'}`;
}

export async function PUT(request: NextRequest) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, customer_name, rating, review_text } = body;

    if (!id || !customer_name || !rating || !review_text) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { data, error } = await supabase
      .from('reviews')
      .update({
        customer_name,
        rating,
        review_text,
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('[PUT /api/admin/reviews] Error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: 'Review updated successfully!',
      review: data,
    });
  } catch (err: any) {
    console.error('[PUT /api/admin/reviews] Exception:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Missing required parameter: id' },
        { status: 400 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { error } = await supabase
      .from('reviews')
      .delete()
      .eq('id', parseInt(id));

    if (error) {
      console.error('[DELETE /api/admin/reviews] Error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: 'Review deleted successfully!',
    });
  } catch (err: any) {
    console.error('[DELETE /api/admin/reviews] Exception:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

