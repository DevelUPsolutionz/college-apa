import { useMemo, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { AboutAgencySection } from './components/AboutAgencySection';
import {
  AdmissionEnquirySection,
  type EnquiryPrefill,
} from './components/AdmissionEnquirySection';
import { CampusGallerySection } from './components/CampusGallerySection';
import { CollegeCoursesPageView } from './components/CollegeCoursesPageView';
import { CollegesPageView } from './components/CollegesPageView';
import { ContactFooter } from './components/ContactFooter';
import { HeroSection } from './components/HeroSection';
import { Navbar } from './components/Navbar';
import { ScholarshipsSection } from './components/ScholarshipsSection';
import { ZonesHomeView } from './components/ZonesHomeView';
import { agencyConfig } from './data/agencyConfig';
import { collegesData, tamilNaduZones } from './data/tamilNaduData';
import type { College, Course } from './types/admissions';

type ActiveView = 'home' | 'colleges' | 'college-details';

export function App() {
  const [currentView, setCurrentView] = useState<ActiveView>('home');
  const [selectedZoneId, setSelectedZoneId] = useState<string | null>(null);
  const [activeCollege, setActiveCollege] = useState<College | null>(null);
  const [enquiryPrefill, setEnquiryPrefill] = useState<EnquiryPrefill | null>(null);

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
    setEnquiryPrefill({
      collegeId: college.id,
      courseId: course.id,
      district: college.district,
    });
    setCurrentView('home');
    setTimeout(() => {
      scrollToSection('enquiry');
    }, 120);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#FAF8F5] text-[#0A1A30]">
      <Navbar onNavigate={scrollToSection} />

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

            {/* 5th Section: Government & Merit Scholarships */}
            <ScholarshipsSection
              onEnquire={() => scrollToSection('enquiry')}
            />

            {/* 6th Section: Admission Enquiry Form */}
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
      </main>

      <ContactFooter onNavigate={scrollToSection} />

      {/* Floating Sticky Mobile WhatsApp Button */}
      <a
        href={`https://wa.me/${agencyConfig.whatsappNumber}?text=${encodeURIComponent(
          `Hello College APA (Dr. B. Ramesh), I would like admission guidance for Tamil Nadu colleges.`
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed right-4 bottom-4 z-30 inline-flex items-center gap-2 rounded-full bg-[#059669] px-4 py-3 text-xs font-bold text-white shadow-lg shadow-emerald-950/30 transition-transform hover:scale-105 md:hidden"
        aria-label="WhatsApp Admission Enquiry"
      >
        <MessageCircle className="h-4 w-4" />
        WhatsApp Dr. B. Ramesh
      </a>
    </div>
  );
}

export default App;
