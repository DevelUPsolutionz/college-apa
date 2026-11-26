import type { College, CollegeType, Course, ScholarshipItem, Zone } from '../types/admissions';
import excelImported from './excelImported.json';

/**
 * Agency-configured Tamil Nadu discovery zones directly matching
 * the client's "Zonal Wise College" classification.
 */
export const tamilNaduZones: Zone[] = [
  {
    id: 'chennai',
    name: 'Chennai Zone',
    shortName: 'Chennai',
    tagline: 'Chennai, Kanchipuram & Tiruvallur',
    description:
      'Autonomous engineering colleges, deemed universities, paramedical, and law institutions across Chennai & surrounding corridors.',
    districts: ['Chennai', 'Kanchipuram', 'Chengalpattu', 'Tiruvallur'],
    color: '#0D9488',
    highlightColor: '#14B8A6',
    labelPos: { x: 325, y: 78 },
    pinPos: { x: 298, y: 78 },
  },
  {
    id: 'namakkal-salem',
    name: 'Namakkal & Salem Zone',
    shortName: 'Namakkal & Salem',
    tagline: 'Salem, Namakkal & Kongu North',
    description:
      'Leading autonomous engineering, nursing, and agricultural colleges across Namakkal, Tiruchengode, and Salem.',
    districts: ['Namakkal', 'Salem'],
    color: '#2563EB',
    highlightColor: '#3B82F6',
    labelPos: { x: 162, y: 152 },
    pinPos: { x: 174, y: 162 },
  },
  {
    id: 'coimbatore',
    name: 'Coimbatore Zone',
    shortName: 'Coimbatore',
    tagline: 'Coimbatore, Erode & Tiruppur',
    description:
      'Top-ranked autonomous engineering, allied health, law, and university campuses across the Coimbatore industrial hub.',
    districts: ['Coimbatore', 'Erode', 'Tiruppur'],
    color: '#0284C7',
    highlightColor: '#38BDF8',
    labelPos: { x: 96, y: 226 },
    pinPos: { x: 112, y: 235 },
  },
  {
    id: 'trichy',
    name: 'Trichy, Perambalur & Ariyalur',
    shortName: 'Trichy Region',
    tagline: 'Tiruchirappalli, Perambalur & Ariyalur',
    description:
      'Central Tamil Nadu engineering, medical, paramedical, and agricultural institutions across Trichy, Perambalur, and Ariyalur.',
    districts: ['Tiruchirappalli', 'Perambalur', 'Ariyalur', 'Cuddalore'],
    color: '#0F766E',
    highlightColor: '#2DD4BF',
    labelPos: { x: 196, y: 256 },
    pinPos: { x: 196, y: 266 },
  },
  {
    id: 'thanjavur',
    name: 'Thanjavur & Nagapattinam',
    shortName: 'Thanjavur & Delta',
    tagline: 'Thanjavur, Kumbakonam & Nagapattinam',
    description:
      'Heritage universities, engineering, and paramedical campuses across Thanjavur, Kumbakonam, Thiruvarur, and Nagapattinam.',
    districts: ['Thanjavur', 'Nagapattinam', 'Thiruvarur'],
    color: '#1D4ED8',
    highlightColor: '#60A5FA',
    labelPos: { x: 274, y: 252 },
    pinPos: { x: 258, y: 260 },
  },
  {
    id: 'other',
    name: 'South & Other Districts',
    shortName: 'South & Others',
    tagline: 'Tirunelveli, Kanyakumari, Vellore & More',
    description:
      'Distinguished institutions across Tirunelveli, Thoothukudi, Kanyakumari, Pudukkottai, Vellore, Virudhunagar, and Dindigul.',
    districts: [
      'Tirunelveli',
      'Thoothukudi',
      'Kanyakumari',
      'Pudukkottai',
      'Vellore',
      'Virudhunagar',
      'Dindigul',
    ],
    color: '#0369A1',
    highlightColor: '#0EA5E9',
    labelPos: { x: 145, y: 382 },
    pinPos: { x: 152, y: 374 },
  },
];

