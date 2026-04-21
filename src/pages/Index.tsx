import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import HeroSection  from "@/components/HeroSection";

import {
  Phone, Tv, Wrench, Wind,
  ShieldCheck, Clock, Star, ArrowRight,
  CheckCircle, MapPin, ChevronRight, Zap,
  Award, Users,
} from "lucide-react";
import Layout from "@/components/Layout";
import HeroCarousel from "@/components/HeroCarousel";
import GoogleReviews from "@/components/GoogleReviews";
import BrandsMarquee from "@/components/BrandsMarquee";
import ServiceCenterCard from "@/components/ServiceCenterCard";
import type { MotionProps } from "framer-motion";

/* Import the shared hook — theme is now owned by Header */
import { useDarkMode } from "@/components/Header";

/* ─── animation helpers ─────────────────────────────────────────── */
const fadeUp = (delay = 0): MotionProps => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0, transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] } },
  viewport: { once: true, margin: "-40px" },
});
/* ─── data ──────────────────────────────────────────────────────── */
const stats = [
  { value: "10+", label: "Years of Service", Icon: Award },
  { value: "5,000+", label: "Devices Repaired", Icon: Wrench },
  { value: "15+", label: "Authorized Brands", Icon: ShieldCheck },
  { value: "2", label: "Districts Covered", Icon: MapPin },
];

const services = [
  { Icon: Tv, title: "TV Repair", desc: "LED, LCD & Plasma TVs — screen, board, backlight and power fault diagnosis." },
  { Icon: Wind, title: "AC Servicing", desc: "Deep cleaning, gas refill, compressor & PCB repair for all major brands." },
  { Icon: Wrench, title: "Refrigerator Repair", desc: "Cooling issues, compressor faults, gas leaks — fully diagnosed and resolved." },
  { Icon: Zap, title: "Washing Machine", desc: "Front-load & top-load: drum, motor, PCB & inlet valve repairs." },
  { Icon: Star, title: "Home Theatre", desc: "Installation, calibration and surround-sound system setup at your home." },
  { Icon: ShieldCheck, title: "AMC Contracts", desc: "Annual maintenance plans for homes, offices and businesses." },
];

const pillars = [
  { Icon: ShieldCheck, title: "Genuine Parts Only", desc: "We source OEM-certified components — no cheap substitutes, ever." },
  { Icon: Clock, title: "Same-Day Response", desc: "Call before noon; our technician arrives the same day." },
  { Icon: Users, title: "Certified Technicians", desc: "Factory-trained, brand-authorized engineers on every job." },
  { Icon: MapPin, title: "Doorstep Service", desc: "Peddapalli & Mancherial districts — we come to you." },
];

const reasons = [
  "Transparent pricing quoted before any work starts",
  "Post-repair warranty on every single job",
  "Over 5,000 successful repairs across 15+ brands",
  "Punctual technicians who respect your home",
  "Genuine spare parts with serial-number traceability",
  "One trusted contact for all your appliance needs",
];

