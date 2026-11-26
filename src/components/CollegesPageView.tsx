import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowUpDown,
  BookOpen,
  Building2,
  Filter,
  GraduationCap,
  MapPin,
  RotateCcw,
  Search,
} from 'lucide-react';
import type { College, CollegeType, Zone } from '../types/admissions';

interface CollegesPageViewProps {
  zones: Zone[];
  colleges: College[];
  selectedZoneId: string | null;
  onChangeZone: (zoneId: string | null) => void;
  onSelectCollege: (college: College) => void;
  onBackToZones: () => void;
}

type SortOption = 'recommended' | 'name_asc' | 'courses_desc' | 'established_asc';

const collegeTypes: Array<CollegeType | 'All'> = [
  'All',
  'Engineering',
  'Deemed & Private University',
  'Paramedical & Nursing',
  'Law',
  'Agriculture',
  'Architecture',
];

export function CollegesPageView({
  zones,
  colleges,
  selectedZoneId,
  onChangeZone,
  onSelectCollege,
  onBackToZones,
}: CollegesPageViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<CollegeType | 'All'>('All');
  const [sortBy, setSortBy] = useState<SortOption>('recommended');
  const [visibleLimit, setVisibleLimit] = useState<number>(18);

  const activeZone = zones.find((z) => z.id === selectedZoneId) ?? null;

  const zoneColleges = useMemo(() => {
    if (!selectedZoneId) return colleges;
    return colleges.filter((c) => c.zoneId === selectedZoneId);
  }, [colleges, selectedZoneId]);

  const availableDistricts = useMemo(() => {
    const set = new Set(zoneColleges.map((c) => c.district));
    return ['All', ...Array.from(set).sort()];
  }, [zoneColleges]);

  const effectiveDistrict = availableDistricts.includes(selectedDistrict)
    ? selectedDistrict
    : 'All';

  const filteredColleges = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    const list = zoneColleges.filter((college) => {
      if (effectiveDistrict !== 'All' && college.district !== effectiveDistrict) {
        return false;
      }
      if (selectedType !== 'All' && college.type !== selectedType) {
        return false;
      }
      if (!q) return true;

      const matchesCollege =
        college.name.toLowerCase().includes(q) ||
        college.shortName.toLowerCase().includes(q) ||
        college.district.toLowerCase().includes(q) ||
        college.location.toLowerCase().includes(q) ||
        college.type.toLowerCase().includes(q) ||
        (college.tneaCode && college.tneaCode.includes(q));

      const matchesCourse = college.courses.some(
        (course) =>
          course.name.toLowerCase().includes(q) ||
          course.department.toLowerCase().includes(q)
      );

      return matchesCollege || matchesCourse;
    });

    return [...list].sort((a, b) => {
      switch (sortBy) {
        case 'name_asc':
          return a.name.localeCompare(b.name);
        case 'courses_desc':
          return b.courses.length - a.courses.length;
        case 'established_asc':
          return (a.established ?? 9999) - (b.established ?? 9999);
        default:
          return 0;
      }
    });
  }, [zoneColleges, effectiveDistrict, selectedType, searchQuery, sortBy]);

  const displayedColleges = filteredColleges.slice(0, visibleLimit);
  const hasMore = filteredColleges.length > visibleLimit;

  const resetAllFilters = () => {
    setSearchQuery('');
    setSelectedDistrict('All');
    setSelectedType('All');
    setSortBy('recommended');
    setVisibleLimit(18);
  };

  return (
    <div className="py-10 sm:py-14 bg-[#F8FAFC] min-h-[75vh]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-6">
          <button
            type="button"
            onClick={onBackToZones}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-[#0F2239] shadow-xs hover:bg-slate-50 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to All Zones
          </button>

          {/* Zone Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500 uppercase">
              Filter by Zone:
            </span>
            <select
              value={selectedZoneId ?? 'all'}
              onChange={(e) =>
                onChangeZone(e.target.value === 'all' ? null : e.target.value)
              }
              className="rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm font-bold text-[#0F2239] focus:border-[#0F2239] focus:outline-none"
            >
              <option value="all">All Zones ({colleges.length} Colleges)</option>
              {zones.map((z) => (
                <option key={z.id} value={z.id}>
                  {z.name} ({colleges.filter((c) => c.zoneId === z.id).length})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Page Banner in Clean White Card */}
        <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
                <Building2 className="h-3.5 w-3.5 text-[#0F2239]" />
                {activeZone ? activeZone.name : 'All Tamil Nadu Zones'}
              </div>
              <h2 className="font-display mt-2 text-3xl font-extrabold text-[#0F2239] sm:text-4xl">
                {activeZone ? `${activeZone.name} Colleges` : 'All Tamil Nadu Partner Colleges'}
              </h2>
              <p className="mt-1.5 text-sm text-slate-600">
                {activeZone ? activeZone.description : 'Explore accredited institutions across Tamil Nadu with transparent fee breakdowns.'}
              </p>
            </div>

            <div className="rounded-2xl bg-[#0F2239] p-4 text-center text-white shrink-0 shadow-xs">
              <span className="block text-2xl font-black tabular-nums">
                {filteredColleges.length}
              </span>
              <span className="block text-xs font-semibold text-slate-300">
                Institutions Found
              </span>
            </div>
          </div>

          {/* Search & Filter Controls */}
          <div className="mt-6 grid gap-3 border-t border-slate-100 pt-5 md:grid-cols-12">
            <div className="relative md:col-span-5">
              <Search className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search college name, TNEA code (e.g. 1432), course, or city..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pr-4 pl-10 text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#0F2239] focus:bg-white focus:outline-none"
              />
            </div>

            <div className="relative md:col-span-3">
              <MapPin className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <select
                value={effectiveDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pr-3 pl-9 text-sm font-semibold text-slate-700 focus:border-[#0F2239] focus:bg-white focus:outline-none"
              >
                {availableDistricts.map((d) => (
                  <option key={d} value={d}>
                    {d === 'All' ? 'All Districts' : d}
                  </option>
                ))}
              </select>
            </div>

            <div className="relative md:col-span-2">
              <Filter className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value as CollegeType | 'All')}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pr-3 pl-9 text-sm font-semibold text-slate-700 focus:border-[#0F2239] focus:bg-white focus:outline-none"
              >
                {collegeTypes.map((type) => (
                  <option key={type} value={type}>
                    {type === 'All' ? 'All Streams' : type}
                  </option>
                ))}
              </select>
            </div>

            <div className="relative md:col-span-2">
              <ArrowUpDown className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pr-3 pl-9 text-sm font-semibold text-slate-700 focus:border-[#0F2239] focus:bg-white focus:outline-none"
              >
                <option value="recommended">Recommended</option>
                <option value="name_asc">Name (A–Z)</option>
                <option value="courses_desc">Most Courses</option>
                <option value="established_asc">Established Year</option>
              </select>
            </div>
          </div>
        </div>

        {/* Colleges Grid in Edura Card Style */}
        <AnimatePresence mode="wait">
          {filteredColleges.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-8 flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-[#0F2239]">
                <GraduationCap className="h-7 w-7" />
              </div>
              <h3 className="font-display mt-4 text-xl font-bold text-[#0F2239]">
                No Colleges Found
              </h3>
              <p className="mt-1.5 max-w-md text-sm text-slate-500">
                No institutions matched your current filters. Try resetting search criteria or selecting another district.
              </p>
              <button
                type="button"
                onClick={resetAllFilters}
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#0F2239] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#1A365D]"
              >
                <RotateCcw className="h-4 w-4" />
                Reset Filters
              </button>
            </motion.div>
          ) : (
            <motion.div
              key={selectedZoneId ?? 'all'}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="mt-8"
            >
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {displayedColleges.map((college) => (
                  <motion.article
                    key={college.id}
                    layout
                    whileHover={{ y: -4 }}
                    className="group flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-[#0F2239] hover:shadow-xl hover:shadow-slate-900/5"
                  >
                    <div>
                      {/* Top Badges */}
                      <div className="flex items-start justify-between gap-3">
                        <div
                          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-base font-black text-white shadow-xs bg-[#0F2239]"
                          aria-hidden="true"
                        >
                          {college.logoInitials}
                        </div>

                        <div className="flex flex-wrap justify-end gap-1.5">
                          {college.tneaCode && (
                            <span className="rounded-full bg-[#0F2239] px-2.5 py-1 text-[11px] font-bold text-white tabular-nums">
                              TNEA {college.tneaCode}
                            </span>
                          )}
                          <span className="rounded-full bg-slate-100 border border-slate-200 px-2.5 py-1 text-xs font-semibold text-slate-700">
                            {college.type}
                          </span>
                        </div>
                      </div>

                      {/* College Name & Location */}
                      <h3 className="font-display mt-4 text-lg font-bold leading-snug text-[#0F2239] transition-colors group-hover:text-[#1A365D]">
                        {college.name}
                      </h3>

                      <div className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                        <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{college.location} ({college.district})</span>
                      </div>

                      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-600">
                        {college.shortDescription}
                      </p>

                      {/* Accreditation */}
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        <span className="inline-flex items-center rounded-md bg-slate-50 border border-slate-200 px-2.5 py-1 text-[11px] font-semibold text-slate-700">
                          {college.accreditation}
                        </span>
                      </div>
                    </div>

                    {/* Card Footer */}
                    <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600">
                        <BookOpen className="h-4 w-4 text-[#0F2239]" />
                        <span className="tabular-nums">
                          {college.courses.length} {college.courses.length === 1 ? 'Course' : 'Courses'}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => onSelectCollege(college)}
                        className="inline-flex items-center gap-1.5 rounded-xl bg-[#0F2239] px-4 py-2 text-xs font-bold text-white shadow-xs transition-all hover:bg-[#1A365D]"
                      >
                        View Courses &rarr;
                      </button>
                    </div>
                  </motion.article>
                ))}
              </div>

              {hasMore && (
                <div className="mt-10 flex justify-center">
                  <button
                    type="button"
                    onClick={() => setVisibleLimit((prev) => prev + 18)}
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-bold text-[#0F2239] shadow-xs transition-colors hover:bg-slate-50 hover:border-[#0F2239]"
                  >
                    Load More Colleges ({filteredColleges.length - visibleLimit} remaining)
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
