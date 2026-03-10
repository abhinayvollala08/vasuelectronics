import { motion } from "framer-motion";
import { Star, Users, ExternalLink, Quote } from "lucide-react";
import { MotionProps } from "framer-motion";
const reviews = [
  { name: "Rajesh Kumar",  rating: 5, text: "Excellent service! My LED TV was repaired within a day. Very professional team.", time: "2 weeks ago" },
  { name: "Priya Sharma",  rating: 5, text: "Best service center in Peddapalli. They used genuine parts and the TV works perfectly now.", time: "1 month ago" },
  { name: "Suresh Reddy",  rating: 4, text: "Good experience with their AC repair service. Reasonable pricing and quick turnaround.", time: "3 weeks ago" },
  { name: "Anita Devi",    rating: 5, text: "Very reliable and trustworthy. Fixed my washing machine issue which other shops couldn't.", time: "2 months ago" },
  { name: "Venkat Rao",    rating: 5, text: "Home theater installation was done perfectly. Great sound quality setup. Highly recommend!", time: "1 month ago" },
  { name: "Lakshmi Bai",   rating: 4, text: "Prompt service for my refrigerator. The technician was knowledgeable and polite.", time: "3 months ago" },
];

const fadeUp = (delay = 0): MotionProps => ({
  initial:     { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0, transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] } },
  viewport:    { once: true, margin: "-40px" },
});

/* Avatar color palette — cycles through calm professional tones */
const avatarColors = [
  { bg: "rgba(27,101,200,.13)",  color: "#1B65C8" },
  { bg: "rgba(16,163,74,.12)",   color: "#16A34A" },
  { bg: "rgba(217,119,6,.12)",   color: "#D97706" },
  { bg: "rgba(124,58,237,.12)",  color: "#7C3AED" },
  { bg: "rgba(219,39,119,.12)",  color: "#DB2777" },
  { bg: "rgba(8,145,178,.12)",   color: "#0891B2" },
];

