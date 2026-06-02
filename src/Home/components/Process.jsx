import { useRef, useEffect } from 'react';
import gsap from 'gsap';

const Process = () => {
  // Refs for scroll containers
  const topScrollRef = useRef(null);
  const topContentRef = useRef(null);
  const topAnimationRef = useRef(null);
  
  const bottomScrollRef = useRef(null);
  const bottomContentRef = useRef(null);
  const bottomAnimationRef = useRef(null);

  // Dummy images for the cards (using Unsplash placeholders)
  const topImages = [
    { id: 1, src: "Elevators/V1/GAF-001v2.jpg", title: "Modern Luxe" },
    { id: 2, src: "Elevators/V1/GAF-003 v2.jpg", title: "Natural Elegance" },
    { id: 3, src: "Elevators/V1/GAF-004 v2.jpg", title: "Premium Wood" },
    { id: 4, src: "Elevators/V1/GAF-005 v2.jpg", title: "Contemporary" },
    { id: 5, src: "Elevators/V1/GAF-003 v2.jpg", title: "Minimalist" },
    { id: 6, src: "Elevators/V1/GAF-004 v2.jpg", title: "Scandinavian" },
  ];

  const bottomImages = [
    { id: 1, src: "Elevators/V3/GAF-001v3.jpg", title: "Marble Finish" },
    { id: 2, src: "Elevators/V3/GAF-003 v3.jpg", title: "Metal Accents" },
    { id: 3, src: "Elevators/V3/GAF-004 v3.jpg", title: "Glass Elements" },
    { id: 4, src: "Elevators/V3/GAF-005 v3.jpg", title: "Textured Walls" },
    { id: 5, src: "Elevators/V3/GAF-003 v3.jpg", title: "Lighting Design" },
    { id: 6, src: "Elevators/V3/GAF-004 v3.jpg", title: "Outdoor Living" },
  ];

  // Duplicate images for seamless infinite scroll
  const duplicatedTopImages = [...topImages, ...topImages, ...topImages, ...topImages];
  const duplicatedBottomImages = [...bottomImages, ...bottomImages, ...bottomImages, ...bottomImages];

  useEffect(() => {
    // Top row animation - moving from left to right
    if (topAnimationRef.current) {
      topAnimationRef.current.kill();
    }

    const topContainer = topScrollRef.current;
    const topContent = topContentRef.current;
    
    if (topContainer && topContent) {
      const singleSetWidth = topContent.scrollWidth / 4;
      
      gsap.set(topContent, { x: 0 });
      
      const topAnimation = gsap.to(topContent, {
        x: -singleSetWidth,
        duration: 25,
        ease: "none",
        repeat: -1,
        onRepeat: () => {
          gsap.set(topContent, { x: 0 });
        }
      });
      
      topAnimationRef.current = topAnimation;
    }

    // Bottom row animation - moving from right to left (opposite direction)
    if (bottomAnimationRef.current) {
      bottomAnimationRef.current.kill();
    }

    const bottomContainer = bottomScrollRef.current;
    const bottomContent = bottomContentRef.current;
    
    if (bottomContainer && bottomContent) {
      const singleSetWidth = bottomContent.scrollWidth / 4;
      
      gsap.set(bottomContent, { x: -singleSetWidth });
      
      const bottomAnimation = gsap.to(bottomContent, {
        x: 0,
        duration: 25,
        ease: "none",
        repeat: -1,
        onRepeat: () => {
          gsap.set(bottomContent, { x: -singleSetWidth });
        }
      });
      
      bottomAnimationRef.current = bottomAnimation;
    }

    // Cleanup
    return () => {
      if (topAnimationRef.current) topAnimationRef.current.kill();
      if (bottomAnimationRef.current) bottomAnimationRef.current.kill();
    };
  }, []);

  // Pause animations on hover
  const handleTopMouseEnter = () => {
    if (topAnimationRef.current) topAnimationRef.current.pause();
  };

  const handleTopMouseLeave = () => {
    if (topAnimationRef.current) topAnimationRef.current.resume();
  };

  const handleBottomMouseEnter = () => {
    if (bottomAnimationRef.current) bottomAnimationRef.current.pause();
  };

  const handleBottomMouseLeave = () => {
    if (bottomAnimationRef.current) bottomAnimationRef.current.resume();
  };

  return (
    <div className="w-full min-h-screen py-12 px-6 md:px-12" style={{ backgroundColor: '#F7F4ED' }}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-7xl mx-auto">
        
        {/* Left Side - Grid Cols 8 with two scrolling rows */}
        <div className="lg:col-span-8 space-y-6">
          {/* Section Header */}
          <div className="mb-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 tracking-wide">
              EXPLORE MORE DESIGNS
            </h2>
          </div>

          {/* Top Row - Moves Left to Right */}
          <div 
            ref={topScrollRef}
            className="relative overflow-hidden cursor-pointer rounded-lg"
            onMouseEnter={handleTopMouseEnter}
            onMouseLeave={handleTopMouseLeave}
          >
            <div 
              ref={topContentRef}
              className="flex gap-5"
              style={{ width: 'max-content' }}
            >
              {duplicatedTopImages.map((image, index) => (
                <div
                  key={`top-${image.id}-${index}`}
                  className="flex-shrink-0 group transition-all duration-300 hover:scale-105 "
                >
                  <div className="w-64 md:w-72 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                    <img 
                      src={image.src} 
                      alt={image.title}
                      className="w-full h-full object-contain"
                    />
                    <div className="p-3 text-center" style={{ backgroundColor: '#F7F4ED' }}>
                      <p className="font-semibold text-gray-700 text-sm">{image.title}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Row - Moves Right to Left (Opposite Direction) */}
          <div 
            ref={bottomScrollRef}
            className="relative overflow-hidden cursor-pointer rounded-lg"
            onMouseEnter={handleBottomMouseEnter}
            onMouseLeave={handleBottomMouseLeave}
          >
            <div 
              ref={bottomContentRef}
              className="flex gap-5"
              style={{ width: 'max-content' }}
            >
              {duplicatedBottomImages.map((image, index) => (
                <div
                  key={`bottom-${image.id}-${index}`}
                  className="flex-shrink-0 group transition-all duration-300 hover:scale-105"
                >
                  <div className="w-64 md:w-72 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                    <img 
                      src={image.src} 
                      alt={image.title}
                      className="w-full h-full object-contain"
                    />
                    <div className="p-3 text-center" style={{ backgroundColor: '#F7F4ED' }}>
                      <p className="font-semibold text-gray-700 text-sm">{image.title}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Grid Cols 4 with Content Card */}
        <div className="lg:col-span-4">
          <div className="h-full rounded-2xl overflow-hidden shadow-lg" style={{ backgroundColor: '#FFFFFF' }}>
            {/* Content Card */}
            <div className="p-8 md:p-10 flex flex-col h-full">
              {/* Heading with theme color */}
              <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-wide" style={{ color: '#A58151' }}>
                A Connected Ecosystem
              </h2>
              
              {/* Subheadline */}
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                Suppliers & Fabricators
              </h3>
              
              <p className="text-gray-600 leading-relaxed mb-6">
                Access a marketplace network of premium material suppliers and favored fabricators.
              </p>
              
              {/* Feature List */}
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-gray-700">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#A58151' }}></span>
                  <span>Streamline project tools</span>
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#A58151' }}></span>
                  <span>Inclusive window frames</span>
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#A58151' }}></span>
                  <span>Regional & specialty suppliers</span>
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#A58151' }}></span>
                  <span>Strategic projects, together</span>
                </li>
              </ul>
              
              {/* Join Button */}
              <button className="mt-auto group flex items-center justify-center gap-2 px-6 py-3 font-semibold transition-all duration-300 hover:gap-4" style={{ backgroundColor: '#A58151', color: '#FFFFFF', borderRadius: '4px' }}>
                JOIN OUR NETWORK
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  strokeWidth={2} 
                  stroke="currentColor" 
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Process;