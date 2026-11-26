import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Award,
  BookOpen,
  Briefcase,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Landmark,
  ShieldAlert,
  Sparkles,
} from 'lucide-react';
import { scholarshipsData } from '../data/tamilNaduData';
import { currentAcademicYear } from '../utils/academicYear';

interface ScholarshipsSectionProps {
  onEnquire?: () => void;
}

// Map each scholarship to a dedicated iconic symbol
const scholarshipIcons = [
  GraduationCap, // PMSS
  Award,         // 7.5 Scheme
  Briefcase,     // Labour Welfare
  Sparkles,      // Achievers Scholarship
  Landmark,      // Government Scholarships
  BookOpen,      // First Graduate
];

export function ScholarshipsSection({ onEnquire }: ScholarshipsSectionProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const cardsPerPage = 3;
  const totalPages = Math.ceil(scholarshipsData.length / cardsPerPage);

  // Auto move every 5 seconds
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % totalPages);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused, totalPages]);

  const visibleCards = scholarshipsData.slice(
    currentPage * cardsPerPage,
    (currentPage + 1) * cardsPerPage
  );

  return (
    <section
      id="scholarships"
      className="border-b border-slate-200 bg-[#F8FAFC] py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end border-b border-slate-200 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1 text-xs font-bold tracking-wider text-[#1D4ED8] uppercase">
              <Award className="h-3.5 w-3.5 text-[#1D4ED8]" />
              <span>Financial Aid &amp; Quotas</span>
            </div>
            <h2 className="font-display mt-3 text-3xl font-extrabold tracking-tight text-[#0F2239] sm:text-4xl lg:text-5xl">
              Government &amp; Merit Scholarships We Assist With
            </h2>
            <p className="mt-2.5 max-w-2xl text-base text-slate-600 sm:text-lg">
              Official scholarship processing and quota eligibility checks from your admissions file to reduce your college fee burden.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 text-xs font-bold text-slate-500 mr-2">
              <ShieldAlert className="h-4 w-4 text-emerald-600" />
              <span>100% Free Verification Support</span>
            </div>

            {/* Prev / Next Arrows */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages)}
                aria-label="Previous scholarships set"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-xs hover:border-[#1D4ED8] hover:text-[#1D4ED8] transition-colors"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => setCurrentPage((prev) => (prev + 1) % totalPages)}
                aria-label="Next scholarships set"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-xs hover:border-[#1D4ED8] hover:text-[#1D4ED8] transition-colors"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* 3 Cards Slider Container */}
        <div
          className="mt-10 overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -25 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {visibleCards.map((sch, idx) => {
                const globalIndex = currentPage * cardsPerPage + idx;
                const IconComponent = scholarshipIcons[globalIndex % scholarshipIcons.length];

                return (
                  <div
                    key={sch.id}
                    className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-all hover:border-[#1D4ED8] hover:shadow-xl"
                  >
                    {/* Top-Left Logo-Blue Geometric Corner Cutout (Matching Image 2 Style) */}
                    <div className="absolute top-0 left-0 h-16 w-16 sm:h-20 sm:w-20 bg-[#1D4ED8] rounded-tl-[1.5rem] rounded-br-[2.5rem] flex items-center justify-center text-white shadow-md shadow-blue-900/20 group-hover:bg-[#1e40af] transition-colors">
                      <IconComponent className="h-7 w-7 text-white" />
                    </div>

                    <div>
                      {/* Top Header beside the blue corner */}
                      <div className="pl-16 sm:pl-20 min-h-[56px] flex flex-col justify-center">
                        <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider">
                          Eligible for {currentAcademicYear.shortYear} Intake
                        </span>
                        <h3 className="font-display mt-0.5 text-base sm:text-lg font-black text-[#0F2239] uppercase tracking-wide">
                          {sch.title}
                        </h3>
                      </div>

                      {/* Content Bullet Points (No image inside cards as requested) */}
                      <div className="mt-6 space-y-2.5 text-xs sm:text-sm leading-relaxed text-slate-600 border-t border-slate-100 pt-5">
                        {sch.points.slice(0, 3).map((pt, i) => (
                          <p key={i} className="flex items-start gap-2.5">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#1D4ED8]" />
                            <span className="text-slate-700">{pt}</span>
                          </p>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Action Strip */}
                    <div className="mt-7 flex items-center justify-between border-t border-slate-100 pt-4">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                        <span>Free Eligibility Verification</span>
                      </div>
                      {onEnquire && (
                        <button
                          type="button"
                          onClick={onEnquire}
                          className="inline-flex items-center gap-1 text-xs font-black text-[#1D4ED8] group-hover:translate-x-0.5 transition-transform hover:underline"
                        >
                          Check &rarr;
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots Navigation (Click to switch + Auto indicator) */}
        <div className="mt-8 flex items-center justify-center gap-2.5">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentPage(idx)}
              aria-label={`Go to scholarship set ${idx + 1}`}
              className={`transition-all duration-300 ${
                currentPage === idx
                  ? 'h-3 w-8 rounded-full bg-[#1D4ED8] shadow-sm'
                  : 'h-3 w-3 rounded-full bg-slate-300 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
