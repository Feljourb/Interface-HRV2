import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Noor HR Dashboard",
  description: "Modern dashboard UI for HR management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="font-sans h-full bg-slate-50 text-slate-900 selection:bg-blue-100 selection:text-blue-900">
        <div className="flex h-full flex-col md:flex-row">
          {/* Sidebar for desktop */}
          <div className="hidden md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-20">
            <Sidebar />
          </div>
          
          <div className="md:pl-72 flex flex-1 flex-col min-h-screen">
            <Header />
            <main className="flex-1">
              <div className="py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                  {children}
                </div>
              </div>
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
