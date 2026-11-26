export type BillingPeriod =
  | 'per_semester'
  | 'per_year'
  | 'one_time'
  | 'entire_course';

export type CollegeType =
  | 'Engineering'
  | 'Deemed & Private University'
  | 'Paramedical & Nursing'
  | 'Law'
  | 'Agriculture'
  | 'Architecture'
  | 'Arts & Science';

export interface FeeLineItem {
  amount: number;
  period: BillingPeriod;
  label?: string;
  note?: string;
}

export interface CourseFeeStructure {
  tuitionFees: FeeLineItem;
  semesterFees: FeeLineItem;
  admissionFees: FeeLineItem;
  otherFees: FeeLineItem;
  hostelFees?: FeeLineItem;
}

export interface Course {
  id: string;
  name: string;
  degree: string;
  department: string;
  durationYears: number;
  durationLabel: string;
  intakeSeats?: number;
  eligibility: string;
  feeStructure: CourseFeeStructure;
}

export interface College {
  id: string;
  tneaCode?: string;
  name: string;
  shortName: string;
  zoneId: string;
  district: string;
  location: string;
  type: CollegeType;
  accreditation: string;
  established?: number;
  shortDescription: string;
  highlights: string[];
  logoInitials: string;
  accentHex: string;
  courses: Course[];
}

export interface Zone {
  id: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  districts: string[];
  color: string;
  highlightColor: string;
  labelPos: { x: number; y: number };
  pinPos: { x: number; y: number };
}

export interface ScholarshipItem {
  id: string;
  title: string;
  points: string[];
}

export interface AgencyConfig {
  brandName: string;
  brandTagline: string;
  phone: string;
  whatsappNumber: string;
  whatsappDisplay: string;
  email: string;
  address: string;
  officeHours: string;
  socialLinks: {
    instagram: string;
    linkedin: string;
    youtube: string;
  };
  copyrightYear: number;
}
