import type { NextPage } from "next";
import React from "react";

import Command from "../components/Command/Command";

const Home: NextPage = () => {
  return (
    <article>
      <div className="commands">
        <Command
          code="timesheet-gen edit -h 5 -d 8 -m 10 -y 2021"
          heading="Initialise for current directory"
        />
        <Command
          code="timesheet-gen edit -h 5 -d 8 -m 10 -y 2021"
          heading="Initialise for current directory"
        />
        <Command
          code="timesheet-gen edit -h 5 -d 8 -m 10 -y 2021"
          heading="Initialise for current directory"
        />
        <Command
          code="timesheet-gen edit -h 5 -d 8 -m 10 -y 2021"
          heading="Initialise for current directory"
        />
        <Command
          code="timesheet-gen edit -h 5 -d 8 -m 10 -y 2021"
          heading="Initialise for current directory"
        />
        <Command
          code="timesheet-gen edit -h 5 -d 8 -m 10 -y 2021"
          heading="Initialise for current directory"
        />
      </div>
      <style jsx>
        {`
          .commands {
            display: flex;
            flex-direction: column;
            align-items: stretch;
          }

          @media screen and (min-width: 900px) {
            .commands {
              align-items: center;
            }
          }
        `}
      </style>
    </article>
  );
};

export default Home;
