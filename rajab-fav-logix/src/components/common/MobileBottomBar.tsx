"use client";

import Image from "next/image";
import { NavbarData } from "@/data/navbar";
import { polygonData, PolygonItem } from "../icons/hexagonicons";
import { cloneElement, isValidElement } from "react";

export default function BottomNav({
  selectedPolygon,
  handlePolygonClick,
}: {
  selectedPolygon?: string;
  handlePolygonClick: (item: PolygonItem) => void;
}) {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t-2 border-gray-300 shadow-md flex justify-between px-2 py-4 lg:hidden z-50">
      
      {/* Polygon buttons */}
      {polygonData?.map((item: PolygonItem, index: number) => {
        const isActive = selectedPolygon === item.label;

        // Render icon with active color
        const renderSelectedIcon = () => {
          if (!item.icon) return null;
          if (isValidElement(item.icon)) {
            return cloneElement(item.icon, {
              className: `
                transition-all
                ${isActive ? "text-[#007AEC]" : "text-gray-500"}
                ${item.label === "Inbox"
                  ? "2xl:size-4 size-4 lg:size-[0.3vw]"
                  : "2xl:size-6 size-6 lg:size-[0.5vw]"}
              `,
            });
          }
          return item.icon;
        };

        return (
          <button
            key={index}
            onClick={() => handlePolygonClick(item)}
            className={`
              flex items-center flex-col justify-center gap-y-1 w-full
              px-[2%] py-[0.5%] transition-all rounded-md
              ${isActive ? "bg-[#EFF2F2]" : "bg-white"}
            `}
          >
            {renderSelectedIcon()}
            <h6
              className={`body1 mt-1 hidden md:block transition-colors ${
                isActive ? "text-[#007AEC] font-medium" : "text-gray-500"
              }`}
            >
              {item.label}
            </h6>
          </button>
        );
      })}

   <div
            className="flex flex-col items-center justify-center w-full"
          >
                   <Image
  height={18}
  width={18}
  src={NavbarData.settingsIcon}
  alt="settings icon"
  className="block lg:hidden " 
 />
            <h6
              className={`hidden md:block body1 mt-1` }
            >
              Settings
            </h6>
    </div>     </div>
  );
}