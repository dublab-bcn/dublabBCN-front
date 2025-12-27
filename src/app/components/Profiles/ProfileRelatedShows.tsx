"use client";
import useDublabApi from "@/app/lib/hooks/useDublabApi";
import { formatAndSortRelatedShowsInfo } from "@/app/lib/processSlug";
import { ApiProfile, RadioApiShow } from "@/app/types";
import Link from "next/link";
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

  const dynamicPath: string = pathname.includes("/shows") ? "shows" : "arxiu";
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
    <section className="pr-2 ">
      {formattedShows.map(
        ({
          showName,
          showDateForList,
          showDateForUrl,
          showTags,
          slugToUrl,
          showTitle,
          showHost,
          showMixcloudUrl,
          showTracklist
        }) => {
          const titleToShow = getTitleToShow(showName, showTitle);
          const tracklistSplit = showTracklist ? showTracklist.split("\n").filter(item => item.trim() !== "") : [];
          return (
            <article key={showDateForList}>
              <div className="flex gap-4 justify-between mt-[17px]">
                <Link className = 'w-4/6' href={`/${dynamicPath}/${slugToUrl}/${showDateForUrl}`}>
                  <span>{titleToShow}</span>
                  {showHost !== null && <span> w/ {showHost}</span>}
                </Link>
                <section className="float-right text-right w-2/6 justify-between">
                  { showTracklist!= undefined && showTracklist.length > 0 &&
                    <Menu as="div" className="inline-block text-left relative">
                      <Menu.Button>
                        <Image src={"/assets/list.svg"}
                        width={25.0}
                        height={25.0}
                        alt={"tracklist"}
                        className="ml-[0.7rem]"
                      ></Image>
                      </Menu.Button>
                      <Menu.Items className="absolute w-[345px] top-[30px] right-[-70px] mb-2 z-10 bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none">
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
                    </Menu>
                  }
                  <button className="inline-block" onClick={() => addToQueueInShow(showMixcloudUrl, showHost + " " + showDateForUrl)}>
                    <Image src={"/assets/clock.svg"}
                      width={25.0}
                      height={25.0}
                      alt={"queue"}
                      className="ml-[0.7rem]"
                    ></Image>
                  </button>
                  <button className="inline-block" onClick={() => listenShow(showMixcloudUrl)}>
                    <Image src={"/assets/play.svg"}
                      width={18.0}
                      height={18.0}
                      alt={"play"}
                      className="ml-[0.7rem] pb-[0.2rem]"
                    ></Image>
                  </button>
                  
                </section>
                
              </div>
              <div className="flex gap-8 justify-between mt-[17px]">
                  <ul className="flex text-xs pt-[3px] pb-[17px] ">
                      {(showTags || (profileData && profileData.tags)).map(
                        (tag, index, array) => (
                          <>
                            <li key={tag}>{tag}</li>
                            {index !== array.length - 1 && <li>&nbsp;///&nbsp;</li>}
                          </>
                        ),
                      )}
                  </ul>
                  <time>
                    {showDateForList.length === 11
                      ? showDateForList.substring(3)
                      : showDateForList}
                  </time>
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
