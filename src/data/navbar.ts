
export interface MenuItem {
  label: string;
  icon: React.FC<{ className?: string }>;   // ✅ FIXED
}

export interface NavbarDataType {
  logo: string;
  menu: MenuItem[];
  settingsIcon: string;
}


export interface MenuItem {
  label: string;
  icon: React.FC<{ className?: string }>;   // ✅ FIXED
}

export interface NavbarDataType {
  logo: string;
  menu: MenuItem[];
  settingsIcon: string;
}

export const NavbarData = {
  logo: "/main-img/BOXpad.png",
  menu: [
    { label: "Inbox", icon: "inbox" as const, link: "/dashboard/inbox" },
    { label: "Contact Us", icon: "contacts" as const, link: "/dashboard/contacts" },
    { label: "AI", icon: "ai" as const, link: "/dashboard/ai-employees" },
    { label: "Workflows", icon: "workflows" as const, link: "/dashboard/workflows" },
    { label: "Campaigns", icon: "campaigns" as const, link: "/dashboard/campaigns" },
  ],
  settingsIcon: "/main-img/setting.svg",
};