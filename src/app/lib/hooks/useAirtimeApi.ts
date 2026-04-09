import { LiveRadioData, WeekInfo } from "@/app/types";
import axios from "axios";

const streamingData = "https://dublabbcn.airtime.pro/api/live-info-v2";
const weekInfo = "https://dublabbcn.airtime.pro/api/week-info";

let cachedData: LiveRadioData | null = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 30000;

export const getWeekInfo = async (): Promise<WeekInfo | null> => {
  try {
    const res = await fetch(weekInfo, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      return null;
    }

    const schedule: WeekInfo = await res.json();
    return schedule;
  } catch (error) {
    return null;
  }
};

export const getLiveRadioData = async (): Promise<LiveRadioData> => {
  try {
    const now = Date.now();
    if (cachedData && (now - cacheTimestamp) < CACHE_DURATION) {
      return cachedData;
    }

    const { data: response } = await axios.get(
      streamingData,
      {
        timeout: 8000,
      }
    );

    // Map v2 API response to the expected LiveRadioData format used by components
    const onAirRadio: LiveRadioData = {
      currentShow: response.shows.current ? [response.shows.current] : [],
      nextShow: response.shows.next || [],
    };

    cachedData = onAirRadio;
    cacheTimestamp = now;

    return onAirRadio;
  } catch {
    if (cachedData) {
      return cachedData;
    }

    return {
      currentShow: [],
      nextShow: [],
      current: {},
      media: null
    } as LiveRadioData;
  }
};

const useAirtimeApi = () => {
  return { getWeekInfo, getLiveRadioData };
};

export default useAirtimeApi;