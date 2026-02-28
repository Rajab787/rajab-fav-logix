"use client";

import { fetchUsers } from "@/api/users";
import { usePolygonStore } from "@/global/usePolygonStore";
import { useFetchWithLoader } from "@/lib/usefetchWithLoader";
import Image from "next/image";
import { useState, useMemo, useEffect } from "react";
import { polygonData, PolygonItem } from "../icons/hexagonicons";

/* ================= TYPES ================= */

interface User {
  id: string | number;
  firstName: string;
  lastName: string;
}

interface SidebarItemProps {
  icon: string;
  label: string;
  count?: number;
}

interface SidebarUserItemProps {
  label: string;
  count?: number;
  selected?: boolean;
}

interface SidebarGroupProps {
  title: string;
  children: React.ReactNode;
}

interface SidebarDropdownItemProps {
  icon: string;
  label: string;
  count?: number;
}

interface SidebarChannelItemProps {
  icon: string;
  label: string;
}

/* ================= SIDEBAR ================= */

const Sidebar = ({ openSidebar = false,   }: { openSidebar: boolean ,  
}) => {
   const { activePolygonId } = usePolygonStore();
 const { data, isLoading, isError } = useFetchWithLoader<{ users: User[] }>({
  queryKey: ["users", ],
  queryFn: fetchUsers,
  enabled:activePolygonId === "inbox",
  minLoadingTime: 3000,
});
  const users = useMemo(
    () =>
      data?.users?.slice(0, 10).map((user: User) => (
        <SidebarUserItem
          key={user.id}
          label={`${user.firstName} ${user.lastName}`}
          count={Math.floor(Math.random() * 5)}
        />
      )),
    [data?.users]
  );

  if (isError) {
    return <p className="px-2 text-sm text-red-500">Error loading users</p>;
  }

  return (
    <aside
      className={`shadow-sm lg:rounded-xl bg-[#FAFAF8]
      ${openSidebar ? "block" : "hidden"}
      md:block md:h-[calc(100vh-143.84px)]
      lg:h-[calc(100vh-70px)]
      xl:h-[calc(100vh-90px)]
      2xl:h-[calc(100vh-110px)]
      overflow-y-auto scrollbar-hide
      p-[1%] md:w-[60%] lg:w-[16%]`}
    >
      <h3 className="my-2 ml-[1rem]">Inbox</h3>

      <SidebarItem icon="/icons/inbox.svg" label="My Inbox" />
      <SidebarItem icon="/icons/all-people.svg" label="All" count={28} />
      <SidebarItem icon="/icons/Union.svg" label="Unassigned" count={5} />

      <Divider />

      <SidebarGroup title="Teams">
        <SidebarDropdownItem
          icon="/icons/people-bg-white.svg"
          label="Sales"
          count={7}
        />
        <SidebarDropdownItem
          icon="/icons/people-bg-white.svg"
          label="Customer Support"
          count={16}
        />
      </SidebarGroup>

      <Divider />

      <SidebarGroup title="Users">
        {isLoading ? <SidebarUsersSkeleton /> : users}
      </SidebarGroup>

      <Divider />

      <SidebarGroup title="Channels">
        <SidebarChannelItem
          icon="/icons/whatapp-icon.svg"
          label="WhatsApp"
        />
        <SidebarChannelItem icon="/icons/fit4life.svg" label="Fit4Life" />
      </SidebarGroup>
    </aside>
  );
};

export default Sidebar;

/* ================= ITEMS ================= */

const SidebarItem = ({ icon, label, count }: SidebarItemProps) => (
  <div className="flex items-center justify-between cursor-pointer rounded-lg hover:bg-gray-100 px-[6%] py-[4%]">
    <div className="flex items-center gap-2">
      <Image src={icon} alt={label} width={24} height={24}       className="size-[1.2rem] lg:size-[2vw] 2xl:size-[1.2rem]"
/>
      <h5>{label}</h5>
    </div>
    {count && <h5>{count}</h5>}
  </div>
);

/* ================= USER ITEM (FIXED) ================= */

const SidebarUserItem = ({ label, count }: SidebarUserItemProps) => {
  // ✅ Hook INSIDE component
  const bgColor = useMemo(() => {
    const colors = [
      "#F87171",
      "#60A5FA",
      "#34D399",
      "#FBBF24",
      "#A78BFA",
      "#F472B6",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }, []);

  const initials = label
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("");

  return (
    <div className="flex items-center justify-between cursor-pointer rounded-lg hover:bg-gray-100 px-[6%] py-[4%]">
      <div className="flex items-center gap-2">
        <div
          style={{ backgroundColor: bgColor }}
          className="size-8 lg:size-[1.6vw] 2xl:size-8 rounded-full flex items-center justify-center text-white font-bold"
        >
          <p>{initials}</p>
        </div>
        <h5>{label}</h5>
      </div>

      {count && <h5 className="font-bold">{count}</h5>}
    </div>
  );
};

/* ================= GROUP ================= */

const SidebarGroup = ({ title, children }: SidebarGroupProps) => {
  const [open, setOpen] = useState(true);

  return (
    <div className="mb-2">
      <div
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between cursor-pointer px-[6%] py-[4%]"
      >
        <h5>{title}</h5>
        <Image
          src="/icons/dropdown.svg"
          alt="toggle"
          width={16}
          height={16}
 className={`size-[0.61rem] lg:size-[0.51vw] 2xl:size-[0.61rem]  opacity-70 transition-transform duration-200 ${
      open ? "rotate-180" : "rotate-0"
    }`}        />
      </div>

      {open && <div>{children}</div>}
    </div>
  );
};

/* ================= OTHERS ================= */

const SidebarDropdownItem = ({ icon, label, count }: SidebarDropdownItemProps) => (
  <div className="flex items-center justify-between cursor-pointer rounded-lg hover:bg-gray-100 px-[6%] py-[4%]">
    <div className="flex items-center gap-2">
      <Image src={icon} alt={label} width={24} height={24}       className="size-[1.2rem] lg:size-[2vw] 2xl:size-[1.2rem]"
 />
      <h5>{label}</h5>
    </div>
    {count && <h5>{count}</h5>}
  </div>
);

const SidebarChannelItem = ({ icon, label }: SidebarChannelItemProps) => (
  <div className="flex items-center gap-2 cursor-pointer rounded-lg hover:bg-gray-100 px-[6%] py-[4%]">
    <Image src={icon} alt={label} width={24} height={24}       className="size-[1.2rem] lg:size-[2vw] 2xl:size-[1.2rem]"
/>
    <h5>{label}</h5>
  </div>
);

const Divider = () => <div className="my-3 border-b border-gray-200" />;

const SidebarUsersSkeleton = () => (
  <div className="space-y-2 px-[6%] py-[2%]">
    {Array.from({ length: 8 }).map((_, i) => (
      <div key={i} className="flex items-center gap-2">
        <div className="size-8 rounded-full bg-gray-200 animate-pulse" />
        <div className="flex-1 h-3 bg-gray-200 rounded animate-pulse" />
      </div>
    ))}
  </div>
);
