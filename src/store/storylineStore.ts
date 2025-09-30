import { create } from 'zustand';

export interface Prompt {
  id: string;
  title: string;
  promptText: string;
  imageRef: string;
  tags: string[];
  mood: string;
  category: string;
  shotType: string;
  createdAt: string;
}

interface StorylineStore {
  allPrompts: Prompt[];
  selectedPrompts: Prompt[];
  storylineSequence: Prompt[];
  currentSwipeIndex: number;
  
  setAllPrompts: (prompts: Prompt[]) => void;
  addToSelected: (prompt: Prompt) => void;
  removeFromSelected: (promptId: string) => void;
  addToSequence: (prompt: Prompt) => void;
  removeFromSequence: (promptId: string) => void;
  reorderSequence: (startIndex: number, endIndex: number) => void;
  incrementSwipeIndex: () => void;
  resetSwipeIndex: () => void;
  exportToJSON: () => void;
}

export const useStorylineStore = create<StorylineStore>((set, get) => ({
  allPrompts: [],
  selectedPrompts: [],
  storylineSequence: [],
  currentSwipeIndex: 0,

  setAllPrompts: (prompts) => set({ allPrompts: prompts }),

  addToSelected: (prompt) =>
    set((state) => ({
      selectedPrompts: [...state.selectedPrompts, prompt],
    })),

  removeFromSelected: (promptId) =>
    set((state) => ({
      selectedPrompts: state.selectedPrompts.filter((p) => p.id !== promptId),
    })),

  addToSequence: (prompt) =>
    set((state) => ({
      storylineSequence: [...state.storylineSequence, prompt],
      selectedPrompts: state.selectedPrompts.filter((p) => p.id !== prompt.id),
    })),

  removeFromSequence: (promptId) =>
    set((state) => {
      const promptToRemove = state.storylineSequence.find((p) => p.id === promptId);
      return {
        storylineSequence: state.storylineSequence.filter((p) => p.id !== promptId),
        selectedPrompts: promptToRemove
          ? [...state.selectedPrompts, promptToRemove]
          : state.selectedPrompts,
      };
    }),

  reorderSequence: (startIndex, endIndex) =>
    set((state) => {
      const result = Array.from(state.storylineSequence);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return { storylineSequence: result };
    }),

  incrementSwipeIndex: () =>
    set((state) => ({ currentSwipeIndex: state.currentSwipeIndex + 1 })),

  resetSwipeIndex: () => set({ currentSwipeIndex: 0 }),

  exportToJSON: () => {
    const state = get();
    const exportData = {
      storylineTitle: "My New Video Project",
      exportDate: new Date().toISOString(),
      totalShots: state.storylineSequence.length,
      shots: state.storylineSequence.map((prompt, index) => ({
        sequence: index + 1,
        title: prompt.title,
        promptText: prompt.promptText,
        imageRef: prompt.imageRef,
        mood: prompt.mood,
        shotType: prompt.shotType,
        tags: prompt.tags,
      })),
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `storyline_${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  },
}));
