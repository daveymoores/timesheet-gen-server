import React from "react";

interface HourInputProps {
  index: number;
  hours: number;
}

const HourInput: React.FC<HourInputProps> = ({ index, hours }) => {
  return (
    <div className="flex justify-center">
      <input
        className="text-slate-500 bg-transparent text-sm h-3.5 w-3.5 mb-2"
        id={`day-input-${index}`}
        defaultValue={hours}
      />
    </div>
  );
};

export default HourInput;
