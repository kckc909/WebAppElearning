import { useQuery } from '@tanstack/react-query';
import { getApiInstance } from '../API';

export interface ClassAnnouncement {
    id: number;
    class_id: number;
    title: string;
    content: string;
    created_at: string;
    author: string;
    is_pinned: boolean;
}

export const useClassAnnouncements = (classId: number) => {
    const api = getApiInstance();

    return useQuery<ClassAnnouncement[]>({
        queryKey: ['class-announcements', classId],
        queryFn: async () => {
            // Using notifications API for announcements
            const notifications = await api.notifications.getNotifications({
                type: 'announcement',
                class_id: classId,
            });
            return notifications;
        },
        enabled: !!classId,
    });
};
