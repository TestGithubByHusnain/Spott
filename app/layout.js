import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Footer from "@/components/footer";
import Header from "@/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Spott - Delightful Events Start Here",
  description: "Discover and create amazing events",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-linear-to-br from-gray-950 via-zinc-900 to-stone-900 text-white">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >

          {/* Header */}

          <Header />
          <main className="relative min-h-screen container mx-auto pt-40 md:pt-32">
                {/* Background glow effects (behind everything) */}
                <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
                  <div className="absolute top-0 left-1/4 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl" />
                  <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-600/20 rounded-full blur-3xl" />
                </div>

          {/* Page content (above glow) */}
                <div className="relative z-10">{children}</div>
                <Footer />
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
