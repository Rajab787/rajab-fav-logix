import { NavbarData } from "@/data/navbar";
import Image from "next/image";
import Link from "next/link";
import HeaderLinks from "./HeaderLinks";
import { ArrowLeft } from "lucide-react";

const Header = ({selectedPolygon,showBack,handlePolygonClick,}:{selectedPolygon?:string,handlePolygonClick:()=>void,  showBack?: boolean;}) => {
  const userName = "Box Pad";
  const userInitial = userName.charAt(0).toUpperCase();
  return (
    <nav className="bg-white shadow-sm border-b-2 border-gray-300 lg:border-0 rounded-xl flex justify-between items-center px-4 lg:px-[1%] py-2 lg:py-[0.8%] ">
      <div className="flex items-center gap-4 lg:gap-x-[4%] 2xl:gap-x-[6%] whitespace-nowrap">
      
      {showBack && (
  <button
   onClick={() => {
  handlePolygonClick(null); 
}}
    className="mr-4 text-[#007AEC] font-semibold hover:opacity-70 transition flex justify-center items-center"
  >
   <ArrowLeft  className="text-blue-300" /> Back
  </button>
)}  <Link href={"/"} className="">
          <Image src={NavbarData.logo} alt="Logo" width={150} height={150} />
        </Link>

        {/* Desktop Menu */}
        <HeaderLinks  handlePolygonClick={handlePolygonClick} selectedPolygon={selectedPolygon} />
      </div>
      <div className="flex items-center whitespace-nowrap gap-x-1 w-full lg:w-[20%] justify-end">
        <Image
          height={18}
          width={18}
          src={NavbarData.settingsIcon}
          alt="settings icon"
          className="hidden lg:block slow-spin mr-[2%]"
        />

        <p className="w-8 h-8 lg:w-[1.5vw] lg:h-[1.5vw]  2xl:w-6 2xl:h-6 flex items-center justify-center bg-[#FE3265] text-white rounded-full ">
          {userInitial}
        </p>

        {/* Desktop Username */}
        <span className="hidden lg:block font-medium text-gray-800">
          {userName}
        </span>
      </div>
    </nav>
  );
};

export default Header;
