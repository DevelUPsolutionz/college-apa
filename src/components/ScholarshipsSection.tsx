import { Award, CheckCircle2, GraduationCap, ShieldAlert } from 'lucide-react';
import { scholarshipsData } from '../data/tamilNaduData';

interface ScholarshipsSectionProps {
  onEnquire?: () => void;
}

export function ScholarshipsSection({ onEnquire }: ScholarshipsSectionProps) {
  return (
    <section
      id="scholarships"
      className="border-b border-slate-200 bg-[#F8FAFC] py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end border-b border-slate-200 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1 text-xs font-bold tracking-wider text-[#2563EB] uppercase">
              <Award className="h-3.5 w-3.5 text-[#2563EB]" />
              <span>Financial Aid &amp; Quotas</span>
            </div>
            <h2 className="font-display mt-3 text-3xl font-extrabold tracking-tight text-[#0F2239] sm:text-4xl lg:text-5xl">
              Government &amp; Merit Scholarships We Assist With
            </h2>
            <p className="mt-2.5 max-w-2xl text-base text-slate-600 sm:text-lg">
              Official scholarship processing and quota eligibility checks from your admissions file to reduce your college fee burden.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
            <ShieldAlert className="h-4 w-4 text-emerald-600" />
            <span>100% Free Verification Support</span>
          </div>
        </div>

        {/* 6 Scholarships Grid */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {scholarshipsData.map((sch) => (
            <div
              key={sch.id}
              className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-[#2563EB] hover:shadow-lg"
            >
              <div>
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-[#2563EB]">
                    <GraduationCap className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-display text-sm font-bold text-[#0F2239] uppercase tracking-wide">
                      {sch.title}
                    </h3>
                    <span className="text-[11px] font-semibold text-emerald-600">
                      Eligible for 2026-27 Intake
                    </span>
                  </div>
                </div>

                <div className="mt-4 space-y-2 text-xs leading-relaxed text-slate-600">
                  {sch.points.slice(0, 3).map((pt, i) => (
                    <p key={i} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#2563EB]" />
                      <span>{pt}</span>
                    </p>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span>Free Eligibility Verification</span>
                </div>
                {onEnquire && (
                  <button
                    type="button"
                    onClick={onEnquire}
                    className="text-xs font-bold text-[#2563EB] hover:underline"
                  >
                    Check →
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
