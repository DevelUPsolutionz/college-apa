import {
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  UserCheck,
} from 'lucide-react';
import { agencyConfig } from '../data/agencyConfig';

interface ContactFooterProps {
  onNavigate: (sectionId: string) => void;
}

export function ContactFooter({ onNavigate }: ContactFooterProps) {
  return (
    <footer id="contact" className="bg-[#0B1F3A] text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-10 md:grid-cols-12">
          {/* Brand & Address */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-white px-2.5 py-1.5">
                <img
                  src="/college-apa-logo.png"
                  alt={agencyConfig.brandName}
                  className="h-9 w-auto object-contain"
                />
              </div>
              <div>
                <span className="font-display block text-lg font-bold text-white">
                  {agencyConfig.brandName}
                </span>
                <span className="block text-xs text-slate-400">
                  {agencyConfig.brandTagline}
                </span>
              </div>
            </div>

            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-300">
              Helping students and parents discover accredited Tamil Nadu
              colleges zone-wise with transparent course and fee comparisons.
            </p>

            <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-[#5EEAD4]">
              <UserCheck className="h-4 w-4 shrink-0" />
              <span>Chief Advisor: Dr. B. Ramesh</span>
            </div>

            <div className="mt-3 flex items-start gap-2.5 text-sm text-slate-300">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#14B8A6]" />
              <span>{agencyConfig.address}</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="md:col-span-3">
            <h3 className="font-display text-sm font-bold tracking-wider text-white uppercase">
              Quick Navigation
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {[
                { label: 'Home', id: 'home' },
                { label: 'Explore Zones', id: 'zones' },
                { label: 'College Directory', id: 'directory' },
                { label: 'Admission Enquiry', id: 'enquiry' },
                { label: 'About Us', id: 'about' },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    type="button"
                    onClick={() => onNavigate(link.id)}
                    className="transition-colors hover:text-[#14B8A6]"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Contact */}
          <div className="md:col-span-4">
            <h3 className="font-display text-sm font-bold tracking-wider text-white uppercase">
              Contact &amp; Advisory Desk
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href={`tel:${agencyConfig.phone.replace(/\s+/g, '')}`}
                  className="inline-flex items-center gap-2.5 hover:text-white"
                >
                  <Phone className="h-4 w-4 text-[#14B8A6]" />
                  <span>{agencyConfig.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${agencyConfig.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 hover:text-white"
                >
                  <MessageCircle className="h-4 w-4 text-[#14B8A6]" />
                  <span>WhatsApp: {agencyConfig.whatsappDisplay}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${agencyConfig.email}`}
                  className="inline-flex items-center gap-2.5 hover:text-white"
                >
                  <Mail className="h-4 w-4 text-[#14B8A6]" />
                  <span>{agencyConfig.email}</span>
                </a>
              </li>
            </ul>

            <p className="mt-4 text-xs text-slate-400">
              Hours: {agencyConfig.officeHours}
            </p>

            <div className="mt-4 flex gap-3 text-xs font-medium">
              <a
                href={agencyConfig.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-white/10 px-3 py-1.5 text-slate-200 hover:bg-white/20"
              >
                Instagram
              </a>
              <a
                href={agencyConfig.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-white/10 px-3 py-1.5 text-slate-200 hover:bg-white/20"
              >
                LinkedIn
              </a>
              <a
                href={agencyConfig.socialLinks.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-white/10 px-3 py-1.5 text-slate-200 hover:bg-white/20"
              >
                YouTube
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-slate-400 sm:flex-row">
          <p>
            &copy; {agencyConfig.copyrightYear} {agencyConfig.brandName}. All
            rights reserved.
          </p>
          <p>Tamil Nadu Zone-Wise College Discovery Platform</p>
        </div>
      </div>
    </footer>
  );
}

