import { Link } from "react-router-dom";
import { Tv, MapPin, Phone, Mail, Clock, ExternalLink, ChevronRight } from "lucide-react";
import { useDarkMode } from "@/components/Header";

const Footer = () => {
  const { dark } = useDarkMode();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&family=DM+Mono:wght@400;500&display=swap');

        .tt-footer {
          font-family: 'DM Sans', system-ui, sans-serif;
          -webkit-font-smoothing: antialiased;
        }

        /* ── Always-dark footer (light mode) ── */
        .tt-footer[data-theme="light"] {
          --footer-bg:        #0D1526;
          --footer-surface:   #162038;
          --footer-border:    rgba(255,255,255,.07);
          --footer-tx1:       #F1F5FB;
          --footer-tx2:       #8A9BB4;
          --footer-tx3:       #3E4F6A;
          --footer-accent:    #4A9BFF;
          --footer-accent-lt: rgba(74,155,255,.11);
          --footer-accent-bd: rgba(74,155,255,.24);
          --footer-grid-c:    rgba(74,155,255,.04);
        }

        /* ── Deeper dark footer (dark mode) ── */
        .tt-footer[data-theme="dark"] {
          --footer-bg:        #07090F;
          --footer-surface:   #0E1220;
          --footer-border:    rgba(255,255,255,.06);
          --footer-tx1:       #ECF2FC;
          --footer-tx2:       #6E7E96;
          --footer-tx3:       #2E3A50;
          --footer-accent:    #4A9BFF;
          --footer-accent-lt: rgba(74,155,255,.09);
          --footer-accent-bd: rgba(74,155,255,.2);
          --footer-grid-c:    rgba(74,155,255,.032);
        }

        /* ── Grid texture ── */
        .tt-footer-grid {
          background-image:
            linear-gradient(var(--footer-grid-c) 1px, transparent 1px),
            linear-gradient(90deg, var(--footer-grid-c) 1px, transparent 1px);
          background-size: 48px 48px;
        }

        /* ── Nav links ── */
        .tt-footer-link {
          display: flex; align-items: center; gap: 6px;
          font-size: .84rem; color: var(--footer-tx2);
          text-decoration: none; transition: color .2s;
        }
        .tt-footer-link svg {
          opacity: 0; transition: opacity .2s, transform .2s;
          transform: translateX(-4px); flex-shrink: 0;
        }
        .tt-footer-link:hover { color: var(--footer-accent); }
        .tt-footer-link:hover svg { opacity: 1; transform: translateX(0); }

        /* ── Contact rows ── */
        .tt-footer-contact {
          display: flex; align-items: flex-start; gap: 11px;
          font-size: .84rem; color: var(--footer-tx2);
          text-decoration: none; line-height: 1.55;
          transition: color .2s;
        }
        .tt-footer-contact:hover { color: var(--footer-tx1); }

        /* ── Icon badge ── */
        .tt-footer-ib {
          width: 30px; height: 30px; border-radius: 7px;
          background: var(--footer-accent-lt);
          border: 1px solid var(--footer-accent-bd);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; margin-top: 1px;
        }

        /* ── Brand box ── */
        .tt-footer-brand-box {
          width: 42px; height: 42px; border-radius: 10px;
          background: var(--footer-accent-lt);
          border: 1px solid var(--footer-accent-bd);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          transition: background .2s, border-color .2s;
        }

        /* ── Labels & headings ── */
        .tt-footer-label {
          font-family: 'DM Mono', monospace;
          font-size: .63rem; letter-spacing: .17em;
          text-transform: uppercase; color: var(--footer-accent);
          margin-bottom: 12px; display: block;
        }
        .tt-footer-heading {
          font-size: .88rem; font-weight: 600;
          color: var(--footer-tx1); margin-bottom: 16px;
        }

        /* ── Divider ── */
        .tt-footer-hr { height: 1px; background: var(--footer-border); }

        /* ── Maps link ── */
        .tt-footer-maps {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: .81rem; font-weight: 600;
          color: var(--footer-accent); text-decoration: none;
          transition: opacity .2s;
        }
        .tt-footer-maps:hover { opacity: .75; }

        /* ── Bottom text ── */
        .tt-footer-btm {
          font-size: .77rem; color: var(--footer-tx3);
          text-decoration: none; transition: color .2s;
        }
        .tt-footer-btm:hover { color: var(--footer-accent); }

        /* ── Responsive columns ── */
        .tt-footer-cols {
          display: grid;
          grid-template-columns: 1.4fr 0.8fr 1.1fr 1fr;
          gap: 48px;
        }
        @media(max-width:1000px){
          .tt-footer-cols { grid-template-columns: 1fr 1fr; gap: 36px; }
        }
        @media(max-width:560px){
          .tt-footer-cols { grid-template-columns: 1fr; gap: 28px; }
        }

        /* ── Area tag chips ── */
        .tt-footer-chip {
          font-family: 'DM Mono', monospace;
          font-size: .7rem; padding: 4px 10px; border-radius: 6px;
          background: var(--footer-accent-lt);
          border: 1px solid var(--footer-accent-bd);
          color: var(--footer-tx2);
          white-space: nowrap;
        }

        /* ── Hours pill ── */
        .tt-footer-hours {
          display: inline-flex; align-items: center; gap: 8px;
          background: var(--footer-accent-lt);
          border: 1px solid var(--footer-accent-bd);
          border-radius: 999px; padding: 6px 14px;
        }

        @keyframes ttFPulse { 0%,100%{opacity:1} 50%{opacity:.35} }
        .tt-footer-dot { animation: ttFPulse 2s ease-in-out infinite; }
      `}</style>

      <footer
        className="tt-footer tt-footer-grid"
        data-theme={dark ? "dark" : "light"}
        style={{ background: "var(--footer-bg)", position: "relative", overflow: "hidden" }}
      >
        {/* Radial glow */}
        <div style={{
          position: "absolute", top: "-20%", right: "-5%",
          width: "40%", height: "160%",
          background: "radial-gradient(ellipse, rgba(74,155,255,.055) 0%, transparent 65%)",
          pointerEvents: "none",
        }} />

        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "72px 24px 0", position: "relative", zIndex: 1 }}>

          {/* ── Columns ─────────────────────────────────────── */}
          <div className="tt-footer-cols" style={{ marginBottom: 52 }}>

            {/* ① Brand */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                  <img src="logo.png" className="tt-hdr-logo-img rounded-xl" alt="Vasu Electronics" />
              </div>

              <p style={{ fontSize: ".83rem", lineHeight: 1.76, color: "var(--footer-tx2)", marginBottom: 20, maxWidth: 280 }}>
                Your trusted authorised multi-brand service center with 10+ years of experience.
                Expert repair for TVs, home theaters, ACs, washing machines &amp; refrigerators
                across Peddapalli &amp; Mancherial districts.
              </p>

              <div className="tt-footer-hours">
                <span className="tt-footer-dot" style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ADE80", display: "inline-block", flexShrink: 0 }} />
                <span style={{ fontFamily: "'DM Mono',monospace", fontSize: ".63rem", letterSpacing: ".1em", color: "var(--footer-tx2)" }}>
                  MON – SAT &nbsp; 9 AM – 7 PM
                </span>
              </div>
            </div>

            {/* ② Quick Links */}
            <div>
              <span className="tt-footer-label">Navigation</span>
              <div className="tt-footer-heading">Quick Links</div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  { label: "Home",       path: "/" },
                  { label: "About Us",   path: "/about" },
                  { label: "Services",   path: "/services" },
                  { label: "Contact Us", path: "/contact" },
                ].map((link) => (
                  <li key={link.path}>
                    <Link to={link.path} className="tt-footer-link">
                      <ChevronRight size={12} />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* ③ Contact */}
            <div>
              <span className="tt-footer-label">Get in touch</span>
              <div className="tt-footer-heading">Contact Info</div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 13 }}>
                <li>
                  <div className="tt-footer-contact">
                    <div className="tt-footer-ib"><MapPin size={13} style={{ color: "var(--footer-accent)" }} /></div>
                    <span>Peddapalli &amp; Mancherial Districts,<br />Telangana, India</span>
                  </div>
                </li>
                <li>
                  <a href="tel:+919912172878" className="tt-footer-contact">
                    <div className="tt-footer-ib"><Phone size={13} style={{ color: "var(--footer-accent)" }} /></div>
                    +91 99121 72878
                  </a>
                </li>
                <li>
                  <a href="mailto:info@technotv.in" className="tt-footer-contact">
                    <div className="tt-footer-ib"><Mail size={13} style={{ color: "var(--footer-accent)" }} /></div>
                    info@technotv.in
                  </a>
                </li>
                <li>
                  <div className="tt-footer-contact">
                    <div className="tt-footer-ib"><Clock size={13} style={{ color: "var(--footer-accent)" }} /></div>
                    Mon – Sat: 9:00 AM – 7:00 PM
                  </div>
                </li>
              </ul>
            </div>

            {/* ④ Service Area */}
            <div>
              <span className="tt-footer-label">Coverage</span>
              <div className="tt-footer-heading">Service Area</div>
              <p style={{ fontSize: ".83rem", lineHeight: 1.76, color: "var(--footer-tx2)", marginBottom: 16 }}>
                Doorstep service across Peddapalli &amp; Mancherial districts including
                Ramagundam, Sultanabad, Godavarikhani &amp; surrounding areas.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 18 }}>
                {["Peddapalli", "Mancherial", "Ramagundam", "Sultanabad", "Godavarikhani"].map((area) => (
                  <span key={area} className="tt-footer-chip">{area}</span>
                ))}
              </div>
              <a
                href="https://www.google.com/maps/dir//Peddapalli,+Telangana"
                target="_blank" rel="noopener noreferrer"
                className="tt-footer-maps"
              >
                <ExternalLink size={12} /> View on Google Maps
              </a>
            </div>
          </div>

          {/* ── Divider ─────────────────────────────────────── */}
          <div className="tt-footer-hr" />

          {/* ── Bottom bar ──────────────────────────────────── */}
          <div style={{
            padding: "20px 0",
            display: "flex", alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap", gap: 12,
          }}>
            <span className="tt-footer-btm" style={{ color: "var(--footer-tx3)", cursor: "default" }}>
              © {new Date().getFullYear()} VASU Electronics &amp; Home Theater Service Center. All rights reserved.
            </span>
            <div style={{ display: "flex", gap: 20 }}>
              {["Privacy Policy", "Terms of Service"].map((t) => (
                <a key={t} href="#" className="tt-footer-btm">{t}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;