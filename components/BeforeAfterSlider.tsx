'use client';

import React, { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import { Sparkles, SlidersHorizontal, ArrowRight, CheckCircle2 } from 'lucide-react';

const SCENES = [
  {
    id: 'kitchen',
    title: 'Indian Kitchen Spice Pantry',
    beforeImg: 'https://images.unsplash.com/photo-1590794056226-77ef3a6c4743?q=80&w=1000&auto=format&fit=crop',
    afterImg: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?q=80&w=1000&auto=format&fit=crop',
    beforeLabel: 'Cluttered & Moisture-Damaged Pouches',
    afterLabel: 'GharCraft Borosilicate Airtight System',
  },
  {
    id: 'wardrobe',
    title: 'Ethnic Wardrobe & Saree Closet',
    beforeImg: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?q=80&w=1000&auto=format&fit=crop',
    afterImg: 'https://images.unsplash.com/photo-1540518614846-7ede433c5173?q=80&w=1000&auto=format&fit=crop',
    beforeLabel: 'Unorganized Stacked Clothes',
    afterLabel: 'Clear Window Modular Linen Organizers',
  },
];

export const BeforeAfterSlider = () => {
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeScene = SCENES[activeSceneIndex];

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  }, [isDragging, handleMove]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  }, [isDragging, handleMove]);

  return (
    <div className="bg-brandBg py-20 border-y border-gray-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" /> Interactive Home Transformation
          </span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-dark tracking-tight">
            See The GharCraft Difference
          </h2>
          <p className="text-gray-600 text-sm mt-3 leading-relaxed">
            Drag the handle left or right to witness how thoughtful organization transforms everyday Indian living spaces from chaos into serene luxury.
          </p>

          {/* Scene Selector */}
          <div className="flex justify-center gap-3 mt-6">
            {SCENES.map((scene, idx) => (
              <button
                key={scene.id}
                onClick={() => {
                  setActiveSceneIndex(idx);
                  setSliderPosition(50);
                }}
                className={`text-xs font-semibold px-4 py-2 rounded-full border transition-all ${
                  activeSceneIndex === idx
                    ? 'bg-dark text-white border-dark shadow-md'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-dark'
                }`}
              >
                {scene.title}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Comparison Container */}
        <div
          ref={containerRef}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
          onMouseMove={handleMouseMove}
          onTouchStart={() => setIsDragging(true)}
          onTouchEnd={() => setIsDragging(false)}
          onTouchMove={handleTouchMove}
          className="relative max-w-4xl mx-auto aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl border-4 border-white select-none cursor-ew-resize"
        >
          {/* AFTER Image (Full background) */}
          <div className="absolute inset-0 w-full h-full">
            <Image
              src={activeScene.afterImg}
              alt="After Organization"
              fill
              className="object-cover"
            />
            <span className="absolute top-4 right-4 bg-primary/90 text-white font-heading font-bold text-xs px-3 py-1.5 rounded-full shadow-md backdrop-blur-sm flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> AFTER: {activeScene.afterLabel}
            </span>
          </div>

          {/* BEFORE Image (Clipped overlay) */}
          <div
            className="absolute inset-0 h-full overflow-hidden"
            style={{ width: `${sliderPosition}%` }}
          >
            <div className="relative w-full h-full min-w-[300px]" style={{ width: containerRef.current?.offsetWidth || '100%' }}>
              <Image
                src={activeScene.beforeImg}
                alt="Before Organization"
                fill
                className="object-cover filter grayscale contrast-125"
              />
              <span className="absolute top-4 left-4 bg-black/70 text-white font-heading font-medium text-xs px-3 py-1.5 rounded-full shadow-md backdrop-blur-sm">
                BEFORE: {activeScene.beforeLabel}
              </span>
            </div>
          </div>

          {/* Draggable Divider Handle */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-white shadow-2xl z-20"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 bg-white rounded-full shadow-xl flex items-center justify-center text-primary border-2 border-primary cursor-ew-resize hover:scale-110 transition-transform">
              <SlidersHorizontal className="w-4 h-4 rotate-90" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
