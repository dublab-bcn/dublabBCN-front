"use client";
import { useState } from "react";
import Button from "./Button";
import Tracklist from "./Tracklist";
import { useMixCloud } from "@/app/contexts/MixCloudContext";

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

  return (
    <>
      <section className="md:max-h-[700px] px-4 sm:w-[100vw] overflow-scroll scrollbar-hide sm:pr-[2rem] bg-black">
        <div className="flex sm:flex-row flex-col  justify-between items-start sm:items-end">
          <div className="flex gap-[20px] group">
              <Button
                className="uppercase flex flex-row gap-2"
                actionOnClick={() => listenToBside(showUrl)}
              >
                {isPlaying ? (
                  <div className="flex flex-row gap-1 pb-2">
                    <div className="h-3 w-[2px] bg-white animate-moveLines" />
                    <div className="h-3 w-[2px] bg-white animate-moveLines delay-500" />
                    <div className="h-3 w-[2px] bg-white animate-moveLines delay-1000" />
                  </div>
                ) : (
                  <span>►</span>
                )}
              </Button>
              <span></span>
              <Button
                  className="uppercase"
                  actionOnClick={() => addToQueueInShow(showUrl, name)}
              >
                + Add to queue
              </Button>
            <span className="loader"></span>
          </div>
          {tags && (
            <ul className="flex gap-[10px] opacity-40 mr-4 sm:mr-8">
              {tags.map((tag, index) => (
                <li
                  key={index}
                  className=" text-[11px] border rounded-md pt-[5px] px-2 pb-[3px]"
                >
                  {tag}
                </li>
              ))}
            </ul>
          )}
        </div>
        <section className="w-fit">
          <h2 className="text-5xl sm:h-[58px] mt-[56px]">
            {name}
          </h2>
        </section>
        <section className="flex-col items-end">
          {tracklist && <Tracklist tracklist={tracklist} />}
        </section>
      </section>
    </>
  );
};

export default BsideInfo;
