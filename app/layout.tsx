import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import NavBar from "@/components/NavBar";
import SideBar from "@/components/SideBar";

export const metadata: Metadata = {
  title: "NDocument",
  description: "A simple document editor",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <NavBar />
          <div className="flex min-h-screen">
            <SideBar />
            <div className="flex-1 p-5 bg-slate-300 scrollbar-hide">
              {children}
            </div>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