const GoogleReviews = () => {
  return (
    <>
      <style>{`
        .tt-gr-card {
          background: var(--surface, #fff);
          border: 1px solid var(--border, #DDE3EF);
          border-radius: 14px;
          padding: 24px;
          box-shadow: var(--sh-sm, 0 1px 3px rgba(15,23,42,.06));
          transition: transform .25s cubic-bezier(.22,1,.36,1),
                      box-shadow .25s, border-color .25s;
          position: relative; overflow: hidden;
        }
        .tt-gr-card:hover {
          transform: translateY(-3px);
          box-shadow: var(--sh-md, 0 4px 14px rgba(15,23,42,.10));
          border-color: var(--accent-bd, #C0D9FF);
        }
        .tt-gr-card-dots {
          background-image: radial-gradient(circle, var(--dot-c, rgba(27,101,200,.09)) 1.2px, transparent 1.2px);
          background-size: 26px 26px;
        }

        .tt-gr-stat {
          display: flex; align-items: center; gap: 10px;
          padding: 18px 24px;
          background: var(--surface, #fff);
          border: 1px solid var(--border, #DDE3EF);
          border-radius: 12px;
          box-shadow: var(--sh-sm, 0 1px 3px rgba(15,23,42,.06));
          flex: 1; min-width: 160px;
        }

        .tt-gr-view-btn {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: 'DM Sans', sans-serif; font-weight: 600; font-size: .88rem;
          padding: 12px 26px; border-radius: 10px;
          border: 1.5px solid var(--accent-bd, #C0D9FF);
          color: var(--accent, #1B65C8);
          background: transparent;
          text-decoration: none;
          transition: background .2s, border-color .2s, transform .2s;
        }
        .tt-gr-view-btn:hover {
          background: var(--accent-lt, #EBF3FF);
          border-color: var(--accent, #1B65C8);
          transform: translateY(-1px);
        }

        .tt-gr-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
        }
        @media(max-width:900px){ .tt-gr-grid{ grid-template-columns: repeat(2,1fr); } }
        @media(max-width:560px){ .tt-gr-grid{ grid-template-columns: 1fr; } }

        .tt-gr-stats-row {
          display: flex; justify-content: center;
          gap: 16px; flex-wrap: wrap;
        }

        /* Quote icon */
        .tt-gr-quote {
          position: absolute; top: 16px; right: 16px;
          color: var(--accent-bd, #C0D9FF);
        }
      `}</style>

      <section style={{ padding: "80px 0 88px", background: "var(--bg, #F5F7FA)" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 24px" }}>

          {/* ── Header ───────────────────────────────────── */}
          <motion.div {...fadeUp(0)} style={{ textAlign: "center", marginBottom: 52 }}>

            <div style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: ".68rem", letterSpacing: ".18em",
              textTransform: "uppercase", color: "var(--accent, #1B65C8)",
              marginBottom: 10,
            }}>
              Verified Reviews
            </div>

            <h2 style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "clamp(1.8rem,3.8vw,2.6rem)",
              color: "var(--tx1, #0F172A)", marginBottom: 32, lineHeight: 1.15,
            }}>
              What Our Customers Say
            </h2>

            {/* Stats row */}
            <div className="tt-gr-stats-row">
              {/* Google rating */}
              <div className="tt-gr-stat">
                <div style={{
                  width: 38, height: 38, borderRadius: 9,
                  background: "rgba(251,188,4,.12)", border: "1px solid rgba(251,188,4,.3)",
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                }}>
                  <Star size={18} style={{ color: "#FBBF24", fill: "#FBBF24" }} />
                </div>
                <div>
                  <div style={{
                    fontFamily: "'DM Serif Display', serif",
                    fontSize: "1.4rem", color: "var(--tx1, #0F172A)", lineHeight: 1,
                  }}>
                    4.5 <span style={{ fontSize: ".75rem", fontFamily: "'DM Sans',sans-serif", fontWeight: 400, color: "var(--tx3, #64748B)" }}>/5</span>
                  </div>
                  <div style={{ fontSize: ".75rem", color: "var(--tx3, #64748B)", marginTop: 3 }}>Google Rating</div>
                </div>
              </div>

              {/* Reviews count */}
              <div className="tt-gr-stat">
                <div style={{
                  width: 38, height: 38, borderRadius: 9,
                  background: "var(--accent-lt, #EBF3FF)", border: "1px solid var(--accent-bd, #C0D9FF)",
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                }}>
                  <Users size={18} style={{ color: "var(--accent, #1B65C8)" }} />
                </div>
                <div>
                  <div style={{
                    fontFamily: "'DM Serif Display', serif",
                    fontSize: "1.4rem", color: "var(--tx1, #0F172A)", lineHeight: 1,
                  }}>
                    500+
                  </div>
                  <div style={{ fontSize: ".75rem", color: "var(--tx3, #64748B)", marginTop: 3 }}>Google Reviews</div>
                </div>
              </div>

              {/* Happy customers */}
              <div className="tt-gr-stat">
                <div style={{
                  width: 38, height: 38, borderRadius: 9,
                  background: "rgba(16,163,74,.1)", border: "1px solid rgba(16,163,74,.25)",
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                }}>
                  <span style={{ fontSize: "1rem" }}>😊</span>
                </div>
                <div>
                  <div style={{
                    fontFamily: "'DM Serif Display', serif",
                    fontSize: "1.4rem", color: "var(--tx1, #0F172A)", lineHeight: 1,
                  }}>
                    1,000+
                  </div>
                  <div style={{ fontSize: ".75rem", color: "var(--tx3, #64748B)", marginTop: 3 }}>Happy Customers</div>
                </div>
              </div>
            </div>
          </motion.div> 

          {/* ── Review cards ─────────────────────────────── */}
          <div className="tt-gr-grid" style={{ marginBottom: 44 }}>
            {reviews.map((review, i) => {
              const av = avatarColors[i % avatarColors.length];
              return (
                <motion.div key={review.name} {...fadeUp(i * 0.07)} className="tt-gr-card tt-gr-card-dots">

                  {/* Quote decoration */}
                  <Quote size={22} className="tt-gr-quote" />

                  <div style={{ position: "relative", zIndex: 1 }}>
                    {/* Reviewer row */}
                    <div style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 14 }}>
                      <div style={{
                        width: 40, height: 40, borderRadius: "50%",
                        background: av.bg, color: av.color,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontFamily: "'DM Serif Display', serif",
                        fontSize: "1rem", fontWeight: 700, flexShrink: 0,
                        border: `1.5px solid ${av.color}30`,
                      }}>
                        {review.name.charAt(0)}
                      </div>
                      <div>
                        <div style={{ fontSize: ".88rem", fontWeight: 600, color: "var(--tx1, #0F172A)", lineHeight: 1.2 }}>
                          {review.name}
                        </div>
                        <div style={{ fontSize: ".73rem", color: "var(--tx3, #64748B)", marginTop: 2 }}>
                          {review.time}
                        </div>
                      </div>
                    </div>

                    {/* Stars */}
                    <div style={{ display: "flex", gap: 3, marginBottom: 12 }}>
                      {Array.from({ length: 5 }).map((_, j) => (
                        <Star key={j} size={14} style={{
                          color: j < review.rating ? "#FBBF24" : "var(--border, #DDE3EF)",
                          fill:  j < review.rating ? "#FBBF24" : "var(--border, #DDE3EF)",
                        }} />
                      ))}
                    </div>

                    {/* Review text */}
                    <p style={{
                      fontSize: ".85rem", lineHeight: 1.7,
                      color: "var(--tx2, #334155)",
                    }}>
                      {review.text}
                    </p>

                    {/* Google badge */}
                    <div style={{
                      display: "inline-flex", alignItems: "center", gap: 5,
                      marginTop: 16, padding: "4px 10px", borderRadius: 6,
                      background: "var(--subtle, #EDF0F6)",
                      border: "1px solid var(--border, #DDE3EF)",
                    }}>
                      {/* Google G */}
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                      </svg>
                      <span style={{ fontSize: ".67rem", fontFamily: "'DM Mono',monospace", color: "var(--tx3, #64748B)", letterSpacing: ".06em" }}>
                        Google Review
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* ── CTA ──────────────────────────────────────── */}
          <div style={{ textAlign: "center" }}>
            <a
              href="https://www.google.com/maps/place/TechnoTV"
              target="_blank"
              rel="noopener noreferrer"
              className="tt-gr-view-btn"
            >
              View All Reviews on Google
              <ExternalLink size={14} />
            </a>
          </div>

        </div>
      </section>
    </>
  );
};

export default GoogleReviews;