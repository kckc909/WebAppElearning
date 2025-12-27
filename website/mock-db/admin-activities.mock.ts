/**
 * MOCK DB - Admin Activities
 * Activities that admins need to review (course submissions, updates, etc.)
 */

export enum AdminActivityType {
    COURSE_SUBMITTED = 0,
    COURSE_UPDATED = 1,
    INSTRUCTOR_REGISTERED = 2,
    REPORT_RECEIVED = 3
}

export interface AdminActivity {
    id: number;
    type: AdminActivityType;
    instructor_id: number;
    instructor_name: string;
    course_id?: number;
    course_title?: string;
    description: string;
    created_at: string;
    is_read: boolean;
}

export const ADMIN_ACTIVITIES: AdminActivity[] = [
    {
        id: 1,
        type: AdminActivityType.COURSE_SUBMITTED,
        instructor_id: 3,
        instructor_name: "John Doe",
        course_id: 1,
        course_title: "React Mastery",
        description: "New course submitted for approval",
        created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
        is_read: false
    },
    {
        id: 2,
        type: AdminActivityType.COURSE_UPDATED,
        instructor_id: 4,
        instructor_name: "Anna Smith",
        course_id: 2,
        course_title: "NodeJS Zero to Hero",
        description: "Course content updated, requires review",
        created_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
        is_read: false
    },
    {
        id: 3,
        type: AdminActivityType.COURSE_SUBMITTED,
        instructor_id: 5,
        instructor_name: "Michael Lee",
        course_id: 3,
        course_title: "UI/UX Design 101",
        description: "New course submitted for approval",
        created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // Yesterday
        is_read: true
    },
    {
        id: 4,
        type: AdminActivityType.INSTRUCTOR_REGISTERED,
        instructor_id: 6,
        instructor_name: "Sarah Johnson",
        description: "New instructor registration pending approval",
        created_at: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), // 3 hours ago
        is_read: false
    },
    {
        id: 5,
        type: AdminActivityType.COURSE_UPDATED,
        instructor_id: 3,
        instructor_name: "John Doe",
        course_id: 5,
        course_title: "Advanced TypeScript",
        description: "Major course update requires review",
        created_at: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), // 8 hours ago
        is_read: false
    }
];
