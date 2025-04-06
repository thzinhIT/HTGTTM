"use client";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./header/page";
import Footer from "./footer/page";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { usePathname } from "next/navigation";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Bike Rental",
  description: "Bike Rental",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  const pathname = usePathname();

  // Kiểm tra nếu đường dẫn không phải là /admin hoặc các trang con của /admin
  const isAdminRoute = pathname.startsWith("/admin");
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col ">
        {isAdminRoute ? (
          <div className="flex flex-col w-full h-screen">
            <SidebarProvider>
              <AppSidebar />
              <SidebarTrigger />
              {children}
            </SidebarProvider>
          </div>
        ) : (
          <>
            <Header />

            <main className="flex-1 w-[full] mt-[110px]">{children}</main>

            <Footer />
          </>
        )}

        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
      </body>
    </html>
  );
}
