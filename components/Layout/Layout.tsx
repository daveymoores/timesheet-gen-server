import React from "react";

import globalStyles from "../../styles/global";
import normalise from "../../styles/normalise";
import Footer from "../Footer/Footer";
import Navigation from "../Navigation/Navigation";
import styles from "./Layout.styles";

const Layout: React.FC = (props) => {
  return (
    <div className="page-layout">
      <Navigation />
      <main>{props.children}</main>
      <Footer />
      <style jsx>{styles}</style>
      <style jsx global>
        {normalise}
      </style>
      <style jsx global>
        {globalStyles}
      </style>
    </div>
  );
};

export default Layout;
