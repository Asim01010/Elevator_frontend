import { useRef } from 'react';
import { gsap } from 'gsap';
import { FaArrowRight } from "react-icons/fa";
export default function Features() {
  const containerRef = useRef(null);
  const mainBtnRef = useRef(null);
  const mainArrowRef = useRef(null);

  // Main button micro-interaction
  const handleMainBtnEnter = () => {
    gsap.to(mainBtnRef.current, {
      backgroundColor: '#876C51',
      color: '#FFFFFF',
      duration: 0.3,
      ease: 'power2.out',
    });
    gsap.to(mainArrowRef.current, {
      x: 4,
      duration: 0.25,
      ease: 'power1.out',
    });
  };

  const handleMainBtnLeave = () => {
    gsap.to(mainBtnRef.current, {
      backgroundColor: 'transparent',
      color: '#876C51',
      duration: 0.3,
      ease: 'power2.out',
    });
    gsap.to(mainArrowRef.current, {
      x: 0,
      duration: 0.25,
      ease: 'power1.out',
    });
  };

  const workflowSteps = [
    {
      num: '01',
      title: 'DESIGN',
      desc: 'Customize every detail in our interactive image.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-10 h-10">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
        </svg>
      ),
    },
    {
      num: '02',
      title: 'VISUALIZE',
      desc: 'Real-time 3D renderings bring your design in life.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-10 h-10">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
        </svg>
      ),
    },
    {
      num: '03',
      title: 'BUDGET',
      desc: 'Smart pricing & budgeting with instant elements.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-10 h-10">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5A3.375 3.375 0 0010.125 2.25H3.75A2.25 2.25 0 001.5 4.5v15a2.25 2.25 0 002.25 2.25h16.5A2.25 2.25 0 0022.5 19.5v-5.25m-3 0A3.375 3.375 0 0016.5 11.25h-3m3 3a3.375 3.375 0 01-3.375-3.375M13.5 11.25v-2.25M6 16h6M6 12h3" />
        </svg>
      ),
    },
    {
      num: '04',
      title: 'DOCUMENT',
      desc: 'Coordinate drawings, space & submittals automatically.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-10 h-10">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      num: '05',
      title: 'COLLABORATE',
      desc: 'Share, review & approve with your team in real time.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-10 h-10">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.336 9.336 0 002.625-.372 9.337 9.337 0 004.121-3.82 4.125 4.125 0 00-3.238-6.109c-.453.052-.902.1-1.351.144m-1.157-1.171a9.742 9.742 0 00-3.178-1.24 9.742 9.742 0 00-3.178 1.24m6.356 0a10.875 10.875 0 00-6.356 0m6.356 0A3.75 3.75 0 100.5 7.5M12 15.75a3 3 0 100-6 3 3 0 000 6zm0 0v4.5m0-4.5a4.5 4.5 0 00-.88 8.914M12 15.75a4.5 4.5 0 01.88 8.914" />
        </svg>
      ),
    },
    {
      num: '06',
      title: 'PRODUCE',
      desc: 'Connect with suppliers and fabricators.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-10 h-10">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3.75-9h1.5m-1.5 3h1.5m-1.5 3h1.5" />
        </svg>
      ),
    },
  ];

  return (
    <section 
      ref={containerRef} 
      className="bg-[#F5EEE4] w-full py-2 px-6 lg:px-16 flex items-center justify-center font-sans overflow-hidden"
    >
      {/* Main Container splits into 2 unequal horizontal sections exactly like the image */}
      <div className="w-full max-w-[1600px] flex flex-col lg:flex-row items-center justify-between gap-12 xl:gap-16">
        
        {/* LEFT BRAND SECTION: Stays perfectly sized on the left */}
        <div className="w-full lg:w-[30%] flex flex-col space-y-5 lg:border-r lg:border-slate-300/60 lg:pr-12 shrink-0">
          <span className="text-xs font-bold tracking-widest text-[#8E7C5E] uppercase">
            THE MEDS PLATFORM
          </span>

          <h2 className="text-xl md:text-2xl xl:text-3xl font-serif font-normal text-slate-900 leading-[1.2] tracking-tight">
            ONE SEAMLESS WORKFLOW FROM CONCEPT TO COMPLETION
          </h2>

          <p className="text-slate-700 text-xs md:text-sm font-normal leading-relaxed max-w-sm">
            MEDS connects every part of the process so you can design, procure, price, and deliver exceptional elevator interiors faster.
          </p>

          <div className="pt-2">
            <button
              ref={mainBtnRef}
              onMouseEnter={handleMainBtnEnter}
              onMouseLeave={handleMainBtnLeave}
              className="border border-[#876C51] text-[#876C51] font-semibold text-[11px] tracking-widest px-5 py-3.5 rounded-sm flex items-center gap-3 transition-colors duration-300 bg-transparent focus:outline-none uppercase"
            >
              EXPLORE THE PLATFORM
              <svg 
                ref={mainArrowRef}
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth={2.5} 
                stroke="currentColor" 
                className="w-3.5 h-3.5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </button>
          </div>
        </div>

        {/* RIGHT FLOW TIMELINE SECTION: 
            Arranges all 6 steps horizontally in a straight line with middle custom tracking arrows.
        */}
        <div className="w-full lg:w-[70%] flex flex-row items-start justify-between gap-2 overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 scrollbar-none">
          {workflowSteps.map((step, idx) => (
            <div key={idx} className="flex items-start flex-1 min-w-[140px] lg:min-w-0">
              
              {/* Individual Vertical Step Element */}
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-4 w-full">
                
                {/* Step Index Number */}
                <span className="font-mono text-xl font-semibold text-[#897055] block tracking-wider">
                  {step.num}
                </span>

                {/* Styled Thin Line Stroke Thematic Vector Icon */}
                <div className="text-[#876C51] h-12 text-3xl flex items-center justify-center">
                  {step.icon}
                </div>

                {/* Label Header */}
                <h3 className="text-xs md:text-sm font-bold tracking-widest text-[#876C51] uppercase pt-1">
                  {step.title}
                </h3>

                {/* Small Description Sentence */}
                <p className="text-slate-600 text-[15px] font-bold lg:text-xs leading-relaxed max-w-[150px]">
                  {step.desc}
                </p>
              </div>

              {/* TIMELINE CONNECTOR ARROW: Aligns dynamically right between steps 01-05 */}
              {idx < workflowSteps.length - 1 && (
                <div className="hidden md:flex items-center justify-center text-[#8B7659] pt-16 px-1 lg:px-2 select-none opacity-70">
                 <FaArrowRight />
                </div>
              )}

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}