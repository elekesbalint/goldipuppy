"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const deliveryRegions = [
  {
    region: "United States & Canada",
    icon: "🇺🇸",
    deliveryTime: "1-2 weeks",
    cost: "€150-250",
    methods: ["Ground transport", "Flight nanny service"],
    details: "Professional pet transport with climate control and regular updates."
  },
  {
    region: "Europe",
    icon: "🇪🇺", 
    deliveryTime: "1-3 weeks",
    cost: "€200-350",
    methods: ["Ground transport", "Air transport"],
    details: "EU-wide delivery with all health certificates and customs clearance."
  },
  {
    region: "United Kingdom",
    icon: "🇬🇧",
    deliveryTime: "2-4 weeks",
    cost: "€300-450",
    methods: ["Air transport", "Ferry transport"],
    details: "Post-Brexit compliant delivery with quarantine arrangements if needed."
  },
  {
    region: "Australia & New Zealand",
    icon: "🇦🇺",
    deliveryTime: "4-8 weeks",
    cost: "€500-800",
    methods: ["Air transport only"],
    details: "Includes quarantine period and all import permits and health testing."
  },
  {
    region: "Asia",
    icon: "🌏",
    deliveryTime: "3-6 weeks", 
    cost: "€400-700",
    methods: ["Air transport", "Flight nanny"],
    details: "Country-specific requirements with professional handling and documentation."
  },
  {
    region: "Other Regions",
    icon: "🌍",
    deliveryTime: "Contact us",
    cost: "Quote on request",
    methods: ["Various options"],
    details: "We deliver worldwide - contact us for specific requirements and pricing."
  }
];

const deliverySteps = [
  {
    step: 1,
    title: "Reservation Confirmed",
    icon: "✅",
    description: "After your puppy reservation is confirmed, we begin preparing all necessary health certificates and travel documents.",
    timeframe: "Day 1"
  },
  {
    step: 2,
    title: "Health Preparation",
    icon: "🏥",
    description: "Your puppy receives final health check, vaccinations, microchip, and all required health certificates for travel.",
    timeframe: "1-2 weeks"
  },
  {
    step: 3,
    title: "Transport Arranged",
    icon: "📋",
    description: "We coordinate with professional pet transport services and provide you with detailed travel itinerary and regular updates.",
    timeframe: "3-5 days before"
  },
  {
    step: 4,
    title: "Journey Begins",
    icon: "🚗",
    description: "Your puppy begins the journey in a comfortable, climate-controlled carrier with food, water, and comfort items.",
    timeframe: "Travel day"
  },
  {
    step: 5,
    title: "Regular Updates",
    icon: "📱",
    description: "You receive regular updates with photos and status information throughout the entire journey to your door.",
    timeframe: "During transport"
  },
  {
    step: 6,
    title: "Safe Arrival",
    icon: "🏡",
    description: "Your puppy arrives safely at your door, ready to begin their new life with your family. Support continues 24/7.",
    timeframe: "Delivery day"
  }
];

const safetyFeatures = [
  {
    icon: "🌡️",
    title: "Climate Control",
    description: "All transport vehicles maintain optimal temperature and humidity levels for puppy comfort."
  },
  {
    icon: "👨‍⚕️",
    title: "Trained Handlers",
    description: "Professional pet transport specialists with years of experience caring for puppies during travel."
  },
  {
    icon: "📍",
    title: "Regular Updates",
    description: "Regular status updates so you always know how your puppy is doing during the journey."
  },
  {
    icon: "🩺",
    title: "Health Monitoring",
    description: "Regular health checks during transport with immediate veterinary support if needed."
  },
  {
    icon: "🍽️",
    title: "Food & Water",
    description: "Regular feeding schedule maintained with familiar food and fresh water throughout the trip."
  },
  {
    icon: "🧸",
    title: "Comfort Items",
    description: "Blanket with mother's scent and favorite toys to reduce stress and provide comfort."
  }
];

