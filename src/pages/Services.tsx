import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Tv, Speaker, Snowflake, WashingMachine, Refrigerator,
  Monitor, Cpu, Plug, CheckCircle, Phone, ArrowRight,
  ShieldCheck, Clock, Wrench, Zap,
} from "lucide-react";
import Layout from "@/components/Layout";
import type { MotionProps } from "framer-motion";

import { useDarkMode } from "@/components/Header";

/* ─── animation helpers ─────────────────────────────────────────── */
const fadeUp = (delay = 0): MotionProps => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0, transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] } },
  viewport: { once: true, margin: "-40px" },
});

/* ─── data ──────────────────────────────────────────────────────── */
const services = [
  {
    Icon: Tv,
    title: "LED / LCD / Smart TV Repair",
    desc: "Expert repair for all types of televisions including LED, LCD, OLED, and Smart TVs.",
    features: ["Panel replacement", "Backlight repair", "Motherboard repair", "Software updates", "Screen replacement"],
  },
  {
    Icon: Speaker,
    title: "Home Theatre Installation & Repair",
    desc: "Complete home theatre setup, calibration, and repair services for all systems.",
    features: ["Surround sound setup", "Projector installation", "Speaker repair", "AV receiver service", "Wiring & setup"],
  },
  {
    Icon: Snowflake,
    title: "AC Service & Repair",
    desc: "Comprehensive air conditioner maintenance, repair, and installation for all brands.",
    features: ["Gas refilling", "Compressor repair", "Deep cleaning", "Installation", "Annual maintenance"],
  },
  {
    Icon: WashingMachine,
    title: "Washing Machine Repair",
    desc: "Repair and service for all brands of front-load and top-load washing machines.",
    features: ["Drum replacement", "Motor repair", "PCB repair", "Water pump issues", "Drain problems"],
  },
  {
    Icon: Refrigerator,
    title: "Refrigerator Service",
    desc: "Cooling issues, thermostat problems, and complete refrigerator maintenance.",
    features: ["Cooling issues", "Compressor service", "Thermostat repair", "Gas refilling", "Door seal replacement"],
  },
  {
    Icon: Monitor,
    title: "Monitor & Display Repair",
    desc: "Professional repair for computer monitors, displays, and screens of all sizes.",
    features: ["Dead pixel repair", "Power issues", "Display flickering", "Cable replacement", "Calibration"],
  },
  {
    Icon: Cpu,
    title: "Set-Top Box & DTH",
    desc: "Repair and troubleshooting for all set-top boxes and DTH systems.",
    features: ["Signal issues", "Software update", "Remote repair", "HDMI issues", "Channel setup"],
  },
  {
    Icon: Plug,
    title: "Electrical Appliance Repair",
    desc: "General repair services for various household electrical appliances.",
    features: ["Microwave repair", "Mixer grinder", "Iron & heater", "Water purifier", "Inverter service"],
  },
];

const steps = [
  { step: "01", Icon: Phone,      title: "Contact Us",  desc: "Call us or fill the contact form for a free consultation — no obligation." },
  { step: "02", Icon: Zap,        title: "Diagnosis",   desc: "Our expert technicians diagnose the fault thoroughly on-site." },
  { step: "03", Icon: Wrench,     title: "Repair",      desc: "We fix it using genuine OEM parts and proven repair techniques." },
  { step: "04", Icon: ShieldCheck, title: "Warranty",   desc: "Your repaired appliance is handed back with a written service warranty." },
];

