// HeroContent.jsx - Fixed for Large Screens
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

export default function HeroContent() {
  const containerRef = useRef(null);
  const headlineRef = useRef(null);
  const subtextRef = useRef(null);
  const ctaRef = useRef(null);
  const brandRef = useRef(null);
  const primaryBtnRef = useRef(null);
  const secondaryBtnRef = useRef(null);
  const arrowSvgRef = useRef(null);
  const playIconRef = useRef(null);

  // Responsive shadow effect for container
  useEffect(() => {
    if (window.innerWidth >= 1024) {
      gsap.to(containerRef.current, {
        boxShadow: "80px 0 100px -30px #F7F4ED, 40px 0 60px -15px #F7F4ED",
        duration: 0.5,
        delay: 0.3
      });
    } else {
      gsap.to(containerRef.current, {
        boxShadow: "0 20px 40px -15px rgba(0,0,0,0.1)",
        duration: 0.5,
        delay: 0.3
      });
    }
  }, []);

  // Button hover & click animations
  const handlePrimaryHoverEnter = () => {
    gsap.to(primaryBtnRef.current, { scale: 1.03, backgroundColor: "#8B6942", duration: 0.3 });
    gsap.to(arrowSvgRef.current, { x: 6, duration: 0.25 });
  };

  const handlePrimaryHoverLeave = () => {
    gsap.to(primaryBtnRef.current, { scale: 1, backgroundColor: "#A17C50", duration: 0.3 });
    gsap.to(arrowSvgRef.current, { x: 0, duration: 0.25 });
  };

  const handleSecondaryHoverEnter = () => {
    gsap.to(secondaryBtnRef.current, { scale: 1.03, duration: 0.3 });
    gsap.to(playIconRef.current, { scale: 1.25, duration: 0.2, ease: "back.out(0.6)" });
  };

  const handleSecondaryHoverLeave = () => {
    gsap.to(secondaryBtnRef.current, { scale: 1, duration: 0.3 });
    gsap.to(playIconRef.current, { scale: 1, duration: 0.2 });
  };

  const handlePrimaryClick = () => {
    gsap.timeline()
      .to(primaryBtnRef.current, { scale: 0.96, duration: 0.1 })
      .to(primaryBtnRef.current, { scale: 1.03, duration: 0.2, ease: "elastic.out(1, 0.5)" })
      .to(primaryBtnRef.current, { scale: 1, duration: 0.15 });
  };

  const handleSecondaryClick = () => {
    gsap.timeline()
      .to(secondaryBtnRef.current, { scale: 0.97, duration: 0.1 })
      .to(secondaryBtnRef.current, { scale: 1.03, duration: 0.2, ease: "back.out(0.8)" })
      .to(secondaryBtnRef.current, { scale: 1, duration: 0.15 });
  };

  // Idle floating animations - desktop only
  useEffect(() => {
    if (window.innerWidth >= 1024) {
      gsap.to(primaryBtnRef.current, { y: -3, duration: 1.5, repeat: -1, yoyo: true, ease: "power1.inOut", delay: 0.8 });
      gsap.to(secondaryBtnRef.current, { y: -2, duration: 1.8, repeat: -1, yoyo: true, ease: "power1.inOut", delay: 1 });
    }
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full bg-gradient-to-br from-[#F6F3EC] to-[#FDFBF7] flex flex-col justify-center p-6 sm:p-8 md:p-10 lg:p-12 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] lg:shadow-[250px_0_300px_-10px_#F7F4ED,180px_0_220px_0px_#F7F4ED,100px_0_120px_10px_#F7F4ED]"
    >
      {/* Glow effects - responsive */}
      <div className="absolute top-0 right-0 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 bg-[#A17C50]/10 rounded-full blur-[40px] sm:blur-[60px] md:blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-24 h-24 sm:w-36 sm:h-36 md:w-48 md:h-48 bg-[#A17C50]/5 rounded-full blur-[30px] sm:blur-[40px] md:blur-[60px] pointer-events-none" />

      <div className="relative z-10">
        <div className="mb-4 sm:mb-5 md:mb-6">
          <span className="text-[10px] sm:text-xs md:text-sm font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-[#A17C50] block mb-3 sm:mb-4 border-l-2 sm:border-l-3 border-[#A17C50] pl-3 sm:pl-4">
            Patent-Pending Technology
          </span>
          <h1 ref={headlineRef} className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-serif font-normal tracking-tight text-gray-900 leading-[1.2]">
            Design Elevator Interiors <br />
            <span className="font-sans font-light text-[#A17C50]">Without Limits</span>
          </h1>
        </div>

        <p ref={subtextRef} className="text-gray-600 font-normal text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed mb-6 sm:mb-7 md:mb-8 max-w-md">
          The all-in-one platform for visualization, customization, budgeting, and collaboration—built exclusively for the elevator industry.
        </p>

        {/* Action Buttons - Responsive */}
        <div ref={ctaRef} className="flex flex-wrap items-center gap-3 sm:gap-4 md:gap-5 mb-8 sm:mb-9 md:mb-10">
          <button
            ref={primaryBtnRef}
            onClick={handlePrimaryClick}
            onMouseEnter={handlePrimaryHoverEnter}
            onMouseLeave={handlePrimaryHoverLeave}
            className="bg-[#A17C50] text-white font-sans font-semibold text-[10px] sm:text-xs md:text-sm tracking-[0.12em] sm:tracking-[0.15em] px-5 sm:px-6 md:px-7 lg:px-9 py-2.5 sm:py-3 md:py-3.5 lg:py-4 rounded-sm flex items-center gap-2 sm:gap-3 shadow-[0_8px_25px_-5px_rgba(161,124,80,0.4),0_0_0_1px_rgba(255,255,255,0.3)_inset] focus:outline-none transition-all"
          >
            START DESIGNING
            <svg ref={arrowSvgRef} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </button>

          <button
            ref={secondaryBtnRef}
            onClick={handleSecondaryClick}
            onMouseEnter={handleSecondaryHoverEnter}
            onMouseLeave={handleSecondaryHoverLeave}
            className="border-2 border-[#A17C50]/30 bg-white/60 text-gray-700 hover:text-[#A17C50] font-sans font-semibold text-[10px] sm:text-xs md:text-sm tracking-[0.12em] sm:tracking-[0.15em] px-4 sm:px-5 md:px-6 lg:px-7 py-2.5 sm:py-3 md:py-3.5 lg:py-4 rounded-sm flex items-center gap-2 sm:gap-3 backdrop-blur-sm transition-all shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_20px_rgba(161,124,80,0.15)] focus:outline-none"
          >
            <span ref={playIconRef} className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-5 rounded-full border-2 border-gray-500 flex items-center justify-center text-[6px] sm:text-[7px] md:text-[8px] pl-0.5 bg-white shadow-sm">
              ▶
            </span>
            WATCH VIDEO
          </button>
        </div>

        {/* Social Proof - Responsive */}
        <div ref={brandRef} className="pt-6 sm:pt-7 md:pt-8 border-t border-[#A17C50]/20">
          <p className="text-[9px] sm:text-[10px] md:text-xs uppercase tracking-[0.12em] sm:tracking-[0.15em] font-bold text-[#A17C50]/60 mb-3 sm:mb-4">Trusted By Industry Leaders</p>
          <div className="flex flex-wrap gap-4 sm:gap-5 md:gap-7 items-center opacity-60 grayscale font-sans font-black tracking-tighter text-xs sm:text-sm md:text-base text-gray-600">
            <span className="hover:opacity-100 hover:grayscale-0 hover:text-[#A17C50] transition-all cursor-pointer">OTIS</span>
            <span className="hover:opacity-100 hover:grayscale-0 hover:text-[#A17C50] transition-all cursor-pointer">KONE</span>
            <span className="hover:opacity-100 hover:grayscale-0 hover:text-[#A17C50] transition-all cursor-pointer">TKE</span>
            <span className="font-light tracking-wide text-[11px] sm:text-xs md:text-sm hover:opacity-100 hover:grayscale-0 hover:text-[#A17C50] transition-all cursor-pointer">Schindler</span>
          </div>
        </div>
      </div>
    </div>
  );
}