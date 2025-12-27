// Tab type
export type TabType = 'overview' | 'curriculum' | 'students' | 'reviews' | 'revenue';

// Course state interface
export interface CourseState {
    id?: number;
    title: string;
    short_description: string;
    description: string;
    category_id: number | null;
    level: string;
    price: number;
    discount_price: number;
    thumbnail: string;
    thumbnail_url?: string;
    what_you_will_learn: string[];
    requirements: string[];
    target_audience: string[];
    status?: string;
    rejection_reason?: string;
    instructor_id?: number;
    total_students?: number;
    average_rating?: number;
    allow_preview?: boolean;  // ✅ Thêm field này
}

// API Base URL
export const API_BASE_URL = (import.meta as any).env?.VITE_BACK_END_API_PATH || 'http://localhost:4000';
