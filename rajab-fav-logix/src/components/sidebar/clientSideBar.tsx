"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const SidebarDropdown = ({ item }: any) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-2">
      <button
        className="flex items-center justify-between w-full px-3 py-2 rounded-lg hover:bg-gray-100 transition-all"
        onClick={() => setOpen(!open)}
      >
        <span className="flex items-center gap-2 text-black font-medium">
          {item.icon && (
            <Image src={item.icon} alt={item.label} width={16} height={16} />
          )}
          {item.label}
        </span>

        <Image
          src="/main-img/arrow.png"
          width={16}
          height={16}
          alt="arrow"
          className={`transition-transform ${open ? "-rotate-90" : ""}`}
        />
      </button>

      <div
        className="overflow-hidden transition-all duration-300"
        style={{
          maxHeight: open ? `${item.subMenu.length * 40}px` : "0",
        }}
      >
        {item.subMenu.map((sub: any, idx: number) => (
          <Link
            key={idx}
            href={`/${sub.label.toLowerCase().replace(/\s+/g, "-")}`}
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-all text-black font-medium"
          >
            {sub.icon && (
              <Image src={sub.icon} alt={sub.label} width={16} height={16} />
            )}
            {sub.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SidebarDropdown;
