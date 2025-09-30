import { motion } from 'framer-motion';
import { Heart, X, Layers } from 'lucide-react';
import { PromptCard } from './PromptCard';
import { useStorylineStore } from '@/store/storylineStore';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';

export const PromptDiscovery = () => {
  const {
    currentSwipeIndex,
    addToSelected,
    incrementSwipeIndex,
    selectedCategory,
    getFilteredPrompts,
  } = useStorylineStore();

  const navigate = useNavigate();

  // Redirect if no category selected
  if (!selectedCategory) {
    navigate('/');
    return null;
  }

  const filteredPrompts = getFilteredPrompts();
  const currentPrompt = filteredPrompts[currentSwipeIndex];
  const nextPrompt = filteredPrompts[currentSwipeIndex + 1];
  const hasMorePrompts = currentSwipeIndex < filteredPrompts.length;

  const handleSwipeLeft = () => {
    incrementSwipeIndex();
  };

  const handleSwipeRight = () => {
    if (currentPrompt) {
      addToSelected(currentPrompt);
    }
    incrementSwipeIndex();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-8 left-0 right-0 flex justify-between items-center px-8"
      >
        <div>
          <h1 className="text-white font-bold">Prompt Storyliner</h1>
          <p className="text-white/60 text-sm">{selectedCategory}</p>
        </div>
        <div className="flex gap-3">
          <Button
            onClick={() => navigate('/')}
            className="glass-panel hover:bg-white/20 transition-all"
            variant="ghost"
          >
            Change Category
          </Button>
          <Button
            onClick={() => navigate('/builder')}
            className="glass-panel hover:bg-white/20 transition-all"
            variant="ghost"
          >
            <Layers className="mr-2 h-5 w-5" />
            Builder
          </Button>
        </div>
      </motion.div>

      {/* Card Stack */}
      <div className="relative w-full max-w-md h-[600px] flex items-center justify-center">
        {!hasMorePrompts ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-panel rounded-3xl p-12 text-center"
          >
            <h2 className="text-white text-2xl font-semibold mb-4">All Done!</h2>
            <p className="text-white/70 mb-6">
              You've reviewed all prompts. Ready to build your storyline?
            </p>
            <Button
              onClick={() => navigate('/builder')}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90"
            >
              <Layers className="mr-2 h-5 w-5" />
              Go to Builder
            </Button>
          </motion.div>
        ) : (
          <>
            {/* Next card (background) */}
            {nextPrompt && (
              <motion.div
                initial={{ scale: 0.9, opacity: 0.5 }}
                animate={{ scale: 0.95, opacity: 0.7 }}
                className="absolute"
                style={{ zIndex: 1 }}
              >
                <div className="w-full max-w-md">
                  <div className="glass-panel rounded-3xl overflow-hidden h-[600px] opacity-50">
                    <div className="h-[420px] bg-muted" />
                    <div className="p-6" />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Current card */}
            {currentPrompt && (
              <PromptCard
                key={currentPrompt.id}
                prompt={currentPrompt}
                onSwipeLeft={handleSwipeLeft}
                onSwipeRight={handleSwipeRight}
                style={{ zIndex: 2 }}
              />
            )}
          </>
        )}
      </div>

      {/* Action Buttons */}
      {hasMorePrompts && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex gap-6 mt-8"
        >
          <Button
            onClick={handleSwipeLeft}
            size="lg"
            variant="outline"
            className="glass-panel hover:bg-destructive/20 border-destructive/50 h-16 w-16 rounded-full p-0"
          >
            <X className="h-8 w-8 text-destructive" />
          </Button>

          <Button
            onClick={handleSwipeRight}
            size="lg"
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:opacity-90 h-16 w-16 rounded-full p-0"
          >
            <Heart className="h-8 w-8 text-white fill-white" />
          </Button>
        </motion.div>
      )}

      {/* Progress Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="absolute bottom-8 text-white/60 text-sm"
      >
        {currentSwipeIndex} / {filteredPrompts.length}
      </motion.div>
    </div>
  );
};
