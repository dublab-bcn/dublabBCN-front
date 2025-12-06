/* eslint-disable jsx-a11y/media-has-caption */
"use client";
import { useEffect, useRef, useState } from "react";
import Button from "../Button";
import Image from "next/image";
import { useAudio } from "@/app/contexts/useContexts";
import { useMixCloud } from "@/app/contexts/MixCloudContext";

export const streamingSource = "https://dublabbcn.out.airtime.pro/dublabbcn_a";

const AudioPlayer = () => {
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
    <div className="min-w-fit flex gap-[200px] group  ">
      <audio src={streamingSource} ref={audioRef}></audio>
      <div className="group z-40 relative ml-6 hidden lg:block">
        <span className="visible group-hover:invisible z-40 min-h-[30px] absolute ">
          Volume
        </span>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          onChange={changeVolume}
          className="group-hover:visible invisible z-40 absolute mt-2 mr-10 appearance-none bg-white w-[180px] h-[7px] overflow-hidden"
        />
      </div>
      <div className="flex gap-[20px] group">
        <Button
                actionOnClick={togglePlay}
                className="uppercase z-20 min-w-[42px] text-sm"
              >
                {isPlaying ? "Pause" : "Play"}
        </Button>
        <button
          type="button" 
          onClick={() => randomProgram()}
          className="uppercase z-20 min-w-[42px]"
         >
            <Image src={"/assets/random.svg"}
                    width={20.0}
                    height={20.0}
                    alt={"D-B"}
            ></Image>
      </button>
      </div>
      
    </div>
    
  );
};

export default AudioPlayer;
