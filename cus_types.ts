
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

export interface Lesson {
  id: number;
  courseId: number;
  title: string;
  type: 'video' | 'reading' | 'quiz' | 'coding';
  content: string; // Markdown content for instructions
  starterCode?: string;
  hints?: string[];
}
export interface LessonComment {
  id: number;
  lessonId: number;
  author: string;
  avatar: string;
  comment: string;
  date: string;
  replies?: LessonComment[];
}

export interface LessonQA {
  id: number;
  lessonId: number;
  question: {
    author: string;
    avatar: string;
    text: string;
    date: string;
  };
  answer?: {
    author: string; // instructor
    avatar: string;
    text: string;
    date: string;
  };
}


export interface Lecture {
  id: number;
  title: string;
  duration: string;
  type: 'video' | 'reading' | 'quiz' | 'coding';
}

export type SidebarTab = 'content' | 'curriculum' | 'comments' | 'help';

export interface SidebarItem {
  id: SidebarTab;
  icon: string;
  label: string;
  notification?: number;
}
