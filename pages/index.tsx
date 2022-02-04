import type { NextPage } from "next";
import React from "react";

import Button from "../components/Button/Button";
import CodeLine from "../components/Code/CodeLine/CodeLine";

const Home: NextPage = () => {
  return (
    <article className="mx-auto lg:max-w-screen-xl">
      <div className="md:container md:mx-auto">
        <div className="grid grid-cols-12 mt-32">
          <div className="col-span-6 col-start-2">
            <code className="p-14 rounded-md bg-black flex flex-col gap-8 drop-shadow-2xl">
              <span className="flex flex-col gap-y-2">
                <span className="text-slate-600 font-mono">
                  Install with homebrew (Mac OS)
                </span>
                <span className="text-green-100 font-mono">
                  <span className="text-green-300">$</span> brew install{" "}
                  <span className="text-rose-500">autolog</span>
                </span>
              </span>

              <span className="flex flex-col gap-y-2">
                <span className="text-slate-700 font-mono">
                  Initialise autolog for a repository
                </span>
                <CodeLine command="autolog init" />
              </span>

              <span className="flex flex-col gap-y-2">
                <span className="text-slate-700 font-mono">
                  Generate a timesheet for January
                </span>
                <CodeLine command="autolog make -m1" />
              </span>

              <span className="flex flex-col gap-y-2">
                <span className="text-slate-700 font-mono">
                  Modify an entry
                </span>
                <CodeLine command="autolog edit -d22 -m11 -y2020 -h6" />
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
            <Button text="See sample timesheet" />
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

          <div className="col-start-5 col-end-9 flex flex-col items-center">
            <div className="mt-20 mb-20 p-10 rounded-md bg-green-100 text-slate-800 flex flex-col gap-6 drop-shadow-2xl">
              <h3 className="text-3xl font-bold text-center">Free.</h3>
              <p>
                Generate timesheets and have them <b>signed for approval.</b>
              </p>
              <p>
                Split your time between <b>multiple repositories</b>{" "}
                automatically
              </p>
              <p>
                Choose to store all your data <b>locally</b> (no sign-up
                required)
              </p>
              <p>
                Sign up to store your timesheets in the cloud and{" "}
                <b>enable edits</b> in your web browser
              </p>
            </div>

            <Button text="See the docs" />
          </div>
        </div>
      </div>
    </article>
  );
};

export default Home;
