import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";
import carouselTv from "@/assets/carousel-tv-repair.jpg";
import carouselHomeTheater from "@/assets/carousel-home-theater.jpg";
import carouselServiceCenter from "@/assets/carousel-service-center.jpg";

const slides = [
  {
    image: carouselTv,
    title: "LED, LCD & Plasma TV Repair",
    subtitle: "Expert panel replacement, backlight & motherboard repair",
  },
  {
    image: carouselHomeTheater,
    title: "Home Theater Installation & Repair",
    subtitle: "Surround sound setup, calibration & amplifier service",
  },
  {
    image: carouselServiceCenter,
    title: "Authorized Multi-Brand Service Center",
    subtitle: "Your one-stop destination for all electronics repair",
  },
];

const HeroCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 4000, stopOnInteraction: false }),
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi]);

  return (
    <>
      <style>{`
        .tt-carousel { position: relative; width: 100%; overflow: hidden; }

        /* Slide track */
        .tt-carousel-viewport { overflow: hidden; }
        .tt-carousel-track    { display: flex; }
        .tt-carousel-slide    { min-width: 0; flex: 0 0 100%; position: relative; }

        /* Image frame */
        .tt-carousel-frame {
          position: relative;
          height: clamp(240px, 55vw, 600px);
          overflow: hidden;
        }
        .tt-carousel-frame img {
          width: 100%; height: 100%;
          object-fit: cover; display: block;
        }

        /* Overlay — uses accent-lt so it tints with the theme */
        .tt-carousel-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(13,21,38,.52) 0%,
            rgba(13,21,38,.72) 60%,
            rgba(13,21,38,.82) 100%
          );
        }

        /* Caption */
        .tt-carousel-caption {
          position: absolute; inset: 0;
          display: flex; align-items: center; justify-content: center;
          text-align: center; padding: 0 24px;
        }
        .tt-carousel-title {
          font-family: 'DM Serif Display', Georgia, serif;
          font-size: clamp(1.4rem, 4vw, 2.8rem);
          color: #FFFFFF;
          line-height: 1.15;
          margin-bottom: 12px;
          text-shadow: 0 2px 12px rgba(0,0,0,.35);
        }
        .tt-carousel-sub {
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: clamp(.82rem, 1.8vw, 1.05rem);
          color: rgba(255,255,255,.78);
          max-width: 520px; margin: 0 auto;
          line-height: 1.65;
        }

        /* Accent bar under title */
        .tt-carousel-rule {
          width: 44px; height: 3px; border-radius: 2px;
          background: var(--accent, #1A5FBF);
          margin: 0 auto 14px;
          opacity: .85;
        }

        /* Nav arrows */
        .tt-carousel-arrow {
          position: absolute; top: 50%; transform: translateY(-50%);
          width: 40px; height: 40px; border-radius: 50%;
          background: rgba(255,255,255,.12);
          border: 1px solid rgba(255,255,255,.22);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: #fff;
          transition: background .2s, border-color .2s, transform .2s;
          z-index: 10;
        }
        .tt-carousel-arrow:hover {
          background: var(--accent, #1A5FBF);
          border-color: var(--accent, #1A5FBF);
          transform: translateY(-50%) scale(1.07);
        }
        .tt-carousel-arrow-prev { left: 14px; }
        .tt-carousel-arrow-next { right: 14px; }

        /* Dots */
        .tt-carousel-dots {
          position: absolute; bottom: 18px;
          left: 50%; transform: translateX(-50%);
          display: flex; align-items: center; gap: 7px; z-index: 10;
        }
        .tt-carousel-dot {
          height: 8px; border-radius: 999px;
          background: rgba(255,255,255,.35);
          border: none; cursor: pointer; padding: 0;
          transition: width .3s cubic-bezier(.22,1,.36,1), background .3s;
          width: 8px;
        }
        .tt-carousel-dot.active {
          width: 28px;
          background: var(--accent, #1A5FBF);
        }

        /* Progress bar at bottom of carousel */
        @keyframes ttCarouselProgress {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        .tt-carousel-progress {
          position: absolute; bottom: 0; left: 0; right: 0;
          height: 3px; z-index: 10;
          background: rgba(255,255,255,.1);
          overflow: hidden;
        }
        .tt-carousel-progress-bar {
          height: 100%;
          background: var(--accent, #1A5FBF);
          transform-origin: left;
          animation: ttCarouselProgress 4s linear infinite;
          opacity: .8;
        }
      `}</style>

      <section className="tt-carousel">
        <div className="tt-carousel-viewport" ref={emblaRef}>
          <div className="tt-carousel-track">
            {slides.map((slide, i) => (
              <div key={i} className="tt-carousel-slide">
                <div className="tt-carousel-frame">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    loading={i === 0 ? "eager" : "lazy"}
                  />
                  <div className="tt-carousel-overlay" />
                  <div className="tt-carousel-caption">
                    <div>
                      <h2 className="tt-carousel-title">{slide.title}</h2>
                      <div className="tt-carousel-rule" />
                      <p className="tt-carousel-sub">{slide.subtitle}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Arrows */}
        <button
          className="tt-carousel-arrow tt-carousel-arrow-prev"
          onClick={scrollPrev}
          aria-label="Previous slide"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          className="tt-carousel-arrow tt-carousel-arrow-next"
          onClick={scrollNext}
          aria-label="Next slide"
        >
          <ChevronRight size={18} />
        </button>

        {/* Dots */}
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

        {/* Progress bar */}
        <div className="tt-carousel-progress">
          <div key={selectedIndex} className="tt-carousel-progress-bar" />
        </div>
      </section>
    </>
  );
};

export default HeroCarousel;