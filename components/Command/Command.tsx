import Image from "next/image";
import React from "react";

import styles from "./Command.styles";

export interface CommandProps {
  code: string;
  heading: string;
}

const Command: React.FC<CommandProps> = ({ code, heading }) => {
  return (
    <>
      <section>
        <header>
          <h3>{heading}</h3>
          <button>
            <Image src="/copy-icon.svg" height={25} width={25} />
          </button>
        </header>
        <code>{`> ${code}`}</code>
      </section>
      <style jsx>{styles}</style>
    </>
  );
};

export default Command;
