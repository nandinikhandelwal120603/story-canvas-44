import { useEffect } from 'react';
import { PromptDiscovery } from '@/components/PromptDiscovery';
import { useStorylineStore } from '@/store/storylineStore';
import { mockPrompts } from '@/data/mockPrompts';

const Discovery = () => {
  const { setAllPrompts } = useStorylineStore();

  useEffect(() => {
    // Initialize with mock data
    setAllPrompts(mockPrompts);
  }, [setAllPrompts]);

  return <PromptDiscovery />;
};

export default Discovery;
