
export interface Instructor {
  id: number;
  name: string;
  avatar: string;
  title: string;
  bio: string;
  rating: number;
  reviews: number;
  students: number;
  courses: number;
}

export interface Review {
  id: number;
  author: string;
  avatar: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Course {
  id: number;
  title: string;
  subtitle: string;
  category: string;
  instructor: Instructor;
  thumbnail: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  language: string;
  duration: string;
  lectures: number;
  description: string;
  whatYouWillLearn: string[];
  curriculum: {
    section: string;
    lectures: { title: string; duration: string }[];
  }[];
  reviews: Review[];
}