/* ════════════════════════════════════════════════════════════════ */
const Index = () => {
  /* Subscribe to the shared theme — Header toggles, Index reacts */
  const { dark } = useDarkMode();

  return (
    <Layout>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&family=DM+Mono:wght@400;500&display=swap');

        /* ─── Tokens ──────────────────────────────────────────── */
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

        /* ─── Base ────────────────────────────────────────────── */
        .tt *, .tt *::before, .tt *::after { box-sizing: border-box; }
        .tt {
          font-family: 'DM Sans', system-ui, sans-serif;
          background: var(--bg); color: var(--tx1);
          transition: background .3s ease, color .3s ease;
          -webkit-font-smoothing: antialiased;
        }
        .tt-serif { font-family: 'DM Serif Display', Georgia, serif; }
        .tt-mono  { font-family: 'DM Mono', monospace; }

        /* ─── Layout ──────────────────────────────────────────── */
        .tt-wrap { width:100%; max-width:1180px; margin:0 auto; padding:0 28px; }
        @media(max-width:600px){ .tt-wrap{ padding:0 18px; } }
        .tt-sec    { padding:96px 0; }
        .tt-sec-sm { padding:72px 0; }
        @media(max-width:768px){
          .tt-sec    { padding:68px 0; }
          .tt-sec-sm { padding:52px 0; }
        }

        /* ─── Textures ────────────────────────────────────────── */
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

        /* ─── Cards ───────────────────────────────────────────── */
        .tt-card {
          background: var(--surface); border: 1px solid var(--border);
          border-radius: 14px; box-shadow: var(--sh-sm);
          position: relative; overflow: hidden;
          transition: transform .28s cubic-bezier(.22,1,.36,1), box-shadow .28s, border-color .28s;
        }
        .tt-card-hover:hover { transform:translateY(-3px); box-shadow:var(--sh-md); border-color:var(--accent-bd); }

        /* ─── Icon badge ──────────────────────────────────────── */
        .tt-ib {
          width:44px; height:44px; border-radius:10px;
          background:var(--accent-lt); border:1px solid var(--accent-bd);
          display:flex; align-items:center; justify-content:center; flex-shrink:0;
        }

        /* ─── Section label ───────────────────────────────────── */
        .tt-lbl {
          font-family:'DM Mono',monospace; font-size:.66rem;
          letter-spacing:.2em; text-transform:uppercase;
          color:var(--accent); display:block; margin-bottom:10px;
        }

        /* ─── Buttons ─────────────────────────────────────────── */
        .tt-btn-p {
          display:inline-flex; align-items:center; gap:8px;
          background:var(--accent); color:#fff;
          font-family:'DM Sans',sans-serif; font-weight:600; font-size:.88rem;
          padding:13px 26px; border-radius:10px; border:none; cursor:pointer;
          box-shadow:0 4px 16px rgba(26,95,191,.28);
          transition:background .2s, transform .2s, box-shadow .2s;
          text-decoration:none; white-space:nowrap; letter-spacing:.01em;
        }
        .tt-btn-p:hover { background:var(--accent-h); transform:translateY(-1px); box-shadow:0 7px 22px rgba(26,95,191,.36); }
        .tt-btn-g {
          display:inline-flex; align-items:center; gap:8px;
          background:transparent; color:var(--accent);
          font-family:'DM Sans',sans-serif; font-weight:600; font-size:.88rem;
          padding:12px 22px; border-radius:10px; border:1.5px solid var(--accent-bd);
          cursor:pointer; transition:background .2s, border-color .2s;
          text-decoration:none; white-space:nowrap;
        }
        .tt-btn-g:hover { background:var(--accent-lt); border-color:var(--accent); }

        /* ─── Divider ─────────────────────────────────────────── */
        .tt-divider { height:1px; background:var(--border); }

        /* ─── Pill ────────────────────────────────────────────── */
        .tt-pill {
          display:inline-flex; align-items:center; gap:6px;
          background:var(--ok-bg); color:var(--ok);
          font-size:.7rem; font-weight:600; letter-spacing:.04em;
          padding:5px 11px; border-radius:999px;
        }
        @keyframes ttPls { 0%,100%{opacity:1} 50%{opacity:.3} }
        .tt-pls { animation:ttPls 1.8s ease-in-out infinite; }

        /* ─── Ticker ──────────────────────────────────────────── */
        @keyframes ttTick { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        .tt-tick { animation:ttTick 32s linear infinite; display:flex; }
        .tt-tick:hover { animation-play-state:paused; }

        /* ─── Scroll cue ──────────────────────────────────────── */
        @keyframes ttSC {
          0%   { transform:translateY(0); opacity:.7; }
          60%  { transform:translateY(8px); opacity:.15; }
          100% { transform:translateY(0); opacity:.7; }
        }
        .tt-sc { animation:ttSC 2s ease-in-out infinite; }

        /* ─── Underline link ──────────────────────────────────── */
        .tt-ul { position:relative; color:var(--accent); text-decoration:none; font-weight:500; }
        .tt-ul::after { content:''; position:absolute; left:0; bottom:-2px; width:0; height:1.5px; background:var(--accent); transition:width .22s ease; }
        .tt-ul:hover::after { width:100%; }

        /* ─── Grids ───────────────────────────────────────────── */
        .tt-g2 { display:grid; grid-template-columns:repeat(2,1fr); gap:16px; }
        .tt-g3 { display:grid; grid-template-columns:repeat(3,1fr); gap:20px; }
        @media(max-width:960px){ .tt-g3{ grid-template-columns:repeat(2,1fr); } }
        @media(max-width:540px){ .tt-g2{ grid-template-columns:1fr; } .tt-g3{ grid-template-columns:1fr; } }

        /* ─── Hero ────────────────────────────────────────────── */
        .tt-hero-grid {
          display:grid; grid-template-columns:1.15fr 0.85fr;
          gap:56px; align-items:center;
          min-height:calc(100vh - 64px); padding:96px 0 48px;
        }
        @media(max-width:860px){
          .tt-hero-grid { grid-template-columns:1fr; gap:40px; padding:72px 0 36px; text-align:center; min-height:auto; }
          .tt-hero-pill,.tt-hero-trust,.tt-hero-ctas { justify-content:center!important; }
          .tt-hero-pill { margin:0 auto!important; }
          .tt-hero-rule { margin:0 auto 20px!important; }
        }

        /* ─── About ───────────────────────────────────────────── */
        .tt-about-grid { display:grid; grid-template-columns:1fr 1fr; gap:64px; align-items:start; }
        @media(max-width:860px){ .tt-about-grid{ grid-template-columns:1fr; gap:40px; } }

        /* ─── Section header ──────────────────────────────────── */
        .tt-sec-head {
          display:flex; justify-content:space-between; align-items:flex-end;
          flex-wrap:wrap; gap:12px; margin-bottom:44px;
        }

        /* ─── Accent surface ──────────────────────────────────── */
        .tt-accent-surface { background:var(--accent-lt); border:1px solid var(--accent-bd); border-radius:12px; }
      `}</style>

      {/* Theme wrapper — synced to Header toggle via shared hook */}
      <div className="tt" data-theme={dark ? "dark" : "light"}>

        {/* ══════════════════════════════════════════════════════
            HERO
        ══════════════════════════════════════════════════════ */}
        <HeroSection />

        {/* Ticker */}
        {/* <div style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", background: "var(--surface)", overflow: "hidden", padding: "10px 0" }}>
          <div className="tt-tick" style={{ whiteSpace: "nowrap", width: "fit-content" }}>
            {[...Array(4)].map((_, k) => (
              <span key={k} className="tt-mono" style={{ color: "var(--tx3)", fontSize: ".7rem", letterSpacing: ".1em", display: "flex", alignItems: "center", gap: 28, paddingRight: 28 }}>
                {["LED TV Repair", "AC Servicing", "Refrigerator Repair", "Washing Machine Fix", "Home Theatre Setup", "AMC Contracts", "Genuine Parts"].map((item, j) => (
                  <span key={j} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ color: "var(--accent)", fontSize: ".5rem" }}>◆</span>{item}
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div> */}

        {/* Carousel */}
        <section style={{ background: "var(--subtle)" }}><HeroCarousel /></section>

        {/* ── Services ────────────────────────────────────────── */}
        <section className="tt-sec" style={{ background: "var(--bg)" }}>
          <div className="tt-wrap">
            <motion.div {...fadeUp(0)} className="tt-sec-head">
              <div>
                <span className="tt-lbl">What We Fix</span>
                <h2 className="tt-serif" style={{ fontSize: "clamp(1.7rem,3.6vw,2.5rem)", color: "var(--tx1)", lineHeight: 1.15 }}>Complete Appliance Care</h2>
              </div>
              <Link to="/services" className="tt-ul" style={{ fontSize: ".85rem", display: "flex", alignItems: "center", gap: 4, paddingBottom: 2 }}>
                All services <ChevronRight size={13} />
              </Link>
            </motion.div>
            <div className="tt-g3">
              {services.map((svc, i) => (
                <motion.div key={i} {...fadeUp(i * 0.065)} className="tt-card tt-card-hover" style={{ padding: "26px 24px" }}>
                  <div className="tt-dots" style={{ position: "absolute", inset: 0, borderRadius: "inherit", pointerEvents: "none", opacity: .5 }} />
                  <div style={{ position: "relative", zIndex: 1 }}>
                    <div className="tt-ib" style={{ marginBottom: 16 }}><svc.Icon size={19} style={{ color: "var(--accent)" }} /></div>
                    <h3 style={{ fontWeight: 600, fontSize: ".95rem", color: "var(--tx1)", marginBottom: 8, lineHeight: 1.3 }}>{svc.title}</h3>
                    <p style={{ fontSize: ".82rem", lineHeight: 1.68, color: "var(--tx3)" }}>{svc.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <div className="tt-wrap"><div className="tt-divider" /></div>

        {/* ── About ───────────────────────────────────────────── */}
        <section className="tt-sec" style={{ background: "var(--surface)", position: "relative", overflow: "hidden" }}>
          <div className="tt-grid" style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />
          <div className="tt-wrap" style={{ position: "relative", zIndex: 1 }}>
            <div className="tt-about-grid">
              <motion.div {...fadeUp(0)}>
                <span className="tt-lbl">About TechnoTV</span>
                <h2 className="tt-serif" style={{ fontSize: "clamp(1.7rem,3.6vw,2.5rem)", color: "var(--tx1)", marginBottom: 20, lineHeight: 1.15 }}>A Decade of<br />Trusted Repairs</h2>
                <p style={{ fontSize: ".93rem", lineHeight: 1.82, color: "var(--tx2)", marginBottom: 14 }}>
                  Since 2014, TechnoTV has been the go-to authorised service center across Peddapalli and Mancherial
                  districts. What began as a single workshop has grown into a certified multi-brand repair facility trusted by thousands of homes.
                </p>
                <p style={{ fontSize: ".9rem", lineHeight: 1.82, color: "var(--tx3)", marginBottom: 32 }}>
                  Every technician is factory-trained, every part is OEM-certified, and every repair comes with a
                  post-service warranty. We don't cut corners — because your appliances power your daily life.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {reasons.map((r, i) => (
                    <motion.div key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.055, duration: .4 }} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                      <CheckCircle size={14} style={{ color: "var(--accent)", marginTop: 3, flexShrink: 0 }} />
                      <span style={{ fontSize: ".86rem", color: "var(--tx2)", lineHeight: 1.65 }}>{r}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div {...fadeUp(0.13)} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {pillars.map((p, i) => (
                  <motion.div key={i} {...fadeUp(0.08 + i * 0.07)} className="tt-card tt-card-hover" style={{ padding: "20px 18px", display: "flex", gap: 14, alignItems: "flex-start" }}>
                    <div className="tt-ib"><p.Icon size={18} style={{ color: "var(--accent)" }} /></div>
                    <div>
                      <h4 style={{ fontWeight: 600, fontSize: ".92rem", color: "var(--tx1)", marginBottom: 4 }}>{p.title}</h4>
                      <p style={{ fontSize: ".81rem", color: "var(--tx3)", lineHeight: 1.6 }}>{p.desc}</p>
                    </div>
                  </motion.div>
                ))}
                <div style={{ padding: "20px 18px", borderRadius: 14, background: "var(--accent-lt)", border: "1px solid var(--accent-bd)", display: "flex", gap: 14, alignItems: "center" }}>
                  <div style={{ width: 44, height: 44, borderRadius: 10, background: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 4px 14px rgba(26,95,191,.3)" }}>
                    <ShieldCheck size={20} style={{ color: "#fff" }} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: ".92rem", color: "var(--tx1)", marginBottom: 4 }}>Warranty on Every Repair</div>
                    <div style={{ fontSize: ".8rem", color: "var(--tx3)", lineHeight: 1.6 }}>All repairs backed by a written post-service warranty. Your peace of mind is guaranteed.</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Reviews */}
        <GoogleReviews />

        {/* Brands */}
        <BrandsMarquee />

        {/* Service Center */}
        <section style={{ background: "var(--surface)" }}><ServiceCenterCard /></section>

        {/* ── CTA band ────────────────────────────────────────── */}
        <section style={{ background: "var(--accent)", padding: "88px 0", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.06) 1px,transparent 1px)", backgroundSize: "48px 48px", pointerEvents: "none" }} />
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "65%", height: "240%", background: "radial-gradient(ellipse, rgba(255,255,255,.1) 0%, transparent 58%)", pointerEvents: "none" }} />
          <div className="tt-wrap" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
            <motion.div {...fadeUp(0)}>
              <span className="tt-mono" style={{ fontSize: ".65rem", letterSpacing: ".2em", color: "rgba(255,255,255,.6)", marginBottom: 14, textTransform: "uppercase", display: "block" }}>Same-Day Service Available</span>
              <h2 className="tt-serif" style={{ fontSize: "clamp(1.9rem,4.6vw,3.1rem)", color: "#fff", marginBottom: 16, lineHeight: 1.1 }}>Ready to Fix Your Appliance?</h2>
              <p style={{ fontSize: ".95rem", color: "rgba(255,255,255,.76)", maxWidth: 420, margin: "0 auto 36px", lineHeight: 1.78 }}>
                Free diagnosis. Technician arrives same day across Peddapalli &amp; Mancherial.
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

export default Index;