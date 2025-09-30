import { motion } from 'framer-motion';
import { useStorylineStore } from '@/store/storylineStore';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { GripVertical, Trash2, Copy, Check } from 'lucide-react';
import { Button } from './ui/button';
import { useState } from 'react';
import { toast } from 'sonner';

interface StoryBlockProps {
  prompt: any;
  index: number;
}

const StoryBlock = ({ prompt, index }: StoryBlockProps) => {
  const { removeFromSequence } = useStorylineStore();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt.promptText);
      setCopied(true);
      toast.success('Prompt copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error('Failed to copy prompt');
    }
  };

  return (
    <Draggable draggableId={prompt.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          style={{
            ...provided.draggableProps.style,
            opacity: snapshot.isDragging ? 0.8 : 1,
          }}
          className="mb-4"
        >
          <div className="glass-panel rounded-xl p-4 group hover:bg-white/20 transition-all">
            <div className="flex gap-4">
              {/* Sequence Number & Drag Handle */}
              <div className="flex flex-col items-center gap-2">
                <div className="aurora-pill aurora-pill-cyan w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
                <div {...provided.dragHandleProps} className="cursor-grab active:cursor-grabbing">
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
                  <span className="aurora-pill aurora-pill-green text-xs">{prompt.shotType}</span>
                  <span className="aurora-pill aurora-pill-orange text-xs">{prompt.mood}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2">
                <Button
                  onClick={handleCopy}
                  variant="ghost"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/10"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-green-400" />
                  ) : (
                    <Copy className="h-4 w-4 text-white" />
                  )}
                </Button>
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
        </div>
      )}
    </Draggable>
  );
};

export const StorylineCanvas = () => {
  const { storylineSequence } = useStorylineStore();

  return (
    <Droppable droppableId="canvas">
      {(provided, snapshot) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className={`glass-panel rounded-2xl p-6 h-[calc(100vh-180px)] overflow-y-auto custom-scrollbar transition-all ${
            snapshot.isDraggingOver ? 'ring-2 ring-cyan-400 bg-white/5' : ''
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
                <h3 className="text-white text-xl font-semibold mb-2">Your Canvas Awaits</h3>
                <p className="text-white/60">
                  Drag prompts from the left tray to start building your storyline.
                </p>
              </div>
            </motion.div>
          ) : (
            storylineSequence.map((prompt, index) => (
              <StoryBlock key={prompt.id} prompt={prompt} index={index} />
            ))
          )}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};
