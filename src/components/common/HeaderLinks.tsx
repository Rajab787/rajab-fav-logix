"use client";
import { usePolygonStore } from "@/global/usePolygonStore";
import { polygonData, PolygonItem } from "../icons/hexagonicons";


const HeaderLinks = ({handlePolygonClick}:{handlePolygonClick:(item:PolygonItem)=>void}) => {
const { activePolygonId  } = usePolygonStore();

  return (
    <div className="hidden lg:flex items-center gap-x-[2%]">
      {polygonData?.map((item: PolygonItem, index: number) => {
        const isActive =
          activePolygonId === item.id;
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
  {item.icon}
  <h6 className="font-bold">{item.label}</h6>
</button>
);
      })}
    </div>
  );
};

export default HeaderLinks;
