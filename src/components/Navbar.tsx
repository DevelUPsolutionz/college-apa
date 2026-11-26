import { useState } from 'react';
import { Mail, MapPin, Menu, Phone, PhoneCall, X } from 'lucide-react';
import { agencyConfig } from '../data/agencyConfig';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
}

const navLinks = [
  { label: 'Home', target: 'home' },
  { label: 'About Us', target: 'about' },
  { label: 'Tamil Nadu Zones', target: 'zones' },
  { label: 'Gallery', target: 'gallery' },
  { label: 'Scholarships', target: 'scholarships' },
  { label: 'Contact', target: 'contact' },
];

export function Navbar({ onNavigate }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLinkClick = (target: string) => {
    setMobileOpen(false);
    onNavigate(target);
  };

  return (
    <header className="sticky top-0 z-40 bg-white">
      {/* ========================================================
          EDURA TOP UTILITY BAR (Electric Blue #0066FF / #2563EB)
          ======================================================== */}
      <div className="hidden border-b border-blue-600/20 bg-[#1D4ED8] text-xs text-blue-100 md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5 text-white" />
              <span>Kumbakonam, Thanjavur (DT), Tamil Nadu</span>
            </span>
            <span className="flex items-center gap-2">
              <Mail className="h-3.5 w-3.5 text-white" />
              <a href={`mailto:${agencyConfig.email}`} className="hover:text-white transition-colors">
                {agencyConfig.email}
              </a>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-blue-200">
              Chief Counsellor: <strong className="text-white">Dr. B. Ramesh</strong>
            </span>
            <span className="text-blue-400">|</span>
            <a
              href={`tel:${agencyConfig.phone.replace(/\s+/g, '')}`}
              className="flex items-center gap-1.5 font-bold text-white hover:text-blue-200 transition-colors"
            >
              <Phone className="h-3.5 w-3.5 text-white" />
              <span>{agencyConfig.phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* ========================================================
          MAIN NAVBAR WITH EDURA SIGNATURE TOP-LEFT CURVED CUTOUT
          ======================================================== */}
      <div className="relative border-b border-slate-100 bg-white">
        {/* The Exact Curved Cutout from Edura Screenshot:
            Flows from the electric blue top-bar into a smooth circular quarter-curve over the white navbar */}
        <div
          className="pointer-events-none absolute top-0 left-0 z-0 hidden md:block overflow-hidden leading-none select-none w-24 h-16 sm:w-32 sm:h-20"
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 120 70"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
            preserveAspectRatio="none"
          >
            {/* Electric blue curve dipping downwards and curving outwards to the left */}
            <path
              d="M0,0 L90,0 C65,0 45,15 35,40 C28,58 16,70 0,70 Z"
              fill="#1D4ED8"
            />
          </svg>
        </div>

        <div className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          {/* Logo with padding to sit right next to the curve */}
          <button
            type="button"
            onClick={() => handleLinkClick('home')}
            className="flex items-center gap-3 text-left focus:outline-none pl-3 sm:pl-6 md:pl-8"
          >
            <img
              src="/college-apa-logo.png"
              alt={agencyConfig.brandName}
              className="h-10 w-auto object-contain sm:h-11"
            />
            <div className="hidden sm:block border-l border-slate-200 pl-3">
              <span className="font-display block text-base font-extrabold tracking-tight text-[#0F2239]">
                College APA
              </span>
              <span className="block text-[11px] font-medium text-slate-500">
                Admission &amp; Guidance Centre
              </span>
            </div>
          </button>

          {/* Desktop Links */}
          <nav className="hidden items-center gap-8 md:flex" aria-label="Primary Navigation">
            {navLinks.map((item) => (
              <button
                key={item.target}
                type="button"
                onClick={() => handleLinkClick(item.target)}
                className="text-sm font-semibold text-slate-700 transition-colors hover:text-[#1D4ED8]"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Edura Primary CTA Button ("APPLY NOW ->" in bright blue) */}
          <div className="hidden items-center gap-3 md:flex">
            <button
              type="button"
              onClick={() => handleLinkClick('application')}
              className="inline-flex items-center gap-2 rounded-xl bg-[#2563EB] px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-all hover:bg-[#1D4ED8]"
            >
              <PhoneCall className="h-4 w-4" />
              APPLY NOW &rarr;
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700 md:hidden"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5 text-slate-800" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="border-t border-slate-100 bg-white px-4 py-4 md:hidden">
          <div className="flex flex-col gap-2">
            {navLinks.map((item) => (
              <button
                key={item.target}
                type="button"
                onClick={() => handleLinkClick(item.target)}
                className="rounded-lg px-3 py-2.5 text-left text-sm font-bold text-slate-700 hover:bg-slate-50 hover:text-[#1D4ED8]"
              >
                {item.label}
              </button>
            ))}
            <button
              type="button"
              onClick={() => handleLinkClick('enquiry')}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-[#2563EB] px-4 py-3 text-sm font-bold text-white"
            >
              <PhoneCall className="h-4 w-4" />
              CONTACT US &rarr;
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
