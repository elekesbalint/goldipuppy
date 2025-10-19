"use client";
import { useState, FormEvent, useEffect, Suspense } from "react";
import Link from "next/link";
import emailjs from '@emailjs/browser';
import { useSearchParams } from 'next/navigation';

type ContactMethod = 'email' | 'phone' | 'form';

function ContactPageContent() {
  const searchParams = useSearchParams();
  const [selectedMethod, setSelectedMethod] = useState<ContactMethod>('form');
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
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
    
    // Handle URL parameters for puppy reservation/questions
    const puppyName = searchParams.get('puppy');
    const action = searchParams.get('action');
    
    if (puppyName && action) {
      if (action === 'reserve') {
        setFormData(prev => ({
          ...prev,
          subject: 'reservation',
          message: `Hi! I would like to reserve ${puppyName}. Please let me know about the next steps, pricing, and availability.\n\nThank you!`
        }));
      } else if (action === 'question') {
        setFormData(prev => ({
          ...prev,
          subject: 'puppy-inquiry',
          message: `Hi! I have some questions about ${puppyName}. Could you please provide more information?\n\nThank you!`
        }));
      } else if (action === 'waitlist') {
        setFormData(prev => ({
          ...prev,
          subject: 'general',
          message: `Hi! I'm interested in ${puppyName}, but I see it's currently reserved. Could you please add me to the waiting list in case it becomes available again, or let me know about similar puppies?\n\nThank you!`
        }));
      }
    }
    
    return () => {
      // Reset background on cleanup
      document.documentElement.style.background = '';
      document.body.style.background = '';
    };
  }, [searchParams]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Initialize EmailJS (replace with your actual keys)
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_90q83xb';
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_yt3rsl7';
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'rbfLK60Katw-_bGNB';

      // Map subject values to readable text for email subject line
      const subjectMap: { [key: string]: string } = {
        'puppy-inquiry': '🐕 GoldiPuppy - Puppy Inquiry',
        'reservation': '📝 GoldiPuppy - Reservation Request',
        'delivery': '🚚 GoldiPuppy - Delivery Info Request',
        'health-certificate': '🏥 GoldiPuppy - Health Certificate Inquiry',
        'general': '❓ GoldiPuppy - General Question',
        'support': '🤝 GoldiPuppy - Support Request'
      };

      // Map for email content
      const contentSubjectMap: { [key: string]: string } = {
        'puppy-inquiry': 'Puppy Inquiry - Questions about available puppies',
        'reservation': 'Reservation - Booking and reservation questions',
        'delivery': 'Delivery Info - Shipping and delivery process',
        'health-certificate': 'Health Certificate - Medical records and health info',
        'general': 'General Question - Other questions or concerns',
        'support': 'Support - Technical or account support'
      };

      // Prepare template parameters
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone || 'Not provided',
        subject: subjectMap[formData.subject] || `🐕 GoldiPuppy - New Contact from ${formData.name}`, // This becomes the email subject
        inquiry_type: contentSubjectMap[formData.subject] || formData.subject, // This goes in email content
        message: formData.message,
        to_email: 'goldipuppy01@gmail.com', // Your email address
        submitted_at: new Date().toLocaleString('hu-HU', { timeZone: 'Europe/Budapest' }),
      };

      // Send email via EmailJS
      const result = await emailjs.send(serviceId, templateId, templateParams, publicKey);
      
      if (result.status === 200) {
        setSubmitted(true);
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      } else {
        throw new Error('EmailJS failed');
      }
    } catch (err) {
      console.error('Email sending failed:', err);
      alert('There was a problem sending your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactMethods = [
    {
      id: 'email' as ContactMethod,
      name: 'Email Support',
      icon: '📧',
      description: 'Detailed responses within hours',
      available: true,
      responseTime: '2-4 hours',
      color: 'from-blue-500 to-cyan-600',
      bgColor: 'from-blue-50 to-cyan-50'
    },
    {
      id: 'phone' as ContactMethod,
      name: 'Phone Call',
      icon: '📞',
      description: 'Speak with our puppy experts',
      available: true,
      responseTime: 'Immediate',
      color: 'from-purple-500 to-pink-600',
      bgColor: 'from-purple-50 to-pink-50'
    },
    {
      id: 'form' as ContactMethod,
      name: 'Contact Form',
      icon: '📝',
      description: 'Detailed inquiry with full context',
      available: true,
      responseTime: '24 hours',
      color: 'from-orange-500 to-red-600',
      bgColor: 'from-orange-50 to-red-50'
    }
  ];



  if (submitted) {
    return (
      <div className="min-h-screen font-sans flex flex-col items-center justify-center overflow-x-hidden">
        {/* Success Animation */}
        <div className="text-center max-w-2xl mx-auto px-4">
          <div className="relative mb-8">
            <div className="text-9xl animate-bounce mb-4">✅</div>
            <div className="absolute inset-0 animate-ping">
              <div className="text-9xl opacity-20">✅</div>
            </div>
          </div>
          
          <h1 className="text-5xl sm:text-6xl font-black text-gray-800 mb-6">
            <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Message Sent!
            </span>
          </h1>
          
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-green-200 mb-8">
            <p className="text-xl text-gray-600 mb-6">
              Thank you for reaching out! Our team will get back to you within <span className="font-bold text-green-600">24 hours</span>.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
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
              <div className="text-center p-4 bg-purple-50 rounded-2xl">
                <div className="text-2xl mb-2">🎯</div>
                <div className="text-sm font-bold text-gray-700">Priority Level</div>
                <div className="text-xs text-purple-600">High Priority</div>
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
            <button 
              onClick={() => {setSubmitted(false); setSelectedMethod('form'); setCurrentStep(1);}}
              className="bg-white text-gray-700 font-bold rounded-full px-10 py-4 shadow-xl border-2 border-gray-300 hover:scale-110 hover:shadow-2xl hover:border-green-400 transition-all duration-300 flex items-center gap-3 group"
            >
              <span className="group-hover:animate-bounce">📝</span>
              Send Another Message
            </button>
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

      {/* Hero Section - Interactive Contact Method Selector */}
      <section className={`relative min-h-[80vh] flex items-center justify-center py-20 overflow-hidden transition-all duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        {/* Background Pattern */}
        <div className="absolute inset-0 overflow-hidden opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='0.3'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm20 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-4">
          {/* Main Title */}
          <div className={`text-center mb-12 sm:mb-16 px-4 transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="flex justify-center items-center gap-3 sm:gap-6 mb-6 sm:mb-8">
              <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-2xl sm:text-3xl lg:text-4xl animate-bounce">
                💬
              </div>
              <div className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-gray-800">
                <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  GET IN
                </span>
              </div>
              <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-2xl sm:text-3xl lg:text-4xl animate-pulse">
                🤝
              </div>
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-gray-800 mb-6 sm:mb-8">
              TOUCH
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Choose how you'd like to connect with our <span className="font-bold text-blue-600">puppy experts</span>
            </p>
          </div>

          {/* Contact Method Selector */}
          <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-12 sm:mb-16 px-4 transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {contactMethods.map((method, index) => (
              <div
                key={method.id}
                onClick={() => setSelectedMethod(method.id)}
                className={`relative cursor-pointer transition-all duration-500 hover:scale-105 touch-manipulation ${
                  selectedMethod === method.id 
                    ? 'scale-105 z-10' 
                    : 'hover:scale-105'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className={`bg-gradient-to-br ${method.bgColor} rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border-4 ${
                  selectedMethod === method.id 
                    ? 'border-blue-400 ring-4 ring-blue-200' 
                    : 'border-transparent hover:border-gray-200'
                }`}>
                  {/* Available Indicator */}
                  {method.available && (
                    <div className="absolute top-3 right-3 sm:top-4 sm:right-4 w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full animate-pulse">
                      <div className="absolute inset-0 bg-green-500 rounded-full animate-ping"></div>
                    </div>
                  )}
                  
                  <div className="text-4xl sm:text-5xl lg:text-6xl mb-4 sm:mb-6 animate-bounce">{method.icon}</div>
                  
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 mb-2 sm:mb-3">
                    {method.name}
                  </h3>
                  
                  <p className="text-gray-600 mb-3 sm:mb-4 text-xs sm:text-sm leading-relaxed">
                    {method.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className={`bg-gradient-to-r ${method.color} text-white px-2 sm:px-3 py-1 rounded-full text-xs font-bold`}>
                      {method.responseTime}
                    </div>
                    {selectedMethod === method.id && (
                      <div className="text-blue-600 font-bold text-xs sm:text-sm animate-pulse">
                        Selected ✓
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dynamic Content Area */}
          <div className={`px-4 transition-all duration-1000 delay-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {selectedMethod === 'email' && (
              <div className="bg-white/90 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-2xl border border-gray-200 max-w-4xl mx-auto">
                <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <div className="text-2xl sm:text-3xl lg:text-4xl">📧</div>
                  <div>
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800">Email Support</h2>
                    <p className="text-gray-600 text-sm sm:text-base">Get detailed responses within 2-4 hours</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
                  <div className="bg-blue-50 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                    <div className="text-xl sm:text-2xl mb-2 sm:mb-3">📬</div>
                    <h3 className="font-bold text-gray-800 mb-2 text-sm sm:text-base">General Inquiries</h3>
                    <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4">Questions about puppies, breeds, or our services</p>
                    <a href="mailto:goldipuppy01@gmail.com" className="text-blue-600 font-bold hover:underline text-xs sm:text-sm break-all">
                      goldipuppy01@gmail.com
                    </a>
                  </div>
                  
                  <div className="bg-green-50 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                    <div className="text-xl sm:text-2xl mb-2 sm:mb-3">🏥</div>
                    <h3 className="font-bold text-gray-800 mb-2 text-sm sm:text-base">Health & Care Support</h3>
                    <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4">Medical questions and health certificates</p>
                    <a href="mailto:goldipuppy01@gmail.com" className="text-green-600 font-bold hover:underline text-xs sm:text-sm break-all">
                      goldipuppy01@gmail.com
                    </a>
                  </div>
                </div>
                
                <a 
                  href="mailto:goldipuppy01@gmail.com?subject=GoldiPuppy Inquiry&body=Hello,%0D%0A%0D%0AI would like to inquire about..."
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-lg sm:text-xl py-3 sm:py-4 rounded-2xl hover:scale-105 hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 group touch-manipulation"
                >
                  <span className="group-hover:animate-bounce">✉️</span>
                  Send Email Now
                </a>
              </div>
            )}

            {selectedMethod === 'phone' && (
              <div className="bg-white/90 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-2xl border border-gray-200 max-w-4xl mx-auto">
                <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <div className="text-2xl sm:text-3xl lg:text-4xl">📞</div>
                  <div>
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800">Phone Support</h2>
                    <p className="text-gray-600 text-sm sm:text-base">Speak directly with our puppy experts</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-purple-50 rounded-2xl p-6">
                    <div className="text-2xl mb-3">🏢</div>
                    <h3 className="font-bold text-gray-800 mb-2">Main Office</h3>
                    <p className="text-gray-600 text-sm mb-2">Mon-Fri 9AM-6PM CET</p>
                    <a href="tel:+36305433199" className="text-purple-600 font-bold text-xl hover:underline">
                      +36 30 543 3199
                    </a>
                  </div>
                  
                  <div className="bg-red-50 rounded-2xl p-6">
                    <div className="text-2xl mb-3">🚨</div>
                    <h3 className="font-bold text-gray-800 mb-2">Emergency Line</h3>
                    <p className="text-gray-600 text-sm mb-2">24/7 Puppy Emergency Support</p>
                    <a href="tel:+36305433199" className="text-red-600 font-bold text-xl hover:underline">
                      +36 30 543 3199
                    </a>
                  </div>
                </div>
                

                
                <a 
                  href="tel:+36305433199"
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-xl py-4 rounded-2xl hover:scale-105 hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 group"
                >
                  <span className="group-hover:animate-bounce">📱</span>
                  Call Us Now
                </a>
              </div>
            )}

            {selectedMethod === 'form' && (
              <div className="bg-white/90 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-2xl border border-gray-200 max-w-4xl mx-auto">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                  <div className="flex items-center gap-3 sm:gap-4 flex-1">
                    <div className="text-2xl sm:text-3xl lg:text-4xl">📝</div>
                    <div>
                      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800">Contact Form</h2>
                      <p className="text-gray-600 text-sm sm:text-base">Send us a detailed message</p>
                    </div>
                  </div>
                  <div className="bg-orange-100 text-orange-800 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-bold self-start sm:self-auto">
                    Step {currentStep} of 3
                  </div>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Step 1: Basic Info */}
                  {currentStep === 1 && (
                    <div className="space-y-6">
                      <div className="text-center mb-4 sm:mb-6">
                        <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">Let's start with your details</h3>
                        <p className="text-gray-600 text-sm sm:text-base">We'll use this to personalize your experience</p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
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
                            className="w-full rounded-xl sm:rounded-2xl border-2 border-gray-200 px-4 sm:px-6 py-3 sm:py-4 focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-400 transition-all hover:shadow-lg text-base sm:text-lg text-gray-800 touch-manipulation"
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
                            className="w-full rounded-xl sm:rounded-2xl border-2 border-gray-200 px-4 sm:px-6 py-3 sm:py-4 focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-400 transition-all hover:shadow-lg text-base sm:text-lg text-gray-800 touch-manipulation"
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
                          className="w-full rounded-xl sm:rounded-2xl border-2 border-gray-200 px-4 sm:px-6 py-3 sm:py-4 focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-400 transition-all hover:shadow-lg text-base sm:text-lg text-gray-800 touch-manipulation"
                          placeholder="+1 (234) 567-890"
                        />
                      </div>
                      
                      <button
                        type="button"
                        onClick={() => setCurrentStep(2)}
                        disabled={!formData.name || !formData.email}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg sm:text-xl py-3 sm:py-4 rounded-2xl hover:scale-105 hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 group touch-manipulation"
                      >
                        <span>Continue</span>
                        <span className="group-hover:animate-bounce">→</span>
                      </button>
                    </div>
                  )}

                  {/* Step 2: Topic Selection */}
                  {currentStep === 2 && (
                    <div className="space-y-6">
                      <div className="text-center mb-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-2">What can we help you with?</h3>
                        <p className="text-gray-600">Choose the topic that best matches your inquiry</p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                          { value: 'puppy-inquiry', label: 'Puppy Inquiry', icon: '🐕', desc: 'Questions about available puppies' },
                          { value: 'reservation', label: 'Reservation', icon: '📝', desc: 'Booking and reservation questions' },
                          { value: 'delivery', label: 'Delivery Info', icon: '🚚', desc: 'Shipping and delivery process' },
                          { value: 'health-certificate', label: 'Health Certificate', icon: '🏥', desc: 'Medical records and health info' },
                          { value: 'general', label: 'General Question', icon: '❓', desc: 'Other questions or concerns' },
                          { value: 'support', label: 'Support', icon: '🤝', desc: 'Technical or account support' }
                        ].map((topic) => (
                          <label key={topic.value} className="cursor-pointer">
                            <input
                              type="radio"
                              name="subject"
                              value={topic.value}
                              checked={formData.subject === topic.value}
                              onChange={handleChange}
                              className="sr-only"
                            />
                            <div className={`p-4 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
                              formData.subject === topic.value
                                ? 'border-blue-400 bg-blue-50 ring-4 ring-blue-200'
                                : 'border-gray-200 bg-white hover:border-gray-300'
                            }`}>
                              <div className="flex items-center gap-3">
                                <div className="text-2xl">{topic.icon}</div>
                                <div>
                                  <div className="font-bold text-gray-800">{topic.label}</div>
                                  <div className="text-sm text-gray-600">{topic.desc}</div>
                                </div>
                                {formData.subject === topic.value && (
                                  <div className="text-blue-600 ml-auto">✓</div>
                                )}
                              </div>
                            </div>
                          </label>
                        ))}
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
                          type="button"
                          onClick={() => setCurrentStep(3)}
                          disabled={!formData.subject}
                          className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-xl py-4 rounded-2xl hover:scale-105 hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 group"
                        >
                          <span>Continue</span>
                          <span className="group-hover:animate-bounce">→</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Message */}
                  {currentStep === 3 && (
                    <div className="space-y-6">
                      <div className="text-center mb-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Tell us more about your inquiry</h3>
                        <p className="text-gray-600">The more details you provide, the better we can help you</p>
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
                          className="w-full rounded-2xl border-2 border-gray-200 px-6 py-4 focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-400 transition-all hover:shadow-lg resize-none text-lg text-gray-800"
                          placeholder="Please provide as much detail as possible about your inquiry. For example, if you're looking for a specific breed, mention your preferences, location, timeline, etc."
                        ></textarea>
                      </div>
                      
                      <div className="bg-blue-50 rounded-2xl p-4">
                        <div className="flex items-start gap-3">
                          <div className="text-xl">💡</div>
                          <div>
                            <h4 className="font-bold text-blue-800 mb-1">Pro Tip</h4>
                            <p className="text-blue-700 text-sm">
                              Include details like preferred breed, size, age, your experience with dogs, living situation, and any specific requirements. This helps us provide the most relevant recommendations!
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-4">
                        <button
                          type="button"
                          onClick={() => setCurrentStep(2)}
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
                            <span className="group-hover:animate-bounce">🚀</span>
                          )}
                          <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
                        </button>
                      </div>
                    </div>
                  )}
                </form>
              </div>
            )}
          </div>
        </div>

        {/* Background Animation Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-20 left-20 text-4xl text-blue-200 animate-float opacity-30" style={{animationDelay: '0s'}}>💬</div>
          <div className="absolute top-40 right-32 text-5xl text-purple-200 animate-float opacity-20" style={{animationDelay: '2s'}}>📞</div>
          <div className="absolute bottom-40 left-32 text-3xl text-pink-200 animate-float opacity-25" style={{animationDelay: '4s'}}>📧</div>
          <div className="absolute bottom-20 right-20 text-4xl text-blue-200 animate-float opacity-30" style={{animationDelay: '1s'}}>🤝</div>
          <div className="absolute top-1/2 left-10 text-2xl text-purple-200 animate-float opacity-20" style={{animationDelay: '3s'}}>✨</div>
          <div className="absolute top-1/3 right-10 text-6xl text-pink-200 animate-float opacity-15" style={{animationDelay: '5s'}}>💝</div>
        </div>
      </section>



      {/* Quick Actions Footer */}
      <section className={`bg-gradient-to-r from-gray-100 to-blue-100 py-16 max-w-6xl mx-auto px-4 rounded-3xl mb-16 transition-all duration-1000 delay-1200 hover:shadow-xl hover:scale-105 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            ⚡ Need Quick Answers?
          </h2>
          <p className="text-xl text-gray-600">
            Browse our help resources or get instant answers
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Link 
            href="/faq" 
            className="bg-white rounded-2xl p-6 text-center hover:scale-105 hover:shadow-xl transition-all duration-300 group"
          >
            <div className="text-3xl mb-3 group-hover:animate-bounce">❓</div>
            <div className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">FAQ</div>
            <div className="text-sm text-gray-600">Common questions</div>
          </Link>
          
          <Link 
            href="/ordering" 
            className="bg-white rounded-2xl p-6 text-center hover:scale-105 hover:shadow-xl transition-all duration-300 group"
          >
            <div className="text-3xl mb-3 group-hover:animate-bounce">📋</div>
            <div className="font-bold text-gray-800 group-hover:text-green-600 transition-colors duration-300">How It Works</div>
            <div className="text-sm text-gray-600">Step-by-step guide</div>
          </Link>
          
          <Link 
            href="/delivery" 
            className="bg-white rounded-2xl p-6 text-center hover:scale-105 hover:shadow-xl transition-all duration-300 group"
          >
            <div className="text-3xl mb-3 group-hover:animate-bounce">🚚</div>
            <div className="font-bold text-gray-800 group-hover:text-purple-600 transition-colors duration-300">Delivery Info</div>
            <div className="text-sm text-gray-600">Shipping details</div>
          </Link>
          
          <Link 
            href="/reviews" 
            className="bg-white rounded-2xl p-6 text-center hover:scale-105 hover:shadow-xl transition-all duration-300 group"
          >
            <div className="text-3xl mb-3 group-hover:animate-bounce">⭐</div>
            <div className="font-bold text-gray-800 group-hover:text-pink-600 transition-colors duration-300">Reviews</div>
            <div className="text-sm text-gray-600">Customer feedback</div>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ContactPageContent />
    </Suspense>
  );
} 