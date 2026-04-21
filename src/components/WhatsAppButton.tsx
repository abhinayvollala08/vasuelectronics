import { motion } from "framer-motion";

/* Official WhatsApp green — intentionally hardcoded, not theme-dependent */
const WA_GREEN      = "#25D366";
const WA_GREEN_DARK = "#1EBE5A";

/* Official WhatsApp SVG icon (more accurate than MessageCircle) */
const WhatsAppIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const WhatsAppButton = () => {
  return (
    <>
      <style>{`
        /* Ripple ring animation */
        @keyframes ttWaRipple {
          0%   { transform: scale(1);   opacity: .55; }
          100% { transform: scale(1.8); opacity: 0;   }
        }
        .tt-wa-ripple {
          position: absolute; inset: 0; border-radius: 50%;
          background: ${WA_GREEN};
          animation: ttWaRipple 2.2s ease-out infinite;
          pointer-events: none;
        }
        .tt-wa-ripple-2 {
          animation-delay: .9s;
        }

        /* Button */
        .tt-wa-btn {
          position: fixed; bottom: 24px; right: 24px; z-index: 9500;
          width: 54px; height: 54px; border-radius: 50%;
          background: ${WA_GREEN};
          color: #fff;
          display: flex; align-items: center; justify-content: center;
          box-shadow:
            0 4px 16px rgba(37,211,102,.40),
            0 2px 6px rgba(0,0,0,.14);
          text-decoration: none;
          transition:
            background .2s ease,
            box-shadow .2s ease,
            transform .2s cubic-bezier(.22,1,.36,1);
          /* Tooltip */
          position: fixed;
        }
        .tt-wa-btn:hover {
          background: ${WA_GREEN_DARK};
          box-shadow:
            0 8px 28px rgba(37,211,102,.50),
            0 3px 10px rgba(0,0,0,.16);
          transform: scale(1.08) translateY(-2px);
        }
        .tt-wa-btn:hover .tt-wa-tooltip { opacity: 1; transform: translateX(0); pointer-events: auto; }

        /* Tooltip */
        .tt-wa-tooltip {
          position: absolute; right: calc(100% + 12px); top: 50%;
          transform: translateX(6px) translateY(-50%);
          background: var(--surface, #fff);
          border: 1px solid var(--border, #D9E1EE);
          border-radius: 10px;
          padding: 8px 13px;
          white-space: nowrap;
          box-shadow: var(--sh-md, 0 4px 16px rgba(13,21,38,.08));
          opacity: 0;
          pointer-events: none;
          transition: opacity .22s ease, transform .22s ease;
        }
        .tt-wa-tooltip-title {
          font-family: 'DM Sans', sans-serif;
          font-size: .82rem; font-weight: 600;
          color: var(--tx1, #0D1526);
          display: block; margin-bottom: 2px;
        }
        .tt-wa-tooltip-sub {
          font-family: 'DM Mono', monospace;
          font-size: .65rem; letter-spacing: .06em;
          color: var(--tx3, #5E7191);
          display: block;
        }
        /* Tooltip arrow */
        .tt-wa-tooltip::after {
          content: '';
          position: absolute; top: 50%; right: -5px;
          transform: translateY(-50%) rotate(45deg);
          width: 8px; height: 8px;
          background: var(--surface, #fff);
          border-top: 1px solid var(--border, #D9E1EE);
          border-right: 1px solid var(--border, #D9E1EE);
        }

        @media(max-width:520px){
          .tt-wa-btn { bottom: 16px; right: 16px; width: 50px; height: 50px; }
          .tt-wa-tooltip { display: none; }
        }
      `}</style>

      <motion.a
        href="https://wa.me/919912172878?text=Hi%20Vasu%20Electronics%20I%20need%20service%20for%20my%20electronics."
        target="_blank"
        rel="noopener noreferrer"
        className="tt-wa-btn"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, type: "spring", stiffness: 220, damping: 18 }}
        aria-label="Chat on WhatsApp"
      >
        {/* Ripple rings */}
        <span className="tt-wa-ripple" />
        <span className="tt-wa-ripple tt-wa-ripple-2" />

        {/* Icon */}
        <WhatsAppIcon />

        {/* Hover tooltip */}
        <div className="tt-wa-tooltip">
          <span className="tt-wa-tooltip-title">Chat on WhatsApp</span>
          <span className="tt-wa-tooltip-sub">Typically replies in minutes</span>
        </div>
      </motion.a>
    </>
  );
};

export default WhatsAppButton;