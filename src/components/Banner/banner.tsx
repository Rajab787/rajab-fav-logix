"use client";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import { cloneElement, isValidElement, useState } from "react";

import { Polygon } from "./Polygon";
import loaderGif from "@/assets/Bannerloader.gif";
import { polygonData, PolygonItem } from "../icons/hexagonicons";
import { usePolygonStore } from "@/global/usePolygonStore";

import Sidebar from "../sidebar/Sidebar";
import Header from "../common/header";
import ChatBot from "../ChatBox";
import SingleChatPage from "../SIngleChatPage/SingleChatPage";
import DetailsPanel from "../ChatDetailPanel";
import BottomNav from "../common/MobileBottomBar";

const ContentSkeleton = () => (
  <div className="h-[40vh] bg-white rounded-xl flex items-center flex-col justify-center border-2 border-white/10 mt-[1%] animate-pulse">
    <div className="w-16 h-16 rounded-full bg-gray-200 mb-4" />
    <div className="h-6 w-32 bg-gray-200 rounded mb-3" />
    <div className="h-4 w-64 bg-gray-200 rounded" />
  </div>
);
const Banner = () => {
  const { stage, setStage, resetPolygon } = usePolygonStore();
  const [selectedPolygon, setSelectedPolygon] = useState<PolygonItem | null>(
    null,
  );
  const [openInboxPreview, setOpenInboxPreview] = useState(false);
  const renderSelectedIcon = () => {
    if (!selectedPolygon) return null;
    if (isValidElement(selectedPolygon.icon)) {
      return cloneElement(selectedPolygon.icon, {
        className: "text-[#007AEC] size-10 lg:size-[4vw] 2xl:size-16",
      });
    }
    return selectedPolygon.icon;
  };

  const handlePolygonClick = (polygon: PolygonItem | null) => {
    if (!polygon) {
      setStage("closing");
      return;
    }
    if (selectedPolygon?.id === polygon.id) return;

    setSelectedPolygon(polygon);
    setStage("loading");

    setTimeout(() => {
      setStage("loaded");
    }, 5000);
  };
  // Inbox preview open
  const handlePreviewOpen = () => setOpenInboxPreview(true);

  // ------------------- Animation Variants -------------------
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };
  const pageOverlay = {
    hidden: { opacity: 0, scale: 0.96, y: 40 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
    exit: { opacity: 0, scale: 0.96, y: 40, transition: { duration: 0.3 } },
  };

  // ------------------- Main JSX -------------------
  return (
    <section
      className={clsx(
        "relative w-full min-h-screen bg-[#05070C] overflow-hidden flex justify-center",
        stage === "idle" ? "items-center" : "items-start",
      )}
    >
      {/* Left Glow */}
      <Image
        src="/Loading Skeleton.png"
        alt=""
        fill={false}
        width={2000}
        height={2000}
        className="fixed inset-0 transform pointer-events-none translate-y-full lg:translate-none"
      />

      <div className="fixed inset-0 flex justify-center items-center pointer-events-none">
        <div className="w-[90%] lg:w-[98%] h-[95svh]  rounded-2xl border-2 border-white/10 bg-white/4 px-6 pt-6 pb-20 backdrop-blur-[30px] sm:rounded-3xl" />
      </div>

      {/* Polygons & Center Content */}
      <div className="flex flex-col lg:flex-row items-center lg:justify-between w-full">
        {/* Desktop Polygons */}
        <div className="hidden lg:block">
          {polygonData.map((item, index) => (
            <Polygon
              key={index}
              className={clsx(
                "lg:absolute cursor-pointer z-10 transition-all duration-500 ease-in-out",
                item.position,
                item.size,
                selectedPolygon?.id === item?.id
                  ? "opacity-0 scale-0 pointer-events-none"
                  : "opacity-100 scale-100",
              )}
              onClick={() => handlePolygonClick(item)}
            >
              {item.icon}
            </Polygon>
          ))}
        </div>
        {/* Mobile Polygons */}
        <div  className={clsx(
            "w-[87%] gap-4 z-10 mx-auto my-[1rem] justify-between  lg:hidden pointer-events-auto",
            selectedPolygon
              ? "grid grid-cols-2 ml-[4rem] md:ml-0 mt-[2rem]  "
              : "flex md:grid md:grid-cols-5 flex-wrap"
          )}>
          <AnimatePresence>
            {polygonData
              .slice(0, 5)
              .filter((item) => item.id !== selectedPolygon?.id)
              .map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ duration: 0.4 }}
                  layout // 👈 important for smooth reposition
                >
                  <Polygon
                    onClick={() => handlePolygonClick(item)}
                    className={clsx(
                      item.size,
                      "cursor-pointer transition-all duration-500 ease-in-out",
                    )}
                  >
                    <div className="flex justify-center flex-col items-center">
                      {item.icon}
                      <div className="border-b-2 mt-2 w-full border-white" />
                      <p className="font-bold text-white text-xs">
                        {item.label}
                      </p>
                    </div>
                  </Polygon>
                </motion.div>
              ))}
          </AnimatePresence>
        </div>
        {/* Center Content */}
        <motion.div
          key={stage + (selectedPolygon?.id ?? "")}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mix-blend-screen text-center w-full"
        >
          {stage === "idle" && <IdleCircle />}

          {stage !== "idle" && selectedPolygon && (
            <SelectedPolygonContent
              selectedPolygon={selectedPolygon}
              stage={stage}
              renderIcon={renderSelectedIcon}
            />
          )}
        </motion.div>
      </div>

      {/* Footer / Bottom */}
      {stage !== "idle" && (
        <BottomSection
          resetPolygon={resetPolygon}
          setStage={setStage}
          setSelectedPolygon={setSelectedPolygon}
          selectedPolygon={selectedPolygon}
          stage={stage}
          renderIcon={renderSelectedIcon}
          handlePolygonClick={handlePolygonClick}
          setOpenInboxPreview={setOpenInboxPreview}
          handlePreviewOpen={handlePreviewOpen}
          openInboxPreview={openInboxPreview}
          pageOverlay={pageOverlay}
        />
      )}
                          <BottomNav  handlePolygonClick={handlePolygonClick} selectedPolygon={selectedPolygon}/>

    </section>
  );
};

