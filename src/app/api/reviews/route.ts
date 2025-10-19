import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const showAll = searchParams.get('all') === 'true';
    
    // Check if authenticated (for admin)
    const authHeader = request.headers.get('authorization');
    const isAuthenticated = authHeader === `Bearer ${process.env.ADMIN_TOKEN || 'goldipuppy-admin-2025'}`;

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    let query = supabase
      .from('reviews')
      .select('*')
      .order('created_at', { ascending: false });

    // If not authenticated, only show approved reviews
    if (!isAuthenticated || !showAll) {
      query = query.eq('is_approved', true);
    }

    const { data, error } = await query;

    if (error) {
      console.error('[GET /api/reviews] Error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data || []);
  } catch (err: any) {
    console.error('[GET /api/reviews] Exception:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log('📥 [POST /api/reviews] Starting review submission...');
    
    const body = await request.json();
    console.log('📦 [POST /api/reviews] Request body:', body);
    
    const {
      puppy_id,
      puppy_name,
      customer_name,
      customer_email,
      rating,
      review_text,
    } = body;

    // Validation
    if (!puppy_name || !rating || !review_text) {
      console.log('❌ [POST /api/reviews] Validation failed: missing required fields');
      return NextResponse.json(
        { error: 'Missing required fields: puppy_name, rating, review_text' },
        { status: 400 }
      );
    }

    if (rating < 1 || rating > 5) {
      console.log('❌ [POST /api/reviews] Validation failed: invalid rating');
      return NextResponse.json(
        { error: 'Rating must be between 1 and 5' },
        { status: 400 }
      );
    }

    console.log('✅ [POST /api/reviews] Validation passed');
    console.log('🔗 [POST /api/reviews] Connecting to Supabase...');

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const reviewData = {
      puppy_id: puppy_id || null, // UUID string or null
      puppy_name,
      customer_name: customer_name || 'Anonymous',
      customer_email: customer_email || null,
      rating,
      review_text,
      is_approved: false, // Always start as unapproved
    };

    console.log('💾 [POST /api/reviews] Inserting review data:', reviewData);

    const { data, error } = await supabase
      .from('reviews')
      .insert([reviewData])
      .select()
      .single();

    if (error) {
      console.error('❌ [POST /api/reviews] Supabase error:', error);
      return NextResponse.json({ error: error.message, details: error }, { status: 500 });
    }

    console.log('✅ [POST /api/reviews] Review inserted successfully:', data);

    return NextResponse.json({
      success: true,
      message: 'Review submitted successfully! It will be visible after admin approval.',
      review: data,
    });
  } catch (err: any) {
    console.error('❌ [POST /api/reviews] Exception:', err);
    return NextResponse.json({ error: err.message, stack: err.stack }, { status: 500 });
  }
}

