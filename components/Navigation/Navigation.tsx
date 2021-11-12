import Link from "next/link";
import React from "react";

import navStyles from "./Navigation.styles";

const Navigation: React.FC = () => {
  return (
    <>
      <nav role="navigation">
        <span className="t-gen--cell">
          <Link href="/">TIMESHEET-GEN</Link>
        </span>
        <ul>
          <li className="t-gen--cell">
            <Link href="">Docs</Link>
          </li>
          <li className="t-gen--cell">
            <Link href="">Code</Link>
          </li>
        </ul>
      </nav>
      <style jsx>{navStyles}</style>
    </>
  );
};

export default Navigation;
