import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Award,
  BedDouble,
  BookOpen,
  CalendarClock,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  GraduationCap,
  Info,
  MapPin,
  Send,
  Users,
  X,
} from 'lucide-react';
import type { College, Course, FeeLineItem } from '../types/admissions';
import {
  calculateCourseFeeTotals,
  formatINR,
  getBillingPeriodBadgeClass,
  getBillingPeriodLabel,
} from '../utils/feeCalculator';

interface CollegeDetailsDrawerProps {
  college: College | null;
  onClose: () => void;
  onEnquireCourse: (college: College, course: Course) => void;
}

interface FeeRowProps {
  title: string;
  item: FeeLineItem;
}

function FeeRow({ title, item }: FeeRowProps) {
  return (
    <div className="flex flex-col justify-between gap-2 border-b border-slate-100 py-3 last:border-b-0 sm:flex-row sm:items-center">
      <div>
        <p className="text-sm font-semibold text-[#0A1A30]">
          {item.label ? `${title} (${item.label})` : title}
        </p>
        {item.note && <p className="text-xs text-slate-500">{item.note}</p>}
      </div>
      <div className="flex items-center gap-2.5 sm:justify-end">
        <span
          className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[11px] font-bold ${getBillingPeriodBadgeClass(
            item.period
          )}`}
        >
          {getBillingPeriodLabel(item.period)}
        </span>
        <span className="font-display min-w-[92px] text-right text-sm font-bold text-[#082142] tabular-nums">
          {formatINR(item.amount)}
        </span>
      </div>
    </div>
  );
}

export function CollegeDetailsDrawer({
  college,
  onClose,
  onEnquireCourse,
}: CollegeDetailsDrawerProps) {
  const [expandedCourseId, setExpandedCourseId] = useState<string | null>(
    college?.courses[0]?.id ?? null
  );
  const [includeHostelMap, setIncludeHostelMap] = useState<Record<string, boolean>>({});
  const [selectedDept, setSelectedDept] = useState<string>('All');

  useEffect(() => {
    if (!college) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [college, onClose]);

  if (!college) return null;

  const departments = [
    'All',
    ...Array.from(new Set(college.courses.map((c) => c.department))),
  ];

  const visibleCourses =
    selectedDept === 'All'
      ? college.courses
      : college.courses.filter((c) => c.department === selectedDept);

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex justify-end"
        role="dialog"
        aria-modal="true"
        aria-labelledby="college-drawer-title"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#06152b]/65 backdrop-blur-xs"
        />

        {/* Slide-over Panel */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 28, stiffness: 280 }}
          className="relative z-10 flex h-full w-full max-w-3xl flex-col bg-[#FAF8F5] shadow-2xl"
        >
          {/* Header */}
          <div className="border-b border-amber-200/60 bg-[#082142] px-5 py-4 text-white sm:px-7">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-base font-extrabold text-[#082142] shadow-sm bg-gradient-to-br from-[#FDE68A] via-[#DF9D2B] to-[#C9881A]">
                  {college.logoInitials}
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    {college.tneaCode && (
                      <span className="rounded-full bg-[#DF9D2B] px-2.5 py-0.5 text-[11px] font-bold text-[#082142]">
                        TNEA {college.tneaCode}
                      </span>
                    )}
                    <span className="rounded-full bg-white/15 px-2.5 py-0.5 text-[11px] font-semibold text-[#FDE68A]">
                      {college.type}
                    </span>
                  </div>
                  <h2
                    id="college-drawer-title"
                    className="font-display mt-1 text-xl font-extrabold text-white sm:text-2xl"
                  >
                    {college.name}
                  </h2>
                  <p className="mt-0.5 flex items-center gap-1.5 text-xs font-medium text-slate-300 sm:text-sm">
                    <MapPin className="h-3.5 w-3.5 text-[#DF9D2B]" />
                    {college.location}, {college.district} District • {college.accreditation}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-white/20 p-2 text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
                aria-label="Close college details"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Scrollable Body */}
          <div className="flex-1 overflow-y-auto px-5 py-6 sm:px-7">
            {/* Overview & Highlights */}
            <div className="rounded-2xl border border-amber-200/70 bg-white p-5 shadow-xs">
              <p className="text-sm leading-relaxed text-slate-600">
                {college.shortDescription}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {college.highlights.map((h) => (
                  <span
                    key={h}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-amber-50/60 px-2.5 py-1 text-xs font-semibold text-[#082142] border border-amber-200/80"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#C9881A]" />
                    {h}
                  </span>
                ))}
              </div>
            </div>

            {/* Department Filter */}
            <div className="mt-6">
              <div className="flex items-center justify-between">
                <h3 className="font-display flex items-center gap-2 text-base font-bold text-[#082142]">
                  <BookOpen className="h-4 w-4 text-[#C9881A]" />
                  Available Courses &amp; Transparent Fee Breakdown ({visibleCourses.length})
                </h3>
              </div>

              {departments.length > 2 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {departments.map((dept) => (
                    <button
                      key={dept}
                      type="button"
                      onClick={() => setSelectedDept(dept)}
                      className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-colors ${
                        selectedDept === dept
                          ? 'bg-[#082142] text-white'
                          : 'border border-amber-200 bg-white text-slate-700 hover:bg-amber-50'
                      }`}
                    >
                      {dept}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Expandable Course Cards */}
            <div className="mt-4 space-y-4">
              {visibleCourses.map((course) => {
                const isExpanded = expandedCourseId === course.id;
                const totals = calculateCourseFeeTotals(course);
                const includeHostel = includeHostelMap[course.id] ?? false;
                const displayedTotal = includeHostel
                  ? totals.grandTotalWithHostel
                  : totals.academicTotal;

                return (
                  <div
                    key={course.id}
                    className={`overflow-hidden rounded-2xl border bg-white transition-all ${
                      isExpanded
                        ? 'border-[#C9881A] shadow-md'
                        : 'border-slate-200 hover:border-amber-200'
                    }`}
                  >
                    {/* Course Card Header */}
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedCourseId(isExpanded ? null : course.id)
                      }
                      aria-expanded={isExpanded}
                      className="flex w-full items-start justify-between gap-4 p-5 text-left"
                    >
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="rounded-md bg-amber-50 px-2 py-0.5 text-[11px] font-bold text-[#92400e] border border-amber-200">
                            {course.degree}
                          </span>
                          <span className="text-xs font-semibold text-slate-500">
                            {course.department}
                          </span>
                        </div>
                        <h4 className="font-display mt-1.5 text-base font-bold text-[#082142] sm:text-lg">
                          {course.name}
                        </h4>
                        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
                          <span className="inline-flex items-center gap-1 font-medium">
                            <CalendarClock className="h-3.5 w-3.5 text-[#C9881A]" />
                            {course.durationLabel}
                          </span>
                          {course.intakeSeats && (
                            <span className="inline-flex items-center gap-1 font-medium">
                              <Users className="h-3.5 w-3.5 text-[#C9881A]" />
                              {course.intakeSeats} Seats
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex shrink-0 items-center gap-3">
                        <div className="hidden text-right sm:block">
                          <span className="block text-[11px] font-medium text-slate-400">
                            Tuition ({getBillingPeriodLabel(course.feeStructure.tuitionFees.period)})
                          </span>
                          <span className="font-display text-sm font-extrabold text-[#082142] tabular-nums">
                            {formatINR(course.feeStructure.tuitionFees.amount)}
                          </span>
                        </div>
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-[#C9881A]">
                          {isExpanded ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </div>
                      </div>
                    </button>

                    {/* Expanded Fee Structure */}
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.22 }}
                          className="overflow-hidden border-t border-slate-100"
                        >
                          <div className="bg-[#FAF8F5] p-5">
                            {/* Eligibility */}
                            <div className="mb-4 flex items-start gap-2 rounded-xl border border-amber-200 bg-white px-3.5 py-2.5 text-xs text-slate-600">
                              <Award className="mt-0.5 h-4 w-4 shrink-0 text-[#C9881A]" />
                              <div>
                                <span className="font-bold text-[#082142]">
                                  Eligibility:{' '}
                                </span>
                                {course.eligibility}
                              </div>
                            </div>

                            {/* Fee Breakdown */}
                            <div className="rounded-xl border border-slate-200 bg-white px-4 py-2">
                              <div className="flex items-center justify-between border-b border-slate-100 py-2.5">
                                <span className="text-xs font-bold tracking-wider text-slate-500 uppercase">
                                  Detailed Fee Breakdown
                                </span>
                                <span className="text-[11px] font-semibold text-[#C9881A]">
                                  Billing periods strictly separated
                                </span>
                              </div>

                              <FeeRow
                                title="Tuition Fees"
                                item={course.feeStructure.tuitionFees}
                              />
                              <FeeRow
                                title="Semester Fees"
                                item={course.feeStructure.semesterFees}
                              />
                              <FeeRow
                                title="Admission Fees"
                                item={course.feeStructure.admissionFees}
                              />
                              <FeeRow
                                title="Other Fees"
                                item={course.feeStructure.otherFees}
                              />
                              {course.feeStructure.hostelFees && (
                                <FeeRow
                                  title="Hostel Fees (Optional)"
                                  item={course.feeStructure.hostelFees}
                                />
                              )}
                            </div>

                            {/* Optional Hostel Toggle + Total Summary */}
                            <div className="mt-4 rounded-xl bg-[#082142] p-4 text-white">
                              {course.feeStructure.hostelFees && (
                                <label className="mb-3 flex cursor-pointer items-center justify-between border-b border-white/15 pb-3 text-xs">
                                  <span className="flex items-center gap-2 font-semibold text-slate-200">
                                    <BedDouble className="h-4 w-4 text-[#DF9D2B]" />
                                    Include Optional Hostel Fees in Total
                                  </span>
                                  <input
                                    type="checkbox"
                                    checked={includeHostel}
                                    onChange={(e) =>
                                      setIncludeHostelMap((prev) => ({
                                        ...prev,
                                        [course.id]: e.target.checked,
                                      }))
                                    }
                                    className="h-4 w-4 accent-[#DF9D2B]"
                                  />
                                </label>
                              )}

                              <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                                <div>
                                  <span className="inline-flex items-center gap-1.5 rounded-md bg-white/10 px-2 py-0.5 text-[11px] font-bold text-[#FCD34D]">
                                    <GraduationCap className="h-3.5 w-3.5" />
                                    Entire Course Duration ({course.durationLabel})
                                  </span>
                                  <p className="mt-1 text-xs text-slate-300">
                                    Calculated from {totals.semestersCount}{' '}
                                    semesters / {course.durationYears} years + one-time fees
                                  </p>
                                </div>
                                <div className="sm:text-right">
                                  <span className="block text-[11px] text-slate-300">
                                    Estimated Total Course Fees
                                  </span>
                                  <span className="font-display text-2xl font-extrabold text-[#FCD34D] tabular-nums">
                                    {formatINR(displayedTotal)}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Note + CTA */}
                            <div className="mt-4 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
                              <p className="flex items-center gap-1.5 text-[11px] text-slate-500">
                                <Info className="h-3.5 w-3.5 shrink-0 text-[#C9881A]" />
                                First-graduate &amp; government scholarships applicable.
                              </p>

                              <button
                                type="button"
                                onClick={() => onEnquireCourse(college, course)}
                                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#C9881A] to-[#DF9D2B] px-5 py-2.5 text-sm font-bold text-[#082142] shadow-sm transition-all hover:brightness-110 sm:w-auto"
                              >
                                <Send className="h-4 w-4" />
                                Enquire About This Course
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
