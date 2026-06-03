// HeroStudioPanel.jsx - Fixed for Large Screens
import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';

export default function HeroStudioPanel({ currentImageIndex, totalImages }) {
  const panelRef = useRef(null);
  const [selectedConfig, setSelectedConfig] = useState('Standard');
  const [selectedMaterial, setSelectedMaterial] = useState(0);
  const [selectedLighting, setSelectedLighting] = useState('Warm');

  const materials = [
    { name: 'Wood Grain', color: '#D1C2A5', icon: '🌳' },
    { name: 'Light Oak', color: '#E5DEC9', icon: '🪵' },
    { name: 'White Marble', color: '#F5F2EB', icon: '⬜' },
    { name: 'Dark Walnut', color: '#3A332E', icon: '🪚' },
    { name: 'Bronze', color: '#8B7355', icon: '🥉' },
  ];

  const configurations = ['Standard', 'Premium', 'Luxury', 'Custom'];
  const lightingOptions = ['Warm', 'Cool', 'Smart'];

  useEffect(() => {
    // Responsive entrance animation
    const xValue = window.innerWidth >= 1024 ? 50 : 0;
    gsap.fromTo(panelRef.current,
      { opacity: 0, x: xValue, scale: 0.95 },
      { opacity: 1, x: 0, scale: 1, duration: 0.8, ease: "power3.out", delay: 0.3 }
    );
  }, []);

  const handleConfigClick = (config) => {
    setSelectedConfig(config);
    gsap.to(panelRef.current, {
      boxShadow: "0 20px 50px -15px rgba(255,255,255,0.5), 0 0 0 2px rgba(161,124,80,0.3)",
      duration: 0.3,
      yoyo: true,
      repeat: 1
    });
  };

  return (
    <div 
      ref={panelRef}
      className="relative w-full max-w-md lg:max-w-xs mx-auto lg:mx-0 lg:mr-4"
    >
      {/* White Shadow Effect - Responsive */}
      <div className="absolute -inset-2 sm:-inset-3 bg-gradient-to-b from-white/50 via-white/20 to-transparent rounded-xl sm:rounded-2xl blur-lg sm:blur-xl" />
      
      <div 
        className="relative bg-gradient-to-br from-[#FDFBF7] to-[#F6F3EC] backdrop-blur-sm border border-white/50 rounded-xl sm:rounded-2xl shadow-[0_20px_40px_-12px_rgba(0,0,0,0.1),0_0_0_1px_rgba(255,255,255,0.8)_inset]"
      >
        {/* Decorative Icons - Responsive positioning */}
        <div className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white/80 rounded-full flex items-center justify-center shadow-lg opacity-80">
          <span className="text-base sm:text-lg md:text-xl">✨</span>
        </div>
        <div className="absolute -bottom-1 -left-1 sm:-bottom-2 sm:-left-2 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-white/60 rounded-full flex items-center justify-center shadow-md opacity-60">
          <span className="text-xs sm:text-sm">🎨</span>
        </div>

        {/* Header - Responsive */}
        <div className="flex items-center justify-between border-b border-gray-200/60 pb-2 sm:pb-3 mb-4 sm:mb-5 pt-4 sm:pt-5 px-4 sm:px-5">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="text-base sm:text-lg">🏢</span>
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-gray-800">Design Studio</span>
          </div>
          <div className="flex items-center gap-1 bg-[#A17C50]/10 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
            <span className="text-[9px] sm:text-[10px] font-mono font-bold text-[#A17C50]">v2.0</span>
            <span className="text-[9px] sm:text-[10px]">⚡</span>
          </div>
        </div>

        {/* Configurations - Responsive */}
        <div className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-5 px-4 sm:px-5">
          <div className="flex items-center justify-between">
            <label className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-gray-500">Configurations</label>
            <span className="text-[8px] sm:text-[9px] text-gray-400">⚙️</span>
          </div>
          <div className="grid grid-cols-4 gap-1 sm:gap-1.5">
            {configurations.map((config) => (
              <button
                key={config}
                onClick={() => handleConfigClick(config)}
                className={`py-1.5 sm:py-2 rounded-lg text-[9px] sm:text-[10px] font-medium transition-all duration-300 ${
                  selectedConfig === config 
                    ? 'bg-[#A17C50] text-white shadow-md' 
                    : 'bg-white/60 text-gray-600 hover:bg-[#A17C50]/10 border border-gray-200'
                }`}
              >
                {config.charAt(0)}
                <span className="ml-0.5 text-[7px] sm:text-[8px]">{config === 'Custom' ? '🎨' : ''}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Wall Material - Responsive */}
        <div className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-5 px-4 sm:px-5">
          <div className="flex items-center justify-between">
            <label className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-gray-500">Wall Material</label>
            <span className="text-[8px] sm:text-[9px] text-gray-400">🧱</span>
          </div>
          <div className="flex gap-1.5 sm:gap-2 flex-wrap">
            {materials.map((material, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedMaterial(idx)}
                className={`group relative transition-all duration-300 ${
                  selectedMaterial === idx ? 'scale-110' : 'hover:scale-105'
                }`}
              >
                <div 
                  className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full shadow-md cursor-pointer transition-all"
                  style={{ 
                    backgroundColor: material.color,
                    boxShadow: selectedMaterial === idx 
                      ? `0 0 0 2px white, 0 0 0 4px ${material.color}` 
                      : '0 2px 6px rgba(0,0,0,0.1)'
                  }}
                  title={material.name}
                />
                <span className="absolute -bottom-4 sm:-bottom-5 left-1/2 -translate-x-1/2 text-[7px] sm:text-[8px] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-white/80 px-1 rounded">
                  {material.icon}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Handrails Spec - Responsive */}
        <div className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-5 px-4 sm:px-5">
          <div className="flex items-center justify-between">
            <label className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-gray-500">Handrails</label>
            <span className="text-[8px] sm:text-[9px] text-gray-400">🤝</span>
          </div>
          <div className="relative">
            <div className="h-1 sm:h-1.5 w-full bg-gray-200 rounded-full cursor-pointer">
              <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-[#A17C50] shadow-md border-2 border-white cursor-pointer hover:scale-110 transition-transform" />
            </div>
            <div className="flex justify-between mt-1.5 sm:mt-2 px-1">
              <span className="text-[7px] sm:text-[8px] text-gray-400">Standard</span>
              <span className="text-[7px] sm:text-[8px] text-gray-400">Premium</span>
              <span className="text-[7px] sm:text-[8px] text-gray-400">Luxury</span>
            </div>
          </div>
        </div>

        {/* Lighting Ambience - Responsive */}
        <div className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-6 px-4 sm:px-5">
          <div className="flex items-center justify-between">
            <label className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-gray-500">Lighting</label>
            <span className="text-[8px] sm:text-[9px] text-gray-400">💡</span>
          </div>
          <div className="flex gap-1 sm:gap-1.5">
            {lightingOptions.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedLighting(type)}
                className={`flex-1 text-[9px] sm:text-[10px] py-1.5 sm:py-2 rounded-lg transition-all duration-300 flex items-center justify-center gap-1 ${
                  selectedLighting === type 
                    ? 'bg-[#A17C50] text-white shadow-md' 
                    : 'bg-white/60 text-gray-600 hover:bg-[#A17C50]/10 border border-gray-200'
                }`}
              >
                <span className="text-[10px] sm:text-xs">
                  {type === 'Warm' && '🔥'}
                  {type === 'Cool' && '❄️'}
                  {type === 'Smart' && '🤖'}
                </span>
                <span className="hidden xs:inline">{type}</span>
              </button>
            ))}
          </div>
        </div>

        {/* CTA Button - Responsive */}
        <div className="px-4 sm:px-5">
          <button className="w-full bg-[#A17C50] hover:bg-[#8B6942] text-white text-[10px] sm:text-[11px] font-bold tracking-wider py-2 sm:py-2.5 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-1.5 sm:gap-2">
            <span className="text-xs sm:text-sm">🔍</span>
            <span className="hidden xs:inline">VIEW 3D RENDERING</span>
            <span className="xs:hidden">VIEW</span>
            <span>→</span>
          </button>
        </div>

        {/* Image Counter - Responsive */}
        <div className="text-center pt-3 sm:pt-4 mt-2 border-t border-gray-200/50 pb-4 sm:pb-5 px-4 sm:px-5">
          <div className="flex items-center justify-center gap-1.5 sm:gap-2">
            <span className="text-[8px] sm:text-[9px] text-gray-400 uppercase tracking-wider">
              {currentImageIndex + 1} / {totalImages}
            </span>
            <span className="text-[8px] sm:text-[9px] text-gray-300">•</span>
            <span className="text-[8px] sm:text-[9px] text-gray-400">🎯 Premium Gallery</span>
          </div>
        </div>
      </div>
    </div>
  );
}