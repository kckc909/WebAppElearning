import React, { useState } from 'react';
import { Lock, Mail, Bell, Globe, Eye, EyeOff, Trash2, Shield, Moon, Sun, Type, AlertTriangle } from 'lucide-react';

const StudentSettings: React.FC = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [settings, setSettings] = useState({
        // Email Preferences
        emailOnNewCourse: true,
        emailOnClassReminder: true,
        emailOnAssignment: true,
        emailOnPromotion: false,
        emailOnNewsletter: true,

        // Push Notifications
        pushOnClassStart: true,
        pushOnNewMessage: true,
        pushOnAssignmentDue: true,
        pushOnCourseUpdate: false,

        // Privacy
        profileVisibility: 'public', // public, friends, private
        showLearningActivity: true,
        showCertificates: true,

        // Appearance
        theme: 'light', // light, dark, auto
        fontSize: 'medium', // small, medium, large
        highContrast: false,

        // Language & Region
        language: 'vi',
        timezone: 'Asia/Ho_Chi_Minh',
    });

    const handleToggle = (key: string) => {
        setSettings(prev => ({
            ...prev,
            [key]: !prev[key as keyof typeof prev]
        }));
    };

    const handleSelectChange = (key: string, value: string) => {
        setSettings(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const handlePasswordChange = () => {
        if (newPassword !== confirmPassword) {
            alert('Mật khẩu mới không khớp!');
            return;
        }
        // TODO: Call API to change password
        console.log('Changing password...');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
    };

    const handleDeleteAccount = () => {
        if (window.confirm('Bạn có chắc chắn muốn xóa tài khoản? Hành động này không thể hoàn tác!')) {
            // TODO: Call API to delete account
            console.log('Deleting account...');
        }
    };

    const ToggleSwitch: React.FC<{ checked: boolean; onChange: () => void; label: string; description?: string }> = ({
        checked,
        onChange,
        label,
        description
    }) => (
        <div className="flex items-center justify-between py-3">
            <div className="flex-1">
                <p className="font-medium text-slate-900">{label}</p>
                {description && <p className="text-sm text-slate-500 mt-1">{description}</p>}
            </div>
            <button
                onClick={onChange}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${checked ? 'bg-primary' : 'bg-slate-300'
                    }`}
            >
                <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${checked ? 'translate-x-6' : 'translate-x-1'
                        }`}
                />
            </button>
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-secondary">Cài đặt</h1>
                <p className="text-slate-600 mt-1">Quản lý tài khoản và preferences của bạn</p>
            </div>

            {/* Account Settings */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <div className="flex items-center mb-6">
                    <Lock className="w-6 h-6 text-primary mr-3" />
                    <h2 className="text-xl font-bold text-secondary">Tài khoản</h2>
                </div>

                {/* Change Password */}
                <div className="space-y-4">
                    <h3 className="font-semibold text-slate-900">Đổi mật khẩu</h3>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Mật khẩu hiện tại
                        </label>
                        <div className="relative">
                            <input
                                type={showCurrentPassword ? 'text' : 'password'}
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                className="w-full px-4 py-2 pr-10 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                                placeholder="Nhập mật khẩu hiện tại"
                            />
                            <button
                                type="button"
                                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                            >
                                {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Mật khẩu mới
                        </label>
                        <div className="relative">
                            <input
                                type={showNewPassword ? 'text' : 'password'}
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="w-full px-4 py-2 pr-10 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                                placeholder="Nhập mật khẩu mới"
                            />
                            <button
                                type="button"
                                onClick={() => setShowNewPassword(!showNewPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                            >
                                {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                        <p className="text-xs text-slate-500 mt-1">Mật khẩu phải có ít nhất 8 ký tự</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Xác nhận mật khẩu mới
                        </label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full px-4 py-2 pr-10 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                                placeholder="Nhập lại mật khẩu mới"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                            >
                                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>

                    <button
                        onClick={handlePasswordChange}
                        className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors"
                    >
                        Cập nhật mật khẩu
                    </button>
                </div>
            </div>

            {/* Email Preferences */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <div className="flex items-center mb-6">
                    <Mail className="w-6 h-6 text-primary mr-3" />
                    <h2 className="text-xl font-bold text-secondary">Email</h2>
                </div>

                <div className="space-y-2 divide-y divide-slate-100">
                    <ToggleSwitch
                        checked={settings.emailOnNewCourse}
                        onChange={() => handleToggle('emailOnNewCourse')}
                        label="Khóa học mới"
                        description="Nhận email khi có khóa học mới phù hợp với bạn"
                    />
                    <ToggleSwitch
                        checked={settings.emailOnClassReminder}
                        onChange={() => handleToggle('emailOnClassReminder')}
                        label="Nhắc nhở lớp học"
                        description="Nhận email nhắc nhở trước khi lớp học bắt đầu"
                    />
                    <ToggleSwitch
                        checked={settings.emailOnAssignment}
                        onChange={() => handleToggle('emailOnAssignment')}
                        label="Bài tập mới"
                        description="Nhận email khi có bài tập mới hoặc sắp đến hạn"
                    />
                    <ToggleSwitch
                        checked={settings.emailOnPromotion}
                        onChange={() => handleToggle('emailOnPromotion')}
                        label="Khuyến mãi"
                        description="Nhận email về các chương trình khuyến mãi"
                    />
                    <ToggleSwitch
                        checked={settings.emailOnNewsletter}
                        onChange={() => handleToggle('emailOnNewsletter')}
                        label="Bản tin"
                        description="Nhận bản tin hàng tuần về các khóa học và tips học tập"
                    />
                </div>
            </div>

            {/* Push Notifications */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <div className="flex items-center mb-6">
                    <Bell className="w-6 h-6 text-primary mr-3" />
                    <h2 className="text-xl font-bold text-secondary">Thông báo đẩy</h2>
                </div>

                <div className="space-y-2 divide-y divide-slate-100">
                    <ToggleSwitch
                        checked={settings.pushOnClassStart}
                        onChange={() => handleToggle('pushOnClassStart')}
                        label="Lớp học bắt đầu"
                        description="Nhận thông báo khi lớp học sắp bắt đầu"
                    />
                    <ToggleSwitch
                        checked={settings.pushOnNewMessage}
                        onChange={() => handleToggle('pushOnNewMessage')}
                        label="Tin nhắn mới"
                        description="Nhận thông báo khi có tin nhắn mới"
                    />
                    <ToggleSwitch
                        checked={settings.pushOnAssignmentDue}
                        onChange={() => handleToggle('pushOnAssignmentDue')}
                        label="Bài tập sắp hết hạn"
                        description="Nhận thông báo nhắc nhở về bài tập sắp đến hạn"
                    />
                    <ToggleSwitch
                        checked={settings.pushOnCourseUpdate}
                        onChange={() => handleToggle('pushOnCourseUpdate')}
                        label="Cập nhật khóa học"
                        description="Nhận thông báo khi khóa học có nội dung mới"
                    />
                </div>
            </div>

            {/* Privacy Settings */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <div className="flex items-center mb-6">
                    <Shield className="w-6 h-6 text-primary mr-3" />
                    <h2 className="text-xl font-bold text-secondary">Quyền riêng tư</h2>
                </div>

                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Hiển thị hồ sơ
                        </label>
                        <select
                            value={settings.profileVisibility}
                            onChange={(e) => handleSelectChange('profileVisibility', e.target.value)}
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                        >
                            <option value="public">Công khai</option>
                            <option value="friends">Chỉ bạn bè</option>
                            <option value="private">Riêng tư</option>
                        </select>
                    </div>

                    <div className="space-y-2 divide-y divide-slate-100">
                        <ToggleSwitch
                            checked={settings.showLearningActivity}
                            onChange={() => handleToggle('showLearningActivity')}
                            label="Hiển thị hoạt động học tập"
                            description="Cho phép người khác xem tiến độ học tập của bạn"
                        />
                        <ToggleSwitch
                            checked={settings.showCertificates}
                            onChange={() => handleToggle('showCertificates')}
                            label="Hiển thị chứng chỉ"
                            description="Cho phép người khác xem chứng chỉ bạn đã đạt được"
                        />
                    </div>
                </div>
            </div>

            {/* Appearance */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <div className="flex items-center mb-6">
                    <Sun className="w-6 h-6 text-primary mr-3" />
                    <h2 className="text-xl font-bold text-secondary">Giao diện</h2>
                </div>

                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Chủ đề
                        </label>
                        <div className="grid grid-cols-3 gap-3">
                            {['light', 'dark', 'auto'].map((theme) => (
                                <button
                                    key={theme}
                                    onClick={() => handleSelectChange('theme', theme)}
                                    className={`px-4 py-3 rounded-lg border-2 transition-colors ${settings.theme === theme
                                            ? 'border-primary bg-blue-50'
                                            : 'border-slate-200 hover:border-slate-300'
                                        }`}
                                >
                                    <div className="flex flex-col items-center">
                                        {theme === 'light' && <Sun className="w-6 h-6 mb-1" />}
                                        {theme === 'dark' && <Moon className="w-6 h-6 mb-1" />}
                                        {theme === 'auto' && <Globe className="w-6 h-6 mb-1" />}
                                        <span className="text-sm font-medium capitalize">{theme === 'light' ? 'Sáng' : theme === 'dark' ? 'Tối' : 'Tự động'}</span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Kích thước chữ
                        </label>
                        <select
                            value={settings.fontSize}
                            onChange={(e) => handleSelectChange('fontSize', e.target.value)}
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                        >
                            <option value="small">Nhỏ</option>
                            <option value="medium">Trung bình</option>
                            <option value="large">Lớn</option>
                        </select>
                    </div>

                    <ToggleSwitch
                        checked={settings.highContrast}
                        onChange={() => handleToggle('highContrast')}
                        label="Độ tương phản cao"
                        description="Tăng độ tương phản để dễ đọc hơn"
                    />
                </div>
            </div>

            {/* Language & Region */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <div className="flex items-center mb-6">
                    <Globe className="w-6 h-6 text-primary mr-3" />
                    <h2 className="text-xl font-bold text-secondary">Ngôn ngữ & Khu vực</h2>
                </div>

                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Ngôn ngữ giao diện
                        </label>
                        <select
                            value={settings.language}
                            onChange={(e) => handleSelectChange('language', e.target.value)}
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                        >
                            <option value="vi">Tiếng Việt</option>
                            <option value="en">English</option>
                            <option value="zh">中文</option>
                            <option value="ja">日本語</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Múi giờ
                        </label>
                        <select
                            value={settings.timezone}
                            onChange={(e) => handleSelectChange('timezone', e.target.value)}
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                        >
                            <option value="Asia/Ho_Chi_Minh">Ho Chi Minh (GMT+7)</option>
                            <option value="Asia/Bangkok">Bangkok (GMT+7)</option>
                            <option value="Asia/Singapore">Singapore (GMT+8)</option>
                            <option value="Asia/Tokyo">Tokyo (GMT+9)</option>
                            <option value="America/New_York">New York (GMT-5)</option>
                            <option value="Europe/London">London (GMT+0)</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-white rounded-xl shadow-sm border border-red-200 p-6">
                <div className="flex items-center mb-6">
                    <AlertTriangle className="w-6 h-6 text-red-600 mr-3" />
                    <h2 className="text-xl font-bold text-red-600">Vùng nguy hiểm</h2>
                </div>

                <div className="space-y-4">
                    <div>
                        <h3 className="font-semibold text-slate-900 mb-2">Xóa tài khoản</h3>
                        <p className="text-sm text-slate-600 mb-4">
                            Khi bạn xóa tài khoản, tất cả dữ liệu của bạn sẽ bị xóa vĩnh viễn. Hành động này không thể hoàn tác.
                        </p>
                        <button
                            onClick={handleDeleteAccount}
                            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center"
                        >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Xóa tài khoản
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentSettings;
