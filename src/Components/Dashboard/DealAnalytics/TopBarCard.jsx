/* eslint-disable react/prop-types */
import { cn } from "../../../utils/cn";

const TopBarCard = ({ className, image, count, title, imageClass }) => {
  return (
    <div
      style={{
        boxShadow: "1px 1px 11px -8px black",
      }}
      className={cn(
        "flex gap-5 flex-wrap py-2 px-1 lg:p-3  items-center justify-center  rounded-xl w-[90%] h-[150px]",
        className
      )}
    >
      <div className="flex gap-2 lg:gap-2 items-center">
        <div className="p-3 rounded-full w-fit">
          <img src={image} className={cn("size-[80px]", imageClass)} alt="" />
        </div>
        <div className="text-start">
          <p className=" text-[45px] text-[#1D242D] mb-1 font-semibold">
            {count || "12,500"}
          </p>
          <p className="text-xl font-medium text-black">{title}</p>
        </div>
      </div>
    </div>
  );
};

export default TopBarCard;
