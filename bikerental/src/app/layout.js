import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./(user)/header/page";
import Footer from "./(user)/footer/page";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ToastContainer, toast, Bounce } from "react-toastify";

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

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col ">
        <main className="">{children}</main>

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
