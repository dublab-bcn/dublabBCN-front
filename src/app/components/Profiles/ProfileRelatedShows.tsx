"use client";
import useDublabApi from "@/app/lib/hooks/useDublabApi";
import { formatAndSortRelatedShowsInfo } from "@/app/lib/processSlug";
import { ApiProfile, RadioApiShow } from "@/app/types";
import { usePathname } from "next/navigation";
import useSWR from "swr";
import { useMixCloud } from "@/app/contexts/MixCloudContext";
import Image from "next/image";
import { Menu } from '@headlessui/react';

interface RelatedShowsProps {
  shows: RadioApiShow[];
}

const RelatedShows = ({ shows }: RelatedShowsProps) => {
  const { getArchivedProfileData, getProfileData } = useDublabApi();
  const pathname = usePathname();

  const lineColor: string = pathname.includes("/shows") ? "black" : "white";
  const getterFunctionToPass = pathname.includes("/shows")
    ? getProfileData
    : getArchivedProfileData;

  const formattedShows = formatAndSortRelatedShowsInfo(shows);

  const { playProgram, addToQueu } = useMixCloud();
  
  const listenShow = (mixcloudLink: string) => {
    playProgram(mixcloudLink);
  };
  
  const addToQueueInShow = (mixcloudLink: string, showName: string) => {
    addToQueu(mixcloudLink, showName);
  };

  const { data: profileData } = useSWR<ApiProfile | null>(
    formattedShows[0]?.slugToUrl,
    getterFunctionToPass,
  );

  if (!formattedShows || formattedShows.length === 0) {
    return <div></div>;
  }

  if (!profileData) return <div>Carregant...</div>;

  const getTitleToShow = (showName: string, showTitle: string | undefined) => {
    if (showTitle !== "") {
      return showTitle;
    } else if (showName === "macGuffin-20") {
      return "Macguffin 2.0";
    } else if (showName === "cero en conducta") {
      return "@cero.en.conducta";
    } else if (showName === "br") {
      return "please come to brasil";
    } else {
      return showName;
    }
  };

  return (
    <section className="">
      {formattedShows.map(
        ({
          showName,
          showDateForList,
          showDateForUrl,
          showTags,
          showTitle,
          showHost,
          showMixcloudUrl,
          showTracklist
        }) => {
          const titleToShow = getTitleToShow(showName, showTitle);
          const tracklistSplit = showTracklist ? showTracklist.split("\n").filter(item => item.trim() !== "") : [];
          return (
            <article key={showDateForList}>
              <div className="grid grid-cols-3 md:grid-cols-4 gap-4 mt-[17px] mb-4">
                <time className="flex-none">
                  {showDateForList.length === 11
                    ? showDateForList.substring(3)
                    : showDateForList}
                </time>
                <div className="col-span-2">
                  <span>{titleToShow}{showHost !== null && <span> w/ {showHost}</span>}</span>
                  <ul className="hidden md:flex md:flex-wrap text-xs pt-[3px] pb-[17px] ">
                        {(showTags || (profileData && profileData.tags)).map(
                          (tag, index, array) => (
                            <>
                              <li key={tag}>{tag}</li>
                              {index !== array.length - 1 && <li>&nbsp;///&nbsp;</li>}
                            </>
                          ),
                        )}
                  </ul>
                </div>
                
                <section className="col-span-3 md:col-span-1 align-center text-center md:text-right grid grid-cols-3 rtl-grid">
                  <button 
                    className="flex flex-col items-center justify-center w-full ltr-grid gap-2" 
                    onClick={() => listenShow(showMixcloudUrl)}
                  >
                    <span>►</span>
                    <span className="text-xs">
                      PLAY
                    </span>
                  </button>
                  <button className="flex flex-col items-center justify-center w-full ltr-grid gap-2" onClick={() => addToQueueInShow(showMixcloudUrl, showName + " " + showDateForUrl)}>
                    <span>✚</span>
                    <span className="text-xs">
                      QUEUE
                    </span>
                  </button>
                  { showTracklist!= undefined && showTracklist.length > 0 ? (
                    <Menu as="div" className="relative flex flex-col justify-center ltr-grid ">
                      <Menu.Button className = "flex flex-col items-center w-full gap-2">
                        <Image src={lineColor == "white" ? `/assets/list_white.svg` : `/assets/list.svg`}
                        width={25.0}
                        height={25.0}
                        alt={"tracklist"}
                        className="object-contain"
                      ></Image>
                      <span className="text-xs">
                        TRACKLIST
                      </span>
                      </Menu.Button>
                      <Menu.Items className={`absolute w-[85vw] md:w-[345px] left-[0px] top-[30px] md:left-[-250px] lg:left-[-220px] xl:left-[-200px] 2xl:left-[-70px] mb-2 z-10 border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none ${lineColor == "white" ? `bg-black` : `bg-white`}`}>
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
              <hr className={`border-${lineColor}  w-full `} />
            </article>
          );
        },
      )}
    </section>
  );
};

export default RelatedShows;
