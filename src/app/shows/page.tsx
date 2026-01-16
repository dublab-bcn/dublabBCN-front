/* eslint-disable react-hooks/rules-of-hooks */

import { Metadata } from "next";
import ResponsiveProfilesList from "../components/Bsides/ResponsiveProfileList";
import getProfilesOrBsides from "../lib/getShowsOrBsides";
import useDublabApi from "../lib/hooks/useDublabApi";
import {ApiProfile} from "@/app/types";

export const metadata: Metadata = {
  title: "Programes",
  description:
    "Programes que s'emeten regularment a aquesta temporada de dublab BNC",
};

export const revalidate = 1800;

const ShowProfiles = async ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const searchQuery = searchParams?.search?.toString() || '';
  const tagsQuery = searchParams?.tags?.toString() || '';
  const { getProfiles } = useDublabApi();

  const fetchProfiles = (page: string) => {
    return getProfiles(page, searchQuery, tagsQuery);
  };
  
  const onAirProfiles = await getProfilesOrBsides(fetchProfiles, {
    maxTotalPages: 10,
  });
  
  const allProfilesList: ApiProfile[] = [];
  
  onAirProfiles.forEach((profilesList) => {
    if (profilesList.results.length > 0) {
      allProfilesList.push(...profilesList.results);
    }
  });

  return (
    <main className="flex flex-col mt-[219px]">
      <ul className="flex flex-row gap-[376px]">
        <li>
          <span className="h-[22px] px-8 ">COMING UP /// TODAY & TOMORROW</span>
        </li>
      </ul>
      <div className="flex text-[32px] sm:text-[72px] gap-[35px] sm:gap-[140px] pt-[62px] ml-8 ">
        <span>AAA</span>
        <h2>SHOWS</h2>
      </div>
      <section>
        <ResponsiveProfilesList key={0} podcastsList={allProfilesList} />
      </section>
    </main>
  );
};

export default ShowProfiles;
