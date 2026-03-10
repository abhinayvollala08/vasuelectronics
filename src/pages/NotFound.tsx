import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, Phone, Tv, Wind, Wrench, Mail } from "lucide-react";
import type { MotionProps } from "framer-motion";
import { useDarkMode } from "@/components/Header";

const fadeUp = (delay = 0): MotionProps => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] } },
});

const quickLinks = [
  { Icon: Home,   label: "Home",     to: "/" },
  { Icon: Tv,     label: "Services", to: "/services" },
  { Icon: Wrench, label: "About",    to: "/about" },
  { Icon: Mail,   label: "Contact",  to: "/contact" },
];

/* ── Animated broken TV SVG (pure CSS + SVG SMIL, zero deps) ──── */
const BrokenTV = ({ dark }: { dark: boolean }) => (
  <svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
    <style>{`
      @keyframes tvFlicker {
        0%,100%{ opacity:1 } 8%{ opacity:.3 } 9%{ opacity:1 }
        41%{ opacity:.15 } 42%{ opacity:1 } 76%{ opacity:.5 } 77%{ opacity:1 }
      }
      @keyframes scanline { from{ transform:translateY(-4px) } to{ transform:translateY(82px) } }
      @keyframes antL { 0%,100%{ transform:rotate(-4deg) } 50%{ transform:rotate(4deg) } }
      @keyframes antR { 0%,100%{ transform:rotate(5deg)  } 50%{ transform:rotate(-5deg) } }
      @keyframes glitch {
        0%,88%,100%{ transform:translate(0,0) }
        89%{ transform:translate(-3px,0) } 90%{ transform:translate(3px,0) }
        91%{ transform:translate(0,2px)  } 92%{ transform:translate(0,0) }
      }
      @keyframes blink { 0%,49%{ opacity:1 } 50%,99%{ opacity:0 } }
      @keyframes spark { 0%,100%{ opacity:0 } 40%,60%{ opacity:1 } }
      @keyframes sparkY { 0%,100%{ transform:translateY(0) } 50%{ transform:translateY(-10px) } }
      .tv-wrap   { animation: glitch 5s ease-in-out infinite; }
      .tv-screen { animation: tvFlicker 3.2s ease-in-out infinite; }
      .scanline  { animation: scanline 1.4s linear infinite; opacity:.15; }
      .ant-l     { transform-origin:76px 30px; animation:antL 2.6s ease-in-out infinite; }
      .ant-r     { transform-origin:124px 30px; animation:antR 3s ease-in-out infinite; }
      .led-blink { animation: blink 1.2s step-end infinite; }
    `}</style>

    {/* Antennas */}
    <g className="ant-l">
      <line x1="76" y1="30" x2="54" y2="6" stroke={dark ? "#4A9BFF" : "#1A5FBF"} strokeWidth="2.2" strokeLinecap="round"/>
      <circle cx="54" cy="6" r="2.8" fill={dark ? "#4A9BFF" : "#1A5FBF"} opacity=".65"/>
    </g>
    <g className="ant-r">
      <line x1="124" y1="30" x2="146" y2="6" stroke={dark ? "#4A9BFF" : "#1A5FBF"} strokeWidth="2.2" strokeLinecap="round"/>
      <circle cx="146" cy="6" r="2.8" fill={dark ? "#4A9BFF" : "#1A5FBF"} opacity=".65"/>
    </g>

    {/* Main TV body */}
    <g className="tv-wrap">
      {/* Body shell */}
      <rect x="22" y="28" width="156" height="102" rx="10"
        fill={dark ? "#1A2035" : "#E8F1FD"}
        stroke={dark ? "#2A3550" : "#BADAFF"} strokeWidth="1.8"/>

      {/* Screen area */}
      <rect x="32" y="36" width="136" height="76" rx="5"
        fill={dark ? "#060810" : "#0D1526"}/>

      {/* Screen content */}
      <g className="tv-screen">
        {/* Noise bars */}
        {Array.from({ length: 14 }).map((_, i) => (
          <rect key={i} x="32" y={36 + i * 5.6} width="136" height="2"
            fill={dark ? "#4A9BFF" : "#1A5FBF"}
            opacity={0.03 + (i % 4) * 0.025}/>
        ))}
        {/* "?" glyph */}
        <text x="100" y="83" textAnchor="middle"
          fontFamily="'DM Serif Display', Georgia, serif"
          fontSize="38" fill={dark ? "#4A9BFF" : "#6CA8FF"} opacity=".9">?</text>
        {/* Scanline sweep */}
        <rect className="scanline" x="32" y="36" width="136" height="16" fill="white"/>
      </g>

      {/* Screen glare */}
      <path d="M37 40 Q52 36 62 46 Q48 50 38 43 Z" fill="white" opacity=".05"/>

      {/* Crack */}
      <polyline points="96,44 89,60 101,64 91,82"
        stroke={dark ? "#FF7070" : "#DC2626"} strokeWidth="1.4"
        strokeLinecap="round" strokeLinejoin="round" opacity=".75"/>
      <line x1="101" y1="64" x2="113" y2="70"
        stroke={dark ? "#FF7070" : "#DC2626"} strokeWidth="1.1"
        strokeLinecap="round" opacity=".45"/>

      {/* Speaker dots */}
      {[0,1,2].map(row => [0,1,2,3].map(col => (
        <circle key={`${row}-${col}`}
          cx={148 + col * 4.5} cy={46 + row * 4.5} r="1.1"
          fill={dark ? "#4A9BFF" : "#1A5FBF"} opacity=".28"/>
      )))}

      {/* Bottom bar */}
      <rect x="22" y="128" width="156" height="2" rx="1"
        fill={dark ? "#0E1320" : "#C3CEDF"} opacity=".6"/>

      {/* Power LED */}
      <circle cx="42" cy="122" r="4"
        fill={dark ? "#0E1C30" : "#C3CEDF"}
        stroke={dark ? "#193150" : "#BADAFF"} strokeWidth="1"/>
      <circle cx="42" cy="122" r="2"
        fill={dark ? "#4A9BFF" : "#1A5FBF"} className="led-blink"/>

      {/* Knob */}
      <circle cx="158" cy="122" r="6"
        fill={dark ? "#0E1C30" : "#C3CEDF"}
        stroke={dark ? "#193150" : "#BADAFF"} strokeWidth="1"/>
      <line x1="158" y1="117" x2="158" y2="120"
        stroke={dark ? "#4A9BFF" : "#1A5FBF"} strokeWidth="1.4" strokeLinecap="round"/>

      {/* Legs */}
      <rect x="62" y="129" width="14" height="10" rx="3"
        fill={dark ? "#1A2035" : "#D9E1EE"}
        stroke={dark ? "#2A3550" : "#BADAFF"} strokeWidth="1"/>
      <rect x="124" y="129" width="14" height="10" rx="3"
        fill={dark ? "#1A2035" : "#D9E1EE"}
        stroke={dark ? "#2A3550" : "#BADAFF"} strokeWidth="1"/>
      <rect x="58" y="138" width="22" height="5" rx="2.5"
        fill={dark ? "#111727" : "#C3CEDF"}/>
      <rect x="120" y="138" width="22" height="5" rx="2.5"
        fill={dark ? "#111727" : "#C3CEDF"}/>
    </g>

    {/* Floating sparks */}
    {[
      { x: 172, y: 48, r: 2.8, d: "0s",   dur: "2.2s" },
      { x: 180, y: 36, r: 1.8, d: "0.5s", dur: "2.6s" },
      { x: 165, y: 42, r: 1.4, d: "1s",   dur: "2s"   },
    ].map((s, i) => (
      <circle key={i} cx={s.x} r={s.r} fill={dark ? "#FBBF24" : "#F59E0B"}>
        <animate attributeName="cy"      values={`${s.y};${s.y-11};${s.y}`}  dur={s.dur} begin={s.d} repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0;1;0"                       dur={s.dur} begin={s.d} repeatCount="indefinite"/>
      </circle>
    ))}
  </svg>
);

