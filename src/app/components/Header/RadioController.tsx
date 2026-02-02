import useAirtimeApi from "@/app/lib/hooks/useAirtimeApi";
import useSWR from "swr";
import Image from "next/image";
import he from "he";
import { useEffect, useRef, useState } from "react";
import Button from "../Button";
import { useAudio } from "@/app/contexts/useContexts";

export const streamingSource = "https://dublabbcn.out.airtime.pro/dublabbcn_a";

const RadioController = () => {
  const { getLiveRadioData } = useAirtimeApi();

  const { data: LiveRadioData } = useSWR("liveRadioData", getLiveRadioData);

  const currentShowName = LiveRadioData?.currentShow[0]?.name || null;
  const nextShowStarts = LiveRadioData?.nextShow[0]?.starts || null;
  const nextShowName = LiveRadioData?.nextShow[0]?.name || null;
  const nextShowHost = LiveRadioData?.nextShow[0]?.url || null;

  const decodedCurrentShow = currentShowName
      ? he.decode(currentShowName)
      : null;

    const { audio, setAudio } = useAudio();
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

  return (
    <div className="flex gap-3 justify-between items-center pl-4 pr-4 md:pr-8 2xl:pl-[50px] flex-row bg-black text-white font-Favorit text-sm font-light uppercase">
      <div className={`flex flex-none gap-3 items-center ${!currentShowName && "w-full justify-center md:w-64 md:justify-end"}`}>
        <audio src={streamingSource} ref={audioRef}>
        <track
          kind="captions"
          src="" 
          srcLang="ca"
          label="Català"
        />
      </audio>
        <Image
          className="animate-pulse animate-infinite animate-duration-[2000ms] animate-ease-in-out animate-normal relative"
          src={`/assets/${currentShowName ? "Ellipse_red.svg" : "Ellipse.svg"}`}
          alt={"Elipse"}
          width={"20"}
          height={"20"}
        />
        {currentShowName ? (
          <span className="block text-center">
            LIVE
          </span>
        ) : (
          <span className="block text-center">
            OFFLINE
          </span>
        )}
        <Button
            actionOnClick={togglePlay}
                className="uppercase text-sm"
              >
                <Image
                className="relative object-contain"
                src={`/assets/${isPlaying ? "pause_radio.svg" : "play_radio.svg"}`}
                alt={"Elipse"}
                width={"50"}
                height={"50"}
              />
        </Button>
      </div>
      {currentShowName && (
        <span className="text-xs md:text-base border border-slate-600 rounded-md px-3 py-1 border border-slate-600 ">
          En directe: {decodedCurrentShow}
        </span>
        )
      }

      {nextShowStarts ? (
          <span className="text-gray-500 md:text-xs hidden sm:flex">PRÒXIM: {nextShowStarts.slice(11, 16)} {he.decode(nextShowName as string)}
            {nextShowHost && (
              <span>{he.decode(nextShowHost as string)}</span>
            )}
          </span>
      ) : (
        <span className="text-gray-500 md:text-xs hidden sm:flex rounded-md px-3 py-1">Informació no disponible...</span>
      )}
    </div>
  );
};

export default RadioController;
