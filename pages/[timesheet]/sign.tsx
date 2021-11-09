import { GetServerSideProps } from "next";
import React from "react";
import CanvasDraw from "react-canvas-draw";

const Sign: React.FC = () => {
  return (
    <div>
      <CanvasDraw
        brushColor={"#e1f7de"}
        backgroundColor={"#1e2027"}
        hideGrid
        canvasWidth={900}
      />
    </div>
  );
};

interface Context {
  query: {
    by: "approver" | "user";
    timesheet: string;
  };
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const getServerSideProps: GetServerSideProps = async ({
  query,
}: Context) => {
  return {
    props: {
      by: query.by,
      approver: query.timesheet,
    },
  };
};

export default Sign;
