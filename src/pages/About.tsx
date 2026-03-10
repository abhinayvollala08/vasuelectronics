import { motion } from "framer-motion";
import { Users, Target, CheckCircle, Award, MapPin, ShieldCheck, Clock, Wrench } from "lucide-react";
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
const stats = [
  { value: "10+",  label: "Years Experience" },
  { value: "15K+", label: "Happy Customers" },
  { value: "15+",  label: "Brands Serviced" },
  { value: "98%",  label: "Satisfaction Rate" },
];

const values = [
  { Icon: Users,       title: "Customer First",    desc: "Every repair is handled with care, ensuring complete customer satisfaction from start to finish." },
  { Icon: Target,      title: "Precision & Quality", desc: "We use advanced diagnostic tools and genuine OEM spare parts for every single repair." },
  { Icon: CheckCircle, title: "Transparency",       desc: "Clear pricing with no hidden charges. We explain every issue and quote before work begins." },
  { Icon: Award,       title: "Certified Experts",  desc: "Our technicians are factory-trained and certified by leading international brands." },
];

const milestones = [
  { year: "2014", title: "Founded in Peddapalli", desc: "Started as a single TV repair workshop with a vision for honest, community-first service." },
  { year: "2017", title: "Multi-Brand Authorization", desc: "Earned authorized service center status for five leading electronics brands." },
  { year: "2020", title: "Mancherial Expansion", desc: "Extended full doorstep service coverage to the entire Mancherial district." },
  { year: "2024", title: "15+ Brands & 5,000+ Repairs", desc: "A decade of trust — now covering ACs, washing machines, refrigerators & home theatres." },
];

