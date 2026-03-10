import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import WhatsAppButton from "./WhatsAppButton";
import { useDarkMode } from "@/components/Header";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { dark } = useDarkMode();

  return (
    <div
      className="min-h-screen flex flex-col"
      data-theme={dark ? "dark" : "light"}
      style={{
        background: dark ? "#0B0E17" : "#F4F6FA",
        transition: "background .3s ease",
      }}
    >
      <Header />
      {/* pt-16 clears the 64px fixed header; bumps to pt-14 when scrolled (56px) */}
      <main className="flex-1" style={{ paddingTop: 64 }}>
        {children}
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Layout;