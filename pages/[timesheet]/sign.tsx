import { GetServerSideProps } from "next";
import React from "react";
import CanvasDraw from "react-canvas-draw";

import Button from "../../components/Button/Button";

const Sign: React.FC = () => {
  const canvas = React.useRef<CanvasDraw>(null);

  const onClick = React.useCallback(() => {
    if (canvas.current) {
      console.log(canvas.current.getSaveData());
    }
  }, [canvas.current]);

  return (
    <>
      <div className="sign">
        <CanvasDraw
          ref={canvas}
          lazyRadius={15}
          brushRadius={6}
          brushColor={"#e1f7de"}
          backgroundColor={"#1e2027"}
          hideGrid
          canvasWidth={900}
        />
        <Button text="Save" type="button" onClick={onClick} />
      </div>
      <style jsx>{`
        .sign {
          display: flex;
          flex-direction: column;
          align-items: center;
          max-width: var(--max-content-width);
        }
      `}</style>
    </>
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
