/* eslint-disable react/jsx-no-comment-textnodes */
"use client";
import extractUrlForEmbedPlayer from "@/app/lib/extractUrlForEmbedPlayer";
import { formatDateFromShow } from "@/app/lib/formatDateFromShows";
import useDublabApi from "@/app/lib/hooks/useDublabApi";
import { formatSlugToGetShowName } from "@/app/lib/processSlug";
import { ApiProfile, RadioApiShow } from "@/app/types";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import useSWR from "swr";
import Button from "../Button";
import formatslugToGetPathName from "@/app/lib/formatSlugToGetPathName";

interface ShowCardProps {
  show: RadioApiShow;
  listPosition?: number;
  height: string;
  onClickPlayback: (show: string) => void;
}

const dublabApi = "https://api.dublab.cat";

const ShowCard = ({
  show: { slug, mixcloud_url, tags, host, profile_picture, date },
  height,
  onClickPlayback,
}: ShowCardProps): React.ReactElement => {
  const { getProfileData } = useDublabApi();

  const showName = formatSlugToGetShowName(slug);
  const showNamePath = formatslugToGetPathName(slug);
  const showDateforCard = formatDateFromShow(date);

  const { data: profile } = useSWR<ApiProfile | null>(showName, getProfileData);

  const showUrl = extractUrlForEmbedPlayer(mixcloud_url);

  const handleShowPlayback = () => {
    onClickPlayback(showUrl!);
  };

  if (host === undefined || host === null) {
    host = profile?.host;
  }

  if (tags === undefined || tags === null) {
    tags = profile?.tags;
  }

  const [isHovered, setIsHovered] = useState(false);

  const transformedHeight = parseInt(height, 10);

  return (
    <article className="w-full h-full">
      <div
        className={`flex flex-col brightness-50 hover:brightness-90 group relative h-full rounded-xl overflow-hidden transition-shadow duration-300 shadow-lg hover:shadow-xl`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className={`relative h-48 sm:h-64 md:h-64 w-full overflow-hidden bg-gray-200`} >
          <Image
            src={`${dublabApi}${profile_picture}`}
            alt={`Imatge del programa ${showName}`}
            height={transformedHeight}
            width={353}
            className={`w-full h-full object-cover transition-all duration-500 ease-in-out group-hover:scale-110`}
            onClick={handleShowPlayback}
            priority={true}
          />
          {isHovered && (
            <Button
              actionOnClick={handleShowPlayback}
              className="absolute inset-0 flex items-center justify-center "
            >
              <Image
                src={"/assets/playwhite.svg"}
                width={50}
                height={50}
                alt={""}
              />
            </Button>
          )}
        </div>


      </div>
      <ul className="flex flex-col absolute p-4 bottom-1 gap-[3px] text-white ">
        <li className="mb-3 h-[14px]">
          <time className="text-[12px]">{showDateforCard}</time>
        </li>
        <li>
          <Link href={`/shows/${showNamePath}`}>
            <h2
              className={`text-[1rem] leading-6 lg:text-[1.375rem] h-fit max-w-[300px]`}
            >
              {showName}
            </h2>
          </Link>
        </li>
        <li>
          <span className={`text-[8px] sm:text-sm leading-5`}>
            {host && `Hosted by ${host}`}
          </span>
        </li>
      </ul>
      <ul className="h-fit flex gap-0  text-[11px] flex-row py-4 px-4 absolute text">
        {tags!.map((tag, index, array) => (
          <>
            <li className="w-fit">{tag}</li>
            {index !== array.length - 1 && <li>&nbsp;///&nbsp;</li>}
          </>
        ))}
      </ul>
    </article>
  );
};

export default ShowCard;
