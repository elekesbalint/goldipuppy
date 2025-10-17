"use client";
import { useState, FormEvent, useEffect, Suspense } from "react";
import Link from "next/link";
import emailjs from '@emailjs/browser';
import { useSearchParams } from 'next/navigation';

function ReservePageContent() {
  const searchParams = useSearchParams();
  const puppyName = searchParams.get('puppy') || 'this puppy';
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    setIsLoaded(true);
    // Set page-specific background
    document.documentElement.style.background = 'linear-gradient(to bottom right, #f8fafc, #f1f5f9, #dbeafe)';
    document.body.style.background = 'linear-gradient(to bottom right, #f8fafc, #f1f5f9, #dbeafe)';
    
    // Pre-fill message with puppy name
    setFormData(prev => ({
      ...prev,
      message: `Hi! I would like to reserve ${puppyName}. Please let me know about the next steps, pricing, and availability.\n\nThank you!`
    }));
    
    return () => {
      // Reset background on cleanup
      document.documentElement.style.background = '';
      document.body.style.background = '';
    };
  }, [puppyName]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Prepare deposit reference and due date (12 days)
      const puppyIdParam = searchParams.get('puppyId') || '';
      const depositReference = puppyIdParam
        ? `GOLDIPUPPY-${puppyIdParam.slice(0, 8).toUpperCase()}`
        : `GOLDIPUPPY-${Math.random().toString(36).slice(2, 10).toUpperCase()}`;
      const dueAtDate = new Date();
      dueAtDate.setDate(dueAtDate.getDate() + 12);
      const dueAtIso = dueAtDate.toISOString();
      const dueAtHumanHu = dueAtDate.toLocaleDateString('hu-HU', { year: 'numeric', month: '2-digit', day: '2-digit' });
      
      // Initialize EmailJS
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_90q83xb';
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_yt3rsl7';
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'rbfLK60Katw-_bGNB';

      // Prepare template parameters for email notification
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone || 'Not provided',
        subject: `🐕 GoldiPuppy - Puppy Reservation Request for ${puppyName}`,
        inquiry_type: `Puppy Reservation - ${puppyName}`,
        message: formData.message,
        to_email: 'goldipuppy01@gmail.com',
        submitted_at: new Date().toLocaleString('hu-HU', { timeZone: 'Europe/Budapest' }),
        deposit_amount: '500 EUR',
        deposit_iban: 'HU55 1040 4601 5052 6586 6552 1035',
        deposit_beneficiary: 'Aranyi Attila',
        deposit_bank: 'K&H Bank',
        deposit_bic: 'OKHBHUHB',
        deposit_due_days: '12',
        deposit_due_date: dueAtHumanHu,
        deposit_reference: depositReference,
      };

      // Send email notification
      const result = await emailjs.send(serviceId, templateId, templateParams, publicKey);
      
      if (result.status === 200) {
        // Send confirmation email to user (with deposit info)
        await sendConfirmationEmail({ depositReference, dueAtHumanHu });
        
        // Set deposit pending in admin database
        const puppyId = searchParams.get('puppyId');
        if (puppyId) {
          try {
            // Get the puppy data first
            const puppiesResponse = await fetch('/api/admin/puppies');
            const allPuppies = await puppiesResponse.json();
            const puppyToReserve = allPuppies.find((p: any) => p.id === puppyId);
            
            if (puppyToReserve) {
              await fetch('/api/admin/puppies', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  ...puppyToReserve,
                  status: 'reserved',
                  deposit_status: 'pending',
                  deposit_due_at: dueAtIso,
                  deposit_reference: depositReference,
                }),
              });
              console.log('✅ Puppy status updated to reserved in admin database');
            }
          } catch (error) {
            console.error('Could not update puppy status in admin:', error);
          }
        }
        
        // Add puppy to reserved list in localStorage
        try {
          const puppyIdForStorage = searchParams.get('puppy')?.toLowerCase().replace(/\s+/g, '-') || '';
          if (puppyIdForStorage) {
            const currentReserved = JSON.parse(localStorage.getItem('reservedPuppies') || '[]');
            if (!currentReserved.includes(puppyIdForStorage)) {
              currentReserved.push(puppyIdForStorage);
              localStorage.setItem('reservedPuppies', JSON.stringify(currentReserved));
            }
          }
        } catch (error) {
          console.warn('Could not save to localStorage:', error);
        }
        
        setSubmitted(true);
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        throw new Error('EmailJS failed');
      }
    } catch (err) {
      console.error('Reservation submission failed:', err);
      alert('There was a problem submitting your reservation. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const sendConfirmationEmail = async ({ depositReference, dueAtHumanHu }: { depositReference: string; dueAtHumanHu: string }) => {
    try {
      // Send confirmation email to the user using EmailJS
      console.log('🔄 Attempting to send confirmation email to user:', formData.email);
      
      const confirmationParams = {
        to_email: formData.email,
        customer_name: formData.name,
        puppy_name: puppyName,
        customer_phone: formData.phone || 'Nincs megadva',
        customer_message: formData.message,
        deposit_amount: '500 EUR',
        deposit_iban: 'HU55 1040 4601 5052 6586 6552 1035',
        deposit_beneficiary: 'Aranyi Attila',
        deposit_bank: 'K&H Bank',
        deposit_bic: 'OKHBHUHB',
        deposit_due_days: '12',
        deposit_due_date: dueAtHumanHu,
        deposit_reference: depositReference,
        submitted_at: new Date().toLocaleString('hu-HU', { timeZone: 'Europe/Budapest' }),
      };

      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_90q83xb';
      const confirmationTemplateId = process.env.NEXT_PUBLIC_EMAILJS_CONFIRMATION_TEMPLATE_ID || 'template_xbdw1de';
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'rbfLK60Katw-_bGNB';

      console.log('📧 EmailJS Configuration:', {
        serviceId: serviceId,
        templateId: confirmationTemplateId,
        publicKey: publicKey.substring(0, 8) + '...',
        targetEmail: formData.email,
        customerName: formData.name
      });

      console.log('📋 Email parameters being sent:', confirmationParams);

      const result = await emailjs.send(serviceId, confirmationTemplateId, confirmationParams, publicKey);
      
      console.log('✅ Confirmation email sent successfully via EmailJS:', result);
    } catch (error) {
      console.error('❌ Failed to send confirmation email via EmailJS:', error);
      console.error('📊 Error details:', {
        name: (error as any)?.name,
        message: (error as any)?.message,
        text: (error as any)?.text,
        status: (error as any)?.status
      });
      
      // Don't fail the main process if confirmation email fails
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (submitted) {
    return (
      <div className="min-h-screen font-sans flex flex-col items-center justify-center overflow-x-hidden">
        {/* Success Animation */}
        <div className="text-center max-w-2xl mx-auto px-4">
          <div className="relative mb-8">
            <div className="text-9xl animate-bounce mb-4">🐕</div>
            <div className="absolute inset-0 animate-ping">
              <div className="text-9xl opacity-20">🐕</div>
            </div>
          </div>
          
          <h1 className="text-5xl sm:text-6xl font-black text-gray-800 mb-6">
            <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Reservation Submitted!
            </span>
          </h1>
          
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-green-200 mb-8">
            <p className="text-xl text-gray-600 mb-6">
              Thank you for your interest in <span className="font-bold text-green-600">{puppyName}</span>! 
              We'll contact you within <span className="font-bold text-green-600">24 hours</span> with more details.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="text-center p-4 bg-green-50 rounded-2xl">
                <div className="text-2xl mb-2">📧</div>
                <div className="text-sm font-bold text-gray-700">Confirmation Email</div>
                <div className="text-xs text-green-600">Sent to your inbox</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-2xl">
                <div className="text-2xl mb-2">⏰</div>
                <div className="text-sm font-bold text-gray-700">Response Time</div>
                <div className="text-xs text-blue-600">Within 24 hours</div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <Link 
              href="/" 
              className="bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-full px-10 py-4 shadow-2xl hover:scale-110 hover:shadow-3xl transition-all duration-300 flex items-center gap-3 group"
            >
              <span className="group-hover:animate-bounce">🏠</span>
              Back to Home
            </Link>
            <Link 
              href="/puppies" 
              className="bg-white text-gray-700 font-bold rounded-full px-10 py-4 shadow-xl border-2 border-gray-300 hover:scale-110 hover:shadow-2xl hover:border-green-400 transition-all duration-300 flex items-center gap-3 group"
            >
              <span className="group-hover:animate-bounce">🐕</span>
              View More Puppies
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-sans overflow-x-hidden">
      {/* Animated floating elements */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-20 left-12 w-5 h-5 bg-blue-400/20 rounded-full animate-bounce" style={{animationDelay: '0s', animationDuration: '3s'}}></div>
        <div className="absolute top-40 right-20 w-6 h-6 bg-green-400/20 rounded-full animate-bounce" style={{animationDelay: '1s', animationDuration: '4s'}}></div>
        <div className="absolute top-60 left-1/3 w-4 h-4 bg-purple-400/20 rounded-full animate-bounce" style={{animationDelay: '2s', animationDuration: '5s'}}></div>
        <div className="absolute bottom-40 right-12 w-7 h-7 bg-pink-400/20 rounded-full animate-bounce" style={{animationDelay: '0.5s', animationDuration: '3.5s'}}></div>
        <div className="absolute bottom-20 left-20 w-5 h-5 bg-orange-400/20 rounded-full animate-bounce" style={{animationDelay: '1.5s', animationDuration: '4.5s'}}></div>
      </div>

      {/* Hero Section */}
      <section className={`relative min-h-[80vh] flex items-center justify-center py-20 overflow-hidden transition-all duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <div className="relative z-20 max-w-4xl mx-auto px-4">
          {/* Main Title */}
          <div className={`text-center mb-16 transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="flex justify-center items-center gap-6 mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-4xl animate-bounce">
                🐕
              </div>
              <div className="text-6xl sm:text-7xl lg:text-8xl font-black text-gray-800">
                <span className="block bg-gradient-to-r from-green-600 via-emerald-600 to-blue-600 bg-clip-text text-transparent">
                  RESERVE
                </span>
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-gray-800 mb-8">
              {puppyName}
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Fill out the form below to reserve <span className="font-bold text-green-600">{puppyName}</span> and we'll get back to you within 24 hours!
            </p>
          </div>

          {/* Reservation Form */}
          <div className={`bg-white/90 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-gray-200 transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Step 1: Basic Info */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Your Contact Information</h3>
                    <p className="text-gray-600">We'll use this to get in touch about your reservation</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                        👤 Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full rounded-2xl border-2 border-gray-200 px-6 py-4 focus:outline-none focus:ring-4 focus:ring-green-200 focus:border-green-400 transition-all hover:shadow-lg text-lg text-gray-800"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                        📧 Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full rounded-2xl border-2 border-gray-200 px-6 py-4 focus:outline-none focus:ring-4 focus:ring-green-200 focus:border-green-400 transition-all hover:shadow-lg text-lg text-gray-800"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                      📱 Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full rounded-2xl border-2 border-gray-200 px-6 py-4 focus:outline-none focus:ring-4 focus:ring-green-200 focus:border-green-400 transition-all hover:shadow-lg text-lg text-gray-800"
                      placeholder="+1 (234) 567-890"
                    />
                  </div>
                  
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    disabled={!formData.name || !formData.email}
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold text-xl py-4 rounded-2xl hover:scale-105 hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 group"
                  >
                    <span>Continue</span>
                    <span className="group-hover:animate-bounce">→</span>
                  </button>
                </div>
              )}

              {/* Step 2: Message */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Additional Information</h3>
                    <p className="text-gray-600">Tell us more about your interest in {puppyName}</p>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                      💬 Your Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={8}
                      className="w-full rounded-2xl border-2 border-gray-200 px-6 py-4 focus:outline-none focus:ring-4 focus:ring-green-200 focus:border-green-400 transition-all hover:shadow-lg resize-none text-lg text-gray-800"
                      placeholder={`Tell us about your interest in ${puppyName}...`}
                    ></textarea>
                  </div>
                  
                  <div className="bg-green-50 rounded-2xl p-4">
                    <div className="flex items-start gap-3">
                      <div className="text-xl">💡</div>
                      <div>
                        <h4 className="font-bold text-green-800 mb-1">Helpful Information</h4>
                        <p className="text-green-700 text-sm">
                          Include details like your experience with dogs, living situation, preferred pickup/delivery method, and any specific questions about {puppyName}.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="flex-1 bg-gray-200 text-gray-700 font-bold text-xl py-4 rounded-2xl hover:scale-105 hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-3 group"
                    >
                      <span className="group-hover:animate-bounce">←</span>
                      <span>Back</span>
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting || !formData.message}
                      className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold text-xl py-4 rounded-2xl hover:scale-105 hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 group"
                    >
                      {isSubmitting ? (
                        <span className="animate-spin">⏳</span>
                      ) : (
                        <span className="group-hover:animate-bounce">🐕</span>
                      )}
                      <span>{isSubmitting ? "Submitting..." : `Reserve ${puppyName}`}</span>
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function ReservePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ReservePageContent />
    </Suspense>
  );
}
