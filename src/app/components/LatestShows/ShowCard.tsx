/* eslint-disable react/jsx-no-comment-textnodes */
"use client";
import extractUrlForEmbedPlayer from "@/app/lib/extractUrlForEmbedPlayer";
import { formatDateFromShow } from "@/app/lib/formatDateFromShows";
import { formatSlugToGetShowName, getShowNameWithoutDate } from "@/app/lib/processSlug";
import { RadioApiShow } from "@/app/types";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import Button from "../Button";
import Tags from "@/app/components/Profiles/Tag";

interface ShowCardProps {
  show: RadioApiShow;
  listPosition?: number;
  height: string;
  onClickPlayback: (show: string) => void;
  priority?: boolean;
}

const dublabApi = "https://api.dublab.cat";

const ShowCard = ({
  show: { slug, mixcloud_url, tags, host, profile_picture, date },
  height,
  onClickPlayback,
  priority = false,
}: ShowCardProps): React.ReactElement => {
  const showName = formatSlugToGetShowName(slug);
  const showNamePath = getShowNameWithoutDate(slug);
  const showDateforCard = formatDateFromShow(date);

  const showUrl = extractUrlForEmbedPlayer(mixcloud_url);

  const handleShowPlayback = () => {
    onClickPlayback(showUrl!);
  };

  const [isHovered, setIsHovered] = useState(false);

  const transformedHeight = parseInt(height, 10);

  return (
    <article className="group relative h-full rounded-xl overflow-hidden transition-shadow duration-300 shadow-lg hover:shadow-xl ">
      <div
        className={`flex flex-col brightness-50 hover:brightness-90 group relative
                    relative w-full aspect-square bg-gray-200
                    overflow-hidden transition-shadow duration-300 shadow-lg`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Image
          src={`${dublabApi}${profile_picture}`}
          alt={`Imatge del programa ${showName}`}
          height={transformedHeight}
          width={353}
          className={`w-full h-full object-cover transition-all duration-500 ease-in-out group-hover:scale-110`}
          onClick={handleShowPlayback}
          priority={priority}
          loading={priority ? undefined : "lazy"}
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
      <ul className="flex flex-col pt-1 md:p-4 text-black p-2 ">
        <Link href={`/shows/${showNamePath}`} className="mb-2">
          <li className="mb-2 h-[14px]">
            <time className="text-[12px]">{showDateforCard}</time>
          </li>
          <li>
            <h2
              className={`text-[1rem] leading-6 lg:text-[1.375rem] h-fit max-w-[300px]`}
            >
              {showName}
            </h2>

          </li>
          <li>
            <span className={`text-xs md:text-sm text-gray-600`}>
              {host && `Hosted by ${host}`}
            </span>
          </li>
        </Link>
        {tags &&
          <Tags tags={tags} isShows={true} />
        }
      </ul>
    </article>
  );
};

export default ShowCard;
