import {
  Award,
  CheckCircle2,
  Phone,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  UserCheck,
  Building2,
  FileCheck,
} from 'lucide-react';
import { agencyConfig } from '../data/agencyConfig';

interface AboutAgencySectionProps {
  onExploreZones?: () => void;
  onEnquire?: () => void;
}

export function AboutAgencySection({
  onExploreZones,
  onEnquire,
}: AboutAgencySectionProps) {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24 border-b border-slate-200"
    >
      {/* Subtle decorative background circle */}
      <div className="pointer-events-none absolute -top-24 right-0 h-96 w-96 rounded-full bg-blue-50/60 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 left-0 h-96 w-96 rounded-full bg-slate-100/60 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Column: Authentic Guidance Visual Composition (Edura Style Frame) */}
          <div className="relative lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Photo Frame */}
              <div className="relative overflow-hidden rounded-3xl border-4 border-white bg-slate-100 shadow-2xl shadow-slate-900/10 ring-1 ring-slate-200">
                <img
                  src="/gallery/event-4.jpg"
                  alt="Dr. B. Ramesh conducting student admission counselling"
                  className="h-[420px] w-full object-cover object-center sm:h-[480px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071322]/80 via-transparent to-black/10" />

                {/* Top Badge */}
                <div className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full bg-white/95 px-3.5 py-1.5 text-xs font-bold text-[#0F2239] shadow-md backdrop-blur-xs">
                  <ShieldCheck className="h-4 w-4 text-[#2563EB]" />
                  <span>100% Genuine Guidance</span>
                </div>

                {/* Bottom Overlay Card inside Image */}
                <div className="absolute right-4 bottom-4 left-4 rounded-2xl bg-[#071322]/90 p-4 text-white backdrop-blur-md border border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#2563EB] text-white">
                      <UserCheck className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-display text-sm font-bold text-white">
                        {agencyConfig.chiefAdvisor}
                      </h4>
                      <p className="text-xs text-slate-300">
                        Founder &amp; Chief Counsellor • College APA
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-2.5 text-xs text-slate-300">
                    <span className="flex items-center gap-1.5 font-medium">
                      <Phone className="h-3.5 w-3.5 text-[#2563EB]" />
                      {agencyConfig.phone}
                    </span>
                    <span className="font-semibold text-emerald-400">Available Daily</span>
                  </div>
                </div>
              </div>

              {/* Floating Experience Badge (Edura Style) */}
              <div className="absolute -top-6 -right-4 sm:-right-6 hidden sm:flex items-center gap-3 rounded-2xl border border-blue-100 bg-white p-3.5 shadow-xl">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-[#2563EB]">
                  <Award className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-display text-xl font-extrabold text-[#0F2239]">
                    5+ Years
                  </p>
                  <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
                    Admission Advisory
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative Content & Value Points */}
          <div className="lg:col-span-7">
            {/* Category Tag */}
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-xs font-bold tracking-wider text-[#2563EB] uppercase">
              <Sparkles className="h-3.5 w-3.5 text-[#2563EB]" />
              <span>About College APA • Founder &amp; Chief Counsellor</span>
            </div>

            {/* Main Headline */}
            <h2 className="font-display mt-4 text-3xl font-extrabold tracking-tight text-[#0F2239] sm:text-4xl lg:text-5xl leading-tight">
              Educational Information &amp; Guidance Centre —{' '}
              <span className="text-[#2563EB]">Your Success is Guaranteed</span>
            </h2>

            {/* Paragraph Text */}
            <div className="mt-5 space-y-3.5 text-base text-slate-600 sm:text-lg leading-relaxed">
              <p>
                In the pursuit of realizing your future dreams, our Educational Information and Guidance Center stands as a powerful lighthouse. Here, we don&apos;t just provide information: we offer guidance with one hundred percent reliability, tailored to your individual educational qualifications, interests, and goals.
              </p>
              <p className="text-slate-500 text-sm sm:text-base">
                We ensure paths for you to join quality educational institutions that enrich your future, not just in favorable times, but in every phase. Our primary mission is to secure spots for you in your desired higher education stream through transparent processes. We are fully committed to laying the groundwork for your success.
              </p>
            </div>

            {/* 4 Feature Highlights Grid */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50/70 p-4 transition-colors hover:bg-slate-100/70">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-[#2563EB]">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-display text-sm font-bold text-[#0F2239]">
                    100% Reliable &amp; Transparent
                  </h4>
                  <p className="mt-0.5 text-xs text-slate-600">
                    Zero hidden charges with direct verification of all seat categories.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50/70 p-4 transition-colors hover:bg-slate-100/70">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-[#2563EB]">
                  <Building2 className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-display text-sm font-bold text-[#0F2239]">
                    180+ Colleges &amp; Deemed Varsities
                  </h4>
                  <p className="mt-0.5 text-xs text-slate-600">
                    Engineering, Medical, Agriculture, Law &amp; Paramedical coverage.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50/70 p-4 transition-colors hover:bg-slate-100/70">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-[#2563EB]">
                  <FileCheck className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-display text-sm font-bold text-[#0F2239]">
                    Govt &amp; Merit Scholarships
                  </h4>
                  <p className="mt-0.5 text-xs text-slate-600">
                    Assistance with PMSS, 7.5% reservation, and First Graduate benefits.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50/70 p-4 transition-colors hover:bg-slate-100/70">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-[#2563EB]">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-display text-sm font-bold text-[#0F2239]">
                    Kumbakonam Central Office
                  </h4>
                  <p className="mt-0.5 text-xs text-slate-600">
                    Centrally located in Thanjavur district serving all Tamil Nadu zones.
                  </p>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              {onExploreZones && (
                <button
                  type="button"
                  onClick={onExploreZones}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#2563EB] px-6 py-3.5 text-sm font-bold text-white shadow-md shadow-blue-600/20 transition-all hover:bg-[#1D4ED8] hover:shadow-lg"
                >
                  <span>Explore Tamil Nadu Zones</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              )}

              <a
                href={`tel:${agencyConfig.phone}`}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3.5 text-sm font-bold text-[#0F2239] shadow-xs transition-colors hover:border-slate-400 hover:bg-slate-50"
              >
                <Phone className="h-4 w-4 text-[#2563EB]" />
                <span>Talk to Dr. B. Ramesh</span>
              </a>

              {onEnquire && (
                <button
                  type="button"
                  onClick={onEnquire}
                  className="text-xs font-bold text-slate-600 underline hover:text-[#2563EB]"
                >
                  Request Callback
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
