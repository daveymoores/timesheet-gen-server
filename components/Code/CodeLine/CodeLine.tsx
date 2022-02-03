import React from "react";

interface CodeLineProps {
  command: string;
}

const CodeLine: React.FC<CodeLineProps> = ({ command }) => {
  const textFragments = command.split(" ");

  const classNameGenerator = (index: number): string => {
    switch (index) {
      case 0:
        return "text-rose-500";
      case 1:
        return "text-rose-200";
      default:
        return "text-green-100";
    }
  };

  return (
    <span className="text-slate-200 font-mono">
      <span className="text-green-300">$</span>
      {textFragments.map((text, index) => {
        return (
          <span key={index} className={classNameGenerator(index)}>
            {" "}
            {text}
          </span>
        );
      })}
    </span>
  );
};

export default CodeLine;