/* ════════════════════════════════════════════════════════════════ */
const Services = () => {
  const { dark } = useDarkMode();

  return (
    <Layout>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&family=DM+Mono:wght@400;500&display=swap');

        .tt[data-theme="light"] {
          --bg:         #F4F6FA;
          --surface:    #FFFFFF;
          --subtle:     #ECF0F7;
          --tx1:        #0D1526;
          --tx2:        #2E3D55;
          --tx3:        #5E7191;
          --tx4:        #9BAABF;
          --accent:     #1A5FBF;
          --accent-h:   #154FA3;
          --accent-lt:  #E8F1FD;
          --accent-bd:  #BADAFF;
          --ok:         #15803D;
          --ok-bg:      #DCFCE7;
          --border:     #D9E1EE;
          --border-str: #C3CEDF;
          --sh-sm:      0 1px 2px rgba(13,21,38,.05), 0 1px 4px rgba(13,21,38,.04);
          --sh-md:      0 4px 16px rgba(13,21,38,.08), 0 2px 6px rgba(13,21,38,.04);
          --grid-c:     rgba(26,95,191,.048);
          --dot-c:      rgba(26,95,191,.085);
          --cta-dark:   #0D1526;
          --cta-dark-tx:#FFFFFF;
          --blob1:      rgba(232,241,253,0.9);
          --blob2:      rgba(236,240,247,0.8);
        }
        .tt[data-theme="dark"] {
          --bg:         #0B0E17;
          --surface:    #121622;
          --subtle:     #171C2A;
          --tx1:        #ECF2FC;
          --tx2:        #C2CEDF;
          --tx3:        #788499;
          --tx4:        #435060;
          --accent:     #4A9BFF;
          --accent-h:   #62AAFF;
          --accent-lt:  #0E1C30;
          --accent-bd:  #193150;
          --ok:         #4ADE80;
          --ok-bg:      #052E16;
          --border:     #1F2738;
          --border-str: #283044;
          --sh-sm:      0 1px 3px rgba(0,0,0,.30);
          --sh-md:      0 4px 16px rgba(0,0,0,.40);
          --grid-c:     rgba(74,155,255,.046);
          --dot-c:      rgba(74,155,255,.068);
          --cta-dark:   #FFFFFF;
          --cta-dark-tx:#1A5FBF;
          --blob1:      rgba(14,28,48,0.8);
          --blob2:      rgba(23,28,42,0.6);
        }

        .tt *, .tt *::before, .tt *::after { box-sizing: border-box; }
        .tt {
          font-family: 'DM Sans', system-ui, sans-serif;
          background: var(--bg); color: var(--tx1);
          transition: background .3s ease, color .3s ease;
          -webkit-font-smoothing: antialiased;
        }
        .tt-serif { font-family: 'DM Serif Display', Georgia, serif; }
        .tt-mono  { font-family: 'DM Mono', monospace; }

        .tt-wrap { width:100%; max-width:1180px; margin:0 auto; padding:0 28px; }
        @media(max-width:600px){ .tt-wrap{ padding:0 18px; } }
        .tt-sec    { padding:96px 0; }
        @media(max-width:768px){ .tt-sec{ padding:68px 0; } }

        .tt-grid {
          background-image:
            linear-gradient(var(--grid-c) 1px, transparent 1px),
            linear-gradient(90deg, var(--grid-c) 1px, transparent 1px);
          background-size: 48px 48px;
        }
        .tt-dots {
          background-image: radial-gradient(circle, var(--dot-c) 1.3px, transparent 1.3px);
          background-size: 24px 24px;
        }

        .tt-card {
          background: var(--surface); border: 1px solid var(--border);
          border-radius: 14px; box-shadow: var(--sh-sm);
          position: relative; overflow: hidden;
          transition: transform .28s cubic-bezier(.22,1,.36,1), box-shadow .28s, border-color .28s;
        }
        .tt-card-hover:hover { transform:translateY(-3px); box-shadow:var(--sh-md); border-color:var(--accent-bd); }

        .tt-ib {
          width:44px; height:44px; border-radius:10px;
          background:var(--accent-lt); border:1px solid var(--accent-bd);
          display:flex; align-items:center; justify-content:center; flex-shrink:0;
        }

        .tt-lbl {
          font-family:'DM Mono',monospace; font-size:.66rem;
          letter-spacing:.2em; text-transform:uppercase;
          color:var(--accent); display:block; margin-bottom:10px;
        }

        .tt-divider { height:1px; background:var(--border); }

        .tt-pill {
          display:inline-flex; align-items:center; gap:6px;
          background:var(--ok-bg); color:var(--ok);
          font-size:.7rem; font-weight:600; letter-spacing:.04em;
          padding:5px 11px; border-radius:999px;
        }
        @keyframes ttPls { 0%,100%{opacity:1} 50%{opacity:.3} }
        .tt-pls { animation:ttPls 1.8s ease-in-out infinite; }

        .tt-accent-surface { background:var(--accent-lt); border:1px solid var(--accent-bd); border-radius:12px; }

        /* Services hero */
        .tt-svc-hero {
          display:grid; grid-template-columns:1.1fr 0.9fr;
          gap:64px; align-items:center; padding:100px 0 72px;
        }
        @media(max-width:860px){
          .tt-svc-hero { grid-template-columns:1fr; gap:36px; padding:72px 0 48px; text-align:center; }
          .tt-hero-pill { margin:0 auto!important; }
          .tt-hero-rule { margin:0 auto 20px!important; }
          .tt-hero-ctas { justify-content:center!important; }
        }

        /* Services grid */
        .tt-svc-grid {
          display:grid; grid-template-columns:repeat(2,1fr); gap:20px;
        }
        @media(max-width:720px){ .tt-svc-grid{ grid-template-columns:1fr; } }

        /* Steps grid */
        .tt-steps-grid {
          display:grid; grid-template-columns:repeat(4,1fr); gap:20px;
        }
        @media(max-width:900px){ .tt-steps-grid{ grid-template-columns:repeat(2,1fr); } }
        @media(max-width:480px){ .tt-steps-grid{ grid-template-columns:1fr; } }
      `}</style>

      <div className="tt" data-theme={dark ? "dark" : "light"}>

        {/* ══════════════════════════════════════════════════════
            HERO
        ══════════════════════════════════════════════════════ */}
        <section style={{ background: "var(--bg)", position: "relative", overflow: "hidden" }}>
          <div className="tt-grid" style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />
          <div style={{ position: "absolute", top: "-10%", right: "-8%", width: "clamp(280px,42vw,540px)", height: "clamp(280px,42vw,540px)", borderRadius: "50%", background: "radial-gradient(circle, var(--blob1) 0%, transparent 68%)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: "-8%", left: "-6%", width: "clamp(160px,22vw,300px)", height: "clamp(160px,22vw,300px)", borderRadius: "50%", background: "radial-gradient(circle, var(--blob2) 0%, transparent 68%)", pointerEvents: "none" }} />

          <div className="tt-wrap" style={{ position: "relative", zIndex: 1 }}>
            <div className="tt-svc-hero">

              {/* Left */}
              <motion.div {...fadeUp(0)}>
                <div className="tt-pill tt-hero-pill" style={{ marginBottom: 22, width: "fit-content" }}>
                  <span className="tt-pls" style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--ok)", display: "inline-block", flexShrink: 0 }} />
                  Accepting Bookings Now
                </div>
                <h1 className="tt-serif" style={{ fontSize: "clamp(2.4rem,5vw,3.7rem)", lineHeight: 1.08, color: "var(--tx1)", marginBottom: 18 }}>
                  Complete<br />
                  <em style={{ color: "var(--accent)", fontStyle: "italic" }}>Electronics</em><br />
                  Solutions
                </h1>
                <div className="tt-hero-rule" style={{ width: 52, height: 3, borderRadius: 2, background: "var(--accent)", marginBottom: 20, opacity: .7 }} />
                <p style={{ fontSize: ".97rem", lineHeight: 1.82, color: "var(--tx2)", marginBottom: 32, maxWidth: 460 }}>
                  From TVs to home theatres, ACs to washing machines —
                  we repair it all with <strong style={{ color: "var(--tx1)", fontWeight: 600 }}>genuine parts</strong> and
                  expert care across Peddapalli &amp; Mancherial.
                </p>
                <div className="tt-hero-ctas" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  <a href="tel:+919912172878" className="tt-btn-p" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "var(--accent)", color: "#fff", fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: ".88rem", padding: "13px 26px", borderRadius: 10, textDecoration: "none", boxShadow: "0 4px 16px rgba(26,95,191,.28)", whiteSpace: "nowrap" }}>
                    <Phone size={15} /> +91 99121 72878
                  </a>
                  <Link to="/contact" style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "transparent", color: "var(--accent)", fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: ".88rem", padding: "12px 22px", borderRadius: 10, textDecoration: "none", border: "1.5px solid var(--accent-bd)", whiteSpace: "nowrap" }}>
                    Book Online <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.div>

              {/* Right — quick highlights */}
              <motion.div {...fadeUp(0.13)}>
                <div className="tt-card tt-dots" style={{ padding: 14 }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {[
                      { Icon: ShieldCheck, label: "Genuine OEM Parts",    sub: "No cheap substitutes — ever" },
                      { Icon: Clock,       label: "Same-Day Response",    sub: "Call before noon, we arrive today" },
                      { Icon: Wrench,      label: "Certified Technicians", sub: "Factory-trained, brand-authorized" },
                      { Icon: CheckCircle, label: "Post-Repair Warranty", sub: "Written guarantee on every job" },
                    ].map((item, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", borderRadius: 10, background: i % 2 === 0 ? "var(--surface)" : "var(--subtle)", border: "1px solid var(--border)" }}>
                        <div style={{ width: 36, height: 36, borderRadius: 9, background: "var(--accent-lt)", border: "1px solid var(--accent-bd)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <item.Icon size={16} style={{ color: "var(--accent)" }} />
                        </div>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: ".86rem", color: "var(--tx1)", lineHeight: 1.2 }}>{item.label}</div>
                          <div style={{ fontSize: ".73rem", color: "var(--tx3)", marginTop: 2 }}>{item.sub}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            SERVICES GRID
        ══════════════════════════════════════════════════════ */}
        <section className="tt-sec" style={{ background: "var(--bg)" }}>
          <div className="tt-wrap">
            <motion.div {...fadeUp(0)} style={{ marginBottom: 44 }}>
              <span className="tt-lbl">What We Offer</span>
              <h2 className="tt-serif" style={{ fontSize: "clamp(1.7rem,3.6vw,2.5rem)", color: "var(--tx1)", lineHeight: 1.15 }}>
                Comprehensive Repair &amp; Service
              </h2>
              <p style={{ fontSize: ".9rem", color: "var(--tx3)", marginTop: 10, maxWidth: 480 }}>
                Professional repair services backed by warranty and genuine parts across all major brands.
              </p>
            </motion.div>

            <div className="tt-svc-grid">
              {services.map((svc, i) => (
                <motion.div key={i} {...fadeUp(i * 0.055)} className="tt-card tt-card-hover" style={{ padding: "26px 24px" }}>
                  <div className="tt-dots" style={{ position: "absolute", inset: 0, borderRadius: "inherit", pointerEvents: "none", opacity: .45 }} />
                  <div style={{ position: "relative", zIndex: 1, display: "flex", gap: 16, alignItems: "flex-start" }}>
                    <div className="tt-ib" style={{ flexShrink: 0 }}>
                      <svc.Icon size={19} style={{ color: "var(--accent)" }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontWeight: 600, fontSize: ".95rem", color: "var(--tx1)", marginBottom: 7, lineHeight: 1.3 }}>{svc.title}</h3>
                      <p style={{ fontSize: ".82rem", lineHeight: 1.68, color: "var(--tx3)", marginBottom: 14 }}>{svc.desc}</p>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 14px" }}>
                        {svc.features.map((f, j) => (
                          <span key={j} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: ".76rem", color: "var(--tx2)" }}>
                            <CheckCircle size={11} style={{ color: "var(--accent)", flexShrink: 0 }} />{f}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <div className="tt-wrap"><div className="tt-divider" /></div>

        {/* ══════════════════════════════════════════════════════
            HOW IT WORKS
        ══════════════════════════════════════════════════════ */}
        <section className="tt-sec" style={{ background: "var(--surface)", position: "relative", overflow: "hidden" }}>
          <div className="tt-grid" style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />
          <div className="tt-wrap" style={{ position: "relative", zIndex: 1 }}>

            <motion.div {...fadeUp(0)} style={{ marginBottom: 44 }}>
              <span className="tt-lbl">How It Works</span>
              <h2 className="tt-serif" style={{ fontSize: "clamp(1.7rem,3.6vw,2.5rem)", color: "var(--tx1)", lineHeight: 1.15 }}>
                Simple 4-Step Process
              </h2>
            </motion.div>

            <div className="tt-steps-grid">
              {steps.map((s, i) => (
                <motion.div key={i} {...fadeUp(i * 0.08)} className="tt-card tt-card-hover" style={{ padding: "28px 22px" }}>
                  <div className="tt-dots" style={{ position: "absolute", inset: 0, borderRadius: "inherit", pointerEvents: "none", opacity: .4 }} />
                  <div style={{ position: "relative", zIndex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
                      <div className="tt-ib">
                        <s.Icon size={18} style={{ color: "var(--accent)" }} />
                      </div>
                      <span className="tt-serif" style={{ fontSize: "2.2rem", color: "var(--accent-bd)", lineHeight: 1, userSelect: "none" }}>{s.step}</span>
                    </div>
                    <h3 style={{ fontWeight: 600, fontSize: ".95rem", color: "var(--tx1)", marginBottom: 8 }}>{s.title}</h3>
                    <p style={{ fontSize: ".82rem", lineHeight: 1.68, color: "var(--tx3)", margin: 0 }}>{s.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            CTA BAND
        ══════════════════════════════════════════════════════ */}
        <section style={{ background: "var(--accent)", padding: "88px 0", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.06) 1px,transparent 1px)", backgroundSize: "48px 48px", pointerEvents: "none" }} />
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "65%", height: "240%", background: "radial-gradient(ellipse, rgba(255,255,255,.1) 0%, transparent 58%)", pointerEvents: "none" }} />
          <div className="tt-wrap" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
            <motion.div {...fadeUp(0)}>
              <span className="tt-mono" style={{ fontSize: ".65rem", letterSpacing: ".2em", color: "rgba(255,255,255,.6)", marginBottom: 14, textTransform: "uppercase", display: "block" }}>Same-Day Service Available</span>
              <h2 className="tt-serif" style={{ fontSize: "clamp(1.9rem,4.6vw,3.1rem)", color: "#fff", marginBottom: 16, lineHeight: 1.1 }}>Need a Repair?</h2>
              <p style={{ fontSize: ".95rem", color: "rgba(255,255,255,.76)", maxWidth: 420, margin: "0 auto 36px", lineHeight: 1.78 }}>
                Free diagnosis. Transparent pricing. Technician arrives same day across Peddapalli &amp; Mancherial.
              </p>
              <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 32 }}>
                <a href="tel:+919912172878" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "var(--cta-dark)", color: "var(--cta-dark-tx)", fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: ".9rem", padding: "14px 28px", borderRadius: 10, textDecoration: "none", boxShadow: "0 6px 24px rgba(0,0,0,.2)" }}>
                  <Phone size={15} /> +91 99121 72878
                </a>
                <Link to="/contact" style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "transparent", color: "#fff", fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: ".88rem", padding: "13px 22px", borderRadius: 10, textDecoration: "none", border: "1.5px solid rgba(255,255,255,.4)" }}>
                  Book Online <ArrowRight size={14} />
                </Link>
              </div>
              <div style={{ display: "flex", justifyContent: "center", gap: 24, flexWrap: "wrap" }}>
                {["Free Diagnosis", "Warranty on Repairs", "No Hidden Charges"].map((t, i) => (
                  <span key={i} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: ".77rem", color: "rgba(255,255,255,.68)" }}>
                    <CheckCircle size={12} style={{ color: "rgba(255,255,255,.9)" }} />{t}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

      </div>
    </Layout>
  );
};

export default Services;