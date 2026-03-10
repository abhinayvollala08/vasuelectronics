import { motion } from "framer-motion";

const brandsRow1 = [
  "Samsung", "LG", "Sony", "Panasonic", "Whirlpool", "Haier",
  "Godrej", "Voltas", "Daikin", "Hitachi", "Toshiba", "TCL",
];
const brandsRow2 = [
  "Philips", "Onida", "Videocon", "Micromax", "Sansui", "BPL",
  "Lloyd", "Carrier", "Blue Star", "Crompton", "Bosch", "IFB",
];

const MarqueeRow = ({
  brands,
  direction,
}: {
  brands: string[];
  direction: "left" | "right";
}) => {
  const doubled = [...brands, ...brands];
  return (
    <div style={{ overflow: "hidden", padding: "6px 0" }}>
      <motion.div
        style={{ display: "flex", gap: 12, width: "max-content" }}
        animate={{
          x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
        }}
        transition={{ duration: 28, ease: "linear", repeat: Infinity }}
      >
        {doubled.map((brand, i) => (
          <div
            key={`${brand}-${i}`}
            style={{
              padding: "12px 28px",
              borderRadius: 10,
              background: "var(--surface)",
              border: "1px solid var(--border)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minWidth: 148,
              boxShadow: "var(--sh-sm)",
              transition: "border-color .22s, box-shadow .22s, transform .22s",
              cursor: "default",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLDivElement;
              el.style.borderColor = "var(--accent-bd)";
              el.style.boxShadow = "var(--sh-md)";
              el.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLDivElement;
              el.style.borderColor = "var(--border)";
              el.style.boxShadow = "var(--sh-sm)";
              el.style.transform = "translateY(0)";
            }}
          >
            {/* Left accent dot */}
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "var(--accent)",
                opacity: 0.5,
                marginRight: 10,
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontWeight: 600,
                fontSize: ".85rem",
                color: "var(--tx2)",
                letterSpacing: ".01em",
              }}
            >
              {brand}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const BrandsMarquee = () => {
  return (
    <section
      style={{
        background: "var(--bg)",
        padding: "0 0 16px",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Dot-grid texture */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle, var(--dot-c, rgba(27,101,200,.07)) 1.2px, transparent 1.2px)",
          backgroundSize: "26px 26px",
          pointerEvents: "none",
          opacity: 0.6,
        }}
      />

      {/* Left / right fade masks */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(90deg, var(--bg) 0%, transparent 8%, transparent 92%, var(--bg) 100%)",
          pointerEvents: "none",
          zIndex: 2,
        }}
      />

      <div style={{ position: "relative", zIndex: 1 }}>
        <MarqueeRow brands={brandsRow1} direction="left" />
        <MarqueeRow brands={brandsRow2} direction="right" />
      </div>

      {/* Bottom label */}
      <div
        style={{
          textAlign: "center",
          marginTop: 18,
          position: "relative",
          zIndex: 1,
        }}
      >
        <span
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: ".68rem",
            letterSpacing: ".16em",
            textTransform: "uppercase",
            color: "var(--tx4)",
          }}
        >
          24+ authorized brands
        </span>
      </div>
    </section>
  );
};

export default BrandsMarquee;