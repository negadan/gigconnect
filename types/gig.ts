export interface Gig {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  duration: string;
  tags: string[];
  postedDate: string;
  posterUserId: string;
  posterName: string;
  status: 'open' | 'assigned' | 'completed';
  image?: string;
  milestones?: string[];
}