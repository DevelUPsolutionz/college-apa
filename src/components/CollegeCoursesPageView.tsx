import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowLeft,
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
  PhoneCall,
  Send,
  Users,
} from 'lucide-react';
import { agencyConfig } from '../data/agencyConfig';
import type { College, Course, FeeLineItem } from '../types/admissions';
import {
  calculateCourseFeeTotals,
  formatINR,
  getBillingPeriodBadgeClass,
  getBillingPeriodLabel,
} from '../utils/feeCalculator';

interface CollegeCoursesPageViewProps {
  college: College;
  onBackToColleges: () => void;
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
        <p className="text-sm font-semibold text-slate-800">
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
        <span className="font-display min-w-[92px] text-right text-sm font-black text-[#0F2239] tabular-nums">
          {formatINR(item.amount)}
        </span>
      </div>
    </div>
  );
}

export function CollegeCoursesPageView({
  college,
  onBackToColleges,
  onEnquireCourse,
}: CollegeCoursesPageViewProps) {
  const [expandedCourseId, setExpandedCourseId] = useState<string | null>(
    college.courses[0]?.id ?? null
  );
  const [includeHostelMap, setIncludeHostelMap] = useState<Record<string, boolean>>({});
  const [selectedDept, setSelectedDept] = useState<string>('All');

  const departments = [
    'All',
    ...Array.from(new Set(college.courses.map((c) => c.department))),
  ];

  const visibleCourses =
    selectedDept === 'All'
      ? college.courses
      : college.courses.filter((c) => c.department === selectedDept);

  return (
    <div className="py-10 sm:py-14 bg-[#F8FAFC] min-h-[75vh]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Navigation Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-6">
          <button
            type="button"
            onClick={onBackToColleges}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-[#0F2239] shadow-xs hover:bg-slate-50 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Colleges List
          </button>

          <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3.5 py-1 text-xs font-semibold text-slate-700">
            Official Course &amp; Fee Structure
          </span>
        </div>

        {/* College Header Hero Card */}
        <div className="mt-6 rounded-3xl border border-slate-200 bg-[#0F2239] p-6 text-white shadow-xl sm:p-8">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div className="flex items-start gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-xl font-black text-[#0F2239] shadow-md bg-white">
                {college.logoInitials}
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  {college.tneaCode && (
                    <span className="rounded-full bg-white/20 px-3 py-0.5 text-xs font-bold text-white">
                      TNEA CODE: {college.tneaCode}
                    </span>
                  )}
                  <span className="rounded-full bg-white/10 px-3 py-0.5 text-xs font-medium text-slate-300">
                    {college.type}
                  </span>
                </div>
                <h1 className="font-display mt-2 text-2xl font-black sm:text-3xl lg:text-4xl text-white">
                  {college.name}
                </h1>
                <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-300">
                  <MapPin className="h-4 w-4 text-amber-400" />
                  {college.location}, {college.district} District • {college.accreditation}
                </p>
              </div>
            </div>

            <div className="shrink-0 flex flex-col sm:items-end gap-2">
              <div className="text-left sm:text-right">
                <span className="block text-2xl font-black text-white tabular-nums">
                  {college.courses.length}
                </span>
                <span className="block text-xs font-semibold text-slate-300">
                  Verified Courses
                </span>
              </div>
              <a
                href={`tel:${agencyConfig.phone.replace(/\s+/g, '')}`}
                className="inline-flex items-center gap-2 rounded-xl bg-white/10 border border-white/20 px-4 py-2 text-xs font-bold text-white hover:bg-white/20 transition-colors"
              >
                <PhoneCall className="h-3.5 w-3.5 text-amber-400" />
                Call Dr. B. Ramesh
              </a>
            </div>
          </div>
        </div>

        {/* Highlights Bar */}
        <div className="mt-6 flex flex-wrap gap-2 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider py-1 px-1">
            Campus Highlights:
          </span>
          {college.highlights.map((h) => (
            <span
              key={h}
              className="inline-flex items-center gap-1.5 rounded-lg bg-slate-50 border border-slate-200 px-3 py-1 text-xs font-bold text-[#0F2239]"
            >
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
              {h}
            </span>
          ))}
        </div>

        {/* Department Filters */}
        <div className="mt-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <h2 className="font-display text-xl font-black text-[#0F2239] sm:text-2xl flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-[#0F2239]" />
            Courses &amp; Fee Structures ({visibleCourses.length})
          </h2>

          {departments.length > 2 && (
            <div className="flex flex-wrap gap-2">
              {departments.map((dept) => (
                <button
                  key={dept}
                  type="button"
                  onClick={() => setSelectedDept(dept)}
                  className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition-colors ${
                    selectedDept === dept
                      ? 'bg-[#0F2239] text-white'
                      : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Expandable Course Cards */}
        <div className="mt-6 space-y-4">
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
                className={`overflow-hidden rounded-3xl border bg-white transition-all ${
                  isExpanded
                    ? 'border-[#0F2239] shadow-md'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                {/* Header */}
                <button
                  type="button"
                  onClick={() => setExpandedCourseId(isExpanded ? null : course.id)}
                  aria-expanded={isExpanded}
                  className="flex w-full items-start justify-between gap-4 p-5 sm:p-6 text-left"
                >
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-md bg-slate-100 border border-slate-200 px-2.5 py-0.5 text-xs font-bold text-[#0F2239]">
                        {course.degree}
                      </span>
                      <span className="text-xs font-semibold text-slate-500">
                        {course.department}
                      </span>
                    </div>

                    <h3 className="font-display mt-2 text-lg font-bold text-[#0F2239] sm:text-xl">
                      {course.name}
                    </h3>

                    <div className="mt-2.5 flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-slate-500">
                      <span className="inline-flex items-center gap-1 font-semibold">
                        <CalendarClock className="h-4 w-4 text-slate-400" />
                        {course.durationLabel}
                      </span>
                      {course.intakeSeats && (
                        <span className="inline-flex items-center gap-1 font-semibold">
                          <Users className="h-4 w-4 text-slate-400" />
                          {course.intakeSeats} Seats Available
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-4">
                    <div className="hidden text-right sm:block">
                      <span className="block text-xs font-medium text-slate-400">
                        Tuition ({getBillingPeriodLabel(course.feeStructure.tuitionFees.period)})
                      </span>
                      <span className="font-display text-base font-black text-[#0F2239] tabular-nums">
                        {formatINR(course.feeStructure.tuitionFees.amount)}
                      </span>
                    </div>
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-[#0F2239]">
                      {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                    </div>
                  </div>
                </button>

                {/* Expanded Fee Details */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22 }}
                      className="border-t border-slate-100 bg-[#FAF8F5] p-5 sm:p-7"
                    >
                      {/* Eligibility Box */}
                      <div className="mb-5 flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-xs text-slate-700">
                        <Award className="mt-0.5 h-5 w-5 shrink-0 text-[#0F2239]" />
                        <div>
                          <span className="font-bold text-[#0F2239]">Eligibility Criteria: </span>
                          {course.eligibility}
                        </div>
                      </div>

                      {/* Fee Breakdown Table */}
                      <div className="rounded-2xl border border-slate-200 bg-white px-5 py-3 shadow-xs">
                        <div className="flex items-center justify-between border-b border-slate-100 py-3">
                          <span className="text-xs font-bold tracking-wider text-slate-500 uppercase">
                            Course Fee Line Items
                          </span>
                          <span className="text-xs font-semibold text-slate-400">
                            Billing periods clearly separated
                          </span>
                        </div>

                        <FeeRow title="Tuition Fees" item={course.feeStructure.tuitionFees} />
                        <FeeRow title="Semester Fees" item={course.feeStructure.semesterFees} />
                        <FeeRow title="Admission Fees" item={course.feeStructure.admissionFees} />
                        <FeeRow title="Other Fees" item={course.feeStructure.otherFees} />
                        {course.feeStructure.hostelFees && (
                          <FeeRow title="Hostel Fees (Optional)" item={course.feeStructure.hostelFees} />
                        )}
                      </div>

                      {/* Total Course Duration Card */}
                      <div className="mt-5 rounded-2xl bg-[#0F2239] p-5 text-white shadow-md">
                        {course.feeStructure.hostelFees && (
                          <label className="mb-3.5 flex cursor-pointer items-center justify-between border-b border-white/15 pb-3.5 text-xs">
                            <span className="flex items-center gap-2 font-bold text-slate-200">
                              <BedDouble className="h-4 w-4 text-amber-400" />
                              Include Optional Hostel Accommodation in Total
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
                              className="h-4 w-4 accent-amber-400"
                            />
                          </label>
                        )}

                        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                          <div>
                            <span className="inline-flex items-center gap-1.5 rounded-md bg-white/10 px-2.5 py-0.5 text-xs font-bold text-slate-200">
                              <GraduationCap className="h-4 w-4" />
                              Entire Course Duration ({course.durationLabel})
                            </span>
                            <p className="mt-1 text-xs text-slate-300">
                              Calculated across {totals.semestersCount} semesters / {course.durationYears} years + one-time fees.
                            </p>
                          </div>
                          <div className="sm:text-right">
                            <span className="block text-xs text-slate-300">
                              Estimated Total Course Fees
                            </span>
                            <span className="font-display text-2xl font-black text-white tabular-nums sm:text-3xl">
                              {formatINR(displayedTotal)}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* CTA */}
                      <div className="mt-5 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
                        <p className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                          <Info className="h-4 w-4 shrink-0 text-slate-400" />
                          First Graduate, 7.5% Govt Quota &amp; PMSS scholarships can be claimed.
                        </p>

                        <button
                          type="button"
                          onClick={() => onEnquireCourse(college, course)}
                          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#0F2239] px-6 py-3 text-sm font-bold text-white shadow-sm transition-all hover:bg-[#1A365D] sm:w-auto"
                        >
                          <Send className="h-4 w-4" />
                          Enquire About This Course &rarr;
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
