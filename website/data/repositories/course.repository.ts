/**
 * REPOSITORY: Course
 * Business logic + JOINs happen HERE
 * UI calls repositories, NOT datasource directly
 */

import { mockDataSource } from '../datasources/mock.datasource';
import { UserRole } from '../../mock-db/enums.mock';

export interface EnrichedCourse {
    id: number;
    title: string;
    short_description: string | null;
    description: string | null;
    thumbnail: string | null;
    price: number;
    discount_price: number;
    level: string;
    language: string | null;
    status: string;

    // JOINED data
    instructor: {
        id: number;
        name: string;
        avatar: string | null;
        title: string;
    } | null;

    category: {
        id: number;
        name: string;
        slug: string | null;
    } | null;

    // COMPUTED aggregations
    total_lessons: number;
    total_students: number;
    rating: number;
    reviews_count: number;
    duration_hours: number;
}

export class CourseRepository {
    /**
     * Get course with all enrichments (JOIN + COMPUTE)
     */
    getCourseDetail(courseId: number): EnrichedCourse | null {
        const course = mockDataSource.getCourseById(courseId);
        if (!course) return null;

        // JOIN instructor
        const instructor = mockDataSource.getAccountById(course.instructor_id);
        const instructorProfile = instructor ? mockDataSource.getProfileByUserId(instructor.id) : null;

        // JOIN category
        const category = course.category_id ? mockDataSource.getCategoryById(course.category_id) : null;

        // COMPUTE aggregations
        const sections = mockDataSource.getSectionsByCourse(courseId);
        const lessons = sections.flatMap(section =>
            mockDataSource.getLessonsBySection(section.id)
        );
        const reviews = mockDataSource.getReviewsByCourse(courseId);
        const enrollments = mockDataSource.getEnrollmentsByCourse(courseId);

        const total_lessons = lessons.length || 50;
        const total_students = enrollments.length || 1000;
        const rating = reviews.length > 0
            ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
            : 4.5;
        const reviews_count = reviews.length || 100;
        const duration_hours = Math.floor(total_lessons * 10 / 60);

        return {
            id: course.id,
            title: course.title,
            short_description: course.short_description,
            description: course.description,
            thumbnail: course.thumbnail,
            price: course.price,
            discount_price: course.discount_price,
            level: course.level,
            language: course.language,
            status: course.status,

            instructor: instructor ? {
                id: instructor.id,
                name: instructor.full_name,
                avatar: instructor.avatar_url,
                title: instructorProfile?.job_title || 'Instructor'
            } : null,

            category: category ? {
                id: category.id,
                name: category.name,
                slug: category.slug
            } : null,

            total_lessons,
            total_students,
            rating,
            reviews_count,
            duration_hours
        };
    }

    /**
     * Get all courses (enriched list)
     */
    getAllCourses(): EnrichedCourse[] {
        const courses = mockDataSource.getAllCourses();
        return courses.map(course => this.getCourseDetail(course.id)!).filter(Boolean);
    }

    /**
     * Get courses by category
     */
    getCoursesByCategory(categoryId: number): EnrichedCourse[] {
        const courses = mockDataSource.getCoursesByCategory(categoryId);
        return courses.map(course => this.getCourseDetail(course.id)!).filter(Boolean);
    }

    /**
     * Get courses by instructor
     */
    getCoursesByInstructor(instructorId: number): EnrichedCourse[] {
        const courses = mockDataSource.getCoursesByInstructor(instructorId);
        return courses.map(course => this.getCourseDetail(course.id)!).filter(Boolean);
    }

    /**
     * Get student's enrolled courses with progress
     */
    getStudentCourses(studentId: number) {
        const enrollments = mockDataSource.getEnrollmentsByStudent(studentId);

        return enrollments.map(enrollment => {
            const courseDetail = this.getCourseDetail(enrollment.course_id);
            if (!courseDetail) return null;

            return {
                ...courseDetail,
                progress: enrollment.progress,
                enrolled_at: enrollment.enrolled_at,
                certificate_url: enrollment.certificate_url,
                last_lesson_id: enrollment.last_lesson_id
            };
        }).filter(Boolean);
    }
}

// Singleton
export const courseRepository = new CourseRepository();