/* ════════════════════════════════════════════════════════════════ */
const About = () => {
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
        .tt-sec-sm { padding:72px 0; }
        @media(max-width:768px){
          .tt-sec    { padding:68px 0; }
          .tt-sec-sm { padding:52px 0; }
        }

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

        .tt-g2 { display:grid; grid-template-columns:repeat(2,1fr); gap:16px; }
        .tt-g4 { display:grid; grid-template-columns:repeat(4,1fr); gap:16px; }
        @media(max-width:900px){ .tt-g4{ grid-template-columns:repeat(2,1fr); } }
        @media(max-width:540px){ .tt-g2{ grid-template-columns:1fr; } .tt-g4{ grid-template-columns:1fr; } }

        .tt-accent-surface { background:var(--accent-lt); border:1px solid var(--accent-bd); border-radius:12px; }

        /* ─── About-specific ──────────────────────────────────── */
        .tt-about-hero-grid {
          display:grid; grid-template-columns:1.1fr 0.9fr;
          gap:64px; align-items:center;
          padding:100px 0 72px;
        }
        @media(max-width:860px){
          .tt-about-hero-grid { grid-template-columns:1fr; gap:40px; padding:72px 0 48px; text-align:center; }
          .tt-hero-pill,.tt-hero-trust { justify-content:center!important; }
          .tt-hero-pill { margin:0 auto!important; }
          .tt-hero-rule { margin:0 auto 20px!important; }
        }

        .tt-timeline-line {
          position:absolute; left:17px; top:0; bottom:0;
          width:2px; background:var(--border);
        }
        .tt-timeline-dot {
          width:36px; height:36px; border-radius:50%;
          background:var(--accent-lt); border:2px solid var(--accent-bd);
          display:flex; align-items:center; justify-content:center;
          flex-shrink:0; position:relative; z-index:1;
        }

        .tt-pill {
          display:inline-flex; align-items:center; gap:6px;
          background:var(--ok-bg); color:var(--ok);
          font-size:.7rem; font-weight:600; letter-spacing:.04em;
          padding:5px 11px; border-radius:999px;
        }
        @keyframes ttPls { 0%,100%{opacity:1} 50%{opacity:.3} }
        .tt-pls { animation:ttPls 1.8s ease-in-out infinite; }
      `}</style>

      <div className="tt" data-theme={dark ? "dark" : "light"}>

        {/* ══════════════════════════════════════════════════════
            HERO
        ══════════════════════════════════════════════════════ */}
        <section style={{ background: "var(--bg)", position: "relative", overflow: "hidden" }}>
          <div className="tt-grid" style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />
          <div style={{ position: "absolute", top: "-10%", right: "-8%", width: "clamp(300px,44vw,560px)", height: "clamp(300px,44vw,560px)", borderRadius: "50%", background: "radial-gradient(circle, var(--blob1) 0%, transparent 68%)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: "-8%", left: "-6%", width: "clamp(160px,22vw,300px)", height: "clamp(160px,22vw,300px)", borderRadius: "50%", background: "radial-gradient(circle, var(--blob2) 0%, transparent 68%)", pointerEvents: "none" }} />

          <div className="tt-wrap" style={{ position: "relative", zIndex: 1 }}>
            <div className="tt-about-hero-grid">

              {/* Left */}
              <motion.div {...fadeUp(0)}>
                <div className="tt-pill tt-hero-pill" style={{ marginBottom: 22, width: "fit-content" }}>
                  <span className="tt-pls" style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--ok)", display: "inline-block", flexShrink: 0 }} />
                  Serving Since 2014
                </div>
                <h1 className="tt-serif" style={{ fontSize: "clamp(2.4rem,5vw,3.7rem)", lineHeight: 1.08, color: "var(--tx1)", marginBottom: 18 }}>
                  A Decade of<br />
                  <em style={{ color: "var(--accent)", fontStyle: "italic" }}>Trusted</em><br />
                  Appliance Repairs
                </h1>
                <div className="tt-hero-rule" style={{ width: 52, height: 3, borderRadius: 2, background: "var(--accent)", marginBottom: 20, opacity: .7 }} />
                <p style={{ fontSize: ".97rem", lineHeight: 1.82, color: "var(--tx2)", maxWidth: 460 }}>
                  TechnoTV Electronics &amp; Home Theater Service Center — the authorised multi-brand repair facility
                  trusted by thousands of homes across{" "}
                  <strong style={{ color: "var(--tx1)", fontWeight: 600 }}>Peddapalli &amp; Mancherial</strong>{" "}
                  districts.
                </p>
              </motion.div>

              {/* Right — quick stats */}
              <motion.div {...fadeUp(0.13)}>
                <div className="tt-card tt-dots" style={{ padding: 10 }}>
                  <div className="tt-g2" style={{ marginBottom: 10 }}>
                    {stats.map((s, i) => (
                      <motion.div key={i} {...fadeUp(0.1 + i * 0.07)} style={{
                        padding: "22px 14px", textAlign: "center", borderRadius: 10,
                        background: i % 2 === 0 ? "var(--surface)" : "var(--subtle)",
                        border: "1px solid var(--border)",
                      }}>
                        <div className="tt-serif" style={{ fontSize: "clamp(1.6rem,3vw,2.2rem)", color: "var(--accent)", lineHeight: 1 }}>{s.value}</div>
                        <div className="tt-mono" style={{ fontSize: ".62rem", color: "var(--tx3)", marginTop: 7, letterSpacing: ".13em", textTransform: "uppercase" }}>{s.label}</div>
                      </motion.div>
                    ))}
                  </div>
                  <div className="tt-accent-surface" style={{ padding: "14px 16px", display: "flex", alignItems: "center", gap: 10 }}>
                    <ShieldCheck size={18} style={{ color: "var(--accent)", flexShrink: 0 }} />
                    <div>
                      <div style={{ fontSize: ".82rem", fontWeight: 600, color: "var(--tx1)" }}>Warranty on Every Repair</div>
                      <div style={{ fontSize: ".73rem", color: "var(--tx3)", marginTop: 1 }}>Written post-service guarantee on all jobs</div>
                    </div>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            OUR STORY
        ══════════════════════════════════════════════════════ */}
        <section className="tt-sec" style={{ background: "var(--surface)", position: "relative", overflow: "hidden" }}>
          <div className="tt-grid" style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />
          <div className="tt-wrap" style={{ position: "relative", zIndex: 1 }}>

            <motion.div {...fadeUp(0)} style={{ maxWidth: 680, marginBottom: 56 }}>
              <span className="tt-lbl">Our Story</span>
              <h2 className="tt-serif" style={{ fontSize: "clamp(1.7rem,3.6vw,2.5rem)", color: "var(--tx1)", lineHeight: 1.15, marginBottom: 20 }}>
                Built on Trust &amp; Expertise
              </h2>
              <p style={{ fontSize: ".93rem", lineHeight: 1.82, color: "var(--tx2)", marginBottom: 14 }}>
                Founded in 2014, TechnoTV started as a small TV repair shop in Peddapalli with a simple vision:
                to provide honest, reliable, and affordable electronics repair services to our community.
              </p>
              <p style={{ fontSize: ".9rem", lineHeight: 1.82, color: "var(--tx3)" }}>
                Over the years, we expanded our expertise to cover LED &amp; LCD TVs, home theatre systems, air conditioners,
                washing machines, and refrigerators. Our commitment to quality earned us authorised service center
                status for over 15 leading brands — and the loyalty of thousands of families across two districts.
              </p>
            </motion.div>

            {/* Timeline */}
            <div style={{ position: "relative", paddingLeft: 56 }}>
              <div className="tt-timeline-line" />
              <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
                {milestones.map((m, i) => (
                  <motion.div key={i} {...fadeUp(i * 0.09)} style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
                    <div className="tt-timeline-dot" style={{ position: "absolute", left: 0 }}>
                      <span className="tt-mono" style={{ fontSize: ".55rem", color: "var(--accent)", fontWeight: 600, letterSpacing: ".05em" }}>{m.year.slice(2)}</span>
                    </div>
                    <div className="tt-card tt-card-hover" style={{ padding: "18px 20px", flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                        <span className="tt-mono" style={{ fontSize: ".65rem", color: "var(--accent)", letterSpacing: ".12em" }}>{m.year}</span>
                        <span style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--border-str)", display: "inline-block" }} />
                        <span style={{ fontWeight: 600, fontSize: ".9rem", color: "var(--tx1)" }}>{m.title}</span>
                      </div>
                      <p style={{ fontSize: ".82rem", color: "var(--tx3)", lineHeight: 1.65, margin: 0 }}>{m.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="tt-wrap"><div className="tt-divider" /></div>

        {/* ══════════════════════════════════════════════════════
            VALUES
        ══════════════════════════════════════════════════════ */}
        <section className="tt-sec" style={{ background: "var(--bg)" }}>
          <div className="tt-wrap">
            <motion.div {...fadeUp(0)} style={{ marginBottom: 44 }}>
              <span className="tt-lbl">Our Values</span>
              <h2 className="tt-serif" style={{ fontSize: "clamp(1.7rem,3.6vw,2.5rem)", color: "var(--tx1)", lineHeight: 1.15 }}>
                What Drives Us
              </h2>
            </motion.div>

            <div className="tt-g2">
              {values.map((v, i) => (
                <motion.div key={i} {...fadeUp(i * 0.08)} className="tt-card tt-card-hover" style={{ padding: "26px 24px", display: "flex", gap: 16, alignItems: "flex-start" }}>
                  <div className="tt-dots" style={{ position: "absolute", inset: 0, borderRadius: "inherit", pointerEvents: "none", opacity: .5 }} />
                  <div className="tt-ib" style={{ flexShrink: 0, position: "relative", zIndex: 1 }}>
                    <v.Icon size={19} style={{ color: "var(--accent)" }} />
                  </div>
                  <div style={{ position: "relative", zIndex: 1 }}>
                    <h3 style={{ fontWeight: 600, fontSize: ".95rem", color: "var(--tx1)", marginBottom: 7, lineHeight: 1.3 }}>{v.title}</h3>
                    <p style={{ fontSize: ".83rem", lineHeight: 1.7, color: "var(--tx3)", margin: 0 }}>{v.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <div className="tt-wrap"><div className="tt-divider" /></div>

        {/* ══════════════════════════════════════════════════════
            WHY CHOOSE US
        ══════════════════════════════════════════════════════ */}
        <section className="tt-sec" style={{ background: "var(--surface)", position: "relative", overflow: "hidden" }}>
          <div className="tt-dots" style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: .6 }} />
          <div className="tt-wrap" style={{ position: "relative", zIndex: 1 }}>

            <motion.div {...fadeUp(0)} style={{ textAlign: "center", marginBottom: 52 }}>
              <span className="tt-lbl">Why TechnoTV</span>
              <h2 className="tt-serif" style={{ fontSize: "clamp(1.7rem,3.6vw,2.5rem)", color: "var(--tx1)", lineHeight: 1.15 }}>
                Your Appliances. Our Responsibility.
              </h2>
            </motion.div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
              {[
                { Icon: ShieldCheck, title: "Genuine Parts Only",    desc: "OEM-certified components — no cheap substitutes, ever." },
                { Icon: Clock,       title: "Same-Day Response",     desc: "Call before noon; our technician arrives the same day." },
                { Icon: Wrench,      title: "Certified Technicians", desc: "Factory-trained, brand-authorized engineers on every job." },
                { Icon: MapPin,      title: "Doorstep Service",      desc: "Peddapalli & Mancherial districts — we come to you." },
              ].map((item, i) => (
                <motion.div key={i} {...fadeUp(i * 0.07)} className="tt-card tt-card-hover" style={{ padding: "26px 22px", textAlign: "center" }}>
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: "var(--accent-lt)", border: "1px solid var(--accent-bd)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                    <item.Icon size={20} style={{ color: "var(--accent)" }} />
                  </div>
                  <h4 style={{ fontWeight: 600, fontSize: ".93rem", color: "var(--tx1)", marginBottom: 8 }}>{item.title}</h4>
                  <p style={{ fontSize: ".81rem", color: "var(--tx3)", lineHeight: 1.65, margin: 0 }}>{item.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Warranty banner */}
            <motion.div {...fadeUp(0.2)} style={{ marginTop: 32, padding: "24px 28px", borderRadius: 14, background: "var(--accent-lt)", border: "1px solid var(--accent-bd)", display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap" }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 4px 14px rgba(26,95,191,.3)" }}>
                <ShieldCheck size={22} style={{ color: "#fff" }} />
              </div>
              <div style={{ flex: 1, minWidth: 200 }}>
                <div style={{ fontWeight: 700, fontSize: ".95rem", color: "var(--tx1)", marginBottom: 4 }}>Warranty on Every Repair</div>
                <div style={{ fontSize: ".82rem", color: "var(--tx3)", lineHeight: 1.6 }}>
                  All repairs backed by a written post-service warranty. Genuine parts with serial-number traceability. Your peace of mind is guaranteed.
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {["Transparent pricing", "Post-repair warranty", "Genuine spare parts"].map((t, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 7, fontSize: ".8rem", color: "var(--tx2)" }}>
                    <CheckCircle size={13} style={{ color: "var(--accent)", flexShrink: 0 }} /> {t}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

      </div>
    </Layout>
  );
};

export default About;
