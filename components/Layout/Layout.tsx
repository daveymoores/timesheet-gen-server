import React from "react";

const Layout: React.FC = (props) => {
  return (
    <div className="page-layout">
      {/*<Navigation />*/}
      <main>{props.children}</main>
      {/*<Footer />*/}
    </div>
  );
};

export default Layout;
