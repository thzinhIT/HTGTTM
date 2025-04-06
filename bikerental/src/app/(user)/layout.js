import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Geist, Geist_Mono } from "next/font/google";
import "../../app/globals.css";
import Header from "./header/page";
import Footer from "./footer/page";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ToastContainer, toast, Bounce } from "react-toastify";

export default function RootLayout({ children }) {
  // Kiểm tra nếu đường dẫn không phải là /admin hoặc các trang con của /admin

  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col ">
        <Header />

        <main className="flex-1 w-[full] mt-[110px]">{children}</main>

        <Footer />

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
