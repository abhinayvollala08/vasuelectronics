import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Contact Us | Vasu Electronics",
  description: "Get in touch with Vasu Electronics. Call us at +91 99121 72878 for same-day doorstep appliance repair across Peddapalli and Mancherial.",
});

export default function ContactLayout({ children }) {
  return <>{children}</>;
}
