import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, CheckCircle2, ChevronRight, Eye, Sparkles, X } from 'lucide-react';

interface GalleryItem {
  id: string;
  src: string;
  title: string;
  subtitle: string;
  category: string;
}

const galleryItems: GalleryItem[] = [
  {
    id: 'gallery-1',
    src: '/gallery/event-1.jpg',
    title: 'Admission Guidance & Counselling Hall',
    subtitle: 'Students and parents participating in college selection counselling',
    category: 'Counselling Session',
  },
  {
    id: 'gallery-2',
    src: '/gallery/event-2.jpg',
    title: 'Merit Award & Student Felicitation',
    subtitle: 'Honouring outstanding academic achievers and scholarship recipients',
    category: 'Merit Felicitation',
  },
  {
    id: 'gallery-3',
    src: '/gallery/event-3.jpg',
    title: 'College APA Advisory Memento Presentation',
    subtitle: 'Official institutional recognition and student guidance honors',
    category: 'Special Honors',
  },
  {
    id: 'gallery-4',
    src: '/gallery/event-4.jpg',
    title: 'Parent & Scholar Advisory Meet',
    subtitle: 'Families receiving direct admission guidance from Dr. B. Ramesh',
    category: 'Advisory Meet',
  },
];

export function CampusGallerySection() {
  const [activeModalImage, setActiveModalImage] = useState<GalleryItem | null>(null);

  return (
    <section id="gallery" className="py-16 sm:py-20 lg:py-24 bg-white border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header (Edura Style with Pill and Bold Heading) */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end border-b border-slate-200 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1 text-xs font-bold tracking-wider text-[#0F2239] uppercase">
              <Camera className="h-3.5 w-3.5 text-[#2563EB]" />
              <span>Campus &amp; Counselling Gallery</span>
            </div>
            <h2 className="font-display mt-3 text-3xl font-extrabold tracking-tight text-[#0F2239] sm:text-4xl lg:text-5xl">
              Moments of Achievement &amp; Guidance
            </h2>
            <p className="mt-2.5 max-w-2xl text-base text-slate-600 sm:text-lg">
              A glimpse into our admission counselling sessions, merit felicitations, and student guidance events across Tamil Nadu.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            <span>4 Featured Event Highlights</span>
          </div>
        </div>

        {/* 4 Large Clean Edura-Style Gallery Cards */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {galleryItems.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
              onClick={() => setActiveModalImage(item)}
              className="group cursor-pointer flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all hover:border-[#2563EB] hover:shadow-xl hover:shadow-slate-900/5"
            >
              {/* Photo Frame */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                <img
                  src={item.src}
                  alt={item.title}
                  className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Overlay hover effect matching Edura card */}
                <div className="absolute inset-0 bg-[#071322]/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#2563EB] shadow-lg transform scale-75 group-hover:scale-100 transition-transform">
                    <Eye className="h-6 w-6" />
                  </span>
                </div>

                {/* Category Pill Tag */}
                <span className="absolute top-3 left-3 rounded-full bg-[#0F2239]/80 backdrop-blur-xs px-3 py-1 text-[11px] font-bold text-white shadow-xs">
                  {item.category}
                </span>
              </div>

              {/* Caption Card */}
              <div className="p-5 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="font-display text-base font-bold text-[#0F2239] group-hover:text-[#2563EB] transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs text-slate-500 leading-relaxed line-clamp-2">
                    {item.subtitle}
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-xs font-bold text-[#2563EB]">
                  <span>View Photo</span>
                  <ChevronRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox / Zoom Modal */}
      <AnimatePresence>
        {activeModalImage && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#071322]/80 backdrop-blur-sm"
            onClick={() => setActiveModalImage(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-3xl w-full overflow-hidden rounded-3xl bg-white shadow-2xl border border-slate-200"
            >
              <div className="relative aspect-[16/10] w-full bg-slate-900">
                <img
                  src={activeModalImage.src}
                  alt={activeModalImage.title}
                  className="h-full w-full object-contain"
                />
                <button
                  type="button"
                  onClick={() => setActiveModalImage(null)}
                  className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black transition-colors"
                  aria-label="Close image modal"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="p-6 bg-white">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 border border-blue-200 px-3 py-0.5 text-xs font-bold text-[#2563EB]">
                  <Sparkles className="h-3 w-3" />
                  {activeModalImage.category}
                </span>
                <h3 className="font-display mt-2 text-xl font-bold text-[#0F2239]">
                  {activeModalImage.title}
                </h3>
                <p className="mt-1 text-sm text-slate-600">
                  {activeModalImage.subtitle}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
