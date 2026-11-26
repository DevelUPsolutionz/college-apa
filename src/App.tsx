import { useMemo, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { AboutAgencySection } from './components/AboutAgencySection';
import {
  AdmissionEnquirySection,
  type EnquiryPrefill,
} from './components/AdmissionEnquirySection';
import { CollegeDetailsDrawer } from './components/CollegeDetailsDrawer';
import { CollegeDirectory } from './components/CollegeDirectory';
import { ContactFooter } from './components/ContactFooter';
import { HeroSection } from './components/HeroSection';
import { Navbar } from './components/Navbar';
import { ZoneExplorerSection } from './components/TamilNaduZoneMap';
import { agencyConfig } from './data/agencyConfig';
import { collegesData, tamilNaduZones } from './data/tamilNaduData';
import type { College, Course } from './types/admissions';

export function App() {
  const [selectedZoneId, setSelectedZoneId] = useState<string | null>(null);
  const [activeCollege, setActiveCollege] = useState<College | null>(null);
  const [enquiryPrefill, setEnquiryPrefill] = useState<EnquiryPrefill | null>(
    null
  );

  const totalCourses = useMemo(
    () => collegesData.reduce((acc, col) => acc + col.courses.length, 0),
    []
  );

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSelectZone = (zoneId: string | null, shouldScroll = true) => {
    setSelectedZoneId(zoneId);
    if (shouldScroll) {
      setTimeout(() => {
        scrollToSection('directory');
      }, 140);
    }
  };

  const handleEnquireCourse = (college: College, course: Course) => {
    setActiveCollege(null);
    setEnquiryPrefill({
      collegeId: college.id,
      courseId: course.id,
      district: college.district,
    });
    setTimeout(() => {
      scrollToSection('enquiry');
    }, 180);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#F8FAFC] text-[#0F172A]">
      <Navbar onNavigate={scrollToSection} />

      <main>
        <HeroSection
          zones={tamilNaduZones}
          totalColleges={collegesData.length}
          totalCourses={totalCourses}
          onExploreZones={() => scrollToSection('zones')}
          onTalkToExpert={() => scrollToSection('enquiry')}
          onQuickSelectZone={(zoneId) => handleSelectZone(zoneId, true)}
        />

        <ZoneExplorerSection
          zones={tamilNaduZones}
          colleges={collegesData}
          selectedZoneId={selectedZoneId}
          onSelectZone={(zoneId) => handleSelectZone(zoneId, true)}
        />

        <CollegeDirectory
          zones={tamilNaduZones}
          colleges={collegesData}
          selectedZoneId={selectedZoneId}
          onChangeZone={(zoneId) => handleSelectZone(zoneId, false)}
          onSelectCollege={(college) => setActiveCollege(college)}
        />

        <AdmissionEnquirySection
          colleges={collegesData}
          prefill={enquiryPrefill}
        />

        <AboutAgencySection />
      </main>

      <ContactFooter onNavigate={scrollToSection} />

      <CollegeDetailsDrawer
        key={activeCollege?.id ?? 'closed'}
        college={activeCollege}
        onClose={() => setActiveCollege(null)}
        onEnquireCourse={handleEnquireCourse}
      />

      {/* Sticky Mobile WhatsApp Enquiry Button */}
      <a
        href={`https://wa.me/${agencyConfig.whatsappNumber}?text=${encodeURIComponent(
          `Hello ${agencyConfig.brandName}, I would like admission guidance for Tamil Nadu colleges.`
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed right-4 bottom-4 z-30 inline-flex items-center gap-2 rounded-full bg-[#059669] px-4 py-3 text-xs font-semibold text-white shadow-lg shadow-emerald-900/25 transition-transform hover:scale-105 md:hidden"
        aria-label="WhatsApp Admission Enquiry"
      >
        <MessageCircle className="h-4 w-4" />
        WhatsApp Enquiry
      </a>
    </div>
  );
}

export default App;
