import { motion } from 'framer-motion';
import { useStorylineStore } from '@/store/storylineStore';
import { useDroppable } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { DndContext, DragEndEvent, DragOverlay } from '@dnd-kit/core';
import { useState } from 'react';

interface SortableBlockProps {
  prompt: any;
  index: number;
}

const SortableBlock = ({ prompt, index }: SortableBlockProps) => {
  const { removeFromSequence } = useStorylineStore();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: prompt.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className="mb-4">
      <div className="glass-panel rounded-xl p-4 group hover:bg-white/10 transition-all">
        <div className="flex gap-4">
          {/* Sequence Number */}
          <div className="flex flex-col items-center gap-2">
            <div className="aurora-pill aurora-pill-purple w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
              {index + 1}
            </div>
            <div {...listeners} {...attributes} className="cursor-grab active:cursor-grabbing">
              <GripVertical className="h-5 w-5 text-white/40 hover:text-white/80 transition-colors" />
            </div>
          </div>

          {/* Image */}
          <img
            src={prompt.imageRef}
            alt={prompt.title}
            className="w-32 h-32 rounded-lg object-cover"
          />

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h3 className="text-white font-semibold text-lg mb-2">{prompt.title}</h3>
            <p className="text-white/70 text-sm line-clamp-2 mb-3">
              {prompt.promptText}
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="aurora-pill aurora-pill-cyan text-xs">{prompt.shotType}</span>
              <span className="aurora-pill aurora-pill-orange text-xs">{prompt.mood}</span>
            </div>
          </div>

          {/* Remove Button */}
          <Button
            onClick={() => removeFromSequence(prompt.id)}
            variant="ghost"
            size="sm"
            className="opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive/20"
          >
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export const StorylineCanvas = () => {
  const { storylineSequence, addToSequence, reorderSequence } = useStorylineStore();
  const [activeId, setActiveId] = useState<string | null>(null);

  const { setNodeRef, isOver } = useDroppable({
    id: 'storyline-canvas',
  });

  const handleDragStart = (event: any) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null);
    const { active, over } = event;

    if (!over) return;

    // Adding from tray to canvas
    if (over.id === 'storyline-canvas' && !storylineSequence.find(p => p.id === active.id)) {
      const promptData = active.data.current as any;
      if (promptData && promptData.id) {
        addToSequence(promptData);
      }
      return;
    }

    // Reordering within canvas
    if (active.id !== over.id) {
      const oldIndex = storylineSequence.findIndex((p) => p.id === active.id);
      const newIndex = storylineSequence.findIndex((p) => p.id === over.id);
      if (oldIndex !== -1 && newIndex !== -1) {
        reorderSequence(oldIndex, newIndex);
      }
    }
  };

  const activePrompt = storylineSequence.find(p => p.id === activeId);

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div
        ref={setNodeRef}
        className={`glass-panel rounded-2xl p-6 h-[calc(100vh-180px)] overflow-y-auto custom-scrollbar transition-all ${
          isOver ? 'ring-2 ring-primary' : ''
        }`}
      >
        {storylineSequence.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="h-full flex items-center justify-center text-center"
          >
            <div>
              <div className="text-6xl mb-4">🎬</div>
              <h3 className="text-white text-xl font-semibold mb-2">
                Your Canvas Awaits
              </h3>
              <p className="text-white/60">
                Drag prompts from the left tray to start building your storyline.
              </p>
            </div>
          </motion.div>
        ) : (
          <SortableContext
            items={storylineSequence.map((p) => p.id)}
            strategy={verticalListSortingStrategy}
          >
            {storylineSequence.map((prompt, index) => (
              <SortableBlock key={prompt.id} prompt={prompt} index={index} />
            ))}
          </SortableContext>
        )}
      </div>

      <DragOverlay>
        {activePrompt ? (
          <div className="glass-panel rounded-xl p-3 opacity-80">
            <div className="flex gap-3">
              <img
                src={activePrompt.imageRef}
                alt={activePrompt.title}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div>
                <h3 className="text-white text-sm font-medium">{activePrompt.title}</h3>
                <p className="text-white/60 text-xs">{activePrompt.shotType}</p>
              </div>
            </div>
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};
