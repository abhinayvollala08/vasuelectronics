import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "About Us | Vasu Electronics",
  description: "Learn about Vasu Electronics, a trusted multi-brand appliance service center in Peddapalli and Mancherial with over 10 years of experience.",
});

export default function AboutLayout({ children }) {
  return <>{children}</>;
}
