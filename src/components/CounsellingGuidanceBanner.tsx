import { ArrowRight, CheckCircle2, Phone, Sparkles } from 'lucide-react';
import { agencyConfig } from '../data/agencyConfig';
import { counsellingStreams } from '../data/tamilNaduData';
import { currentAcademicYear } from '../utils/academicYear';

interface CounsellingGuidanceBannerProps {
  onEnquire?: () => void;
}

export function CounsellingGuidanceBanner({ onEnquire }: CounsellingGuidanceBannerProps) {
  return (
    <section className="relative bg-white pt-8 pb-16 sm:pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ========================================================
            1. TOP FLOATING STATS BAR (Matching Image 2 blue header)
            ======================================================== */}
        <div className="relative z-20 -mb-10 sm:-mb-14 mx-auto max-w-5xl overflow-hidden rounded-2xl sm:rounded-3xl bg-[#2563EB] text-white shadow-2xl shadow-blue-900/30">
          <div className="grid grid-cols-2 md:grid-cols-4 py-4 sm:py-6 px-3 sm:px-6 text-center">
            {/* Stat 1 */}
            <div className="p-3 sm:p-4 border-r border-b md:border-b-0 border-white/20">
              <p className="font-display text-xl sm:text-3xl lg:text-4xl font-black text-white">
                6 Zones
              </p>
              <p className="mt-1 text-xs sm:text-sm font-medium text-blue-100">
                All Tamil Nadu Regions
              </p>
            </div>

            {/* Stat 2 */}
            <div className="p-3 sm:p-4 border-b md:border-b-0 md:border-r border-white/20">
              <p className="font-display text-xl sm:text-3xl lg:text-4xl font-black text-white">
                180+
              </p>
              <p className="mt-1 text-xs sm:text-sm font-medium text-blue-100">
                Accredited Colleges
              </p>
            </div>

            {/* Stat 3 */}
            <div className="p-3 sm:p-4 border-r border-white/20">
              <p className="font-display text-xl sm:text-3xl lg:text-4xl font-black text-white">
                1,000+
              </p>
              <p className="mt-1 text-xs sm:text-sm font-medium text-blue-100">
                Verified Degree Courses
              </p>
            </div>

            {/* Stat 4 */}
            <div className="p-3 sm:p-4">
              <p className="font-display text-xl sm:text-3xl lg:text-4xl font-black text-white">
                100% Free
              </p>
              <p className="mt-1 text-xs sm:text-sm font-medium text-blue-100">
                Single-Window Advisory
              </p>
            </div>
          </div>
        </div>

        {/* ========================================================
            2. MAIN DARK HERO-STYLE BANNER (Matching Image 2)
            ======================================================== */}
        <div className="relative overflow-hidden rounded-3xl bg-[#071322] px-6 pt-20 pb-16 sm:px-12 sm:pt-28 sm:pb-20 lg:px-16 text-center shadow-2xl">
          {/* Background Photo Overlay (Matching Edura Students Banner) */}
          <div className="absolute inset-0 z-0">
            <img
              src="/counselling-bg.jpg"
              alt="Students counselling background"
              className="h-full w-full object-cover object-center opacity-35 filter brightness-75 contrast-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#071322] via-[#071322]/75 to-[#071322]/80" />
          </div>

          {/* Graphical Accents from Image 2 */}
          {/* Blue ring on the left */}
          <div
            className="pointer-events-none absolute top-1/2 left-8 -translate-y-1/2 hidden md:block select-none"
            aria-hidden="true"
          >
            <div className="h-14 w-14 rounded-full border-2 border-[#2563EB]/70 animate-pulse" />
          </div>

          {/* Red/Amber polygon on the right */}
          <div
            className="pointer-events-none absolute top-1/3 right-12 hidden md:block select-none"
            aria-hidden="true"
          >
            <div className="h-12 w-12 rotate-45 rounded-lg border-2 border-red-500/60" />
            <div className="mt-6 ml-4 h-3 w-3 rounded-full bg-red-500/70" />
          </div>

          {/* Abstract wave curves in bottom corners */}
          <div
            className="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-blue-600/20 blur-2xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-blue-500/20 blur-2xl"
            aria-hidden="true"
          />

          {/* Content */}
          <div className="relative z-10 mx-auto max-w-3xl">
            {/* Small Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-bold tracking-wider text-blue-300 uppercase">
              <Sparkles className="h-3.5 w-3.5 text-[#38BDF8]" />
              <span>Are You Ready for {currentAcademicYear.shortYear} Counselling?</span>
            </div>

            {/* Main Bold Headline */}
            <h2 className="font-display mt-5 text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl leading-tight">
              End-to-End Tamil Nadu{' '}
              <span className="text-[#38BDF8]">Single-Window Guidance</span>
            </h2>

            {/* Description */}
            <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Accurate cutoff analysis, priority choice lists, and round-wise vacancy counselling overseen directly by Dr. B. Ramesh.
            </p>

            {/* Counselling Streams Chips */}
            <div className="mt-8 flex flex-wrap justify-center gap-2.5">
              {counsellingStreams.map((stream) => (
                <span
                  key={stream}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold text-white backdrop-blur-xs transition-colors hover:border-[#38BDF8] hover:bg-white/15"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                  <span>{stream}</span>
                </span>
              ))}
            </div>

            {/* Action Buttons (Matching Image 2: Join with us / Become a teacher) */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              {onEnquire && (
                <button
                  type="button"
                  onClick={onEnquire}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#2563EB] px-7 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-blue-600/30 transition-all hover:bg-[#1D4ED8] hover:scale-105"
                >
                  <span>JOIN WITH US</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              )}

              <a
                href={`tel:${agencyConfig.phone.replace(/\s+/g, '')}`}
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/5 px-6 py-3.5 text-sm font-extrabold text-white backdrop-blur-xs transition-all hover:bg-white/15 hover:border-white/50"
              >
                <Phone className="h-4 w-4 text-[#38BDF8]" />
                <span>TALK TO COUNSELLOR &rarr;</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
