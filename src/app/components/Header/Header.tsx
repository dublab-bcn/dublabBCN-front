"use client";
import { useSlideOver } from "@/app/contexts/useContexts";
import { useSearch } from "@/app/contexts/SearchContext";
import Image from "next/image";
import Link from "next/link";
import SlideOverMenu from "../SlideOverMenu";
import DigitalClock from "@/app/components/RadioBar/DigitalClock";
import NavBarS1 from "./NavBarS1";
import NavBarS2 from "./NavBarS2";
import RadioController from "./RadioController";
import { usePathname } from "next/navigation";
import { use, useEffect, useState, ChangeEvent } from "react";
import checkPathName from "@/app/lib/checkPathName";

import SearchBar from "@/app/components/SearchBar/SearchBar";

const Header = (): React.ReactElement => {
  const { isOpen, setIsOpen } = useSlideOver();
  const variableWidth = isOpen ? "2/4" : "full";
  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const [backgroundColor, setBackgroundColor] = useState("white");
  const [displayedLogo, setDisplayedLogo] = useState(
    "/assets/Logo_dublabBCN2024.png"
  );

  const pathname = usePathname();
  const pageIsBlack = checkPathName(pathname);

  const { 
    searchTerm, 
    setSearchTerm, 
    selectedTags, 
    setSelectedTags, 
    handleSearchSubmit, 
    currentTags, 
    searchConfig 
  } = useSearch();

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleTagChange = (tags: string[]) => {
    setSelectedTags(tags);
  };

  useEffect(() => {
    setBackgroundColor(pageIsBlack ? "black" : "white");
    setDisplayedLogo(
      pageIsBlack
        ? "/assets/logo-dublabBCN2024-negative.png"
        : "/assets/Logo_dublabBCN2024.png"
    );
  }, [pageIsBlack, pathname]);

  const showSearch = searchConfig && searchConfig.type !== 'none';


  return (
    <header className={`w-fit fixed top-0 left-0 w-${variableWidth} h-[100px] z-50 gap-8 2xl:gap-[300px] bg-white`}>
      <div className="grid grid-cols-3 gap-2 justify-start p-4 sm:p-8 items-center justify-center bg-white">
        <Link onClick={handleLinkClick} href="/" className="w-[200px] col-span-2 md:col-span-1 md:w-[300px] relative">
          <Image
            src={displayedLogo}
            alt="dublab Barcelona logo"
            width={627.259}
            height={138.42}
            className="relative left-2 z-50 object-contain"
          />
        </Link>
        <DigitalClock />
        <NavBarS1 />
        <SlideOverMenu />
      </div>
      <div className="mt-0 grid grid-cols-1 md:grid-cols-2 gap-0 justify-start rtl-grid"> {/* Changed mt-[5px] to mt-0 */}
        <RadioController />
        <NavBarS2 />
      </div>
      {showSearch && (
        <SearchBar
            onSubmit={handleSearchSubmit}
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder={searchConfig!.placeholder}
            tags={currentTags}
            selectedTags={selectedTags}
            onTagChange={handleTagChange}
            version={searchConfig!.type}
          />
      )}
    </header>
  );
};

export default Header;
