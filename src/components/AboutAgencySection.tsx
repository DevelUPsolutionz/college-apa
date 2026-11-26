import { Award, CheckCircle2, Compass, GraduationCap } from 'lucide-react';
import { agencyConfig } from '../data/agencyConfig';
import {
  aboutAgencyData,
  counsellingStreams,
  scholarshipsData,
} from '../data/tamilNaduData';

export function AboutAgencySection() {
  return (
    <section
      id="about"
      className="border-b border-slate-200 bg-[#F8FAFC] py-16 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* About Agency Banner */}
        <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-[#0F2239] p-8 sm:p-12 text-white shadow-xl">
          <div className="relative max-w-3xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-bold tracking-wider text-slate-200 uppercase">
              {agencyConfig.brandName} • Founder &amp; Chief Counsellor
            </span>
            <h2 className="font-display mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl text-white">
              {aboutAgencyData.headline || 'Educational Information & Guidance Centre'}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-300 sm:text-lg">
              {aboutAgencyData.body}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-300">
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                100% Reliable &amp; Transparent
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                Official TNEA &amp; Medical Counselling Support
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                Kumbakonam &amp; Entire Tamil Nadu
              </span>
            </div>
          </div>
        </div>

        {/* Scholarships from Excel */}
        <div className="mt-14">
          <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider text-[#0F2239] uppercase">
                <Award className="h-4 w-4 text-amber-500" />
                Financial Aid &amp; Quotas
              </span>
              <h3 className="font-display mt-1 text-2xl font-extrabold text-[#0F2239] sm:text-3xl">
                Government &amp; Merit Scholarships We Assist With
              </h3>
            </div>
          </div>

          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {scholarshipsData.map((sch) => (
              <div
                key={sch.id}
                className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-xs transition-shadow hover:shadow-md"
              >
                <div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-[#0F2239]">
                      <GraduationCap className="h-5 w-5" />
                    </div>
                    <h4 className="font-display text-sm font-bold text-[#0F2239] uppercase">
                      {sch.title}
                    </h4>
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-slate-600">
                    {sch.points.slice(0, 2).join(' ')}
                  </p>
                </div>
                <div className="mt-4 flex items-center gap-1.5 border-t border-slate-100 pt-3 text-xs font-bold text-slate-700">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                  <span>Free Eligibility Verification</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Counselling Guidance Streams */}
        <div className="mt-12 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
            <div className="max-w-xl">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider text-[#0F2239] uppercase">
                <Compass className="h-4 w-4 text-amber-500" />
                Counselling Streams
              </span>
              <h3 className="font-display mt-1 text-xl font-bold text-[#0F2239] sm:text-2xl">
                End-to-End Tamil Nadu Counselling Guidance
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Accurate cutoff analysis, choice list preparation, and document verification overseen by Dr. B. Ramesh.
              </p>
            </div>

            <div className="flex flex-wrap gap-2.5 lg:max-w-lg lg:justify-end">
              {counsellingStreams.map((stream) => (
                <span
                  key={stream}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-bold text-[#0F2239]"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                  {stream}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
