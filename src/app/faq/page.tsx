"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const faqCategories = [
  {
    id: "general",
    title: "General Questions",
    icon: "❓",
    questions: [
      {
        q: "What makes GoldiPuppy different from other puppy sellers?",
        a: "We work exclusively with verified, ethical breeders who meet our strict health and welfare standards. Every puppy comes with complete health documentation, health records, and ongoing support. Our transparent process and commitment to puppy welfare sets us apart."
      },
      {
        q: "Are your puppies from puppy mills?",
        a: "Absolutely not. We have a zero-tolerance policy for puppy mills. All our partner breeders are personally visited and verified. They must meet strict standards for breeding practices, living conditions, and animal welfare before joining our network."
      },
      {
        q: "Can I visit the breeder before purchasing?",
        a: "Yes, we encourage visits when possible. We can arrange virtual tours or in-person visits with our partner breeders. You'll be able to see the puppy's parents, living conditions, and meet the breeder personally."
      },
      {
        q: "What breeds do you offer?",
        a: "We specialize in popular family-friendly breeds including Golden Retrievers, Labrador Retrievers, French Bulldogs, Pomeranians, Cavalier King Charles Spaniels, and Shih Tzus. Our selection varies based on availability from our network of ethical breeders."
      }
    ]
  },
  {
    id: "purchasing",
    title: "Purchasing & Reservation",
    icon: "💳",
    questions: [
      {
        q: "How do I reserve a puppy?",
        a: "Simply click 'Reserve this puppy' on any available puppy's profile page. You'll be guided through our secure reservation process, which includes a deposit and completion of our puppy questionnaire to ensure a good match."
      },
      {
        q: "What payment methods do you accept?",
        a: "We accept all major credit cards, bank transfers, and PayPal. Payment is typically split into a reservation deposit (30%) and final payment before delivery. We also offer financing options for qualified buyers."
      },
      {
        q: "What's included in the puppy price?",
        a: "Every puppy includes: full veterinary health check, age-appropriate vaccinations, microchip, international health certificate, pedigree papers, starter food package, and blanket with mother's scent."
      },
      {
        q: "Can I return a puppy if it doesn't work out?",
        a: "Yes, we have a 14-day return policy if the puppy isn't a good fit for your family. However, we strongly encourage using our pre-purchase consultation to ensure the right match from the start."
      }
    ]
  },
  {
    id: "health",
    title: "Health & Certificates",
    icon: "🏥",
    questions: [
      {
        q: "What health testing do you do?",
        a: "All breeding dogs undergo comprehensive health testing including hip/elbow scoring, eye clearances, and breed-specific genetic testing. Puppies receive full veterinary health checks, vaccinations, and health certificates before leaving."
      },
      {
        q: "What health documentation do you provide?",
        a: "We provide complete health certificates including vaccination records, veterinary health check results, and any relevant genetic testing information. All documentation is provided by licensed veterinarians."
      },
      {
        q: "Are puppies vaccinated before delivery?",
        a: "Yes, all puppies receive age-appropriate vaccinations before delivery. You'll receive complete vaccination records and guidance on the vaccination schedule to continue with your local veterinarian."
      },
      {
        q: "What if my puppy gets sick after delivery?",
        a: "Contact us immediately. We provide 24/7 emergency support and will work with you and your veterinarian to address any health concerns. We stand behind the health of our puppies."
      }
    ]
  },
  {
    id: "delivery",
    title: "Delivery & Shipping",
    icon: "✈️",
    questions: [
      {
        q: "How is my puppy delivered?",
        a: "We use professional pet transport services with climate-controlled vehicles and trained handlers. Puppies travel in comfortable, airline-approved carriers with food, water, and comfort items. You'll receive updates throughout the journey."
      },
      {
        q: "How long does delivery take?",
        a: "Delivery typically takes 2-4 weeks from reservation, depending on your location and the puppy's readiness. We'll provide a detailed timeline once your reservation is confirmed."
      },
      {
        q: "What regions do you deliver to?",
        a: "We deliver worldwide including USA, Canada, Europe, UK, Australia, and many other countries. Delivery costs vary by location, typically ranging from €150-500 depending on distance and transport method."
      },
      {
        q: "Can I pick up my puppy instead of delivery?",
        a: "Yes, pickup is often possible and can reduce costs. We'll arrange a convenient location, usually at the breeder's facility or a nearby meeting point. Some customers prefer this to meet the breeder personally."
      }
    ]
  },
  {
    id: "support",
    title: "Support & After-Sales",
    icon: "🤝",
    questions: [
      {
        q: "Do you provide support after I get my puppy?",
        a: "Absolutely! We provide ongoing support including training advice, health consultations, behavioral guidance, and access to our network of professional trainers and veterinarians."
      },
      {
        q: "What if I have questions about training?",
        a: "We offer comprehensive training resources including guides, video tutorials, and access to professional dog trainers. Many of our customers also join our online community for peer support and advice."
      },
      {
        q: "Can you help me find a local veterinarian?",
        a: "Yes, we maintain a network of recommended veterinarians worldwide who are familiar with our puppies and breeding practices. We can provide referrals in your area."
      },
      {
        q: "What if I need to rehome my dog later?",
        a: "We're committed to our puppies for life. If you ever need to rehome your dog, contact us first. We'll help find a suitable new home within our network and ensure the dog's wellbeing."
      }
    ]
  }
];

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState("general");
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [visibleCategories, setVisibleCategories] = useState<string[]>([]);
  const [visibleQuestions, setVisibleQuestions] = useState<string[]>([]);
  const [visibleResources, setVisibleResources] = useState<number[]>([]);

  // Trigger animations on component mount
  useEffect(() => {
    setIsLoaded(true);
    // Set page-specific background
    document.documentElement.style.background = 'linear-gradient(to bottom right, #fff7ed, #fef3c7, #fef3c7)';
    document.body.style.background = 'linear-gradient(to bottom right, #fff7ed, #fef3c7, #fef3c7)';
    
    return () => {
      // Reset background on cleanup
      document.documentElement.style.background = '';
      document.body.style.background = '';
    };
  }, []);

  // Handle category animations
  useEffect(() => {
    const timer = setTimeout(() => {
      faqCategories.forEach((category, index) => {
        setTimeout(() => {
          setVisibleCategories(prev => [...prev, category.id]);
        }, index * 100);
      });
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  // Handle question animations when category changes
  useEffect(() => {
    setVisibleQuestions([]);
    const activeQuestions = faqCategories.find(cat => cat.id === activeCategory)?.questions || [];
    
    const timer = setTimeout(() => {
      activeQuestions.forEach((_, index) => {
        setTimeout(() => {
          setVisibleQuestions(prev => [...prev, `${activeCategory}-${index}`]);
        }, index * 150);
      });
    }, 300);

    return () => clearTimeout(timer);
  }, [activeCategory]);

  // Handle resource animations
  useEffect(() => {
    const timer = setTimeout(() => {
      [0, 1, 2, 3].forEach((index) => {
        setTimeout(() => {
          setVisibleResources(prev => [...prev, index]);
        }, index * 100);
      });
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  const toggleQuestion = (categoryId: string, questionIndex: number) => {
    const questionId = `${categoryId}-${questionIndex}`;
    setOpenQuestion(openQuestion === questionId ? null : questionId);
  };

  return (
    <div className="min-h-screen font-sans overflow-x-hidden">
      {/* Animated floating elements */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-24 left-12 w-5 h-5 bg-[var(--accent)]/20 rounded-full animate-bounce" style={{animationDelay: '0s', animationDuration: '3s'}}></div>
        <div className="absolute top-48 right-24 w-6 h-6 bg-blue-400/20 rounded-full animate-bounce" style={{animationDelay: '1s', animationDuration: '4s'}}></div>
        <div className="absolute top-72 left-1/3 w-4 h-4 bg-green-400/20 rounded-full animate-bounce" style={{animationDelay: '2s', animationDuration: '5s'}}></div>
        <div className="absolute bottom-48 right-12 w-7 h-7 bg-purple-400/20 rounded-full animate-bounce" style={{animationDelay: '0.5s', animationDuration: '3.5s'}}></div>
        <div className="absolute bottom-24 left-24 w-5 h-5 bg-orange-400/20 rounded-full animate-bounce" style={{animationDelay: '1.5s', animationDuration: '4.5s'}}></div>
      </div>

      {/* Hero Section - Egyedi design az FAQ oldalhoz */}
      <section className={`relative bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-50 min-h-screen flex items-center justify-center py-20 overflow-hidden transition-all duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        {/* Floating Question Marks Background */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          {[...Array(20)].map((_, i) => (
            <div
              key={`floating-icon-${i}`}
              className="absolute text-6xl text-gray-600 animate-float"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`
              }}
            >
              {['❓', '💡', '🤔', '💭', '✨', '📚'][Math.floor(Math.random() * 6)]}
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="relative z-20 max-w-6xl mx-auto px-4 text-center">
          {/* Main Title */}
          <div className={`mb-16 transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="flex justify-center items-center gap-6 mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-orange-400 to-amber-500 rounded-full flex items-center justify-center text-4xl animate-bounce">
                ❓
              </div>
              <div className="text-7xl sm:text-8xl lg:text-9xl font-black text-gray-800">
                <span className="block bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 bg-clip-text text-transparent">
                  FAQ
                </span>
              </div>
              <div className="w-20 h-20 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full flex items-center justify-center text-4xl animate-pulse">
                💡
              </div>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-700 mb-8">
              Frequently Asked Questions
            </h2>
            <p className="text-2xl sm:text-3xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Get instant answers to your puppy questions
            </p>
          </div>

          {/* Interactive Search Bar */}
          <div className={`mb-16 transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-4xl mx-auto border-4 border-amber-200 hover:border-amber-300 transition-all duration-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="text-3xl animate-bounce">🔍</div>
                <h3 className="text-2xl font-bold text-gray-800">Search FAQs</h3>
              </div>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Type your question here... (e.g., 'health certificates', 'delivery time', 'payment')"
                  className="w-full text-xl px-6 py-6 rounded-2xl border-2 border-gray-200 focus:border-amber-400 focus:outline-none focus:ring-4 focus:ring-amber-200 transition-all duration-300 hover:shadow-lg"
                />
                <button className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-3 rounded-xl font-bold hover:scale-105 hover:shadow-lg transition-all duration-300 flex items-center gap-2">
                  <span className="animate-pulse">🚀</span>
                  Search
                </button>
              </div>
              <div className="mt-6 flex flex-wrap gap-3 justify-center">
                <span className="text-gray-600 font-medium">Popular searches:</span>
                {['Health certificates', 'Delivery', 'Payment', 'Breeding', 'Support'].map((tag, index) => (
                  <button 
                    key={tag}
                    className="bg-amber-100 hover:bg-amber-200 text-amber-800 px-4 py-2 rounded-full text-sm font-medium hover:scale-105 transition-all duration-300 hover:shadow-md"
                    style={{
                      animationDelay: `${index * 100}ms`
                    }}
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* FAQ Categories Preview */}
          <div className={`grid grid-cols-2 md:grid-cols-5 gap-6 mb-16 transition-all duration-1000 delay-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {faqCategories.map((category, index) => (
              <div 
                key={category.id}
                className="bg-white/80 backdrop-blur-lg rounded-3xl p-6 shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-500 group border-2 border-transparent hover:border-amber-300 cursor-pointer"
                onClick={() => setActiveCategory(category.id)}
                style={{
                  transitionDelay: `${index * 150}ms`
                }}
              >
                <div className="text-5xl mb-4 group-hover:animate-bounce transition-all duration-300">
                  {category.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-amber-600 transition-colors duration-300">
                  {category.title}
                </h3>
                <div className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
                  {category.questions.length} questions
                </div>
                <div className="mt-4 w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full transition-all duration-1000 group-hover:animate-pulse"
                    style={{
                      width: `${(category.questions.length / 4) * 100}%`,
                      transitionDelay: `${index * 150}ms`
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Stats */}
          <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 transition-all duration-1000 delay-900 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="bg-gradient-to-br from-orange-500/20 to-amber-500/20 backdrop-blur-lg rounded-3xl p-6 border border-orange-400/30 hover:scale-105 transition-all duration-300 group">
              <div className="text-4xl font-black text-orange-600 mb-2 group-hover:animate-pulse">
                {faqCategories.reduce((acc, cat) => acc + cat.questions.length, 0)}
              </div>
              <div className="text-sm font-bold text-gray-700">Total Questions</div>
              <div className="text-2xl mt-2 group-hover:animate-bounce">📚</div>
            </div>
            
            <div className="bg-gradient-to-br from-amber-500/20 to-yellow-500/20 backdrop-blur-lg rounded-3xl p-6 border border-amber-400/30 hover:scale-105 transition-all duration-300 group">
              <div className="text-4xl font-black text-amber-600 mb-2 group-hover:animate-pulse">
                {faqCategories.length}
              </div>
              <div className="text-sm font-bold text-gray-700">Categories</div>
              <div className="text-2xl mt-2 group-hover:animate-bounce">🏷️</div>
            </div>
            
            <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur-lg rounded-3xl p-6 border border-yellow-400/30 hover:scale-105 transition-all duration-300 group">
              <div className="text-4xl font-black text-yellow-600 mb-2 group-hover:animate-pulse">
                24/7
              </div>
              <div className="text-sm font-bold text-gray-700">Support Available</div>
              <div className="text-2xl mt-2 group-hover:animate-bounce">💬</div>
            </div>
            
            <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 backdrop-blur-lg rounded-3xl p-6 border border-orange-400/30 hover:scale-105 transition-all duration-300 group">
              <div className="text-4xl font-black text-orange-600 mb-2 group-hover:animate-pulse">
                &lt;1min
              </div>
              <div className="text-sm font-bold text-gray-700">Average Response</div>
              <div className="text-2xl mt-2 group-hover:animate-bounce">⚡</div>
            </div>
          </div>

          {/* CTA Section */}
          <div className={`transition-all duration-1000 delay-1100 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 rounded-3xl p-1 inline-block mb-8">
              <div className="bg-white rounded-3xl px-12 py-8">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-red-600 bg-clip-text text-transparent mb-4">
                  Can't Find Your Answer? 🤔
                </h2>
                <p className="text-gray-600 mb-6 text-lg">
                  Our expert team is ready to help with any questions about your puppy journey
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <button className="bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold text-xl px-10 py-4 rounded-full shadow-2xl hover:scale-110 hover:shadow-3xl transition-all duration-300 flex items-center gap-3 group">
                    <span className="group-hover:animate-bounce">💬</span>
                    Ask Our Experts
                  </button>
                  <button className="bg-white border-2 border-gray-300 text-gray-700 font-bold text-xl px-10 py-4 rounded-full shadow-xl hover:scale-110 hover:shadow-2xl hover:border-amber-400 transition-all duration-300 flex items-center gap-3 group">
                    <span className="group-hover:animate-bounce">📞</span>
                    Call Support
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className={`absolute bottom-10 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-1200 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
            <div className="flex flex-col items-center text-gray-500 animate-bounce">
              <span className="text-sm font-medium mb-2">Browse questions below</span>
              <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
                <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-20 left-20 text-4xl text-amber-200 animate-float opacity-50" style={{animationDelay: '0s'}}>📖</div>
          <div className="absolute top-40 right-32 text-5xl text-orange-200 animate-float opacity-40" style={{animationDelay: '2s'}}>🎓</div>
          <div className="absolute bottom-40 left-32 text-3xl text-yellow-200 animate-float opacity-30" style={{animationDelay: '4s'}}>💡</div>
          <div className="absolute bottom-20 right-20 text-4xl text-amber-200 animate-float opacity-50" style={{animationDelay: '1s'}}>🤝</div>
          <div className="absolute top-1/2 left-10 text-2xl text-orange-200 animate-float opacity-40" style={{animationDelay: '3s'}}>⭐</div>
          <div className="absolute top-1/3 right-10 text-6xl text-yellow-200 animate-float opacity-30" style={{animationDelay: '5s'}}>❓</div>
        </div>
      </section>

      {/* Category Navigation */}
      <section className={`max-w-6xl mx-auto px-4 mb-12 transition-all duration-1000 delay-800 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
        <div className="bg-white/95 backdrop-blur-lg shadow-2xl rounded-3xl p-8 border-2 border-[var(--accent)]/20 hover:shadow-3xl hover:border-[var(--accent)]/40 transition-all duration-300">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {faqCategories.map((category, index) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex flex-col items-center p-6 rounded-2xl transition-all duration-500 hover:scale-110 ${
                  activeCategory === category.id
                    ? "bg-gradient-to-r from-[var(--accent)] to-yellow-600 text-white shadow-xl scale-105 animate-pulse"
                    : "bg-gray-50 text-gray-700 hover:bg-gray-100 hover:scale-102"
                } ${visibleCategories.includes(category.id) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{
                  transitionDelay: `${800 + index * 100}ms`
                }}
              >
                <div className="text-3xl mb-3 hover:animate-bounce transition-all duration-300">{category.icon}</div>
                <div className="font-bold text-center text-sm">{category.title}</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="max-w-4xl mx-auto px-4 pb-20">
        {faqCategories
          .filter(category => category.id === activeCategory)
          .map((category) => (
            <div key={category.id}>
              <div className={`text-center mb-12 transition-all duration-1000 delay-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                <div className="text-6xl mb-4 animate-bounce">{category.icon}</div>
                <h2 className="text-3xl font-extrabold text-[var(--foreground)] mb-4 hover:animate-pulse transition-all duration-300 cursor-default">
                  {category.title}
                </h2>
                <p className="text-xl text-gray-700">
                  {category.questions.length} frequently asked questions
                </p>
              </div>

              <div className="space-y-4">
                {category.questions.map((faq, index) => {
                  const questionId = `${category.id}-${index}`;
                  const isOpen = openQuestion === questionId;
                  
                  return (
                    <div 
                      key={index} 
                      className={`bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500 ${
                        visibleQuestions.includes(questionId) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                      }`}
                      style={{
                        transitionDelay: `${300 + index * 150}ms`
                      }}
                    >
                      <button
                        onClick={() => toggleQuestion(category.id, index)}
                        className="w-full px-8 py-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors hover:scale-105 duration-300 group"
                      >
                        <span className="font-bold text-[var(--foreground)] text-lg pr-4 group-hover:text-[var(--accent)] transition-colors duration-300">
                          {faq.q}
                        </span>
                        <span className={`text-[var(--accent)] text-3xl font-bold transition-transform duration-300 flex-shrink-0 group-hover:animate-pulse ${
                          isOpen ? 'rotate-45' : ''
                        }`}>
                          +
                        </span>
                      </button>
                      
                      {isOpen && (
                        <div className="px-8 pb-6 border-t border-gray-100 bg-gray-50 animate-fadeIn">
                          <div className="pt-6">
                            <p className="text-gray-700 leading-relaxed text-lg">
                              {faq.a}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
      </section>

      {/* Quick Contact Section */}
      <section className={`bg-gradient-to-r from-amber-50 to-white py-16 max-w-6xl mx-auto px-4 rounded-3xl mb-16 transition-all duration-1000 delay-1200 hover:shadow-xl hover:scale-105 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
        <div className="text-center">
          <div className="text-6xl mb-6 animate-bounce">💬</div>
          <h2 className="text-3xl font-extrabold text-[var(--foreground)] mb-4 hover:animate-pulse transition-all duration-300 cursor-default">
            Still have questions? 🤔
          </h2>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Our puppy specialists are here to help. Get personalized answers to your specific questions. ✨
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact" className="bg-gradient-to-r from-[var(--accent)] to-yellow-600 text-white font-bold rounded-full px-8 py-4 shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300 animate-pulse">
              Contact Us 📞
            </Link>
            <a href="tel:+1234567890" className="bg-white text-[var(--accent)] font-bold rounded-full px-8 py-4 shadow-xl border-2 border-[var(--accent)] hover:scale-105 hover:shadow-2xl hover:bg-[var(--accent)] hover:text-white transition-all duration-300">
              Call Now 📱
            </a>
            <a href="mailto:info@goldipuppy.com" className="bg-white text-[var(--accent)] font-bold rounded-full px-8 py-4 shadow-xl border-2 border-[var(--accent)] hover:scale-105 hover:shadow-2xl hover:bg-[var(--accent)] hover:text-white transition-all duration-300">
              Email Us 📧
            </a>
          </div>
        </div>
      </section>

      {/* Popular Resources */}
      <section className={`max-w-6xl mx-auto px-4 pb-20 transition-all duration-1000 delay-1400 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-[var(--foreground)] mb-4 hover:animate-pulse transition-all duration-300 cursor-default">
            📚 Popular Resources 📖
          </h2>
          <p className="text-xl text-gray-700">
            Quick links to our most helpful pages
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link href="/ordering" className={`bg-white rounded-3xl shadow-xl border border-gray-100 p-6 text-center hover:scale-105 hover:shadow-2xl transition-all duration-500 group ${
            visibleResources.includes(0) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`} style={{transitionDelay: '1800ms'}}>
            <div className="text-4xl mb-4 group-hover:scale-110 group-hover:animate-bounce transition-transform duration-300">📋</div>
            <h3 className="font-bold text-[var(--foreground)] mb-2 group-hover:text-[var(--accent)] transition-colors duration-300">How It Works</h3>
            <p className="text-gray-600 text-sm group-hover:text-gray-800 transition-colors duration-300">Step-by-step puppy buying process</p>
          </Link>
          
          <Link href="/delivery" className={`bg-white rounded-3xl shadow-xl border border-gray-100 p-6 text-center hover:scale-105 hover:shadow-2xl transition-all duration-500 group ${
            visibleResources.includes(1) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`} style={{transitionDelay: '1900ms'}}>
            <div className="text-4xl mb-4 group-hover:scale-110 group-hover:animate-bounce transition-transform duration-300">🚚</div>
            <h3 className="font-bold text-[var(--foreground)] mb-2 group-hover:text-[var(--accent)] transition-colors duration-300">Delivery Info</h3>
            <p className="text-gray-600 text-sm group-hover:text-gray-800 transition-colors duration-300">Shipping and delivery process</p>
          </Link>
          
          <Link href="/breeds" className={`bg-white rounded-3xl shadow-xl border border-gray-100 p-6 text-center hover:scale-105 hover:shadow-2xl transition-all duration-500 group ${
            visibleResources.includes(2) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`} style={{transitionDelay: '2000ms'}}>
            <div className="text-4xl mb-4 group-hover:scale-110 group-hover:animate-bounce transition-transform duration-300">🐕</div>
            <h3 className="font-bold text-[var(--foreground)] mb-2 group-hover:text-[var(--accent)] transition-colors duration-300">Dog Breeds</h3>
            <p className="text-gray-600 text-sm group-hover:text-gray-800 transition-colors duration-300">Browse our available breeds</p>
          </Link>
          
          <Link href="/reviews" className={`bg-white rounded-3xl shadow-xl border border-gray-100 p-6 text-center hover:scale-105 hover:shadow-2xl transition-all duration-500 group ${
            visibleResources.includes(3) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`} style={{transitionDelay: '2100ms'}}>
            <div className="text-4xl mb-4 group-hover:scale-110 group-hover:animate-bounce transition-transform duration-300">⭐</div>
            <h3 className="font-bold text-[var(--foreground)] mb-2 group-hover:text-[var(--accent)] transition-colors duration-300">Customer Reviews</h3>
            <p className="text-gray-600 text-sm group-hover:text-gray-800 transition-colors duration-300">What our customers say</p>
          </Link>
        </div>
      </section>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
} 