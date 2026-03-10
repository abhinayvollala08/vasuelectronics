import { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Tv, Phone, ChevronDown, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { label: "Home",       path: "/" },
  { label: "About Us",   path: "/about" },
  { label: "Services",   path: "/services" },
  { label: "Contact Us", path: "/contact" },
];

/* ─── Global theme helpers ──────────────────────────────────────────
   We keep theme state in localStorage + broadcast via a custom event
   so Header and Index (which owns the .tt wrapper) stay in sync.
──────────────────────────────────────────────────────────────────── */
const THEME_KEY  = "tt-theme";
const THEME_EVT  = "tt-theme-change";

const getStoredTheme = (): boolean => {
  try {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored !== null) return stored === "dark";
  } catch {}
  return false; // default: light mode
};

const broadcastTheme = (dark: boolean) => {
  try { localStorage.setItem(THEME_KEY, dark ? "dark" : "light"); } catch {}
  window.dispatchEvent(new CustomEvent(THEME_EVT, { detail: { dark } }));
};

/* ─── Hook: useDarkMode ─────────────────────────────────────────── */
export const useDarkMode = () => {
  const [dark, setDark] = useState<boolean>(getStoredTheme);

  /* Listen for changes broadcast by Header or Index */
  useEffect(() => {
    const fn = (e: Event) => setDark((e as CustomEvent).detail.dark);
    window.addEventListener(THEME_EVT, fn);
    return () => window.removeEventListener(THEME_EVT, fn);
  }, []);

  /* System preference intentionally not followed — light is the default. */

  const toggle = useCallback(() => {
    setDark(d => {
      broadcastTheme(!d);
      return !d;
    });
  }, []);

  return { dark, toggle };
};

