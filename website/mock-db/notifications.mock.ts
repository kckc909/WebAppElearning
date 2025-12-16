/**
 * MOCK DB - notifications
 */

import { NotificationType } from './enums.mock';

export interface Notification {
    id: number;
    user_id: number;
    title: string | null;
    message: string | null;
    type: NotificationType;
    is_read: boolean;
    created_at: string;
}

export const NOTIFICATIONS: Notification[] = [
    { id: 1, user_id: 7, title: 'Chào mừng đến MiLearn!', message: 'Cảm ơn bạn đã đăng ký tài khoản. Hãy bắt đầu hành trình học tập!', type: NotificationType.SYSTEM, is_read: true, created_at: '2024-02-10T00:00:00.000Z' },
    { id: 2, user_id: 7, title: 'Khóa học mới: ReactJS 2024', message: 'Khóa học ReactJS đã được cập nhật với nội dung mới nhất!', type: NotificationType.COURSE, is_read: true, created_at: '2024-08-01T00:00:00.000Z' },
    { id: 3, user_id: 7, title: 'Deadline sắp đến!', message: 'Bài tập "Bar Chart Analysis" sẽ hết hạn vào ngày mai.', type: NotificationType.REMINDER, is_read: false, created_at: '2024-11-09T00:00:00.000Z' },
];
