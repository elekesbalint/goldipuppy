"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const steps = [
  {
    icon: "🐶",
    title: "1. Choose your puppy",
    desc: "Browse our available puppies and select the one that fits your family best. Each puppy has a detailed profile with photos, videos, and health info.",
  },
  {
    icon: "📝",
    title: "2. Reserve online",
    desc: "Secure your chosen puppy with a simple reservation process. Our team will guide you through every step and answer all your questions.",
  },
  {
    icon: "🏥",
    title: "3. Health & preparation",
    desc: "Your puppy receives a full vet check, vaccinations, microchip, and travel preparation. All documents and certificates are arranged.",
  },
  {
    icon: "✈️",
    title: "4. Safe delivery",
    desc: "We organize safe, comfortable delivery to your region, worldwide. You'll get regular updates and support until your puppy arrives.",
  },
  {
    icon: "🏡",
    title: "5. Welcome home!",
    desc: "Enjoy your new family member with ongoing support and health documentation. We're here for you every step of the way.",
  },
];

const faqs = [
  {
    q: "How do I reserve a puppy?",
    a: "Click the 'Reserve this puppy' button on the puppy's profile and follow the instructions. Our team will contact you to confirm all details.",
  },
  {
    q: "What is included in the price?",
    a: "All puppies come with vaccinations, vet check, microchip, international passport, and complete health documentation.",
  },
  {
    q: "How does delivery work?",
    a: "We organize safe, comfortable transport to your region. You'll get updates and support throughout the process.",
  },
  {
    q: "Can I meet the puppy's parents?",
    a: "Yes, we provide photos and information about the parents on the puppy's profile page.",
  },
  {
    q: "What support do you offer after delivery?",
    a: "We provide ongoing support and are always available to help with any questions or concerns.",
  },
  {
    q: "How long does the process take?",
    a: "From reservation to delivery typically takes 2-4 weeks, depending on your location and the puppy's preparation needs.",
  },
];

