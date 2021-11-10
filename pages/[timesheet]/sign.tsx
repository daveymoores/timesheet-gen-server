import { GetServerSideProps } from "next";
import React from "react";
import CanvasDraw from "react-canvas-draw";
import { useWindowSize } from "react-use";

import Button from "../../components/Button/Button";
import palette from "../../utils/palette";

export interface SignProps {
  id: string;
  by: "approver" | "user";
  timesheet: string;
}

const Sign: React.FC<SignProps> = ({ id, by }) => {
  const { width, height } = useWindowSize();
  const canvas = React.useRef<CanvasDraw>(null);

  const onClick = React.useCallback(async () => {
    if (canvas.current) {
      await fetch("/api/signature", {
        method: "POST",
        mode: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          signature_string: canvas.current.getSaveData(),
          id,
          by,
        }), // body data type must match "Content-Type" header
      });
    }
  }, [canvas.current, id, by]);

  return (
    <>
      <div className="sign">
        {typeof window !== "undefined" && (
          <CanvasDraw
            className="canvas"
            ref={canvas}
            lazyRadius={3}
            brushRadius={3}
            brushColor={palette.LIGHT_GREEN}
            backgroundColor={palette.DARK_GREY}
            hideGrid
            canvasWidth={width - 112}
            canvasHeight={height - 250}
          />
        )}
        <Button text="Save" type="button" onClick={onClick} />
      </div>
      <style jsx>{`
        .sign {
          display: flex;
          flex-direction: column;
          align-items: center;
          max-width: var(--max-content-width);
          margin: auto;
        }

        @media (prefers-color-scheme: dark) {
          .sign {
            border: var(--lineWidth) solid var(--lightGreen);
          }
        }

        @media (prefers-color-scheme: light) {
          .sign {
            border: var(--lineWidth) solid var(--darkGrey);
          }
        }
      `}</style>
    </>
  );
};

interface Context {
  query: SignProps;
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const getServerSideProps: GetServerSideProps = async ({
  query,
}: Context) => {
  return {
    props: {
      id: query.id,
      by: query.by,
      approver: query.timesheet,
    },
  };
};

export default Sign;
