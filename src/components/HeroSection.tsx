import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Phone, ArrowRight, CheckCircle, MapPin, ShieldCheck, Clock, Zap } from "lucide-react";
import { useInView } from "framer-motion";
import { useDarkMode } from "@/components/Header";

/* ─── Rotating service names ────────────────────────────────────── */
const ROTATING = ["LED TV", "Air Conditioner", "Refrigerator", "Washing Machine", "Home Theatre"];

/* ─── Service chips ─────────────────────────────────────────────── */
const CHIPS = [
  { label: "TV Repair",       dot: "#4A9BFF" },
  { label: "AC Servicing",    dot: "#0EA5E9" },
  { label: "Refrigerator",    dot: "#8B5CF6" },
  { label: "Washing Machine", dot: "#10B981" },
  { label: "Home Theatre",    dot: "#F59E0B" },
  { label: "AMC Contracts",   dot: "#EF4444" },
];

/* ─── Animated counter ──────────────────────────────────────────── */
function useCounter(target: number, duration = 2000) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref as any, { once: true, margin: "-60px" });
  useEffect(() => {
    if (!inView) return;
    let v = 0;
    const step = target / (duration / 16);
    const id = setInterval(() => {
      v = Math.min(v + step, target);
      setVal(Math.floor(v));
      if (v >= target) clearInterval(id);
    }, 16);
    return () => clearInterval(id);
  }, [inView, target, duration]);
  return { val, ref };
}

/* ─── Typing rotator ────────────────────────────────────────────── */
const TypingRotator = () => {
  const [idx, setIdx]         = useState(0);
  const [text, setText]       = useState("");
  const [deleting, setDelete] = useState(false);
  const [paused, setPaused]   = useState(false);

  useEffect(() => {
    const target = ROTATING[idx];
    if (paused) {
      const t = setTimeout(() => { setDelete(true); setPaused(false); }, 1700);
      return () => clearTimeout(t);
    }
    if (!deleting) {
      if (text.length < target.length) {
        const t = setTimeout(() => setText(target.slice(0, text.length + 1)), 72);
        return () => clearTimeout(t);
      }
      setPaused(true);
    } else {
      if (text.length > 0) {
        const t = setTimeout(() => setText(text.slice(0, -1)), 38);
        return () => clearTimeout(t);
      }
      setDelete(false);
      setIdx(i => (i + 1) % ROTATING.length);
    }
  }, [text, deleting, paused, idx]);

  return (
    <span style={{ color: "var(--accent)", fontStyle: "italic" }}>
      {text}
      <span style={{
        display: "inline-block", width: 2, height: "0.85em",
        background: "var(--accent)", marginLeft: 2, verticalAlign: "middle",
        animation: "hwCaret .75s step-end infinite",
      }} />
    </span>
  );
};

/* ─── Live counters strip ───────────────────────────────────────── */
const Counters = () => {
  const { val: r, ref: rr } = useCounter(5247, 2200);
  const { val: b, ref: br } = useCounter(15,   1400);
  const { val: y, ref: yr } = useCounter(10,   1100);
  const stats = [
    { ref: rr, val: r, sfx: "+",  sub: "Repairs Done"  },
    { ref: br, val: b, sfx: "+",  sub: "Auth. Brands"  },
    { ref: yr, val: y, sfx: "+",  sub: "Yrs Service"   },
  ];
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
      {stats.map((s, i) => (
        <div key={i} ref={s.ref as any} style={{
          padding: "18px 10px", textAlign: "center", borderRadius: 12,
          background: i === 1 ? "var(--accent)" : "var(--surface)",
          border: `1px solid ${i === 1 ? "transparent" : "var(--border)"}`,
          boxShadow: i === 1 ? "0 6px 20px rgba(26,95,191,.28)" : "none",
        }}>
          <div style={{
            fontFamily: "'DM Serif Display',Georgia,serif",
            fontSize: "clamp(1.5rem,2.5vw,2rem)", lineHeight: 1,
            color: i === 1 ? "#fff" : "var(--accent)",
          }}>
            {s.val.toLocaleString()}{s.sfx}
          </div>
          <div style={{
            fontFamily: "'DM Mono',monospace", fontSize: ".58rem",
            letterSpacing: ".12em", textTransform: "uppercase", marginTop: 5,
            color: i === 1 ? "rgba(255,255,255,.72)" : "var(--tx3)",
          }}>{s.sub}</div>
        </div>
      ))}
    </div>
  );
};

