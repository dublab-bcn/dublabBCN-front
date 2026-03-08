"use client";
import { setCookie, getCookie } from "cookies-next";
import { useState, useEffect } from "react";
import Button from "./Button";

const PrivacyDisclaimer = (): React.ReactElement => {
  const [isHidden, setIsHidden] = useState(true);

  useEffect(() => {
    const closed = getCookie("disclaimerClosed");
    if (!closed) {
      setIsHidden(false);
    }
  }, []);

  const toggleHidden = () => {
    setIsHidden(true);

    setCookie("disclaimerClosed", "true", {
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    });
  };

  return (
    <div className={` ${isHidden ? "hidden" : ""} `}>
      <article className="w-[100vw] sm:w-[718px] h-[145px] sm:h-[100px] flex flex-row sm:gap-32 bg-[#ECECEC] z-10 fixed right-0 bottom-0 sm:bottom-8 p-4 sm:p-8 items-end sm:items-center rounded-md sm:mr-8">
        <p className="text-xs sm:w-[420px] sm:h-[68px] w-fit ">
          YOUR PRIVACY MATTERS. <br className="sm:hidden" /> We use cookies
          technologies <br className="sm:hidden" /> to make your visit on our
          <br className="sm:hidden" />
          website as pleasant <br className="sm:hidden" /> as possible. All data
          collected on your browser is anonymous.
          <br className="sm:hidden" /> TERMS AND CONDITIONS
        </p>
        <Button
          className="uppercase bg-black text-white text-sm w-[181px] h-[42px] rounded-md mb-[7px] sm:mb-0 "
          actionOnClick={toggleHidden}
        >
          Sounds good
        </Button>
      </article>
    </div>
  );
};

export default PrivacyDisclaimer;
