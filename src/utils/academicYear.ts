/**
 * Calculates the Tamil Nadu / Indian higher education admission academic year dynamically.
 *
 * Rule:
 * College admissions and counselling guidance for an academic year officially
 * open around March each year (coinciding with 12th standard Board examinations).
 *
 * - From March 1st onwards (Month >= 2, 0-indexed):
 *     Intake starts for currentYear – (currentYear + 1)
 *     e.g., March 2026 -> 2026–27
 *     e.g., March 2027 -> 2027–28 (2027–2028)
 *
 * - In January & February (Month < 2):
 *     Admissions belong to (currentYear - 1) – currentYear
 *     e.g., January/February 2027 -> 2026–27
 *
 * This ensures the year updates dynamically for all future years forever.
 */
export interface AcademicYearInfo {
  startYear: number;
  endYear: number;
  shortYear: string;        // e.g. "2026–27"
  fullYear: string;         // e.g. "2026–2028"
  badgeLabel: string;       // e.g. "2026–27 ADMISSIONS"
  badgeLabelFull: string;   // e.g. "2026–2028 ADMISSIONS"
  intakeLabel: string;      // e.g. "2026-27 Intake"
  counsellingLabel: string; // e.g. "2026-27 Counselling"
}

export function getAdmissionAcademicYear(targetDate: Date = new Date()): AcademicYearInfo {
  const currentYear = targetDate.getFullYear();
  const currentMonth = targetDate.getMonth(); // 0-indexed: 0 = Jan, 1 = Feb, 2 = Mar...

  // March (month index 2) begins the new academic admission cycle
  const startYear = currentMonth >= 2 ? currentYear : currentYear - 1;
  const endYear = startYear + 1;
  const endYearShort = String(endYear).slice(-2);

  const shortYear = `${startYear}–${endYearShort}`;
  const fullYear = `${startYear}–${endYear}`;

  return {
    startYear,
    endYear,
    shortYear,
    fullYear,
    badgeLabel: `${shortYear} ADMISSIONS`,
    badgeLabelFull: `${fullYear} ADMISSIONS`,
    intakeLabel: `${shortYear} Intake`,
    counsellingLabel: `${shortYear} Counselling`,
  };
}

export const currentAcademicYear = getAdmissionAcademicYear();
