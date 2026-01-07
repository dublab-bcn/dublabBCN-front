import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { dublabSisters, firstNavLabels, programesDropDown } from "../paths";
import DropdownClick from "./Header/MenuDropdownClick";
import DigitalClock from "./RadioBar/DigitalClock";

const SlideOver = () => {
  const [isSlideOverVisible, setSlideOverVisible] = useState(false);
  const pathname = usePathname();

  const toggleSlideOver = () => {
    setSlideOverVisible(!isSlideOverVisible);
  };

  useEffect(() => {
    setSlideOverVisible(false);
  }, [pathname]);

  return (
    <div className="flex justify-center sm:hidden ">
      <button
        onClick={toggleSlideOver}
        className="bg-[#ECECEC] z-50 flex items-center justify-center text-[12px] text-black w-15 h-[36px] cursor-pointer px-5 py-2  hover:bg-gray-100 rounded border-gray-300"
      >
        MENU
      </button>
      <div
        className={`w-full h-full fixed inset-0 ${
          isSlideOverVisible ? "" : "invisible"
        }`}
      >
        <button className="bg-[#ECECEC] w-full h-full duration-500 ease-out transition-all inset-0 absolute opacity-0"></button>
        <div
          className={`bg-[#ECECEC] w-full h-full absolute bottom-0 duration-300 ease-out transition-all   ${
            isSlideOverVisible ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <div className="p-4 mt-20 ">
            <ul className="group  text-[32px] relative flex flex-col gap-y-6 mt-24">
              {firstNavLabels.map(({ label, route }) => (
                <li key={route} className="cursor-pointer">
                  <Link href={route}>{label}</Link>
                </li>
              ))}
              <DropdownClick
                title="Programes"
                nestedPaths={programesDropDown}
              />
              <DropdownClick title="Sisters" nestedPaths={dublabSisters} />
            </ul>
          </div>
          <div className="absolute bottom-0 p-4 flex flex-row max-w-[100vw]  justify-between w-[26rem] ">
            <DigitalClock />
            <span>Ⓒ 2025 </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlideOver;
