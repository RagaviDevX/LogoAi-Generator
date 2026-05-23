import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import PricingSection from "@/components/landing/PricingSection";
import FAQSection from "@/components/landing/FAQSection";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";

export default function HomePage() {
  return (
    <main className="relative">
      <Navbar />
      <HeroSection />

      {/* Trusted by section */}
      <section className="py-16 px-4 border-y border-white/[0.04]">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-white/25 text-xs uppercase tracking-widest mb-8">
            Trusted by teams at
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 opacity-30">
            {["Stripe", "Linear", "Vercel", "Notion", "Figma", "Loom"].map((company) => (
              <span key={company} className="font-display font-bold text-lg text-white">
                {company}
              </span>
            ))}
          </div>
        </div>
      </section>

      <FeaturesSection />
      <TestimonialsSection />
      <PricingSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </main>
  );
}