export default function OrderingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);
  const [visibleFaqs, setVisibleFaqs] = useState<number[]>([]);

  // Trigger animations on component mount
  useEffect(() => {
    setIsLoaded(true);
    // Set page-specific background
    document.documentElement.style.background = 'linear-gradient(to bottom right, #ecfdf5, #ffffff, #eff6ff)';
    document.body.style.background = 'linear-gradient(to bottom right, #ecfdf5, #ffffff, #eff6ff)';
    
    return () => {
      // Reset background on cleanup
      document.documentElement.style.background = '';
      document.body.style.background = '';
    };
  }, []);

  // Handle step animations
  useEffect(() => {
    const timer = setTimeout(() => {
      steps.forEach((_, index) => {
        setTimeout(() => {
          setVisibleSteps(prev => [...prev, index]);
        }, index * 200);
      });
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  // Handle FAQ animations
  useEffect(() => {
    const timer = setTimeout(() => {
      faqs.forEach((_, index) => {
        setTimeout(() => {
          setVisibleFaqs(prev => [...prev, index]);
        }, index * 100);
      });
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen font-sans overflow-x-hidden">
      {/* Animated floating elements */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-4 h-4 bg-[var(--accent)]/20 rounded-full animate-bounce" style={{animationDelay: '0s', animationDuration: '3s'}}></div>
        <div className="absolute top-40 right-20 w-6 h-6 bg-blue-400/20 rounded-full animate-bounce" style={{animationDelay: '1s', animationDuration: '4s'}}></div>
        <div className="absolute top-60 left-1/3 w-3 h-3 bg-green-400/20 rounded-full animate-bounce" style={{animationDelay: '2s', animationDuration: '5s'}}></div>
        <div className="absolute bottom-40 right-10 w-5 h-5 bg-purple-400/20 rounded-full animate-bounce" style={{animationDelay: '0.5s', animationDuration: '3.5s'}}></div>
        <div className="absolute bottom-20 left-20 w-4 h-4 bg-orange-400/20 rounded-full animate-bounce" style={{animationDelay: '1.5s', animationDuration: '4.5s'}}></div>
      </div>

      {/* Hero Section - Egyedi design az Ordering oldalhoz */}
      <section className={`relative bg-gradient-to-br from-emerald-50 via-white to-blue-50 min-h-screen flex items-center justify-center py-20 overflow-hidden transition-all duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        {/* Animated Process Flow Background */}
        <div className="absolute inset-0 overflow-hidden">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 800" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M100 400 Q300 200 500 400 T900 400 L1100 400" 
              stroke="url(#gradient)" 
              strokeWidth="4" 
              fill="none" 
              strokeDasharray="10,5"
              className="animate-pulse"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.3"/>
                <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.5"/>
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.3"/>
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Main Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          {/* Main Title Section */}
          <div className={`mb-20 transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="flex justify-center items-center gap-4 mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-3xl animate-spin-slow">
                ⚡
              </div>
              <div className="text-6xl sm:text-8xl font-black bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                EASY
              </div>
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-3xl animate-bounce">
                🎯
              </div>
            </div>
            <h1 className="text-7xl sm:text-8xl font-black text-gray-800 mb-6">
              ORDERING
            </h1>
            <div className="flex justify-center items-center gap-4 mb-8">
              <div className="h-1 w-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-full animate-pulse"></div>
              <span className="text-2xl">🐕</span>
              <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
            </div>
            <p className="text-2xl sm:text-3xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Your journey to finding the <span className="font-bold text-green-600">perfect puppy</span> made simple and transparent
            </p>
          </div>

          {/* Interactive Process Preview */}
          <div className={`grid grid-cols-1 md:grid-cols-5 gap-8 mb-20 transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {steps.map((step, index) => (
              <div key={index} className="relative group">
                {/* Connection Line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 left-full w-8 h-0.5 bg-gradient-to-r from-green-400 to-blue-400 -translate-y-1/2 z-0 animate-pulse"></div>
                )}
                
                {/* Step Card */}
                <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-500 group border-2 border-transparent hover:border-green-300 relative z-10">
                  {/* Step Number */}
                  <div className="absolute -top-4 -left-4 w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:animate-bounce">
                    {index + 1}
                  </div>
                  
                  {/* Icon */}
                  <div className="text-6xl mb-4 group-hover:animate-bounce transition-all duration-300">
                    {step.icon}
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-green-600 transition-colors duration-300">
                    {step.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                    {step.desc}
                  </p>
                  
                  {/* Progress Indicator */}
                  <div className="mt-6 w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-green-500 to-blue-500 rounded-full transition-all duration-1000 group-hover:animate-pulse"
                      style={{
                        width: '100%',
                        transitionDelay: `${index * 200}ms`
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className={`transition-all duration-1000 delay-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 rounded-3xl p-1 inline-block mb-8">
              <div className="bg-white rounded-3xl px-12 py-6">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-purple-600 bg-clip-text text-transparent mb-4">
                  Ready to Start Your Journey? 🚀
                </h2>
                <p className="text-gray-600 mb-6 text-lg">
                  Join thousands of happy families who found their perfect puppy companion
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Link href="/puppies" className="bg-gradient-to-r from-green-600 to-blue-600 text-white font-bold text-xl px-10 py-4 rounded-full shadow-2xl hover:scale-110 hover:shadow-3xl transition-all duration-300 flex items-center gap-3 group">
                    <span className="group-hover:animate-bounce">🔍</span>
                    Browse Available Puppies
                  </Link>
                  <Link href="/contact" className="bg-white border-2 border-gray-300 text-gray-700 font-bold text-xl px-10 py-4 rounded-full shadow-xl hover:scale-110 hover:shadow-2xl hover:border-green-400 transition-all duration-300 flex items-center gap-3 group">
                    <span className="group-hover:animate-bounce">💬</span>
                    Contact Our Team
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 transition-all duration-1000 delay-900 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="bg-white/60 backdrop-blur-lg rounded-2xl p-6 text-center group hover:bg-white/80 transition-all duration-300">
              <div className="text-3xl mb-2 group-hover:animate-bounce">🛡️</div>
              <div className="font-bold text-gray-800 text-lg group-hover:text-green-600 transition-colors duration-300">Safe & Secure</div>
              <div className="text-gray-600 text-sm">Protected payments</div>
            </div>
            <div className="bg-white/60 backdrop-blur-lg rounded-2xl p-6 text-center group hover:bg-white/80 transition-all duration-300">
              <div className="text-3xl mb-2 group-hover:animate-bounce">🏥</div>
              <div className="font-bold text-gray-800 text-lg group-hover:text-blue-600 transition-colors duration-300">Health Certified</div>
              <div className="text-gray-600 text-sm">Full documentation</div>
            </div>
            <div className="bg-white/60 backdrop-blur-lg rounded-2xl p-6 text-center group hover:bg-white/80 transition-all duration-300">
              <div className="text-3xl mb-2 group-hover:animate-bounce">🌍</div>
              <div className="font-bold text-gray-800 text-lg group-hover:text-purple-600 transition-colors duration-300">Worldwide</div>
              <div className="text-gray-600 text-sm">Global delivery</div>
            </div>
            <div className="bg-white/60 backdrop-blur-lg rounded-2xl p-6 text-center group hover:bg-white/80 transition-all duration-300">
              <div className="text-3xl mb-2 group-hover:animate-bounce">💬</div>
              <div className="font-bold text-gray-800 text-lg group-hover:text-green-600 transition-colors duration-300">24/7 Support</div>
              <div className="text-gray-600 text-sm">Always here for you</div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className={`absolute bottom-10 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
            <div className="flex flex-col items-center text-gray-500 animate-bounce">
              <span className="text-sm font-medium mb-2">See detailed process below</span>
              <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
                <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Background Decorations */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-20 left-20 text-5xl text-green-200 animate-float opacity-50" style={{animationDelay: '0s'}}>📋</div>
          <div className="absolute top-40 right-32 text-4xl text-blue-200 animate-float opacity-40" style={{animationDelay: '2s'}}>💳</div>
          <div className="absolute bottom-40 left-32 text-6xl text-purple-200 animate-float opacity-30" style={{animationDelay: '4s'}}>🚚</div>
          <div className="absolute bottom-20 right-20 text-3xl text-green-200 animate-float opacity-50" style={{animationDelay: '1s'}}>🏠</div>
          <div className="absolute top-1/2 left-10 text-2xl text-blue-200 animate-float opacity-40" style={{animationDelay: '3s'}}>⭐</div>
        </div>
      </section>
      
      {/* Original Content Continues */}
      <div className="flex flex-col items-center py-16 px-4">
        {/* Timeline steps */}
        <div className={`w-full max-w-5xl mb-16 transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 md:gap-0 relative">
            {/* Timeline line */}
            <div className="hidden md:block absolute left-0 right-0 top-12 h-1 bg-[var(--accent)] opacity-20 z-0" style={{top: '44px'}} />
            {steps.map((step, i) => (
              <div 
                key={`step-${step.title}-${i}`} 
                className={`flex flex-col items-center text-center md:w-1/5 z-10 transition-all duration-500 hover:scale-105 ${
                  visibleSteps.includes(i) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{
                  transitionDelay: `${800 + i * 200}ms`
                }}
              >
                <div className="text-5xl mb-3 bg-white rounded-full border-4 border-[var(--accent)] w-20 h-20 flex items-center justify-center shadow-lg hover:shadow-xl hover:animate-bounce transition-all duration-300">{step.icon}</div>
                <div className="font-bold text-[var(--foreground)] mb-2 mt-2 text-lg hover:text-[var(--accent)] transition-colors duration-300">{step.title}</div>
                <div className="text-gray-700 text-sm mb-4 hover:text-gray-900 transition-colors duration-300">{step.desc}</div>
              </div>
            ))}
          </div>
        </div>
      
      {/* Health certification box */}
      <div className={`w-full max-w-3xl mb-16 transition-all duration-1000 delay-1200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
        <div className="bg-white rounded-2xl shadow-lg border-l-8 border-[var(--accent)] p-8 flex flex-col md:flex-row items-center gap-6 hover:shadow-xl hover:scale-105 transition-all duration-300 group">
          <div className="text-4xl group-hover:animate-bounce transition-all duration-300">🏥</div>
          <div>
            <div className="font-bold text-[var(--foreground)] text-xl mb-1 group-hover:text-[var(--accent)] transition-colors duration-300">Complete Health Documentation</div>
            <div className="text-gray-700 group-hover:text-gray-900 transition-colors duration-300">Every puppy comes with full veterinary health certificates and documentation. Our support team is always here for you.</div>
          </div>
        </div>
      </div>
      
      {/* FAQ */}
      <div className={`w-full max-w-3xl mb-16 transition-all duration-1000 delay-1400 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
        <h2 className="text-3xl font-bold text-[var(--foreground)] mb-8 text-center hover:animate-pulse transition-all duration-300 cursor-default">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div 
              key={`faq-${faq.q.slice(0, 20)}-${i}`} 
              className={`bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 ${
                visibleFaqs.includes(i) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{
                transitionDelay: `${1500 + i * 100}ms`
              }}
            >
              <button
                onClick={() => toggleFaq(i)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors hover:scale-105 duration-300"
              >
                <span className="font-semibold text-[var(--foreground)] text-lg">{faq.q}</span>
                <span className={`text-[var(--accent)] text-2xl font-bold transition-transform duration-300 ${openFaq === i ? 'rotate-45' : ''}`}>
                  +
                </span>
              </button>
              {openFaq === i && (
                <div className="px-6 pb-4 border-t border-gray-100 bg-gray-50 animate-pulse">
                  <p className="text-gray-700 pt-4 leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Call to action buttons */}
      <div className={`flex flex-col sm:flex-row gap-6 justify-center transition-all duration-1000 delay-1600 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
        <Link href="/breeds" className="bg-[var(--accent)] text-white font-bold rounded-full px-8 py-3 shadow hover:bg-yellow-700 transition text-lg hover:scale-105 hover:shadow-xl duration-300 animate-pulse">Start now</Link>
        <Link href="/contact" className="bg-white border-2 border-[var(--accent)] text-[var(--accent)] font-bold rounded-full px-8 py-3 shadow hover:bg-[var(--accent)] hover:text-white transition text-lg hover:scale-105 hover:shadow-xl duration-300">Contact us</Link>
      </div>
      </div>
    </div>
  );
} 