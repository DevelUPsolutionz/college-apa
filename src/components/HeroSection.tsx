import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, MapPin, PhoneCall, ShieldCheck } from 'lucide-react';
import type { Zone } from '../types/admissions';
import { TransparentLogoVideo } from './TransparentLogoVideo';

interface HeroSectionProps {
  zones: Zone[];
  totalColleges: number;
  totalCourses: number;
  onExploreZones: () => void;
  onTalkToExpert: () => void;
  onQuickSelectZone: (zoneId: string) => void;
}

export function HeroSection({
  zones,
  totalColleges,
  totalCourses,
  onExploreZones,
  onTalkToExpert,
  onQuickSelectZone,
}: HeroSectionProps) {
  return (
    <section
      id="home"
      className="relative overflow-hidden border-b border-slate-200/80 bg-[#FAF9F6] pt-10 pb-16 sm:pt-14 sm:pb-20 lg:pt-20 lg:pb-24"
    >
      {/* Subtle architectural grid background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            'radial-gradient(#CBD5E1 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Left Editorial Column */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-[#0D9488]/25 bg-[#F0FDFA] px-3.5 py-1.5 text-xs font-semibold tracking-wide text-[#0F766E]">
              <MapPin className="h-3.5 w-3.5" />
              <span>Tamil Nadu Zone-Wise Admission Discovery</span>
            </div>

            <h1 className="font-display mt-5 text-4xl font-extrabold tracking-tight text-[#0B1F3A] sm:text-5xl lg:text-[3.4rem] lg:leading-[1.1]">
              Find the Right College.{' '}
              <span className="text-[#0D9488]">Build the Right Future.</span>
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
              Navigate accredited Engineering, Arts &amp; Science, Medical, and
              Management colleges across Tamil Nadu. Explore institutions by
              geographical zone, compare transparent semester-by-semester fee
              structures, and connect directly with an admission specialist.
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="mt-8 flex flex-col gap-3.5 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={onExploreZones}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0B1F3A] px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#132F54] hover:shadow-md"
              >
                Explore Colleges
                <ArrowRight className="h-4 w-4 text-[#14B8A6]" />
              </button>

              <button
                type="button"
                onClick={onTalkToExpert}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-[#0B1F3A] shadow-xs transition-all hover:border-[#0B1F3A]/40 hover:bg-slate-50"
              >
                <PhoneCall className="h-4 w-4 text-[#0D9488]" />
                Talk to an Admission Expert
              </button>
            </div>

            {/* Trust Metrics */}
            <div className="mt-10 grid grid-cols-3 gap-4 border-t border-slate-200 pt-7 sm:max-w-lg">
              <div>
                <p className="font-display text-2xl font-bold text-[#0B1F3A] tabular-nums sm:text-3xl">
                  {zones.length}
                </p>
                <p className="mt-0.5 text-xs font-medium text-slate-500 sm:text-sm">
                  Discovery Zones
                </p>
              </div>
              <div>
                <p className="font-display text-2xl font-bold text-[#0B1F3A] tabular-nums sm:text-3xl">
                  {totalColleges}+
                </p>
                <p className="mt-0.5 text-xs font-medium text-slate-500 sm:text-sm">
                  Partner Campuses
                </p>
              </div>
              <div>
                <p className="font-display text-2xl font-bold text-[#0B1F3A] tabular-nums sm:text-3xl">
                  {totalCourses}+
                </p>
                <p className="mt-0.5 text-xs font-medium text-slate-500 sm:text-sm">
                  Verified Courses
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Geographical Preview Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="lg:col-span-5"
          >
            <div className="relative rounded-2xl border border-slate-200 bg-white p-5 shadow-lg shadow-slate-900/5 sm:p-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-20 shrink-0 overflow-hidden rounded-lg bg-[#F8FAFC] p-1">
                    <TransparentLogoVideo className="h-full w-full" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold tracking-wider text-[#0D9488] uppercase">
                      Interactive Regional Atlas
                    </p>
                    <h2 className="font-display mt-0.5 text-base font-bold text-[#0B1F3A] sm:text-lg">
                      Tamil Nadu Admission Zones
                    </h2>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-700">
                  <ShieldCheck className="h-3.5 w-3.5 text-[#0D9488]" />
                  2026–27
                </span>
              </div>

              {/* Stylized Tamil Nadu Geographical Silhouette */}
              <div className="relative my-4 flex items-center justify-center rounded-xl bg-[#F8FAFC] p-4">
                <svg
                  viewBox="0 0 420 460"
                  className="h-64 w-full max-w-[300px] sm:h-72"
                  role="img"
                  aria-label="Tamil Nadu Geographical Zones Overview"
                >
                  {/* Tamil Nadu subtle outline silhouette */}
                  <path
                    d="M235 28 L295 36 L328 58 L320 98 L302 142 L292 186 L310 228 L302 276 L264 302 L228 334 L198 372 L162 418 L138 438 L122 416 L108 368 L94 316 L66 266 L54 224 L74 184 L112 146 L146 112 L182 82 L212 46 Z"
                    fill="#E2E8F0"
                    fillOpacity="0.55"
                    stroke="#0B1F3A"
                    strokeOpacity="0.2"
                    strokeWidth="2"
                  />

                  {/* Connecting hub lines */}
                  <g stroke="#0D9488" strokeOpacity="0.28" strokeDasharray="4 4" strokeWidth="1.5">
                    <line x1="298" y1="78" x2="174" y2="162" />
                    <line x1="174" y1="162" x2="112" y2="235" />
                    <line x1="112" y1="235" x2="196" y2="266" />
                    <line x1="196" y1="266" x2="258" y2="260" />
                    <line x1="196" y1="266" x2="152" y2="374" />
                  </g>

                  {zones.map((zone) => (
                    <g
                      key={zone.id}
                      onClick={() => onQuickSelectZone(zone.id)}
                      className="cursor-pointer group"
                    >
                      <circle
                        cx={zone.pinPos.x}
                        cy={zone.pinPos.y}
                        r="14"
                        fill={zone.color}
                        fillOpacity="0.16"
                        className="transition-all group-hover:fill-opacity-30"
                      />
                      <circle
                        cx={zone.pinPos.x}
                        cy={zone.pinPos.y}
                        r="6"
                        fill={zone.color}
                        stroke="#FFFFFF"
                        strokeWidth="2"
                      />
                      <rect
                        x={zone.labelPos.x - 42}
                        y={zone.labelPos.y - 12}
                        width="84"
                        height="22"
                        rx="6"
                        fill="#FFFFFF"
                        stroke="#CBD5E1"
                        strokeWidth="1"
                      />
                      <text
                        x={zone.labelPos.x}
                        y={zone.labelPos.y + 3}
                        textAnchor="middle"
                        className="fill-[#0B1F3A] text-[10px] font-semibold"
                      >
                        {zone.shortName}
                      </text>
                    </g>
                  ))}
                </svg>
              </div>

              {/* Quick Jump Chips */}
              <div className="space-y-2.5">
                <p className="text-xs font-medium text-slate-500">
                  Quick jump to a zone:
                </p>
                <div className="flex flex-wrap gap-2">
                  {zones.map((zone) => (
                    <button
                      key={zone.id}
                      type="button"
                      onClick={() => onQuickSelectZone(zone.id)}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-medium text-[#0B1F3A] transition-colors hover:border-[#0D9488] hover:bg-[#F0FDFA] hover:text-[#0F766E]"
                    >
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: zone.color }}
                      />
                      {zone.shortName}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-2 pt-2 text-xs text-slate-500">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[#0D9488]" />
                  <span>Zero-hidden-cost fee breakdowns per semester &amp; year</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

