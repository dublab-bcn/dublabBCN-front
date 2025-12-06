"use client";

import React from "react";
import {useState} from "react";
import Image from "next/image";
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
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

const QueueDisplay = () => {
  const { queu, setQueu, playNext} = useMixCloud();
  const [toggle, setToggle] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
    useSensor(TouchSensor, {
        activationConstraint: { delay: 250, tolerance: 5 },
    }),
  );

  if (queu.length === 0) {
    return null;
  }

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

  const handlePlayNext = () => {
    playNext();
  };


  return (
    <div id='queue-display'>
    {toggle && <div className="fixed bottom-20 right-4 bg-black text-white p-4 rounded-lg max-w-sm z-50" >
      <DndContext 
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={queu.map((q) => q.id)}
              strategy={verticalListSortingStrategy}
            >
              <ol className = "select-none list-decimal ml-6 mb-2">
                {queu.map((item) => 
                <li key={item.id}>
                  <SortableQueueItem item={item.showName} id={item.id} />
                </li>
                )}
              </ol>
            </SortableContext>
      </DndContext>
      
      <div className="text-center mb-1 float-right">
        <button
          onClick={() =>  handlePlayNext()} 
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold rounded-full w-[40px] h-[40px] p-0 items-center justify-center mr-2">
          <Image src={"/assets/play-next.svg"}
                          width={18.0}
                          height={18.0}
                          alt={"next"}
                          className="ml-[0.7rem]"
               ></Image>
        </button>
        <button 
        onClick={() => setToggle(!toggle)}
        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold rounded-full w-[40px] h-[40px] p-0 items-center justify-center">
          <Image src={"/assets/down.svg"}
                          width={20.0}
                          height={20.0}
                          alt={"down"}
                          className="ml-[0.8rem]"
               ></Image>
        </button>
      </div>
      
    </div>
    }
    {!toggle && <div className="fixed bottom-[5.3rem] right-4 bg-none p-4 max-w-sm z-40" >
        <button 
          onClick={() => setToggle(!toggle)}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold rounded-full w-[40px] h-[40px] p-0 items-center justify-center">
            <span className="pl-2 text-center flex items-center">
              <span className="pr-0.5">{queu.length}</span>
              
              <Image src={"/assets/up.svg"}
                          width={20.0}
                          height={20.0}
                          alt={"up"}
               ></Image>
        </span>
        </button>
      </div>
    }
    </div>
  );
};

export default QueueDisplay;