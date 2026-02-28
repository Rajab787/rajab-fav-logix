
"use client"
import { headerButtons } from "@/data/ChatData";
import Image from "next/image";
import SingleChatPageMessages from "./SingleChatPageMessages";
import { useChatStore } from "@/global/chatbox";
import { BackArrowIcon, DetailsIcon } from "@/icons/icons";
import { useChatDetailStore } from "@/global/chatDetailPanel";
import clsx from "clsx";
import { PolygonItem } from "../icons/hexagonicons";

export default function SingleChatPage({
  selectedPolygon,
}: {
  selectedPolygon: PolygonItem | null;
}) {
const { isChatListOpen, toggleChatList } = useChatStore();
const { isChatDetailsOpen, toggleChatDetails } = useChatDetailStore();


  return (
<div
  className={clsx(
    "shadow-sm rounded-xl bg-[#FAFAF8] hidden lg:block lg:h-[calc(100vh-70px)] xl:h-[calc(100vh-90px)] 2xl:h-[calc(100vh-110px)] scrollbar-hide overflow-y-auto",
    !isChatListOpen && !isChatDetailsOpen
      ? "w-[86%]"
      : isChatListOpen && isChatDetailsOpen
      ? "w-[44%]":
      !isChatListOpen && isChatDetailsOpen?
      "w-[64%]" :
      isChatListOpen && !isChatDetailsOpen?
      "w-[66%]":
"w-[44%]"  )}
>

      {/* HEADER */}
      <header className=" sticky top-[0%] bg-[#FAFAF8] z-40 ">
     <div className="p-2 lg:p-[0.5vw] 2xl:p-2 flex items-center justify-between border-b border-gray-300 ">
      {!isChatListOpen&& <button onClick={toggleChatList}><BackArrowIcon className="w-7 h-7"/></button>}
         <h4 className="capitalize font-bold">Ava Harris</h4>

        <div className="flex items-center gap-x-1">
          {headerButtons.map((btn, index) => (
            <button
              key={index}
              className="p-[4%] flex justify-center items-center rounded-md size-8 bg-gray-100 hover:bg-black transition-all duration-150 group"
            >
              <Image
                src={btn.icon}
                alt="header-icon"
                width={18}
                height={18}
                className="group-hover:invert group-hover:brightness-0 size-[1.2rem] lg:size-[1vw]  2xl:size-[1.2rem] "
              />
            </button>
          ))}
          {!isChatDetailsOpen && 
          <button onClick={toggleChatDetails}><DetailsIcon className="lg:size-[1.2vw] 2xl:size-[1.2rem]"/></button>
          }
        </div>
        </div>
      </header>

      {/* CHAT AREA */}
  <SingleChatPageMessages selectedPolygon={selectedPolygon}/>
      {/* INPUT AREA */}
    
    </div>
  );
}
