'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { LessonData, LessonSlide } from '@/utils/lessonParser';
import { ChevronDown, ChevronUp, Star, MessageCircle, Volume2 } from 'lucide-react';
import { MathRenderer } from './MathRenderer';
import { InteractiveForceDiagram } from './diagrams/InteractiveForceDiagram';

interface LessonViewerProps {
  data: LessonData;
  onComplete?: () => void;
}

export const LessonViewer: React.FC<LessonViewerProps> = ({ data, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // 1 for down (next), -1 for up (prev)

  const currentSlide = data.slides[currentIndex];

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 50;
    if (info.offset.y < -threshold) {
      nextSlide();
    } else if (info.offset.y > threshold) {
      prevSlide();
    }
  };

  const nextSlide = () => {
    if (currentIndex < data.slides.length - 1) {
      setDirection(1);
      setCurrentIndex(prev => prev + 1);
    } else {
      if (onComplete) onComplete();
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex(prev => prev - 1);
    }
  };

  const variants = {
    enter: (direction: number) => ({
      y: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    exit: (direction: number) => ({
      y: direction > 0 ? '-100%' : '100%',
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: 0.3
      }
    })
  };

  return (
    <div className="relative w-full h-[calc(100vh-64px)] overflow-hidden bg-gray-900 text-white touch-none">
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={0.2}
          onDragEnd={handleDragEnd}
          className="absolute inset-0 w-full h-full flex flex-col items-center justify-center p-6"
        >
          <SlideContent slide={currentSlide} />
        </motion.div>
      </AnimatePresence>

      {/* Navigation Hints */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2">
        <div className="w-1 h-24 bg-gray-700 rounded-full overflow-hidden relative">
          <motion.div 
            className="w-full bg-teal-400 absolute top-0"
            initial={{ height: '0%' }}
            animate={{ height: `${((currentIndex + 1) / data.slides.length) * 100}%` }}
          />
        </div>
      </div>
      
      {currentIndex < data.slides.length - 1 && (
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-400 flex flex-col items-center gap-1"
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <span className="text-xs uppercase tracking-widest">Swipe Up</span>
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      )}
    </div>
  );
};

const SlideContent: React.FC<{ slide: LessonSlide }> = ({ slide }) => {
  // Helper to render text with math support
  const renderText = (text?: string) => {
    if (!text) return null;
    const cleanText = text.replace('[Image: Force Decomposition]', '').trim();
    if (!cleanText) return null;
    
    return cleanText.split('\n').map((line, i) => (
      <div key={i} className="mb-2">
        <MathRenderer text={line} />
      </div>
    ));
  };

  // Helper to check for image placeholders
  const renderImage = (text?: string) => {
    if (text?.includes('[Image: Force Decomposition]')) {
      return (
        <div 
          className="my-4" 
          onPointerDown={(e) => e.stopPropagation()} 
          onTouchStart={(e) => e.stopPropagation()}
        >
          <InteractiveForceDiagram />
        </div>
      );
    }
    return null;
  };

  switch (slide.type) {
    case 'title':
      return (
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-24 h-24 bg-teal-500 rounded-3xl mx-auto mb-8 flex items-center justify-center shadow-lg shadow-teal-500/30"
          >
            <Star className="w-12 h-12 text-white" fill="currentColor" />
          </motion.div>
          <motion.h1 
            className="text-4xl font-bold mb-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {slide.content.title}
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-300"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {slide.content.subtitle}
          </motion.p>
          <motion.div
            className="mt-6 text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {renderText(slide.content.text)}
          </motion.div>
        </div>
      );

    case 'scene':
    case 'content':
      return (
        <div className="text-center bg-gray-800 p-8 rounded-2xl border border-gray-700 w-full max-w-sm">
          {slide.content.title && (
            <h2 className="text-teal-400 text-sm font-bold uppercase tracking-widest mb-2">{slide.content.title}</h2>
          )}
          {slide.content.subtitle && (
            <h3 className="text-2xl font-bold mb-4">{slide.content.subtitle}</h3>
          )}
          <div className="text-gray-400">
            {renderImage(slide.content.text)}
            {renderText(slide.content.text)}
          </div>
        </div>
      );

    case 'dialogue':
      return (
        <div className="w-full max-w-sm">
          <div className="flex items-center gap-4 mb-6">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold shadow-lg ${
              slide.content.speaker === 'Ken' ? 'bg-blue-500' : 'bg-pink-500'
            }`}>
              {slide.content.speaker?.[0]}
            </div>
            <div className="text-lg font-bold">{slide.content.speaker}</div>
          </div>
          
          <motion.div 
            className="bg-white text-gray-900 p-6 rounded-2xl rounded-tl-none shadow-xl mb-6 relative"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="text-2xl font-medium leading-relaxed mb-2">
              <MathRenderer text={slide.content.english || ''} />
            </div>
            <button className="absolute top-4 right-4 text-gray-400 hover:text-teal-600 transition-colors">
              <Volume2 className="w-5 h-5" />
            </button>
          </motion.div>

          <motion.div
            className="bg-gray-800 p-4 rounded-xl text-gray-300 text-lg"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            {slide.content.japanese}
          </motion.div>
        </div>
      );

    case 'key-phrase':
      return (
        <div className="text-center w-full max-w-sm">
          <div className="mb-2 text-yellow-400 font-bold tracking-wider uppercase text-sm">Key Phrase</div>
          <motion.div
            className="bg-gradient-to-br from-indigo-600 to-purple-700 p-8 rounded-2xl shadow-xl mb-6 border border-white/10"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="text-3xl font-bold mb-2">
              <MathRenderer text={slide.content.subtitle || ''} />
            </div>
            <p className="text-indigo-200">{slide.content.text?.split('\n')[0]}</p>
          </motion.div>
          <div className="text-gray-400 bg-gray-800/50 p-4 rounded-xl text-left">
             {renderText(slide.content.text?.split('\n').slice(1).join('\n'))}
          </div>
        </div>
      );

    case 'completion':
      return (
        <div className="text-center">
          <motion.div
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-6xl mb-6"
          >
            🎉
          </motion.div>
          <h2 className="text-3xl font-bold mb-4">{slide.content.title}</h2>
          <p className="text-xl text-gray-400 mb-8">{slide.content.text}</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-teal-500 text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-teal-500/30"
            onClick={() => window.location.href = '/lessons'}
          >
            Complete Lesson
          </motion.button>
        </div>
      );

    default:
      return <div>{renderText(slide.content.text)}</div>;
  }
};
