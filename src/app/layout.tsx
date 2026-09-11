import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
  weight: ["700"],
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aahaar.ai"),
  title: "Aahaar AI — Ancient Wisdom Meets Algorithmic Nutrition",
  description:
    "AI-native diet, fitness, and grocery-scanning platform. Join the waitlist for early access to personalized nutrition powered by ancient wisdom and modern AI.",
  openGraph: {
    title: "Aahaar AI — Launching Soon",
    description:
      "Ancient Wisdom Meets Algorithmic Nutrition. Join the waitlist.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aahaar AI — Launching Soon",
    description: "Ancient Wisdom Meets Algorithmic Nutrition.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable}`}
    >
      <body>
        {children}
        <Toaster
          position="bottom-center"
          toastOptions={{
            style: {
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              color: "white",
              backdropFilter: "blur(12px)",
              fontFamily: "var(--font-inter)",
            },
          }}
        />
      </body>
    </html>
  );
}
