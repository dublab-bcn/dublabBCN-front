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
    <main className="flex flex-col md:pl-[50px] md:pr-[50px] pt-[260px] md:pt-[280px] 2xl:pt-[340px] pb-16">
      <ResponsiveProfilesList key={0} podcastsList={allProfilesList} />
    </main>
  );
};

export default ShowProfiles;
