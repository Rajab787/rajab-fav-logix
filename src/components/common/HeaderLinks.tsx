"use client";

import Link from "next/link";
import {
  AiEmployeesIcon,
  CampaignsIcon,
  ContactsIcon,
  WorkflowsIcon,
  HomeIcon,
  HeaderInboxIcon,
} from "@/icons/icons";
import { usePathname } from "next/navigation";
import { NavbarData } from "@/data/navbar";
import { polygonData, PolygonItem } from "../icons/hexagonicons";
import { cloneElement, isValidElement } from "react";

const iconMap = {
  home: HomeIcon,
  inbox: HeaderInboxIcon,
  contacts: ContactsIcon,
  ai: AiEmployeesIcon,
  workflows: WorkflowsIcon,
  campaigns: CampaignsIcon,
};

type NavbarItem = {
  label: string;
  link: string;
  icon: keyof typeof iconMap;
};

const HeaderLinks = ({selectedPolygon,handlePolygonClick}:{selectedPolygon?:string,handlePolygonClick:(item:PolygonItem)=>void}) => {
  const pathname = usePathname();
console.log("Selected Polygon in Header:s", selectedPolygon);

  return (
    <div className="hidden lg:flex items-center gap-x-[2%]">
      {polygonData?.map((item: PolygonItem, index: number) => {
        const isActive =
          selectedPolygon === item.label;

const renderSelectedIcon = () => {
  if (!item.icon) return null;

  if (isValidElement(item.icon)) {
    return cloneElement(item.icon, {
      className:
        `${isActive ? "text-black" : "text-gray-500"}  ${item.label==="Inbox"?"2xl:size-4 size-4 lg:size-[0.3vw]":"2xl:size-6 size-6 lg:size-[0.5vw]"}`, // 👈 size + blue
    });
  }

  return item.icon;
};
        return (
        <button
  key={index} onClick={()=>handlePolygonClick(item)}
  className={`
    flex items-center gap-x-[10%]
    px-[2%] py-[0.5%]
    lg:rounded-[0.5vw]
    transition-all
    ${isActive ? item.label==="Inbox"?"px-[3%] py-[1.5%] bg-[#EFF2F2]":"bg-[#EFF2F2] " : "bg-white"}
  `}
>
  {renderSelectedIcon()}
  {/* <IconComp
    className={`
      lg:size-[1.8vw] 2xl:size-[1.8rem]
      transition-colors
      ${isActive ? "text-black" : "text-gray-500"}
    `}
  /> */}
  <h6 className="font-bold">{item.label}</h6>
</button>
);
      })}
    </div>
  );
};

export default HeaderLinks;
