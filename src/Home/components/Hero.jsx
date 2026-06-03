// Hero.jsx - Parent Component (Fixed for Large Screens)
import { useState, useEffect, useRef } from 'react';

import HeroContent from './heroComponent/HeroContent';
import HeroGallery from './heroComponent/HeroGallery';
import HeroStudioPanel from './heroComponent/HeroStudioPanel';


export default function Hero() {
  const containerRef = useRef(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const galleryImages = [
    { id: 1, src: "Elevators/GAF-001v1.jpg", title: "Modern Elevator Cabin" },
    { id: 2, src: "Elevators/GAF-003 v1.jpg", title: "Luxury Interior Design" },
    { id: 3, src: "Elevators/GAF-004 v1.jpg", title: "Premium Finishes" },
    { id: 4, src: "Elevators/GAF-005 v1.jpg", title: "Contemporary Style" },
    { id: 5, src: "Elevators/GAF-003 v1.jpg", title: "Glass Elevator Design" },
    { id: 6, src: "Elevators/GAF-004 v1.jpg", title: "Wood Panel Elevator" },
  ];

  // Auto slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [galleryImages.length]);

  return (
    <section ref={containerRef} className="relative min-h-screen w-full font-sans overflow-hidden pt-16 md:pt-20 lg:pt-10" style={{ backgroundColor: '#F7F4ED' }}>
      {/* White shadow overlay for depth */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-48 h-48 md:w-64 md:h-64 lg:w-96 lg:h-96 bg-white/30 rounded-full blur-[60px] md:blur-[80px] lg:blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-48 h-48 md:w-64 md:h-64 lg:w-96 lg:h-96 bg-white/20 rounded-full blur-[60px] md:blur-[80px] lg:blur-[100px]" />
      </div>
      
      <div className="relative z-10 w-full min-h-screen flex flex-col lg:flex-row items-center lg:items-stretch">
        {/* Hero Content - Top on mobile, Left on desktop */}
        <div className="hero-content order-1 w-full lg:w-[35%] lg:order-1 lg:flex lg:items-stretch">
          <HeroContent />
        </div>

        {/* Hero Gallery - Middle on mobile, Center on desktop */}
        <div className="hero-gallery order-2 w-full lg:w-[40%] lg:order-2 flex items-center justify-center">
          <HeroGallery 
            currentImageIndex={currentImageIndex} 
            galleryImages={galleryImages}
          />
        </div>

        {/* Hero Studio Panel - Bottom on mobile, Right on desktop */}
        <div className="hero-panel order-3 w-full md:w-[80%] lg:w-[25%] lg:order-3 flex items-center justify-center lg:justify-end">
          <HeroStudioPanel 
            currentImageIndex={currentImageIndex} 
            totalImages={galleryImages.length} 
          />
        </div>
      </div>
    </section>
  );
}