import { motion } from 'framer-motion';
import { useStorylineStore } from '@/store/storylineStore';
import { useDraggable } from '@dnd-kit/core';
import { GripVertical } from 'lucide-react';

interface DraggablePromptProps {
  prompt: any;
}

const DraggablePrompt = ({ prompt }: DraggablePromptProps) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: prompt.id,
    data: prompt,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        opacity: isDragging ? 0.5 : 1,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="glass-panel rounded-xl p-3 cursor-grab active:cursor-grabbing hover:bg-white/10 transition-all"
    >
      <div className="flex gap-3">
        <GripVertical className="h-5 w-5 text-white/40 flex-shrink-0 mt-1" />
        <img
          src={prompt.imageRef}
          alt={prompt.title}
          className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <h3 className="text-white text-sm font-medium truncate">{prompt.title}</h3>
          <p className="text-white/60 text-xs mt-1">{prompt.shotType}</p>
        </div>
      </div>
    </div>
  );
};

export const SelectedPromptsTray = () => {
  const { selectedPrompts } = useStorylineStore();

  return (
    <div className="glass-panel rounded-2xl p-6 h-[calc(100vh-180px)] flex flex-col">
      <div className="mb-4">
        <h2 className="text-white font-semibold">Selected Prompts</h2>
        <p className="text-white/60 text-sm mt-1">
          Drag to canvas to sequence ({selectedPrompts.length})
        </p>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
        {selectedPrompts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 text-white/40"
          >
            <p>No prompts selected yet.</p>
            <p className="text-sm mt-2">Swipe right on prompts to add them here.</p>
          </motion.div>
        ) : (
          selectedPrompts.map((prompt) => (
            <DraggablePrompt key={prompt.id} prompt={prompt} />
          ))
        )}
      </div>
    </div>
  );
};
