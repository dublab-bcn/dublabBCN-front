import {
  ApiBsidesList,
  ApiProfile,
  ApiProfilesList,
  Bside,
  LatestShowsData,
  RadioShow,
} from "@/app/types";
import axios from "axios";

const profileDataUrl = "https://api.dublab.cat/api/profiles/";
const bsideDataUrl = "https://api.dublab.cat/api/b-sides/";
const archivedProfileData = "https://api.dublab.cat/api/archived/";
const bsidesListUrl = "https://api.dublab.cat/api/b-sides/";
const latestShowsData = "https://api.dublab.cat/api/shows/?page=";
const showData = "https://api.dublab.cat/api/shows/";
const archivedProfilesList = "https://api.dublab.cat/api/archived/";

const useDublabApi = () => {
  const getProfiles = async (page?: string | number, search?: string, tags?: string) => {
    const params = new URLSearchParams();
    if (page && page !== '') {
      params.append('page', page.toString());
    }
    
    if (search && search.trim() !== '') {
      params.append('search', search.trim());
    }

    if (tags && tags.trim() !== '') {
      params.append('tags', tags.trim());
    }
    
    const { data: profiles } = await axios.get<ApiProfilesList>(
      `${profileDataUrl}?${params.toString()}`,
    );
    return profiles;
  };

  const getArchivedProfiles = async (page?: string | number, search?: string, tags?: string) => {
    const params = new URLSearchParams();
    if (page && page !== '') {
      params.append('page', page.toString());
    }
    
    if (search && search.trim() !== '') {
      params.append('search', search.trim());
    }

    if (tags && tags.trim() !== '') {
      params.append('tags', tags.trim());
    }
    
    const { data: archivedProfiles } = await axios.get<ApiProfilesList>(
      `${archivedProfilesList}?${params.toString()}`,
    );
    return archivedProfiles;
  };

  const getProfileData = async (showName: string) => {
    try {
      const trimmedName = showName.toLowerCase().replace(/\s+$/, "");
      const formatedShowName = trimmedName.replace(/\s+/g, "-");

      let finalShowName = formatedShowName;

      if (showName === "br") {
        finalShowName = "please-come-to-brasil";
      }
      if (showName === "When...Plants...Sing") {
        finalShowName = "whenplantssing";
      }
      if (showName === "@cero.en.conducta") {
        finalShowName = "cero-en-conducta";
      }
      if (showName === "MacGuffin 2.0") {
        finalShowName = "macguffin-20";
      }

      const { data: profile } = await axios.get<ApiProfile>(
        `${profileDataUrl}${finalShowName}`,
      );

      return profile;
    } catch (error: unknown) {
      // eslint-disable-next-line no-console
      console.error(`Error fetching profile for show "${showName}":`, error);

      return null;
    }
  };

  const getArchivedProfileData = async (showName: string) => {
    try {
      const trimmedName = showName.toLowerCase().replace(/\s+$/, "");
      let formatedShowName = trimmedName.replace(/\s+/g, "-");

      if (formatedShowName === "MacGuffin 2.0") {
        formatedShowName = "macguffin-20";
      }

      const { data: profile } = await axios.get<ApiProfile>(
        `${archivedProfileData}${formatedShowName}`,
      );

      return profile;
    } catch (error: unknown) {
      const message = "profile is not currently online";
      throw new Error(message);
    }
  };

  const getSingleShowData = async (slug: string) => {
    const { data: show } = await axios.get<RadioShow>(`${showData}${slug}`);

    return show;
  };

  const getLatestsShowsData = async (page: number) => {
    const { data: latestShows } = await axios.get<LatestShowsData>(
      `${latestShowsData}${page}`,
    );
    return latestShows;
  };

  const getBsides = async (page?: string | number, search?: string, tags?: string) => {
    const params = new URLSearchParams();
    if (page && page !== '') {
      params.append('page', page.toString());
    }
    
    if (search && search.trim() !== '') {
      params.append('search', search.trim());
    }

    if (tags && tags.trim() !== '') {
      params.append('tags', tags.trim());
    }
    
    const { data: bSides } = await axios.get<ApiBsidesList>(
      `${bsidesListUrl}?${params.toString()}`,
    );
    return bSides;
  };

  const getBsideData = async (bSideSlug: string) => {
    const { data: bSide } = await axios.get<Bside>(
      `${bsideDataUrl}${bSideSlug}`,
    );
    return bSide;
  };

  return {
    getArchivedProfileData,
    getArchivedProfiles,
    getSingleShowData,
    getLatestsShowsData,
    getProfileData,
    getProfiles,
    getBsides,
    getBsideData,
  };
};

export default useDublabApi;
