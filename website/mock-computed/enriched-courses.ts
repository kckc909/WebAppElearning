/**
 * MOCK-COMPUTED: Enriched Courses
 * UI-friendly data with joins, computed fields, aggregations
 * NOT seedable to DB - for frontend display only
 */

import { COURSES, ACCOUNTS, COURSE_SECTIONS, COURSE_LESSONS, COURSE_REVIEWS, COURSE_ENROLLMENTS } from '../mock-db';

// Category mapping for display
const CATEGORY_MAP: Record<number, string> = {
    1: 'Digital Skills',
    2: 'Applied Language',
    3: 'Business',
    4: 'Design',
    5: 'Personal Development',
    6: 'Lifestyle',
};

const LEVEL_MAP: Record<string, string> = {
    'ALL_LEVELS': 'All Levels',
    'BEGINNER': 'Beginner',
    'INTERMEDIATE': 'Intermediate',
    'ADVANCED': 'Advanced'
};

export interface EnrichedCourse {
    // Raw fields from DB
    id: number;
    instructor_id: number;
    category_id: number | null;
    title: string;
    short_description: string | null;
    description: string | null;
    level: string;
    language: string | null;
    price: number;
    discount_price: number;
    thumbnail: string | null;
    status: string;
    created_at: string;
    updated_at: string;

    // COMPUTED fields (UI-only)
    category: string;
    levelLabel: string;
    instructor: {
        id: number;
        name: string;
        full_name: string;
        avatar: string | null;
        title: string;
    } | null;

    // AGGREGATED from related tables
    total_lessons: number;
    total_students: number;
    total_duration: number;
    rating: number;
    reviews_count: number;

    // UI helpers
    duration: string;
    lectures: number;
    reviewsCount: number;
    originalPrice: number;
}

// Compute enriched courses
export const ENRICHED_COURSES: EnrichedCourse[] = COURSES.map(course => {
    // Find instructor
    const instructor = ACCOUNTS.find(a => a.id === course.instructor_id);

    // Compute aggregations
    const sections = COURSE_SECTIONS.filter(s => s.course_id === course.id);
    const lessons = COURSE_LESSONS.filter(l =>
        sections.some(s => s.id === l.section_id)
    );
    const reviews = COURSE_REVIEWS.filter(r => r.course_id === course.id);
    const enrollments = COURSE_ENROLLMENTS.filter(e => e.course_id === course.id);

    const total_lessons = lessons.length || Math.floor(Math.random() * 100) + 50;
    const total_students = enrollments.length || Math.floor(Math.random() * 10000) + 1000;
    const total_duration = total_lessons * 10; // ~10 min per lesson
    const rating = reviews.length > 0
        ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        : 4.5 + Math.random() * 0.5;
    const reviews_count = reviews.length || Math.floor(Math.random() * 1000) + 100;

    const hours = Math.floor(total_duration / 60);

    return {
        ...course,
        category: CATEGORY_MAP[course.category_id || 1] || 'Digital Skills',
        levelLabel: LEVEL_MAP[course.level] || 'All Levels',
        instructor: instructor ? {
            id: instructor.id,
            name: instructor.full_name,
            full_name: instructor.full_name,
            avatar: instructor.avatar_url,
            title: 'Instructor'  // TODO: get from user_profiles
        } : null,
        total_lessons,
        total_students,
        total_duration,
        rating,
        reviews_count,
        duration: `${hours} giờ`,
        lectures: total_lessons,
        reviewsCount: reviews_count,
        originalPrice: course.price,
    };
});

// Helpers (same as before, but using enriched data)
export const getEnrichedCourseById = (id: number) => {
    return ENRICHED_COURSES.find(c => c.id === id);
};

export const getEnrichedCoursesByCategory = (categoryId: number) => {
    return ENRICHED_COURSES.filter(c => c.category_id === categoryId);
};

export const getEnrichedCoursesByInstructor = (instructorId: number) => {
    return ENRICHED_COURSES.filter(c => c.instructor_id === instructorId);
};
