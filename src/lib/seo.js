/**
 * This utility function constructs Next.js Metadata objects for pages.
 * Edit these default values once, and they will apply across your entire site.
 */
export function constructMetadata({
  title = "Vasu Electronics | Expert TV & Appliance Repair",
  description = "Authorised multi-brand service center in Peddapalli and Mancherial. We fix LED, LCD TVs, ACs, Washing Machines, and Home Theaters with same-day doorstep service.",
  image = "/logo5.png",
  icons = "/logo-sqr.ico",
  noIndex = false,
  keywords = ["TV repair", "AC service", "Washing machine repair", "Home Theater setup", "Peddapalli", "Mancherial", "Vasu Electronics", "electronics service center"],
} = {}) {
  const domain = "https://www.vasuelectronics.shop";

  return {
    title,
    description,
    keywords: keywords.join(", "),
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
        },
      ],
      url: domain,
      siteName: "Vasu Electronics",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    icons,
    metadataBase: new URL(domain),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}