// ------------------- Sub Components -------------------

// Idle state circle
const IdleCircle = () => (
  <motion.div
    initial={{ scale: 0.9, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.6 }}
    className={`size-[16rem] lg:size-[16vw] mx-auto rounded-full flex items-center justify-center relative transform "translate-y-[-50%]" lg:translate-y-[25%]`}
  >
    <div className="absolute inset-0 rounded-full p-1 slow-spin bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,_hsla(210,100%,70%,0.18)_0%,_hsla(210,100%,49%,0.08)_50%,_hsla(210,100%,45%,0)_80%)] border-4 border-[#007AEC]" />
    <div className="w-full h-full bg-[#05070C]/10 rounded-full flex items-center justify-center">
      <h1 className="text-white text-lg lg:text-xl w-[60%] text-center leading-tight">
        Select a module to load data
      </h1>
    </div>
  </motion.div>
);

// Selected Polygon Content
const SelectedPolygonContent = ({ selectedPolygon, stage }: any) => (
  <div className={`relative  mt-[-2rem] lg:mt-[3vw] `}>
    <div
      className={`relative mx-auto flex items-center justify-center   
  size-[12rem] lg:size-[13vw]`}
    >
      {stage === "loading" ? (
        <motion.img
          src={loaderGif.src}
          alt={`Loading ${selectedPolygon.label} data`}
          className="w-full h-full pointer-events-none object-cover rounded-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
      ) : (
        <div className="w-full h-full rounded-full flex items-center justify-center relative">
          <div className="absolute inset-0 rounded-full p-1 slow-spin bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,_hsla(210,100%,70%,0.18)_0%,_hsla(210,100%,49%,0.08)_50%,_hsla(210,100%,45%,0)_80%)] border-4 border-[#007AEC]" />
          <div className="w-full h-full bg-[#05070C] rounded-full flex items-center justify-center" />
        </div>
      )}

      {/* ICON CENTER */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Polygon
          active={true}
          className="relative size-20 lg:size-[5vw] 2xl:size-20 flex items-center justify-center"
        >
          {selectedPolygon.icon}
        </Polygon>
      </motion.div>
    </div>

    <motion.h1
      className="text-white relative z-10 my-[1%]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      {stage === "idle"
        ? "Select a module to load data"
        : stage === "loading"
          ? `Extracting ${selectedPolygon.label}...`
          : stage === "loaded"
            ? selectedPolygon.label === "Inbox"
              ? "Inbox data successfully extracted"
              : `${selectedPolygon.label} data is being prepared`
            : ""}
    </motion.h1>

    <motion.p
      className="roz-text text-white font-light mx-auto text-[1rem] hidden lg:block lg:text-[1vw] 2xl:text-[1.125rem]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      {stage === "idle"
        ? "Please select a module to load data."
        : stage === "loading"
          ? `Retrieving and processing your ${selectedPolygon.label} data. Please wait...`
          : stage === "loaded"
            ? selectedPolygon.label === "Inbox"
              ? "Inbox data successfully extracted."
              : `Data for ${selectedPolygon.label} is being prepared. We are working on it.`
            : ""}
    </motion.p>
  </div>
);
interface BottomSectionProps {
  selectedPolygon: PolygonItem | null;
  stage: string;
  resetPolygon: () => void;
  renderIcon: () => React.ReactNode;
  setSelectedPolygon: (polygon: PolygonItem | null) => void;
  setStage: (stage: string) => void;
  handlePolygonClick: (polygon: PolygonItem | null) => void;
  pageOverlay: any;
  setOpenInboxPreview: (open: boolean) => void;
  handlePreviewOpen: () => void;
  openInboxPreview: boolean;
}

