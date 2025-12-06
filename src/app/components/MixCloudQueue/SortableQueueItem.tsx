"use client";

import { useSortable } from "@dnd-kit/sortable";
import {CSS} from '@dnd-kit/utilities';
import { useMixCloud } from "@/app/contexts/MixCloudContext";

export const SortableQueueItem = ({ id, item }: { id: string; item: string }) => {
  const context = useMixCloud();

  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleDelete = () => {
    context.deleteElementQueue(id);
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="p-2 bg-gray-800 rounded mb-2 cursor-grab active:cursor-grabbing flex items-center touch-none">
      <span className="flex-1 truncate w-[90%]">{item}</span>
      <span className="flex-none w-[10%]"> 
        <button type="button"
            className="ml-2 text-red-500 flloat-right"
            onClick={handleDelete}
            onPointerDown={(e) => e.stopPropagation()}>
            ×
        </button>
      </span>
      
    </div>
  );
};