/* ─── Service chips row ─────────────────────────────────────────── */
const ServiceChips = () => (
  <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
    {CHIPS.map((c, i) => (
      <motion.span key={i}
        initial={{ opacity: 0, y: 10, scale: .9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.38 + i * 0.07, duration: .4, ease: [.22,1,.36,1] }}
        whileHover={{ y: -3, scale: 1.04 }}
        style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          padding: "6px 13px", borderRadius: 999,
          background: "var(--surface)", border: "1px solid var(--border)",
          fontSize: ".75rem", fontWeight: 600, color: "var(--tx2)",
          cursor: "default", boxShadow: "0 1px 4px rgba(13,21,38,.05)",
        }}
      >
        <span style={{ width: 7, height: 7, borderRadius: "50%", background: c.dot, flexShrink: 0 }} />
        {c.label}
      </motion.span>
    ))}
  </div>
);

/* ─── Repair device illustration ────────────────────────────────── */
const Illustration = ({ dark }: { dark: boolean }) => (
  <svg viewBox="0 0 400 360" fill="none" xmlns="http://www.w3.org/2000/svg"
    style={{ width: "100%", height: "100%", display: "block" }}>
    <style>{`
      @keyframes ilFlicker{0%,100%{opacity:1}45%{opacity:.7}46%{opacity:.25}47%{opacity:.95}88%{opacity:1}}
      @keyframes ilScan{from{transform:translateY(0)}to{transform:translateY(130px)}}
      @keyframes ilTool{0%,100%{transform:translateY(0) rotate(-18deg)}50%{transform:translateY(-9px) rotate(-12deg)}}
      @keyframes ilSpark{0%{opacity:0;transform:scale(0)}45%{opacity:1;transform:scale(1.3)}100%{opacity:0;transform:scale(0)}}
      @keyframes ilRing{0%{r:7;opacity:.7}100%{r:26;opacity:0}}
      @keyframes ilLed{0%,100%{opacity:1}50%{opacity:.1}}
      @keyframes ilProg{from{stroke-dashoffset:220}to{stroke-dashoffset:55}}
      @keyframes ilChk{from{stroke-dashoffset:30}to{stroke-dashoffset:0}}
      @keyframes ilAir{0%,100%{opacity:.1}50%{opacity:.55}}
      .il-scr{animation:ilFlicker 4s ease-in-out infinite}
      .il-scan{animation:ilScan 1.7s linear infinite;opacity:.11}
      .il-tool{animation:ilTool 2.4s ease-in-out infinite;transform-origin:300px 195px}
      .il-sp1{animation:ilSpark 2.2s ease-out .2s infinite}
      .il-sp2{animation:ilSpark 2.2s ease-out .8s infinite}
      .il-sp3{animation:ilSpark 2.2s ease-out 1.4s infinite}
      .il-r1{animation:ilRing 1.6s ease-out 0s infinite}
      .il-r2{animation:ilRing 1.6s ease-out .5s infinite}
      .il-r3{animation:ilRing 1.6s ease-out 1s infinite}
      .il-led{animation:ilLed 1.15s step-end infinite}
      .il-led2{animation:ilLed 1.15s step-end .45s infinite}
      .il-prog{stroke-dasharray:220;stroke-dashoffset:220;animation:ilProg 2s cubic-bezier(.22,1,.36,1) .5s forwards}
      .il-chk{stroke-dasharray:30;stroke-dashoffset:30;animation:ilChk .5s ease-out 2.5s forwards}
    `}</style>

    {/* Background glow */}
    <ellipse cx="200" cy="185" rx="175" ry="145"
      fill={dark ? "rgba(74,155,255,.055)" : "rgba(26,95,191,.045)"}/>

    {/* ── TV ── */}
    <rect x="55" y="72" width="238" height="162" rx="13"
      fill={dark ? "#1A2035" : "#E8F1FD"}
      stroke={dark ? "#2A3550" : "#BADAFF"} strokeWidth="1.8"/>
    <rect x="68" y="84" width="212" height="124" rx="6"
      fill={dark ? "#06090F" : "#0D1526"}/>

    <g className="il-scr">
      {[0,1,2,3,4,5,6,7].map(i=>(
        <rect key={i} x="68" y={84+i*16} width="212" height="7"
          fill={dark?"#4A9BFF":"#1A5FBF"} opacity={.022+(i%3)*.016}/>
      ))}
      {/* Progress ring */}
      <circle cx="174" cy="146" r="34"
        fill={dark?"rgba(74,155,255,.12)":"rgba(26,95,191,.1)"}
        stroke={dark?"#4A9BFF":"#1A5FBF"} strokeWidth="1.3"/>
      <circle cx="174" cy="146" r="34" stroke={dark?"#4A9BFF":"#1A5FBF"}
        strokeWidth="3.5" strokeLinecap="round" fill="none"
        className="il-prog" transform="rotate(-90 174 146)"/>
      <polyline points="161,146 171,156 189,138"
        stroke={dark?"#4ADE80":"#15803D"} strokeWidth="3.8"
        strokeLinecap="round" strokeLinejoin="round" fill="none" className="il-chk"/>
      <text x="174" y="198" textAnchor="middle"
        fontFamily="'DM Mono',monospace" fontSize="8.5" letterSpacing="2.5"
        fill={dark?"#4A9BFF":"#1A5FBF"} opacity=".65">REPAIRED</text>
      <rect className="il-scan" x="68" y="84" width="212" height="20" fill="white"/>
    </g>

    {/* Glare */}
    <path d="M74 88 Q88 84 98 94 Q84 98 75 91Z" fill="white" opacity=".05"/>

    {/* Speaker dots */}
    {[0,1,2].map(r=>[0,1,2,3].map(c=>(
      <circle key={`${r}-${c}`} cx={246+c*4.5} cy={94+r*4.5} r="1.1"
        fill={dark?"#4A9BFF":"#1A5FBF"} opacity=".26"/>
    )))}

    {/* Stand */}
    <rect x="152" y="234" width="48" height="13" rx="4"
      fill={dark?"#1A2035":"#D9E1EE"} stroke={dark?"#2A3550":"#BADAFF"} strokeWidth="1.1"/>
    <rect x="137" y="246" width="78" height="7" rx="3.5"
      fill={dark?"#111727":"#C3CEDF"}/>

    {/* Power LED */}
    <circle cx="264" cy="226" r="4.5"
      fill={dark?"#0E1C30":"#C3CEDF"} stroke={dark?"#193150":"#BADAFF"} strokeWidth="1"/>
    <circle cx="264" cy="226" r="2.3" fill={dark?"#4ADE80":"#15803D"} className="il-led"/>

    {/* ── Wrench ── */}
    <g className="il-tool">
      <rect x="288" y="158" width="13" height="50" rx="6.5"
        fill={dark?"#2A3550":"#1A5FBF"} opacity=".85" transform="rotate(-18 300 195)"/>
      <circle cx="297" cy="163" r="9"
        fill="none" stroke={dark?"#4A9BFF":"#60A5FA"} strokeWidth="2.8"
        transform="rotate(-18 300 195)"/>
    </g>

    {/* Sparks */}
    <g className="il-sp1"><polygon points="322,140 325,134 328,140 325,146"
      fill={dark?"#FBBF24":"#F59E0B"} opacity=".9"/></g>
    <g className="il-sp2"><polygon points="313,132 315,127 317,132 315,137"
      fill={dark?"#FDE68A":"#FBBF24"} opacity=".8"/></g>
    <g className="il-sp3"><polygon points="332,152 334,147 336,152 334,157"
      fill={dark?"#FBBF24":"#F59E0B"} opacity=".7"/></g>

    {/* Signal rings */}
    <circle cx="354" cy="74" r="7" fill={dark?"#4A9BFF":"#1A5FBF"} opacity=".18" className="il-r1"/>
    <circle cx="354" cy="74" r="7" fill={dark?"#4A9BFF":"#1A5FBF"} opacity=".12" className="il-r2"/>
    <circle cx="354" cy="74" r="7" fill={dark?"#4A9BFF":"#1A5FBF"} opacity=".08" className="il-r3"/>
    <circle cx="354" cy="74" r="5.5" fill={dark?"#4A9BFF":"#1A5FBF"} opacity=".55"/>
    <text x="354" y="100" textAnchor="middle"
      fontFamily="'DM Mono',monospace" fontSize="7.5" letterSpacing=".5"
      fill={dark?"#788499":"#5E7191"}>LIVE</text>

    {/* Floating chips */}
    {/* Same-Day chip */}
    <g style={{ animation:"ilTool 3s ease-in-out infinite", transformOrigin:"86px 52px" }}>
      <rect x="26" y="40" width="120" height="26" rx="13"
        fill={dark?"#0E1C30":"#E8F1FD"} stroke={dark?"#193150":"#BADAFF"} strokeWidth="1.1"/>
      <circle cx="44" cy="53" r="4" fill="#4ADE80"/>
      <text x="54" y="57" fontFamily="'DM Sans',sans-serif" fontSize="10" fontWeight="700"
        fill={dark?"#ECF2FC":"#0D1526"}>Same-Day</text>
    </g>
    {/* Doorstep chip */}
    <g style={{ animation:"ilTool 3.8s ease-in-out .6s infinite", transformOrigin:"316px 46px" }}>
      <rect x="258" y="34" width="112" height="26" rx="13"
        fill={dark?"#0E1C30":"#E8F1FD"} stroke={dark?"#193150":"#BADAFF"} strokeWidth="1.1"/>
      <text x="272" y="50" fontFamily="'DM Sans',sans-serif" fontSize="12">📍</text>
      <text x="290" y="51" fontFamily="'DM Sans',sans-serif" fontSize="10" fontWeight="700"
        fill={dark?"#ECF2FC":"#0D1526"}>Doorstep</text>
    </g>
    {/* Warranty chip */}
    <g style={{ animation:"ilTool 4.2s ease-in-out 1s infinite", transformOrigin:"84px 285px" }}>
      <rect x="24" y="272" width="120" height="26" rx="13"
        fill={dark?"#0E1C30":"#E8F1FD"} stroke={dark?"#193150":"#BADAFF"} strokeWidth="1.1"/>
      <text x="38" y="288" fontFamily="'DM Sans',sans-serif" fontSize="12">🛡️</text>
      <text x="57" y="289" fontFamily="'DM Sans',sans-serif" fontSize="10" fontWeight="700"
        fill={dark?"#ECF2FC":"#0D1526"}>Warranty</text>
    </g>
    {/* 15+ Brands chip */}
    <g style={{ animation:"ilTool 3.5s ease-in-out 1.4s infinite", transformOrigin:"316px 287px" }}>
      <rect x="256" y="274" width="118" height="26" rx="13"
        fill={dark?"#0E1C30":"#E8F1FD"} stroke={dark?"#193150":"#BADAFF"} strokeWidth="1.1"/>
      <text x="270" y="290" fontFamily="'DM Sans',sans-serif" fontSize="12">⚡</text>
      <text x="288" y="291" fontFamily="'DM Sans',sans-serif" fontSize="10" fontWeight="700"
        fill={dark?"#ECF2FC":"#0D1526"}>15+ Brands</text>
    </g>

    {/* ── Mini AC unit (bottom left) ── */}
    <rect x="62" y="314" width="74" height="38" rx="8"
      fill={dark?"#1A2035":"#D9E1EE"} stroke={dark?"#2A3550":"#BADAFF"} strokeWidth="1.1"/>
    <rect x="66" y="320" width="66" height="5" rx="2.5"
      fill={dark?"#4A9BFF":"#1A5FBF"} opacity=".38"/>
    {[0,1,2,3].map(i=>(
      <rect key={i} x={68+i*14} y="330" width="11" height="16" rx="2"
        fill={dark?"#0E1C30":"#C3CEDF"} stroke={dark?"#193150":"#BADAFF"} strokeWidth=".8"/>
    ))}
    <circle cx="99" cy="347" r="2.5" fill={dark?"#4ADE80":"#15803D"} className="il-led2"/>
    {/* AC airflow */}
    {[0,1,2].map(i=>(
      <path key={i} d={`M ${70+i*18} 310 Q ${79+i*18} 303 ${88+i*18} 310`}
        stroke={dark?"#4A9BFF":"#1A5FBF"} strokeWidth="1.1"
        strokeLinecap="round" fill="none">
        <animate attributeName="opacity" values=".08;.5;.08"
          dur={`${1.1+i*.28}s`} repeatCount="indefinite"/>
      </path>
    ))}

    {/* ── Mini fridge (bottom right) ── */}
    <rect x="232" y="310" width="62" height="48" rx="8"
      fill={dark?"#1A2035":"#D9E1EE"} stroke={dark?"#2A3550":"#BADAFF"} strokeWidth="1.1"/>
    <line x1="232" y1="332" x2="294" y2="332"
      stroke={dark?"#2A3550":"#BADAFF"} strokeWidth="1.1"/>
    <rect x="237" y="316" width="5" height="12" rx="2.5"
      fill={dark?"#4A9BFF":"#1A5FBF"} opacity=".55"/>
    <rect x="237" y="337" width="5" height="16" rx="2.5"
      fill={dark?"#4A9BFF":"#1A5FBF"} opacity=".55"/>
  </svg>
);

