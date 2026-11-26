import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowUpDown,
  BookOpen,
  Building2,
  Filter,
  GraduationCap,
  MapPin,
  RotateCcw,
  Search,
  Sparkles,
} from 'lucide-react';
import type { College, CollegeType, Zone } from '../types/admissions';

interface CollegeDirectoryProps {
  zones: Zone[];
  colleges: College[];
  selectedZoneId: string | null;
  onChangeZone: (zoneId: string | null) => void;
  onSelectCollege: (college: College) => void;
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

export function CollegeDirectory({
  zones,
  colleges,
  selectedZoneId,
  onChangeZone,
  onSelectCollege,
}: CollegeDirectoryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<CollegeType | 'All'>('All');
  const [sortBy, setSortBy] = useState<SortOption>('recommended');
  const [visibleLimit, setVisibleLimit] = useState<number>(12);

  const activeZone = zones.find((z) => z.id === selectedZoneId) ?? null;

  // Colleges belonging to the selected zone (or all if no zone selected)
  const zoneColleges = useMemo(() => {
    if (!selectedZoneId) return colleges;
    return colleges.filter((c) => c.zoneId === selectedZoneId);
  }, [colleges, selectedZoneId]);

  // Available districts in the current zone
  const availableDistricts = useMemo(() => {
    const set = new Set(zoneColleges.map((c) => c.district));
    return ['All', ...Array.from(set).sort()];
  }, [zoneColleges]);

  // Reset district filter if the selected district is not in the newly selected zone
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
    setVisibleLimit(12);
  };

