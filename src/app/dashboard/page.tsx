"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

interface Reservation {
  id: string;
  puppy_id: string;
  status: 'pending' | 'paid' | 'cancelled' | 'expired';
  deposit_due_at: string | null;
  created_at: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push('/auth/login?next=/dashboard'); return; }
      
      const session = await supabase.auth.getSession();
      const token = session.data.session?.access_token;
      
      if (!token) {
        console.error('No session token');
        setLoading(false);
        return;
      }

      const res = await fetch('/api/reservations', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (res.ok) {
        const list = await res.json();
        setReservations(list);
      } else {
        console.error('Failed to fetch reservations:', await res.text());
      }
      setLoading(false);
    })();
  }, [router]);

  const cancelReservation = async (id: string) => {
    const session = await supabase.auth.getSession();
    const token = session.data.session?.access_token;
    
    if (!token) {
      alert('Not authenticated');
      return;
    }

    const res = await fetch(`/api/reservations?id=${id}`, { 
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (res.ok) {
      setReservations(prev => prev.filter(r => r.id !== id));
    } else {
      const error = await res.json();
      alert(`Failed to cancel: ${error.error || 'Unknown error'}`);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">My Reservations</h1>
      {reservations.length === 0 ? (
        <div className="text-gray-600">No reservations yet.</div>
      ) : (
        <div className="space-y-4">
          {reservations.map(r => {
            const due = r.deposit_due_at ? new Date(r.deposit_due_at) : null;
            const canCancel = r.status === 'pending' && due && new Date() <= due;
            return (
              <div key={r.id} className="border rounded-xl p-4 flex items-center justify-between">
                <div>
                  <div className="font-semibold">Puppy ID: {r.puppy_id}</div>
                  <div className="text-sm text-gray-600">Status: {r.status}{due ? ` • Deposit due: ${due.toLocaleDateString('hu-HU')}` : ''}</div>
                </div>
                {canCancel && (
                  <button onClick={() => cancelReservation(r.id)} className="bg-red-600 text-white px-4 py-2 rounded-lg">Cancel</button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}