export default function DeliveryPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);
  const [visibleRegions, setVisibleRegions] = useState<number[]>([]);
  const [visibleFeatures, setVisibleFeatures] = useState<number[]>([]);

  // Trigger animations on component mount
  useEffect(() => {
    setIsLoaded(true);
    // Set page-specific background
    document.documentElement.style.background = 'linear-gradient(to bottom right, #f8fafc, #dbeafe, #ecfdf5)';
    document.body.style.background = 'linear-gradient(to bottom right, #f8fafc, #dbeafe, #ecfdf5)';
    
    return () => {
      // Reset background on cleanup
      document.documentElement.style.background = '';
      document.body.style.background = '';
    };
  }, []);

  // Handle step animations
  useEffect(() => {
    const timer = setTimeout(() => {
      deliverySteps.forEach((_, index) => {
        setTimeout(() => {
          setVisibleSteps(prev => [...prev, index]);
        }, index * 200);
      });
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  // Handle region animations
  useEffect(() => {
    const timer = setTimeout(() => {
      deliveryRegions.forEach((_, index) => {
        setTimeout(() => {
          setVisibleRegions(prev => [...prev, index]);
        }, index * 150);
      });
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  // Handle feature animations
  useEffect(() => {
    const timer = setTimeout(() => {
      safetyFeatures.forEach((_, index) => {
        setTimeout(() => {
          setVisibleFeatures(prev => [...prev, index]);
        }, index * 100);
      });
    }, 2400);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen font-sans overflow-x-hidden">
      {/* Animated floating elements */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-16 left-8 w-5 h-5 bg-[var(--accent)]/20 rounded-full animate-bounce" style={{animationDelay: '0s', animationDuration: '4s'}}></div>
        <div className="absolute top-32 right-16 w-7 h-7 bg-blue-400/20 rounded-full animate-bounce" style={{animationDelay: '1s', animationDuration: '5s'}}></div>
        <div className="absolute top-64 left-1/4 w-4 h-4 bg-green-400/20 rounded-full animate-bounce" style={{animationDelay: '2s', animationDuration: '3.5s'}}></div>
        <div className="absolute bottom-32 right-8 w-6 h-6 bg-purple-400/20 rounded-full animate-bounce" style={{animationDelay: '0.5s', animationDuration: '4.5s'}}></div>
        <div className="absolute bottom-16 left-16 w-5 h-5 bg-orange-400/20 rounded-full animate-bounce" style={{animationDelay: '1.5s', animationDuration: '3s'}}></div>
      </div>

      {/* Hero Section - Egyedi design a Delivery oldalhoz */}
      <section className={`relative bg-gradient-to-br from-slate-900 via-blue-900 to-emerald-900 min-h-[80vh] flex items-center justify-center py-20 overflow-hidden transition-all duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        {/* Animated World Map Background */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 600" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Simplified world continents */}
            <path d="M200 200 L300 180 L350 220 L380 200 L400 240 L350 280 L300 260 L250 290 L200 260 Z" fill="currentColor" className="text-white/10 animate-pulse" />
            <path d="M450 180 L550 160 L600 200 L580 250 L520 270 L470 240 L450 200 Z" fill="currentColor" className="text-white/10 animate-pulse" style={{animationDelay: '1s'}} />
            <path d="M650 220 L750 200 L800 240 L820 280 L780 320 L720 310 L680 280 L650 250 Z" fill="currentColor" className="text-white/10 animate-pulse" style={{animationDelay: '2s'}} />
            <path d="M150 350 L250 330 L300 370 L280 420 L220 440 L170 410 L150 380 Z" fill="currentColor" className="text-white/10 animate-pulse" style={{animationDelay: '0.5s'}} />
            <path d="M850 280 L950 260 L1000 300 L980 350 L930 370 L880 340 L850 310 Z" fill="currentColor" className="text-white/10 animate-pulse" style={{animationDelay: '1.5s'}} />
            
            {/* Animated delivery routes */}
            <path d="M300 250 Q400 200 500 280 Q600 350 700 300" stroke="#10b981" strokeWidth="2" fill="none" strokeDasharray="5,5" className="animate-pulse" />
            <path d="M400 180 Q500 150 600 220 Q700 290 800 260" stroke="#3b82f6" strokeWidth="2" fill="none" strokeDasharray="5,5" className="animate-pulse" style={{animationDelay: '1s'}} />
            <path d="M200 280 Q350 320 500 350 Q650 380 800 350" stroke="#8b5cf6" strokeWidth="2" fill="none" strokeDasharray="5,5" className="animate-pulse" style={{animationDelay: '2s'}} />
            
            {/* Delivery location pins */}
            <circle cx="300" cy="250" r="6" fill="#ef4444" className="animate-bounce" />
            <circle cx="500" cy="280" r="6" fill="#f59e0b" className="animate-bounce" style={{animationDelay: '0.5s'}} />
            <circle cx="700" cy="300" r="6" fill="#10b981" className="animate-bounce" style={{animationDelay: '1s'}} />
            <circle cx="800" cy="260" r="6" fill="#3b82f6" className="animate-bounce" style={{animationDelay: '1.5s'}} />
          </svg>
        </div>

        {/* Main Content */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 text-center">
          {/* Title Section */}
          <div className={`mb-16 transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="flex justify-center items-center gap-6 mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center text-4xl animate-spin-slow">
                🌍
              </div>
              <div className="text-7xl sm:text-8xl lg:text-9xl font-black text-white">
                <span className="block bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                  GLOBAL
                </span>
              </div>
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-4xl animate-bounce">
                🚚
              </div>
            </div>
            <h1 className="text-8xl sm:text-9xl font-black text-white mb-8 drop-shadow-2xl">
              DELIVERY
            </h1>
            <div className="flex justify-center items-center gap-6 mb-8">
              <div className="h-2 w-32 bg-gradient-to-r from-green-400 to-blue-500 rounded-full animate-pulse"></div>
              <span className="text-4xl">✈️</span>
              <div className="h-2 w-32 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
            </div>
            <p className="text-2xl sm:text-3xl text-white/90 drop-shadow-lg max-w-5xl mx-auto leading-relaxed">
              Safe, tracked, and comfortable delivery to <span className="font-bold text-green-400">50+ countries</span> worldwide
            </p>
          </div>



          {/* Service Highlights */}
          <div className={`grid grid-cols-1 md:grid-cols-4 gap-6 mb-16 transition-all duration-1000 delay-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 backdrop-blur-lg rounded-3xl p-6 border border-green-400/30 hover:scale-105 transition-all duration-300 group">
              <div className="text-5xl mb-4 group-hover:animate-bounce">🌡️</div>
              <h3 className="text-xl font-bold text-white mb-2">Climate Controlled</h3>
              <p className="text-white/80 text-sm">Perfect temperature & humidity</p>
            </div>
            
            <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-lg rounded-3xl p-6 border border-blue-400/30 hover:scale-105 transition-all duration-300 group">
              <div className="text-5xl mb-4 group-hover:animate-bounce">👨‍⚕️</div>
              <h3 className="text-xl font-bold text-white mb-2">Expert Care</h3>
              <p className="text-white/80 text-sm">Professional pet handlers</p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 backdrop-blur-lg rounded-3xl p-6 border border-purple-400/30 hover:scale-105 transition-all duration-300 group">
              <div className="text-5xl mb-4 group-hover:animate-bounce">📱</div>
              <h3 className="text-xl font-bold text-white mb-2">Real-time Updates</h3>
              <p className="text-white/80 text-sm">SMS & email notifications</p>
            </div>
            
            <div className="bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 backdrop-blur-lg rounded-3xl p-6 border border-emerald-400/30 hover:scale-105 transition-all duration-300 group">
              <div className="text-5xl mb-4 group-hover:animate-bounce">🛡️</div>
              <h3 className="text-xl font-bold text-white mb-2">Fully Insured</h3>
              <p className="text-white/80 text-sm">Complete coverage & guarantee</p>
            </div>
          </div>

          {/* CTA Section */}
          <div className={`transition-all duration-1000 delay-900 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 rounded-3xl p-1 inline-block mb-8">
              <div className="bg-slate-900 rounded-3xl px-12 py-8">
                <h2 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-purple-400 bg-clip-text text-transparent mb-6">
                  Ready for Safe Delivery? 🚀
                </h2>
                <div className="flex flex-wrap gap-6 justify-center">
                  <button className="bg-gradient-to-r from-green-600 to-blue-600 text-white font-bold text-xl px-12 py-5 rounded-full shadow-2xl hover:scale-110 hover:shadow-3xl transition-all duration-300 flex items-center gap-3 group">
                    <span className="group-hover:animate-bounce">📞</span>
                    Contact Support
                  </button>
                  <button className="bg-white/20 backdrop-blur-lg text-white font-bold text-xl px-12 py-5 rounded-full shadow-2xl hover:scale-110 hover:shadow-3xl hover:bg-white/30 transition-all duration-300 flex items-center gap-3 group border border-white/30">
                    <span className="group-hover:animate-bounce">💬</span>
                    Contact Support
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className={`absolute bottom-10 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
            <div className="flex flex-col items-center text-white/60 animate-bounce">
              <span className="text-sm font-medium mb-2">Explore delivery process</span>
              <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center">
                <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-20 left-20 text-4xl text-white/10 animate-float" style={{animationDelay: '0s'}}>✈️</div>
          <div className="absolute top-40 right-32 text-5xl text-white/10 animate-float" style={{animationDelay: '2s'}}>🚚</div>
          <div className="absolute bottom-40 left-32 text-3xl text-white/10 animate-float" style={{animationDelay: '4s'}}>📦</div>
          <div className="absolute bottom-20 right-20 text-4xl text-white/10 animate-float" style={{animationDelay: '1s'}}>🌍</div>
          <div className="absolute top-1/2 left-10 text-2xl text-white/10 animate-float" style={{animationDelay: '3s'}}>⭐</div>
          <div className="absolute top-1/3 right-10 text-6xl text-white/10 animate-float" style={{animationDelay: '5s'}}>🛡️</div>
        </div>
      </section>

      {/* Delivery Process */}
      <section className={`py-20 max-w-6xl mx-auto px-4 mb-16 transition-all duration-1000 delay-900 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--foreground)] mb-6 hover:animate-pulse transition-all duration-300 cursor-default">
            How Delivery Works ⚡
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            From reservation to your door - every step is carefully planned and monitored
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-[var(--accent)]/20"></div>
          
          <div className="space-y-12">
            {deliverySteps.map((step, index) => (
              <div 
                key={step.step} 
                className={`flex flex-col lg:flex-row items-center gap-8 transition-all duration-500 ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                } ${visibleSteps.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{
                  transitionDelay: `${1200 + index * 200}ms`
                }}
              >
                {/* Content */}
                <div className="flex-1 lg:max-w-md">
                  <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 hover:scale-105 hover:shadow-2xl transition-all duration-300 group">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="text-4xl group-hover:animate-bounce transition-all duration-300">{step.icon}</div>
                      <div>
                        <h3 className="text-2xl font-bold text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors duration-300">{step.title}</h3>
                        <div className="text-[var(--accent)] font-semibold group-hover:animate-pulse">{step.timeframe}</div>
                      </div>
                    </div>
                    <p className="text-gray-700 leading-relaxed group-hover:text-gray-900 transition-colors duration-300">{step.description}</p>
                  </div>
                </div>

                {/* Step number */}
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-r from-[var(--accent)] to-yellow-600 text-white rounded-full flex items-center justify-center text-2xl font-bold shadow-xl hover:scale-110 hover:animate-pulse transition-all duration-300">
                    {step.step}
                  </div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="flex-1 lg:max-w-md hidden lg:block"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Delivery Regions */}
      <section className={`py-20 max-w-6xl mx-auto px-4 mb-16 transition-all duration-1000 delay-1400 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--foreground)] mb-6 hover:animate-pulse transition-all duration-300 cursor-default">
            🌍 Worldwide Delivery 🌎
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            We deliver to families around the globe with region-specific expertise
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {deliveryRegions.map((region, index) => (
            <div 
              key={index} 
              className={`bg-white rounded-3xl shadow-xl border border-gray-100 p-8 hover:scale-105 hover:shadow-2xl transition-all duration-500 group ${
                visibleRegions.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{
                transitionDelay: `${1800 + index * 150}ms`
              }}
            >
              <div className="text-center mb-6">
                <div className="text-5xl mb-4 group-hover:animate-bounce transition-all duration-300">{region.icon}</div>
                <h3 className="text-2xl font-bold text-[var(--foreground)] mb-2 group-hover:text-[var(--accent)] transition-colors duration-300">{region.region}</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-700">Delivery Time:</span>
                  <span className="text-[var(--accent)] font-bold group-hover:animate-pulse">{region.deliveryTime}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-700">Cost Range:</span>
                  <span className="text-[var(--accent)] font-bold group-hover:animate-pulse">{region.cost}</span>
                </div>
                <div className="pt-2">
                  <span className="font-semibold text-gray-700 block mb-2">Methods:</span>
                  <div className="flex flex-wrap gap-2">
                    {region.methods.map((method, i) => (
                      <span key={`method-${region.region}-${method}-${i}`} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-semibold hover:bg-[var(--accent)] hover:text-white transition-all duration-300 hover:scale-110">
                        {method}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 text-sm pt-2 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">{region.details}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Safety Features */}
      <section className={`py-20 bg-gradient-to-r from-amber-50 to-white max-w-6xl mx-auto px-4 rounded-3xl mb-16 transition-all duration-1000 delay-1800 hover:shadow-xl hover:scale-105 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--foreground)] mb-6 hover:animate-pulse transition-all duration-300 cursor-default">
            🛡️ Safety First 🛡️
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Every aspect of transport is designed for your puppy's safety, comfort, and wellbeing
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {safetyFeatures.map((feature, index) => (
            <div 
              key={`safety-${feature.title}-${index}`} 
              className={`bg-white rounded-3xl shadow-xl border border-gray-100 p-8 text-center hover:scale-105 hover:shadow-2xl transition-all duration-500 group ${
                visibleFeatures.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{
                transitionDelay: `${2400 + index * 100}ms`
              }}
            >
              <div className="text-5xl mb-6 group-hover:animate-bounce transition-all duration-300">{feature.icon}</div>
              <h3 className="text-xl font-bold text-[var(--foreground)] mb-4 group-hover:text-[var(--accent)] transition-colors duration-300">{feature.title}</h3>
              <p className="text-gray-700 leading-relaxed group-hover:text-gray-900 transition-colors duration-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Communication & Updates */}
      <section className={`py-20 max-w-6xl mx-auto px-4 mb-16 transition-all duration-1000 delay-2000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--foreground)] mb-6 hover:animate-pulse transition-all duration-300 cursor-default">
              Stay Connected 📱
            </h2>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              You'll never wonder how your puppy is doing. Our comprehensive communication system keeps you informed every step of the way.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4 hover:scale-105 transition-all duration-300 group">
                <div className="text-3xl group-hover:animate-bounce transition-all duration-300">📱</div>
                <div>
                  <h3 className="text-xl font-bold text-[var(--foreground)] mb-2 group-hover:text-[var(--accent)] transition-colors duration-300">Real-time Updates</h3>
                  <p className="text-gray-700 group-hover:text-gray-900 transition-colors duration-300">SMS and email updates with photos and location throughout the journey.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 hover:scale-105 transition-all duration-300 group">
                <div className="text-3xl group-hover:animate-bounce transition-all duration-300">📧</div>
                <div>
                  <h3 className="text-xl font-bold text-[var(--foreground)] mb-2 group-hover:text-[var(--accent)] transition-colors duration-300">Email Updates</h3>
                  <p className="text-gray-700 group-hover:text-gray-900 transition-colors duration-300">Regular email updates with photos and status throughout the journey.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 hover:scale-105 transition-all duration-300 group">
                <div className="text-3xl group-hover:animate-bounce transition-all duration-300">📞</div>
                <div>
                  <h3 className="text-xl font-bold text-[var(--foreground)] mb-2 group-hover:text-[var(--accent)] transition-colors duration-300">24/7 Support</h3>
                  <p className="text-gray-700 group-hover:text-gray-900 transition-colors duration-300">Emergency support line available throughout the entire delivery process.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 hover:scale-105 hover:shadow-2xl transition-all duration-300">
            <h3 className="text-2xl font-bold text-[var(--foreground)] mb-6 text-center hover:text-[var(--accent)] transition-colors duration-300">Sample Update</h3>
            <div className="bg-gray-50 rounded-2xl p-6 mb-6 hover:bg-gray-100 transition-colors duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="font-semibold text-gray-700">Journey Update - 2:30 PM</span>
              </div>
              <p className="text-gray-700 mb-4">
                "Hi Sarah! Bella is doing great on her journey to you. She just had her lunch and a comfort break. Currently 45 miles from your location - estimated arrival 4:15 PM. She's been sleeping peacefully and seems very comfortable. 🐕💕"
              </p>
              <div className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="animate-pulse">📍</span>
                  <span>Current location: Highway 101, 45 miles from destination</span>
                </div>
              </div>
            </div>
            <div className="text-center">
              <button className="bg-gradient-to-r from-[var(--accent)] to-yellow-600 text-white font-bold rounded-full px-6 py-3 shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 animate-pulse">
                Contact Support 📞
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Delivery Guarantee */}
      <section className={`py-20 max-w-6xl mx-auto px-4 mb-16 transition-all duration-1000 delay-2200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-12 text-center hover:scale-105 hover:shadow-3xl transition-all duration-300">
          <div className="text-6xl mb-6 animate-pulse">🛡️</div>
          <h2 className="text-3xl font-extrabold text-[var(--foreground)] mb-6 hover:text-[var(--accent)] transition-colors duration-300 cursor-default">
            Delivery Guarantee
          </h2>
          <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
            We guarantee safe delivery of your healthy, happy puppy. If any issues occur during transport, we take full responsibility and will make it right.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="hover:scale-105 transition-all duration-300 group">
              <div className="text-3xl mb-3 group-hover:animate-bounce transition-all duration-300">✅</div>
              <h3 className="font-bold text-[var(--foreground)] mb-2 group-hover:text-[var(--accent)] transition-colors duration-300">Safe Arrival</h3>
              <p className="text-gray-600 group-hover:text-gray-800 transition-colors duration-300">Guaranteed healthy arrival or full refund</p>
            </div>
            <div className="hover:scale-105 transition-all duration-300 group">
              <div className="text-3xl mb-3 group-hover:animate-bounce transition-all duration-300">🕐</div>
              <h3 className="font-bold text-[var(--foreground)] mb-2 group-hover:text-[var(--accent)] transition-colors duration-300">On-Time Delivery</h3>
              <p className="text-gray-600 group-hover:text-gray-800 transition-colors duration-300">Compensation for significant delays</p>
            </div>
            <div className="hover:scale-105 transition-all duration-300 group">
              <div className="text-3xl mb-3 group-hover:animate-bounce transition-all duration-300">💝</div>
              <h3 className="font-bold text-[var(--foreground)] mb-2 group-hover:text-[var(--accent)] transition-colors duration-300">Perfect Condition</h3>
              <p className="text-gray-600 group-hover:text-gray-800 transition-colors duration-300">Clean, comfortable, and stress-free arrival</p>
            </div>
          </div>
          <Link href="/faq" className="bg-gradient-to-r from-[var(--accent)] to-yellow-600 text-white font-bold rounded-full px-8 py-4 shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300 animate-pulse">
            View Health FAQ 📋
          </Link>
        </div>
      </section>

      {/* Contact for Delivery */}
      <section className={`bg-gradient-to-r from-amber-50 to-white py-16 max-w-6xl mx-auto px-4 rounded-3xl mb-16 transition-all duration-1000 delay-2400 hover:shadow-xl hover:scale-105 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-[var(--foreground)] mb-4 hover:animate-pulse transition-all duration-300 cursor-default">
            Questions About Delivery? 🤔
          </h2>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Our delivery specialists can provide detailed information about shipping to your specific location. ✨
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact" className="bg-gradient-to-r from-[var(--accent)] to-yellow-600 text-white font-bold rounded-full px-8 py-4 shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300 animate-pulse">
              Contact Delivery Team 📞
            </Link>
            <Link href="/faq" className="bg-white text-[var(--accent)] font-bold rounded-full px-8 py-4 shadow-xl border-2 border-[var(--accent)] hover:scale-105 hover:shadow-2xl hover:bg-[var(--accent)] hover:text-white transition-all duration-300">
              Delivery FAQ 📋
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
} 