/* ════════════════════════════════════════════════════════════════ */
const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled,   setScrolled]   = useState(false);
  const { dark, toggle }            = useDarkMode();
  const location                    = useLocation();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 18);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  return (
    <>
      <style>{`
        .tt-hdr {
          font-family: 'DM Sans', system-ui, sans-serif;
          -webkit-font-smoothing: antialiased;

          /* Light */
          --hdr-bg:         rgba(255,255,255,0.90);
          --hdr-border:     rgba(217,225,238,0.85);
          --hdr-tx1:        #0D1526;
          --hdr-tx2:        #475569;
          --hdr-tx3:        #94A3B8;
          --hdr-accent:     #1A5FBF;
          --hdr-accent-h:   #154FA3;
          --hdr-accent-lt:  #E8F1FD;
          --hdr-accent-bd:  #BADAFF;
          --hdr-active-bg:  #E8F1FD;
          --hdr-active-tx:  #1A5FBF;
          --hdr-hover-bg:   rgba(26,95,191,.06);
          --hdr-mob-bg:     #FFFFFF;
          --hdr-mob-bd:     #D9E1EE;
          --hdr-sh:         0 1px 0 rgba(13,21,38,.05), 0 3px 12px rgba(13,21,38,.04);
          --hdr-sh-sc:      0 2px 18px rgba(13,21,38,.10), 0 1px 0 rgba(13,21,38,.05);
          --hdr-sep:        rgba(217,225,238,0.8);

          /* Toggle */
          --tog-bg:         #F0F3F8;
          --tog-bg-h:       #E8F1FD;
          --tog-bd:         #D9E1EE;
          --tog-bd-h:       #BADAFF;
          --tog-icon:       #5E7191;
          --tog-icon-h:     #1A5FBF;
          --tog-sh:         0 1px 3px rgba(13,21,38,.08);
        }

        .tt-hdr[data-theme="dark"] {
          --hdr-bg:         rgba(12,14,23,0.90);
          --hdr-border:     rgba(31,39,56,0.85);
          --hdr-tx1:        #ECF2FC;
          --hdr-tx2:        #8A9BB4;
          --hdr-tx3:        #435060;
          --hdr-accent:     #4A9BFF;
          --hdr-accent-h:   #62AAFF;
          --hdr-accent-lt:  #0E1C30;
          --hdr-accent-bd:  #193150;
          --hdr-active-bg:  #0E1C30;
          --hdr-active-tx:  #4A9BFF;
          --hdr-hover-bg:   rgba(74,155,255,.07);
          --hdr-mob-bg:     #121622;
          --hdr-mob-bd:     #1F2738;
          --hdr-sh:         0 1px 0 rgba(0,0,0,.28), 0 3px 12px rgba(0,0,0,.18);
          --hdr-sh-sc:      0 2px 20px rgba(0,0,0,.40), 0 1px 0 rgba(0,0,0,.28);
          --hdr-sep:        rgba(31,39,56,0.8);

          --tog-bg:         #1A2030;
          --tog-bg-h:       #0E1C30;
          --tog-bd:         #1F2738;
          --tog-bd-h:       #193150;
          --tog-icon:       #8A9BB4;
          --tog-icon-h:     #4A9BFF;
          --tog-sh:         0 1px 3px rgba(0,0,0,.3);
        }

        /* ── Wrap ──────────────────────────────────────────────── */
        .tt-hdr-wrap {
          position: fixed; top: 0; left: 0; right: 0; z-index: 9000;
          background: var(--hdr-bg);
          border-bottom: 1px solid var(--hdr-border);
          backdrop-filter: blur(16px) saturate(160%);
          -webkit-backdrop-filter: blur(16px) saturate(160%);
          transition: box-shadow .3s ease, background .3s ease, border-color .3s ease;
        }
        .tt-hdr-wrap.scrolled { box-shadow: var(--hdr-sh-sc); }

        /* ── Inner ─────────────────────────────────────────────── */
        .tt-hdr-inner {
          max-width: 1180px; margin: 0 auto;
          padding: 0 24px;
          display: flex; align-items: center; justify-content: space-between;
          height: 64px;
          transition: height .28s ease;
          gap: 8px;
        }
        .tt-hdr-inner.scrolled { height: 56px; }
        @media(max-width:600px){ .tt-hdr-inner{ padding:0 16px; } }

        /* ── Logo ──────────────────────────────────────────────── */
        .tt-hdr-logo {
          display: flex; align-items: center; gap: 10px;
          text-decoration: none; flex-shrink: 0;
        }
        .tt-hdr-logo-box {
          width: 36px; height: 36px; border-radius: 9px;
          background: var(--hdr-accent-lt);
          border: 1px solid var(--hdr-accent-bd);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          transition: background .2s, border-color .2s, transform .22s;
        }
        .tt-hdr-logo:hover .tt-hdr-logo-box {
          background: var(--hdr-accent);
          border-color: var(--hdr-accent);
          transform: scale(1.06);
        }
        .tt-hdr-logo:hover .tt-hdr-logo-box .tt-logo-icon { color: #fff !important; }
        .tt-logo-icon { transition: color .2s; }

        .tt-hdr-logo-name {
          font-family: 'DM Serif Display', serif;
          font-size: 1.12rem; line-height: 1.1;
          color: var(--hdr-tx1);
          transition: color .25s;
        }
        .tt-hdr-logo-sub {
          font-family: 'DM Mono', monospace;
          font-size: .52rem; letter-spacing: .14em;
          text-transform: uppercase;
          color: var(--hdr-tx3); margin-top: 2px;
          transition: color .25s;
        }
        @media(max-width:420px){
          .tt-hdr-logo-name, .tt-hdr-logo-sub { display: none; }
        }

        /* ── Desktop nav ───────────────────────────────────────── */
        .tt-hdr-nav { display: flex; align-items: center; gap: 1px; }
        @media(max-width:820px){ .tt-hdr-nav { display: none; } }

        .tt-nav-link {
          font-size: .86rem; font-weight: 500;
          padding: 7px 13px; border-radius: 8px;
          text-decoration: none;
          color: var(--hdr-tx2);
          transition: color .18s, background .18s;
          position: relative; white-space: nowrap;
        }
        .tt-nav-link:hover { color: var(--hdr-tx1); background: var(--hdr-hover-bg); }
        .tt-nav-link.active {
          color: var(--hdr-active-tx); background: var(--hdr-active-bg);
          font-weight: 600;
        }
        .tt-nav-link.active::after {
          content: '';
          position: absolute; bottom: 5px; left: 50%;
          transform: translateX(-50%);
          width: 4px; height: 4px; border-radius: 50%;
          background: var(--hdr-accent);
        }

        /* ── Right cluster ─────────────────────────────────────── */
        .tt-hdr-right {
          display: flex; align-items: center; gap: 6px; flex-shrink: 0;
        }

        /* Phone text link */
        .tt-hdr-phone {
          display: flex; align-items: center; gap: 6px;
          font-size: .82rem; font-weight: 500;
          color: var(--hdr-tx2); text-decoration: none;
          padding: 7px 11px; border-radius: 8px;
          transition: color .18s, background .18s;
          white-space: nowrap;
        }
        .tt-hdr-phone:hover { color: var(--hdr-accent); background: var(--hdr-hover-bg); }
        @media(max-width:900px){ .tt-hdr-phone { display: none; } }

        /* Separator */
        .tt-hdr-sep {
          width: 1px; height: 18px;
          background: var(--hdr-sep); flex-shrink: 0;
        }
        @media(max-width:900px){ .tt-hdr-sep.phone-sep { display: none; } }

        /* Call button */
        .tt-hdr-call {
          display: inline-flex; align-items: center; gap: 6px;
          background: var(--hdr-accent); color: #fff;
          font-family: 'DM Sans', sans-serif; font-weight: 600; font-size: .82rem;
          padding: 8px 16px; border-radius: 8px;
          text-decoration: none; white-space: nowrap;
          box-shadow: 0 2px 8px rgba(26,95,191,.26);
          transition: background .18s, transform .18s, box-shadow .18s;
        }
        .tt-hdr-call:hover {
          background: var(--hdr-accent-h);
          transform: translateY(-1px);
          box-shadow: 0 4px 14px rgba(26,95,191,.36);
        }
        @media(max-width:820px){ .tt-hdr-call { display: none; } }

        /* ── Theme toggle button ───────────────────────────────── */
        .tt-theme-btn {
          width: 36px; height: 36px; border-radius: 9px;
          background: var(--tog-bg);
          border: 1px solid var(--tog-bd);
          box-shadow: var(--tog-sh);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; flex-shrink: 0;
          transition:
            background .22s ease,
            border-color .22s ease,
            box-shadow .22s ease,
            transform .18s ease;
          position: relative; overflow: hidden;
        }
        .tt-theme-btn:hover {
          background: var(--tog-bg-h);
          border-color: var(--tog-bd-h);
          transform: scale(1.06);
        }
        .tt-theme-icon {
          position: absolute;
          transition: opacity .22s ease, transform .28s cubic-bezier(.22,1,.36,1);
        }
        .tt-theme-icon-sun  { color: var(--tog-icon); }
        .tt-theme-icon-moon { color: var(--tog-icon); }
        .tt-theme-btn:hover .tt-theme-icon { color: var(--tog-icon-h); }

        /* ── Hamburger ─────────────────────────────────────────── */
        .tt-ham {
          width: 36px; height: 36px; border-radius: 8px;
          background: var(--tog-bg);
          border: 1px solid var(--tog-bd);
          display: none; align-items: center; justify-content: center;
          cursor: pointer; color: var(--hdr-tx1);
          transition: background .18s, border-color .18s;
          flex-shrink: 0;
        }
        .tt-ham:hover { background: var(--hdr-accent-lt); border-color: var(--hdr-accent-bd); }
        @media(max-width:820px){ .tt-ham { display: flex; } }

        /* ── Mobile drawer ─────────────────────────────────────── */
        .tt-mob-drawer {
          position: fixed; inset: 0; z-index: 8999;
          display: flex; flex-direction: column;
        }
        .tt-mob-overlay {
          position: absolute; inset: 0;
          background: rgba(0,0,0,.32);
          backdrop-filter: blur(3px);
          -webkit-backdrop-filter: blur(3px);
        }
        .tt-mob-panel {
          position: relative; z-index: 1;
          margin: 8px; margin-top: 72px;
          background: var(--hdr-mob-bg);
          border: 1px solid var(--hdr-mob-bd);
          border-radius: 16px; overflow: hidden;
          box-shadow: 0 16px 52px rgba(0,0,0,.18);
        }

        /* Mobile nav links */
        .tt-mob-nav { padding: 8px; }
        .tt-mob-link {
          display: flex; align-items: center; justify-content: space-between;
          padding: 12px 15px; border-radius: 10px;
          text-decoration: none; font-size: .9rem; font-weight: 500;
          color: var(--hdr-tx2);
          transition: color .18s, background .18s;
          margin-bottom: 2px;
        }
        .tt-mob-link:hover  { background: var(--hdr-hover-bg); color: var(--hdr-tx1); }
        .tt-mob-link.active { background: var(--hdr-active-bg); color: var(--hdr-active-tx); font-weight: 600; }
        .tt-mob-hr { height: 1px; background: var(--hdr-mob-bd); margin: 4px 8px; }

        /* Mobile theme row */
        .tt-mob-theme-row {
          display: flex; align-items: center; justify-content: space-between;
          padding: 12px 15px; margin: 0 8px 4px;
          border-radius: 10px;
          background: var(--tog-bg);
          border: 1px solid var(--tog-bd);
        }
        .tt-mob-theme-label {
          font-size: .82rem; font-weight: 500;
          color: var(--hdr-tx2);
          display: flex; align-items: center; gap: 8px;
        }
        .tt-mob-toggle-track {
          width: 44px; height: 24px; border-radius: 999px;
          background: var(--hdr-mob-bd);
          border: 1px solid var(--hdr-mob-bd);
          position: relative; cursor: pointer;
          transition: background .22s ease, border-color .22s ease;
          flex-shrink: 0;
        }
        .tt-mob-toggle-track.on {
          background: var(--hdr-accent);
          border-color: var(--hdr-accent);
        }
        .tt-mob-toggle-thumb {
          position: absolute; top: 3px; left: 3px;
          width: 16px; height: 16px; border-radius: 50%;
          background: #fff;
          box-shadow: 0 1px 4px rgba(0,0,0,.2);
          transition: transform .22s cubic-bezier(.22,1,.36,1);
        }
        .tt-mob-toggle-track.on .tt-mob-toggle-thumb { transform: translateX(20px); }

        /* Mobile call button */
        .tt-mob-call {
          display: flex; align-items: center; gap: 10px;
          margin: 8px; padding: 14px 15px;
          background: var(--hdr-accent); color: #fff;
          border-radius: 10px; text-decoration: none;
          font-weight: 600; font-size: .88rem;
          box-shadow: 0 4px 14px rgba(26,95,191,.28);
          transition: opacity .18s;
        }
        .tt-mob-call:hover { opacity: .92; }
        .tt-mob-call-icon {
          width: 30px; height: 30px; border-radius: 7px;
          background: rgba(255,255,255,.18);
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
      `}</style>

      <header className="tt-hdr" data-theme={dark ? "dark" : "light"}>
        <div className={`tt-hdr-wrap ${scrolled ? "scrolled" : ""}`}>
          <div className={`tt-hdr-inner ${scrolled ? "scrolled" : ""}`}>

            {/* Logo */}
            <Link to="/" className="tt-hdr-logo">
              <div className="tt-hdr-logo-box">
                <Tv size={17} className="tt-logo-icon" style={{ color: "var(--hdr-accent)" }} />
              </div>
              <div>
                <div className="tt-hdr-logo-name">TechnoTV</div>
                <div className="tt-hdr-logo-sub">Electronics &amp; Home Theater</div>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="tt-hdr-nav">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`tt-nav-link ${location.pathname === item.path ? "active" : ""}`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Right cluster */}
            <div className="tt-hdr-right">
              {/* Phone number */}
              <a href="tel:+919876543210" className="tt-hdr-phone">
                <Phone size={13} />
                +91 98765 43210
              </a>

              <div className="tt-hdr-sep phone-sep" />

              {/* Call Now button */}
              <a href="tel:+919876543210" className="tt-hdr-call">
                <Phone size={13} /> Call Now
              </a>

              <div className="tt-hdr-sep" />

              {/* ── Theme toggle ── */}
              <button
                className="tt-theme-btn"
                onClick={toggle}
                aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
                title={dark ? "Light mode" : "Dark mode"}
              >
                {/* Sun icon — visible in dark mode */}
                <Sun
                  size={15}
                  className="tt-theme-icon tt-theme-icon-sun"
                  style={{
                    opacity:   dark ? 1 : 0,
                    transform: dark ? "scale(1) rotate(0deg)" : "scale(0.5) rotate(90deg)",
                  }}
                />
                {/* Moon icon — visible in light mode */}
                <Moon
                  size={14}
                  className="tt-theme-icon tt-theme-icon-moon"
                  style={{
                    opacity:   dark ? 0 : 1,
                    transform: dark ? "scale(0.5) rotate(-90deg)" : "scale(1) rotate(0deg)",
                  }}
                />
              </button>

              {/* Hamburger — mobile only */}
              <button
                className="tt-ham"
                onClick={() => setMobileOpen(o => !o)}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={17} /> : <Menu size={17} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              className="tt-mob-drawer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <div className="tt-mob-overlay" onClick={() => setMobileOpen(false)} />

              <motion.div
                className="tt-mob-panel"
                initial={{ opacity: 0, y: -10, scale: 0.97 }}
                animate={{ opacity: 1, y: 0,   scale: 1    }}
                exit={{    opacity: 0, y: -10, scale: 0.97 }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Nav links */}
                <nav className="tt-mob-nav">
                  {navItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`tt-mob-link ${location.pathname === item.path ? "active" : ""}`}
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                      <ChevronDown
                        size={13}
                        style={{
                          transform: "rotate(-90deg)",
                          color: location.pathname === item.path
                            ? "var(--hdr-accent)"
                            : "var(--hdr-tx3)",
                        }}
                      />
                    </Link>
                  ))}
                </nav>

                <div className="tt-mob-hr" />

                {/* Theme toggle row */}
                <div className="tt-mob-theme-row">
                  <span className="tt-mob-theme-label">
                    {dark
                      ? <><Moon size={14} style={{ color: "var(--hdr-accent)" }} /> Dark mode</>
                      : <><Sun  size={14} style={{ color: "var(--hdr-accent)" }} /> Light mode</>
                    }
                  </span>
                  <div
                    className={`tt-mob-toggle-track ${dark ? "on" : ""}`}
                    onClick={toggle}
                    role="switch"
                    aria-checked={dark}
                    aria-label="Toggle dark mode"
                  >
                    <div className="tt-mob-toggle-thumb" />
                  </div>
                </div>

                <div className="tt-mob-hr" />

                {/* Call button */}
                <a
                  href="tel:+919876543210"
                  className="tt-mob-call"
                  onClick={() => setMobileOpen(false)}
                >
                  <div className="tt-mob-call-icon">
                    <Phone size={14} />
                  </div>
                  <div>
                    <div style={{ fontSize: ".74rem", opacity: .72, lineHeight: 1 }}>Call us now</div>
                    <div style={{ fontSize: ".92rem", fontWeight: 700, marginTop: 2 }}>+91 98765 43210</div>
                  </div>
                </a>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Header;