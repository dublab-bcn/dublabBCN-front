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
import { useEffect, useState, ChangeEvent } from "react";
import checkPathName from "@/app/lib/checkPathName";

import SearchBar from "@/app/components/SearchBar/SearchBar";

const Header = (): React.ReactElement => {

  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlNavbar = () => {
    if (typeof window !== 'undefined') { 
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar);

      return () => {
        window.removeEventListener('scroll', controlNavbar);
      };
    }
  }, [lastScrollY]);

  const { isOpen, setIsOpen } = useSlideOver();
  const variableWidth = isOpen ? "2/4" : "full";
  const handleLinkClick = () => {
    setIsOpen(false);
  };

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
    setDisplayedLogo(
      pageIsBlack
        ? "/assets/logo-dublabBCN2024-negative.png"
        : "/assets/Logo_dublabBCN2024.png"
    );
  }, [pageIsBlack, pathname]);

  const showSearch = searchConfig && searchConfig.type !== 'none';

  return (
    <header className={`grid grid-cols-1 gap-0 w-fit fixed top-0  left-0 w-${variableWidth} z-50  ${pageIsBlack? 'bg:black': 'bg-white'}`}>
      <div className={`flex justify-between p-4 sm:p-8 md:h-[80px] 2xl:h-[100px] items-center bg-white 
                      transition-transform duration-300 ${isVisible ? '' : 'hidden'}`}>
        <Link onClick={handleLinkClick} href="/" className="w-[200px] col-span-2 relative">
          <Image
            src={displayedLogo}
            alt="dublab Barcelona logo"
            width={627.259}
            height={138.42}
            className="relative z-50 object-contain"
          />
        </Link>
        <DigitalClock />
        <NavBarS1 />
        <SlideOverMenu />
      </div>
      <div className="mt-0 md:grid md:grid-cols-2 md:h-[80px] 2xl:h-[100px] gap-0 justify-start">
        <NavBarS2 />
        <RadioController />
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
