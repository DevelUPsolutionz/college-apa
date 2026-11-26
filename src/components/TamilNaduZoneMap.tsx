import { motion } from 'framer-motion';
import { ArrowDownRight, Compass, Layers, MapPin } from 'lucide-react';
import type { College, Zone } from '../types/admissions';

interface ZoneExplorerSectionProps {
  zones: Zone[];
  colleges: College[];
  selectedZoneId: string | null;
  onSelectZone: (zoneId: string | null) => void;
}

const zoneSvgPaths: Record<string, string> = {
  chennai:
    'M260 32 L308 38 L334 62 L322 108 L296 140 L264 126 L254 84 Z',
  'namakkal-salem':
    'M138 118 L208 66 L260 32 L254 84 L264 126 L212 174 L154 174 L124 146 Z',
  coimbatore:
    'M68 202 L114 148 L154 174 L174 206 L164 268 L112 292 L76 254 Z',
  trichy:
    'M174 206 L212 174 L242 204 L232 288 L174 302 L164 268 Z',
  thanjavur:
    'M212 174 L264 126 L296 140 L296 196 L312 238 L298 278 L254 294 L232 288 L242 204 Z',
  other:
    'M112 292 L164 268 L174 302 L232 288 L254 294 L224 338 L194 378 L156 426 L134 440 L116 410 L102 354 Z',
};

