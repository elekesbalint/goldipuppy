import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Missing required parameter: id' },
        { status: 400 }
      );
    }

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

