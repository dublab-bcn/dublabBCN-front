"use client";
import { createContext, useContext, ReactNode, useState, useEffect, useRef, Dispatch, SetStateAction} from "react";
import useDublabApi from "@/app/lib/hooks/useDublabApi";
import extractUrlForEmbedPlayer from "@/app/lib/extractUrlForEmbedPlayer";

export interface QueuItem {
  id: string;
  showName: string;
}

interface MixCloudContextType {
  MixCloud: () => void;
  play: () => void;
  playProgram: (mixcloudLink: string) => void;
  addToQueu: (mixcloudLink: string, showName: string) => void;
  deleteElementQueue: (id: string) => void;
  iFrameShow: boolean;
  setIFrameShow: (value: boolean) => void;
  queu: QueuItem[];
  setQueu: Dispatch<SetStateAction<QueuItem[]>>;
  playNext: () => void;
  randomProgram: () => void;
}

const MixCloudContext = createContext<MixCloudContextType | undefined>(undefined);

export const MixCloudProvider = ({ children }: { children: ReactNode }) => {
  const [iFrameShow, setIFrameShow] = useState(false);
  const { getLatestsShowsData } = useDublabApi();
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [queu, setQueu] = useState<QueuItem[]>([]);
  const [mixcloudLink, setMixcloudLink] = useState("");

  const playNext = () => {
    setQueu((prev) => {
      const [next, ...rest] = prev;
      if (next) {
        setMixcloudLink(next.id);
        setIFrameShow(true);
        return rest;
      } else {
        setIFrameShow(false);
        return [];
      }
    });
  };

  useEffect(() => {
    const initWidget = () => {
      if (!iframeRef.current || !window.Mixcloud?.PlayerWidget) return;
      const widget = window.Mixcloud.PlayerWidget(iframeRef.current);
      widget.ready.then(() => {
        if (widget.events && widget.events.ended) {
          widget.events.ended.on(() => {
            playNext();
          });
        }
      }).catch(() => {
      });
    };

    if (!window.Mixcloud) {
      const s = document.createElement("script");
      s.src = "https://widget.mixcloud.com/media/js/widgetApi.js";
      s.async = true;
      s.onload = initWidget;
      document.body.appendChild(s);
      return () => {
        s.onload = null;
      };
    } else {
      initWidget();
    }
  }, [mixcloudLink, playNext]);


  const MixCloud = () => {
    setIFrameShow(true);
  };

  const play = () => {
    setIFrameShow(true);
  };

  const playProgram = (mixcloudLink: string) => {
    setMixcloudLink(mixcloudLink);
    setIFrameShow(true);
  };

  const randomNumberInRange = (min: number, max: number) => {
        return Math.floor(Math.random()
            * (max - min + 1)) + min;
    };

  const randomProgram = async () => {
    const randomPage = randomNumberInRange(1, 10);
    const randomShowIndex = randomNumberInRange(0, 7);
    const { results: latestShows } = await getLatestsShowsData(randomPage);
    const randomShow = latestShows[randomShowIndex];
    const showUrl = extractUrlForEmbedPlayer(randomShow.mixcloud_url);
    playProgram(showUrl);
  };

  const addToQueu = (url: string, showName: string) => {
    const newItem: QueuItem = { id: url, showName: showName };
    const urlExists = queu.find((item) => item.id === url);
    if (urlExists) return;
    setQueu((prev) => {
      if (!iFrameShow && prev.length === 0) {
        setMixcloudLink(newItem.id);
        setIFrameShow(true);
        return prev;
      }
      return [...prev, newItem];
    });
  };

  const deleteElementQueue = (id: string) => {
    setQueu((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <MixCloudContext.Provider value={{ MixCloud, play, playProgram, playNext, iFrameShow, setIFrameShow, queu, setQueu, addToQueu, deleteElementQueue, randomProgram }}>
      {children}
      {iFrameShow && (
        <div id="mixcloud-player">
          <iframe
            ref={iframeRef}
            title="Programa de radio seleccionat"
            className=" w-screen fixed bottom-0 left-0 z-40"
            height="60"
            allow="autoplay"
            src={`https://player-widget.mixcloud.com/widget/iframe/?hide_cover=1&mini=1&autoplay=1&feed=/${mixcloudLink}`}
          ></iframe>
        </div>
      )}
    </MixCloudContext.Provider>
  );
};

export const useMixCloud = () => {
  const context = useContext(MixCloudContext);
  if (!context) {
    throw new Error("MixCloudContext must be used within a MixCloudProvider");
  }
  return context;
};