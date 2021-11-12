import React from "react";

import styles from "./Cell.styles";

interface CellProps {
  text: string;
  title?: boolean;
}

const Cell: React.FC<CellProps> = ({ text, title }) => {
  return (
    <>
      <div
        className={`timesheet__cell${title ? " timesheet__cell--title" : ""}`}
      >
        <p>{text}</p>
      </div>
      <style jsx>{styles}</style>
    </>
  );
};

export default Cell;
