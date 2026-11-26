import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, PhoneCall, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  totalColleges: number;
  totalCourses: number;
  onExploreZones: () => void;
  onTalkToExpert: () => void;
}

export function HeroSection({
  totalColleges,
  totalCourses,
  onExploreZones,
  onTalkToExpert,
}: HeroSectionProps) {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-[#0A1626] text-white min-h-[600px] lg:min-h-[680px] flex items-center"
    >
      {/* Background Campus Image with Deep Dark Moody Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/hero-bg.jpg"
          alt="Tamil Nadu University Campus"
          className="h-full w-full object-cover object-center brightness-40 filter contrast-110"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#071322] via-[#071322]/90 to-[#0A1828]/60" />
      </div>

      {/* 1. Left Corner Bottom: Signature Concentric Ripple Rings (As circled in screenshot) */}
      <div
        className="pointer-events-none absolute -bottom-16 -left-16 z-10 w-72 h-72 sm:w-88 sm:h-88 select-none"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 320 320"
          className="w-full h-full text-white/20 overflow-visible"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Multi-layered organic ripple circles */}
          <circle cx="80" cy="240" r="45" stroke="currentColor" strokeWidth="2.5" strokeOpacity="0.4" strokeDasharray="3 3" />
          <circle cx="80" cy="240" r="75" stroke="currentColor" strokeWidth="2.5" strokeOpacity="0.35" />
          <circle cx="80" cy="240" r="105" stroke="currentColor" strokeWidth="2.5" strokeOpacity="0.3" strokeDasharray="6 4" />
          <circle cx="80" cy="240" r="140" stroke="currentColor" strokeWidth="2.5" strokeOpacity="0.25" />
          <circle cx="80" cy="240" r="180" stroke="currentColor" strokeWidth="2" strokeOpacity="0.2" strokeDasharray="8 6" />
          <circle cx="80" cy="240" r="225" stroke="currentColor" strokeWidth="2" strokeOpacity="0.15" />
        </svg>
      </div>

      {/* 2. Dynamic Vibrant Blue Wave connecting the bottom-left to the center image */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 w-full z-15 overflow-hidden leading-none select-none"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1440 180"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-20 sm:h-28 md:h-36"
          preserveAspectRatio="none"
        >
          {/* Blue flowing organic wave border like Edura */}
          <path
            d="M0,160 C240,160 380,80 620,130 C860,180 1020,40 1440,110 L1440,180 L0,180 Z"
            fill="#2563EB"
            fillOpacity="0.85"
          />
          {/* Clean White foreground wave transition */}
          <path
            d="M0,172 C320,172 460,140 720,165 C980,190 1180,120 1440,150 L1440,180 L0,180 Z"
            fill="#FFFFFF"
          />
        </svg>
      </div>

      {/* 3. Subtle Dotted Matrix Grid in bottom-right corner like Edura */}
      <div
        className="pointer-events-none absolute bottom-8 right-6 z-20 hidden md:grid grid-cols-6 gap-2.5 opacity-60"
        aria-hidden="true"
      >
        {Array.from({ length: 24 }).map((_, i) => (
          <span key={i} className="h-1.5 w-1.5 rounded-full bg-[#2563EB]" />
        ))}
      </div>

      <div className="relative z-20 mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24 w-full">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Left Column: Heading, Badges, CTAs */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55 }}
            className="lg:col-span-7"
          >
            {/* Pill Badge matching Edura ("35% OFF" style) */}
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-[#2563EB] px-3.5 py-1 text-xs font-black tracking-wider text-white uppercase shadow-sm">
                2026–27 ADMISSIONS
              </span>
              <span className="text-xs font-bold tracking-widest text-slate-300 uppercase">
                DIRECT COUNSELLING WITH DR. B. RAMESH
              </span>
            </div>

            {/* Giant Headline: "Find the Right College. Build the Right Future." */}
            <h1 className="font-display mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-[3.8rem] lg:leading-[1.12]">
              Find the Right College.{' '}
              <br className="hidden sm:inline" />
              Build the Right{' '}
              <span className="text-[#2563EB] font-black">Future.</span>
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
              Explore 180+ verified Engineering, Deemed Universities, Paramedical,
              Law, and Agriculture colleges across Tamil Nadu. Compare transparent
              fee structures zone-wise, claim government scholarships, and secure your seat.
            </p>

            {/* Primary Blue Button matching Edura "GET STARTED ->" */}
            <div className="mt-8 flex flex-col gap-3.5 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={onExploreZones}
                className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-[#2563EB] px-7 py-4 text-sm font-extrabold text-white shadow-lg shadow-blue-900/40 transition-all hover:bg-[#1D4ED8] hover:shadow-xl hover:translate-y-[-1px]"
              >
                GET STARTED
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={onTalkToExpert}
                className="inline-flex items-center justify-center gap-2.5 rounded-xl border border-white/25 bg-white/10 px-6 py-4 text-sm font-bold text-white backdrop-blur-xs transition-all hover:bg-white/20 hover:border-white/40"
              >
                <PhoneCall className="h-4 w-4 text-[#60A5FA]" />
                Talk to Dr. B. Ramesh
              </button>
            </div>

            {/* Quick trust metrics */}
            <div className="mt-10 flex flex-wrap items-center gap-6 border-t border-white/15 pt-6 text-xs text-slate-300 font-semibold">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#38BDF8]" />
                6 Tamil Nadu Regional Zones
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#38BDF8]" />
                {totalColleges}+ Accredited Colleges
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#38BDF8]" />
                {totalCourses}+ Verified Courses
              </span>
            </div>
          </motion.div>

          {/* Right Column: Edura's Signature Circular Framed Student Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-5 flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Outer white organic backdrop shape like Edura */}
              <div
                className="absolute -inset-4 sm:-inset-6 rounded-full bg-white opacity-95 blur-xs shadow-2xl"
                aria-hidden="true"
              />

              {/* Blue accent ring accentuating the circle */}
              <div
                className="absolute -top-3 -left-3 h-24 w-24 rounded-full border-4 border-[#2563EB] opacity-80"
                aria-hidden="true"
              />
              <div
                className="absolute -bottom-4 -right-4 h-28 w-28 rounded-full bg-[#2563EB]/20 blur-md"
                aria-hidden="true"
              />

              {/* Circular Student Photo Frame with Thick White Border (Exact Edura Hero Design) */}
              <div className="relative h-72 w-72 sm:h-96 sm:w-96 md:h-[420px] md:w-[420px] rounded-full overflow-hidden border-[10px] sm:border-[14px] border-white shadow-2xl z-10 bg-slate-200">
                <img
                  src="/hero-students.jpg"
                  alt="Happy College Students"
                  className="h-full w-full object-cover object-center"
                />

                {/* Floating Stat Badge on bottom-left of circle */}
                <div className="absolute bottom-6 left-6 z-20 rounded-2xl bg-white/95 backdrop-blur-md p-3.5 shadow-xl border border-slate-100 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2563EB] text-white">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="block font-display text-sm font-black text-[#0A1626]">
                      100% Free
                    </span>
                    <span className="block text-[11px] font-bold text-slate-500">
                      Admission Guidance
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
