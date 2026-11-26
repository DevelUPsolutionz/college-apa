import { useMemo, useState } from 'react';
import {
  CheckCircle2,
  MessageCircle,
  PhoneCall,
  Send,
  ShieldCheck,
} from 'lucide-react';
import { agencyConfig } from '../data/agencyConfig';
import type { College } from '../types/admissions';

export interface EnquiryPrefill {
  collegeId: string;
  courseId: string;
  district: string;
}

interface AdmissionEnquirySectionProps {
  colleges: College[];
  prefill: EnquiryPrefill | null;
}

interface FormErrors {
  studentName?: string;
  mobile?: string;
  preferredCollege?: string;
}

export function AdmissionEnquirySection({
  colleges,
  prefill,
}: AdmissionEnquirySectionProps) {
  const [studentName, setStudentName] = useState('');
  const [parentName, setParentName] = useState('');
  const [mobile, setMobile] = useState('');
  const [preferredCollegeId, setPreferredCollegeId] = useState('');
  const [preferredCourseId, setPreferredCourseId] = useState('');
  const [preferredDistrict, setPreferredDistrict] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [lastPrefill, setLastPrefill] = useState<EnquiryPrefill | null>(null);

  if (prefill && prefill !== lastPrefill) {
    setLastPrefill(prefill);
    setPreferredCollegeId(prefill.collegeId);
    setPreferredCourseId(prefill.courseId);
    setPreferredDistrict(prefill.district);
    setSubmitted(false);
  }

  const selectedCollege = useMemo(
    () => colleges.find((c) => c.id === preferredCollegeId) ?? null,
    [colleges, preferredCollegeId]
  );

  const selectedCourse = useMemo(
    () =>
      selectedCollege?.courses.find((cr) => cr.id === preferredCourseId) ?? null,
    [selectedCollege, preferredCourseId]
  );

  const allDistricts = useMemo(() => {
    const set = new Set(colleges.map((c) => c.district));
    return Array.from(set).sort();
  }, [colleges]);

  const handleCollegeChange = (collegeId: string) => {
    setPreferredCollegeId(collegeId);
    const col = colleges.find((c) => c.id === collegeId);
    if (col) {
      setPreferredDistrict(col.district);
      setPreferredCourseId(col.courses[0]?.id ?? '');
    } else {
      setPreferredCourseId('');
    }
  };

  const validate = (): boolean => {
    const nextErrors: FormErrors = {};
    if (!studentName.trim() || studentName.trim().length < 2) {
      nextErrors.studentName = 'Please enter the student’s full name.';
    }
    const cleanPhone = mobile.replace(/\D/g, '');
    if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      nextErrors.mobile = 'Enter a valid 10-digit Indian mobile number.';
    }
    if (!preferredCollegeId) {
      nextErrors.preferredCollege = 'Please select a preferred college.';
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
  };

  const buildWhatsAppUrl = () => {
    const lines = [
      `Hello College APA (Dr. B. Ramesh), I would like admission counselling guidance.`,
      studentName ? `Student Name: ${studentName}` : '',
      parentName ? `Parent/Guardian: ${parentName}` : '',
      mobile ? `Mobile: ${mobile}` : '',
      selectedCollege ? `Preferred College: ${selectedCollege.name}` : '',
      selectedCourse ? `Preferred Course: ${selectedCourse.name}` : '',
      preferredDistrict ? `Preferred District: ${preferredDistrict}` : '',
      message ? `Notes: ${message}` : '',
    ].filter(Boolean);

    return `https://wa.me/${agencyConfig.whatsappNumber}?text=${encodeURIComponent(
      lines.join('\n')
    )}`;
  };

  return (
    <section
      id="enquiry"
      className="border-b border-slate-200 bg-white py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Context Column */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1 text-xs font-bold tracking-wider text-[#0F2239] uppercase">
              <PhoneCall className="h-3.5 w-3.5 text-amber-500" />
              <span>Direct Counselling Desk</span>
            </div>
            <h2 className="font-display mt-3 text-3xl font-extrabold tracking-tight text-[#0F2239] sm:text-4xl">
              Request Admission &amp; Counselling Guidance
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              Connect directly with <strong className="text-[#0F2239]">Dr. B. Ramesh</strong> for
              TNEA engineering cutoff calculation, medical/allied health selection,
              scholarship eligibility (First Graduate, 7.5%, PMSS), and management quota admission.
            </p>

            {/* Selected Course summary pill */}
            {selectedCollege && selectedCourse && (
              <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-bold tracking-wider text-slate-500 uppercase">
                  Shortlisted for Enquiry
                </p>
                <p className="font-display mt-1 text-sm font-bold text-[#0F2239]">
                  {selectedCourse.name}
                </p>
                <p className="text-xs font-medium text-slate-500">
                  {selectedCollege.name} • {selectedCollege.district}
                </p>
              </div>
            )}

            {/* Direct WhatsApp Card */}
            <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
              <h3 className="font-display text-base font-bold text-[#0F2239]">
                Instant WhatsApp Admission Desk
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                Send your chosen college, cutoff marks, or questions directly to Dr. B. Ramesh on WhatsApp.
              </p>
              <a
                href={buildWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#0F2239] px-5 py-3 text-sm font-bold text-white shadow-xs transition-colors hover:bg-[#1A365D]"
              >
                <MessageCircle className="h-4 w-4 text-emerald-400" />
                Chat on WhatsApp ({agencyConfig.whatsappDisplay})
              </a>
            </div>

            <div className="mt-5 flex items-center gap-2 text-xs text-slate-500">
              <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-600" />
              <span>
                100% Confidential &amp; Verified Advisory Across Tamil Nadu.
              </span>
            </div>
          </div>

          {/* Right Form Card */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-slate-200 bg-[#F8FAFC] p-6 shadow-sm sm:p-8">
              {submitted ? (
                <div className="py-10 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-[#0F2239]">
                    <CheckCircle2 className="h-8 w-8 text-emerald-600" />
                  </div>
                  <h3 className="font-display mt-4 text-2xl font-bold text-[#0F2239]">
                    Enquiry Submitted to College APA
                  </h3>
                  <p className="mx-auto mt-2 max-w-md text-sm text-slate-600">
                    Thank you, <span className="font-semibold">{studentName}</span>.
                    Dr. B. Ramesh will connect with you on{' '}
                    <span className="font-semibold">{mobile}</span> shortly
                    regarding{' '}
                    <span className="font-semibold">
                      {selectedCourse?.name || selectedCollege?.name}
                    </span>
                    .
                  </p>
                  <div className="mt-6 flex flex-wrap justify-center gap-3">
                    <a
                      href={buildWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl bg-[#0F2239] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#1A365D]"
                    >
                      <MessageCircle className="h-4 w-4 text-emerald-400" />
                      Chat on WhatsApp Now
                    </a>
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-[#0F2239] hover:bg-slate-50"
                    >
                      Submit Another Enquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="student-name"
                        className="block text-xs font-bold text-[#0F2239]"
                      >
                        Student Name <span className="text-rose-600">*</span>
                      </label>
                      <input
                        id="student-name"
                        type="text"
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        placeholder="e.g. Anandha Kumar"
                        className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-800 focus:border-[#0F2239] focus:outline-none"
                      />
                      {errors.studentName && (
                        <p className="mt-1 text-xs text-rose-600">
                          {errors.studentName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="parent-name"
                        className="block text-xs font-bold text-[#0F2239]"
                      >
                        Parent / Guardian Name{' '}
                        <span className="font-normal text-slate-400">
                          (Optional)
                        </span>
                      </label>
                      <input
                        id="parent-name"
                        type="text"
                        value={parentName}
                        onChange={(e) => setParentName(e.target.value)}
                        placeholder="e.g. Ramesh K."
                        className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-800 focus:border-[#0F2239] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="mobile-number"
                        className="block text-xs font-bold text-[#0F2239]"
                      >
                        Mobile Number <span className="text-rose-600">*</span>
                      </label>
                      <input
                        id="mobile-number"
                        type="tel"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        placeholder="e.g. 9952887324"
                        className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-800 focus:border-[#0F2239] focus:outline-none"
                      />
                      {errors.mobile && (
                        <p className="mt-1 text-xs text-rose-600">
                          {errors.mobile}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="preferred-district"
                        className="block text-xs font-bold text-[#0F2239]"
                      >
                        Preferred District
                      </label>
                      <select
                        id="preferred-district"
                        value={preferredDistrict}
                        onChange={(e) => setPreferredDistrict(e.target.value)}
                        className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-800 focus:border-[#0F2239] focus:outline-none"
                      >
                        <option value="">Select District</option>
                        {allDistricts.map((d) => (
                          <option key={d} value={d}>
                            {d}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="preferred-college"
                        className="block text-xs font-bold text-[#0F2239]"
                      >
                        Preferred College <span className="text-rose-600">*</span>
                      </label>
                      <select
                        id="preferred-college"
                        value={preferredCollegeId}
                        onChange={(e) => handleCollegeChange(e.target.value)}
                        className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-800 focus:border-[#0F2239] focus:outline-none"
                      >
                        <option value="">Select a College</option>
                        {colleges.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.tneaCode ? `[${c.tneaCode}] ` : ''}{c.name} ({c.district})
                          </option>
                        ))}
                      </select>
                      {errors.preferredCollege && (
                        <p className="mt-1 text-xs text-rose-600">
                          {errors.preferredCollege}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="preferred-course"
                        className="block text-xs font-bold text-[#0F2239]"
                      >
                        Preferred Course
                      </label>
                      <select
                        id="preferred-course"
                        value={preferredCourseId}
                        onChange={(e) => setPreferredCourseId(e.target.value)}
                        disabled={!selectedCollege}
                        className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-800 disabled:bg-slate-100 disabled:text-slate-400 focus:border-[#0F2239] focus:outline-none"
                      >
                        <option value="">
                          {selectedCollege
                            ? 'Select a Course'
                            : 'Select a college first'}
                        </option>
                        {selectedCollege?.courses.map((cr) => (
                          <option key={cr.id} value={cr.id}>
                            {cr.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="enquiry-message"
                      className="block text-xs font-bold text-[#0F2239]"
                    >
                      Message / Questions (Cut-off Marks, Scholarship, Hostel)
                    </label>
                    <textarea
                      id="enquiry-message"
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Enter your 12th cutoff mark, preferred branch, or questions regarding First Graduate / 7.5% government quota..."
                      className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-800 focus:border-[#0F2239] focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#0F2239] px-6 py-3.5 text-sm font-bold text-white shadow-sm transition-all hover:bg-[#1A365D]"
                  >
                    <Send className="h-4 w-4 text-amber-400" />
                    Submit Admission Enquiry
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
