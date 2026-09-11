import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { SmoothScrolling } from "@/components/smooth-scrolling";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Computer Science Dept - Debra College",
  description: "Official Website of the Department of Computer Science at Debra Thana Sahid Kshudiram Smriti Mahavidyalaya",
  openGraph: {
    title: "Computer Science Dept - Debra College",
    description: "Official Website of the Department of Computer Science at Debra Thana Sahid Kshudiram Smriti Mahavidyalaya",
    url: "https://dept-cs.vercel.app", // Placeholder URL
    siteName: "DeptCS",
    images: [
      {
        url: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1200&h=630&auto=format&fit=crop", 
        width: 1200,
        height: 630,
        alt: "Dept of CS",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Computer Science Dept - Debra College",
    description: "Official Website of the Department of Computer Science at Debra Thana Sahid Kshudiram Smriti Mahavidyalaya",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${outfit.variable}`} data-scroll-behavior="smooth">
      <body className="min-h-screen flex flex-col bg-background font-sans antialiased selection:bg-primary/30">
        <SmoothScrolling>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </ThemeProvider>
        </SmoothScrolling>
      </body>
    </html>
  );
}
