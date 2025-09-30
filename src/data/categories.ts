export interface Category {
  id: string;
  name: string;
  description: string;
  gradientClass: string;
}

export const categories: Category[] = [
  {
    id: 'bhajans',
    name: 'Bhajans',
    description: 'Devotional music videos',
    gradientClass: 'aurora-pill-cyan',
  },
  {
    id: 'cartoons',
    name: 'Cartoons',
    description: 'Animated stories',
    gradientClass: 'aurora-pill-green',
  },
  {
    id: 'jewelry',
    name: 'Jewelry',
    description: 'Product showcases',
    gradientClass: 'aurora-pill-orange',
  },
  {
    id: 'skincare',
    name: 'Skincare',
    description: 'Beauty & wellness content',
    gradientClass: 'aurora-pill-pink',
  },
  {
    id: 'traditional-clothes',
    name: 'Indian Traditional Clothes',
    description: 'Fashion & cultural wear',
    gradientClass: 'aurora-pill-cyan',
  },
  {
    id: 'music-videos',
    name: 'Music Videos',
    description: 'Musical performances',
    gradientClass: 'aurora-pill-green',
  },
];
