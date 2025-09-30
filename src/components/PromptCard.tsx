import { motion, PanInfo } from 'framer-motion';
import { Prompt } from '@/store/storylineStore';
import { useState } from 'react';

interface PromptCardProps {
  prompt: Prompt;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  style?: React.CSSProperties;
}

export const PromptCard = ({ prompt, onSwipeLeft, onSwipeRight, style }: PromptCardProps) => {
  const [exitX, setExitX] = useState(0);

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 150;
    if (Math.abs(info.offset.x) > threshold) {
      setExitX(info.offset.x > 0 ? 1000 : -1000);
      if (info.offset.x > 0) {
        onSwipeRight();
      } else {
        onSwipeLeft();
      }
    }
  };

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      animate={{ x: exitX }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      style={style}
      className="absolute w-full max-w-md cursor-grab active:cursor-grabbing"
    >
      <div className="glass-panel rounded-3xl overflow-hidden shadow-2xl">
        {/* Image Section - 70% */}
        <div className="relative h-[420px] overflow-hidden">
          <img
            src={prompt.imageRef}
            alt={prompt.title}
            className="w-full h-full object-cover"
            draggable={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>

        {/* Content Section - 30% */}
        <div className="p-6 space-y-3">
          <h2 className="text-white font-semibold text-xl">{prompt.title}</h2>
          
          <div className="flex flex-wrap gap-2">
            <span className="aurora-pill aurora-pill-purple">{prompt.category}</span>
            <span className="aurora-pill aurora-pill-cyan">{prompt.mood}</span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {prompt.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs rounded-full bg-white/10 text-white/80 border border-white/20"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
