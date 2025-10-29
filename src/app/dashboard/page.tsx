"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

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
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push('/auth/login?next=/dashboard'); return; }
      setUser(user);
      
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

    // Find the reservation to get puppy_id
    const reservation = reservations.find(r => r.id === id);
    if (!reservation) {
      alert('Reservation not found');
      return;
    }

    const res = await fetch(`/api/reservations?id=${id}`, { 
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (res.ok) {
      // Also update the puppy status back to available in admin
      try {
        const puppyResponse = await fetch('/api/admin/puppies');
        if (puppyResponse.ok) {
          const allPuppies = await puppyResponse.json();
          const puppyToUpdate = allPuppies.find((p: any) => p.id === reservation.puppy_id);
          
          if (puppyToUpdate) {
            await fetch('/api/admin/puppies', {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                ...puppyToUpdate,
                status: 'available',
                deposit_status: 'none',
                deposit_due_at: null,
                deposit_reference: null,
              }),
            });
            console.log('✅ Puppy status updated to available after cancellation');
          }
        }
      } catch (error) {
        console.error('Could not update puppy status in admin:', error);
      }

      setReservations(prev => prev.filter(r => r.id !== id));
    } else {
      const error = await res.json();
      alert(`Failed to cancel: ${error.error || 'Unknown error'}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-blue-50">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-12 w-20 h-20 bg-green-200/30 rounded-full animate-bounce" style={{animationDelay: '0s', animationDuration: '3s'}}></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-blue-200/30 rounded-full animate-bounce" style={{animationDelay: '1s', animationDuration: '4s'}}></div>
        <div className="absolute bottom-40 left-1/3 w-12 h-12 bg-yellow-200/30 rounded-full animate-bounce" style={{animationDelay: '2s', animationDuration: '5s'}}></div>
        <div className="absolute bottom-20 right-12 w-24 h-24 bg-pink-200/30 rounded-full animate-bounce" style={{animationDelay: '0.5s', animationDuration: '3.5s'}}></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-block bg-gradient-to-br from-green-500 to-emerald-600 rounded-full p-6 mb-6 shadow-2xl">
            <span className="text-6xl">📊</span>
          </div>
          <h1 className="text-5xl font-black text-gray-800 mb-4">
            <span className="bg-gradient-to-r from-green-600 via-emerald-600 to-blue-600 bg-clip-text text-transparent">
              My Dashboard
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Welcome back, <span className="font-bold text-green-600">{user?.email?.split('@')[0] || 'User'}</span>! 
            Manage your puppy reservations here.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link 
              href="/puppies" 
              className="bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold px-8 py-3 rounded-2xl hover:scale-105 hover:shadow-xl transition-all duration-300 flex items-center gap-2"
            >
              <span>🐕</span>
              <span>Browse Puppies</span>
            </Link>
            <Link 
              href="/breeds" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold px-8 py-3 rounded-2xl hover:scale-105 hover:shadow-xl transition-all duration-300 flex items-center gap-2"
            >
              <span>🐕‍🦺</span>
              <span>View Breeds</span>
            </Link>
          </div>
        </div>

        {/* Reservations Section */}
        <div className="bg-white/90 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-gray-200">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
              <span>📋</span>
              <span>My Reservations</span>
            </h2>
            <div className="text-sm text-gray-500">
              {reservations.length} reservation{reservations.length !== 1 ? 's' : ''}
            </div>
          </div>

          {reservations.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-8xl mb-6">🐾</div>
              <h3 className="text-2xl font-bold text-gray-700 mb-4">No reservations yet</h3>
              <p className="text-gray-600 mb-8 text-lg">
                Start your puppy journey by browsing our adorable puppies!
              </p>
              <Link 
                href="/puppies" 
                className="inline-block bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold px-8 py-4 rounded-2xl hover:scale-105 hover:shadow-xl transition-all duration-300 text-lg"
              >
                🐕 Find My Perfect Puppy
              </Link>
            </div>
          ) : (
            <div className="grid gap-6">
              {reservations.map(r => {
                const due = r.deposit_due_at ? new Date(r.deposit_due_at) : null;
                const canCancel = r.status === 'pending' && due && new Date() <= due;
                const isExpired = due && new Date() > due;
                
                return (
                  <div key={r.id} className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6 border-2 border-gray-200 hover:shadow-lg transition-all duration-300">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-2xl">🐕</span>
                          <h3 className="text-xl font-bold text-gray-800">Puppy Reservation</h3>
                          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            r.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            r.status === 'paid' ? 'bg-green-100 text-green-800' :
                            r.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {r.status === 'pending' ? '⏳ Pending' :
                             r.status === 'paid' ? '✅ Paid' :
                             r.status === 'cancelled' ? '❌ Cancelled' :
                             '⏰ Expired'}
                          </span>
                        </div>
                        <div className="text-gray-600 space-y-1">
                          <p><strong>Puppy ID:</strong> {r.puppy_id}</p>
                          <p><strong>Reserved:</strong> {new Date(r.created_at).toLocaleDateString('hu-HU')}</p>
                          {due && (
                            <p className={`font-semibold ${
                              isExpired ? 'text-red-600' : 
                              canCancel ? 'text-yellow-600' : 
                              'text-green-600'
                            }`}>
                              <strong>Deposit due:</strong> {due.toLocaleDateString('hu-HU')} 
                              {isExpired ? ' (Expired)' : canCancel ? ` (${Math.ceil((due.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days left)` : ''}
                            </p>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-3">
                        {canCancel && (
                          <button 
                            onClick={() => cancelReservation(r.id)} 
                            className="bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700 transition-colors font-semibold flex items-center gap-2"
                          >
                            <span>❌</span>
                            <span>Cancel</span>
                          </button>
                        )}
                        <Link 
                          href="/puppies" 
                          className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors font-semibold flex items-center gap-2 text-center"
                        >
                          <span>👀</span>
                          <span>View Puppies</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link 
            href="/puppies" 
            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6 rounded-2xl hover:scale-105 hover:shadow-xl transition-all duration-300 text-center"
          >
            <div className="text-4xl mb-3">🐕</div>
            <h3 className="text-xl font-bold mb-2">Browse Puppies</h3>
            <p className="text-green-100">Find your perfect furry companion</p>
          </Link>
          
          <Link 
            href="/breeds" 
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-2xl hover:scale-105 hover:shadow-xl transition-all duration-300 text-center"
          >
            <div className="text-4xl mb-3">🐕‍🦺</div>
            <h3 className="text-xl font-bold mb-2">Dog Breeds</h3>
            <p className="text-blue-100">Learn about different breeds</p>
          </Link>
          
          <Link 
            href="/contact" 
            className="bg-gradient-to-r from-pink-500 to-rose-600 text-white p-6 rounded-2xl hover:scale-105 hover:shadow-xl transition-all duration-300 text-center"
          >
            <div className="text-4xl mb-3">📞</div>
            <h3 className="text-xl font-bold mb-2">Get Help</h3>
            <p className="text-pink-100">Contact our support team</p>
          </Link>
        </div>
      </div>
    </div>
  );
}


