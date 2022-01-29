import type { NextPage } from "next";
import React from "react";

const Home: NextPage = () => {
  return (
    <article>
      <div className="md:container md:mx-auto">
        <div className="grid grid-cols-12 mt-32">
          <div className="col-span-6 col-start-2">
            <code className="p-10 rounded-md bg-black flex flex-col gap-6 drop-shadow-2xl">
              <span className="flex flex-col gap-y-2">
                <span className="text-slate-600 font-mono">
                  Install with homebrew (Mac OS)
                </span>
                <span className="text-green-200 font-mono">
                  $ brew install autolog
                </span>
              </span>

              <span className="flex flex-col gap-y-2">
                <span className="text-slate-700 font-mono">
                  Initialise autolog for a repository
                </span>
                <span className="text-slate-200 font-mono">$ autolog init</span>
              </span>

              <span className="flex flex-col gap-y-2">
                <span className="text-slate-700 font-mono">
                  Generate a timesheet for January
                </span>
                <span className="text-slate-200 font-mono">
                  $ autolog make -m1
                </span>
              </span>

              <span className="flex flex-col gap-y-2">
                <span className="text-slate-700 font-mono">
                  Modify an entry
                </span>
                <span className="text-slate-200 font-mono">
                  $ autolog edit -d22 -m11 -y2020 -h6
                </span>
              </span>
            </code>
          </div>

          <div className="col-span-3 col-end-12">
            <h1 className="text-3xl font-medium text-green-100 my-8">
              A simple utility to{" "}
              <span className="text-green-300 font-bold">
                easily generate timesheets
              </span>{" "}
              from your git log
            </h1>
            <button className="py-2 px-3 bg-gradient-to-tl from-indigo-500 to-indigo-700 text-white text-sm rounded-md shadow focus:outline-none">
              See sample timesheet
            </button>
          </div>

          <div className="col-start-4 col-span-6 mt-32">
            <h2 className="text-3xl font-semibold text-green-100">
              For <span className="text-green-300 font-bold">freelance</span>{" "}
              engineers
            </h2>
            <p className="text-green-100 mt-4">
              Initialise autolog against all your clients repositories.{" "}
              <a href="">Commit granularly</a> and automatically generate a
              timesheet at the end of the working month.
            </p>
          </div>
        </div>
      </div>
    </article>
  );
};

export default Home;
