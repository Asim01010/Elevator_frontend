import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { FaCalculator, FaShieldVirus } from 'react-icons/fa';
import { FaUserGroup, FaHandshake } from "react-icons/fa6";
import { BsBoxFill } from "react-icons/bs";
import { MdOutlineMobileScreenShare } from "react-icons/md";

const Overview = () => {
  const scrollContainerRef = useRef(null);
  const scrollContentRef = useRef(null);
  const animationRef = useRef(null);

  // Company data with React Icons
  const companies = [
    { id: 1, name: "REAL-TIME Rendering", subName: "Manullay rendering every lines", icon: BsBoxFill },
    { id: 2, name: "SMART BUDGETING", subName: "Accurate pricing in real time", icon: FaCalculator },
    { id: 3, name: "CODE & WEIGHT CHECK", subName: "Build in compliance calidation", icon: FaShieldVirus },
    { id: 4, name: "COLLABORATION", subName: "Work together anxiously", icon: FaUserGroup },
    { id: 5, name: "SUPPLIER NETWORK", subName: "Connect with towards partners", icon: FaHandshake },
    { id: 6, name: "ANYWHERE ACCESS", subName: "Develop, table or mobile", icon: MdOutlineMobileScreenShare },
  ];

  // Duplicate companies multiple times for seamless infinite scroll
  const duplicatedCompanies = [...companies, ...companies, ...companies, ...companies];

  useEffect(() => {
    // Kill any existing animation
    if (animationRef.current) {
      animationRef.current.kill();
    }

    const container = scrollContainerRef.current;
    const content = scrollContentRef.current;
    
    if (!container || !content) return;

    // Get the width of a single set of companies
    const singleSetWidth = content.scrollWidth / 4;
    
    // Set initial position to 0
    gsap.set(content, { x: 0 });
    
    // Create the animation - moving from left to right
    // When the animation reaches the end of one set, it instantly resets to 0
    // But because we have multiple duplicates, the reset is invisible to the user
    const animation = gsap.to(content, {
      x: -singleSetWidth,
      duration: 30,
      ease: "none",
      repeat: -1,
      onRepeat: () => {
        // Instantly reset position to 0 when we complete one full set
        // This creates the effect of icons reappearing from the left side
        gsap.set(content, { x: 0 });
      }
    });
    
    animationRef.current = animation;
    
    // Cleanup on unmount
    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
      }
    };
  }, []);

  // Pause animation on hover
  const handleMouseEnter = () => {
    if (animationRef.current) {
      animationRef.current.pause();
    }
  };

  // Resume animation on mouse leave
  const handleMouseLeave = () => {
    if (animationRef.current) {
      animationRef.current.resume();
    }
  };

  return (
    <div className="w-full py-6  overflow-hidden" style={{ backgroundColor: '#F7F4ED' }}>
      {/* Scrolling Bar - Left to Right with infinite loop */}
      <div 
        ref={scrollContainerRef}
        className="relative overflow-hidden cursor-pointer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Scrolling Content - Icons with name and subname in row layout */}
        <div 
          ref={scrollContentRef}
          className="flex gap-8 md:gap-12"
          style={{ width: 'max-content' }}
        >
          {duplicatedCompanies.map((company, index) => {
            const IconComponent = company.icon;
            return (
              <div
                key={`${company.id}-${index}`}
                className="flex-shrink-0 group cursor-pointer transition-all duration-300 hover:scale-105"
              >
                <div className="flex gap-2.5 items-center  min-w-[200px] border-r border-gray-300" style={{ backgroundColor: '#F7F4ED' }}>
                  {/* Icon with unified color #A1917D */}
                  <div className="flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                    <IconComponent className="text-4xl md:text-5xl" style={{ color: '#A1917D' }} />
                  </div>
                  {/* Name and SubName in flex column */}
                  <div className="text-left">
                    <h3 className="font-bold text-gray-800 text-sm md:text-base tracking-wide mb-1">
                      {company.name}
                    </h3>
                    <p className="text-gray-500 text-xs md:text-sm">
                      {company.subName}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Overview;