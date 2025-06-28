import {
  Calendar,
  Home,
  Inbox,
  Search,
  Settings,
  Users,
  IdCard,
  Ticket,
  LogOut,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/admin/home",
    icon: Home,
  },
  {
    title: "Users",
    url: "/admin/list-users",
    icon: Users,
  },
  {
    title: "Cards",
    url: "/admin/list-cards",
    icon: IdCard,
  },
  {
    title: "Tickets",
    url: "/admin/list-tickets",
    icon: Ticket,
  },
  {
    title: "Prices",
    url: "/admin/list-prices",
    icon: Ticket,
  },
  {
    title: "Log Out",
    url: "/",
    icon: LogOut,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className={""}>Admin</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