/* ════════════════════════════════════════════════════════════════ */
const NotFound = () => {
  const location = useLocation();
  const { dark } = useDarkMode();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&family=DM+Mono:wght@400;500&display=swap');

        .tt404[data-theme="light"] {
          --bg:#F4F6FA; --surface:#FFFFFF; --subtle:#ECF0F7;
          --tx1:#0D1526; --tx2:#2E3D55; --tx3:#5E7191; --tx4:#9BAABF;
          --accent:#1A5FBF; --accent-h:#154FA3; --accent-lt:#E8F1FD; --accent-bd:#BADAFF;
          --border:#D9E1EE; --border-str:#C3CEDF;
          --sh-md:0 4px 16px rgba(13,21,38,.08),0 2px 6px rgba(13,21,38,.04);
          --grid-c:rgba(26,95,191,.048); --dot-c:rgba(26,95,191,.085);
          --blob1:rgba(232,241,253,0.9); --blob2:rgba(236,240,247,0.8);
        }
        .tt404[data-theme="dark"] {
          --bg:#0B0E17; --surface:#121622; --subtle:#171C2A;
          --tx1:#ECF2FC; --tx2:#C2CEDF; --tx3:#788499; --tx4:#435060;
          --accent:#4A9BFF; --accent-h:#62AAFF; --accent-lt:#0E1C30; --accent-bd:#193150;
          --border:#1F2738; --border-str:#283044;
          --sh-md:0 4px 16px rgba(0,0,0,.40);
          --grid-c:rgba(74,155,255,.046); --dot-c:rgba(74,155,255,.068);
          --blob1:rgba(14,28,48,0.8); --blob2:rgba(23,28,42,0.6);
        }

        .tt404*,.tt404 *::before,.tt404 *::after{box-sizing:border-box;}
        .tt404 {
          font-family:'DM Sans',system-ui,sans-serif;
          background:var(--bg); color:var(--tx1);
          min-height:100vh; display:flex; flex-direction:column;
          align-items:center; justify-content:center;
          position:relative; overflow:hidden;
          transition:background .3s,color .3s;
          -webkit-font-smoothing:antialiased; padding:40px 24px;
        }
        .tt404-serif{font-family:'DM Serif Display',Georgia,serif;}
        .tt404-mono{font-family:'DM Mono',monospace;}

        .tt404-grid{position:absolute;inset:0;pointer-events:none;background-image:linear-gradient(var(--grid-c) 1px,transparent 1px),linear-gradient(90deg,var(--grid-c) 1px,transparent 1px);background-size:48px 48px;}

        .tt404-ghost{position:absolute;pointer-events:none;user-select:none;font-family:'DM Serif Display',Georgia,serif;font-size:clamp(160px,30vw,380px);line-height:1;letter-spacing:-.04em;color:transparent;-webkit-text-stroke:1.5px var(--border);top:50%;left:50%;transform:translate(-50%,-50%);opacity:.25;white-space:nowrap;}

        @keyframes floatA{0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}}
        @keyframes floatB{0%,100%{transform:translateY(0)}50%{transform:translateY(-9px)}}
        .blob-a{animation:floatA 6s ease-in-out infinite;}
        .blob-b{animation:floatB 9s ease-in-out infinite reverse;}

        .tt404-card{background:var(--surface);border:1px solid var(--border);border-radius:20px;box-shadow:var(--sh-md);padding:44px 40px 38px;max-width:520px;width:100%;text-align:center;position:relative;z-index:2;overflow:hidden;}
        @media(max-width:480px){.tt404-card{padding:32px 20px 28px;}}

        .tt404-card-dots{position:absolute;inset:0;border-radius:inherit;pointer-events:none;background-image:radial-gradient(circle,var(--dot-c) 1.3px,transparent 1.3px);background-size:24px 24px;opacity:.5;}

        .tt404-badge{display:inline-flex;align-items:center;gap:6px;background:var(--accent-lt);color:var(--accent);font-family:'DM Mono',monospace;font-size:.63rem;font-weight:600;letter-spacing:.18em;padding:5px 12px;border-radius:999px;border:1px solid var(--accent-bd);margin-bottom:14px;}

        .tt404-path{display:inline-flex;align-items:center;gap:6px;background:var(--subtle);color:var(--tx3);font-family:'DM Mono',monospace;font-size:.7rem;padding:5px 13px;border-radius:8px;border:1px solid var(--border);margin-bottom:24px;max-width:100%;word-break:break-all;}

        .tt404-btn-p{display:inline-flex;align-items:center;gap:8px;background:var(--accent);color:#fff;font-family:'DM Sans',sans-serif;font-weight:600;font-size:.88rem;padding:12px 24px;border-radius:10px;border:none;cursor:pointer;box-shadow:0 4px 16px rgba(26,95,191,.28);transition:background .2s,transform .2s,box-shadow .2s;text-decoration:none;white-space:nowrap;}
        .tt404-btn-p:hover{background:var(--accent-h);transform:translateY(-1px);box-shadow:0 7px 22px rgba(26,95,191,.36);}

        .tt404-btn-g{display:inline-flex;align-items:center;gap:8px;background:transparent;color:var(--accent);font-family:'DM Sans',sans-serif;font-weight:600;font-size:.88rem;padding:11px 20px;border-radius:10px;border:1.5px solid var(--accent-bd);cursor:pointer;transition:background .2s,border-color .2s;text-decoration:none;white-space:nowrap;}
        .tt404-btn-g:hover{background:var(--accent-lt);border-color:var(--accent);}

        .tt404-links{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-top:22px;}
        @media(max-width:360px){.tt404-links{grid-template-columns:repeat(2,1fr);}}

        .tt404-link{display:flex;flex-direction:column;align-items:center;gap:5px;padding:12px 6px;border-radius:11px;background:var(--subtle);border:1px solid var(--border);color:var(--tx3);text-decoration:none;font-size:.74rem;font-weight:500;transition:background .22s,border-color .22s,color .22s,transform .22s;}
        .tt404-link:hover{background:var(--accent-lt);border-color:var(--accent-bd);color:var(--accent);transform:translateY(-2px);}
      `}</style>

      <div className="tt404" data-theme={dark ? "dark" : "light"}>
        <div className="tt404-grid" />

        {/* Blobs */}
        <div className="blob-a" style={{ position:"absolute", top:"-6%", right:"-5%", width:"clamp(200px,32vw,400px)", height:"clamp(200px,32vw,400px)", borderRadius:"50%", background:"radial-gradient(circle,var(--blob1) 0%,transparent 68%)", pointerEvents:"none" }} />
        <div className="blob-b" style={{ position:"absolute", bottom:"-6%", left:"-5%", width:"clamp(160px,22vw,300px)", height:"clamp(160px,22vw,300px)", borderRadius:"50%", background:"radial-gradient(circle,var(--blob2) 0%,transparent 68%)", pointerEvents:"none" }} />

        {/* Ghost number */}
        <div className="tt404-ghost" aria-hidden>404</div>

        {/* Card */}
        <motion.div className="tt404-card" {...fadeUp(0)}>
          <div className="tt404-card-dots" />

          {/* TV illustration */}
          <div style={{ width:200, height:160, margin:"0 auto 6px", position:"relative", zIndex:1 }}>
            <BrokenTV dark={dark} />
          </div>

          {/* Badge */}
          <motion.div {...fadeUp(0.06)} style={{ position:"relative", zIndex:1 }}>
            <span className="tt404-badge">ERROR · 404</span>
          </motion.div>

          {/* Heading */}
          <motion.h1 className="tt404-serif" {...fadeUp(0.1)} style={{ fontSize:"clamp(1.75rem,4vw,2.4rem)", lineHeight:1.1, color:"var(--tx1)", marginBottom:10, position:"relative", zIndex:1 }}>
            Page Not <em style={{ color:"var(--accent)", fontStyle:"italic" }}>Found</em>
          </motion.h1>

          {/* Body */}
          <motion.p {...fadeUp(0.14)} style={{ fontSize:".88rem", lineHeight:1.78, color:"var(--tx3)", maxWidth:360, margin:"0 auto 16px", position:"relative", zIndex:1 }}>
            Looks like this page took itself in for repairs and never came back. Let's get you back on track.
          </motion.p>

          {/* Path */}
          <motion.div {...fadeUp(0.17)} style={{ display:"flex", justifyContent:"center", marginBottom:22, position:"relative", zIndex:1 }}>
            <span className="tt404-path">
              <span style={{ opacity:.5 }}>tried:</span>
              <span style={{ color:"var(--tx2)", fontWeight:500 }}>{location.pathname}</span>
            </span>
          </motion.div>

          {/* CTAs */}
          <motion.div {...fadeUp(0.2)} style={{ display:"flex", gap:10, justifyContent:"center", flexWrap:"wrap", position:"relative", zIndex:1 }}>
            <Link to="/" className="tt404-btn-p"><Home size={14}/> Back to Home</Link>
            <a href="tel:+919876543210" className="tt404-btn-g"><Phone size={14}/> Call Us</a>
          </motion.div>

          {/* Quick links */}
          <motion.div {...fadeUp(0.25)} style={{ position:"relative", zIndex:1 }}>
            <p className="tt404-mono" style={{ fontSize:".58rem", letterSpacing:".18em", textTransform:"uppercase", color:"var(--tx4)", margin:"20px 0 8px" }}>Or browse</p>
            <div className="tt404-links">
              {quickLinks.map((l, i) => (
                <Link key={i} to={l.to} className="tt404-link">
                  <l.Icon size={15}/><span>{l.label}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Footer */}
        <motion.p {...fadeUp(0.34)} className="tt404-mono" style={{ marginTop:20, fontSize:".67rem", color:"var(--tx4)", letterSpacing:".08em", textAlign:"center", position:"relative", zIndex:2 }}>
          TechnoTV · Peddapalli &amp; Mancherial · Est. 2014
        </motion.p>
      </div>
    </>
  );
};

export default NotFound;