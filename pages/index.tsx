import type { NextPage } from "next";
import Image from "next/image";
import React from "react";

const Home: NextPage = () => {
  return (
    <article>
      <div className="commands">
        <section>
          <header>
            <h3>Initialise for current directory</h3>
            <button>
              <Image src="/copy-icon.svg" height={25} width={25} />
            </button>
          </header>
          <code>{`> timesheet-gen init`}</code>
        </section>
        <section>
          <header>
            <h3>Initialise for current directory</h3>
            <button>
              <Image src="/copy-icon.svg" height={25} width={25} />
            </button>
          </header>
          <code>{`> timesheet-gen init [run mode: -cb / -d]`}</code>
        </section>
        <section>
          <header>
            <h3>Initialise for current directory</h3>
            <button>
              <Image src="/copy-icon.svg" height={25} width={25} />
            </button>
          </header>
          <code>{`> timesheet-gen edit -h 5 -d 8 -m 10 -y 2021`}</code>
        </section>
      </div>

      <style jsx>{`
        header {
          display: flex;
          justify-content: space-between;
          align-items: stretch;
        }

        button {
          width: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: transparent;
          border: none;
        }

        @media (prefers-color-scheme: dark) {
          button {
            border-left: var(--lineWidth) solid var(--lightGreen);
          }
        }

        @media (prefers-color-scheme: light) {
          button {
            border-left: var(--lineWidth) solid var(--darkGreen);
          }
        }

        h3 {
          text-align: left;
          font-size: 16px;
          font-weight: 500;
          padding: 1em;
          margin: 0;
        }

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

        code {
          display: block;
          padding: 2em;
          text-align: center;
        }

        @media (prefers-color-scheme: dark) {
          code {
            border-top: var(--lineWidth) solid var(--lightGreen);
            background-color: var(--mistyGrey);
          }
        }

        @media (prefers-color-scheme: light) {
          code {
            border-top: var(--lineWidth) solid var(--darkGreen);
            background-color: var(--mistyGrey);
          }
        }

        section {
          margin-bottom: 50px;
        }

        @media (prefers-color-scheme: dark) {
          section {
            border: var(--lineWidth) solid var(--lightGreen);
          }
        }

        @media (prefers-color-scheme: light) {
          section {
            border: var(--lineWidth) solid var(--darkGreen);
          }
        }
      `}</style>
    </article>
  );
};

export default Home;
