"use client";

import { fetchDetail } from "@/api/detailuser";
import { useChatDetailStore } from "@/global/chatDetailPanel";
import { usePolygonStore } from "@/global/usePolygonStore";
import { useFetchWithLoader } from "@/lib/usefetchWithLoader";
import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";
import { PolygonItem } from "./icons/hexagonicons";

interface UserDetail {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  avatar?: string;
  company?: {
    department?: string;
  };
}

const NotesSkeleton = () => (
  <div className="space-y-2 mt-[2%] animate-pulse">
    <div className="h-8 w-full bg-[#F5E096]/50 rounded-md" />
    <div className="h-12 w-full bg-[#F5E096]/50 rounded-md" />
  </div>
);

const RowSkeleton = () => (
  <div className="flex items-center mt-[1%] gap-x-[4%] animate-pulse">
    {/* label */}
    <div className="w-[40%] h-4 bg-gray-200 rounded" />

    {/* value */}
    <div className="flex items-center gap-x-[4%] flex-1">
      <div className="w-4 h-4 bg-gray-200 rounded" />
      <div className="h-4 w-[60%] bg-gray-200 rounded" />
    </div>
  </div>
);

const LabelsSkeleton = () => (
  <div className="flex flex-wrap gap-x-[0.6rem] mt-[2%] animate-pulse">
    <div className="h-7 w-20 bg-gray-200 rounded-full" />
    <div className="h-7 w-16 bg-gray-200 rounded-full" />
    <div className="h-7 w-7 bg-gray-200 rounded-full" />
  </div>
);

const SidebarGroupSkeleton = ({ title }: { title: string }) => (
  <div className="px-4 lg:px-[4%] py-4 lg:py-[2%] animate-pulse">
    <div className="flex items-center justify-between mb-[4%]">
      <div className="h-4 w-[30%] bg-gray-200 rounded" />
      <div className="w-4 h-4 bg-gray-200 rounded" />
    </div>

    <RowSkeleton />
    <RowSkeleton />
  </div>
);


const Divider = () => <div className="border-t border-gray-200 mx-4" />;

