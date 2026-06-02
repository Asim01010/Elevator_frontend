import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Hero() {
  const containerRef = useRef(null);
  const bgImageRef = useRef(null);
  const headlineRef = useRef(null);
  const subtextRef = useRef(null);
  const ctaRef = useRef(null);
  const brandRef = useRef(null);
  const configPanelRef = useRef(null);
  const leftCardRef = useRef(null);
  const imageContainerRef = useRef(null);

  // Button-specific refs for micro-interactions
  const primaryBtnRef = useRef(null);
  const secondaryBtnRef = useRef(null);
  const arrowSvgRef = useRef(null);
  const playIconRef = useRef(null);

  // Gallery images for zoom in/out effect
  const galleryImages = [
    { id: 1, src: "Elevators/GAF-001v1.jpg", title: "Modern Elevator Cabin" },
    { id: 2, src: "Elevators/GAF-003 v1.jpg", title: "Luxury Interior Design" },
    { id: 3, src: "Elevators/GAF-004 v1.jpg", title: "Premium Finishes" },
    { id: 4, src: "Elevators/GAF-005 v1.jpg", title: "Contemporary Style" },
    { id: 5, src: "Elevators/GAF-003 v1.jpg", title: "Glass Elevator Design" },
    { id: 6, src: "Elevators/GAF-004 v1.jpg", title: "Wood Panel Elevator" },
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Hover/Click Animations for Buttons
  const handlePrimaryHoverEnter = () => {
    gsap.to(primaryBtnRef.current, {
      scale: 1.02,
      backgroundColor: "#8B6942",
      duration: 0.3,
      ease: "power2.out"
    });
    gsap.to(arrowSvgRef.current, {
      x: 5,
      duration: 0.25,
      ease: "power1.out"
    });
  };

  const handlePrimaryHoverLeave = () => {
    gsap.to(primaryBtnRef.current, {
      scale: 1,
      backgroundColor: "#A17C50",
      duration: 0.3,
      ease: "power2.out"
    });
    gsap.to(arrowSvgRef.current, {
      x: 0,
      duration: 0.25,
      ease: "power1.out"
    });
  };

  const handleSecondaryHoverEnter = () => {
    gsap.to(secondaryBtnRef.current, {
      scale: 1.02,
      borderColor: "rgba(161, 124, 80, 0.8)",
      backgroundColor: "rgba(161, 124, 80, 0.12)",
      duration: 0.3,
      ease: "power2.out"
    });
    gsap.to(playIconRef.current, {
      scale: 1.2,
      duration: 0.2,
      ease: "back.out(0.6)"
    });
  };

  const handleSecondaryHoverLeave = () => {
    gsap.to(secondaryBtnRef.current, {
      scale: 1,
      borderColor: "rgba(161, 124, 80, 0.3)",
      backgroundColor: "rgba(161, 124, 80, 0.05)",
      duration: 0.3,
      ease: "power2.out"
    });
    gsap.to(playIconRef.current, {
      scale: 1,
      duration: 0.2,
      ease: "power1.out"
    });
  };

  const handlePrimaryClick = () => {
    gsap.timeline()
      .to(primaryBtnRef.current, { scale: 0.97, duration: 0.1, ease: "power1.in" })
      .to(primaryBtnRef.current, { scale: 1.02, duration: 0.2, ease: "elastic.out(1, 0.5)" })
      .to(primaryBtnRef.current, { scale: 1, duration: 0.15 });
  };

  const handleSecondaryClick = () => {
    gsap.timeline()
      .to(secondaryBtnRef.current, { scale: 0.98, duration: 0.1, ease: "power1.in" })
      .to(secondaryBtnRef.current, { scale: 1.02, duration: 0.2, ease: "back.out(0.8)" })
      .to(secondaryBtnRef.current, { scale: 1, duration: 0.15 });
  };

  // Idle Floating Animation loops for buttons
  useEffect(() => {
    gsap.to(primaryBtnRef.current, {
      y: -3,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      delay: 0.8
    });

    gsap.to(secondaryBtnRef.current, {
      y: -2,
      duration: 1.8,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      delay: 1
    });
  }, []);

  // Image slideshow with zoom in/out effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [galleryImages.length]);

  // GSAP animation for image zoom effect
  useEffect(() => {
    if (bgImageRef.current) {
      gsap.fromTo(bgImageRef.current,
        { scale: 1.15, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.5, ease: "power2.out" }
      );
    }
  }, [currentImageIndex]);

  // Responsive animations for mobile/desktop
  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    // Check if mobile
    const isMobile = window.innerWidth < 1024;

    if (isMobile) {
      // Mobile: Top to bottom animations
      tl.fromTo(imageContainerRef.current,
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 }
      )
      .fromTo(leftCardRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 }
      )
      .fromTo(configPanelRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 }
      );
    } else {
      // Desktop: Left to right animations
      tl.fromTo(imageContainerRef.current,
        { x: -60, opacity: 0 },
        { x: 0, opacity: 1, duration: 1 }
      )
      .fromTo(leftCardRef.current,
        { x: 60, opacity: 0 },
        { x: 0, opacity: 1, duration: 1 }
      )
      .fromTo(configPanelRef.current,
        { x: 60, opacity: 0 },
        { x: 0, opacity: 1, duration: 1 }
      );
    }

    tl.fromTo(headlineRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 }
    )
    .fromTo(subtextRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 }
    )
    .fromTo(ctaRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 }
    )
    .fromTo(brandRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 }
    );

  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-screen w-full font-sans overflow-hidden"
      style={{ backgroundColor: '#F7F4ED' }}
    >
      {/* Main Content Container - Responsive Layout */}
      <div className="relative z-10 w-full min-h-screen flex flex-col lg:flex-row justify-between items-center lg:items-stretch">
    

        {/* MIDDLE - Left Card Component */}
        <div 
          ref={leftCardRef}
          className="w-full lg:w-1/3 bg-[#F6F3EC] p-8 md:p-10 flex flex-col justify-centershadow-[0_10px_40px_rgba(0,0,0,0.05),-15px_0_50px_80px_rgba(246,243,236,1)] lg:shadow-[-15px_0_50px_80px_rgba(246,243,236,1),0_40px_200px_rgba(161,124,80,0.35)]"
        >
          <div>
            <span className="text-xs md:text-sm font-bold uppercase tracking-widest text-[#A17C50] block mb-4 border-l-3 border-[#A17C50] pl-4">
              Patent-Pending Technology
            </span>
            <div className="overflow-hidden">
              <h1 
                ref={headlineRef} 
                className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-serif font-normal tracking-tight text-gray-900 leading-[1.2] mb-4"
              >
                Design Elevator Interiors <br />
                <span className="font-sans font-light text-[#A17C50] italic">Without Limits</span>
              </h1>
            </div>
          </div>

          <p ref={subtextRef} className="text-gray-700 font-normal text-sm md:text-base lg:text-lg leading-relaxed mb-6">
            The all-in-one platform for visualization, customization, budgeting, and collaboration—built exclusively for the elevator industry.
          </p>

          {/* Action Buttons */}
          <div ref={ctaRef} className="flex flex-wrap items-center gap-4 md:gap-5 mb-8">
            <button
              ref={primaryBtnRef}
              onClick={handlePrimaryClick}
              onMouseEnter={handlePrimaryHoverEnter}
              onMouseLeave={handlePrimaryHoverLeave}
              className="bg-[#A17C50] text-white font-sans font-medium text-xs md:text-sm tracking-widest px-6 md:px-8 py-3 md:py-4 rounded-sm flex items-center gap-3 shadow-lg focus:outline-none transition-all"
              style={{ 
                boxShadow: '0 6px 20px rgba(161, 124, 80, 0.35)',
                letterSpacing: '0.1em'
              }}
            >
              START DESIGNING
              <svg 
                ref={arrowSvgRef}
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth={2.5} 
                stroke="currentColor" 
                className="w-3.5 h-3.5 md:w-4 md:h-4"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </button>

            <button
              ref={secondaryBtnRef}
              onClick={handleSecondaryClick}
              onMouseEnter={handleSecondaryHoverEnter}
              onMouseLeave={handleSecondaryHoverLeave}
              className="border-2 border-[#A17C50]/40 bg-white/40 text-gray-800 hover:text-[#A17C50] font-sans font-medium text-xs md:text-sm tracking-widest px-5 md:px-6 py-3 md:py-4 rounded-sm flex items-center gap-3 backdrop-blur-xs transition-all focus:outline-none"
              style={{ letterSpacing: '0.1em' }}
            >
              <span 
                ref={playIconRef}
                className="w-4 h-4 md:w-5 md:h-5 rounded-full border-2 border-gray-500 flex items-center justify-center text-[7px] md:text-[8px] pl-0.5 bg-white"
                style={{ transition: 'all 0.2s ease' }}
              >
                ▶
              </span>
              WATCH VIDEO
            </button>
          </div>

          {/* Social Proof */}
          <div ref={brandRef} className="pt-6 border-t border-gray-300/50">
            <p className="text-[10px] md:text-xs uppercase tracking-widest font-bold text-gray-500 mb-3">Trusted By Industry Leaders</p>
            <div className="flex flex-wrap gap-4 md:gap-6 items-center opacity-70 grayscale font-sans font-black tracking-tighter text-sm md:text-base text-gray-700">
              <span>OTIS</span>
              <span>KONE</span>
              <span>TKE</span>
              <span className="font-light tracking-wide text-xs md:text-sm">Schindler</span>
            </div>
          </div>
        </div>

            
        {/* LEFT SIDE - Image Gallery (Moves to top on mobile) */}
        <div 
          ref={imageContainerRef}
          className="w-full lg:w-1/3 flex items-center  justify-center p-6 lg:p-10 pt-10 lg:pt-0"
        >
          <div className="relative w-full max-w-md mx-auto lg:mx-0">
            <img 
              ref={bgImageRef}
              src={galleryImages[currentImageIndex].src} 
              alt={galleryImages[currentImageIndex].title} 
              className="w-full h-auto max-h-[50vh] lg:max-h-[70vh] object-contain rounded-2xl shadow-2xl"
            />
            
            {/* Image Navigation Dots */}
            <div className="flex justify-center gap-2 mt-4">
              {galleryImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    currentImageIndex === index ? 'w-6 bg-[#A17C50]' : 'bg-gray-400 hover:bg-gray-500'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - Studio Panel Component */}
        <div 
          ref={configPanelRef} 
          className="w-full lg:w-1/3 bg-[#F6F3EC]/95 backdrop-blur-sm border border-[#EBE6DA] m-0 lg:m-6 rounded-2xl p-6 md:p-8 shadow-[0_30px_70px_-10px_rgba(0,0,0,0.15),0_40px_100px_rgba(0,0,0,0.1)] space-y-6 md:space-y-8"
        > 
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-200 pb-4">
            <span className="text-sm md:text-base font-bold uppercase tracking-wider text-gray-900">Design Studio</span>
            <span className="text-[#A17C50] text-xs font-mono font-bold bg-[#A17C50]/10 px-2 py-1 rounded">v2.0</span>
          </div>

          {/* Configurations */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-600 block">Configurations</label>
            <div className="grid grid-cols-4 gap-2">
              {['Standard', 'Premium', 'Luxury', 'Custom'].map((config, i) => (
                <div key={i} className={`h-10 md:h-12 border rounded-md flex items-center justify-center cursor-pointer transition-all ${i === 0 ? 'border-[#A17C50] bg-[#A17C50]/10 font-semibold' : 'border-gray-300 bg-white/50 hover:border-gray-400'}`}>
                  <span className="text-xs text-gray-700 font-medium">{config.charAt(0)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Wall Material Panels */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-600 block">Wall Material</label>
            <div className="flex gap-2 md:gap-3 flex-wrap">
              <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-[#D1C2A5] ring-2 ring-[#A17C50] ring-offset-2 ring-offset-[#F6F3EC] cursor-pointer transition-all hover:scale-110" title="Wood Grain" />
              <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-[#E5DEC9] cursor-pointer hover:scale-110 transition-transform border border-gray-300" title="Light Oak" />
              <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-[#F5F2EB] cursor-pointer hover:scale-110 transition-transform border border-gray-300" title="White Marble" />
              <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-[#3A332E] cursor-pointer hover:scale-110 transition-transform" title="Dark Walnut" />
              <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-[#8B7355] cursor-pointer hover:scale-110 transition-transform" title="Bronze" />
            </div>
          </div>

          {/* Handrails Spec */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-600 block">Handrails Spec</label>
            <div className="relative">
              <div className="h-2 w-full bg-gray-200 rounded-full cursor-pointer">
                <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-3 h-3 md:w-4 md:h-4 rounded-full bg-[#A17C50] shadow-md border-2 border-white cursor-pointer transition-all hover:scale-110" />
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-[9px] md:text-[10px] text-gray-500">Standard</span>
                <span className="text-[9px] md:text-[10px] text-gray-500">Premium</span>
                <span className="text-[9px] md:text-[10px] text-gray-500">Luxury</span>
              </div>
            </div>
          </div>

          {/* Lighting Ambience */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-600 block">Lighting Ambience</label>
            <div className="flex gap-2">
              <button className="flex-1 text-xs py-2 rounded border border-gray-300 bg-white/50 hover:bg-[#A17C50]/10 hover:border-[#A17C50] transition-all">Warm</button>
              <button className="flex-1 text-xs py-2 rounded border border-gray-300 bg-white/50 hover:bg-[#A17C50]/10 hover:border-[#A17C50] transition-all">Cool</button>
              <button className="flex-1 text-xs py-2 rounded border border-gray-300 bg-white/50 hover:bg-[#A17C50]/10 hover:border-[#A17C50] transition-all">Smart</button>
            </div>
          </div>

          {/* CTA Button */}
          <button className="w-full bg-[#A17C50] hover:bg-[#8B6942] text-white text-sm font-bold tracking-widest py-3 md:py-3.5 rounded transition-colors duration-300 shadow-md hover:shadow-lg">
            VIEW 3D RENDERING
          </button>

          {/* Image Counter */}
          <div className="text-center pt-2">
            <p className="text-[9px] md:text-[10px] text-gray-400 uppercase tracking-wider">
              {currentImageIndex + 1} / {galleryImages.length} • Premium Gallery
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}