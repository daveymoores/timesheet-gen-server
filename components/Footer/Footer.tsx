import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-black mt-24">
      <nav className="container font-semibold flex justify-center flex-col align-middle items-center gap-2 py-16">
        <Link href="https://github.com/daveymoores/autolog">Github</Link>
        <Link href="https://www.linkedin.com/in/daveymoores">Linkedin</Link>
        <div className="mt-24">
          <Link href="/" passHref>
            <Image
              src="/logo.svg"
              width={114}
              height={15}
              priority={true}
              layout="fixed"
            />
          </Link>
        </div>
      </nav>
    </footer>
  );
};

export default Footer;
