"use client";
import Image from "next/image";
import React from "react";
import Contact from "./Contact";
import Credits from "./Credits";
import LegalLinks from "./LegalLinks";
import SocialLinks from "./SocialLinks";
import Sisters from "./Sisters";
import { usePathname } from "next/navigation";

const Footer = (): React.ReactElement => {
  const pathname = usePathname();

  return (
    <footer
      className={`h-fit  sm:h-[484px] w-full bg-black text-white  ${pathname.includes("arxiu") ? "border-t border-white" : ""} ${pathname.includes("b-sides") ? "border-t border-white" : ""}  `}
    >
      <Image
        src={"/assets/D-B_vector.svg"}
        width={68.48}
        height={27.93}
        alt={"D-B"}
        className="pt-[66px] pl-4 sm:hidden"
      ></Image>
      <div className="pt-[42px] pl-4 ">
        <span className="sm:hidden text-[1.5rem] w-[314px] h-[116px] font-thin ">
          dublab barcelona <br /> és una ràdio online comunitària <br /> sense
          ànim de lucre.
        </span>
      </div>
      <ul className="flex flex-col sm:flex-row  px-4 sm:px-8 pt-[57px] text-sm font-normal gap-[181px]  ">
        <li className="w-[197px]">
          <SocialLinks />
        </li>
        <li className="w-[197px]">
          <Contact />
        </li>
        <li className="w-[197px]">
          <LegalLinks />
        </li>
        <li className="w-[197px]">
          <Sisters />
        </li>
        <li className="min-w-fit mt-[2px] mb-16 sm:hidden  ">
          Ⓒ 2025 Dublab Barcelona
        </li>
      </ul>
      <Credits />
    </footer>
  );
};

export default Footer;
