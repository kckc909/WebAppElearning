import { useQuery } from '@tanstack/react-query';
import { getApiInstance } from '../API';

export interface CourseReview {
    id: number;
    course_id: number;
    user_id: number;
    user_name: string;
    user_avatar: string;
    rating: number;
    comment: string;
    created_at: string;
    helpful_count: number;
    is_helpful?: boolean;
}

export const useMyCourseReviews = (courseId: number) => {
    const api = getApiInstance();

    return useQuery<CourseReview[]>({
        queryKey: ['my-course-reviews', courseId],
        queryFn: async () => {
            const reviews = await api.courses.getCourseReviews(courseId);
            return reviews;
        },
        enabled: !!courseId,
    });
};
