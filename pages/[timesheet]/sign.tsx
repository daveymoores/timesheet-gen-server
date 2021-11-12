import { GetServerSideProps } from "next";
import React from "react";
import CanvasDraw from "react-canvas-draw";
import { useWindowSize } from "react-use";
import useSystemTheme from "react-use-system-theme";

import Button from "../../components/Button/Button";
import palette from "../../utils/palette";

export interface SignProps {
  id: string;
  by: "approver" | "user";
  timesheet: string;
}

const Sign: React.FC<SignProps> = ({ id, by }) => {
  const systemTheme = useSystemTheme("dark");
  const { width, height } = useWindowSize();
  const canvas = React.useRef<CanvasDraw>(null);
  const canvasContainer = React.useRef<HTMLDivElement>(null);
  const [signDims, setSignDims] = React.useState({
    canvasWidth: width - 112,
    canvasHeight: height - 250,
  });

  React.useEffect(() => {
    if (!canvasContainer.current) return;

    const { width: containerWidth } =
      canvasContainer.current.getBoundingClientRect();
    setSignDims({
      canvasWidth: containerWidth - 6,
      canvasHeight: height - (width < 900 ? 200 : 300),
    });
  }, [width, height, canvasContainer.current]);

  const onClickSave = React.useCallback(async () => {
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
        }),
      });
    }
  }, [canvas.current, id, by]);

  const onClickClear = React.useCallback(() => {
    if (canvas.current) {
      canvas.current.clear();
    }
  }, [canvas.current]);

  const onClickUndo = React.useCallback(() => {
    if (canvas.current) {
      canvas.current.undo();
    }
  }, [canvas.current]);

  return (
    <>
      <div className="sign" ref={canvasContainer}>
        {typeof window !== "undefined" && (
          <CanvasDraw
            className="canvas"
            ref={canvas}
            lazyRadius={3}
            brushRadius={3}
            brushColor={
              systemTheme === "dark" ? palette.LIGHT_GREEN : palette.DARK_GREY
            }
            backgroundColor={
              systemTheme === "dark" ? palette.DARK_GREY : palette.LIGHT_GREEN
            }
            hideGrid
            {...signDims}
          />
        )}
      </div>
      <div className="sign__controls">
        <Button
          text="Undo"
          type="button"
          onClick={onClickUndo}
          className="button--invert"
        />
        <Button
          text="clear"
          type="button"
          onClick={onClickClear}
          className="button--invert"
        />
        <Button text="Save" type="button" onClick={onClickSave} />
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

        .sign__controls {
          width: 100%;
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          max-width: 400px;
          margin: 25px auto 0;
        }

        @media screen and (min-width: 900px) {
          .sign__controls {
            margin: 50px auto 0;
          }
        }

        .sign__controls :global(button) {
          border-right: none;
          padding: 0;
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
