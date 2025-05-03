export interface User {
  id: string;
  name: string;
  email: string;
  location: string;
  skills: string[];
  bio: string;
  avatar?: string;
  createdAt: string;
  ratings?: {
    average: number;
    count: number;
  };
}