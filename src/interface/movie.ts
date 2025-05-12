export interface Movie {
  id: number;
  title: string;
  year: number;
  genre: string;
  director: string;
  duration: number;
  description: string;
  cast: string[];
  ratings: number[];
  languages: string[];
  availableOn: string[];
  reviews: { user: string; comment: string; score: number }[];
  awards: string[];
  isAvailable: boolean;
  tags: string[];
}

