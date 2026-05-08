import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Our Services | Vasu Electronics",
  description: "We offer repair and maintenance services for LED TVs, ACs, Refrigerators, Washing Machines, and Home Theaters with genuine parts and warranty.",
});

export default function ServicesLayout({ children }) {
  return <>{children}</>;
}
