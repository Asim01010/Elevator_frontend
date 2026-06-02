import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';

const Showcase = () => {
  const [activeImage, setActiveImage] = useState(0);
  const textRef = useRef(null);
  const imageRef = useRef(null);

  // Dummy images for the showcase
  const showcaseImages = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=600&h=400&fit=crop",
      title: "3D Visualization",
      alt: "Modern interior 3D rendering"
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&h=400&fit=crop",
      title: "AR Experience",
      alt: "Augmented reality design preview"
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=600&h=400&fit=crop",
      title: "Cloud Collaboration",
      alt: "Team collaborating on cloud platform"
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1581091226456-b6c5f5b6e8c4?w=600&h=400&fit=crop",
      title: "Secure Platform",
      alt: "Secure digital workspace"
    },
  ];

  useEffect(() => {
    // Entrance animation for the text section
    gsap.fromTo(textRef.current,
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" }
    );

    // Entrance animation for the image section
    gsap.fromTo(imageRef.current,
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, duration: 0.8, ease: "power2.out", delay: 0.2 }
    );
  }, []);

  // Auto-rotate images every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % showcaseImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Animate image transition
  useEffect(() => {
    gsap.fromTo('.showcase-image',
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" }
    );
  }, [activeImage]);

  return (
    <div className="w-full min-h-screen py-16 px-6 md:px-12" style={{ backgroundColor: '#F7F4ED' }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Text Content */}
          <div ref={textRef} className="space-y-6">
            {/* Main Heading */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-wide" style={{ color: '#A58151' }}>
              TECHNOLOGY WITH <br /> ELEVATORS
            </h1>
            
            {/* Subheading */}
            <div className="mt-4">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 leading-tight">
                POWERFUL TOOLS.
              </h2>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 leading-tight">
                BEAUTIFUL RESULTS.
              </h2>
            </div>
            
            {/* Feature List with Icons */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: '#A58151', opacity: 0.15 }}>
                  <span className="text-sm" style={{ color: '#A58151' }}>✓</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">Irradiate</h4>
                  <p className="text-sm text-gray-600">Visualization</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: '#A58151', opacity: 0.15 }}>
                  <span className="text-sm" style={{ color: '#A58151' }}>✓</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">AR Experience</h4>
                  <p className="text-sm text-gray-600">Viewing, Editing</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: '#A58151', opacity: 0.15 }}>
                  <span className="text-sm" style={{ color: '#A58151' }}>✓</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">Cloud Collaboration</h4>
                  <p className="text-sm text-gray-600">Real-time Sync</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: '#A58151', opacity: 0.15 }}>
                  <span className="text-sm" style={{ color: '#A58151' }}>✓</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">Secure & Available</h4>
                  <p className="text-sm text-gray-600">Platform</p>
                </div>
              </div>
            </div>
            
            {/* Description Paragraph */}
            <p className="text-gray-700 leading-relaxed mt-6 text-lg">
              MEPS leverages advanced visualization, automation and industry intelligence 
              to help you design with confidence and deliver with precision.
            </p>
            
            {/* CTA Button */}
            <button className="group flex items-center gap-2 px-6 py-3 font-semibold transition-all duration-300 hover:gap-4 mt-4" style={{ backgroundColor: '#A58151', color: '#FFFFFF', borderRadius: '4px' }}>
              EXPLORE TECHNOLOGY
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
          
          {/* Right Side - Interactive Image Gallery */}
          <div ref={imageRef} className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-video">
              {/* Main Display Image */}
              <img
                src={showcaseImages[activeImage].src}
                alt={showcaseImages[activeImage].alt}
                className="showcase-image w-full h-full object-cover"
              />
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
              
              {/* Image Title Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="text-white font-bold text-xl">
                  {showcaseImages[activeImage].title}
                </h3>
              </div>
            </div>
            
            {/* Thumbnail Navigation */}
            <div className="flex gap-3 mt-4 justify-center">
              {showcaseImages.map((image, index) => (
                <button
                  key={image.id}
                  onClick={() => setActiveImage(index)}
                  className={`relative w-16 h-16 rounded-lg overflow-hidden transition-all duration-300 ${
                    activeImage === index 
                      ? 'ring-2 ring-offset-2' 
                      : 'opacity-60 hover:opacity-100'
                  }`}
                  style={{ ringColor: '#A58151' }}
                >
                  <img
                    src={image.src}
                    alt={image.title}
                    className="w-full h-full object-cover"
                  />
                  {activeImage === index && (
                    <div className="absolute inset-0" style={{ backgroundColor: '#A58151', opacity: 0.3 }}></div>
                  )}
                </button>
              ))}
            </div>
            
            {/* Navigation Dots */}
            <div className="flex justify-center gap-2 mt-4">
              {showcaseImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    activeImage === index ? 'w-6' : ''
                  }`}
                  style={{ backgroundColor: activeImage === index ? '#A58151' : '#D1C5B0' }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Showcase;