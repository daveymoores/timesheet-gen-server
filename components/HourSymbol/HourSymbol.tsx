import React from "react";

interface HourValueProps {
  index: number;
  hours: number;
}

const getSymbolSize = (hours: number): string => {
  // tailwind can't take dynamic classes so switch for full class name
  switch (hours) {
    case 1:
      return "h-[9px] w-[9px] bg-green-800";
    case 2:
      return "h-[10px] w-[10px] bg-green-700";
    case 3:
      return "h-[11px] w-[11px] bg-green-600";
    case 4:
      return "h-[12px] w-[12px] bg-green-500";
    case 5:
      return "h-[13px] w-[13px] bg-green-400";
    case 6:
      return "h-[14px] w-[14px] bg-green-300";
    case 7:
      return "h-[15px] w-[15px] bg-green-200";
    default:
      return "h-[16px] w-[16px] bg-green-100";
  }
};

const HourSymbol: React.FC<HourValueProps> = ({ index, hours }) => {
  return (
    <div className="flex justify-center mt-2 items-center">
      <div
        key={index}
        className={`text-center font-semibold rounded-full h-3.5 w-3.5 ${getSymbolSize(
          hours
        )}`}
      />
    </div>
  );
};

export default HourSymbol;
