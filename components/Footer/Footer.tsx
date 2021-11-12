import Image from "next/image";
import React from "react";
import useSystemTheme from "react-use-system-theme";

import NewsletterSubscribe from "../NewsletterSubscribe/NewsletterSubscribe";
import styles from "./Footer.styles";

const Footer: React.FC = () => {
  const systemTheme = useSystemTheme("dark");

  const githubImageSrc =
    systemTheme === "dark"
      ? "GitHub-Mark-Light-64px.svg"
      : "GitHub-Mark-Dark-64px.svg";
  return (
    <>
      <footer>
        <NewsletterSubscribe />
        <div className="bottom-bar">
          <ul>
            <li className="t-gen--cell">
              <a href="">View on Github</a>
            </li>
            <li className="t-gen--cell">
              <Image
                height={25}
                width={25}
                src={`/${githubImageSrc}`}
                alt="GitHub icon"
              />
            </li>
          </ul>
        </div>
      </footer>
      <style jsx>{styles}</style>
    </>
  );
};

export default Footer;
