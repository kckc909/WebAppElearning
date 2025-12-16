/**
 * MOCK DB - class_calendar
 * Maps 1:1 to Prisma schema (WITH NEW FIELDS)
 * Seedable directly to database
 */

// Enum (must match Prisma)
export enum ClassCalendarType {
    CLASS = 'CLASS',
    EXAM = 'EXAM',
    ASSIGNMENT = 'ASSIGNMENT'
}

export interface ClassCalendar {
    id: number;
    class_id: number;
    title: string | null;
    description: string | null;
    event_date: string | null;
    start_time: string | null;  // NEW: '19:30' format
    end_time: string | null;    // NEW: '21:00' format
    type: ClassCalendarType | null;  // NEW: enum
    duration_minutes: number | null;  // KEPT: analytics only
    lesson: number | null;
}

export const CLASS_CALENDAR: ClassCalendar[] = [
    // IELTS Class (id: 1) - December schedule
    {
        id: 1,
        class_id: 1,
        title: 'Buổi 1: Giới thiệu IELTS',
        description: 'Tổng quan về format',
        event_date: '2024-12-02T19:30:00.000Z',
        start_time: '19:30',
        end_time: '21:00',
        type: ClassCalendarType.CLASS,
        duration_minutes: 90,
        lesson: 1
    },
    {
        id: 2,
        class_id: 1,
        title: 'Buổi 2: Part 1 Strategies',
        description: 'Chiến lược Part 1',
        event_date: '2024-12-04T19:30:00.000Z',
        start_time: '19:30',
        end_time: '21:00',
        type: ClassCalendarType.CLASS,
        duration_minutes: 90,
        lesson: 2
    },
    {
        id: 3,
        class_id: 1,
        title: 'Buổi 3: Part 2 Topics',
        description: 'Các chủ đề Part 2',
        event_date: '2024-12-06T19:30:00.000Z',
        start_time: '19:30',
        end_time: '21:00',
        type: ClassCalendarType.CLASS,
        duration_minutes: 90,
        lesson: 3
    },
    {
        id: 4,
        class_id: 1,
        title: 'Buổi 4: Part 3 Discussion',
        description: 'Kỹ năng Part 3',
        event_date: '2024-12-09T19:30:00.000Z',
        start_time: '19:30',
        end_time: '21:00',
        type: ClassCalendarType.CLASS,
        duration_minutes: 90,
        lesson: 4
    },
    {
        id: 5,
        class_id: 1,
        title: 'Test 2 bắt đầu',
        description: 'Bài kiểm tra 2',
        event_date: '2024-12-03T09:00:00.000Z',
        start_time: '09:00',
        end_time: '10:30',
        type: ClassCalendarType.EXAM,
        duration_minutes: 90,
        lesson: null
    },
    {
        id: 6,
        class_id: 1,
        title: 'Test 3 bắt đầu',
        description: 'Bài kiểm tra 3',
        event_date: '2024-12-03T14:00:00.000Z',
        start_time: '14:00',
        end_time: '15:30',
        type: ClassCalendarType.EXAM,
        duration_minutes: 90,
        lesson: null
    },
    {
        id: 7,
        class_id: 1,
        title: 'Test 4 bắt đầu',
        description: 'Bài kiểm tra 4',
        event_date: '2024-12-03T16:00:00.000Z',
        start_time: '16:00',
        end_time: '17:30',
        type: ClassCalendarType.EXAM,
        duration_minutes: 90,
        lesson: null
    },
    {
        id: 8,
        class_id: 1,
        title: 'Test 1 bắt đầu',
        description: 'Bài kiểm tra 1',
        event_date: '2024-12-03T19:00:00.000Z',
        start_time: '19:00',
        end_time: '20:30',
        type: ClassCalendarType.EXAM,
        duration_minutes: 90,
        lesson: null
    },

    // TOEIC Class (id: 2) - December schedule
    {
        id: 9,
        class_id: 2,
        title: 'Test 1 bắt đầu',
        description: 'TOEIC Test 1',
        event_date: '2024-12-04T20:00:00.000Z',
        start_time: '20:00',
        end_time: '22:00',
        type: ClassCalendarType.EXAM,
        duration_minutes: 120,
        lesson: null
    },
    {
        id: 10,
        class_id: 2,
        title: 'KTHP_10 buổi 1',
        description: 'Listening Part 1-2',
        event_date: '2024-12-04T14:00:00.000Z',
        start_time: '14:00',
        end_time: '16:00',
        type: ClassCalendarType.CLASS,
        duration_minutes: 120,
        lesson: 1
    },
    {
        id: 11,
        class_id: 2,
        title: 'Test 1 kết thúc',
        description: 'TOEIC Test 1 End',
        event_date: '2024-12-05T20:00:00.000Z',
        start_time: '20:00',
        end_time: '22:00',
        type: ClassCalendarType.EXAM,
        duration_minutes: 120,
        lesson: null
    },
    {
        id: 12,
        class_id: 2,
        title: 'KTHP_10 buổi 2',
        description: 'Listening Part 3-4',
        event_date: '2024-12-05T14:00:00.000Z',
        start_time: '14:00',
        end_time: '16:00',
        type: ClassCalendarType.CLASS,
        duration_minutes: 120,
        lesson: 2
    },

    // ReactJS Class (id: 3) - December schedule
    {
        id: 13,
        class_id: 3,
        title: 'KTHP_10 React',
        description: 'Kiểm tra thực hành',
        event_date: '2024-12-06T09:00:00.000Z',
        start_time: '09:00',
        end_time: '11:00',
        type: ClassCalendarType.EXAM,
        duration_minutes: 120,
        lesson: null
    },
    {
        id: 14,
        class_id: 3,
        title: 'KTHP_10 Lab 1',
        description: 'Lab thực hành 1',
        event_date: '2024-12-07T09:00:00.000Z',
        start_time: '09:00',
        end_time: '12:00',
        type: ClassCalendarType.CLASS,
        duration_minutes: 180,
        lesson: 1
    },
    {
        id: 15,
        class_id: 3,
        title: 'KTHP_10 Lab 2',
        description: 'Lab thực hành 2',
        event_date: '2024-12-07T14:00:00.000Z',
        start_time: '14:00',
        end_time: '17:00',
        type: ClassCalendarType.CLASS,
        duration_minutes: 180,
        lesson: 2
    },

    // More events for this month
    {
        id: 16,
        class_id: 1,
        title: 'Buổi 5: Mock Test',
        description: 'Thi thử IELTS',
        event_date: '2024-12-11T19:30:00.000Z',
        start_time: '19:30',
        end_time: '21:00',
        type: ClassCalendarType.EXAM,
        duration_minutes: 90,
        lesson: 5
    },
    {
        id: 17,
        class_id: 1,
        title: 'Buổi 6: Feedback',
        description: 'Chữa bài thi thử',
        event_date: '2024-12-13T19:30:00.000Z',
        start_time: '19:30',
        end_time: '21:00',
        type: ClassCalendarType.CLASS,
        duration_minutes: 90,
        lesson: 6
    },
    {
        id: 18,
        class_id: 2,
        title: 'KTHP_10 Review',
        description: 'Ôn tập cuối kỳ',
        event_date: '2024-12-12T20:00:00.000Z',
        start_time: '20:00',
        end_time: '22:00',
        type: ClassCalendarType.CLASS,
        duration_minutes: 120,
        lesson: 3
    },
    {
        id: 19,
        class_id: 3,
        title: 'Final Project',
        description: 'Nộp đồ án cuối kỳ',
        event_date: '2024-12-14T23:59:00.000Z',
        start_time: '23:59',
        end_time: '23:59',
        type: ClassCalendarType.ASSIGNMENT,
        duration_minutes: 0,
        lesson: null
    },
    {
        id: 20,
        class_id: 1,
        title: 'Buổi 7: Review',
        description: 'Ôn lại kiến thức',
        event_date: '2024-12-16T19:30:00.000Z',
        start_time: '19:30',
        end_time: '21:00',
        type: ClassCalendarType.CLASS,
        duration_minutes: 90,
        lesson: 7
    },
    {
        id: 21,
        class_id: 1,
        title: 'Buổi 8: Tips',
        description: 'Mẹo thi IELTS',
        event_date: '2024-12-18T19:30:00.000Z',
        start_time: '19:30',
        end_time: '21:00',
        type: ClassCalendarType.CLASS,
        duration_minutes: 90,
        lesson: 8
    }
];

// Helpers
export const getCalendarByClass = (classId: number): ClassCalendar[] => {
    return CLASS_CALENDAR.filter(c => c.class_id === classId);
};

export const getCalendarByType = (type: ClassCalendarType): ClassCalendar[] => {
    return CLASS_CALENDAR.filter(c => c.type === type);
};