export function ZoneExplorerSection({
  zones,
  colleges,
  selectedZoneId,
  onSelectZone,
}: ZoneExplorerSectionProps) {
  const getZoneCollegeCount = (zoneId: string) =>
    colleges.filter((c) => c.zoneId === zoneId).length;

  const activeZone = zones.find((z) => z.id === selectedZoneId) ?? null;

  return (
    <section
      id="zones"
      className="border-b border-slate-200/80 bg-white py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-[#0D9488] uppercase">
              <Compass className="h-4 w-4" />
              <span>Step 1 — Geographical Discovery</span>
            </div>
            <h2 className="font-display mt-2 text-3xl font-bold tracking-tight text-[#0B1F3A] sm:text-4xl">
              Explore Colleges by Tamil Nadu Zone
            </h2>
            <p className="mt-3 text-base text-slate-600">
              Select a region on the interactive map or choose a zone card below
              to filter colleges, inspect departments, and compare fee structures.
            </p>
          </div>

          {selectedZoneId && (
            <button
              type="button"
              onClick={() => onSelectZone(null)}
              className="inline-flex items-center gap-2 self-start rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm font-semibold text-[#0B1F3A] transition-colors hover:bg-slate-100 md:self-auto"
            >
              <Layers className="h-4 w-4 text-[#0D9488]" />
              Show All Zones ({colleges.length} Colleges)
            </button>
          )}
        </div>

        {/* Interactive Map + Zone Selector Grid */}
        <div className="mt-10 grid items-start gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Interactive Tamil Nadu SVG Map */}
          <div className="rounded-2xl border border-slate-200 bg-[#F8FAFC] p-5 sm:p-6 lg:col-span-5">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
                Click a Zone Region
              </span>
              <span className="text-xs font-medium text-[#0D9488]">
                {activeZone ? `${activeZone.name} Selected` : 'All Tamil Nadu'}
              </span>
            </div>

            <div className="flex justify-center">
              <svg
                viewBox="0 0 420 470"
                className="h-auto w-full max-w-[360px] select-none"
                role="group"
                aria-label="Interactive Tamil Nadu Zone Map"
              >
                {zones.map((zone) => {
                  const isSelected = selectedZoneId === zone.id;
                  const count = getZoneCollegeCount(zone.id);
                  const pathD = zoneSvgPaths[zone.id];

                  return (
                    <g
                      key={zone.id}
                      role="button"
                      tabIndex={0}
                      aria-label={`${zone.name}, ${count} colleges`}
                      aria-pressed={isSelected}
                      onClick={() => onSelectZone(zone.id)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          onSelectZone(zone.id);
                        }
                      }}
                      className="cursor-pointer focus:outline-none"
                    >
                      <motion.path
                        d={pathD}
                        initial={false}
                        animate={{
                          fill: isSelected ? zone.color : '#FFFFFF',
                          fillOpacity: isSelected ? 0.92 : 0.95,
                          stroke: isSelected ? '#0B1F3A' : '#94A3B8',
                          strokeWidth: isSelected ? 2.5 : 1.4,
                          scale: isSelected ? 1.02 : 1,
                        }}
                        whileHover={{
                          fill: isSelected ? zone.color : '#E0F2FE',
                          stroke: '#0B1F3A',
                          strokeWidth: 2,
                        }}
                        transition={{ duration: 0.2 }}
                        style={{ transformOrigin: 'center' }}
                      />
                      {/* Pin dot */}
                      <circle
                        cx={zone.pinPos.x}
                        cy={zone.pinPos.y}
                        r={isSelected ? 6 : 4.5}
                        fill={isSelected ? '#FFFFFF' : zone.color}
                        stroke={isSelected ? '#0B1F3A' : '#FFFFFF'}
                        strokeWidth="1.8"
                        className="pointer-events-none"
                      />
                      {/* Zone label pill */}
                      <rect
                        x={zone.labelPos.x - 42}
                        y={zone.labelPos.y - 12}
                        width="84"
                        height="22"
                        rx="6"
                        fill={isSelected ? '#0B1F3A' : '#FFFFFF'}
                        stroke={isSelected ? '#0B1F3A' : '#CBD5E1'}
                        strokeWidth="1"
                        className="pointer-events-none"
                      />
                      <text
                        x={zone.labelPos.x}
                        y={zone.labelPos.y + 3}
                        textAnchor="middle"
                        className={`pointer-events-none text-[10px] font-semibold ${
                          isSelected ? 'fill-white' : 'fill-[#0B1F3A]'
                        }`}
                      >
                        {zone.shortName} ({count})
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            <p className="mt-3 text-center text-xs text-slate-500">
              Zones follow our consultancy&apos;s regional admission classification.
            </p>
          </div>

          {/* Zone Cards Grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            {zones.map((zone) => {
              const isSelected = selectedZoneId === zone.id;
              const count = getZoneCollegeCount(zone.id);

              return (
                <motion.button
                  key={zone.id}
                  type="button"
                  onClick={() => onSelectZone(zone.id)}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.99 }}
                  className={`group flex flex-col justify-between rounded-2xl border p-5 text-left transition-all ${
                    isSelected
                      ? 'border-[#0B1F3A] bg-[#0B1F3A] text-white shadow-lg shadow-[#0B1F3A]/15'
                      : 'border-slate-200 bg-white text-[#0F172A] shadow-xs hover:border-[#0D9488]/50 hover:shadow-md'
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <span
                          className="flex h-3 w-3 rounded-full ring-4 ring-opacity-20"
                          style={{
                            backgroundColor: isSelected ? '#14B8A6' : zone.color,
                          }}
                        />
                        <h3 className="font-display text-lg font-bold">
                          {zone.name}
                        </h3>
                      </div>

                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-semibold tabular-nums ${
                          isSelected
                            ? 'bg-white/15 text-[#5EEAD4]'
                            : 'bg-slate-100 text-[#0B1F3A]'
                        }`}
                      >
                        {count} {count === 1 ? 'College' : 'Colleges'}
                      </span>
                    </div>

                    <p
                      className={`mt-1 text-xs font-semibold ${
                        isSelected ? 'text-[#5EEAD4]' : 'text-[#0D9488]'
                      }`}
                    >
                      {zone.tagline}
                    </p>

                    <p
                      className={`mt-2.5 text-sm leading-relaxed ${
                        isSelected ? 'text-slate-200' : 'text-slate-600'
                      }`}
                    >
                      {zone.description}
                    </p>
                  </div>

                  <div className="mt-4 border-t border-current/10 pt-3">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 truncate text-xs opacity-85">
                        <MapPin className="h-3.5 w-3.5 shrink-0" />
                        <span className="truncate">
                          {zone.districts.slice(0, 3).join(', ')}
                          {zone.districts.length > 3
                            ? ` +${zone.districts.length - 3}`
                            : ''}
                        </span>
                      </div>
                      <ArrowDownRight
                        className={`h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5 ${
                          isSelected ? 'text-[#14B8A6]' : 'text-slate-400'
                        }`}
                      />
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

