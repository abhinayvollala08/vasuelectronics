"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight, Wrench, ShieldCheck, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    image: "lcd-repair.jpg",
    title: "Expert TV Repair Services",
    subtitle: "We fix LED, LCD, OLED, and Plasma TVs with genuine parts. Experience fast, reliable, and affordable repair services at your doorstep.",
    icon: Zap,
    highlight: "Same Day Service"
  },
  {
    image: "/assets/carousel-home-theater.jpg",
    title: "Home Theater Solutions",
    subtitle: "Professional installation, calibration, and repair for your premium surround sound systems and amplifiers.",
    icon: Wrench,
    highlight: "Expert Technicians"
  },
  {
    image: "/assets/carousel-service-center.jpg",
    title: "Multi-Brand Service Center",
    subtitle: "Your trusted destination for all electronics repair. We service Samsung, LG, Sony, and all major brands under one roof.",
    icon: ShieldCheck,
    highlight: "Warranty on Repairs"
  }
];

const TWEEN_FACTOR_BASE = 0.52;

const HeroCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, dragFree: false },
    [Autoplay({ delay: 6000, stopOnInteraction: false })]
  );
  
  const [selectedIndex, setSelectedIndex] = useState(0);
  const tweenNodes = useRef([]);

  const setTweenNodes = useCallback((emblaApi) => {
    tweenNodes.current = emblaApi.slideNodes().map((slideNode) => {
      return slideNode.querySelector('.tt-carousel-parallax-layer');
    });
  }, []);

  const tweenParallax = useCallback((emblaApi, eventName) => {
    const engine = emblaApi.internalEngine();
    const scrollProgress = emblaApi.scrollProgress();
    const slidesInView = emblaApi.slidesInView();
    const isScrollEvent = eventName === 'scroll';

    emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
      let diffToTarget = scrollSnap - scrollProgress;
      const slidesInSnap = engine.slideRegistry[snapIndex];

      slidesInSnap.forEach((slideIndex) => {
        if (isScrollEvent && !slidesInView.includes(slideIndex)) return;

        if (engine.options.loop) {
          engine.slideLooper.loopPoints.forEach((loopItem) => {
            const target = loopItem.target();

            if (slideIndex === loopItem.index && target !== 0) {
              const sign = Math.sign(target);

              if (sign === -1) {
                diffToTarget = scrollSnap - (1 + scrollProgress);
              }
              if (sign === 1) {
                diffToTarget = scrollSnap + (1 - scrollProgress);
              }
            }
          });
        }

        const translate = diffToTarget * (-100 * TWEEN_FACTOR_BASE);
        const tweenNode = tweenNodes.current[slideIndex];
        if (tweenNode) {
          tweenNode.style.transform = `translateX(${translate}%)`;
        }
      });
    });
  }, []);

  const scrollPrev = useCallback(() => {
    if (emblaApi) {
      emblaApi.plugins().autoplay.reset();
      emblaApi.scrollPrev();
    }
  }, [emblaApi]);
  
  const scrollNext = useCallback(() => {
    if (emblaApi) {
      emblaApi.plugins().autoplay.reset();
      emblaApi.scrollNext();
    }
  }, [emblaApi]);
  
  useEffect(() => {
    if (!emblaApi) return;
    
    setTweenNodes(emblaApi);
    tweenParallax(emblaApi);
    
    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };
    
    emblaApi
      .on('reInit', setTweenNodes)
      .on('reInit', tweenParallax)
      .on('scroll', tweenParallax)
      .on('slideFocus', tweenParallax)
      .on("select", onSelect);
      
    onSelect();
    
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, tweenParallax, setTweenNodes]);

  return (
    <>
      <style>{`
        .tt-carousel { position: relative; width: 100%; overflow: hidden; background: #000; }

        /* Slide track */
        .tt-carousel-viewport { overflow: hidden; width: 100%; height: clamp(500px, 80vh, 800px); }
        .tt-carousel-track    { display: flex; height: 100%; }
        .tt-carousel-slide    { min-width: 0; flex: 0 0 100%; position: relative; overflow: hidden; height: 100%; }

        /* Parallax Layer */
        .tt-carousel-parallax-layer {
          position: absolute;
          top: 0;
          bottom: 0;
          left: -20%;
          right: -20%; /* wider to allow horizontal translation */
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .tt-carousel-frame {
          position: relative;
          width: 100%;
          height: 100%;
        }
        
        .tt-carousel-frame img {
          width: 100%; height: 100%;
          object-fit: cover; display: block;
        }

        /* Overlay */
        .tt-carousel-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(
            to right,
            rgba(10, 15, 30, 0.9) 0%,
            rgba(10, 15, 30, 0.6) 50%,
            rgba(10, 15, 30, 0.2) 100%
          );
        }

        /* Caption Container */
        .tt-carousel-caption-wrapper {
          position: absolute; inset: 0;
          display: flex; align-items: center;
          padding: 0 5%;
          z-index: 5;
        }
        
        .tt-carousel-caption-inner {
          max-width: 800px;
          margin-top: 40px;
        }

        /* Nav arrows */
        .tt-carousel-arrow {
          position: absolute; top: 50%; transform: translateY(-50%);
          width: 52px; height: 52px; border-radius: 50%;
          background: rgba(255,255,255,.05);
          border: 1px solid rgba(255,255,255,.1);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: #fff;
          transition: all .3s ease;
          z-index: 10;
        }
        .tt-carousel-arrow:hover {
          background: #2563eb;
          border-color: #3b82f6;
          transform: translateY(-50%) scale(1.1);
          box-shadow: 0 0 20px rgba(37, 99, 235, 0.4);
        }
        .tt-carousel-arrow-prev { left: 32px; }
        .tt-carousel-arrow-next { right: 32px; }

        /* Dots */
        .tt-carousel-dots {
          position: absolute; bottom: 40px;
          left: 50%; transform: translateX(-50%);
          display: flex; align-items: center; gap: 12px; z-index: 10;
        }
        .tt-carousel-dot {
          height: 6px; border-radius: 999px;
          background: rgba(255,255,255,.3);
          border: none; cursor: pointer; padding: 0;
          transition: all .3s cubic-bezier(.22,1,.36,1);
          width: 32px;
        }
        .tt-carousel-dot.active {
          width: 64px;
          background: #3b82f6;
          box-shadow: 0 0 12px rgba(59, 130, 246, 0.5);
        }

        /* Progress bar */
        @keyframes ttCarouselProgress {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        .tt-carousel-progress {
          position: absolute; bottom: 0; left: 0; right: 0;
          height: 5px; z-index: 10;
          background: rgba(255,255,255,.05);
          overflow: hidden;
        }
        .tt-carousel-progress-bar {
          height: 100%;
          background: #3b82f6;
          transform-origin: left;
          animation: ttCarouselProgress 6s linear infinite;
        }

        @media (max-width: 768px) {
          .tt-carousel-caption-wrapper { padding: 0 24px; text-align: center; justify-content: center; }
          .tt-carousel-overlay {
            background: linear-gradient(to bottom, rgba(10, 15, 30, 0.5) 0%, rgba(10, 15, 30, 0.8) 100%);
          }
          .tt-carousel-caption-inner { display: flex; flex-direction: column; align-items: center; margin-top: 0; }
          .tt-carousel-arrow { display: none; }
        }
      `}</style>

      <section className="tt-carousel group">
        <div className="tt-carousel-viewport" ref={emblaRef}>
          <div className="tt-carousel-track">
            {slides.map((slide, i) => (
              <div key={i} className="tt-carousel-slide">
                <div className="tt-carousel-parallax-layer">
                  <div className="tt-carousel-frame">
                    <img src={slide.image} alt={slide.title} loading={i === 0 ? "eager" : "lazy"} />
                    <div className="tt-carousel-overlay" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Floating Captions - detached from slides for independent animation */}
        <div className="tt-carousel-caption-wrapper pointer-events-none">
          <AnimatePresence mode="wait">
            <motion.div 
              key={selectedIndex}
              className="tt-carousel-caption-inner pointer-events-auto"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/20 border border-blue-400/30 backdrop-blur-md mb-6"
              >
                {(() => {
                  const Icon = slides[selectedIndex].icon;
                  return <Icon size={16} className="text-blue-400" />;
                })()}
                <span className="text-sm font-semibold tracking-wider text-blue-100 uppercase">
                  {slides[selectedIndex].highlight}
                </span>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="font-serif text-5xl md:text-6xl lg:text-7xl text-white leading-[1.1] mb-6 drop-shadow-2xl"
              >
                {slides[selectedIndex].title}
              </motion.h1>
              
              <motion.div 
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="w-20 h-1.5 rounded-full bg-blue-500 mb-6 origin-left md:mx-0 mx-auto"
              />
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-2xl drop-shadow-md mb-10"
              >
                {slides[selectedIndex].subtitle}
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="flex flex-wrap items-center gap-4 justify-center md:justify-start"
              >
                <button className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-all shadow-lg shadow-blue-600/30 hover:shadow-blue-500/40 transform hover:-translate-y-1">
                  Book Service Now
                </button>
                <button className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white rounded-lg font-medium transition-all hover:border-white/40 transform hover:-translate-y-1">
                  Explore Services
                </button>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Arrows */}
        <button 
          className="tt-carousel-arrow tt-carousel-arrow-prev opacity-0 md:group-hover:opacity-100 focus:opacity-100" 
          onClick={scrollPrev} 
          aria-label="Previous slide"
        >
          <ChevronLeft size={28} />
        </button>
        <button 
          className="tt-carousel-arrow tt-carousel-arrow-next opacity-0 md:group-hover:opacity-100 focus:opacity-100" 
          onClick={scrollNext} 
          aria-label="Next slide"
        >
          <ChevronRight size={28} />
        </button>

        {/* Dots Navigation */}
        <div className="tt-carousel-dots">
          {slides.map((_, i) => (
            <button 
              key={i} 
              className={`tt-carousel-dot ${i === selectedIndex ? "active" : ""}`} 
              onClick={() => emblaApi?.scrollTo(i)} 
              aria-label={`Go to slide ${i + 1}`} 
            />
          ))}
        </div>

        {/* Progress Bar */}
        <div className="tt-carousel-progress">
          <div key={selectedIndex} className="tt-carousel-progress-bar" />
        </div>
      </section>
    </>
  );
};

export default HeroCarousel;