export default function DetailsPanel({
  selectedPolygon,open
}: {
  selectedPolygon: PolygonItem | null;open:boolean
})  {
const { stage,  } = usePolygonStore();
const { data: user, isLoading } =
  useFetchWithLoader<UserDetail>({
    queryKey: ["detail"],
    queryFn: fetchDetail,
  enabled: selectedPolygon?.id === "inbox",
    minLoadingTime: 3000,
  });


const { isChatDetailsOpen, toggleChatDetails } = useChatDetailStore();


  return (
      <aside
      className={clsx(
        open ? "block" : "hidden",
        "lg:block",
        "lg:shadow-sm lg:rounded-xl lg:bg-[#FAFAF8]", 
        "h-[calc(100vh-100px)] lg:h-[calc(100vh-70px)] xl:h-[calc(100vh-90px)] 2xl:h-[calc(100vh-110px)]",
        "transition-all duration-700 ease-in-out scrollbar-hide overflow-y-auto w-full",
        {
          "lg:max-w-[20%] lg:opacity-100": isChatDetailsOpen,
          "lg:max-w-0 lg:opacity-0": !isChatDetailsOpen,
        }
      )}
    >
       <div
    className={`
      transition-all duration-1000 ease-in-out
      ${isChatDetailsOpen ? "opacity-100" : "opacity-0"}
    `}
  >
      {/* Header */}
      <header className="p-[0.9rem] lg:p-[0.9vw] 2xl:p-[0.9rem] flex items-center justify-between border-b border-gray-300">
        <h4 className="font-bold">Details</h4>
        {(!open || isChatDetailsOpen) && 
<button onClick={toggleChatDetails}>

        <Image
          src="/icons/side-drawer.svg"
          width={400}
          height={400}
          alt="Icon"
          className="size-[1.2rem] lg:size-[1vw] 2xl:size-[1.2rem]"
        />

        </button>
        }
      </header>

      {/* Chat Data */}
    {isLoading ? (
  <>
    <SidebarGroupSkeleton title="Chat Data" />
    <Divider />

    <SidebarGroupSkeleton title="Contact Data" />
    <Divider />

    <SidebarGroup title="Contact Labels">
      <LabelsSkeleton />
    </SidebarGroup>
    <Divider />

    <SidebarGroup title="Notes">
      <NotesSkeleton />
    </SidebarGroup>
  </>
) : (
        <>
            <SidebarGroup title="Chat Data">
  <InfoRow
    label="Assignee"
    icon="/icons/Union.svg"
    value={`${user?.firstName ?? ""} ${user?.lastName ?? ""}`}
  />
  <InfoRow
    label="Team"
    icon="/icons/Union.svg"
    value={user?.company?.department || "Sales Team"}
  />
</SidebarGroup>
          <Divider />

      <SidebarGroup title="Contact Data">
  <InfoRow label="First Name" value={user?.firstName || "-"} />
  <InfoRow label="Last Name" value={user?.lastName || "-"} />
  <InfoRow label="Phone number" value={user?.phone || "-"} />
  <InfoRow label="Email" value={user?.email || "-"} />
</SidebarGroup>
          <Divider />

          {/* Contact Labels */}
          <SidebarGroup title="Contact Labels">
            <div className="flex flex-wrap gap-x-[0.6rem] lg:gap-x-[2%]">
              <Tag text="Closed Won" />
              <Tag text="Chicago" />
              <AddTag />
            </div>
          </SidebarGroup>

          <Divider />

          {/* Notes */}
          <SidebarGroup title="Notes">
            {/* INPUT FIELD */}
            <Note type="input" placeholder="Add a note" />

            {/* NORMAL NOTE */}
            <Note text="Strong potential for future upgrades" />
          </SidebarGroup>

          <Divider />

          {/* Other Chats */}
          <SidebarGroup title="Other Chats">
            <OtherChatItem
              name="Fit4Life"
              message="On my way!"
              date="08/08/25"
              icon="/icons/Subtract.svg"
            />

            <OtherChatItem
              name="Alex Morgan"
              message="Let’s discuss tomorrow"
              date="07/08/25"
              icon="/icons/Subtract.svg"
              gradient="linear-gradient(180deg, #1E3C72 0%, #2A5298 100%)"
            />
          </SidebarGroup>
        </>
      )}
      </div>
    </aside>
  );
}
const SidebarGroup = ({ title, children }: { title: string; children: React.ReactNode }) => {
  const [open, setOpen] = useState(true);

  return (
    <div className=" p-4 lg:px-[5%]  lg:py-[4%]">
      {/* HEADER */}
      <div
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between cursor-pointer select-none pb-[2%]"
      >
        <h5 className="font-medium">{title}</h5>

   <Image
    src="/icons/dropdown.svg"
    alt="Dropdown icon"
    width={16}
    height={16}
    className={`size-[0.61rem] lg:size-[0.51vw] 2xl:size-[0.61rem]  opacity-70 transition-transform duration-200 ${
      open ? "rotate-180" : "rotate-0"
    }`}
  />
      </div>

      {/* COLLAPSIBLE CONTENT */}
      <div
        className={`
          overflow-hidden transition-all duration-300 
          ${open ? "max-h-125 opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        {children}
      </div>
    </div>
  );
};

const InfoRow = ({
  label,
  value,
  icon,
}: {
  icon?: string;
  label: string;
  value: string;
}) => (
  <div className="flex items-center mt-[1%] ">
    <h5 className="w-[40%] text-[#909090] font-normal">{label}</h5>
    <h5 className="flex items-center gap-x-[4%] whitespace-nowrap">
      {icon && (
        <Image
          src={icon}
          width={400}
          height={400}
          alt="Icon"
          className="size-[1.2rem] lg:size-[1vw] 2xl:size-[1.2rem]"
        />
      )}
      {value}
    </h5>
  </div>
);

const Tag = ({ text }: { text: string }) => (
  <p className="bg-[#E5F1FC] inline-flex items-center rounded-full gap-x-[4%] whitespace-nowrap px-4 py-[0.2rem] lg:py-[1%] text-[#007AEC] border-2 border-[#007AEC]">
    <Image
      src={"/icons/navigation.svg"}
      width={400}
      height={400}
      alt="Icon"
          className="size-[1.2rem] lg:size-[1vw] 2xl:size-[1.2rem]"
    />{" "}
    {text}
  </p>
);

const AddTag = () => (
  <button className=" bg-[#E5F1FC]  flex items-center text-center rounded-full size-8  lg:size-[2vw] 2xl:size-8 justify-center whitespace-nowrap text-[#007AEC] border-2 border-[#007AEC]">
    <Image
      src={"/icons/plus.svg"}
      width={400}
      height={400}
      alt="Icon"
          className="size-[0.7rem] lg:size-[0.7vw] 2xl:size-[0.7rem]"
    />
  </button>
);

const Note = ({
  text,
  type,
  placeholder,
}: {
  text?: string;
  muted?: boolean;
  type?: "input"; // agar input chahiye
  placeholder?: string;
}) => {
  // 👉 INPUT MODE
  if (type === "input") {
    return (
      <input
        type="text"
        placeholder={placeholder || text || "Add a note"}
        className={`
          my-2 lg:my-[2%] w-full p-2 lg:p-[2%]  rounded-md  text-[0.8rem] lg:text-[1vw] 2xl:text-[1rem]
          bg-[#F5E096] text-black/40  outline-none
          placeholder:text-black/40 border-2 border-transparent focus:border-[#007AEC]
        `}
      />
    );
  }

  // 👉 NORMAL NOTE MODE
  return (
    <div
      className="w-full font-medium p-2 lg:p-[2%] rounded-md 
          bg-[#F5E096] text-black/80  outline-none
          placeholder:text-black/40 border-2 border-transparent focus:border-[#007AEC]"
    >
      <p>{text}</p>
    </div>
  );
};
export const OtherChatItem = ({
  name,
  message,
  date,
  icon,
  gradient,
}: {
  name: string;
  message: string;
  date: string;
  icon: string;
  gradient?: string;
}) => {
  return (
    <div className="flex items-center gap-x-[0.8rem] lg:gap-x-[2%] mt-[0.6rem] lg:mt-[2%]">
      {/* AVATAR */}
      <div
        className="w-8 h-8 lg:w-[2vw] lg:h-[2vw] 2xl:w-8 2xl:h-8 rounded-full flex items-center justify-center text-white"
        style={{
          background:
            gradient ||
            "linear-gradient(180deg, #A032C2 0%, #DB4186 44.23%, #EF4C5E 69.71%, #FF8646 100%)",
        }}
      >
        <Image
          src={icon}
          width={400}
          height={400}
          alt="Icon"
          className="size-4 lg:size-[0.8vw] 2xl:size-4"
        />
      </div>

      {/* TEXT */}
      <div className="flex-1">
        <p className=" font-medium ">{name}</p>
        <p className="opacity-50 ">{message}</p>
      </div>

      {/* DATE */}
      <p className="opacity-50  whitespace-nowrap">{date}</p>
    </div>
  );
};
