import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navigation: React.FC = () => {
  return (
    <div className="grid grid-cols-12 mt-16 mx-auto lg:max-w-screen-xl font-semibold">
      <div className="col-span-8 col-start-3">
        <nav className="flex justify-between align-middle">
          <Link href="/" passHref>
            <Image
              src="/logo.svg"
              width={114}
              height={15}
              priority={true}
              layout="fixed"
            />
          </Link>
          <Link href="/documentation">Documentation</Link>
        </nav>
      </div>
    </div>
  );
};

export default Navigation;
