"use client";

import { getChatMessages } from "@/api/chatDetails";
import { Message } from "@/data/ChatData";
import { usePolygonStore } from "@/global/usePolygonStore";
import { TickIcon } from "@/icons/icons";
import { ChatMessageAPI } from "@/lib/chat-inner";
import { useFetchWithLoader } from "@/lib/usefetchWithLoader";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { PolygonItem } from "../icons/hexagonicons";


function MessageSkeleton({ isUser }: { isUser?: boolean }) {
  return (
    <div
      className={`flex w-full mt-4 ${
        isUser ? "justify-end" : "justify-start"
      } animate-pulse`}
    >
      <div
        className={`
          max-w-[70%] lg:max-w-[40%]
          rounded-[0.45rem] px-4 py-3
          ${isUser ? "bg-[#EDE3FD]" : "bg-[#EFF2F2]"}
        `}
      >
        <div className="h-3 w-32 bg-gray-300 rounded mb-2" />
        <div className="h-3 w-48 bg-gray-300 rounded" />
      </div>
    </div>
  );
}
function MessagesSkeleton() {
  return (
    <>
      <MessageSkeleton />
      <MessageSkeleton isUser />
      <MessageSkeleton />
      <MessageSkeleton isUser />
      <MessageSkeleton />
    </>
  );
}
export default function SingleChatPageMessages({
  selectedPolygon,
}: {
  selectedPolygon: PolygonItem | null;
}) {
const { stage,  } = usePolygonStore();
const { data: messages, isLoading } = useFetchWithLoader<{messages: Message[];}>({
  queryKey: ["single-chat"],
  queryFn: getChatMessages,
  enabled:selectedPolygon?.id === "inbox",
  minLoadingTime: 3000,
});

   const getTime = (date?: string) =>
    new Date(date || Date.now()).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
const leftIcons = [
  { src: "/icons/image-upload.svg", alt: "img" },
  { src: "/icons/video.svg", alt: "video" },
  { src: "/icons/document.svg", alt: "document" },
  { src: "/icons/emoji.svg", alt: "emoji" },
  { src: "/icons/reply.svg", alt: "reply" },
];

const rightIcons = [
  { src: "/icons/flash.svg", alt: "flash" },
  { src: "/icons/mic.svg", alt: "mic" },
];
  return (
    <>
      <div className="px-4 lg:px-[2%] w-full">
        <div className="h-[calc(100vh-250px)] lg:h-[calc(100vh-200px)] my-[2%] scrollbar-hide overflow-y-auto">
          {/* DATE */}
          <div className="flex justify-center sticky top-[2%] z-10 mb-8 lg:mb-[2%]">
            <p className="px-4 lg:px-[2%] py-2 lg:py-[1%] bg-[#EFF2F2] rounded-md ">
              28 August 2025
            </p>
          </div>

 {isLoading ? (
  <MessagesSkeleton />
) : messages?.length === 0 ? (
  <p className="text-center text-gray-400 mt-16">
    No messages yet
  </p>
) : (
  messages && messages.map((msg) => {
    const isUser = msg.user.id % 2 === 0;

    return (
      <div
        key={msg.id}
        className={`flex w-full gap-x-[1%] mt-4 lg:mt-[2%] ${
          isUser
            ? "justify-end items-end"
            : "justify-start items-start"
        }`}
      >
        {/* USER TIME + TICK */}
        {isUser && (
          <div className="text-right hidden lg:block opacity-70">
            <p>{getTime(msg.createdAt)}</p>
            <TickIcon className="size-[0.9rem] text-[#4FB6EC]" />
          </div>
        )}

        {/* MESSAGE BUBBLE */}
        <div
          className={`
            inline-flex w-fit gap-x-4 lg:gap-x-0 items-end
            max-w-[75%] lg:max-w-[40%]
            rounded-[0.45rem]
            px-4 py-1
            lg:px-[1.5%] lg:py-[1%]
            wrap-break-word
            ${isUser ? "bg-[#EDE3FD]" : "bg-[#EFF2F2]"}
          `}
        >
          <p>{msg.body}</p>

          {/* MOBILE TIME */}
          <p className="flex items-end lg:hidden opacity-70 gap-x-2">
            {getTime(msg.createdAt)}
            {isUser && (
              <TickIcon className="w-[0.9rem] h-[0.9rem] text-[#4FB6EC]" />
            )}
          </p>
        </div>

        {/* OTHER USER TIME */}
        {!isUser && (
          <p className="hidden lg:block opacity-70">
            {getTime(msg.createdAt)}
          </p>
        )}
      </div>
    );
  })
)}

        </div>
      </div>
        <div className="w-full lg:w-[97%] mx-auto shadow-md lg:rounded-xl sticky bottom-[8.8%] md:bottom-18 lg:bottom-[2%] bg-white border-t-2 border-gray-300 lg:border-t-0  p-4 lg:p-[2%]">

          <input
            type="text"
            placeholder="Type Something..."
            className="w-full bg-transparent lg:h-[2vw]   2xl:h-12 mb-4 lg:mb-[2%]  lg:text-[0.8vw] 2xl:text-[1rem] text-black placeholder:text-black/30 placeholder:font-medium focus:outline-none"
          />
        <div className="flex justify-between">
  {/* LEFT ICONS */}
  <div className="flex items-center gap-4">
    {leftIcons.map((icon, index) => (
      <Image
        key={index}
        src={icon.src}
        alt={icon.alt}
        width={24}
        height={24}
          className="size-[1.2rem] lg:size-[1vw] 2xl:size-[1.2rem]"
      />
    ))}
  </div>

  {/* RIGHT ICONS */}
  <div className="flex items-center gap-6 ml-4">
    {rightIcons.map((icon, index) => (
      <Image
        key={index}
        src={icon.src}
        alt={icon.alt}
        width={22}
        height={22}
          className="size-[1.2rem] lg:size-[1vw] 2xl:size-[1.2rem]"
      />
    ))}
  </div>
</div>


      </div>
    </>
  );
}
