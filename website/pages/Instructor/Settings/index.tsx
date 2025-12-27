import React, { useState } from 'react';
import { Lock, Mail, Bell, DollarSign, Eye, EyeOff, Shield, Building, CreditCard, FileText, Globe } from 'lucide-react';
import { accService } from '../../../API';
import { useAuth } from '../../../contexts/AuthContext';
import ApiModeSwitch from '../../../components/ApiModeSwitch';

const InstructorSettings: React.FC = () => {
    const { user } = useAuth();
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPasswords, setShowPasswords] = useState({ current: false, new: false, confirm: false });
    const [passwordError, setPasswordError] = useState('');
    const [passwordSuccess, setPasswordSuccess] = useState('');

    const [profileSettings, setProfileSettings] = useState({
        displayName: 'John Doe',
        bio: 'Experienced web developer with 10+ years of teaching experience.',
        expertise: ['Web Development', 'JavaScript', 'React', 'Node.js'],
        teachingExperience: '10',
        education: 'Master of Computer Science',
        website: 'https://johndoe.com',
        linkedin: 'https://linkedin.com/in/johndoe',
    });

    const [payoutSettings, setPayoutSettings] = useState({
        bankName: 'Vietcombank',
        accountNumber: '1234567890',
        accountHolder: 'JOHN DOE',
        taxId: '0123456789',
        paymentSchedule: 'monthly',
    });

    const [notificationSettings, setNotificationSettings] = useState({
        emailOnEnrollment: true,
        emailOnReview: true,
        emailOnPayment: true,
        emailOnQuestion: true,
        pushOnEnrollment: true,
        pushOnReview: false,
    });

    const [privacySettings, setPrivacySettings] = useState({
        showEmail: false,
        showPhone: false,
        allowMessages: true,
    });

    const handleToggle = (category: string, key: string) => {
        if (category === 'notification') {
            setNotificationSettings(prev => ({ ...prev, [key]: !prev[key as keyof typeof prev] }));
        } else if (category === 'privacy') {
            setPrivacySettings(prev => ({ ...prev, [key]: !prev[key as keyof typeof prev] }));
        }
    };

    const handlePasswordChange = async () => {
        setPasswordError('');
        setPasswordSuccess('');

        // Trim passwords
        const trimmedCurrentPassword = currentPassword.trim();
        const trimmedNewPassword = newPassword.trim();
        const trimmedConfirmPassword = confirmPassword.trim();

        if (!trimmedCurrentPassword || !trimmedNewPassword || !trimmedConfirmPassword) {
            setPasswordError('Vui lòng điền đầy đủ thông tin');
            return;
        }

        // Validate không có space trong password
        if (trimmedNewPassword.includes(' ')) {
            setPasswordError('Mật khẩu không được chứa khoảng trắng');
            return;
        }

        if (trimmedNewPassword.length < 6) {
            setPasswordError('Mật khẩu mới phải có ít nhất 6 ký tự');
            return;
        }

        if (trimmedNewPassword !== trimmedConfirmPassword) {
            setPasswordError('Mật khẩu xác nhận không khớp!');
            return;
        }

        if (!user?.id) {
            setPasswordError('Không tìm thấy thông tin người dùng');
            return;
        }

        try {
            const response = await accService.changePassword(user.id, {
                old_password: trimmedCurrentPassword,
                new_password: trimmedNewPassword,
            });

            if (response.success) {
                setPasswordSuccess('Đổi mật khẩu thành công!');
                setCurrentPassword('');
                setNewPassword('');
                setConfirmPassword('');
            } else {
                setPasswordError(response.error || 'Không thể đổi mật khẩu. Vui lòng kiểm tra lại mật khẩu hiện tại.');
            }
        } catch (error: any) {
            setPasswordError(error.response?.data?.message || error.message || 'Không thể đổi mật khẩu. Vui lòng kiểm tra lại mật khẩu hiện tại.');
        }
    };

    const ToggleSwitch: React.FC<{ checked: boolean; onChange: () => void; label: string; description?: string }> = ({
        checked, onChange, label, description
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
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${checked ? 'translate-x-6' : 'translate-x-1'
                    }`} />
            </button>
        </div>
    );

    return (
        <div className="flex-1 overflow-y-auto bg-gray-50 p-6">
            <div className="max-w-4xl mx-auto space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Cài đặt</h1>
                    <p className="text-gray-600 mt-1">Quản lý thông tin và preferences của bạn</p>
                </div>

                {/* Profile Settings */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center mb-6">
                        <Shield className="w-6 h-6 text-green-600 mr-3" />
                        <h2 className="text-xl font-bold text-gray-900">Hồ sơ giảng viên</h2>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Tên hiển thị</label>
                            <input
                                type="text"
                                value={profileSettings.displayName}
                                onChange={(e) => setProfileSettings({ ...profileSettings, displayName: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Giới thiệu</label>
                            <textarea
                                value={profileSettings.bio}
                                onChange={(e) => setProfileSettings({ ...profileSettings, bio: e.target.value })}
                                rows={4}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Kinh nghiệm giảng dạy</label>
                                <input
                                    type="number"
                                    value={profileSettings.teachingExperience}
                                    onChange={(e) => setProfileSettings({ ...profileSettings, teachingExperience: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                    placeholder="Số năm"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Học vấn</label>
                                <input
                                    type="text"
                                    value={profileSettings.education}
                                    onChange={(e) => setProfileSettings({ ...profileSettings, education: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                                <input
                                    type="url"
                                    value={profileSettings.website}
                                    onChange={(e) => setProfileSettings({ ...profileSettings, website: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn</label>
                                <input
                                    type="url"
                                    value={profileSettings.linkedin}
                                    onChange={(e) => setProfileSettings({ ...profileSettings, linkedin: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                />
                            </div>
                        </div>

                        <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                            Lưu thay đổi
                        </button>
                    </div>
                </div>

                {/* Account Settings */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center mb-6">
                        <Lock className="w-6 h-6 text-green-600 mr-3" />
                        <h2 className="text-xl font-bold text-gray-900">Tài khoản</h2>
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-semibold text-gray-900">Đổi mật khẩu</h3>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Mật khẩu hiện tại</label>
                            <div className="relative">
                                <input
                                    type={showPasswords.current ? 'text' : 'password'}
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPasswords({ ...showPasswords, current: !showPasswords.current })}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                                >
                                    {showPasswords.current ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Mật khẩu mới</label>
                            <div className="relative">
                                <input
                                    type={showPasswords.new ? 'text' : 'password'}
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPasswords({ ...showPasswords, new: !showPasswords.new })}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                                >
                                    {showPasswords.new ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Xác nhận mật khẩu mới</label>
                            <div className="relative">
                                <input
                                    type={showPasswords.confirm ? 'text' : 'password'}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                                >
                                    {showPasswords.confirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        {passwordError && (
                            <div className="px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                                {passwordError}
                            </div>
                        )}

                        {passwordSuccess && (
                            <div className="px-4 py-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
                                {passwordSuccess}
                            </div>
                        )}

                        <button
                            onClick={handlePasswordChange}
                            disabled={!currentPassword || !newPassword || !confirmPassword}
                            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Cập nhật mật khẩu
                        </button>
                    </div>
                </div>

                {/* Payout Settings */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center mb-6">
                        <DollarSign className="w-6 h-6 text-green-600 mr-3" />
                        <h2 className="text-xl font-bold text-gray-900">Thanh toán</h2>
                    </div>

                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <div className="flex items-center">
                                        <Building className="w-4 h-4 mr-2" />
                                        Ngân hàng
                                    </div>
                                </label>
                                <input
                                    type="text"
                                    value={payoutSettings.bankName}
                                    onChange={(e) => setPayoutSettings({ ...payoutSettings, bankName: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <div className="flex items-center">
                                        <CreditCard className="w-4 h-4 mr-2" />
                                        Số tài khoản
                                    </div>
                                </label>
                                <input
                                    type="text"
                                    value={payoutSettings.accountNumber}
                                    onChange={(e) => setPayoutSettings({ ...payoutSettings, accountNumber: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Chủ tài khoản</label>
                                <input
                                    type="text"
                                    value={payoutSettings.accountHolder}
                                    onChange={(e) => setPayoutSettings({ ...payoutSettings, accountHolder: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <div className="flex items-center">
                                        <FileText className="w-4 h-4 mr-2" />
                                        Mã số thuế
                                    </div>
                                </label>
                                <input
                                    type="text"
                                    value={payoutSettings.taxId}
                                    onChange={(e) => setPayoutSettings({ ...payoutSettings, taxId: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Chu kỳ thanh toán</label>
                            <select
                                value={payoutSettings.paymentSchedule}
                                onChange={(e) => setPayoutSettings({ ...payoutSettings, paymentSchedule: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            >
                                <option value="weekly">Hàng tuần</option>
                                <option value="monthly">Hàng tháng</option>
                                <option value="quarterly">Hàng quý</option>
                            </select>
                        </div>

                        <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                            Lưu thông tin thanh toán
                        </button>
                    </div>
                </div>

                {/* Notification Preferences */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center mb-6">
                        <Bell className="w-6 h-6 text-green-600 mr-3" />
                        <h2 className="text-xl font-bold text-gray-900">Thông báo</h2>
                    </div>

                    <div className="space-y-2 divide-y divide-gray-100">
                        <ToggleSwitch
                            checked={notificationSettings.emailOnEnrollment}
                            onChange={() => handleToggle('notification', 'emailOnEnrollment')}
                            label="Email khi có học viên mới"
                            description="Nhận email khi có học viên đăng ký khóa học"
                        />
                        <ToggleSwitch
                            checked={notificationSettings.emailOnReview}
                            onChange={() => handleToggle('notification', 'emailOnReview')}
                            label="Email khi có đánh giá mới"
                            description="Nhận email khi học viên đánh giá khóa học"
                        />
                        <ToggleSwitch
                            checked={notificationSettings.emailOnPayment}
                            onChange={() => handleToggle('notification', 'emailOnPayment')}
                            label="Email khi nhận thanh toán"
                            description="Nhận email khi có thanh toán mới"
                        />
                        <ToggleSwitch
                            checked={notificationSettings.emailOnQuestion}
                            onChange={() => handleToggle('notification', 'emailOnQuestion')}
                            label="Email khi có câu hỏi mới"
                            description="Nhận email khi học viên đặt câu hỏi"
                        />
                    </div>
                </div>

                {/* Privacy Settings */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center mb-6">
                        <Shield className="w-6 h-6 text-green-600 mr-3" />
                        <h2 className="text-xl font-bold text-gray-900">Quyền riêng tư</h2>
                    </div>

                    <div className="space-y-2 divide-y divide-gray-100">
                        <ToggleSwitch
                            checked={privacySettings.showEmail}
                            onChange={() => handleToggle('privacy', 'showEmail')}
                            label="Hiển thị email công khai"
                            description="Cho phép học viên xem email của bạn"
                        />
                        <ToggleSwitch
                            checked={privacySettings.showPhone}
                            onChange={() => handleToggle('privacy', 'showPhone')}
                            label="Hiển thị số điện thoại"
                            description="Cho phép học viên xem số điện thoại của bạn"
                        />
                        <ToggleSwitch
                            checked={privacySettings.allowMessages}
                            onChange={() => handleToggle('privacy', 'allowMessages')}
                            label="Cho phép nhận tin nhắn"
                            description="Học viên có thể gửi tin nhắn trực tiếp cho bạn"
                        />
                    </div>
                </div>

                {/* API Mode Settings */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center mb-6">
                        <Globe className="w-6 h-6 text-green-600 mr-3" />
                        <h2 className="text-xl font-bold text-gray-900">Chế độ API</h2>
                    </div>

                    <div className="space-y-4">
                        <p className="text-sm text-slate-600">
                            Chuyển đổi giữa chế độ Mock Data và Database thực tế
                        </p>
                        <ApiModeSwitch />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InstructorSettings;