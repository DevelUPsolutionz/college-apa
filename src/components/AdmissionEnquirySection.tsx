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

  // Auto-populate when user clicks "Enquire About This Course"
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
      `Hello ${agencyConfig.brandName}, I would like to enquire about college admissions.`,
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
      className="border-b border-slate-200/80 bg-white py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Context Column */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-[#0D9488] uppercase">
              <PhoneCall className="h-4 w-4" />
              <span>Step 3 — Admission Guidance</span>
            </div>
            <h2 className="font-display mt-2 text-3xl font-bold tracking-tight text-[#0B1F3A] sm:text-4xl">
              Request Personalized Admission Enquiry
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              Speak with our Tamil Nadu admission advisors for seat availability,
              counselling cut-off guidance, scholarship eligibility, and
              semester fee clarity.
            </p>

            {/* Auto-populated summary pill if coming from a course */}
            {selectedCollege && selectedCourse && (
              <div className="mt-6 rounded-2xl border border-[#0D9488]/30 bg-[#F0FDFA] p-4">
                <p className="text-xs font-bold tracking-wider text-[#0F766E] uppercase">
                  Selected Course for Enquiry
                </p>
                <p className="font-display mt-1 text-sm font-bold text-[#0B1F3A]">
                  {selectedCourse.name}
                </p>
                <p className="text-xs text-slate-600">
                  {selectedCollege.name} • {selectedCollege.district}
                </p>
              </div>
            )}

            {/* Direct WhatsApp Card */}
            <div className="mt-6 rounded-2xl border border-slate-200 bg-[#FAF9F6] p-5">
              <h3 className="font-display text-base font-bold text-[#0B1F3A]">
                Prefer Instant WhatsApp Counselling?
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                Send your shortlisted college and course directly to our
                admission desk on WhatsApp.
              </p>
              <a
                href={buildWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#059669] px-5 py-3 text-sm font-semibold text-white shadow-xs transition-colors hover:bg-[#047857]"
              >
                <MessageCircle className="h-4 w-4" />
                Enquire via WhatsApp ({agencyConfig.whatsappDisplay})
              </a>
            </div>

            <div className="mt-5 flex items-center gap-2 text-xs text-slate-500">
              <ShieldCheck className="h-4 w-4 shrink-0 text-[#0D9488]" />
              <span>
                Your details are used strictly for admission counselling.
              </span>
            </div>
          </div>

          {/* Right Form Card */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-slate-200 bg-[#F8FAFC] p-6 shadow-sm sm:p-8">
              {submitted ? (
                <div className="py-10 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F0FDFA] text-[#0D9488]">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h3 className="font-display mt-4 text-2xl font-bold text-[#0B1F3A]">
                    Enquiry Received
                  </h3>
                  <p className="mx-auto mt-2 max-w-md text-sm text-slate-600">
                    Thank you, <span className="font-semibold">{studentName}</span>.
                    Our Tamil Nadu admission advisor will contact you on{' '}
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
                      className="inline-flex items-center gap-2 rounded-xl bg-[#059669] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#047857]"
                    >
                      <MessageCircle className="h-4 w-4" />
                      Also Chat on WhatsApp
                    </a>
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-[#0B1F3A] hover:bg-slate-50"
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
                        className="block text-xs font-semibold text-[#0B1F3A]"
                      >
                        Student Name <span className="text-rose-600">*</span>
                      </label>
                      <input
                        id="student-name"
                        type="text"
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        placeholder="e.g. Karthik Subramanian"
                        className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-[#0F172A] focus:border-[#0D9488] focus:outline-none"
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
                        className="block text-xs font-semibold text-[#0B1F3A]"
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
                        placeholder="e.g. Subramanian R."
                        className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-[#0F172A] focus:border-[#0D9488] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="mobile-number"
                        className="block text-xs font-semibold text-[#0B1F3A]"
                      >
                        Mobile Number <span className="text-rose-600">*</span>
                      </label>
                      <input
                        id="mobile-number"
                        type="tel"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        placeholder="e.g. 9876543210"
                        className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-[#0F172A] focus:border-[#0D9488] focus:outline-none"
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
                        className="block text-xs font-semibold text-[#0B1F3A]"
                      >
                        Preferred District
                      </label>
                      <select
                        id="preferred-district"
                        value={preferredDistrict}
                        onChange={(e) => setPreferredDistrict(e.target.value)}
                        className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-[#0F172A] focus:border-[#0D9488] focus:outline-none"
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
                        className="block text-xs font-semibold text-[#0B1F3A]"
                      >
                        Preferred College <span className="text-rose-600">*</span>
                      </label>
                      <select
                        id="preferred-college"
                        value={preferredCollegeId}
                        onChange={(e) => handleCollegeChange(e.target.value)}
                        className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-[#0F172A] focus:border-[#0D9488] focus:outline-none"
                      >
                        <option value="">Select a College</option>
                        {colleges.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.name} ({c.district})
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
                        className="block text-xs font-semibold text-[#0B1F3A]"
                      >
                        Preferred Course
                      </label>
                      <select
                        id="preferred-course"
                        value={preferredCourseId}
                        onChange={(e) => setPreferredCourseId(e.target.value)}
                        disabled={!selectedCollege}
                        className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-[#0F172A] disabled:bg-slate-100 disabled:text-slate-400 focus:border-[#0D9488] focus:outline-none"
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
                      className="block text-xs font-semibold text-[#0B1F3A]"
                    >
                      Message / Questions
                    </label>
                    <textarea
                      id="enquiry-message"
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Ask about management/counselling quota, hostel availability, or scholarship options..."
                      className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-[#0F172A] focus:border-[#0D9488] focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#0B1F3A] px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#132F54]"
                  >
                    <Send className="h-4 w-4 text-[#14B8A6]" />
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