const BottomSection = ({
  selectedPolygon,
  stage,
  resetPolygon,
  renderIcon,
  setSelectedPolygon,
  setStage,
  handlePolygonClick,
  pageOverlay,
}: BottomSectionProps) => {
  const fullScreenVariants = {
    hidden: {
      scale: 0.2,
      opacity: 0,
      borderRadius: "50%",
      y: 60,
    },
    visible: {
      scale: 1,
      opacity: 1,
      borderRadius: "0%",
      y: 0,
      transition: {
        duration: 1.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    exit: {
      scale: 0.2,
      opacity: 0,
      borderRadius: "50%",
      y: 60,
      transition: {
        duration: 1.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };
  return (
    <>
      {stage !== "loaded" && (
        <div
          className={`absolute w-[90%] h-[40vh] ${
            selectedPolygon?.id === "inbox"
              ? "bottom-[10%] lg:bottom-[12%]"
              : "bottom-12 lg:bottom-[10%]"
          } left-0 right-0 z-20 mx-auto`}
        >
            
            {stage==="loading" && 
            
               <div className="mb-[0.5rem] lg:mb-0">
                  <Header
                    selectedPolygon={selectedPolygon?.label}
                    handlePolygonClick={() => handlePolygonClick(null)}
                  />
                </div>}
          {stage === "loading" &&

          
            (selectedPolygon?.id === "inbox" ? (
              <motion.div
                key="inbox-view"
                variants={pageOverlay}
                initial="hidden"
                animate="visible"
              >
      

                <div className="flex lg:mt-[0.5%] md:gap-x-[0.5rem] lg:gap-x-[0.5%]">
                  <Sidebar
                    openSidebar={false}
                    selectedPolygon={selectedPolygon}
                  />
                  <ChatBot selectedPolygon={selectedPolygon} />
                  <SingleChatPage selectedPolygon={selectedPolygon} />
                  <DetailsPanel
                    selectedPolygon={selectedPolygon}
                    open={false}
                  />
                </div>

              </motion.div>
            ) : (
              <ContentSkeleton />
            ))}
        </div>
      )}

      {/* FULL SCREEN EXPANSION */}
      <AnimatePresence>
        {(stage === "loaded" || stage === "closing") && selectedPolygon && (
          <motion.div
            variants={fullScreenVariants}
            initial="hidden"
            animate={stage === "loaded" ? "visible" : "exit"}
            onAnimationComplete={(definition) => {
              if (definition === "exit") {
                setSelectedPolygon(null);
                resetPolygon(); // 👈 FULL RESET
              }
            }}
            className="fixed inset-0 z-[999] bg-[#EFF0EB] flex flex-col"
          >
            {/* Header stays */}
            <div className="px-6 py-2">
              <Header
                showBack={stage === "loaded"}
                selectedPolygon={selectedPolygon?.label}
                handlePolygonClick={() => handlePolygonClick(null)}
              />
            </div>

            {/* Inbox or other content */}
            {selectedPolygon?.id === "inbox" ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="flex flex-1 px-6 gap-x-[0.5%]"
              >
                <Sidebar
                  openSidebar={false}
                  selectedPolygon={selectedPolygon}
                />
                <ChatBot selectedPolygon={selectedPolygon} />
                <SingleChatPage selectedPolygon={selectedPolygon} />
                <DetailsPanel open={false} selectedPolygon={selectedPolygon} />
                    <BottomNav  handlePolygonClick={handlePolygonClick} selectedPolygon={selectedPolygon}/>

              </motion.div>
            ) : (
              <div className="flex flex-1 flex-col items-center justify-center text-center">
                {renderIcon()}
                <h1 className="text-[#007AEC] text-3xl mt-4">
                  {selectedPolygon.label}
                </h1>
                <p className="text-gray-400 mt-2">
                  {selectedPolygon.label} module loaded successfully.
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
export default Banner;
