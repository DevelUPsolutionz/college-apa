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
      className="border-b border-slate-200/80 bg-[#FAF9F6] py-16 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* About Agency */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-semibold tracking-wider text-[#0D9488] uppercase">
            About {agencyConfig.brandName} • Dr. B. Ramesh
          </span>
          <h2 className="font-display mt-2 text-3xl font-bold tracking-tight text-[#0B1F3A] sm:text-4xl">
            {aboutAgencyData.headline ||
              'Educational Information & Guidance Centre'}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            {aboutAgencyData.body}
          </p>
        </div>

        {/* Scholarships from Excel */}
        <div className="mt-14">
          <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider text-[#0D9488] uppercase">
                <Award className="h-4 w-4" />
                Scholarship Guidance
              </span>
              <h3 className="font-display mt-1 text-2xl font-bold text-[#0B1F3A]">
                Government &amp; Merit Scholarships We Assist With
              </h3>
            </div>
          </div>

          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {scholarshipsData.map((sch) => (
              <div
                key={sch.id}
                className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#0B1F3A] text-[#D49B27]">
                      <GraduationCap className="h-4 w-4" />
                    </div>
                    <h4 className="font-display text-sm font-bold text-[#0B1F3A] uppercase">
                      {sch.title}
                    </h4>
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-slate-600">
                    {sch.points.slice(0, 2).join(' ')}
                  </p>
                </div>
                <div className="mt-4 flex items-center gap-1.5 border-t border-slate-100 pt-3 text-xs font-semibold text-[#0D9488]">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>Eligibility &amp; Application Support</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Counselling Guidance Streams */}
        <div className="mt-12 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
            <div className="max-w-xl">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider text-[#0D9488] uppercase">
                <Compass className="h-4 w-4" />
                Counselling Streams
              </span>
              <h3 className="font-display mt-1 text-xl font-bold text-[#0B1F3A] sm:text-2xl">
                End-to-End Tamil Nadu Counselling Guidance
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Guided choice-filling, document verification, and seat
                allotment support led by Dr. B. Ramesh.
              </p>
            </div>

            <div className="flex flex-wrap gap-2.5 lg:max-w-lg lg:justify-end">
              {counsellingStreams.map((stream) => (
                <span
                  key={stream}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-[#F8FAFC] px-3.5 py-2 text-xs font-semibold text-[#0B1F3A]"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#0D9488]" />
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
