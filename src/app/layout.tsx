import type { Metadata } from "next";
import "./globals.css";
import TopBar from "@/components/topBar";
import Providers from "@/providers";
import Footer from "@/components/shared/Footer";

export const metadata: Metadata = {
  title: "FunCraft",
  description: "A Ecommerce Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`antialiased bg-rootBackground`}
        suppressHydrationWarning
      >
        <Providers
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TopBar />
          <div className="container min-h-[80vh] mx-auto px-2">{children}</div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
