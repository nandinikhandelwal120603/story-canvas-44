import { motion } from 'framer-motion';
import { Download, ArrowLeft } from 'lucide-react';
import { useStorylineStore } from '@/store/storylineStore';
import { Button } from './ui/button';
import { SelectedPromptsTray } from './SelectedPromptsTray';
import { StorylineCanvas } from './StorylineCanvas';
import { useNavigate } from 'react-router-dom';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

export const StorylineBuilder = () => {
  const { storylineSequence, exportToJSON, addToSequence, removeFromSelected, reorderSequence } =
    useStorylineStore();
  const navigate = useNavigate();

  const onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;

    // Dropped outside any droppable
    if (!destination) return;

    // Moving from tray to canvas
    if (source.droppableId === 'tray' && destination.droppableId === 'canvas') {
      const { selectedPrompts } = useStorylineStore.getState();
      const prompt = selectedPrompts.find((p) => p.id === draggableId);
      if (prompt) {
        addToSequence(prompt);
        removeFromSelected(draggableId);
      }
      return;
    }

    // Reordering within canvas
    if (source.droppableId === 'canvas' && destination.droppableId === 'canvas') {
      if (source.index !== destination.index) {
        reorderSequence(source.index, destination.index);
      }
      return;
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="min-h-screen p-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel rounded-2xl p-4 mb-6 flex justify-between items-center"
        >
          <div className="flex items-center gap-4">
            <Button
              onClick={() => navigate('/discovery')}
              variant="ghost"
              size="sm"
              className="hover:bg-white/20"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-white font-bold">Storyline Sequencer</h1>
              <p className="text-white/60 text-sm">Drag prompts to build your narrative</p>
            </div>
          </div>

          <Button
            onClick={exportToJSON}
            disabled={storylineSequence.length === 0}
            className="aurora-pill aurora-pill-cyan hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download className="mr-2 h-5 w-5" />
            Export JSON ({storylineSequence.length})
          </Button>
        </motion.div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-6">
          {/* Left Column - Selected Prompts Tray */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <SelectedPromptsTray />
          </motion.div>

          {/* Right Column - Storyline Canvas */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <StorylineCanvas />
          </motion.div>
        </div>
      </div>
    </DragDropContext>
  );
};
