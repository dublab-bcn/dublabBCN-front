import { LiveRadioData, WeekInfo } from "@/app/types";
import axios from "axios";

const streamingData = "https://dublabbcn.airtime.pro/api/live-info";
const weekInfo = "https://dublabbcn.airtime.pro/api/week-info";

let cachedData: LiveRadioData | null = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 30000;

const useAirtimeApi = () => {
  const getWeekInfo = async () => {
    const { data: schedule } = await axios.get<WeekInfo>(weekInfo);
    return schedule;
  };

  const getLiveRadioData = async (): Promise<LiveRadioData> => {
    try {
      const now = Date.now();
      if (cachedData && (now - cacheTimestamp) < CACHE_DURATION) {
        return cachedData;
      }

      const { data: onAirRadio } = await axios.get<LiveRadioData>(
        streamingData,
        {
          timeout: 8000,
        }
      );
      
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

  return { getWeekInfo, getLiveRadioData };
};

export default useAirtimeApi;