function getInitials(name: string): string {
  const words = name
    .replace(/[^A-Za-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 1 && !['of', 'and', 'for', 'the', 'in'].includes(w.toLowerCase()));
  if (words.length >= 2) {
    return (words[0][0] + words[1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

function buildCoursesForType(type: CollegeType, seedIndex: number): Course[] {
  const {
    engineeringCourses,
    artsCourses,
    alliedHealthCourses,
    nursingCourses,
    pharmacyCourses,
    physioCourses,
    lawCourses,
  } = excelImported.coursesCatalog;

  const tuitionOffset = (seedIndex % 5) * 3500;

  if (type === 'Engineering') {
    const picked = engineeringCourses.slice(0, 6);
    return picked.map((name, idx) => ({
      id: `eng-${seedIndex}-${idx}`,
      name,
      degree: 'B.E. / B.Tech',
      department: 'Engineering & Technology',
      durationYears: 4,
      durationLabel: '4 Years (8 Semesters)',
      eligibility: '10+2 with Physics, Chemistry & Mathematics (TNEA / Management)',
      feeStructure: {
        tuitionFees: { amount: 42500 + tuitionOffset + idx * 2500, period: 'per_semester', note: 'Academic tuition' },
        semesterFees: { amount: 6500, period: 'per_semester', note: 'Lab, library & exam fee' },
        admissionFees: { amount: 12000, period: 'one_time', note: 'Registration & caution deposit' },
        otherFees: { amount: 8500, period: 'per_year', label: 'Placement & Skill Training' },
        hostelFees: { amount: 72000, period: 'per_year', note: 'Optional residential + mess' },
      },
    }));
  }

  if (type === 'Deemed & Private University') {
    return [
      ...engineeringCourses.slice(0, 4).map((name, idx) => ({
        id: `deemed-eng-${seedIndex}-${idx}`,
        name,
        degree: 'B.Tech / B.E.',
        department: 'Engineering & Computing',
        durationYears: 4,
        durationLabel: '4 Years (8 Semesters)',
        eligibility: '10+2 PCM + University Entrance / Merit',
        feeStructure: {
          tuitionFees: { amount: 95000 + tuitionOffset + idx * 5000, period: 'per_semester' as const },
          semesterFees: { amount: 9500, period: 'per_semester' as const, note: 'Exam & digital lab' },
          admissionFees: { amount: 20000, period: 'one_time' as const },
          otherFees: { amount: 15000, period: 'per_year' as const, label: 'Global Immersion & Placement' },
          hostelFees: { amount: 98000, period: 'per_year' as const, note: 'AC / Non-AC options' },
        },
      })),
      ...artsCourses.slice(0, 3).map((name, idx) => ({
        id: `deemed-arts-${seedIndex}-${idx}`,
        name,
        degree: 'UG Honours (B.Sc / BBA / B.Com)',
        department: 'Arts, Science & Management',
        durationYears: 3,
        durationLabel: '3 Years (6 Semesters)',
        eligibility: '10+2 Any Stream / Relevant Subject',
        feeStructure: {
          tuitionFees: { amount: 48000 + idx * 3000, period: 'per_semester' as const },
          semesterFees: { amount: 5500, period: 'per_semester' as const },
          admissionFees: { amount: 10000, period: 'one_time' as const },
          otherFees: { amount: 8000, period: 'per_year' as const, label: 'Certification & Lab' },
          hostelFees: { amount: 88000, period: 'per_year' as const },
        },
      })),
    ];
  }

  if (type === 'Paramedical & Nursing') {
    return [
      ...alliedHealthCourses.slice(0, 4).map((name, idx) => ({
        id: `ahs-${seedIndex}-${idx}`,
        name,
        degree: 'B.Sc. Allied Health Science',
        department: 'Allied Health Science',
        durationYears: 4,
        durationLabel: '3 Years + 1 Year Internship',
        eligibility: '10+2 with Physics, Chemistry & Biology',
        feeStructure: {
          tuitionFees: { amount: 88000 + tuitionOffset, period: 'per_year' as const },
          semesterFees: { amount: 5500, period: 'per_semester' as const },
          admissionFees: { amount: 15000, period: 'one_time' as const },
          otherFees: { amount: 9500, period: 'per_year' as const, label: 'Clinical Posting & Uniform' },
          hostelFees: { amount: 76000, period: 'per_year' as const },
        },
      })),
      ...nursingCourses.slice(0, 2).map((name, idx) => ({
        id: `nurs-${seedIndex}-${idx}`,
        name,
        degree: 'Nursing Programme',
        department: 'School of Nursing',
        durationYears: 4,
        durationLabel: '4 Years',
        eligibility: '10+2 with PCB (Min. 45–50%)',
        feeStructure: {
          tuitionFees: { amount: 92000 + tuitionOffset, period: 'per_year' as const },
          semesterFees: { amount: 5000, period: 'per_semester' as const },
          admissionFees: { amount: 15000, period: 'one_time' as const },
          otherFees: { amount: 10000, period: 'per_year' as const, label: 'Hospital Training' },
          hostelFees: { amount: 78000, period: 'per_year' as const },
        },
      })),
      ...pharmacyCourses.slice(0, 2).map((name, idx) => ({
        id: `pharm-${seedIndex}-${idx}`,
        name,
        degree: 'Pharmacy',
        department: 'Pharmacy',
        durationYears: 4,
        durationLabel: '4 Years',
        eligibility: '10+2 PCM / PCB',
        feeStructure: {
          tuitionFees: { amount: 105000 + tuitionOffset, period: 'per_year' as const },
          semesterFees: { amount: 6000, period: 'per_semester' as const },
          admissionFees: { amount: 18000, period: 'one_time' as const },
          otherFees: { amount: 11000, period: 'per_year' as const, label: 'Pharma Lab Kit' },
          hostelFees: { amount: 78000, period: 'per_year' as const },
        },
      })),
      ...physioCourses.slice(0, 1).map((name, idx) => ({
        id: `physio-${seedIndex}-${idx}`,
        name,
        degree: 'BPT',
        department: 'Physiotherapy',
        durationYears: 4.5,
        durationLabel: '4.5 Years (incl. Internship)',
        eligibility: '10+2 PCB',
        feeStructure: {
          tuitionFees: { amount: 90000, period: 'per_year' as const },
          semesterFees: { amount: 5000, period: 'per_semester' as const },
          admissionFees: { amount: 15000, period: 'one_time' as const },
          otherFees: { amount: 9000, period: 'per_year' as const, label: 'Rehab Clinic Fee' },
          hostelFees: { amount: 76000, period: 'per_year' as const },
        },
      })),
    ];
  }

  if (type === 'Law') {
    return lawCourses.map((name, idx) => ({
      id: `law-${seedIndex}-${idx}`,
      name,
      degree: 'Integrated Law (5 Years)',
      department: 'School of Law',
      durationYears: 5,
      durationLabel: '5 Years (10 Semesters)',
      eligibility: '10+2 Any Stream (Min. 45%) + CLAT / University Merit',
      feeStructure: {
        tuitionFees: { amount: 65000 + tuitionOffset, period: 'per_semester' },
        semesterFees: { amount: 6000, period: 'per_semester', note: 'Moot court & library' },
        admissionFees: { amount: 15000, period: 'one_time' },
        otherFees: { amount: 10000, period: 'per_year', label: 'Bar Council & Legal Aid' },
        hostelFees: { amount: 84000, period: 'per_year' },
      },
    }));
  }

  if (type === 'Agriculture') {
    return [
      {
        id: `agri-${seedIndex}-0`,
        name: 'B.Sc. (Hons.) Agriculture',
        degree: 'Bachelor of Science (Agriculture)',
        department: 'Agricultural Sciences',
        durationYears: 4,
        durationLabel: '4 Years (8 Semesters)',
        eligibility: '10+2 PCB / Agriculture (TNAU / Merit)',
        feeStructure: {
          tuitionFees: { amount: 62000 + tuitionOffset, period: 'per_semester' },
          semesterFees: { amount: 6500, period: 'per_semester', note: 'Field farm & lab' },
          admissionFees: { amount: 15000, period: 'one_time' },
          otherFees: { amount: 11000, period: 'per_year', label: 'RAWE Field Programme' },
          hostelFees: { amount: 74000, period: 'per_year' },
        },
      },
    ];
  }

  // Architecture
  return [
    {
      id: `arch-${seedIndex}-0`,
      name: 'B.Arch (Bachelor of Architecture)',
      degree: 'Bachelor of Architecture',
      department: 'Architecture & Design',
      durationYears: 5,
      durationLabel: '5 Years (10 Semesters)',
      eligibility: '10+2 PCM + NATA Valid Score',
      feeStructure: {
        tuitionFees: { amount: 75000 + tuitionOffset, period: 'per_semester' },
        semesterFees: { amount: 8000, period: 'per_semester', note: 'Design studio & CAD' },
        admissionFees: { amount: 18000, period: 'one_time' },
        otherFees: { amount: 12000, period: 'per_year', label: 'Model Making & Studio' },
        hostelFees: { amount: 86000, period: 'per_year' },
      },
    },
  ];
}

const accentPalette = ['#0B1F3A', '#0D9488', '#1D4ED8', '#0F766E', '#0369A1'];

const rawColleges = [
  ...excelImported.zonalColleges,
  ...excelImported.deemedColleges,
  ...excelImported.paramedicalColleges,
  ...excelImported.lawAgriArchColleges,
];

export const collegesData: College[] = rawColleges.map((item, idx) => {
  const type = item.type as CollegeType;
  const isAuto = item.name.toLowerCase().includes('autonomous');
  const code = 'code' in item && item.code ? String(item.code) : undefined;

  return {
    id: `col-${idx}-${item.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 32)}`,
    tneaCode: code,
    name: item.name,
    shortName: item.name.split('(')[0].trim(),
    zoneId: item.zoneId,
    district: item.district,
    location: item.location,
    type,
    accreditation: isAuto
      ? 'Autonomous • AICTE / Anna Univ.'
      : type === 'Deemed & Private University'
        ? 'UGC Recognized University'
        : type === 'Paramedical & Nursing'
          ? 'INC / PCI / TN Medical Univ.'
          : type === 'Law'
            ? 'BCI Approved'
            : type === 'Agriculture'
              ? 'TNAU / ICAR Aligned'
              : type === 'Architecture'
                ? 'COA & NATA Approved'
                : 'Anna University Affiliated',
    shortDescription: `${item.name} in ${item.district} offering accredited ${type.toLowerCase()} programmes with College APA admission & scholarship guidance.`,
    highlights: [
      code ? `TNEA Code: ${code}` : `${type} Campus`,
      `${item.district} District`,
      'Scholarship Eligible',
    ],
    logoInitials: getInitials(item.name),
    accentHex: accentPalette[idx % accentPalette.length],
    courses: buildCoursesForType(type, idx),
  };
});

export const scholarshipsData: ScholarshipItem[] = excelImported.scholarships;

export const aboutAgencyData = excelImported.about;

export const allEngineeringDirectory = excelImported.allEnggDirectory;

export const counsellingStreams = [
  'TNEA (Engineering Counselling)',
  'TNAU (Agriculture Counselling)',
  'TN Medical Selection',
  'B.Sc Nursing, B.Pharm, Pharm.D',
  'MBBS, BDS, BHMS, BSMS, BUMS, BAMS, BNYS',
];
