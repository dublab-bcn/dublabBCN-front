import Image from "next/image";
import React, { useEffect, useState } from "react";
import CreditsSlideOver from "../CreditsSlide";

const Credits = (): React.ReactElement => {
  const [shouldShowSpan, setShouldShowSpan] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      // Check if viewport width is less than 809px
      setShouldShowSpan(window.innerWidth >= 809);
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Initial check on component mount
    handleResize();

    // Remove event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div className="items-end flex-row pl-[33px] max-h-44 flex-end pt-[63px] hidden sm:flex ">
        <ul className="flex w-full justify-between flex-row items-end mr-[54px] ">
          <li>
            <Image
              className="min-w-[67px] min-h-[27px]"
              src={"/assets/D-B_vector.svg"}
              alt="dublab Barcelona logo"
              width={67}
              height={28}
            />
          </li>
          <li className="px-4">
            <CreditsSlideOver />
          </li>
          <li className="min-w-fit px-4">Ⓒ 2025 Dublab Barcelona</li>
          {shouldShowSpan && (
            <li className="max-h-[200px]">
              <span className="hidden sm:block text-[1.5rem] font-thin w-fit">
                dublab barcelona és una ràdio online <br /> comunitària sense
                ànim de lucre.
              </span>
            </li>
          )}
        </ul>
      </div>
    </>
  );
};

export default Credits;
