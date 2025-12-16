/**
 * MOCK DB - course_reviews
 */

export interface CourseReview {
    id: number;
    course_id: number;
    student_id: number;
    rating: number;
    comment: string | null;
    created_at: string;
}

export const COURSE_REVIEWS: CourseReview[] = [
    { id: 1, course_id: 1, student_id: 7, rating: 5, comment: 'Khóa học rất chi tiết, giảng viên nhiệt tình. Mình đã có thể tự làm được project sau khi học xong!', created_at: '2024-10-15T00:00:00.000Z' },
    { id: 2, course_id: 1, student_id: 8, rating: 5, comment: 'Nội dung cập nhật, thực tế. Recommend cho những bạn muốn học React.', created_at: '2024-10-20T00:00:00.000Z' },
    { id: 3, course_id: 1, student_id: 9, rating: 4, comment: 'Khóa học hay nhưng mong thầy bổ sung thêm phần TypeScript.', created_at: '2024-11-01T00:00:00.000Z' },
    { id: 4, course_id: 2, student_id: 7, rating: 5, comment: 'Python từ basic đến advanced, rất đầy đủ!', created_at: '2024-10-25T00:00:00.000Z' },
    { id: 5, course_id: 6, student_id: 8, rating: 5, comment: 'Cô Lan dạy Speaking rất hay, mình tăng được 1 band sau 2 tháng học.', created_at: '2024-11-05T00:00:00.000Z' },
    { id: 6, course_id: 9, student_id: 10, rating: 5, comment: 'Khóa UI/UX tuyệt vời! Đã xin được việc sau khi hoàn thành khóa học.', created_at: '2024-11-10T00:00:00.000Z' },
];
