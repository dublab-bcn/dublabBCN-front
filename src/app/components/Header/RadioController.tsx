import useAirtimeApi from "@/app/lib/hooks/useAirtimeApi";
import useSWR from "swr";
import Image from "next/image";
import he from "he";
import { useEffect, useRef, useState, useCallback } from "react";
import Button from "../Button";
import { useAudio } from "@/app/contexts/useContexts";


export const streamingSource = "https://dublabbcn.out.airtime.pro/dublabbcn_a";

const RadioController = () => {
  const { getLiveRadioData } = useAirtimeApi();

  const {
    data: LiveRadioData,
    isLoading
  } = useSWR("liveRadioData", getLiveRadioData, {
    refreshInterval: 30000,
    revalidateOnFocus: true,
    dedupingInterval: 10000,
    errorRetryCount: 3,
    errorRetryInterval: 5000,
  });

  const { setAudio } = useAudio();
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasAudioError, setHasAudioError] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current && setAudio) {
      setAudio(audioRef.current);
    }
  }, [setAudio]);

  const togglePlay = useCallback(() => {
    if (!audioRef.current) return;

    const audio = audioRef.current;

    if (!audio.paused) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play()
        .then(() => {
          setIsPlaying(true);
          setHasAudioError(false);
        })
        .catch(() => {
          setHasAudioError(true);
          setIsPlaying(false);
        });
    }
  }, []);

  useEffect(() => {
    const audioEl = audioRef.current;
    if (!audioEl) return;

    const handlePlay = () => {
      setIsPlaying(true);
      setHasAudioError(false);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    const handleError = () => {
      setHasAudioError(true);
      setIsPlaying(false);
    };

    audioEl.addEventListener('play', handlePlay);
    audioEl.addEventListener('pause', handlePause);
    audioEl.addEventListener('error', handleError);
    audioEl.addEventListener('ended', handlePause);

    return () => {
      audioEl.removeEventListener('play', handlePlay);
      audioEl.removeEventListener('pause', handlePause);
      audioEl.removeEventListener('error', handleError);
      audioEl.removeEventListener('ended', handlePause);
    };
  }, []);

  const currentShowName = LiveRadioData?.currentShow?.[0]?.name || null;
  const nextShowStarts = LiveRadioData?.nextShow?.[0]?.starts || null;
  const nextShowName = LiveRadioData?.nextShow?.[0]?.name || null;
  const nextShowHost = LiveRadioData?.nextShow?.[0]?.url || null;

  const showAsLive = !!currentShowName;


  if (isLoading) {
    return (
      <div className="flex gap-3 justify-between items-center pl-4 pr-4 md:pr-8 2xl:pl-[50px] flex-row bg-black text-white font-Favorit text-sm font-light uppercase">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 rounded-full bg-gray-600 animate-pulse"></div>
          <span className="text-xs">Loading...</span>
          <Button className="uppercase text-sm" disabled>
            <Image
              className="relative object-contain opacity-50"
              src="/assets/play_radio.svg"
              alt="Play"
              width={50}
              height={50}
            />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-row gap-3 justify-center md:justify-between items-center pl-4 pr-4 md:pr-8 2xl:pl-[50px] bg-black text-white font-Favorit text-sm font-light uppercase py-2">
      <audio
          src={streamingSource}
          ref={audioRef}
          preload="metadata"
          crossOrigin="anonymous"
        >
          <track
            kind="captions"
            src=""
            srcLang="ca"
            label="Català"
          />
      </audio>
      <div className={`flex flex-none gap-3 items-center justify-center md:justify-end`}>
          <Image
            className={`animate-pulse animate-infinite animate-duration-[2000ms] animate-ease-in-out ${showAsLive ? "animate-normal" : "animate-alternate"}`}
            src={`/assets/${showAsLive ? "Ellipse_red.svg" : "Ellipse.svg"}`}
            alt="Status indicator"
            width={20}
            height={20}
          />
          {hasAudioError && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-500 rounded-full"></div>
          )}
        {showAsLive ? (
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
          className="uppercase text-sm hover:opacity-80 transition-opacity"
          disabled={hasAudioError}
        >
          <Image
            className="relative object-contain"
            src={`/assets/${isPlaying ? "pause_radio.svg" : "play_radio.svg"}`}
            alt={isPlaying ? "Pause" : "Play"}
            width={50}
            height={50}
          />
        </Button>
      </div>

      {showAsLive && currentShowName && (
        <span className="text-xs md:text-base border border-slate-600 rounded-md px-3 py-1 md:max-w-[200px] lg:max-w-[300px]">
          En directe: {currentShowName}
        </span>
      )}

      {nextShowStarts ? (
        <span className={`text-gray-400 text-xs truncate ${showAsLive ? "hidden lg:flex" : "flex"} `}>
          PRÒXIM: {nextShowStarts.slice(11, 16)} {nextShowName}
          {nextShowHost && (
            <span className="ml-1 text-gray-500">• {he.decode(nextShowHost as string)}</span>
          )}
        </span>
      ) : (
        <span className="hidden text-gray-500 text-xs lg:flex">Informació no disponible...</span>
      )}
    </div>
  );
};

export default RadioController;