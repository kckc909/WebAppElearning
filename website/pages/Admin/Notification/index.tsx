import React, { useState } from 'react';
import { Send, Users, Calendar, Bell } from 'lucide-react';

const AdminNotification: React.FC = () => {
    const [notificationForm, setNotificationForm] = useState({
        targetAudience: 'all',
        title: '',
        message: '',
        scheduleType: 'now',
        scheduleDate: '',
        scheduleTime: '',
    });

    const [notificationHistory] = useState([
        {
            id: 1,
            title: 'Khuyến mãi mùa đông',
            message: 'Giảm giá 50% cho tất cả khóa học',
            audience: 'all',
            sentDate: '2024-12-10 10:30',
            status: 'sent',
        },
        {
            id: 2,
            title: 'Khóa học mới: Advanced React',
            message: 'Khóa học React nâng cao đã ra mắt',
            audience: 'students',
            sentDate: '2024-12-08 14:00',
            status: 'sent',
        },
        {
            id: 3,
            title: 'Cập nhật chính sách hoa hồng',
            message: 'Thay đổi tỷ lệ hoa hồng từ 15% lên 20%',
            audience: 'instructors',
            sentDate: '2024-12-05 09:00',
            status: 'sent',
        },
    ]);

    const handleSendNotification = () => {
        console.log('Sending notification:', notificationForm);
        // TODO: Call API to send notification
        alert('Thông báo đã được gửi!');
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-800">Gửi thông báo</h1>
                <p className="text-gray-600 mt-1">Gửi thông báo đến người dùng</p>
            </div>

            {/* Send Notification Form */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-xl font-bold mb-6">Tạo thông báo mới</h2>

                <div className="space-y-6">
                    {/* Target Audience */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            <div className="flex items-center gap-2">
                                <Users className="w-4 h-4" />
                                Đối tượng nhận
                            </div>
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {[
                                { value: 'all', label: 'Tất cả người dùng', icon: '👥' },
                                { value: 'students', label: 'Học viên', icon: '🎓' },
                                { value: 'instructors', label: 'Giảng viên', icon: '👨‍🏫' },
                            ].map((option) => (
                                <button
                                    key={option.value}
                                    onClick={() => setNotificationForm({ ...notificationForm, targetAudience: option.value })}
                                    className={`p-4 rounded-lg border-2 transition-all ${notificationForm.targetAudience === option.value
                                            ? 'border-blue-600 bg-blue-50'
                                            : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                >
                                    <div className="text-3xl mb-2">{option.icon}</div>
                                    <div className="font-medium text-gray-900">{option.label}</div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Tiêu đề <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={notificationForm.title}
                            onChange={(e) => setNotificationForm({ ...notificationForm, title: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Nhập tiêu đề thông báo"
                        />
                    </div>

                    {/* Message */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Nội dung <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            value={notificationForm.message}
                            onChange={(e) => setNotificationForm({ ...notificationForm, message: e.target.value })}
                            rows={5}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Nhập nội dung thông báo"
                        />
                    </div>

                    {/* Schedule */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                Lên lịch gửi
                            </div>
                        </label>
                        <div className="space-y-4">
                            <div className="flex gap-4">
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="scheduleType"
                                        value="now"
                                        checked={notificationForm.scheduleType === 'now'}
                                        onChange={(e) => setNotificationForm({ ...notificationForm, scheduleType: e.target.value })}
                                        className="mr-2"
                                    />
                                    Gửi ngay
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="scheduleType"
                                        value="schedule"
                                        checked={notificationForm.scheduleType === 'schedule'}
                                        onChange={(e) => setNotificationForm({ ...notificationForm, scheduleType: e.target.value })}
                                        className="mr-2"
                                    />
                                    Lên lịch
                                </label>
                            </div>

                            {notificationForm.scheduleType === 'schedule' && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Ngày</label>
                                        <input
                                            type="date"
                                            value={notificationForm.scheduleDate}
                                            onChange={(e) => setNotificationForm({ ...notificationForm, scheduleDate: e.target.value })}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Giờ</label>
                                        <input
                                            type="time"
                                            value={notificationForm.scheduleTime}
                                            onChange={(e) => setNotificationForm({ ...notificationForm, scheduleTime: e.target.value })}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Send Button */}
                    <div className="flex gap-4">
                        <button
                            onClick={handleSendNotification}
                            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                        >
                            <Send className="w-5 h-5" />
                            {notificationForm.scheduleType === 'now' ? 'Gửi ngay' : 'Lên lịch gửi'}
                        </button>
                        <button className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
                            Hủy
                        </button>
                    </div>
                </div>
            </div>

            {/* Notification History */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-xl font-bold mb-6">Lịch sử thông báo</h2>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Tiêu đề</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Nội dung</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Đối tượng</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Ngày gửi</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {notificationHistory.map((notification) => (
                                <tr key={notification.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-900">{notification.title}</td>
                                    <td className="px-6 py-4 text-gray-600 max-w-xs truncate">{notification.message}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${notification.audience === 'all'
                                                ? 'bg-blue-100 text-blue-700'
                                                : notification.audience === 'students'
                                                    ? 'bg-green-100 text-green-700'
                                                    : 'bg-purple-100 text-purple-700'
                                            }`}>
                                            {notification.audience === 'all' ? 'Tất cả' : notification.audience === 'students' ? 'Học viên' : 'Giảng viên'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600 text-sm">{notification.sentDate}</td>
                                    <td className="px-6 py-4">
                                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                                            Đã gửi
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Tổng thông báo</p>
                            <p className="text-2xl font-bold text-gray-900 mt-1">24</p>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                            <Bell className="w-6 h-6 text-blue-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Tháng này</p>
                            <p className="text-2xl font-bold text-gray-900 mt-1">8</p>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                            <Send className="w-6 h-6 text-green-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Đã lên lịch</p>
                            <p className="text-2xl font-bold text-gray-900 mt-1">3</p>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                            <Calendar className="w-6 h-6 text-purple-600" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminNotification;