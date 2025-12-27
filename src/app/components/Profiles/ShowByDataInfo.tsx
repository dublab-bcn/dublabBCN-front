"use client";
import { useState} from "react";
import Button from "../Button";
import Tracklist from "../Tracklist";
import ProfileLinks from "./ProfileLinks";
import { usePathname } from "next/navigation";
import { useMixCloud} from "@/app/contexts/MixCloudContext";

interface ShowByDataInfoProps {
  showUrl: string;
  description: { __html: string };
  profileName: string;
  tags: string[];
  tracklist: string;
  host: string;
  links: string[];
}

const ShowByDataInfo = ({
  showUrl,
  description,
  profileName,
  tags,
  host,
  tracklist,
  links,
}: ShowByDataInfoProps) => {
  const { playProgram, addToQueu } = useMixCloud();
  const [isPlaying, setIsPLaying] = useState(false);

  const listenShow = (mixcloudLink: string) => {
    playProgram(mixcloudLink);
    setIsPLaying(!isPlaying);
  };

  const addToQueueInShow = (mixcloudLink: string, showName: string) => {
    addToQueu(mixcloudLink, showName);
  };


  const pathname = usePathname();

  const lineColor: string = pathname.includes("/shows") ? "black" : "white";

  const showDateFromUrl = /(\d{2}-\d{2}-\d{2})/;
  const showDate = pathname.match(showDateFromUrl);
  const firstDateElement = showDate![0].replace(/-/g, "/");

  return (
    <>
      <section className="md:max-h-[700px] px-4 sm:w-[100vw] overflow-scroll scrollbar-hide sm:pr-[2rem]">
        <div className="flex sm:flex-row flex-col  justify-between items-start sm:items-end">
          <div className="flex gap-[20px] group">
            <Button
                className="uppercase"
                actionOnClick={() => listenShow(showUrl)}
              >
                {isPlaying ? (
                  <div className="flex flex-row gap-1 pb-2">
                    <div
                      className={`h-3 w-[2px] bg-${lineColor} animate-moveLines`}
                    />
                    <div
                      className={`h-3 w-[2px] bg-${lineColor} animate-moveLines delay-500`}
                    />
                    <div
                      className={`h-3 w-[2px] bg-${lineColor} animate-moveLines delay-1000`}
                    />
                  </div>
                ) : (
                  <span>►</span>
                )}
            </Button>
            <span></span>
            <Button
                className="uppercase"
                actionOnClick={() => addToQueueInShow(showUrl, profileName + " " + firstDateElement)}
            >
              + Add to queue
            </Button>
          </div>
          <ul className="flex gap-[10px] pr-4 opacity-100 sm:opacity-80">
            {tags &&
              tags.map((tag, index) => (
                <li
                  key={index}
                  className={`text-${lineColor} text-[11px] sm:border rounded-md pt-[5px] sm:px-2 pb-[2px]`}
                >
                  {tag}
                </li>
              ))}
          </ul>
        </div>
        <div className="w-fit">
          <h2 className="text-5xl sm:h-[58px] mt-[56px]">
            {profileName + " " + firstDateElement}
          </h2>
          <ul className="flex gap-9 sm:gap-[194px] text-[32px]  mt-[20px] sm:mt-[50px]">
            <li>With</li>
            <li className="max-w-[304px] sm:max-w-none">{host} </li>
          </ul>
        </div>
        <section className="flex flex-col-reverse gap-[35px] sm:gap-[140px] max-w-fit">
          <div className="w-fit sm:max-w-none mt-8 md:gap-[5.1rem] flex flex-row ">
            <ProfileLinks links={links} />
            <div className="flex items-start">
              <p
                className={`text-sm sm:w-fit sm:pr-0 ${
                  links ? "" : "md:pl-[138px]"
                }`}
              >
                {description.__html}
              </p>
            </div>
          </div>
        </section>
        <section className="flex-col items-end ">
          <Tracklist tracklist={tracklist!}></Tracklist>
        </section>
      </section>
    </>
  );
};

export default ShowByDataInfo;
