import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Header from "@/components/Header";
import "@/lib/suppressHydrationWarning";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.goldipuppy.com"),
  title: {
    default: "Buy a Puppy Online Safely | Ethically Bred Puppies | GoldiPuppy",
    template: "%s | GoldiPuppy",
  },
  description:
    "Find your perfect puppy from trusted, ethical breeders. Safe process, worldwide delivery, expert support — GoldiPuppy.",
  alternates: {
    canonical: "/",
  },
  keywords: [
    "buy a puppy",
    "puppies for sale",
    "ethical dog breeders",
    "safe puppy delivery",
    "GoldiPuppy",
  ],
  openGraph: {
    title: "Buy a Puppy Online Safely | Ethically Bred Puppies | GoldiPuppy",
    description:
      "Find your perfect puppy from trusted, ethical breeders. Safe process, worldwide delivery, expert support — GoldiPuppy.",
    url: "https://www.goldipuppy.com/",
    siteName: "GoldiPuppy",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Buy a Puppy Online Safely | Ethically Bred Puppies | GoldiPuppy",
    description:
      "Find your perfect puppy from trusted, ethical breeders. Safe process, worldwide delivery, expert support — GoldiPuppy.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[var(--background)] text-[var(--text)] min-h-screen flex flex-col`}
        suppressHydrationWarning
      >
        <Header />
        <main className="flex-1 w-full">{children}</main>
        <footer className="w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white mt-12 sm:mt-24 relative z-40">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-16">
            {/* Main Footer Content */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-8 sm:mb-12">
              {/* Company Info */}
              <div className="space-y-4 sm:space-y-6 col-span-1 sm:col-span-2 lg:col-span-1">
                <div>
                  <Link href="/" className="text-2xl sm:text-3xl font-bold text-[var(--accent)] tracking-tight hover:text-yellow-400 transition">
                    GoldiPuppy
                  </Link>
                  <p className="text-gray-300 mt-3 sm:mt-4 leading-relaxed text-sm sm:text-base">
                    Your trusted partner in finding the perfect puppy. We connect loving families with healthy, happy puppies from ethical breeders worldwide.
                  </p>
                </div>
                <div className="flex space-x-4">
                  <a href="#" className="w-10 h-10 bg-[var(--accent)] rounded-full flex items-center justify-center hover:bg-yellow-400 transition-colors" title="Facebook">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 bg-[var(--accent)] rounded-full flex items-center justify-center hover:bg-yellow-400 transition-colors" title="Instagram">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.596-3.205-1.533l1.745-1.745c.414.414.988.671 1.625.671.637 0 1.211-.257 1.625-.671.414-.414.671-.988.671-1.625s-.257-1.211-.671-1.625c-.414-.414-.988-.671-1.625-.671-.637 0-1.211.257-1.625.671L4.244 9.715c.757-.937 1.908-1.533 3.205-1.533 2.297 0 4.158 1.861 4.158 4.158s-1.861 4.158-4.158 4.158zm7.109 0c-2.297 0-4.158-1.861-4.158-4.158s1.861-4.158 4.158-4.158c1.297 0 2.448.596 3.205 1.533l-1.745 1.745c-.414-.414-.988-.671-1.625-.671-.637 0-1.211.257-1.625.671-.414.414-.671.988-.671 1.625s.257 1.211.671 1.625c.414.414.988.671 1.625.671.637 0 1.211-.257 1.625-.671l1.745 1.745c-.757.937-1.908 1.533-3.205 1.533z"/>
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 bg-[var(--accent)] rounded-full flex items-center justify-center hover:bg-yellow-400 transition-colors" title="Twitter">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 bg-[var(--accent)] rounded-full flex items-center justify-center hover:bg-yellow-400 transition-colors" title="TikTok">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                    </svg>
                  </a>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6">Quick Links</h3>
                <ul className="space-y-2 sm:space-y-3">
                  <li><Link href="/puppies" className="text-gray-300 hover:text-[var(--accent)] transition text-sm sm:text-base">Puppies for Sale</Link></li>
                  <li><Link href="/breeds" className="text-gray-300 hover:text-[var(--accent)] transition text-sm sm:text-base">Dog Breeds</Link></li>
                  <li><Link href="/reviews" className="text-gray-300 hover:text-[var(--accent)] transition text-sm sm:text-base">Customer Reviews</Link></li>
                  <li><Link href="/ordering" className="text-gray-300 hover:text-[var(--accent)] transition text-sm sm:text-base">How It Works</Link></li>
                  <li><Link href="/faq" className="text-gray-300 hover:text-[var(--accent)] transition text-sm sm:text-base">FAQ</Link></li>
                </ul>
              </div>

              {/* Services */}
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6">Services</h3>
                <ul className="space-y-2 sm:space-y-3">
                  <li><Link href="/ordering" className="text-gray-300 hover:text-[var(--accent)] transition text-sm sm:text-base">Easy Ordering</Link></li>
                  <li><Link href="/delivery" className="text-gray-300 hover:text-[var(--accent)] transition text-sm sm:text-base">Worldwide Delivery</Link></li>
                  <li><Link href="/contact" className="text-gray-300 hover:text-[var(--accent)] transition text-sm sm:text-base">Expert Support</Link></li>
                  <li><a href="#" className="text-gray-300 hover:text-[var(--accent)] transition text-sm sm:text-base">Health Certificates</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-[var(--accent)] transition text-sm sm:text-base">Puppy Training</a></li>
                </ul>
              </div>

              {/* Contact Info */}
              <div className="col-span-1 sm:col-span-2 lg:col-span-1">
                <h3 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6">Contact Us</h3>
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-start space-x-3">
                    <span className="text-[var(--accent)] text-base sm:text-lg">📍</span>
                    <div className="text-gray-300 text-sm sm:text-base">
                      <p>Hungary</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-[var(--accent)] text-base sm:text-lg">📞</span>
                    <a href="tel:+36305433199" className="text-gray-300 hover:text-[var(--accent)] transition text-sm sm:text-base">
                      +36 30 543 3199
                    </a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-[var(--accent)] text-base sm:text-lg">✉️</span>
                    <a href="mailto:goldipuppy01@gmail.com" className="text-gray-300 hover:text-[var(--accent)] transition text-sm sm:text-base break-all">
                      goldipuppy01@gmail.com
                    </a>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-[var(--accent)] text-base sm:text-lg">🕒</span>
                    <div className="text-gray-300 text-sm sm:text-base">
                      <p>Mon-Fri: 9AM-6PM</p>
                      <p>Weekend: 10AM-4PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="border-t border-gray-700 pt-8 sm:pt-12 mb-8 sm:mb-12">
              <div className="max-w-2xl mx-auto text-center">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Stay Updated</h3>
                <p className="text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base">Get the latest puppy updates, care tips, and special offers delivered to your inbox.</p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 text-sm sm:text-base rounded-full border-2 border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-[var(--accent)] transition-all"
                  />
                  <button className="bg-gradient-to-r from-[var(--accent)] to-yellow-600 text-white font-bold rounded-full px-6 sm:px-8 py-3 hover:scale-105 hover:shadow-lg transition-all duration-300 whitespace-nowrap text-sm sm:text-base">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-700 pt-6 sm:pt-8">
              <div className="flex flex-col lg:flex-row justify-between items-center gap-4 sm:gap-6">
                <div className="flex flex-wrap justify-center lg:justify-start gap-4 sm:gap-6 text-xs sm:text-sm">
                  <Link href="/privacy" className="text-gray-300 hover:text-[var(--accent)] transition">Privacy Policy</Link>
                  <Link href="/terms" className="text-gray-300 hover:text-[var(--accent)] transition">Terms of Service</Link>
                  <a href="#" className="text-gray-300 hover:text-[var(--accent)] transition">Cookie Policy</a>
                  <a href="#" className="text-gray-300 hover:text-[var(--accent)] transition">Sitemap</a>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-green-400">🔒</span>
                    <span className="text-gray-300 text-xs sm:text-sm">Secure & Trusted</span>
                  </div>
                  <div className="text-gray-300 text-xs sm:text-sm text-center">
                    © 2025 GoldiPuppy. All rights reserved.
                  </div>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-700">
              <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8 opacity-60">
                <div className="flex items-center gap-2 text-gray-400 text-xs sm:text-sm">
                  <span>🛡️</span>
                  <span>SSL Secured</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400 text-xs sm:text-sm">
                  <span>✅</span>
                  <span>Verified Breeders</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400 text-xs sm:text-sm">
                  <span>🏆</span>
                  <span>5-Star Service</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400 text-xs sm:text-sm">
                  <span>🌍</span>
                  <span>Worldwide Shipping</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400 text-xs sm:text-sm">
                  <span>💳</span>
                  <span>Secure Payments</span>
                </div>
              </div>
            </div>
          </div>
        </footer>
        <SpeedInsights />
      </body>
    </html>
  );
}
