import { motion } from 'framer-motion';
import { ArrowRight, Building2, Compass, GraduationCap, MapPin } from 'lucide-react';
import type { College, Zone } from '../types/admissions';

interface ZonesHomeViewProps {
  zones: Zone[];
  colleges: College[];
  onSelectZone: (zoneId: string) => void;
  onViewAllColleges: () => void;
}

export function ZonesHomeView({
  zones,
  colleges,
  onSelectZone,
  onViewAllColleges,
}: ZonesHomeViewProps) {
  const getZoneCollegeCount = (zoneId: string) =>
    colleges.filter((c) => c.zoneId === zoneId).length;

  return (
    <section id="zones" className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end border-b border-slate-200 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1 text-xs font-bold tracking-wider text-[#0F2239] uppercase">
              <Compass className="h-4 w-4 text-amber-500" />
              <span>Step 1 — Select Your Zone</span>
            </div>
            <h2 className="font-display mt-3 text-3xl font-extrabold tracking-tight text-[#0F2239] sm:text-4xl lg:text-5xl">
              Tamil Nadu Admission Zones
            </h2>
            <p className="mt-2.5 max-w-2xl text-base text-slate-600 sm:text-lg">
              Click any zone to open its complete college directory on a dedicated page.
            </p>
          </div>

          <button
            type="button"
            onClick={onViewAllColleges}
            className="inline-flex items-center gap-2 self-start rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-[#0F2239] shadow-xs transition-all hover:bg-slate-50 hover:border-[#0F2239] md:self-auto"
          >
            <Building2 className="h-4 w-4 text-amber-500" />
            View All Tamil Nadu Colleges ({colleges.length})
          </button>
        </div>

        {/* 6 Edura-Style Category Cards: Crisp White Cards, Subtle Slate Border, Navy Accent */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {zones.map((zone) => {
            const count = getZoneCollegeCount(zone.id);

            return (
              <motion.div
                key={zone.id}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
                onClick={() => onSelectZone(zone.id)}
                className="group cursor-pointer flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-all hover:border-[#0F2239] hover:shadow-xl hover:shadow-slate-900/5"
              >
                <div>
                  {/* Top Bar with Icon & Counter */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-[#0F2239] group-hover:bg-[#0F2239] group-hover:text-white transition-colors">
                      <GraduationCap className="h-6 w-6" />
                    </div>

                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-[#0F2239] tabular-nums">
                      {count} Colleges
                    </span>
                  </div>

                  {/* Zone Name & Tagline */}
                  <h3 className="font-display mt-5 text-2xl font-extrabold text-[#0F2239] group-hover:text-[#1A365D] transition-colors">
                    {zone.name}
                  </h3>

                  <p className="mt-1 text-xs font-bold text-amber-600">
                    {zone.tagline}
                  </p>

                  <p className="mt-3 text-sm leading-relaxed text-slate-600 line-clamp-3">
                    {zone.description}
                  </p>

                  {/* District Chips */}
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {zone.districts.map((d) => (
                      <span
                        key={d}
                        className="inline-flex items-center gap-1 rounded-lg bg-slate-50 border border-slate-200 px-2.5 py-1 text-[11px] font-semibold text-slate-700"
                      >
                        <MapPin className="h-3 w-3 text-slate-400" />
                        {d}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom CTA Link */}
                <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                  <span className="text-xs font-bold text-slate-500 group-hover:text-[#0F2239] transition-colors">
                    View Verified Colleges
                  </span>

                  <span className="inline-flex items-center gap-1 text-xs font-bold text-[#0F2239] group-hover:translate-x-1 transition-transform">
                    Explore Zone
                    <ArrowRight className="h-3.5 w-3.5 text-amber-500" />
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
