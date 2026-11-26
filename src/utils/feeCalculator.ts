import type { BillingPeriod, Course, FeeLineItem } from '../types/admissions';

const inrFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

export function formatINR(amount: number): string {
  return inrFormatter.format(amount);
}

export function getBillingPeriodLabel(period: BillingPeriod): string {
  switch (period) {
    case 'per_semester':
      return 'Per Semester';
    case 'per_year':
      return 'Per Year';
    case 'one_time':
      return 'One-Time';
    case 'entire_course':
      return 'Entire Course Duration';
  }
}

export function getBillingPeriodBadgeClass(period: BillingPeriod): string {
  switch (period) {
    case 'per_semester':
      return 'bg-[#EFF6FF] text-[#1D4ED8] border-[#BFDBFE]';
    case 'per_year':
      return 'bg-[#F0FDFA] text-[#0F766E] border-[#99F6E4]';
    case 'one_time':
      return 'bg-[#FEF3C7] text-[#92400E] border-[#FDE68A]';
    case 'entire_course':
      return 'bg-[#0B1F3A] text-white border-[#0B1F3A]';
  }
}

function expandFeeOverCourse(
  item: FeeLineItem,
  durationYears: number,
  semestersCount: number
): number {
  switch (item.period) {
    case 'per_semester':
      return item.amount * semestersCount;
    case 'per_year':
      return item.amount * durationYears;
    case 'one_time':
    case 'entire_course':
      return item.amount;
  }
}

export interface CourseFeeTotals {
  semestersCount: number;
  academicTotal: number;
  hostelTotal: number;
  grandTotalWithHostel: number;
}

export function calculateCourseFeeTotals(course: Course): CourseFeeTotals {
  const semestersCount = Math.round(course.durationYears * 2);
  const { tuitionFees, semesterFees, admissionFees, otherFees, hostelFees } =
    course.feeStructure;

  const academicTotal =
    expandFeeOverCourse(tuitionFees, course.durationYears, semestersCount) +
    expandFeeOverCourse(semesterFees, course.durationYears, semestersCount) +
    expandFeeOverCourse(admissionFees, course.durationYears, semestersCount) +
    expandFeeOverCourse(otherFees, course.durationYears, semestersCount);

  const hostelTotal = hostelFees
    ? expandFeeOverCourse(hostelFees, course.durationYears, semestersCount)
    : 0;

  return {
    semestersCount,
    academicTotal,
    hostelTotal,
    grandTotalWithHostel: academicTotal + hostelTotal,
  };
}

