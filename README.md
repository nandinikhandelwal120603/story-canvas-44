# Prompt Storyliner - AI Storyboarding Tool

A futuristic, AI-native storyboarding application for creators. Discover prompts through a Tinder-style interface, sequence them using drag-and-drop, and export to JSON for automation pipelines.

## 🌟 Features

- **Category-First Workflow**: Choose from predefined universes (Bhajans, Cartoons, Jewelry, Skincare, etc.)
- **Tinder-Style Discovery**: Swipe through visual prompt cards to rapidly discover ideas
- **Drag-and-Drop Sequencing**: Build your storyline by dragging prompts onto a canvas
- **Copyable Prompts**: One-click copy functionality for each prompt's text
- **JSON Export**: Export your complete storyline with metadata and ordering
- **Futuristic UI**: Pure black background with luminous aurora gradients and glassmorphism effects

## 🎨 Design System

### Color Palette
- **Background**: Pure Black (`#000000`)
- **Text**: Soft White (`#F2F2F2`)
- **Glassmorphism**: `bg-white/10 backdrop-blur-xl border-white/20`

### Aurora Gradients (NO PURPLE)
- **Cyan-Blue**: `#29ffc6` → `#2575FC`
- **Green-Teal**: `#a8ff78` → `#78ffd6`
- **Orange-Yellow**: `#F09819` → `#EDDE5D`
- **Pink-Fuchsia**: `#ff7e5f` → `#feb47b`

### Typography
- **Font Family**: Inter
- **Heading 1**: 48px, Bold
- **Heading 2**: 32px, Semibold
- **Body**: 14-16px, Regular

## 📁 Project Structure

```
src/
├── components/
│   ├── CategorySelection.tsx      # Initial category picker
│   ├── PromptCard.tsx             # Swipeable prompt card
│   ├── PromptDiscovery.tsx        # Swiper view
│   ├── SelectedPromptsTray.tsx    # Draggable tray of selected prompts
│   ├── StorylineCanvas.tsx        # Drop zone for sequencing
│   └── StorylineBuilder.tsx       # Main builder layout
├── data/
│   ├── categories.ts              # Category definitions
│   └── mockPrompts.ts             # Sample prompt data
├── pages/
│   ├── Categories.tsx             # Category selection page
│   ├── Discovery.tsx              # Prompt discovery page
│   └── Builder.tsx                # Storyline builder page
├── store/
│   └── storylineStore.ts          # Zustand global state
└── index.css                      # Design system & global styles
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm installed
- Modern browser with ES6+ support

### Installation

1. **Clone the repository**
   ```bash
   git clone <YOUR_GIT_URL>
   cd prompt-storyliner
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:8080`

## 🔧 Customization Guide

### Adding New Categories

Edit `src/data/categories.ts`:

```typescript
export const categories: Category[] = [
  {
    id: 'your-category-id',
    name: 'Your Category Name',
    description: 'Brief description',
    gradientClass: 'aurora-pill-cyan', // Choose: cyan, green, orange, or pink
  },
  // ... existing categories
];
```

### Adding New Prompts

Edit `src/data/mockPrompts.ts`:

```typescript
{
  id: 'unique-id',
  title: 'Your Prompt Title',
  promptText: 'Full detailed prompt text for AI generation...',
  imageRef: 'https://your-image-url.com/image.jpg',
  tags: ['tag1', 'tag2', 'tag3'],
  mood: 'Happy', // or Serene, Epic, etc.
  category: 'Bhajans', // Must match a category name from categories.ts
  shotType: 'Wide Shot', // e.g., Close-Up, Medium Shot, etc.
  createdAt: new Date().toISOString(),
}
```

### Customizing Aurora Gradients

Edit `src/index.css` to modify glow colors:

```css
.aurora-pill-cyan {
  background: linear-gradient(135deg, #YOUR_START_COLOR 0%, #YOUR_END_COLOR 100%);
  box-shadow: 
    0 0 30px #YOUR_START_COLOR,
    0 0 60px #YOUR_END_COLOR,
    inset 0 1px 0 rgba(255, 255, 255, 0.4);
}
```

### Changing Glassmorphism Intensity

Modify the `.glass-panel` class in `src/index.css`:

```css
.glass-panel {
  @apply bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg;
  /* Increase bg-white opacity for lighter panels */
  /* Increase backdrop-blur for stronger blur */
}
```

## 🗄️ Connecting to Firebase (Future)

This app is designed to integrate with Firebase Firestore. To connect:

1. **Create a Firebase project** at [console.firebase.google.com](https://console.firebase.google.com)

2. **Install Firebase SDK**
   ```bash
   npm install firebase
   ```

3. **Create `src/lib/firebase.ts`**
   ```typescript
   import { initializeApp } from 'firebase/app';
   import { getFirestore } from 'firebase/firestore';
   
   const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_AUTH_DOMAIN",
     projectId: "YOUR_PROJECT_ID",
     storageBucket: "YOUR_STORAGE_BUCKET",
     messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
     appId: "YOUR_APP_ID"
   };
   
   const app = initializeApp(firebaseConfig);
   export const db = getFirestore(app);
   ```

4. **Update store to fetch from Firestore**
   ```typescript
   import { collection, getDocs } from 'firebase/firestore';
   import { db } from '@/lib/firebase';
   
   // In your store:
   const fetchPromptsFromFirebase = async () => {
     const querySnapshot = await getDocs(collection(db, 'prompts'));
     const prompts = querySnapshot.docs.map(doc => ({
       id: doc.id,
       ...doc.data()
     }));
     return prompts;
   };
   ```

### Firestore Schema

**Collection**: `prompts`

```javascript
{
  title: string,           // "Sunrise in Jungle"
  promptText: string,      // Full AI prompt text
  imageRef: string,        // URL to reference image
  tags: string[],          // ["establishing shot", "nature"]
  mood: string,            // "Serene"
  category: string,        // "Nursery Rhyme - Hathi Raja"
  shotType: string,        // "Wide Shot"
  createdAt: timestamp     // Firebase timestamp
}
```

## 📤 JSON Export Format

Exported files follow this structure:

```json
{
  "storylineTitle": "Category Name",
  "exportDate": "2025-09-30T13:30:00Z",
  "totalShots": 5,
  "shots": [
    {
      "sequence": 1,
      "title": "Scene Title",
      "promptText": "Full prompt text...",
      "imageRef": "https://...",
      "mood": "Serene",
      "shotType": "Wide Shot",
      "category": "Bhajans",
      "tags": ["tag1", "tag2"]
    }
  ]
}
```

## 🛠️ Tech Stack

- **Framework**: React 18 + Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Drag & Drop**: react-beautiful-dnd
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **UI Components**: shadcn/ui

## 📝 Development Tips

### Running Type Checks
```bash
npm run typecheck
```

### Building for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Linting
```bash
npm run lint
```

## 🐛 Common Issues

### Drag-and-Drop Not Working
- Ensure `react-beautiful-dnd` is properly imported
- Check that Draggable `draggableId` matches prompt `id`
- Verify DragDropContext wraps both Droppable zones

### Glassmorphism Not Visible
- Confirm Tailwind classes: `bg-white/10 backdrop-blur-xl`
- Check that parent has a contrasting background
- Ensure browser supports backdrop-filter

### Categories Not Filtering
- Verify category names in prompts match category definitions exactly
- Check that `selectedCategory` is set in global store
- Confirm navigation occurs after category selection

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📧 Support

For issues and questions, please open an issue on GitHub or contact the development team.

---

Built with ❤️ using [Lovable](https://lovable.dev)
