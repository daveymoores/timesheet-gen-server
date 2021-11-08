import React from "react";

import styles from "./Navigation.styles";

const Navigation: React.FC = () => {
  return (
    <>
      <nav role="navigation">
        <span className="t-gen--cell">TIMESHEET-GEN</span>
        <ul>
          <li className="t-gen--cell">
            <a href="">Documentation</a>
          </li>
          <li className="t-gen--cell">
            <a href="">Code</a>
          </li>
        </ul>
      </nav>
      <style jsx>{styles}</style>
    </>
  );
};

export default Navigation;
