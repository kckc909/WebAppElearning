import React, { useState } from 'react';
import { Bell, UserPlus, Star, DollarSign, MessageSquare, CheckCircle2, Trash2, Filter } from 'lucide-react';

interface Notification {
    id: number;
    type: 'enrollment' | 'review' | 'payment' | 'question' | 'system';
    title: string;
    message: string;
    timestamp: string;
    read: boolean;
    icon: React.ReactNode;
    color: string;
}

const InstructorNotification: React.FC = () => {
    const [filter, setFilter] = useState<string>('all');
    const [notifications, setNotifications] = useState<Notification[]>([
        {
            id: 1,
            type: 'enrollment',
            title: 'Học viên mới đăng ký',
            message: 'Nguyễn Văn A đã đăng ký khóa học "Complete Web Development Bootcamp 2024"',
            timestamp: '5 phút trước',
            read: false,
            icon: <UserPlus className="w-5 h-5" />,
            color: 'bg-blue-100 text-blue-600',
        },
        {
            id: 2,
            type: 'review',
            title: 'Đánh giá mới',
            message: 'Trần Thị B đã đánh giá 5 sao cho khóa học "React - The Complete Guide"',
            timestamp: '1 giờ trước',
            read: false,
            icon: <Star className="w-5 h-5" />,
            color: 'bg-yellow-100 text-yellow-600',
        },
        {
            id: 3,
            type: 'payment',
            title: 'Thanh toán mới',
            message: 'Bạn đã nhận được 299,000 VNĐ từ khóa học "Python for Data Science"',
            timestamp: '2 giờ trước',
            read: true,
            icon: <DollarSign className="w-5 h-5" />,
            color: 'bg-green-100 text-green-600',
        },
        {
            id: 4,
            type: 'question',
            title: 'Câu hỏi mới',
            message: 'Lê Văn C đã đặt câu hỏi trong bài học "Introduction to React Hooks"',
            timestamp: '3 giờ trước',
            read: true,
            icon: <MessageSquare className="w-5 h-5" />,
            color: 'bg-purple-100 text-purple-600',
        },
        {
            id: 5,
            type: 'enrollment',
            title: 'Học viên mới đăng ký',
            message: 'Phạm Thị D đã đăng ký khóa học "UI/UX Design Masterclass"',
            timestamp: '5 giờ trước',
            read: true,
            icon: <UserPlus className="w-5 h-5" />,
            color: 'bg-blue-100 text-blue-600',
        },
        {
            id: 6,
            type: 'system',
            title: 'Cập nhật hệ thống',
            message: 'Tính năng mới: Bạn có thể tạo quiz tương tác cho khóa học',
            timestamp: '1 ngày trước',
            read: true,
            icon: <Bell className="w-5 h-5" />,
            color: 'bg-slate-100 text-slate-600',
        },
    ]);

    const filteredNotifications = notifications.filter((notif) => {
        if (filter === 'all') return true;
        if (filter === 'unread') return !notif.read;
        return notif.type === filter;
    });

    const unreadCount = notifications.filter((n) => !n.read).length;

    const handleMarkAsRead = (id: number) => {
        setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)));
    };

    const handleMarkAllAsRead = () => {
        setNotifications(notifications.map((n) => ({ ...n, read: true })));
    };

    const handleDelete = (id: number) => {
        setNotifications(notifications.filter((n) => n.id !== id));
    };

    const handleDeleteAll = () => {
        if (window.confirm('Bạn có chắc chắn muốn xóa tất cả thông báo?')) {
            setNotifications([]);
        }
    };

    return (
        <div className="flex-1 overflow-y-auto bg-gray-50 p-6">
            <div className="max-w-4xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Thông báo</h1>
                        <p className="text-gray-600 mt-1">
                            Bạn có <span className="font-semibold text-green-600">{unreadCount}</span> thông báo chưa đọc
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={handleMarkAllAsRead}
                            className="px-4 py-2 text-sm font-medium text-green-600 border border-green-600 rounded-lg hover:bg-green-50 transition-colors flex items-center gap-2"
                        >
                            <CheckCircle2 className="w-4 h-4" />
                            Đánh dấu đã đọc
                        </button>
                        <button
                            onClick={handleDeleteAll}
                            className="px-4 py-2 text-sm font-medium text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition-colors flex items-center gap-2"
                        >
                            <Trash2 className="w-4 h-4" />
                            Xóa tất cả
                        </button>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                    <div className="flex items-center gap-2 flex-wrap">
                        <Filter className="w-5 h-5 text-gray-600" />
                        <span className="text-sm font-medium text-gray-700">Lọc:</span>
                        {[
                            { value: 'all', label: 'Tất cả', count: notifications.length },
                            { value: 'unread', label: 'Chưa đọc', count: unreadCount },
                            { value: 'enrollment', label: 'Đăng ký', count: notifications.filter((n) => n.type === 'enrollment').length },
                            { value: 'review', label: 'Đánh giá', count: notifications.filter((n) => n.type === 'review').length },
                            { value: 'payment', label: 'Thanh toán', count: notifications.filter((n) => n.type === 'payment').length },
                            { value: 'question', label: 'Câu hỏi', count: notifications.filter((n) => n.type === 'question').length },
                        ].map((f) => (
                            <button
                                key={f.value}
                                onClick={() => setFilter(f.value)}
                                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${filter === f.value
                                        ? 'bg-green-600 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                {f.label} ({f.count})
                            </button>
                        ))}
                    </div>
                </div>

                {/* Notifications List */}
                <div className="space-y-3">
                    {filteredNotifications.length > 0 ? (
                        filteredNotifications.map((notification) => (
                            <div
                                key={notification.id}
                                className={`bg-white rounded-xl shadow-sm border transition-all ${notification.read
                                        ? 'border-gray-200'
                                        : 'border-green-200 bg-green-50/30'
                                    }`}
                            >
                                <div className="p-6">
                                    <div className="flex gap-4">
                                        {/* Icon */}
                                        <div className={`flex-shrink-0 w-12 h-12 rounded-full ${notification.color} flex items-center justify-center`}>
                                            {notification.icon}
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-4 mb-2">
                                                <h3 className="font-semibold text-gray-900">{notification.title}</h3>
                                                <span className="text-xs text-gray-500 whitespace-nowrap">{notification.timestamp}</span>
                                            </div>
                                            <p className="text-sm text-gray-600">{notification.message}</p>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex-shrink-0 flex gap-2">
                                            {!notification.read && (
                                                <button
                                                    onClick={() => handleMarkAsRead(notification.id)}
                                                    className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                                    title="Đánh dấu đã đọc"
                                                >
                                                    <CheckCircle2 className="w-5 h-5" />
                                                </button>
                                            )}
                                            <button
                                                onClick={() => handleDelete(notification.id)}
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                title="Xóa"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Unread indicator */}
                                    {!notification.read && (
                                        <div className="mt-3 flex items-center gap-2 text-xs text-green-600">
                                            <div className="w-2 h-2 rounded-full bg-green-600"></div>
                                            <span className="font-medium">Chưa đọc</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12">
                            <div className="flex flex-col items-center text-center">
                                <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                                    <Bell className="w-10 h-10 text-gray-400" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Không có thông báo</h3>
                                <p className="text-gray-600">
                                    {filter === 'all'
                                        ? 'Bạn chưa có thông báo nào'
                                        : `Không có thông báo ${filter === 'unread' ? 'chưa đọc' : 'nào'} trong danh mục này`}
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Stats */}
                {notifications.length > 0 && (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h3 className="font-semibold text-gray-900 mb-4">Thống kê thông báo</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="text-center">
                                <p className="text-2xl font-bold text-blue-600">
                                    {notifications.filter((n) => n.type === 'enrollment').length}
                                </p>
                                <p className="text-sm text-gray-600">Đăng ký mới</p>
                            </div>
                            <div className="text-center">
                                <p className="text-2xl font-bold text-yellow-600">
                                    {notifications.filter((n) => n.type === 'review').length}
                                </p>
                                <p className="text-sm text-gray-600">Đánh giá</p>
                            </div>
                            <div className="text-center">
                                <p className="text-2xl font-bold text-green-600">
                                    {notifications.filter((n) => n.type === 'payment').length}
                                </p>
                                <p className="text-sm text-gray-600">Thanh toán</p>
                            </div>
                            <div className="text-center">
                                <p className="text-2xl font-bold text-purple-600">
                                    {notifications.filter((n) => n.type === 'question').length}
                                </p>
                                <p className="text-sm text-gray-600">Câu hỏi</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default InstructorNotification;