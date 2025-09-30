import { motion } from 'framer-motion';
import { Download, ArrowLeft } from 'lucide-react';
import { useStorylineStore } from '@/store/storylineStore';
import { Button } from './ui/button';
import { SelectedPromptsTray } from './SelectedPromptsTray';
import { StorylineCanvas } from './StorylineCanvas';
import { useNavigate } from 'react-router-dom';

export const StorylineBuilder = () => {
  const { storylineSequence, exportToJSON } = useStorylineStore();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel rounded-2xl p-4 mb-6 flex justify-between items-center"
      >
        <div className="flex items-center gap-4">
          <Button
            onClick={() => navigate('/')}
            variant="ghost"
            size="sm"
            className="hover:bg-white/10"
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
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90 disabled:opacity-50"
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
  );
};
