// HeroGallery.jsx - Fixed for Large Screens
import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';

export default function HeroGallery({ currentImageIndex, galleryImages }) {
  const imageRef = useRef(null);
  const containerRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // Enhanced zoom animation on image change
  useEffect(() => {
    if (imageRef.current && !isAnimating) {
      setIsAnimating(true);
      
      const tl = gsap.timeline({
        onComplete: () => setIsAnimating(false)
      });
      
      tl.fromTo(imageRef.current,
        { scale: 1.1, opacity: 0, filter: "blur(14px)" },
        { scale: 1, opacity: 1, filter: "blur(0px)", duration: 1.2, ease: "power3.out" }
      );
    }
  }, [currentImageIndex]);

  // Floating animation for desktop only
  useEffect(() => {
    if (window.innerWidth >= 1024) {
      gsap.to(containerRef.current, {
        y: -8,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        delay: 0.5
      });
    }
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative w-full max-w-full mx-auto px-3 sm:px-4 md:px-6"
    >
      {/* Shadow Effects - Responsive */}
      <div className="absolute -inset-2 sm:-inset-3 md:-inset-4 bg-transparent  blur-xl sm:blur-2xl shadow-[0_0_30px_10px_#F7F4ED,0_0_60px_25px_#F7F4ED]" />
      
      {/* Image Container */}
      <div className="relative lg:h-[100vh] bg-transparent backdrop-blur-sm    shadow-[0_20px_50px_-10px_rgba(0,0,0,0.15),0_0_0_1px_rgba(255,255,255,0.5)]">
        <img
          ref={imageRef}
          src={galleryImages[currentImageIndex].src}
          alt={galleryImages[currentImageIndex].title}
          className="w-full h-[400px] sm:h-[400px] md:h-[450px] lg:h-[550px] xl:h-[750px] object-fill sm:object-contain"
        />
      </div>
    </div>
  );
}