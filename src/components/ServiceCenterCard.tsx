import { motion } from "framer-motion";
import { MapPin, Clock, Phone, Mail, Navigation } from "lucide-react";
import { MotionProps } from "framer-motion";
const fadeUp = (delay = 0): MotionProps => ({
  initial:     { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0, transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] } },
  viewport:    { once: true, margin: "-40px" },
});

const ServiceCenterCard = () => {
  return (
    <>
      <style>{`
        .tt-scc-section {
          padding: 88px 0;
          background: var(--subtle, #ECF0F7);
          position: relative;
        }

        /* Card */
        .tt-scc-card {
          max-width: 680px; margin: 0 auto;
          background: var(--surface, #FFFFFF);
          border: 1px solid var(--border, #D9E1EE);
          border-radius: 18px;
          overflow: hidden;
          box-shadow: var(--sh-md, 0 4px 16px rgba(13,21,38,.08));
          transition: box-shadow .3s ease;
        }
        .tt-scc-card:hover {
          box-shadow: var(--sh-lg, 0 16px 48px rgba(13,21,38,.10));
        }

        /* Map frame */
        .tt-scc-map {
          width: 100%; height: 220px;
          display: block; border: none;
          border-bottom: 1px solid var(--border, #D9E1EE);
        }

        /* Body */
        .tt-scc-body { padding: 28px 32px 32px; }
        @media(max-width:520px){ .tt-scc-body{ padding:22px 20px 26px; } }

        .tt-scc-title {
          font-family: 'DM Serif Display', serif;
          font-size: 1.25rem;
          color: var(--tx1, #0D1526);
          margin-bottom: 20px;
          line-height: 1.2;
        }

        /* Info rows */
        .tt-scc-row {
          display: flex; align-items: flex-start; gap: 12px;
          font-family: 'DM Sans', sans-serif;
          font-size: .86rem;
          color: var(--tx3, #5E7191);
          line-height: 1.6;
          text-decoration: none;
          transition: color .2s;
        }
        .tt-scc-row + .tt-scc-row { margin-top: 13px; }
        a.tt-scc-row:hover { color: var(--accent, #1A5FBF); }

        /* Icon badge */
        .tt-scc-ib {
          width: 32px; height: 32px; border-radius: 8px;
          background: var(--accent-lt, #E8F1FD);
          border: 1px solid var(--accent-bd, #BADAFF);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; margin-top: 1px;
        }

        /* Divider */
        .tt-scc-hr {
          height: 1px; background: var(--border, #D9E1EE);
          margin: 22px 0;
        }

        /* Directions button */
        .tt-scc-btn {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          width: 100%; padding: 13px 20px; border-radius: 10px;
          background: var(--accent, #1A5FBF); color: #fff;
          font-family: 'DM Sans', sans-serif; font-weight: 600; font-size: .9rem;
          text-decoration: none; border: none; cursor: pointer;
          box-shadow: 0 4px 16px rgba(26,95,191,.28);
          transition: background .2s, transform .2s, box-shadow .2s;
          letter-spacing: .01em;
        }
        .tt-scc-btn:hover {
          background: var(--accent-h, #154FA3);
          transform: translateY(-1px);
          box-shadow: 0 7px 22px rgba(26,95,191,.36);
        }

        /* Hours badge */
        .tt-scc-open {
          display: inline-flex; align-items: center; gap: 6px;
          font-family: 'DM Mono', monospace;
          font-size: .65rem; letter-spacing: .1em;
          color: #15803D;
          background: #DCFCE7;
          border: 1px solid #BBF7D0;
          padding: 4px 10px; border-radius: 999px;
          margin-bottom: 20px;
        }
        @keyframes ttSccPulse { 0%,100%{opacity:1} 50%{opacity:.3} }
        .tt-scc-pulse { animation: ttSccPulse 1.8s ease-in-out infinite; }
      `}</style>

      <section className="tt-scc-section">
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 24px" }}>

          {/* Header */}
          <motion.div {...fadeUp(0)} style={{ textAlign: "center", marginBottom: 44 }}>
            <span style={{
              display: "inline-block",
              fontFamily: "'DM Mono',monospace",
              fontSize: ".66rem", letterSpacing: ".2em",
              textTransform: "uppercase", color: "var(--accent, #1A5FBF)",
              background: "var(--accent-lt, #E8F1FD)",
              border: "1px solid var(--accent-bd, #BADAFF)",
              padding: "5px 14px", borderRadius: 999, marginBottom: 12,
            }}>
              Visit Us
            </span>
            <h2 style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "clamp(1.7rem,3.6vw,2.5rem)",
              color: "var(--tx1, #0D1526)", lineHeight: 1.15,
            }}>
              Our Service Center
            </h2>
          </motion.div>

          {/* Card */}
          <motion.div {...fadeUp(0.1)} className="tt-scc-card">

            {/* Map */}
            <iframe
              title="TechnoTV Location"
              // src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15111.18382674589!2d79.47424400000001!3d18.762649!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a32ce9c5ca19d75%3A0xbd503add23ac3ef5!2sVASU%20ELECTRONICS%20F%26D%20LED!5e0!3m2!1sen!2sin!4v1776778697315!5m2!1sen!2sin"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3777.795948121903!2d79.47166907475636!3d18.76264938237851!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a32ce9c5ca19d75%3A0xbd503add23ac3ef5!2sVASU%20ELECTRONICS%20F%26D%20LED!5e0!3m2!1sen!2sin!4v1773137688612!5m2!1sen!2sin"
              className="tt-scc-map"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />

            {/* Info body */}
            <div className="tt-scc-body">

              {/* Open badge */}
              <div className="tt-scc-open">
                <span className="tt-scc-pulse" style={{ width: 6, height: 6, borderRadius: "50%", background: "#16A34A", display: "inline-block" }} />
                MON – SAT &nbsp; 9 AM – 7 PM
              </div>

              <h3 className="tt-scc-title">TechnoTV Electronics &amp; Home Theater</h3>

              {/* Info rows */}
              <div className="tt-scc-row">
                <div className="tt-scc-ib"><MapPin size={14} style={{ color: "var(--accent, #1A5FBF)" }} /></div>
                <span>Peddapalli &amp; Mancherial Districts, Telangana, India</span>
              </div>

              <div className="tt-scc-row">
                <div className="tt-scc-ib"><Clock size={14} style={{ color: "var(--accent, #1A5FBF)" }} /></div>
                <span>Mon – Sat: 9:00 AM – 7:00 PM &nbsp;|&nbsp; Sun: Closed</span>
              </div>

              <a href="tel:+919912172878" className="tt-scc-row">
                <div className="tt-scc-ib"><Phone size={14} style={{ color: "var(--accent, #1A5FBF)" }} /></div>
                <span>+91 99121 72878</span>
              </a>

              <a href="mailto:vasuelectronics97@gmail.com" className="tt-scc-row">
                <div className="tt-scc-ib"><Mail size={14} style={{ color: "var(--accent, #1A5FBF)" }} /></div>
                <span>vasuelectronics97@gmail.com</span>
              </a>

              <div className="tt-scc-hr" />

              {/* Directions CTA */}
              <a
                href="https://www.google.com/maps/dir//Peddapalli,+Telangana"
                target="_blank"
                rel="noopener noreferrer"
                className="tt-scc-btn"
              >
                <Navigation size={16} />
                Get Directions
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default ServiceCenterCard;