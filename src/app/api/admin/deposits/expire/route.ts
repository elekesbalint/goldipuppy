import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// Expire overdue deposits: set back to available when due date passed
export async function POST() {
  try {
    const nowIso = new Date().toISOString();

    // Select overdue pending deposits
    const { data: overdue, error: selErr } = await supabase
      .from('puppies')
      .select('id')
      .eq('deposit_status', 'pending')
      .lt('deposit_due_at', nowIso);

    if (selErr) throw selErr;

    const ids = (overdue || []).map((p: any) => p.id);
    if (!ids.length) {
      return NextResponse.json({ expired: 0 });
    }

    const { error: updErr } = await supabase
      .from('puppies')
      .update({
        status: 'available',
        deposit_status: 'none',
        deposit_due_at: null,
        deposit_reference: null,
      })
      .in('id', ids);

    if (updErr) throw updErr;

    return NextResponse.json({ expired: ids.length });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Expire failed' }, { status: 500 });
  }
}


