import React, { useEffect } from 'react';
import { Bell, Pin } from 'lucide-react';
import { useClassAnnouncements } from '../../../../hooks/useClassAnnouncements';

const StudentClassAnnouncements: React.FC = () => {
    // TODO: Get class ID from params/context
    const classId = 1;

    // Get announcements from API hook
    const { data: announcementsData, isLoading, error, refetch } = useClassAnnouncements(classId);

    useEffect(() => {
        if (classId) {
            refetch();
        }
    }, [classId]);

    const announcements = (announcementsData || []).map((announcement: any) => ({
        id: announcement.id,
        title: announcement.title,
        content: announcement.content,
        date: announcement.created_at,
        pinned: announcement.is_pinned || announcement.pinned,
        author: announcement.author,
    }));

    if (isLoading) {
        return <div className="flex items-center justify-center h-64">�ang t?i...</div>;
    }

    if (error) {
        return <div className="text-red-500">L?i: {(error as Error).message}</div>;
    }

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold text-secondary">Thông báo lớp học</h1>

            <div className="space-y-4">
                {announcements.map((announcement) => (
                    <div
                        key={announcement.id}
                        className={`bg-white rounded-xl shadow-sm border-2 p-6 ${announcement.pinned ? 'border-yellow-300 bg-yellow-50' : 'border-slate-200'
                            }`}
                    >
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex items-start gap-3">
                                {announcement.pinned && <Pin className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />}
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900">{announcement.title}</h3>
                                    <p className="text-sm text-slate-600 mt-1">Bởi: {announcement.author}</p>
                                </div>
                            </div>
                            <span className="text-xs text-slate-500">{announcement.date}</span>
                        </div>
                        <p className="text-slate-700">{announcement.content}</p>
                    </div>
                ))}
            </div>

            {announcements.length === 0 && (
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
                    <Bell className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">Chưa có thông báo</h3>
                    <p className="text-slate-600">Các thông báo mới sẽ hiển thị ở đây</p>
                </div>
            )}
        </div>
    );
};

export default StudentClassAnnouncements;
