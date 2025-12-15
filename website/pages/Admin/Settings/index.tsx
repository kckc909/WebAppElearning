import React, { useState } from 'react';
import { Settings as SettingsIcon, Globe, Mail, DollarSign, Shield, Database, Bell, Lock, Eye, EyeOff } from 'lucide-react';

const AdminSettings: React.FC = () => {
    const [showSmtpPassword, setShowSmtpPassword] = useState(false);

    const [systemSettings, setSystemSettings] = useState({
        siteName: 'MiLearn',
        siteDescription: 'Online Learning Platform',
        maintenanceMode: false,
        allowRegistration: true,
        requireEmailVerification: true,
    });

    const [emailSettings, setEmailSettings] = useState({
        smtpHost: 'smtp.gmail.com',
        smtpPort: '587',
        smtpUser: 'noreply@milearn.com',
        smtpPassword: '********',
        fromName: 'MiLearn',
        fromEmail: 'noreply@milearn.com',
    });

    const [paymentSettings, setPaymentSettings] = useState({
        currency: 'VND',
        commissionRate: '20',
        enableMomo: true,
        enableZaloPay: true,
        enableBankTransfer: true,
        momoApiKey: '********',
        zaloPayApiKey: '********',
    });

    const [securitySettings, setSecuritySettings] = useState({
        enable2FA: false,
        sessionTimeout: '30',
        maxLoginAttempts: '5',
        ipWhitelist: '',
    });

    const ToggleSwitch: React.FC<{ checked: boolean; onChange: () => void }> = ({ checked, onChange }) => (
        <button
            onClick={onChange}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${checked ? 'bg-blue-600' : 'bg-gray-300'
                }`}
        >
            <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${checked ? 'translate-x-6' : 'translate-x-1'
                    }`}
            />
        </button>
    );

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800">Cài đặt hệ thống</h1>
            </div>

            {/* System Settings */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center mb-6">
                    <Globe className="w-6 h-6 text-blue-600 mr-3" />
                    <h2 className="text-xl font-bold">Cài đặt chung</h2>
                </div>

                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Tên website</label>
                            <input
                                type="text"
                                value={systemSettings.siteName}
                                onChange={(e) => setSystemSettings({ ...systemSettings, siteName: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Mô tả</label>
                            <input
                                type="text"
                                value={systemSettings.siteDescription}
                                onChange={(e) => setSystemSettings({ ...systemSettings, siteDescription: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>

                    <div className="space-y-3 pt-4 border-t border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium text-gray-900">Chế độ bảo trì</p>
                                <p className="text-sm text-gray-500">Tạm khóa website để bảo trì</p>
                            </div>
                            <ToggleSwitch
                                checked={systemSettings.maintenanceMode}
                                onChange={() => setSystemSettings({ ...systemSettings, maintenanceMode: !systemSettings.maintenanceMode })}
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium text-gray-900">Cho phép đăng ký</p>
                                <p className="text-sm text-gray-500">Người dùng có thể tạo tài khoản mới</p>
                            </div>
                            <ToggleSwitch
                                checked={systemSettings.allowRegistration}
                                onChange={() => setSystemSettings({ ...systemSettings, allowRegistration: !systemSettings.allowRegistration })}
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium text-gray-900">Xác minh email</p>
                                <p className="text-sm text-gray-500">Yêu cầu xác minh email khi đăng ký</p>
                            </div>
                            <ToggleSwitch
                                checked={systemSettings.requireEmailVerification}
                                onChange={() => setSystemSettings({ ...systemSettings, requireEmailVerification: !systemSettings.requireEmailVerification })}
                            />
                        </div>
                    </div>

                    <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        Lưu cài đặt
                    </button>
                </div>
            </div>

            {/* Email Settings */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center mb-6">
                    <Mail className="w-6 h-6 text-blue-600 mr-3" />
                    <h2 className="text-xl font-bold">Cài đặt Email (SMTP)</h2>
                </div>

                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Host</label>
                            <input
                                type="text"
                                value={emailSettings.smtpHost}
                                onChange={(e) => setEmailSettings({ ...emailSettings, smtpHost: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Port</label>
                            <input
                                type="text"
                                value={emailSettings.smtpPort}
                                onChange={(e) => setEmailSettings({ ...emailSettings, smtpPort: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Username</label>
                            <input
                                type="text"
                                value={emailSettings.smtpUser}
                                onChange={(e) => setEmailSettings({ ...emailSettings, smtpUser: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Password</label>
                            <div className="relative">
                                <input
                                    type={showSmtpPassword ? 'text' : 'password'}
                                    value={emailSettings.smtpPassword}
                                    onChange={(e) => setEmailSettings({ ...emailSettings, smtpPassword: e.target.value })}
                                    className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowSmtpPassword(!showSmtpPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                                >
                                    {showSmtpPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">From Name</label>
                            <input
                                type="text"
                                value={emailSettings.fromName}
                                onChange={(e) => setEmailSettings({ ...emailSettings, fromName: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">From Email</label>
                            <input
                                type="email"
                                value={emailSettings.fromEmail}
                                onChange={(e) => setEmailSettings({ ...emailSettings, fromEmail: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>

                    <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        Lưu cài đặt Email
                    </button>
                </div>
            </div>

            {/* Payment Settings */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center mb-6">
                    <DollarSign className="w-6 h-6 text-blue-600 mr-3" />
                    <h2 className="text-xl font-bold">Cài đặt thanh toán</h2>
                </div>

                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Đơn vị tiền tệ</label>
                            <select
                                value={paymentSettings.currency}
                                onChange={(e) => setPaymentSettings({ ...paymentSettings, currency: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="VND">VND</option>
                                <option value="USD">USD</option>
                                <option value="EUR">EUR</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Tỷ lệ hoa hồng (%)</label>
                            <input
                                type="number"
                                value={paymentSettings.commissionRate}
                                onChange={(e) => setPaymentSettings({ ...paymentSettings, commissionRate: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>

                    <div className="space-y-3 pt-4 border-t border-gray-200">
                        <h3 className="font-semibold text-gray-900">Cổng thanh toán</h3>

                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium text-gray-900">MoMo</p>
                                <p className="text-sm text-gray-500">Kích hoạt thanh toán qua MoMo</p>
                            </div>
                            <ToggleSwitch
                                checked={paymentSettings.enableMomo}
                                onChange={() => setPaymentSettings({ ...paymentSettings, enableMomo: !paymentSettings.enableMomo })}
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium text-gray-900">ZaloPay</p>
                                <p className="text-sm text-gray-500">Kích hoạt thanh toán qua ZaloPay</p>
                            </div>
                            <ToggleSwitch
                                checked={paymentSettings.enableZaloPay}
                                onChange={() => setPaymentSettings({ ...paymentSettings, enableZaloPay: !paymentSettings.enableZaloPay })}
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium text-gray-900">Chuyển khoản ngân hàng</p>
                                <p className="text-sm text-gray-500">Kích hoạt thanh toán qua chuyển khoản</p>
                            </div>
                            <ToggleSwitch
                                checked={paymentSettings.enableBankTransfer}
                                onChange={() => setPaymentSettings({ ...paymentSettings, enableBankTransfer: !paymentSettings.enableBankTransfer })}
                            />
                        </div>
                    </div>

                    <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        Lưu cài đặt thanh toán
                    </button>
                </div>
            </div>

            {/* Security Settings */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center mb-6">
                    <Shield className="w-6 h-6 text-blue-600 mr-3" />
                    <h2 className="text-xl font-bold">Bảo mật</h2>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium text-gray-900">Xác thực 2 yếu tố (2FA)</p>
                            <p className="text-sm text-gray-500">Bắt buộc 2FA cho tất cả admin</p>
                        </div>
                        <ToggleSwitch
                            checked={securitySettings.enable2FA}
                            onChange={() => setSecuritySettings({ ...securitySettings, enable2FA: !securitySettings.enable2FA })}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout (phút)</label>
                            <input
                                type="number"
                                value={securitySettings.sessionTimeout}
                                onChange={(e) => setSecuritySettings({ ...securitySettings, sessionTimeout: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Số lần đăng nhập tối đa</label>
                            <input
                                type="number"
                                value={securitySettings.maxLoginAttempts}
                                onChange={(e) => setSecuritySettings({ ...securitySettings, maxLoginAttempts: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">IP Whitelist (mỗi IP một dòng)</label>
                        <textarea
                            value={securitySettings.ipWhitelist}
                            onChange={(e) => setSecuritySettings({ ...securitySettings, ipWhitelist: e.target.value })}
                            rows={4}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="192.168.1.1&#10;10.0.0.1"
                        />
                    </div>

                    <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        Lưu cài đặt bảo mật
                    </button>
                </div>
            </div>

            {/* Backup & Restore */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center mb-6">
                    <Database className="w-6 h-6 text-blue-600 mr-3" />
                    <h2 className="text-xl font-bold">Sao lưu & Khôi phục</h2>
                </div>

                <div className="space-y-4">
                    <p className="text-gray-600">Sao lưu và khôi phục dữ liệu hệ thống</p>

                    <div className="flex gap-4">
                        <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                            Tạo bản sao lưu
                        </button>
                        <button className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors">
                            Khôi phục từ file
                        </button>
                    </div>

                    <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <p className="text-sm text-blue-800">
                            <strong>Lưu ý:</strong> Bản sao lưu gần nhất: 2024-12-14 10:30 AM
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminSettings;