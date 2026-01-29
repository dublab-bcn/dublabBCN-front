"use client";
import { useState } from "react";
import Button from "./Button";
import Tracklist from "./Tracklist";
import { useMixCloud } from "@/app/contexts/MixCloudContext";
import Description from "@/app/components/Profiles/ProfileDescription";
import Link from "next/link";
import Image from "next/image";
import { Menu } from '@headlessui/react';

interface BsideInfoProps {
  showUrl: string;
  description: { __html: string };
  name: string;
  tags: string[];
  tracklist: string;
}

const BsideInfo = ({
  showUrl,
  description,
  name,
  tags,
  tracklist,
}: BsideInfoProps) => {
  const { playProgram , addToQueu } = useMixCloud();
  const [isPlaying, setIsPLaying] = useState(false);

  const listenToBside = (mixcloudLink: string) => {
    playProgram(mixcloudLink);
    setIsPLaying(!isPlaying);
  };

  const addToQueueInShow = (mixcloudLink: string, showName: string) => {
    addToQueu(mixcloudLink, showName);
  };

  const tracklistSplit = tracklist ? tracklist.split("\n").filter(item => item.trim() !== "") : [];

  return (
    <>
      <section className="md:overflow-y-scroll scrollbar-hide overflow-y-scroll scrollbar-hide bg-black
                          [&::-webkit-scrollbar]:hidden">
        <div className="flex justify-between items-end mb-8">
          <ul className="flex gap-[10px] opacity-100 sm:opacity-40">
            {tags.map((tag) => (
              <li
                key={tag}
                className={`text-[11px] border rounded-md pt-[5px]  px-2 pb-[3px]`}
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>

        <hr className={`border-white  w-full `} />    

        <section className="w-fit">
          <h2 className="text-5xl sm:h-[25px] mt-[25px]">
            {name}
          </h2>
        </section>

        <div
            className={`w-fit md:flex sm:max-w-none mt-8 sm:gap-[5.8rem]"
            }`}
        >
            <Description description={description} />
        </div>

        <hr className={`border-white  w-full mt-8`} />    

        <section className="flex-col items-end">
          {tracklist && <Tracklist tracklist={tracklist} />}
        </section>

        <div className="grid grid-cols-3 md:grid-cols-4 gap-4 mt-[17px] mb-4">
          <section className="col-span-3 md:col-span-1 align-center text-center md:text-right grid grid-cols-3">
            <button 
              className="flex flex-col items-center justify-center w-full ltr-grid gap-2" 
              onClick={() => listenToBside(showUrl)}
            >
              <span>►</span>
              <span className="text-xs">
                PLAY
              </span>
            </button>
            <button className="flex flex-col items-center justify-center w-full ltr-grid gap-2" onClick={() => addToQueueInShow(showUrl, name)}>
              <span>+</span>
              <span className="text-xs">
                QUEUE
              </span>
            </button>
            { tracklist!= undefined && tracklist.length > 0 ? (
              <Menu as="div" className="relative flex flex-col justify-center ltr-grid ">
                <Menu.Button className = "flex flex-col items-center w-full gap-2">
                  <Image src={"/assets/list_white.svg"}
                  width={25.0}
                  height={25.0}
                  alt={"tracklist"}
                  className="object-contain"
                ></Image>
                <span className="text-xs">
                  TRACKLIST
                </span>
                </Menu.Button>
                <Menu.Items className="absolute w-[85vw] md:w-[345px] left-[0px] top-[30px] md:left-[-250px] lg:left-[-220px] xl:left-[-200px] 2xl:left-[-70px] mb-2 z-10 bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none">
                  <div className="p-4">
                    <h3 className="text-lg font-medium mb-2">
                      Tracklist
                    </h3>
                    <ol className="list-decimal list-inside max-h-60 overflow-y-auto">
                      {tracklistSplit.map((item, index) => (
                        <li key={index} className="text-sm">{item}</li>
                      ))}
                    </ol>
                  </div>
                </Menu.Items>
              </Menu>) : <div></div> 
            }
          </section>
        </div>
        <hr className={`border-white  w-full `} />    
      </section>
    </>
  );
};

export default BsideInfo;
