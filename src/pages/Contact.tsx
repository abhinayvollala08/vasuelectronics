import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import { useState } from "react";
import type { MotionProps } from "framer-motion";

import { useDarkMode } from "@/components/Header";

/* ─── animation helpers ─────────────────────────────────────────── */
const fadeUp = (delay = 0): MotionProps => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0, transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] } },
  viewport: { once: true, margin: "-40px" },
});

/* ─── data ──────────────────────────────────────────────────────── */
const contactInfo = [
  { Icon: MapPin, label: "Visit Us",       value: "Peddapalli & Mancherial Districts, Telangana, India", href: undefined },
  { Icon: Phone,  label: "Call Us",        value: "+91 98765 43210",  href: "tel:+919876543210" },
  { Icon: Mail,   label: "Email Us",       value: "info@technotv.in", href: "mailto:info@technotv.in" },
  { Icon: Clock,  label: "Working Hours",  value: "Mon – Sat: 9:00 AM – 7:00 PM", href: undefined },
];

const serviceOptions = [
  "LED / LCD / Smart TV Repair",
  "AC Service & Repair",
  "Washing Machine Repair",
  "Refrigerator Service",
  "Home Theatre Installation",
  "Set-Top Box / DTH",
  "AMC Contract",
  "Other",
];

