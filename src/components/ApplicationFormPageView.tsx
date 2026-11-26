import { useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CheckCircle2,
  FileCheck2,
  GraduationCap,
  MessageCircle,
  Phone,
  Printer,
  ShieldCheck,
  User,
  Users,
} from 'lucide-react';
import { agencyConfig } from '../data/agencyConfig';
import { collegesData, tamilNaduZones } from '../data/tamilNaduData';
import type { College, Course } from '../types/admissions';
import { currentAcademicYear } from '../utils/academicYear';

interface ApplicationFormPageViewProps {
  initialCollege?: College | null;
  initialCourse?: Course | null;
  onBack: () => void;
}

export function ApplicationFormPageView({
  initialCollege,
  initialCourse,
  onBack,
}: ApplicationFormPageViewProps) {
  // Pre-selected or chosen zone, college, and course
  const [selectedZoneId, setSelectedZoneId] = useState<string>(
    initialCollege?.zoneId || ''
  );
  const [selectedCollegeId, setSelectedCollegeId] = useState<string>(
    initialCollege?.id || ''
  );
  const [selectedCourseId, setSelectedCourseId] = useState<string>(
    initialCourse?.id || ''
  );

  // Filter colleges based on chosen zone (or show all if no zone is chosen yet)
  const filteredColleges = useMemo(() => {
    if (!selectedZoneId) return collegesData;
    return collegesData.filter((c) => c.zoneId === selectedZoneId);
  }, [selectedZoneId]);

  const selectedCollege = useMemo(
    () => collegesData.find((c) => c.id === selectedCollegeId) || null,
    [selectedCollegeId]
  );

  const availableCourses = useMemo(
    () => selectedCollege?.courses || [],
    [selectedCollege]
  );

  const selectedCourse = useMemo(
    () => availableCourses.find((c) => c.id === selectedCourseId) || null,
    [availableCourses, selectedCourseId]
  );

  // Form Fields State
  const [studentName, setStudentName] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [fatherOccupation, setFatherOccupation] = useState('');
  const [motherName, setMotherName] = useState('');
  const [motherOccupation, setMotherOccupation] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [gender, setGender] = useState<'Male' | 'Female' | 'Other'>('Male');
  const [dob, setDob] = useState('');
  const [twelfthGroup, setTwelfthGroup] = useState('Bio-Maths');
  const [contact1, setContact1] = useState('');
  const [contact2, setContact2] = useState('');
  const [community, setCommunity] = useState('BC');
  const [aadharNumber, setAadharNumber] = useState('');

  // 10th Standard Details
  const [tenthSchoolName, setTenthSchoolName] = useState('');
  const [tenthSchoolBoard, setTenthSchoolBoard] = useState('State Board');
  const [tenthYearOfPassing, setTenthYearOfPassing] = useState('2024');
  const [tenthMark, setTenthMark] = useState('');

  // 12th Standard Details
  const [twelfthSchoolName, setTwelfthSchoolName] = useState('');
  const [twelfthSchoolBoard, setTwelfthSchoolBoard] = useState('State Board');
  const [twelfthYearOfPassing, setTwelfthYearOfPassing] = useState('2026');
  const [twelfthMark, setTwelfthMark] = useState('');

  // Other Details
  const [firstGraduate, setFirstGraduate] = useState<'Yes' | 'No'>('No');
  const [bloodGroup, setBloodGroup] = useState('O+');
  const [religion, setReligion] = useState('Hindu');
  const [nationality, setNationality] = useState('Indian');
  const [email, setEmail] = useState('');
  const [hostel, setHostel] = useState<'Yes' | 'No'>('No');

  // Documents Ready Checklist
  const [documents, setDocuments] = useState<Record<string, boolean>>({
    '10th Mark Sheet': true,
    '12th Mark Sheet': true,
    'Transfer Certificate (TC)': true,
    'Community Certificate': true,
    'Income Certificate': false,
    'Aadhar Card': true,
    'Passport Size Photo': true,
  });

  const [submittedSlip, setSubmittedSlip] = useState<{
    refId: string;
    date: string;
  } | null>(null);

  const [validationError, setValidationError] = useState('');

  const handleDocumentToggle = (docName: string) => {
    setDocuments((prev) => ({ ...prev, [docName]: !prev[docName] }));
  };

  // Build the complete, beautifully structured WhatsApp Application payload
  const buildWhatsAppMessage = () => {
    const docsReady = Object.entries(documents)
      .filter(([, checked]) => checked)
      .map(([name]) => name);

    return `🎓 *TAMIL NADU ADMISSION APPLICATION — ${currentAcademicYear.shortYear}*
*College APA Educational Guidance Centre*
Chief Counsellor: Dr. B. Ramesh (+91 99528 87324)
━━━━━━━━━━━━━━━━━━━━━━━━━━
🏛️ *PREFERRED INSTITUTION & COURSE:*
• *College:* ${selectedCollege?.name || 'Selected Institution'}
• *District:* ${selectedCollege?.district || 'Tamil Nadu'}
• *Course Applied:* ${selectedCourse?.name || 'Undergraduate Stream'}
• *Hostel Required:* ${hostel}

👤 *STUDENT PERSONAL DETAILS:*
• *Student Name:* ${studentName}
• *Gender:* ${gender}
• *Date of Birth:* ${dob || 'Not specified'}
• *Blood Group:* ${bloodGroup}
• *Community:* ${community}
• *Aadhar Number:* ${aadharNumber || 'Pending'}
• *Religion:* ${religion} | *Nationality:* ${nationality}

👨‍👩‍👦 *PARENT / GUARDIAN DETAILS:*
• *Father's Name:* ${fatherName || 'N/A'}
• *Father's Occupation:* ${fatherOccupation || 'N/A'}
• *Mother's Name:* ${motherName || 'N/A'}
• *Mother's Occupation:* ${motherOccupation || 'N/A'}

📞 *CONTACT & ADDRESS:*
• *Primary Mobile:* ${contact1}
• *Alternate Mobile:* ${contact2 || 'N/A'}
• *Email ID:* ${email || 'N/A'}
• *Residential Address:* ${address || 'N/A'}
• *Pincode:* ${pincode || 'N/A'}

📚 *12th STANDARD (HSC) DETAILS:*
• *12th Group:* ${twelfthGroup}
• *School Name:* ${twelfthSchoolName || 'N/A'}
• *Board:* ${twelfthSchoolBoard}
• *Year of Passing:* ${twelfthYearOfPassing}
• *Marks / Cutoff / %:* ${twelfthMark || 'Appearing'}

📖 *10th STANDARD (SSLC) DETAILS:*
• *School Name:* ${tenthSchoolName || 'N/A'}
• *Board:* ${tenthSchoolBoard}
• *Year of Passing:* ${tenthYearOfPassing}
• *Marks & Percentage:* ${tenthMark || 'N/A'}

⭐ *QUOTAS & CONCESSIONS:*
• *First Graduate:* ${firstGraduate} (Eligible for Govt Fee Concession)

📁 *DOCUMENTS READY:*
${docsReady.length > 0 ? docsReady.map((d) => `  ✓ ${d}`).join('\n') : '  None selected yet'}
━━━━━━━━━━━━━━━━━━━━━━━━━━
_Kindly review this application and guide me on admission procedure, transparent fee structure, and seat confirmation._`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedCollegeId) {
      setValidationError('Please choose your target college.');
      window.scrollTo({ top: 250, behavior: 'smooth' });
      return;
    }

    if (!selectedCourseId) {
      setValidationError('Please choose your applied course.');
      window.scrollTo({ top: 250, behavior: 'smooth' });
      return;
    }

    if (!studentName.trim()) {
      setValidationError('Please enter the student full name.');
      window.scrollTo({ top: 350, behavior: 'smooth' });
      return;
    }

    const cleanPhone = contact1.replace(/\D/g, '');
    if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      setValidationError('Please enter a valid 10-digit primary contact number.');
      window.scrollTo({ top: 400, behavior: 'smooth' });
      return;
    }

    setValidationError('');

    const refId = `APA-${new Date().getFullYear()}-${Math.floor(
      100000 + Math.random() * 900000
    )}`;
    const dateStr = new Date().toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

    setSubmittedSlip({ refId, date: dateStr });

    // Open WhatsApp API immediately
    const message = buildWhatsAppMessage();
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${
      agencyConfig.whatsappNumber
    }&text=${encodeURIComponent(message)}`;

    // Open WhatsApp in a new tab, fallback to direct redirection if popup blocked
    const opened = window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    if (!opened) {
      window.location.href = whatsappUrl;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24 pt-6 sm:pt-10">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Top Back Navigation */}
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 shadow-xs hover:border-[#1D4ED8] hover:text-[#1D4ED8] transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Previous View</span>
        </button>

        {/* Application Header Card */}
        <div className="mt-4 overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 border-b border-slate-100 pb-6">
            <div className="flex items-center gap-4">
              <img
                src="/college-apa-logo.png"
                alt="College APA"
                className="h-12 w-auto object-contain"
              />
              <div>
                <span className="text-xs font-bold tracking-wider text-[#1D4ED8] uppercase">
                  Official Admission Desk • {currentAcademicYear.shortYear}
                </span>
                <h1 className="font-display text-2xl sm:text-3xl font-black text-[#0F2239]">
                  Student Admission Application Form
                </h1>
                <p className="text-xs text-slate-500">
                  College APA Educational Information &amp; Guidance Centre • Chief Counsellor: Dr. B. Ramesh
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={`tel:${agencyConfig.phone.replace(/\s+/g, '')}`}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <Phone className="h-3.5 w-3.5 text-[#1D4ED8]" />
                <span>Call Helpline: {agencyConfig.phone}</span>
              </a>
            </div>
          </div>

          {/* Selected College & Course Notification Banner */}
          {selectedCollege && selectedCourse && (
            <div className="mt-6 rounded-2xl bg-blue-50 border border-blue-100 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#1D4ED8] text-white">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-[#1D4ED8] uppercase tracking-wider">
                    Target Institution &amp; Degree
                  </span>
                  <h2 className="font-display text-base sm:text-lg font-bold text-[#0F2239]">
                    {selectedCollege.name} ({selectedCollege.district})
                  </h2>
                  <p className="text-xs text-slate-600">
                    Applying for: <strong className="text-[#0F2239]">{selectedCourse.name}</strong> •{' '}
                    {selectedCourse.durationLabel}
                  </p>
                </div>
              </div>
              <div className="shrink-0 text-left sm:text-right">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Direct Seat Verification
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Validation Error Alert */}
        {validationError && (
          <div className="mt-4 rounded-2xl bg-rose-50 border border-rose-200 p-4 text-xs font-bold text-rose-700">
            ⚠ {validationError}
          </div>
        )}

        {/* Success Modal / Slip if submitted */}
        {submittedSlip && (
          <div className="mt-6 overflow-hidden rounded-3xl border-2 border-emerald-500 bg-white p-6 sm:p-8 shadow-xl">
            <div className="flex flex-col items-center text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <span className="mt-3 text-xs font-bold text-emerald-700 uppercase tracking-wider">
                Application Submitted Successfully
              </span>
              <h2 className="font-display mt-1 text-2xl font-black text-[#0F2239]">
                Application Sent to Dr. B. Ramesh on WhatsApp
              </h2>
              <p className="mt-2 max-w-lg text-sm text-slate-600">
                Your full student profile has been compiled and forwarded to our Chief Counsellor WhatsApp desk.
                Your provisional Reference ID is:
              </p>
              <div className="mt-3 rounded-xl bg-slate-100 px-5 py-2 font-mono text-base font-extrabold text-[#0F2239]">
                {submittedSlip.refId}
              </div>

              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-xs font-bold text-slate-700 shadow-xs hover:bg-slate-50"
                >
                  <Printer className="h-4 w-4" />
                  <span>Print Application Summary</span>
                </button>

                <a
                  href={`https://api.whatsapp.com/send?phone=${
                    agencyConfig.whatsappNumber
                  }&text=${encodeURIComponent(buildWhatsAppMessage())}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-5 py-2.5 text-xs font-extrabold text-white shadow-md hover:bg-[#20ba5a]"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Re-open WhatsApp Message</span>
                </a>

                <button
                  type="button"
                  onClick={() => setSubmittedSlip(null)}
                  className="rounded-xl border border-slate-200 bg-slate-50 px-5 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Edit Details
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            MAIN MULTI-PART APPLICATION FORM
            ======================================================== */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          {/* SECTION 1: COURSE & INSTITUTION SELECTION */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
            <div className="flex items-center gap-2.5 border-b border-slate-100 pb-4">
              <Building2 className="h-5 w-5 text-[#1D4ED8]" />
              <h3 className="font-display text-lg font-black text-[#0F2239]">
                1. Target Zone, College &amp; Course Details
              </h3>
            </div>

            <div className="mt-6 grid gap-5 sm:grid-cols-3">
              {/* 1. Zone Selection Dropdown */}
              <div>
                <label className="block text-xs font-bold text-[#0F2239] uppercase">
                  Tamil Nadu Zone / Region <span className="text-rose-500">*</span>
                </label>
                <select
                  value={selectedZoneId}
                  onChange={(e) => {
                    const newZoneId = e.target.value;
                    setSelectedZoneId(newZoneId);
                    if (selectedCollege && newZoneId && selectedCollege.zoneId !== newZoneId) {
                      setSelectedCollegeId('');
                      setSelectedCourseId('');
                    }
                  }}
                  className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-800 focus:border-[#1D4ED8] focus:outline-none"
                  required
                >
                  <option value="">-- Choose Zone / Region --</option>
                  {tamilNaduZones.map((z) => (
                    <option key={z.id} value={z.id}>
                      {z.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* 2. College Selection Dropdown (filtered by zone) */}
              <div>
                <label className="block text-xs font-bold text-[#0F2239] uppercase">
                  Preferred College <span className="text-rose-500">*</span>
                </label>
                <select
                  value={selectedCollegeId}
                  onChange={(e) => {
                    const colId = e.target.value;
                    setSelectedCollegeId(colId);
                    setSelectedCourseId('');
                    if (colId) {
                      const col = collegesData.find((c) => c.id === colId);
                      if (col && col.zoneId) {
                        setSelectedZoneId(col.zoneId);
                      }
                    }
                  }}
                  className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-800 focus:border-[#1D4ED8] focus:outline-none"
                  required
                >
                  <option value="">
                    {selectedZoneId ? '-- Choose College in this Zone --' : '-- Choose College --'}
                  </option>
                  {filteredColleges.map((col) => (
                    <option key={col.id} value={col.id}>
                      {col.name} ({col.district})
                    </option>
                  ))}
                </select>
              </div>

              {/* 3. Course Selection Dropdown */}
              <div>
                <label className="block text-xs font-bold text-[#0F2239] uppercase">
                  Course Applied <span className="text-rose-500">*</span>
                </label>
                <select
                  value={selectedCourseId}
                  onChange={(e) => setSelectedCourseId(e.target.value)}
                  disabled={!selectedCollegeId}
                  className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-800 focus:border-[#1D4ED8] focus:outline-none disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed"
                  required
                >
                  <option value="">
                    {selectedCollegeId ? '-- Select Course --' : '-- Select College First --'}
                  </option>
                  {availableCourses.map((crs) => (
                    <option key={crs.id} value={crs.id}>
                      {crs.name} ({crs.durationLabel})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* SECTION 2: STUDENT PERSONAL DETAILS */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
            <div className="flex items-center gap-2.5 border-b border-slate-100 pb-4">
              <User className="h-5 w-5 text-[#1D4ED8]" />
              <h3 className="font-display text-lg font-black text-[#0F2239]">
                2. Student Personal Information
              </h3>
            </div>

            <div className="mt-6 grid gap-5 sm:grid-cols-3">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-[#0F2239] uppercase">
                  Student Name (as in 10th/12th mark sheet) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="e.g. Anandha Kumar R"
                  required
                  className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-800 focus:border-[#1D4ED8] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0F2239] uppercase">
                  Gender <span className="text-rose-500">*</span>
                </label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value as 'Male' | 'Female' | 'Other')}
                  className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-800 focus:border-[#1D4ED8] focus:outline-none"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0F2239] uppercase">
                  Date of Birth (DOB) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  required
                  className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-800 focus:border-[#1D4ED8] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0F2239] uppercase">
                  Community Category <span className="text-rose-500">*</span>
                </label>
                <select
                  value={community}
                  onChange={(e) => setCommunity(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-800 focus:border-[#1D4ED8] focus:outline-none"
                >
                  <option value="OC">OC (Open Competition)</option>
                  <option value="BC">BC (Backward Class)</option>
                  <option value="BCM">BCM (Backward Class Muslim)</option>
                  <option value="MBC/DNC">MBC / DNC</option>
                  <option value="SC">SC (Scheduled Caste)</option>
                  <option value="SCA">SCA (SC Arunthathiyar)</option>
                  <option value="ST">ST (Scheduled Tribe)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0F2239] uppercase">
                  Aadhar Number
                </label>
                <input
                  type="text"
                  maxLength={12}
                  value={aadharNumber}
                  onChange={(e) => setAadharNumber(e.target.value)}
                  placeholder="12-digit Aadhar No."
                  className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-800 focus:border-[#1D4ED8] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0F2239] uppercase">
                  Blood Group
                </label>
                <select
                  value={bloodGroup}
                  onChange={(e) => setBloodGroup(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-800 focus:border-[#1D4ED8] focus:outline-none"
                >
                  <option value="O+">O+</option>
                  <option value="A+">A+</option>
                  <option value="B+">B+</option>
                  <option value="AB+">AB+</option>
                  <option value="O-">O-</option>
                  <option value="A-">A-</option>
                  <option value="B-">B-</option>
                  <option value="AB-">AB-</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0F2239] uppercase">
                  Religion
                </label>
                <input
                  type="text"
                  value={religion}
                  onChange={(e) => setReligion(e.target.value)}
                  placeholder="e.g. Hindu / Muslim / Christian"
                  className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-800 focus:border-[#1D4ED8] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0F2239] uppercase">
                  Nationality
                </label>
                <input
                  type="text"
                  value={nationality}
                  onChange={(e) => setNationality(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-800 focus:border-[#1D4ED8] focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* SECTION 3: PARENTS & GUARDIAN DETAILS */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
            <div className="flex items-center gap-2.5 border-b border-slate-100 pb-4">
              <Users className="h-5 w-5 text-[#1D4ED8]" />
              <h3 className="font-display text-lg font-black text-[#0F2239]">
                3. Parents / Guardian Details
              </h3>
            </div>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-bold text-[#0F2239] uppercase">
                  Father&apos;s Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={fatherName}
                  onChange={(e) => setFatherName(e.target.value)}
                  placeholder="e.g. Ramesh K"
                  required
                  className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-800 focus:border-[#1D4ED8] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0F2239] uppercase">
                  Father&apos;s Occupation
                </label>
                <input
                  type="text"
                  value={fatherOccupation}
                  onChange={(e) => setFatherOccupation(e.target.value)}
                  placeholder="e.g. Agriculture / Business / Govt Service"
                  className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-800 focus:border-[#1D4ED8] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0F2239] uppercase">
                  Mother&apos;s Name
                </label>
                <input
                  type="text"
                  value={motherName}
                  onChange={(e) => setMotherName(e.target.value)}
                  placeholder="e.g. Malathi R"
                  className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-800 focus:border-[#1D4ED8] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0F2239] uppercase">
                  Mother&apos;s Occupation
                </label>
                <input
                  type="text"
                  value={motherOccupation}
                  onChange={(e) => setMotherOccupation(e.target.value)}
                  placeholder="e.g. Homemaker / Teacher"
                  className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-800 focus:border-[#1D4ED8] focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* SECTION 4: CONTACT & RESIDENCE */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
            <div className="flex items-center gap-2.5 border-b border-slate-100 pb-4">
              <Phone className="h-5 w-5 text-[#1D4ED8]" />
              <h3 className="font-display text-lg font-black text-[#0F2239]">
                4. Contact Numbers &amp; Address
              </h3>
            </div>

            <div className="mt-6 grid gap-5 sm:grid-cols-3">
              <div>
                <label className="block text-xs font-bold text-[#0F2239] uppercase">
                  Contact Number 1 (WhatsApp Mobile) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  value={contact1}
                  onChange={(e) => setContact1(e.target.value)}
                  placeholder="10-digit Mobile Number"
                  required
                  className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-800 focus:border-[#1D4ED8] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0F2239] uppercase">
                  Contact Number 2 (Alternative)
                </label>
                <input
                  type="tel"
                  value={contact2}
                  onChange={(e) => setContact2(e.target.value)}
                  placeholder="Alternative Parent Contact"
                  className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-800 focus:border-[#1D4ED8] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0F2239] uppercase">
                  E-Mail ID
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. student@gmail.com"
                  className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-800 focus:border-[#1D4ED8] focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-[#0F2239] uppercase">
                  Residential Address
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Door No, Street Name, Village/Town, District"
                  className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-800 focus:border-[#1D4ED8] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0F2239] uppercase">
                  Pincode
                </label>
                <input
                  type="text"
                  maxLength={6}
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  placeholder="6-digit Pincode"
                  className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-800 focus:border-[#1D4ED8] focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* SECTION 5: 12TH & 10TH ACADEMIC QUALIFICATIONS */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
            <div className="flex items-center gap-2.5 border-b border-slate-100 pb-4">
              <GraduationCap className="h-5 w-5 text-[#1D4ED8]" />
              <h3 className="font-display text-lg font-black text-[#0F2239]">
                5. Academic Performance (12th &amp; 10th Standards)
              </h3>
            </div>

            {/* 12th Details */}
            <div className="mt-6 rounded-2xl bg-slate-50 border border-slate-200 p-5">
              <h4 className="font-display text-sm font-bold text-[#0F2239] uppercase tracking-wider text-[#1D4ED8]">
                12th Standard (HSC) Performance
              </h4>

              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                <div>
                  <label className="block text-xs font-bold text-[#0F2239] uppercase">
                    12th Group / Stream <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={twelfthGroup}
                    onChange={(e) => setTwelfthGroup(e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 focus:border-[#1D4ED8] focus:outline-none"
                  >
                    <option value="Bio-Maths">Bio-Maths (Physics, Chemistry, Biology, Maths)</option>
                    <option value="Computer-Maths">Computer Science &amp; Maths</option>
                    <option value="Pure Science">Pure Science (Physics, Chemistry, Botany, Zoology)</option>
                    <option value="Commerce with Maths">Commerce with Business Maths</option>
                    <option value="Commerce with Comp">Commerce with Computer Application</option>
                    <option value="Arts / Humanities">Arts / Humanities</option>
                    <option value="Vocational">Vocational Stream</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0F2239] uppercase">
                    12th School Name
                  </label>
                  <input
                    type="text"
                    value={twelfthSchoolName}
                    onChange={(e) => setTwelfthSchoolName(e.target.value)}
                    placeholder="e.g. Govt Higher Sec School"
                    className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 focus:border-[#1D4ED8] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0F2239] uppercase">
                    12th School Board
                  </label>
                  <select
                    value={twelfthSchoolBoard}
                    onChange={(e) => setTwelfthSchoolBoard(e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 focus:border-[#1D4ED8] focus:outline-none"
                  >
                    <option value="State Board">Tamil Nadu State Board</option>
                    <option value="CBSE">CBSE</option>
                    <option value="ICSE / ISC">ICSE / ISC</option>
                    <option value="Matriculation">Matriculation</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0F2239] uppercase">
                    12th Year of Passing
                  </label>
                  <input
                    type="text"
                    value={twelfthYearOfPassing}
                    onChange={(e) => setTwelfthYearOfPassing(e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 focus:border-[#1D4ED8] focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-[#0F2239] uppercase">
                    12th Mark, Percentage &amp; Cutoff <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={twelfthMark}
                    onChange={(e) => setTwelfthMark(e.target.value)}
                    placeholder="e.g. 520 / 600 (86.6%) • Cutoff: 184.5"
                    required
                    className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 focus:border-[#1D4ED8] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* 10th Details */}
            <div className="mt-5 rounded-2xl bg-slate-50 border border-slate-200 p-5">
              <h4 className="font-display text-sm font-bold text-[#0F2239] uppercase tracking-wider text-slate-700">
                10th Standard (SSLC) Details
              </h4>

              <div className="mt-4 grid gap-4 sm:grid-cols-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-[#0F2239] uppercase">
                    10th School Name
                  </label>
                  <input
                    type="text"
                    value={tenthSchoolName}
                    onChange={(e) => setTenthSchoolName(e.target.value)}
                    placeholder="School Name and City"
                    className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 focus:border-[#1D4ED8] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0F2239] uppercase">
                    10th School Board
                  </label>
                  <select
                    value={tenthSchoolBoard}
                    onChange={(e) => setTenthSchoolBoard(e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 focus:border-[#1D4ED8] focus:outline-none"
                  >
                    <option value="State Board">Tamil Nadu State Board</option>
                    <option value="CBSE">CBSE</option>
                    <option value="ICSE">ICSE</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0F2239] uppercase">
                    10th Year of Passing
                  </label>
                  <input
                    type="text"
                    value={tenthYearOfPassing}
                    onChange={(e) => setTenthYearOfPassing(e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 focus:border-[#1D4ED8] focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-4">
                  <label className="block text-xs font-bold text-[#0F2239] uppercase">
                    10th Marks &amp; Percentage <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={tenthMark}
                    onChange={(e) => setTenthMark(e.target.value)}
                    placeholder="e.g. 430 / 500 (86%)"
                    className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 focus:border-[#1D4ED8] focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 6: QUOTAS & AMENITIES */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
            <div className="flex items-center gap-2.5 border-b border-slate-100 pb-4">
              <ShieldCheck className="h-5 w-5 text-[#1D4ED8]" />
              <h3 className="font-display text-lg font-black text-[#0F2239]">
                6. Government Quotas &amp; Amenities
              </h3>
            </div>

            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 p-4">
                <span className="block text-xs font-bold text-[#0F2239] uppercase">
                  First Graduate in Family?
                </span>
                <p className="mt-1 text-xs text-slate-500">
                  Government scheme provides fee concession for the first family member obtaining a degree.
                </p>
                <div className="mt-3 flex items-center gap-6">
                  <label className="flex items-center gap-2 cursor-pointer text-sm font-bold text-slate-800">
                    <input
                      type="radio"
                      name="firstGraduate"
                      checked={firstGraduate === 'Yes'}
                      onChange={() => setFirstGraduate('Yes')}
                      className="h-4 w-4 text-[#1D4ED8]"
                    />
                    <span>Yes (First Graduate)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-sm font-bold text-slate-800">
                    <input
                      type="radio"
                      name="firstGraduate"
                      checked={firstGraduate === 'No'}
                      onChange={() => setFirstGraduate('No')}
                      className="h-4 w-4 text-[#1D4ED8]"
                    />
                    <span>No</span>
                  </label>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 p-4">
                <span className="block text-xs font-bold text-[#0F2239] uppercase">
                  College Hostel Accommodation Needed?
                </span>
                <p className="mt-1 text-xs text-slate-500">
                  Secure room booking with mess food inside college campus.
                </p>
                <div className="mt-3 flex items-center gap-6">
                  <label className="flex items-center gap-2 cursor-pointer text-sm font-bold text-slate-800">
                    <input
                      type="radio"
                      name="hostel"
                      checked={hostel === 'Yes'}
                      onChange={() => setHostel('Yes')}
                      className="h-4 w-4 text-[#1D4ED8]"
                    />
                    <span>Yes (Hostel Required)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-sm font-bold text-slate-800">
                    <input
                      type="radio"
                      name="hostel"
                      checked={hostel === 'No'}
                      onChange={() => setHostel('No')}
                      className="h-4 w-4 text-[#1D4ED8]"
                    />
                    <span>No (Day Scholar)</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 7: DOCUMENTS CHECKLIST */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
            <div className="flex items-center gap-2.5 border-b border-slate-100 pb-4">
              <FileCheck2 className="h-5 w-5 text-[#1D4ED8]" />
              <h3 className="font-display text-lg font-black text-[#0F2239]">
                7. Documents Required Checklist
              </h3>
            </div>
            <p className="mt-3 text-xs text-slate-500">
              Please mark the documents you currently have available for verification:
            </p>

            <div className="mt-5 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
              {Object.keys(documents).map((docName, index) => (
                <label
                  key={docName}
                  className={`flex cursor-pointer items-center gap-3 rounded-2xl border p-3.5 transition-colors ${
                    documents[docName]
                      ? 'border-[#1D4ED8] bg-blue-50/50 text-[#0F2239]'
                      : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={documents[docName]}
                    onChange={() => handleDocumentToggle(docName)}
                    className="h-4 w-4 rounded accent-[#1D4ED8]"
                  />
                  <span className="text-xs font-bold">
                    {index + 1}) {docName}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* SUBMIT BUTTON SECTION */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
            <div>
              <h4 className="font-display text-base font-bold text-[#0F2239]">
                Submit Admission Application
              </h4>
              <p className="mt-1 text-xs text-slate-500">
                Please verify all fields.
              </p>
            </div>

            <button
              type="submit"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-2xl bg-[#1D4ED8] px-10 py-4 text-base font-bold text-white shadow-lg shadow-blue-700/25 transition-all hover:bg-[#1e40af] hover:shadow-xl active:scale-[0.98]"
            >
              <span>Submit</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