/* ════════════════════════════════════════════════════════════════ */
export const HeroSection = () => {
  const { dark } = useDarkMode();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&family=DM+Mono:wght@400;500&display=swap');

        @keyframes hwCaret  { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes hwSC     { 0%{transform:translateY(0);opacity:.7} 60%{transform:translateY(8px);opacity:.15} 100%{transform:translateY(0);opacity:.7} }
        @keyframes hwTick   { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @keyframes hwLivePulse { 0%{transform:scale(1);opacity:.65} 100%{transform:scale(2.5);opacity:0} }

        .hw[data-theme="light"] {
          --bg:         #F4F6FA; --surface:    #FFFFFF; --subtle:     #ECF0F7;
          --tx1:        #0D1526; --tx2:        #2E3D55; --tx3:        #5E7191; --tx4:        #9BAABF;
          --accent:     #1A5FBF; --accent-h:   #154FA3; --accent-lt:  #E8F1FD; --accent-bd:  #BADAFF;
          --ok:         #15803D; --ok-bg:      #DCFCE7;
          --border:     #D9E1EE; --border-str: #C3CEDF;
          --sh-sm:      0 1px 2px rgba(13,21,38,.05),0 1px 4px rgba(13,21,38,.04);
          --sh-md:      0 4px 16px rgba(13,21,38,.08),0 2px 6px rgba(13,21,38,.04);
          --grid-c:     rgba(26,95,191,.048); --dot-c:rgba(26,95,191,.085);
          --blob1:      rgba(232,241,253,0.95); --blob2:rgba(236,240,247,0.85);
          --cta-dark:   #0D1526; --cta-dark-tx:#FFFFFF;
        }
        .hw[data-theme="dark"] {
          --bg:         #0B0E17; --surface:    #121622; --subtle:     #171C2A;
          --tx1:        #ECF2FC; --tx2:        #C2CEDF; --tx3:        #788499; --tx4:        #435060;
          --accent:     #4A9BFF; --accent-h:   #62AAFF; --accent-lt:  #0E1C30; --accent-bd:  #193150;
          --ok:         #4ADE80; --ok-bg:      #052E16;
          --border:     #1F2738; --border-str: #283044;
          --sh-sm:      0 1px 3px rgba(0,0,0,.30); --sh-md:0 4px 16px rgba(0,0,0,.40);
          --grid-c:     rgba(74,155,255,.046); --dot-c:rgba(74,155,255,.068);
          --blob1:      rgba(14,28,48,0.85); --blob2:rgba(23,28,42,0.65);
          --cta-dark:   #FFFFFF; --cta-dark-tx:#1A5FBF;
        }

        .hw*,.hw *::before,.hw *::after{box-sizing:border-box;}
        .hw {
          font-family:'DM Sans',system-ui,sans-serif;
          background:var(--bg); color:var(--tx1);
          transition:background .3s,color .3s;
          -webkit-font-smoothing:antialiased;
          position:relative; overflow:hidden;
        }
        .hw-serif{font-family:'DM Serif Display',Georgia,serif;}
        .hw-mono{font-family:'DM Mono',monospace;}
        .hw-wrap{width:100%;max-width:1180px;margin:0 auto;padding:0 28px;}
        @media(max-width:600px){.hw-wrap{padding:0 18px;}}

        .hw-grid{position:absolute;inset:0;pointer-events:none;background-image:linear-gradient(var(--grid-c) 1px,transparent 1px),linear-gradient(90deg,var(--grid-c) 1px,transparent 1px);background-size:48px 48px;}
        .hw-dots{background-image:radial-gradient(circle,var(--dot-c) 1.3px,transparent 1.3px);background-size:24px 24px;}

        /* Split grid */
        .hw-grid-layout{
          display:grid; grid-template-columns:1fr .9fr;
          gap:52px; align-items:center;
          min-height:calc(100vh - 64px); padding:88px 0 48px;
        }
        @media(max-width:920px){
          .hw-grid-layout{grid-template-columns:1fr;gap:44px;padding:72px 0 40px;min-height:auto;text-align:center;}
          .hw-chips,.hw-trust,.hw-ctas{justify-content:center!important;}
          .hw-pill-el{margin:0 auto!important;}
          .hw-rule{margin:0 auto 20px!important;}
          .hw-right{max-width:400px;margin:0 auto;}
        }

        /* Live pill */
        .hw-pill{
          display:inline-flex;align-items:center;gap:8px;
          background:var(--ok-bg);color:var(--ok);
          font-size:.72rem;font-weight:600;letter-spacing:.04em;
          padding:6px 14px 6px 10px;border-radius:999px;
          border:1px solid rgba(21,128,61,.2);
          margin-bottom:22px;
        }
        .hw-dot{
          width:8px;height:8px;border-radius:50%;background:var(--ok);
          position:relative;flex-shrink:0;
        }
        .hw-dot::after{
          content:'';position:absolute;inset:-3px;border-radius:50%;
          background:var(--ok);animation:hwLivePulse 1.9s ease-out infinite;
        }

        /* CTA buttons */
        .hw-btn-p{
          display:inline-flex;align-items:center;gap:9px;
          background:var(--accent);color:#fff;
          font-family:'DM Sans',sans-serif;font-weight:700;font-size:.92rem;
          padding:14px 28px;border-radius:12px;border:none;cursor:pointer;
          box-shadow:0 4px 20px rgba(26,95,191,.32);
          transition:background .2s,transform .18s,box-shadow .2s;
          text-decoration:none;white-space:nowrap;
        }
        .hw-btn-p:hover{background:var(--accent-h);transform:translateY(-2px);box-shadow:0 8px 28px rgba(26,95,191,.40);}

        .hw-btn-g{
          display:inline-flex;align-items:center;gap:8px;
          background:var(--surface);color:var(--tx2);
          font-family:'DM Sans',sans-serif;font-weight:600;font-size:.9rem;
          padding:13px 24px;border-radius:12px;
          border:1.5px solid var(--border-str);cursor:pointer;
          transition:background .2s,border-color .2s,color .2s;
          text-decoration:none;white-space:nowrap;box-shadow:var(--sh-sm);
        }
        .hw-btn-g:hover{background:var(--accent-lt);border-color:var(--accent-bd);color:var(--accent);}

        /* Right panel */
        .hw-panel{
          background:var(--surface);border:1px solid var(--border);
          border-radius:20px;box-shadow:var(--sh-md);
          overflow:hidden;position:relative;
        }

        /* Dispatch banner */
        .hw-dispatch{
          display:flex;align-items:center;justify-content:space-between;
          gap:12px;flex-wrap:wrap;
          background:var(--accent-lt);border:1px solid var(--accent-bd);
          border-radius:12px;padding:14px 16px;margin-top:12px;
        }

        /* Trust strip */
        .hw-trust-item{
          display:flex;align-items:center;gap:6px;
          font-size:.79rem;color:var(--tx3);white-space:nowrap;
        }

        /* Ticker */
        .hw-tick{animation:hwTick 32s linear infinite;display:flex;}
        .hw-tick:hover{animation-play-state:paused;}

        /* Scroll cue */
        
        .hw-sc{animation:hwSC 2s ease-in-out infinite;}
      `}</style>

      <div className="hw" data-theme={dark ? "dark" : "light"}>
        <div className="hw-grid" />

        {/* Blobs */}
        <div style={{ position:"absolute", top:"-12%", right:"-6%", width:"clamp(300px,44vw,600px)", height:"clamp(300px,44vw,600px)", borderRadius:"50%", background:"radial-gradient(circle,var(--blob1) 0%,transparent 66%)", pointerEvents:"none" }} />
        <div style={{ position:"absolute", bottom:"-10%", left:"-4%", width:"clamp(200px,28vw,360px)", height:"clamp(200px,28vw,360px)", borderRadius:"50%", background:"radial-gradient(circle,var(--blob2) 0%,transparent 68%)", pointerEvents:"none" }} />

        <div className="hw-wrap" style={{ position:"relative", zIndex:1 }}>
          <div className="hw-grid-layout">

            {/* ══ LEFT ══════════════════════════════════════ */}
            <div>
              {/* Live pill */}
              <motion.div
                initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }}
                transition={{ duration:.48, ease:[.22,1,.36,1] }}
                className="hw-pill hw-pill-el" style={{ width:"fit-content" }}
              >
                <span className="hw-dot" />
                Technicians available now
              </motion.div>

              {/* Headline */}
              <motion.h1
                className="hw-serif"
                initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
                transition={{ duration:.6, delay:.08, ease:[.22,1,.36,1] }}
                style={{ fontSize:"clamp(2.3rem,4.6vw,3.75rem)", lineHeight:1.07, color:"var(--tx1)", marginBottom:18 }}
              >
                Your <TypingRotator /><br />
                Fixed Today —<br />
                <span style={{ fontStyle:"normal", fontSize:"clamp(1.5rem,3vw,2.4rem)", color:"var(--tx2)", fontWeight:400 }}>
                  At Your Doorstep.
                </span>
              </motion.h1>

              {/* Accent rule */}
              <motion.div
                className="hw-rule"
                initial={{ width:0, opacity:0 }} animate={{ width:52, opacity:.7 }}
                transition={{ duration:.5, delay:.22 }}
                style={{ height:3, borderRadius:2, background:"var(--accent)", marginBottom:20 }}
              />

              {/* Body copy */}
              <motion.p
                initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }}
                transition={{ duration:.55, delay:.28, ease:[.22,1,.36,1] }}
                style={{ fontSize:".96rem", lineHeight:1.84, color:"var(--tx2)", marginBottom:26, maxWidth:490 }}
              >
                Authorised multi-brand repair center for{" "}
                <strong style={{ color:"var(--tx1)", fontWeight:700 }}>Peddapalli &amp; Mancherial</strong>.
                Call before noon — our technician arrives{" "}
                <span style={{ color:"var(--accent)", fontWeight:600 }}>same day</span>, every single time.
              </motion.p>

              {/* Service chips */}
              <motion.div
                initial={{ opacity:0 }} animate={{ opacity:1 }}
                transition={{ delay:.34 }}
                className="hw-chips" style={{ marginBottom:26 }}
              >
                <ServiceChips />
              </motion.div>

              {/* CTA row */}
              <motion.div
                initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }}
                transition={{ duration:.5, delay:.44, ease:[.22,1,.36,1] }}
                className="hw-ctas" style={{ display:"flex", gap:12, flexWrap:"wrap", marginBottom:26 }}
              >
                <a href="tel:+919876543210" className="hw-btn-p">
                  <Phone size={16}/> +91 98765 43210
                </a>
                <Link to="/services" className="hw-btn-g">
                  Our Services <ArrowRight size={15}/>
                </Link>
              </motion.div>

              {/* Trust strip */}
              <motion.div
                initial={{ opacity:0 }} animate={{ opacity:1 }}
                transition={{ delay:.54 }}
                className="hw-trust" style={{ display:"flex", gap:18, flexWrap:"wrap" }}
              >
                {["Genuine OEM Parts","Same-Day Response","Doorstep Service","Free Diagnosis"].map((t, i) => (
                  <div key={i} className="hw-trust-item">
                    <CheckCircle size={13} style={{ color:"var(--accent)", flexShrink:0 }}/>
                    {t}
                  </div>
                ))}
              </motion.div>
            </div>

            {/* ══ RIGHT ══════════════════════════════════════ */}
            <motion.div
              className="hw-right"
              initial={{ opacity:0, x:22 }} animate={{ opacity:1, x:0 }}
              transition={{ duration:.7, delay:.14, ease:[.22,1,.36,1] }}
            >
              <div className="hw-panel">
                <div className="hw-dots" style={{ position:"absolute", inset:0, borderRadius:"inherit", pointerEvents:"none", opacity:.52 }} />
                <div style={{ position:"relative", zIndex:1, padding:14 }}>

                  {/* Device illustration */}
                  <div style={{ width:"100%", aspectRatio:"1.12/1" }}>
                    <Illustration dark={dark}/>
                  </div>

                  {/* Live counters */}
                  <Counters />

                  {/* Dispatch banner */}
                  <div className="hw-dispatch">
                    <div>
                      <div style={{ fontSize:".86rem", fontWeight:700, color:"var(--tx1)", marginBottom:2 }}>
                        Same-Day Doorstep Service
                      </div>
                      <div style={{ fontSize:".74rem", color:"var(--tx3)" }}>
                        Call before noon — we confirm your slot
                      </div>
                    </div>
                    <a href="tel:+919876543210" style={{
                      display:"inline-flex", alignItems:"center", gap:6,
                      background:"var(--accent)", color:"#fff",
                      fontSize:".8rem", fontWeight:700,
                      padding:"9px 16px", borderRadius:9, textDecoration:"none",
                      boxShadow:"0 4px 14px rgba(26,95,191,.28)", whiteSpace:"nowrap",
                    }}>
                      <Phone size={13}/> Call Now
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>

        {/* Scroll cue */}
        <div style={{ textAlign:"center", paddingBottom:22, position:"relative", zIndex:1 }}>
          <div className="hw-sc" style={{ display:"inline-flex", flexDirection:"column", alignItems:"center", gap:5, color:"var(--tx4)" }}>
            <div style={{ width:1, height:10, background:"var(--border-str)", borderRadius:2 }} />
            <span className="hw-mono" style={{ fontSize:".58rem", letterSpacing:".16em" }}>SCROLL</span>
          </div>
        </div>

        {/* Ticker */}
        <div style={{ borderTop:"1px solid var(--border)", borderBottom:"1px solid var(--border)", background:"var(--surface)", overflow:"hidden", padding:"10px 0" }}>
          <div className="hw-tick" style={{ whiteSpace:"nowrap", width:"fit-content" }}>
            {[...Array(4)].map((_,k)=>(
              <span key={k} className="hw-mono" style={{ color:"var(--tx3)", fontSize:".7rem", letterSpacing:".1em", display:"flex", alignItems:"center", gap:28, paddingRight:28 }}>
                {["LED TV Repair","AC Servicing","Refrigerator Repair","Washing Machine Fix","Home Theatre Setup","AMC Contracts","Genuine Parts","Doorstep Service"].map((item,j)=>(
                  <span key={j} style={{ display:"flex", alignItems:"center", gap:8 }}>
                    <span style={{ color:"var(--accent)", fontSize:".5rem" }}>◆</span>{item}
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>

      </div>
    </>
  );
};

export default HeroSection;