import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import NavBar from "@/components/NavBar";
import SideBar from "@/components/SideBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
  title: "NDocument",
  description:
    "A simple document editor with real-time collaboration , AI features",
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
            <>
              <div className="flex-1 p-5 bg-slate-300 scrollbar-hide">
                {children}
                <ToastContainer />
              </div>
            </>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
