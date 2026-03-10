import { motion } from "framer-motion";

interface SectionHeadingProps {
  label?: string;
  title: string;
  description?: string;
  centered?: boolean;
  light?: boolean;
}

const SectionHeading = ({
  label,
  title,
  description,
  centered = true,
  light = false,
}: SectionHeadingProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      style={{ marginBottom: 44, textAlign: centered ? "center" : "left" }}
    >
      {label && (
        <span style={{
          display: "inline-block",
          fontFamily: "'DM Mono', monospace",
          fontSize: ".66rem",
          letterSpacing: ".2em",
          textTransform: "uppercase",
          color: light ? "rgba(255,255,255,.65)" : "var(--accent, #1A5FBF)",
          background: light ? "rgba(255,255,255,.1)" : "var(--accent-lt, #E8F1FD)",
          border: `1px solid ${light ? "rgba(255,255,255,.18)" : "var(--accent-bd, #BADAFF)"}`,
          padding: "5px 14px",
          borderRadius: 999,
          marginBottom: 12,
        }}>
          {label}
        </span>
      )}

      <h2 style={{
        fontFamily: "'DM Serif Display', Georgia, serif",
        fontSize: "clamp(1.7rem, 3.6vw, 2.5rem)",
        lineHeight: 1.15,
        color: light ? "#FFFFFF" : "var(--tx1, #0D1526)",
        marginBottom: description ? 14 : 0,
      }}>
        {title}
      </h2>

      {description && (
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: ".95rem",
          lineHeight: 1.78,
          color: light ? "rgba(255,255,255,.68)" : "var(--tx3, #5E7191)",
          maxWidth: 580,
          margin: centered ? "0 auto" : undefined,
        }}>
          {description}
        </p>
      )}
    </motion.div>
  );
};

export default SectionHeading;