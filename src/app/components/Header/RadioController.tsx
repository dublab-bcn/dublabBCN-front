import useAirtimeApi from "@/app/lib/hooks/useAirtimeApi";
import useSWR from "swr";
import Image from "next/image";
import { LiveRadioData } from "@/app/types";
import he from "he";
import { useEffect, useRef, useState } from "react";
import Button from "../Button";
import { useAudio } from "@/app/contexts/useContexts";
import { useMixCloud } from "@/app/contexts/MixCloudContext";

export const streamingSource = "https://dublabbcn.out.airtime.pro/dublabbcn_a";

interface CurrentAndNextShowProps {
  liveData: LiveRadioData;
}

const RadioController = () => {
  const { getLiveRadioData } = useAirtimeApi();

  const { data: LiveRadioData } = useSWR("liveRadioData", getLiveRadioData);

  const currentShowName = LiveRadioData!?.currentShow[0]?.name || null;
  const nextShowStarts = LiveRadioData!?.nextShow[0]?.starts || null;
  const nextShowName = LiveRadioData!?.nextShow[0]?.name || null;
  const nextShowHost = LiveRadioData!?.nextShow[0]?.url || null;

  const decodedCurrentShow = currentShowName
      ? he.decode(currentShowName)
      : null;

    const { audio, setAudio } = useAudio();
    const { randomProgram } = useMixCloud();
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);
  
    useEffect(() => {
      setAudio(audioRef.current!);
    }, [setAudio]);
  
    const togglePlay = () => {
      if (isPlaying) {
        audio?.pause();
      } else {
        audio?.play();
      }
      setIsPlaying(!isPlaying);
    };
  
    const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
      const volume = +e.target.value;
      if (audio) {
        audio.volume = volume;
      }
    };

  return (
    <div className="h-[104px] sticky top-0 flex justify-between items-center pl-4 pr-4 lg:pr-32 md:pl-[50px] flex-row bg-black text-white font-Favorit text-sm font-light uppercase ltr-grid">
      <div className="min-w-fit flex gap-[200px] group">
        <audio src={streamingSource} ref={audioRef}></audio>
        <div className="grid grid-cols-5 gap-[5px] items-center">
          <Image
            className="animate-pulse animate-infinite animate-duration-[2000ms] animate-ease-in-out animate-normal"
            src={`/assets/${currentShowName ? "Ellipse_red.svg" : "Ellipse.svg"}`}
            alt={"Elipse"}
            width={"20"}
            height={"20"}
          />
          {currentShowName ? (
            <span className="block text-center col-span-2">
              LIVE
            </span>
          ) : (
            <span className="block text-center col-span-2">
              OFFLINE
            </span>
          )}
          <Button
              actionOnClick={togglePlay}
                  className="uppercase min-w-[42px] text-sm col-span-2"
                >
                  <Image
                  className="relative left-2 object-contain"
                  src={`/assets/${isPlaying ? "pause_radio.svg" : "play_radio.svg"}`}
                  alt={"Elipse"}
                  width={"50"}
                  height={"50"}
                />
          </Button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            onChange={changeVolume}
            className="col-span-5 appearance-none bg-white h-[7px] overflow-hidden"
          />
        </div>
      </div>
      <li className="flex gap-[9px]">
        
      <span className="min-w-fit"></span>
        {currentShowName ? (
          <div className="max-w-[200px]">
            En directe: {decodedCurrentShow}
          </div>
        ) : (
          <div className="max-w-[200px]">
            Offline
          </div>
        )}
      </li>
      <li className="text-white/60 hidden sm:flex ">
        PRÒXIM:
        {nextShowStarts ? (
          <div>
            <span className="ml-[19px]">{nextShowStarts.slice(11, 16)}</span>
            <span className="ml-[19px]">
              {he.decode(nextShowName as string)}
            </span>
            {nextShowHost && (
              <span>{he.decode(nextShowHost as string)}</span>
            )}
          </div>
        ) : (
          <span>Informació no disponible...</span>
        )}
      </li>
    </div>
  );
};

export default RadioController;
