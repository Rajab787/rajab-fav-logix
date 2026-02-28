// SidebarData.ts

export interface MenuItem {
  label: string;
  icon?: string; // optional, for items without icons
  number?: number; // optional, for items with counts
  subMenu?: MenuItem[]; // optional, for dropdowns
}

export const SidebarData: MenuItem[] = [
  {
    label: "My Inbox",
    icon: "/main-img/iconamoon_profile-fill.png",
  },
  {
    label: "All",
    icon: "/main-img/ic_baseline-people.png",
    number: 42,
  },
  {
    label: "Unassigned",
    icon: "/main-img/Frame 136.png",
    number: 7,
  },
  {
    label: "Team",
    subMenu: [
      { label: "Sales", icon: "/main-img/team.png" },
      { label: "Customer Support", icon: "/main-img/team.png" },
    ],
  },
  {
    label: "Users",
    subMenu: [
      { label: "User 1", icon: "/main-img/user.png" },
      { label: "User 2", icon: "/main-img/user.png" },
      { label: "User 3", icon: "/main-img/user.png" },
    ],
  },
   {
    label: "Channel",
    subMenu: [
      { label: "Fit 4 Life ", icon: "/main-img/whatsapp.png" },
      { label: "Fit 4 Life ", icon: "/main-img/insta.png" },
    ],
  },
];