  return (
    <section
      id="directory"
      className="border-b border-amber-900/10 bg-[#FAF8F5] py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top Header + Active Zone Banner */}
        <div className="flex flex-col justify-between gap-6 rounded-2xl border border-amber-200/80 bg-white p-6 shadow-sm lg:flex-row lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider text-[#C9881A] uppercase">
              <Building2 className="h-4 w-4" />
              <span>Step 2 — College Directory</span>
            </div>
            <h2 className="font-display mt-1.5 text-2xl font-extrabold tracking-tight text-[#082142] sm:text-3xl">
              {activeZone
                ? `Colleges in ${activeZone.name}`
                : 'All Tamil Nadu Partner Colleges'}
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Showing{' '}
              <span className="font-bold text-[#082142] tabular-nums">
                {filteredColleges.length}
              </span>{' '}
              {filteredColleges.length === 1 ? 'institution' : 'institutions'}
              {activeZone
                ? ` across ${activeZone.districts.join(', ')}`
                : ' across all 6 zones'}
              . Click any college to inspect courses, seat options, and fee structures.
            </p>
          </div>

          {/* Zone Switcher */}
          <div className="flex flex-wrap items-center gap-2">
            <label
              htmlFor="zone-switcher"
              className="text-xs font-bold text-slate-500 uppercase"
            >
              Zone:
            </label>
            <select
              id="zone-switcher"
              value={selectedZoneId ?? 'all'}
              onChange={(e) =>
                onChangeZone(e.target.value === 'all' ? null : e.target.value)
              }
              className="rounded-xl border border-amber-200 bg-amber-50/50 px-3.5 py-2 text-sm font-bold text-[#082142] focus:border-[#C9881A] focus:outline-none"
            >
              <option value="all">All Zones ({colleges.length})</option>
              {zones.map((z) => (
                <option key={z.id} value={z.id}>
                  {z.name} ({colleges.filter((c) => c.zoneId === z.id).length})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Search & Filter Controls */}
        <div className="mt-6 grid gap-3 rounded-2xl border border-amber-200/70 bg-white p-4 shadow-sm md:grid-cols-12">
          {/* Search Input */}
          <div className="relative md:col-span-5">
            <Search className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search college name, TNEA code (e.g. 1432), course, or city..."
              aria-label="Search colleges or courses"
              className="w-full rounded-xl border border-slate-200 bg-[#FAF8F5] py-2.5 pr-4 pl-10 text-sm text-[#0A1A30] placeholder:text-slate-400 focus:border-[#C9881A] focus:bg-white focus:outline-none"
            />
          </div>

          {/* District Filter */}
          <div className="relative md:col-span-3">
            <MapPin className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <select
              value={effectiveDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              aria-label="Filter by district"
              className="w-full rounded-xl border border-slate-200 bg-[#FAF8F5] py-2.5 pr-3 pl-9 text-sm font-semibold text-slate-700 focus:border-[#C9881A] focus:bg-white focus:outline-none"
            >
              {availableDistricts.map((d) => (
                <option key={d} value={d}>
                  {d === 'All' ? 'All Districts' : d}
                </option>
              ))}
            </select>
          </div>

          {/* Category Filter */}
          <div className="relative md:col-span-2">
            <Filter className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <select
              value={selectedType}
              onChange={(e) =>
                setSelectedType(e.target.value as CollegeType | 'All')
              }
              aria-label="Filter by college category"
              className="w-full rounded-xl border border-slate-200 bg-[#FAF8F5] py-2.5 pr-3 pl-9 text-sm font-semibold text-slate-700 focus:border-[#C9881A] focus:bg-white focus:outline-none"
            >
              {collegeTypes.map((type) => (
                <option key={type} value={type}>
                  {type === 'All' ? 'All Streams' : type}
                </option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <div className="relative md:col-span-2">
            <ArrowUpDown className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              aria-label="Sort colleges"
              className="w-full rounded-xl border border-slate-200 bg-[#FAF8F5] py-2.5 pr-3 pl-9 text-sm font-semibold text-slate-700 focus:border-[#C9881A] focus:bg-white focus:outline-none"
            >
              <option value="recommended">Recommended</option>
              <option value="name_asc">Name (A–Z)</option>
              <option value="courses_desc">Most Courses</option>
              <option value="established_asc">Established Year</option>
            </select>
          </div>
        </div>

        {/* College Cards Grid or Empty State */}
        <AnimatePresence mode="wait">
          {filteredColleges.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-10 flex flex-col items-center justify-center rounded-2xl border border-dashed border-amber-300 bg-white px-6 py-16 text-center"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 text-[#C9881A]">
                <GraduationCap className="h-7 w-7" />
              </div>
              <h3 className="font-display mt-4 text-lg font-bold text-[#082142]">
                No Colleges Found
              </h3>
              <p className="mt-1.5 max-w-md text-sm text-slate-500">
                No institutions matched your current search or stream criteria in{' '}
                {activeZone ? activeZone.name : 'Tamil Nadu'}. Try resetting filters or choosing another zone.
              </p>
              <div className="mt-5 flex flex-wrap justify-center gap-3">
                <button
                  type="button"
                  onClick={resetAllFilters}
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#C9881A] to-[#DF9D2B] px-4 py-2.5 text-sm font-bold text-[#082142]"
                >
                  <RotateCcw className="h-4 w-4" />
                  Reset Filters
                </button>
                {selectedZoneId && (
                  <button
                    type="button"
                    onClick={() => onChangeZone(null)}
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-[#082142] hover:bg-slate-50"
                  >
                    View All Zones
                  </button>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={selectedZoneId ?? 'all'}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="mt-8"
            >
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {displayedColleges.map((college) => (
                  <motion.article
                    key={college.id}
                    layout
                    whileHover={{ y: -3 }}
                    className="group flex flex-col justify-between rounded-2xl border border-amber-100 bg-white p-6 shadow-xs transition-all hover:border-[#DF9D2B] hover:shadow-xl hover:shadow-[#082142]/5"
                  >
                    <div>
                      {/* Top Row: Monogram Crest + Badges */}
                      <div className="flex items-start justify-between gap-3">
                        <div
                          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-base font-extrabold text-[#082142] shadow-sm bg-gradient-to-br from-[#FDE68A] via-[#DF9D2B] to-[#C9881A]"
                          aria-hidden="true"
                        >
                          {college.logoInitials}
                        </div>

                        <div className="flex flex-wrap justify-end gap-1.5">
                          {college.tneaCode && (
                            <span className="rounded-full bg-[#082142] px-2.5 py-1 text-[11px] font-bold text-[#FCD34D] tabular-nums">
                              TNEA {college.tneaCode}
                            </span>
                          )}
                          <span className="rounded-full bg-amber-50 border border-amber-200/80 px-2.5 py-1 text-xs font-bold text-[#92400e]">
                            {college.type}
                          </span>
                        </div>
                      </div>

                      {/* College Name & Location */}
                      <h3 className="font-display mt-4 text-lg font-bold leading-snug text-[#082142] transition-colors group-hover:text-[#C9881A]">
                        {college.name}
                      </h3>

                      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold text-slate-500">
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5 text-[#C9881A]" />
                          {college.location} ({college.district})
                        </span>
                      </div>

                      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-600">
                        {college.shortDescription}
                      </p>

                      {/* Accreditation */}
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        <span className="inline-flex items-center gap-1 rounded-md bg-amber-50/60 border border-amber-100 px-2 py-1 text-[11px] font-semibold text-amber-900">
                          <Sparkles className="h-3 w-3 text-[#C9881A]" />
                          {college.accreditation}
                        </span>
                      </div>
                    </div>

                    {/* Card Footer */}
                    <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                        <BookOpen className="h-4 w-4 text-[#C9881A]" />
                        <span className="tabular-nums">
                          {college.courses.length}{' '}
                          {college.courses.length === 1 ? 'Course' : 'Courses'}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => onSelectCollege(college)}
                        className="inline-flex items-center gap-1.5 rounded-xl bg-[#082142] px-4 py-2 text-xs font-bold text-white transition-all hover:bg-gradient-to-r hover:from-[#C9881A] hover:to-[#DF9D2B] hover:text-[#082142]"
                      >
                        View Courses
                      </button>
                    </div>
                  </motion.article>
                ))}
              </div>

              {hasMore && (
                <div className="mt-8 flex justify-center">
                  <button
                    type="button"
                    onClick={() => setVisibleLimit((prev) => prev + 18)}
                    className="inline-flex items-center gap-2 rounded-xl border border-amber-300 bg-white px-6 py-3 text-sm font-bold text-[#082142] shadow-sm transition-colors hover:bg-amber-50"
                  >
                    Load More Colleges ({filteredColleges.length - visibleLimit} remaining)
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
