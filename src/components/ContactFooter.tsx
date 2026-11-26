import { useState } from 'react';
import {
  ArrowUp,
  Globe,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from 'lucide-react';
import { agencyConfig } from '../data/agencyConfig';

interface ContactFooterProps {
  onNavigate: (sectionId: string) => void;
}

export function ContactFooter({ onNavigate }: ContactFooterProps) {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="relative overflow-hidden bg-[#0A1626] text-slate-300">
      {/* ========================================================
          EDURA SIGNATURE TOP WAVE / ORGANIC CURVE TRANSITION
          Smoothly bridges the white page above into the dark footer
          ======================================================== */}
      <div className="pointer-events-none relative w-full overflow-hidden leading-none z-10 bg-white">
        <svg
          viewBox="0 0 1440 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-12 sm:h-16 md:h-20 text-[#0A1626]"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0 C360,90 720,10 1080,75 C1260,100 1380,40 1440,20 L1440,100 L0,100 Z"
            fill="currentColor"
          />
        </svg>
      </div>

      {/* Decorative background plus (+) and arrow (>>>) graphic elements from Edura */}
      <div
        className="pointer-events-none absolute top-28 left-6 z-0 hidden lg:block opacity-35 select-none"
        aria-hidden="true"
      >
        <span className="text-xl font-black text-[#2563EB] tracking-widest">+ + +</span>
      </div>
      <div
        className="pointer-events-none absolute bottom-16 right-10 z-0 hidden lg:block opacity-35 select-none"
        aria-hidden="true"
      >
        <span className="text-2xl font-black text-[#2563EB] tracking-widest">&gt;&gt;&gt;</span>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ========================================================
            ROW 1: Edura 3-Column Top Contact Strip with Glowing Blue Circles
            ======================================================== */}
        <div className="grid gap-6 py-8 md:grid-cols-3">
          {/* 1. Phone */}
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#1E3A8A]/60 border border-[#2563EB]/40 text-[#60A5FA] shadow-lg shadow-blue-900/30">
              <Phone className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400">Call us any time:</p>
              <a
                href={`tel:${agencyConfig.phone.replace(/\s+/g, '')}`}
                className="font-display text-base sm:text-lg font-extrabold text-white hover:text-[#60A5FA] transition-colors"
              >
                {agencyConfig.phone}
              </a>
            </div>
          </div>

          {/* 2. Email */}
          <div className="flex items-center gap-4 border-t border-white/10 pt-6 md:border-t-0 md:border-l md:border-white/10 md:pl-8 md:pt-0">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#1E3A8A]/60 border border-[#2563EB]/40 text-[#60A5FA] shadow-lg shadow-blue-900/30">
              <Mail className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400">Email us 24/7 hours:</p>
              <a
                href={`mailto:${agencyConfig.email}`}
                className="font-display text-base sm:text-lg font-extrabold text-white hover:text-[#60A5FA] transition-colors truncate block max-w-[220px] sm:max-w-none"
              >
                {agencyConfig.email}
              </a>
            </div>
          </div>

          {/* 3. Location */}
          <div className="flex items-center gap-4 border-t border-white/10 pt-6 md:border-t-0 md:border-l md:border-white/10 md:pl-8 md:pt-0">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#1E3A8A]/60 border border-[#2563EB]/40 text-[#60A5FA] shadow-lg shadow-blue-900/30">
              <MapPin className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400">Our central office:</p>
              <p className="font-display text-sm sm:text-base font-extrabold text-white leading-snug">
                No. 20, Kurinji Garden, Kumbakonam, Thanjavur (DT)
              </p>
            </div>
          </div>
        </div>

        {/* ========================================================
            ROW 2: Edura 4-Column Main Footer Body inside Shining Grain Box
            ======================================================== */}
        <div className="relative my-6 overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-b from-white/[0.07] via-white/[0.02] to-transparent p-8 sm:p-10 lg:p-12 shadow-2xl shadow-blue-950/40 backdrop-blur-xs">
          {/* Light shining radial spotlight */}
          <div
            className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-48 w-4/5 rounded-full bg-gradient-to-b from-[#38BDF8]/25 via-[#2563EB]/15 to-transparent blur-3xl"
            aria-hidden="true"
          />

          {/* Top edge light-beam specular reflection */}
          <div
            className="pointer-events-none absolute inset-x-8 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#60A5FA] to-transparent opacity-80"
            aria-hidden="true"
          />

          {/* Shimmering grain texture overlay */}
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full opacity-25 mix-blend-overlay"
            aria-hidden="true"
          >
            <filter id="footerGrainTexture">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.75"
                numOctaves="3"
                stitchTiles="stitch"
              />
              <feColorMatrix type="saturate" values="0" />
            </filter>
            <rect width="100%" height="100%" filter="url(#footerGrainTexture)" />
          </svg>

          {/* Inner 4-Column Grid */}
          <div className="relative z-10 grid gap-10 md:grid-cols-12 lg:gap-12">
            {/* Col 1: Logo, Mission Description & Social Media Icons */}
            <div className="md:col-span-4">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-white p-2 shadow-sm">
                  <img
                    src="/college-apa-logo.png"
                    alt={agencyConfig.brandName}
                    className="h-10 w-auto object-contain"
                  />
                </div>
                <div>
                  <span className="font-display block text-xl font-black text-white">
                    College <span className="text-[#38BDF8]">APA</span>
                  </span>
                  <span className="block text-xs font-semibold text-slate-400">
                    Admission &amp; Guidance Centre
                  </span>
                </div>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-slate-300">
                Personalized guidance tailored to each student&apos;s individual qualifications,
                merit cutoff, and career aspirations across all accredited Tamil Nadu institutions.
              </p>

              {/* Social Links Row */}
              <div className="mt-6">
                <p className="text-xs font-black tracking-wider text-white uppercase">
                  FOLLOW US ON:
                </p>
                <div className="mt-3 flex items-center gap-2.5 text-slate-300">
                  <a
                    href={`https://wa.me/${agencyConfig.whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp"
                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 hover:bg-emerald-600 hover:text-white transition-all shadow-xs"
                  >
                    <MessageCircle className="h-4 w-4" />
                  </a>
                  <a
                    href={agencyConfig.socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 hover:bg-[#2563EB] hover:text-white transition-all text-xs font-bold"
                  >
                    IG
                  </a>
                  <a
                    href={agencyConfig.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 hover:bg-[#2563EB] hover:text-white transition-all text-xs font-bold"
                  >
                    IN
                  </a>
                  <a
                    href={agencyConfig.socialLinks.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="YouTube"
                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 hover:bg-[#2563EB] hover:text-white transition-all text-xs font-bold"
                  >
                    YT
                  </a>
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-slate-400">
                    <Globe className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </div>

            {/* Col 2: Quick Links (Edura Bulleted List) */}
            <div className="md:col-span-2 sm:col-span-6">
              <h4 className="font-display text-base font-bold text-white relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-8 after:h-0.5 after:bg-[#2563EB]">
                Quick Links
              </h4>
              <ul className="mt-4 space-y-2.5 text-sm text-slate-300">
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate('home')}
                    className="flex items-center gap-2 hover:text-[#60A5FA] transition-colors"
                  >
                    <span className="text-[#38BDF8]">•</span> Home
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate('about')}
                    className="flex items-center gap-2 hover:text-[#60A5FA] transition-colors"
                  >
                    <span className="text-[#38BDF8]">•</span> About Us
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate('zones')}
                    className="flex items-center gap-2 hover:text-[#60A5FA] transition-colors"
                  >
                    <span className="text-[#38BDF8]">•</span> Explore Zones
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate('gallery')}
                    className="flex items-center gap-2 hover:text-[#60A5FA] transition-colors"
                  >
                    <span className="text-[#38BDF8]">•</span> Gallery
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate('scholarships')}
                    className="flex items-center gap-2 hover:text-[#60A5FA] transition-colors"
                  >
                    <span className="text-[#38BDF8]">•</span> Scholarships
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate('enquiry')}
                    className="flex items-center gap-2 hover:text-[#60A5FA] transition-colors"
                  >
                    <span className="text-[#38BDF8]">•</span> Admission Form
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 3: Counselling Resources (Edura Bulleted List) */}
            <div className="md:col-span-2 sm:col-span-6">
              <h4 className="font-display text-base font-bold text-white relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-8 after:h-0.5 after:bg-[#2563EB]">
                Counselling
              </h4>
              <ul className="mt-4 space-y-2.5 text-sm text-slate-300">
                <li className="flex items-center gap-2">
                  <span className="text-[#38BDF8]">•</span> TNEA Engineering
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#38BDF8]">•</span> TNAU Agriculture
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#38BDF8]">•</span> TN Medical Selection
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#38BDF8]">•</span> Nursing &amp; B.Pharm
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#38BDF8]">•</span> 7.5% Govt Quota
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#38BDF8]">•</span> First Graduate Aid
                </li>
              </ul>
            </div>

            {/* Col 4: Get in touch! + Newsletter Input Box (Exact Edura Form) */}
            <div className="md:col-span-4">
              <h4 className="font-display text-base font-bold text-white relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-8 after:h-0.5 after:bg-[#2563EB]">
                Get in touch!
              </h4>
              <p className="mt-4 text-sm text-slate-300">
                Subscribe our newsletter to get our latest cutoff updates &amp; counselling notices.
              </p>

              <form onSubmit={handleSubscribe} className="mt-5 space-y-3">
                <div className="relative">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter Your Email"
                    required
                    className="w-full rounded-xl bg-white/10 border border-white/20 py-3 pr-10 pl-4 text-sm text-white placeholder:text-slate-400 focus:border-[#2563EB] focus:bg-white/15 focus:outline-none"
                  />
                  <Mail className="pointer-events-none absolute top-1/2 right-3.5 h-4 w-4 -translate-y-1/2 text-slate-400" />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-[#2563EB] py-3 text-sm font-black text-white uppercase tracking-wider transition-all hover:bg-[#1D4ED8] shadow-md shadow-blue-900/40"
                >
                  {subscribed ? 'SUBSCRIBED!' : 'SUBSCRIBE'}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* ========================================================
            ROW 3: Bottom Copyright Bar with Back to Top Button
            ======================================================== */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 py-6 text-xs text-slate-400 sm:flex-row">
          <p>
            Copyright &copy; {agencyConfig.copyrightYear}{' '}
            <span className="font-bold text-[#60A5FA]">College APA</span>. All Rights Reserved.
          </p>

          <div className="flex items-center gap-6">
            <a href="#about" onClick={() => onNavigate('about')} className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#about" onClick={() => onNavigate('about')} className="hover:text-white transition-colors">
              Terms &amp; Condition
            </a>

            {/* Circular Scroll to Top Button (Matching Edura in bottom right) */}
            <button
              type="button"
              onClick={scrollToTop}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-blue-500/50 bg-[#2563EB] text-white hover:bg-[#1D4ED8] transition-colors shadow-sm"
              aria-label="Scroll to top"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
