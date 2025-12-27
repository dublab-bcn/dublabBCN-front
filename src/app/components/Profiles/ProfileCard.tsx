/* eslint-disable react/jsx-no-comment-textnodes */
"use client";
import descriptionFormatting from "@/app/lib/descriptionFormatting";
import { formatSlugToGetShowName } from "@/app/lib/processSlug";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import Tags from "./Tag";

interface Profile {
  host?: string;
  picture: string;
  tags: string[];
  slug: string;
  description: string;
}

interface ProfileCardProps {
  profile: Profile;
  listPosition?: number;
  height: string;
}

const ProfileCard = ({
  profile: { host, picture, tags, slug, description },
  height,
}: ProfileCardProps): React.ReactElement => {
  const pathname = usePathname();
  let dynamicPath;

  if (pathname === "/b-sides") {
    dynamicPath = "b-sides";
  } else if (pathname === "/shows") {
    dynamicPath = "shows";
  } else {
    dynamicPath = "arxiu";
  }

  const isShows = dynamicPath === "shows";

  const showName = formatSlugToGetShowName(slug);

  const changeBackgroundPath = ["/b-sides","/arxiu"].includes(pathname);

  const defaultImage = picture ? picture : "/assets/default-arxiu.jpg";

  return (
    <a href={`/${dynamicPath}/${slug}`}>
      <article className="w-full h-full">
            <div className={"block group relative h-full rounded-xl overflow-hidden transition-shadow duration-300 shadow-lg hover:shadow-xl " + (changeBackgroundPath ? 'shadow-cyan-500/50' : '')}>
              <div className="relative h-48 sm:h-64 md:h-64 w-full overflow-hidden bg-gray-200">
                <img
                  src={defaultImage}
                  alt={`Imatge del programa ${slug}`}
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-in-out group-hover:scale-110"
                  style={{
                    maxHeight: '350px',
                    maxWidth: '100%',
                  }}
                />
              </div>
              
              <div className="flex-1 p-4 flex flex-col justify-between">
              <div>
                <h1 className="text-xl font-bold mb-2">{showName}</h1>
                {host && <span className="text-sm text-gray-600">Hosted by {host}</span>}
              </div>
              
                <div className="mt-4">
                  <Tags tags={tags} isShows={isShows} />
                </div>
              </div>
            </div>

      </article>
    </a>
    

  );
};
export default ProfileCard;
