import { useState } from 'react';
import { Menu, PhoneCall, X } from 'lucide-react';
import { agencyConfig } from '../data/agencyConfig';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
}

const navLinks = [
  { label: 'Home', target: 'home' },
  { label: 'Explore Colleges', target: 'zones' },
  { label: 'Courses', target: 'directory' },
  { label: 'About Us', target: 'about' },
  { label: 'Contact', target: 'contact' },
];

export function Navbar({ onNavigate }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLinkClick = (target: string) => {
    setMobileOpen(false);
    onNavigate(target);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        {/* Brand */}
        <button
          type="button"
          onClick={() => handleLinkClick('home')}
          className="flex items-center gap-3 text-left focus:outline-none"
        >
          <img
            src="/college-apa-logo.png"
            alt={agencyConfig.brandName}
            className="h-10 w-auto object-contain sm:h-11"
          />
          <div className="hidden sm:block">
            <span className="font-display block text-base font-bold tracking-tight text-[#0B1F3A]">
              {agencyConfig.brandName}
            </span>
            <span className="block text-[10px] font-medium tracking-wide text-slate-500 uppercase">
              Dr. B. Ramesh • Admission Advisory
            </span>
          </div>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary Navigation">
          {navLinks.map((item) => (
            <button
              key={item.target}
              type="button"
              onClick={() => handleLinkClick(item.target)}
              className="text-sm font-medium text-slate-600 transition-colors hover:text-[#0B1F3A]"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-3 md:flex">
          <button
            type="button"
            onClick={() => handleLinkClick('enquiry')}
            className="inline-flex items-center gap-2 rounded-xl bg-[#0B1F3A] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#132F54]"
          >
            <PhoneCall className="h-4 w-4 text-[#14B8A6]" />
            Talk to an Expert
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
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 md:hidden">
          <div className="flex flex-col gap-2">
            {navLinks.map((item) => (
              <button
                key={item.target}
                type="button"
                onClick={() => handleLinkClick(item.target)}
                className="rounded-lg px-3 py-2.5 text-left text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-[#0B1F3A]"
              >
                {item.label}
              </button>
            ))}
            <button
              type="button"
              onClick={() => handleLinkClick('enquiry')}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-[#0B1F3A] px-4 py-3 text-sm font-semibold text-white"
            >
              <PhoneCall className="h-4 w-4 text-[#14B8A6]" />
              Talk to an Admission Expert
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

