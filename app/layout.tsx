import type { Metadata, Viewport } from "next";
import "./globals.css";
import Nav from "@/components/nav";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://leetprep.nebular.art"),
  title: {
    default: "LeetPrep Studio -- The Interview Prep Platform That Teaches",
    template: "%s | LeetPrep Studio",
  },
  description:
    "Master FAANG-level interviews with AI tutoring across coding, behavioral, and system design. Three-tier explanations. Company-specific playbooks. Built by Nebular Labs.",
  openGraph: {
    title: "LeetPrep Studio",
    description:
      "AI-powered interview prep for Meta, Amazon, Google, Apple, Netflix and more.",
    url: "https://leetprep.nebular.art",
    siteName: "LeetPrep Studio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LeetPrep Studio",
    description: "Interview prep, asha-aligned. By Nebular Labs.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0f1a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Nav />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
