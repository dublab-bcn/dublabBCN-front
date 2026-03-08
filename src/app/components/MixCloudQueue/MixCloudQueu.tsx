"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Script from "next/script";
import { useMixCloud, QueuItem } from "@/app/contexts/MixCloudContext";
import { SortableQueueItem } from "./SortableQueueItem";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  TouchSensor,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

const QueueDisplay = () => {
  const { 
    queu, 
    setQueu, 
    playNext, 
    mixcloudLink, 
    iFrameShow, 
    randomProgram 
  } = useMixCloud();
  
  const [toggle, setToggle] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  const initWidget = React.useCallback(() => {
    if (!iframeRef.current || typeof window === 'undefined' || !window.Mixcloud?.PlayerWidget) return;
    
    const widget = window.Mixcloud.PlayerWidget(iframeRef.current);
    
    widget.ready
      .then(() => {
        if (widget.events && widget.events.ended) {
          widget.events.ended.on(() => {
            playNext();
          });
        }
      })
      .catch();
  }, [playNext]);

  useEffect(() => {
    initWidget();
  }, [mixcloudLink, initWidget]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 250, tolerance: 5 },
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;
    const activeId = String(active.id);
    const overId = String(over.id);
    if (activeId === overId) return;

    setQueu((prev: QueuItem[]) => {
      const oldIndex = prev.findIndex((q) => q.id === activeId);
      const newIndex = prev.findIndex((q) => q.id === overId);
      if (oldIndex === -1 || newIndex === -1) return prev;
      return arrayMove(prev, oldIndex, newIndex);
    });
  }

  if (!iFrameShow && queu.length === 0) {
      return (
         <button
            onClick={randomProgram}
            className="fixed flex bottom-[60px] left-0 z-40 p-2 bg-black text-white border border-black shadow-md"
          >
            <Image src={"/assets/random.svg"}
                width={18.0}
                height={18.0}
                alt={"next"}
                className="mx-[0.3rem]">
              
            </Image>
            Play Random
          </button>
      );
  }

  return (
    <div id="queue-display-container">
      <Script 
        src="https://widget.mixcloud.com/media/js/widgetApi.js" 
        strategy="lazyOnload" 
        onLoad={initWidget}
      />
      
      <button
        onClick={randomProgram}
        className="fixed flex bottom-[60px] left-0 z-40 p-2 bg-black text-white border border-black shadow-md"
      >
        <Image src={"/assets/random.svg"}
            width={18.0}
            height={18.0}
            alt={"next"}
            className="mr-[0.3rem]">
          
        </Image>
        Play Random
      </button>

      {toggle && queu.length > 0 && (
        <div className="fixed flex bottom-[101px] left-[0px] w-[290px] z-40 p-4 bg-white text-black border border-black shadow-md">
          <div className="bg-white text-black w-full rounded-lg flex flex-col z-50">
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={queu.map((q) => q.id)}
                strategy={verticalListSortingStrategy}
              >
                <ol className="select-none list-decimal ml-6 mb-2">
                  {queu.map((item) => (
                    <li key={item.id}>
                      <SortableQueueItem item={item.showName} id={item.id} />
                    </li>
                  ))}
                </ol>
              </SortableContext>
            </DndContext>

            <div className="text-center mb-1 float-right flex gap-2">
              <button
                onClick={() => playNext()}
                className="bg-black text-gray-800 font-bold rounded-full w-[30px] h-[30px] flex items-center justify-center"
              >
                <Image
                  src={"/assets/play-next.svg"}
                  width={18.0}
                  height={18.0}
                  alt={"next"}
                  className="object-contain"
                />
              </button>
            </div>
          </div>
        </div>
        
      )}

      {queu.length > 0 && (
        <button className="fixed flex justify-center w-[145px] bottom-[60px] left-[145px] z-40 p-2 bg-white text-black border border-black shadow-md gap-2"
                onClick={() => setToggle(!toggle)}>
          <span
            className="bg-black text-white font-bold rounded-full p-0 flex items-center justify-center w-[25px]">
              {queu.length}
          </span>
          <span>Queue</span>
        </button>
      )}

      {iFrameShow && (
        <div id="mixcloud-player" className="fixed bottom-0 left-0 w-full z-40 bg-black">
          <iframe
            ref={iframeRef}
            title="Radio Player"
            className="w-full"
            height="60"
            allow="autoplay"
            src={`https://player-widget.mixcloud.com/widget/iframe/?hide_cover=1&mini=1&autoplay=1&feed=/${mixcloudLink}`}
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default QueueDisplay;