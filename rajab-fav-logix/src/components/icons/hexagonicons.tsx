import { AIIcon, CampaignIcon, InboxIcon, UserGroupFilledIcon, WorkflowIcon } from "@/icons/icons";
import { JSX } from "react";

export interface PolygonItem {
  id: string;                 // unique id
  label: string;              // display label
  icon: JSX.Element;          // React icon element
  position: string;           // Tailwind position classes
  size: string;               // Tailwind size classes
  href: string;               // link
}

export const polygonData: PolygonItem[] = [
  {
    id: "ai",
    label: "AI",
    icon: <AIIcon className="size-6 lg:size-6" />,
    position: "top-[10%] left-0 lg:top-[10%] lg:left-[25%]",
    size: "size-[6rem] md:size-[7rem] lg:size-[6vw] 2xl:size-20",
    href: "#",
  },
  {
    id: "inbox",
    label: "Inbox",
    icon: <InboxIcon className="size-4 lg:size-6" />,
    position: "top-[25%] left-[5%] lg:top-[25%] lg:left-[15%]",
    size: "size-[6rem] md:size-[7rem] lg:size-[5vw] 2xl:size-20",
    href: "/inbox",
  },
  {
    id: "contacts",
    label: "Contact Us",
    icon: <UserGroupFilledIcon className="size-4 lg:size-6" />,
    position: "top-[30%] left-[10%] lg:top-[30%] lg:left-[29%]",
    size: "size-[6rem] md:size-[7rem] lg:size-[5vw] 2xl:size-20",
    href: "#",
  },
  {
    id: "campaigns",
    label: "Compaigns",
    icon: <CampaignIcon className="size-4 lg:size-6 text-white" />,
    position: "top-[10%] right-[5%] lg:top-[10%] lg:right-[14%]",
    size: "size-[6rem] md:size-[7rem] lg:size-[5vw] 2xl:size-20",
    href: "#",
  },
  {
    id: "workflows",
    label: "Workflows",
    icon: <WorkflowIcon className="size-4 lg:size-5 text-white/80" />,
    position: "top-[20%] right-[10%] lg:top-[20%] lg:right-[25%]",
    size: "size-[6rem] md:size-[7rem] lg:size-[5vw] 2xl:size-20",
    href: "#",
  },
  {
    id: "Campaigns",
    label: "Campaigns",
    icon: <UserGroupFilledIcon className="size-4 text-white" />,
    position: "top-[30%] right-[5%] lg:top-[30%] lg:right-[10%]",
    size: "size-[6rem] md:size-[7rem] lg:size-[4vw] 2xl:size-20",
    href: "#",
  },
];
