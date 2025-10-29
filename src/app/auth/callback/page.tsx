"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Auth callback error:', error);
          router.push('/auth/login?error=callback_failed');
          return;
        }

        if (data.session) {
          // User is authenticated, redirect to dashboard
          router.push('/dashboard');
        } else {
          // No session, redirect to login
          router.push('/auth/login');
        }
      } catch (err) {
        console.error('Auth callback exception:', err);
        router.push('/auth/login?error=callback_failed');
      }
    };

    handleAuthCallback();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Confirming your account...</p>
      </div>
    </div>
  );
}
