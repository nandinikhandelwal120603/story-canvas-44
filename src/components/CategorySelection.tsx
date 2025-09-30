import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useStorylineStore } from '@/store/storylineStore';
import { categories } from '@/data/categories';
import { Sparkles } from 'lucide-react';

export const CategorySelection = () => {
  const navigate = useNavigate();
  const { setSelectedCategory } = useStorylineStore();

  const handleCategorySelect = (categoryName: string) => {
    setSelectedCategory(categoryName);
    navigate('/discovery');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <Sparkles className="h-10 w-10 text-cyan-400" />
          <h1 className="text-5xl font-bold text-white">Choose Your Universe</h1>
          <Sparkles className="h-10 w-10 text-cyan-400" />
        </div>
        <p className="text-white/70 text-lg">Select a category to start discovering prompts</p>
      </motion.div>

      {/* Category Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">
        {categories.map((category, index) => (
          <motion.button
            key={category.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleCategorySelect(category.name)}
            className="glass-panel rounded-2xl p-8 text-left hover:bg-white/20 transition-all group cursor-pointer"
          >
            <div className="space-y-4">
              <div className={`inline-block px-4 py-2 rounded-full ${category.gradientClass} text-sm font-bold`}>
                {category.name}
              </div>
              <p className="text-white/80 text-sm group-hover:text-white transition-colors">
                {category.description}
              </p>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};
