"use client";

import { getChatList } from "@/api/chatService";
import { BackArrowIcon, CloseIcon, DetailsIcon, MoreVerticalIcon } from "@/icons/icons";
import { ChatPost } from "@/lib/chat-users";
import Image from "next/image";
import {  ReactNode, useMemo, useState } from "react";
import SingleChatPageMessages from "./SIngleChatPage/SingleChatPageMessages";
import DetailsPanel from "./ChatDetailPanel";
import Sidebar from "./sidebar/Sidebar";
import { useChatStore } from "@/global/chatbox";
import { usePolygonStore } from "@/global/usePolygonStore";
import { motion, AnimatePresence } from "framer-motion";
import { useFetchWithLoader } from "@/lib/usefetchWithLoader";
function ChatItem({
  post,
  isActive,isChatListOpen,
  onSelect,
}:  {
  post: ChatPost;
  isActive: boolean;
  isChatListOpen: boolean;
  onSelect?: (post: ChatPost) => void;
}) {
const [randomTime] = useState(() => ({
  hour: Math.floor(Math.random() * 12) + 1,
  minute: Math.floor(Math.random() * 59)
    .toString()
    .padStart(2, "0"),
}));

  const handleClick = () => {
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      onSelect?.(post);
    }
  };
  const initials = post.fullName
    .split(" ")
    .slice(0, 2)           // max 2 words
    .map((n) => n[0])      // first letter of each word
    .join("");
  const bgColor = useMemo(() => {
    const colors = [
      "#F87171", // red-400
      "#60A5FA", // blue-400
      "#34D399", // green-400
      "#FBBF24", // yellow-400
      "#A78BFA", // purple-400
      "#F472B6", // pink-400
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }, []); // [] ensure one color per render

  return (
<div
  className={`
    border first:mt-0 mt-[2%] flex items-center justify-between 
    p-[4%] bg-white rounded-md cursor-pointer 
    hover:shadow-xl hover:border-[#E0D8FF] shadow-xs
    ${isActive ? "border-[#E0D8FF] shadow-xl" : "border-transparent"}
  `}
>
  {/* 👇 CLICKABLE AREA (mobile only logic inside) */}
  <div
    onClick={handleClick}
    className="flex items-center  gap-x-3 flex-1"
  >
<div       style={{ backgroundColor: bgColor }}
 className="relative size-10 lg:size-[2vw] 2xl:size-10 rounded-full overflow-hidden  flex items-center justify-center text-white font-bold">
        <p>{initials}</p>
    </div>
    <div className="w-full lg:w-auto">
      <h5 className="font-bold">{post.fullName}</h5>
      <p className={`transition-all duration-300 ease-in-out ${isChatListOpen?"opacity-100":"opacity-0"} text-gray-500`}>
        {post.body.slice(0, 35)}...
      </p>
    </div>
  </div>

  {/* TIME */}
  <p className="text-gray-500">
    {randomTime.hour}:{randomTime.minute}
  </p>
</div>

  );
}
function MobileChatScreen({
  chat,
  onBack,
}: {
  chat: ChatPost;
  onBack: () => void;
}) {
  
    const [openDetails, setOpenDetails] = useState(false);

  return (
    <>
   
    <div className="fixed w-full  ml-auto inset-0 z-50 bg-white flex flex-col lg:hidden">
      {/* HEADER */}
      <div className="flex items-center justify-between  p-4 border-b">
        <div className="flex items-center gap-3">
        <button onClick={onBack}><BackArrowIcon className="size-7"/></button>

        <Image
          src={chat.avatar}
          alt={chat.fullName}
          width={40}
          height={40}
          className="size-[1.2rem] rounded-full"
        />

        <h4 className="font-bold">{chat.fullName}</h4>
        </div>
          <div className="flex items-center gap-4">
     <button onClick={() => setOpenDetails(true)}>
          <DetailsIcon className="size-6 text-gray-600" />
        </button>
    <MoreVerticalIcon className="size-6 text-gray-600" />
  </div>
      </div>

      {/* CHAT BODY */}
      <div className="w-full">
        
  <SingleChatPageMessages />

      </div>
    </div>
      <SlideOver open={openDetails} onClose={() => setOpenDetails(false)}>
        <DetailsPanel  open={openDetails}/>
      </SlideOver>
     </>
  );
}function LeftDrawer({ open, onClose, children }: {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* BACKDROP */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black z-40 lg:hidden" // 👈 hide on desktop
            onClick={onClose}
          />

          {/* DRAWER */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
            className="fixed top-0 left-0 h-full w-[65%] sm:w-88 bg-white shadow-xl z-50 lg:hidden" // 👈 hide on desktop
          >
            {/* HEADER */}
            <div className="flex items-center justify-end p-4 border-b">
              <button onClick={onClose}>
                <CloseIcon className="w-6 h-6 text-[#007AEC]" />
              </button>
            </div>

            {/* CONTENT */}
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function SlideOver({ open, onClose, children }: {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* BACKDROP */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black z-40 lg:hidden"
            onClick={onClose}
          />

          {/* DRAWER */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
            className="fixed top-0 right-0 h-full w-full sm:w-100 bg-white shadow-xl z-50 lg:hidden"
          >
            {/* HEADER */}
            <div className="flex items-center justify-end p-4 border-b">
              <button onClick={onClose}>
                <svg
                  className="size-7 text-gray-700"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* CONTENT */}
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default function ChatBot() {
const { activePolygonId } = usePolygonStore();
  const { data: chats, isLoading, } = useFetchWithLoader({
  queryKey: ["chats"],
  queryFn: getChatList,
  enabled:activePolygonId === "inbox", 
  minLoadingTime: 3000,
});
const [selectedChat, setSelectedChat] = useState<ChatPost | null>(null);
const [openSidebar, setOpenSidebar] = useState(false);
const { isChatListOpen, toggleChatList } = useChatStore();


  return (
    <>
      {selectedChat && (
        <MobileChatScreen
          chat={selectedChat}
          onBack={() => setSelectedChat(null)}
        />
      )}
      {openSidebar && ( 
      <LeftDrawer open={openSidebar} onClose={() => setOpenSidebar(false)}>
 <Sidebar openSidebar={openSidebar}/>
</LeftDrawer>
)}
    <div     className={`
          shadow-sm lg:rounded-xl bg-[#FAFAF8] transition-all ease-in-out duration-600
           h-[calc(100vh-142.84px)] md:h-[calc(100vh-143.84px)] lg:h-[calc(100vh-70px)] xl:h-[calc(100vh-90px)] 2xl:h-[calc(100vh-110px)]
          scrollbar-hide overflow-y-auto w-full block   lg:w-[20%]    
    ${isChatListOpen ? "lg:max-w-[20%] lg:opacity-100" : "lg:max-w-0 lg:opacity-0"} 

          ${selectedChat ? "hidden lg:block" : ""}
        `}
        >
 <div
    className={`
      transition-all duration-1000 ease-in-out
      ${isChatListOpen ? "opacity-100" : "opacity-0"}
    `}
  >
      {/* HEADER */}
      <div className="sticky top-[0%] bg-[#FAFAF8] z-10">
      <header className="p-[4%] flex items-center justify-between border-b border-gray-300">
        <div className="flex items-center gap-x-[4%] whitespace-nowrap">
       <button
  onClick={() => setOpenSidebar(true)}
  className="flex md:hidden items-center"
>
  <Image
    src="/icons/side-drawer.svg"
    width={24}
    height={24}
    alt="Open Sidebar"
      className="size-[1.2rem] lg:size-[1vw]"
  />
</button>
  <button
      onClick={toggleChatList} // Use toggle to switch open/close
      className="hidden lg:flex items-center"
    >
        <Image
          src="/icons/side-drawer.svg"
          width={24}
          height={24}
          alt="Close Sidebar"
      className="size-[1.2rem] lg:size-[1vw]"
        />
    </button>
          <h4 className="font-bold">Michael Johnson</h4>
        </div>
        <Image
          src="/icons/new-chat.svg" width={400} height={400}
          alt="Icon"
      className="size-[1.2rem] lg:size-[2vw] 2xl:size-[1.2rem]"
        />
      </header>

      {/* SEARCH BAR */}
      <div className="p-[4%] gap-x-2 flex items-center justify-between">
        <div className="flex items-center justify-between flex-1">
          <Image
            src="/icons/search.svg" width={400} height={400}
            alt="Icon"
      className="size-[1.2rem] lg:size-[2vw] 2xl:size-[1.2rem]"
          />
          <input
            type="text"
            placeholder="Search Chat"
            className="w-[88%] bg-transparent  lg:text-[0.8vw] 2xl:text-[1rem] text-black placeholder:text-black/30 placeholder:font-medium focus:outline-none"
          />
        </div>

        <Image
          src="/icons/filter.svg" width={400} height={400}
          alt="Icon"
          className="size-[1.2rem] lg:size-[1vw] 2xl:size-[1.2rem]"
        />
      </div>

      {/* SORT ROW */}
      <div className="p-4 lg:p-[4%]  flex items-center justify-between">
        <div className="flex  smallText items-center gap-x-2 cursor-pointer"><p className="smallText">Open</p>
          <Image
            src="/icons/dropdown.svg" width={400} height={400}
            alt="Icon"
   className="mb-[-6%] size-[0.6rem] lg:size-[0.6vw] 2xl:size-[0.6rem]"          /></div>
   
        <div className=" flex items-center gap-x-2 cursor-pointer"><p className="smallText">Newest</p>   <Image
          src="/icons/dropdown.svg" width={400} height={400}
          alt="Icon"
          className="mb-[-6%] size-[0.6rem] lg:size-[0.6vw] 2xl:size-[0.6rem]"
        /></div>
      </div>
      </div>

{/* CHAT LIST */}
<div className="overflow-y-auto lg:mt-[1%]">
{isLoading ? (
          <ChatListSkeleton />
        ) : chats?.length === 0 ? (
          <p className="text-center text-gray-400 py-6">
            No chats found
          </p>
        ) : (
          <div className="px-[4%] pb-[4%]">
            {chats.slice(0, 11).map((post: ChatPost, index: number) => (
              <ChatItem
                key={post.id}
                post={post} isChatListOpen={isChatListOpen}
                isActive={index === 0}
                onSelect={setSelectedChat}
              />
            ))}
          </div>
        )}
</div>
</div>
    </div>
    </>

  );
}
function ChatItemSkeleton() {
  return (
    <div className="border mt-[2%] flex items-center justify-between p-[4%] bg-white rounded-md animate-pulse">
      <div className="flex items-center gap-3 flex-1">
        <div className="size-8 rounded-full bg-gray-200" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-[40%] bg-gray-200 rounded" />
          <div className="h-3 w-[70%] bg-gray-200 rounded" />
        </div>
      </div>
      <div className="h-3 w-8 bg-gray-200 rounded" />
    </div>
  );
}
function ChatListSkeleton({ count = 10 }) {
  return (
    <div className="px-[4%] pb-[4%]">
      {Array.from({ length: count }).map((_, i) => (
        <ChatItemSkeleton key={i} />
      ))}
    </div>
  );
}