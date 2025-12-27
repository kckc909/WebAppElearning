/**
 * MOCK DB - Class Announcements
 * Announcements for class students
 */

export interface ClassAnnouncement {
    id: number;
    class_id: number;
    title: string;
    content: string;
    author: string;
    pinned: boolean;
    created_at: string;
}

export const CLASS_ANNOUNCEMENTS: ClassAnnouncement[] = [
    {
        id: 1,
        class_id: 1,
        title: 'Thông báo: Lịch học tuần tới',
        content: 'Lịch học tuần tới sẽ được điều chỉnh do lễ. Vui lòng kiểm tra lịch mới.',
        author: 'Trần Quang Đức (Giảng viên)',
        pinned: true,
        created_at: '2024-12-14'
    },
    {
        id: 2,
        class_id: 1,
        title: 'Bài tập tuần 6 đã được giao',
        content: 'Bài tập tuần 6 về React Hooks đã được giao. Hạn nộp: 20/12/2024.',
        author: 'Trần Quang Đức (Giảng viên)',
        pinned: false,
        created_at: '2024-12-13'
    },
    {
        id: 3,
        class_id: 1,
        title: 'Thông báo ôn tập cuối kỳ',
        content: 'Các bạn chuẩn bị ôn tập cho kỳ thi cuối kỳ vào tuần thứ 15. Sẽ có buổi review trước khi thi.',
        author: 'Trần Quang Đức (Giảng viên)',
        pinned: false,
        created_at: '2024-12-10'
    },
    {
        id: 4,
        class_id: 2,
        title: 'Thay đổi phòng học',
        content: 'Buổi học ngày mai sẽ được chuyển sang phòng 301. Mong các bạn đến đúng giờ.',
        author: 'Lê Thị Hương (Giảng viên)',
        pinned: true,
        created_at: '2024-12-15'
    },
];

// Helper to get announcements by class
export const getAnnouncementsByClass = (classId: number): ClassAnnouncement[] => {
    return CLASS_ANNOUNCEMENTS.filter(a => a.class_id === classId);
};
