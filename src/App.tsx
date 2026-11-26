import { useMemo, useState } from 'react';
import { AboutAgencySection } from './components/AboutAgencySection';
import {
  AdmissionEnquirySection,
  type EnquiryPrefill,
} from './components/AdmissionEnquirySection';
import { ApplicationFormPageView } from './components/ApplicationFormPageView';
import { CampusGallerySection } from './components/CampusGallerySection';
import { CollegeCoursesPageView } from './components/CollegeCoursesPageView';
import { CollegesPageView } from './components/CollegesPageView';
import { ContactFooter } from './components/ContactFooter';
import { CounsellingGuidanceBanner } from './components/CounsellingGuidanceBanner';
import { HeroSection } from './components/HeroSection';
import { Navbar } from './components/Navbar';
import { ScholarshipsSection } from './components/ScholarshipsSection';
import { ZonesHomeView } from './components/ZonesHomeView';
import { agencyConfig } from './data/agencyConfig';
import { collegesData, tamilNaduZones } from './data/tamilNaduData';
import type { College, Course } from './types/admissions';

type ActiveView = 'home' | 'colleges' | 'college-details' | 'application';

export function App() {
  const [currentView, setCurrentView] = useState<ActiveView>('home');
  const [selectedZoneId, setSelectedZoneId] = useState<string | null>(null);
  const [activeCollege, setActiveCollege] = useState<College | null>(null);
  const [applicationCollege, setApplicationCollege] = useState<College | null>(null);
  const [applicationCourse, setApplicationCourse] = useState<Course | null>(null);
  const [enquiryPrefill] = useState<EnquiryPrefill | null>(null);

  const totalCourses = useMemo(
    () => collegesData.reduce((acc, col) => acc + col.courses.length, 0),
    []
  );

  const scrollToSection = (sectionId: string) => {
    if (currentView !== 'home') {
      setCurrentView('home');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
      return;
    }
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSelectZone = (zoneId: string) => {
    setSelectedZoneId(zoneId);
    setCurrentView('colleges');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewAllColleges = () => {
    setSelectedZoneId(null);
    setCurrentView('colleges');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCollege = (college: College) => {
    setActiveCollege(college);
    setCurrentView('college-details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToZones = () => {
    setCurrentView('home');
    setTimeout(() => {
      scrollToSection('zones');
    }, 50);
  };

  const handleBackToColleges = () => {
    setCurrentView('colleges');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEnquireCourse = (college: College, course: Course) => {
    setApplicationCollege(college);
    setApplicationCourse(course);
    setCurrentView('application');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (target: string) => {
    if (target === 'application') {
      setApplicationCollege(null);
      setApplicationCourse(null);
      setCurrentView('application');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    scrollToSection(target);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#FAF8F5] text-[#0A1A30]">
      <Navbar onNavigate={handleNavigate} />

      <main>
        {currentView === 'home' && (
          <>
            <HeroSection
              totalColleges={collegesData.length}
              totalCourses={totalCourses}
              onExploreZones={() => scrollToSection('zones')}
              onTalkToExpert={() => scrollToSection('enquiry')}
            />

            {/* 2nd Section: About College APA & Dr. B. Ramesh Advisory */}
            <AboutAgencySection
              onExploreZones={() => scrollToSection('zones')}
              onEnquire={() => scrollToSection('enquiry')}
            />

            {/* 3rd Section: Tamil Nadu Discovery Zones */}
            <ZonesHomeView
              zones={tamilNaduZones}
              colleges={collegesData}
              onSelectZone={handleSelectZone}
              onViewAllColleges={handleViewAllColleges}
            />

            {/* 4th Section: Featured Campus & Counselling Event Gallery */}
            <CampusGallerySection />

            {/* 5th Section: End-to-End Single-Window Guidance Banner (Edura Style with Floating Blue Bar) */}
            <CounsellingGuidanceBanner onEnquire={() => scrollToSection('enquiry')} />

            {/* 6th Section: Government & Merit Scholarships */}
            <ScholarshipsSection
              onEnquire={() => scrollToSection('enquiry')}
            />

            {/* 7th Section: Admission Enquiry Form */}
            <AdmissionEnquirySection
              colleges={collegesData}
              prefill={enquiryPrefill}
            />
          </>
        )}

        {currentView === 'colleges' && (
          <CollegesPageView
            zones={tamilNaduZones}
            colleges={collegesData}
            selectedZoneId={selectedZoneId}
            onChangeZone={(zoneId) => setSelectedZoneId(zoneId)}
            onSelectCollege={handleSelectCollege}
            onBackToZones={handleBackToZones}
          />
        )}

        {currentView === 'college-details' && activeCollege && (
          <CollegeCoursesPageView
            college={activeCollege}
            onBackToColleges={handleBackToColleges}
            onEnquireCourse={handleEnquireCourse}
          />
        )}

        {currentView === 'application' && (
          <ApplicationFormPageView
            initialCollege={applicationCollege}
            initialCourse={applicationCourse}
            onBack={() => {
              if (activeCollege) {
                setCurrentView('college-details');
              } else {
                setCurrentView('home');
              }
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}
      </main>

      <ContactFooter onNavigate={handleNavigate} />

      {/* Floating Always-Visible WhatsApp Icon (Bottom Right) */}
      <a
        href={`https://wa.me/${agencyConfig.whatsappNumber}?text=${encodeURIComponent(
          `Hello Dr. B. Ramesh (College APA), I would like direct admission and counselling guidance for Tamil Nadu colleges.`
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed right-5 bottom-5 sm:right-6 sm:bottom-6 z-50 group flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl shadow-emerald-950/40 transition-all duration-300 hover:bg-[#20ba5a] hover:scale-110 active:scale-95"
        aria-label="Direct WhatsApp (+91 99528 87324)"
        title="Chat on WhatsApp with Dr. B. Ramesh (+91 99528 87324)"
      >
        {/* Subtle pulsing ping ring */}
        <span
          className="pointer-events-none absolute -inset-1 rounded-full bg-[#25D366] opacity-30 animate-ping duration-1000"
          aria-hidden="true"
        />

        {/* Authentic Official WhatsApp Icon SVG */}
        <svg
          viewBox="0 0 24 24"
          className="relative h-8 w-8 sm:h-9 sm:w-9 fill-white transition-transform group-hover:scale-105"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12.04 2c-5.52 0-10 4.48-10 10 0 1.77.46 3.49 1.33 5.01L2 22l5.14-1.35c1.47.81 3.14 1.24 4.9 1.24 5.52 0 10-4.48 10-10S17.56 2 12.04 2zm0 18.25c-1.56 0-3.08-.42-4.41-1.21l-.32-.19-3.28.86.88-3.2-.21-.33c-.87-1.38-1.33-3-1.33-4.64 0-4.55 3.7-8.25 8.25-8.25 4.55 0 8.25 3.7 8.25 8.25 0 4.55-3.7 8.25-8.25 8.25zm4.51-6.17c-.25-.12-1.46-.72-1.69-.8-.23-.08-.39-.12-.56.12-.17.25-.65.8-.8 1-.15.19-.3.22-.55.1-.25-.12-1.05-.39-2-1.24-.74-.66-1.24-1.48-1.38-1.73-.15-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.15.17-.25.25-.42.08-.17.04-.32-.02-.44-.06-.12-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.16 0-.43.06-.66.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.12.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.43.53.6.19 1.15.16 1.58.1.48-.07 1.46-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.11-.23-.17-.48-.3z" />
        </svg>
      </a>
    </div>
  );
}

export default App;