/* ════════════════════════════════════════════════════════════════ */
const Contact = () => {
  const { dark } = useDarkMode();
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", service: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", phone: "", email: "", service: "", message: "" });
    }, 4000);
  };

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
          --input-bg:   #FFFFFF;
          --input-bd:   #D9E1EE;
          --input-bd-f: #1A5FBF;
          --input-ph:   #9BAABF;
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
          --input-bg:   #0E1320;
          --input-bd:   #1F2738;
          --input-bd-f: #4A9BFF;
          --input-ph:   #435060;
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
        .tt-sec { padding:96px 0; }
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

        /* ─── Hero ───────────────────────────────────────────── */
        .tt-contact-hero {
          display:grid; grid-template-columns:1.1fr 0.9fr;
          gap:64px; align-items:center; padding:100px 0 72px;
        }
        @media(max-width:860px){
          .tt-contact-hero { grid-template-columns:1fr; gap:36px; padding:72px 0 48px; text-align:center; }
          .tt-hero-pill { margin:0 auto!important; }
          .tt-hero-rule { margin:0 auto 20px!important; }
          .tt-hero-ctas { justify-content:center!important; }
        }

        /* ─── Main layout ────────────────────────────────────── */
        .tt-contact-grid {
          display:grid; grid-template-columns:1fr 1.15fr; gap:44px; align-items:start;
        }
        @media(max-width:900px){ .tt-contact-grid{ grid-template-columns:1fr; } }

        /* ─── Form inputs ────────────────────────────────────── */
        .tt-input {
          width:100%; background:var(--input-bg); border:1.5px solid var(--input-bd);
          border-radius:9px; padding:11px 14px;
          font-family:'DM Sans',sans-serif; font-size:.88rem; color:var(--tx1);
          outline:none; transition:border-color .2s, box-shadow .2s;
          appearance:none;
        }
        .tt-input::placeholder { color:var(--input-ph); }
        .tt-input:focus { border-color:var(--input-bd-f); box-shadow:0 0 0 3px rgba(26,95,191,.12); }
        .tt-textarea { resize:vertical; min-height:110px; }
        .tt-select { background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%239BAABF' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E"); background-repeat:no-repeat; background-position:right 14px center; padding-right:36px; cursor:pointer; }
        .tt-label { font-size:.8rem; font-weight:600; color:var(--tx2); display:block; margin-bottom:6px; letter-spacing:.01em; }

        /* ─── Submit button ──────────────────────────────────── */
        .tt-submit {
          width:100%; display:flex; align-items:center; justify-content:center; gap:8px;
          background:var(--accent); color:#fff;
          font-family:'DM Sans',sans-serif; font-weight:700; font-size:.92rem;
          padding:14px; border-radius:10px; border:none; cursor:pointer;
          box-shadow:0 4px 16px rgba(26,95,191,.28);
          transition:background .2s, transform .2s, box-shadow .2s;
        }
        .tt-submit:hover { background:var(--accent-h); transform:translateY(-1px); box-shadow:0 7px 22px rgba(26,95,191,.36); }
        .tt-submit:disabled { opacity:.6; cursor:not-allowed; transform:none; }

        /* ─── Success state ──────────────────────────────────── */
        @keyframes ttFadeIn { from{opacity:0;transform:scale(.96)} to{opacity:1;transform:scale(1)} }
        .tt-success { animation:ttFadeIn .4s ease; }
      `}</style>

      <div className="tt" data-theme={dark ? "dark" : "light"}>

        {/* ══════════════════════════════════════════════════════
            HERO
        ══════════════════════════════════════════════════════ */}
        <section style={{ background: "var(--bg)", position: "relative", overflow: "hidden" }}>
          <div className="tt-grid" style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />
          <div style={{ position: "absolute", top: "-10%", right: "-8%", width: "clamp(280px,42vw,520px)", height: "clamp(280px,42vw,520px)", borderRadius: "50%", background: "radial-gradient(circle, var(--blob1) 0%, transparent 68%)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: "-8%", left: "-6%", width: "clamp(160px,22vw,300px)", height: "clamp(160px,22vw,300px)", borderRadius: "50%", background: "radial-gradient(circle, var(--blob2) 0%, transparent 68%)", pointerEvents: "none" }} />

          <div className="tt-wrap" style={{ position: "relative", zIndex: 1 }}>
            <div className="tt-contact-hero">

              {/* Left */}
              <motion.div {...fadeUp(0)}>
                <div className="tt-pill tt-hero-pill" style={{ marginBottom: 22, width: "fit-content" }}>
                  <span className="tt-pls" style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--ok)", display: "inline-block", flexShrink: 0 }} />
                  Free Diagnosis — No Obligation
                </div>
                <h1 className="tt-serif" style={{ fontSize: "clamp(2.4rem,5vw,3.7rem)", lineHeight: 1.08, color: "var(--tx1)", marginBottom: 18 }}>
                  Get In<br />
                  <em style={{ color: "var(--accent)", fontStyle: "italic" }}>Touch</em><br />
                  With Us
                </h1>
                <div className="tt-hero-rule" style={{ width: 52, height: 3, borderRadius: 2, background: "var(--accent)", marginBottom: 20, opacity: .7 }} />
                <p style={{ fontSize: ".97rem", lineHeight: 1.82, color: "var(--tx2)", marginBottom: 32, maxWidth: 440 }}>
                  Have an electronics issue? Reach out for a free consultation and diagnosis.
                  Our technicians serve all of{" "}
                  <strong style={{ color: "var(--tx1)", fontWeight: 600 }}>Peddapalli &amp; Mancherial</strong> — same-day response available.
                </p>
                <div className="tt-hero-ctas" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  <a href="tel:+919876543210" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "var(--accent)", color: "#fff", fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: ".88rem", padding: "13px 26px", borderRadius: 10, textDecoration: "none", boxShadow: "0 4px 16px rgba(26,95,191,.28)", whiteSpace: "nowrap" }}>
                    <Phone size={15} /> +91 98765 43210
                  </a>
                  <a href="mailto:info@technotv.in" style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "transparent", color: "var(--accent)", fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: ".88rem", padding: "12px 22px", borderRadius: 10, textDecoration: "none", border: "1.5px solid var(--accent-bd)", whiteSpace: "nowrap" }}>
                    <Mail size={14} /> Email Us <ArrowRight size={13} />
                  </a>
                </div>
              </motion.div>

              {/* Right — contact info cards */}
              <motion.div {...fadeUp(0.13)}>
                <div className="tt-card tt-dots" style={{ padding: 12 }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {contactInfo.map((item, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", borderRadius: 10, background: i % 2 === 0 ? "var(--surface)" : "var(--subtle)", border: "1px solid var(--border)" }}>
                        <div className="tt-ib" style={{ flexShrink: 0 }}>
                          <item.Icon size={18} style={{ color: "var(--accent)" }} />
                        </div>
                        <div>
                          <div style={{ fontSize: ".72rem", fontFamily: "'DM Mono',monospace", letterSpacing: ".1em", textTransform: "uppercase", color: "var(--tx4)", marginBottom: 3 }}>{item.label}</div>
                          {item.href ? (
                            <a href={item.href} style={{ fontSize: ".88rem", fontWeight: 500, color: "var(--accent)", textDecoration: "none" }}>{item.value}</a>
                          ) : (
                            <span style={{ fontSize: ".88rem", fontWeight: 500, color: "var(--tx1)" }}>{item.value}</span>
                          )}
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
            CONTACT SECTION
        ══════════════════════════════════════════════════════ */}
        <section className="tt-sec" style={{ background: "var(--surface)", position: "relative", overflow: "hidden" }}>
          <div className="tt-grid" style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />
          <div className="tt-wrap" style={{ position: "relative", zIndex: 1 }}>
            <div className="tt-contact-grid">

              {/* ── Left: map + info ─────────────────────────── */}
              <motion.div {...fadeUp(0)} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <div>
                  <span className="tt-lbl">Reach Out</span>
                  <h2 className="tt-serif" style={{ fontSize: "clamp(1.6rem,3.2vw,2.2rem)", color: "var(--tx1)", lineHeight: 1.18, marginBottom: 10 }}>
                    Contact Information
                  </h2>
                  <p style={{ fontSize: ".88rem", color: "var(--tx3)", lineHeight: 1.72 }}>
                    We'd love to hear from you. Here's how you can reach us — or drop a message using the form.
                  </p>
                </div>

                {/* Info list */}
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {contactInfo.map((item, i) => (
                    <motion.div key={i} {...fadeUp(0.06 + i * 0.06)} className="tt-card tt-card-hover" style={{ padding: "16px 18px", display: "flex", gap: 14, alignItems: "center" }}>
                      <div className="tt-ib"><item.Icon size={18} style={{ color: "var(--accent)" }} /></div>
                      <div>
                        <div style={{ fontSize: ".75rem", fontFamily: "'DM Mono',monospace", letterSpacing: ".1em", textTransform: "uppercase", color: "var(--tx4)", marginBottom: 3 }}>{item.label}</div>
                        {item.href ? (
                          <a href={item.href} style={{ fontSize: ".9rem", fontWeight: 600, color: "var(--accent)", textDecoration: "none" }}>{item.value}</a>
                        ) : (
                          <span style={{ fontSize: ".9rem", fontWeight: 600, color: "var(--tx1)" }}>{item.value}</span>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Map */}
                <motion.div {...fadeUp(0.3)} className="tt-card" style={{ overflow: "hidden", height: 240, padding: 0 }}>
                  <iframe
                    title="Location Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d121554.8076!2d79.32!3d18.62!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcce04cf79f4189%3A0x7b0c3c91f5a4c057!2sPeddapalli%2C%20Telangana!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0, display: "block" }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </motion.div>
              </motion.div>

              {/* ── Right: form ──────────────────────────────── */}
              <motion.div {...fadeUp(0.13)}>
                <div className="tt-card" style={{ padding: "36px 32px" }}>
                  <div className="tt-dots" style={{ position: "absolute", inset: 0, borderRadius: "inherit", pointerEvents: "none", opacity: .5 }} />
                  <div style={{ position: "relative", zIndex: 1 }}>

                    {submitted ? (
                      <div className="tt-success" style={{ textAlign: "center", padding: "48px 0" }}>
                        <div style={{ width: 60, height: 60, borderRadius: "50%", background: "var(--ok-bg)", border: "2px solid var(--ok)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                          <CheckCircle size={28} style={{ color: "var(--ok)" }} />
                        </div>
                        <h3 className="tt-serif" style={{ fontSize: "1.5rem", color: "var(--tx1)", marginBottom: 10 }}>Message Sent!</h3>
                        <p style={{ fontSize: ".88rem", color: "var(--tx3)", lineHeight: 1.72 }}>
                          Thank you for reaching out. We'll get back to you within 24 hours.
                        </p>
                      </div>
                    ) : (
                      <>
                        <span className="tt-lbl">Send a Message</span>
                        <h3 className="tt-serif" style={{ fontSize: "clamp(1.4rem,2.8vw,1.9rem)", color: "var(--tx1)", marginBottom: 6, lineHeight: 1.2 }}>
                          Book a Service Call
                        </h3>
                        <p style={{ fontSize: ".84rem", color: "var(--tx3)", marginBottom: 28, lineHeight: 1.68 }}>
                          Fill out the form and we'll confirm your booking within 24 hours.
                        </p>

                        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                            <div>
                              <label className="tt-label">Full Name</label>
                              <input className="tt-input" placeholder="Your name" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                            </div>
                            <div>
                              <label className="tt-label">Phone Number</label>
                              <input className="tt-input" placeholder="+91 XXXXX XXXXX" required value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                            </div>
                          </div>

                          <div>
                            <label className="tt-label">Email Address <span style={{ color: "var(--tx4)", fontWeight: 400 }}>(optional)</span></label>
                            <input className="tt-input" type="email" placeholder="your@email.com" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                          </div>

                          <div>
                            <label className="tt-label">Service Needed</label>
                            <select className="tt-input tt-select" value={formData.service} onChange={e => setFormData({ ...formData, service: e.target.value })}>
                              <option value="">Select a service…</option>
                              {serviceOptions.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                          </div>

                          <div>
                            <label className="tt-label">Describe Your Issue</label>
                            <textarea className="tt-input tt-textarea" placeholder="Tell us what's wrong or what you need…" required value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} />
                          </div>

                          <button type="submit" className="tt-submit">
                            <Send size={15} /> Send Message
                          </button>

                          <div style={{ display: "flex", justifyContent: "center", gap: 20, flexWrap: "wrap", paddingTop: 4 }}>
                            {["Free Diagnosis", "No Hidden Charges", "Same-Day Response"].map((t, i) => (
                              <span key={i} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: ".75rem", color: "var(--tx3)" }}>
                                <CheckCircle size={11} style={{ color: "var(--accent)", flexShrink: 0 }} />{t}
                              </span>
                            ))}
                          </div>
                        </form>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

      </div>
    </Layout>
  );
};

export default Contact;