/* eslint-disable react-hooks/rules-of-hooks */

import { Metadata } from "next";
import ResponsiveProfilesList from "@/app/components/Playlists/ResponsivePlaylists";
import useDublabApi from "../lib/hooks/useDublabApi";
import {ApiProfile} from "@/app/types";

export const metadata: Metadata = {
  title: "Playlists",
  description:
    "Playlists curades",
};

export const revalidate = 1800;

const ShowPlaylists = async () => {
  const { getPlaylistsData } = useDublabApi();
  
  const apiResponse = await getPlaylistsData();
  
  const playlists: ApiProfile[] = [];
  
  playlists.push(...apiResponse.results);

  return (
    <main className="flex flex-col md:pl-[50px] md:pr-[50px] pt-[160px] md:pt-[220px] 2xl:pt-[250px] pb-16">
      <ResponsiveProfilesList key={0} podcastsList={playlists} />
    </main>
  );
};

export default ShowPlaylists;
