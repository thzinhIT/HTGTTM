"use client";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import React from "react";
import { Sidebar } from "@/components/ui/sidebar";

export default function Layout({ children }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        {/* Sidebar có chiều rộng cố định */}
        <AppSidebar />

        {/* Main content chiếm hết phần còn lại */}
        <div className="flex flex-col flex-1">
          <SidebarTrigger className="pl-2" />
          <main className="flex-1 p-4">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
