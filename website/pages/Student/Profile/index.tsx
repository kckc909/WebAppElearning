import React, { useState, useEffect } from 'react';
import { Camera, Mail, Phone, MapPin, Calendar, Briefcase, Globe, Github, Linkedin, Twitter, Facebook, Award, BookOpen, Clock, Loader2, AlertCircle } from 'lucide-react';
import { useMyProfile, ProfileUpdateData } from '../../../hooks/student/useMyProfile';
import { useMyStats } from '../../../hooks/student/useMyStats';
import toast from 'react-hot-toast';

const StudentProfile: React.FC = () => {
    // Get current user from sessionStorage
    const getCurrentUser = () => {
        const accountData = sessionStorage.getItem('Account');
        if (accountData) {
            try {
                return JSON.parse(accountData);
            } catch {
                return null;
            }
        }
        return null;
    };

    const currentUser = getCurrentUser();
    const userId = currentUser?.id || 0;

    // Fetch profile and stats using hooks
    const { profile, isLoading: profileLoading, error: profileError, updateProfile, isUpdating } = useMyProfile(userId);
    const { data: stats, isLoading: statsLoading } = useMyStats(userId);

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState<ProfileUpdateData>({
        fullName: '',
        phone: '',
        dateOfBirth: '',
        gender: 'other',
        country: '',
        city: '',
        bio: '',
        jobTitle: '',
        linkedin: '',
        github: '',
        twitter: '',
        facebook: '',
    });

    // Update form when profile loads
    useEffect(() => {
        if (profile) {
            setFormData({
                fullName: profile.fullName,
                phone: profile.phone,
                dateOfBirth: profile.dateOfBirth,
                gender: profile.gender,
                country: profile.country,
                city: profile.city,
                bio: profile.bio,
                jobTitle: profile.jobTitle,
                linkedin: profile.linkedin,
                github: profile.github,
                twitter: profile.twitter,
                facebook: profile.facebook,
            });
        }
    }, [profile]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSave = async () => {
        try {
            await updateProfile(formData);
            toast.success('Cập nhật hồ sơ thành công!');
            setIsEditing(false);
        } catch (error: any) {
            toast.error('Có lỗi xảy ra khi cập nhật hồ sơ!');
            console.error('Update profile error:', error);
        }
    };

    const handleCancel = () => {
        // Reset form to original profile data
        if (profile) {
            setFormData({
                fullName: profile.fullName,
                phone: profile.phone,
                dateOfBirth: profile.dateOfBirth,
                gender: profile.gender,
                country: profile.country,
                city: profile.city,
                bio: profile.bio,
                jobTitle: profile.jobTitle,
                linkedin: profile.linkedin,
                github: profile.github,
                twitter: profile.twitter,
                facebook: profile.facebook,
            });
        }
        setIsEditing(false);
    };

    // Loading state
    if (profileLoading || statsLoading) {
        return (
            <div className="max-w-6xl mx-auto py-20">
                <div className="flex flex-col items-center justify-center">
                    <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
                    <p className="text-slate-600">Đang tải hồ sơ...</p>
                </div>
            </div>
        );
    }

    // Error state
    if (profileError) {
        return (
            <div className="max-w-6xl mx-auto py-20">
                <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
                    <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                    <p className="text-red-600 font-semibold mb-2">Không thể tải hồ sơ</p>
                    <p className="text-red-500 text-sm">Vui lòng thử lại sau</p>
                </div>
            </div>
        );
    }

    if (!profile) {
        return null;
    }

    return (
        <div className="max-w-6xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-secondary">Hồ sơ cá nhân</h1>
                    <p className="text-slate-600 mt-1">Quản lý thông tin cá nhân và cài đặt tài khoản</p>
                </div>
                {!isEditing ? (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors"
                    >
                        Chỉnh sửa
                    </button>
                ) : (
                    <div className="flex gap-3">
                        <button
                            onClick={handleCancel}
                            className="px-6 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                        >
                            Hủy
                        </button>
                        <button
                            onClick={handleSave}
                            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors"
                        >
                            Lưu thay đổi
                        </button>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Avatar & Stats */}
                <div className="space-y-6">
                    {/* Avatar Card */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                        <div className="flex flex-col items-center">
                            <div className="relative group">
                                <img
                                    src={profile.avatarUrl}
                                    alt="Profile"
                                    className="w-32 h-32 rounded-full border-4 border-slate-100"
                                />
                                {isEditing && (
                                    <button className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Camera className="w-8 h-8 text-white" />
                                    </button>
                                )}
                            </div>
                            <h2 className="mt-4 text-xl font-bold text-secondary">{profile.fullName}</h2>
                            <p className="text-slate-600">{profile.jobTitle || 'Chưa cập nhật'}</p>
                            <div className="mt-2 flex items-center text-sm text-slate-500">
                                <Calendar className="w-4 h-4 mr-1" />
                                Thành viên từ {stats?.memberSince || 'N/A'}
                            </div>
                        </div>
                    </div>

                    {/* Learning Stats */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                        <h3 className="text-lg font-bold text-secondary mb-4">Thống kê học tập</h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center mr-3">
                                        <BookOpen className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-600">Khóa học</p>
                                        <p className="text-lg font-bold text-secondary">{stats?.coursesEnrolled || 0}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center mr-3">
                                        <Award className="w-5 h-5 text-green-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-600">Hoàn thành</p>
                                        <p className="text-lg font-bold text-secondary">{stats?.coursesCompleted || 0}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center mr-3">
                                        <Clock className="w-5 h-5 text-purple-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-600">Giờ học</p>
                                        <p className="text-lg font-bold text-secondary">{stats?.hoursLearned || 0}h</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center mr-3">
                                        <Award className="w-5 h-5 text-amber-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-600">Chứng chỉ</p>
                                        <p className="text-lg font-bold text-secondary">{stats?.certificatesEarned || 0}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column - Profile Information */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Personal Information */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                        <h3 className="text-lg font-bold text-secondary mb-6">Thông tin cá nhân</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Họ và tên <span className="text-red-500">*</span>
                                </label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                                    />
                                ) : (
                                    <p className="text-slate-900">{formData.fullName}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Email <span className="text-red-500">*</span>
                                </label>
                                <div className="flex items-center">
                                    <Mail className="w-5 h-5 text-slate-400 mr-2" />
                                    <p className="text-slate-900">{profile.email}</p>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Số điện thoại
                                </label>
                                <div className="flex items-center">
                                    <Phone className="w-5 h-5 text-slate-400 mr-2" />
                                    {isEditing ? (
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                                        />
                                    ) : (
                                        <p className="text-slate-900">{formData.phone}</p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Ngày sinh
                                </label>
                                {isEditing ? (
                                    <input
                                        type="date"
                                        name="dateOfBirth"
                                        value={formData.dateOfBirth}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                                    />
                                ) : (
                                    <p className="text-slate-900">{formData.dateOfBirth ? new Date(formData.dateOfBirth).toLocaleDateString('vi-VN') : 'Chưa cập nhật'}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Giới tính
                                </label>
                                {isEditing ? (
                                    <select
                                        name="gender"
                                        value={formData.gender}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                                    >
                                        <option value="male">Nam</option>
                                        <option value="female">Nữ</option>
                                        <option value="other">Khác</option>
                                    </select>
                                ) : (
                                    <p className="text-slate-900">
                                        {formData.gender === 'male' ? 'Nam' : formData.gender === 'female' ? 'Nữ' : 'Khác'}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Nghề nghiệp
                                </label>
                                <div className="flex items-center">
                                    <Briefcase className="w-5 h-5 text-slate-400 mr-2" />
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="jobTitle"
                                            value={formData.jobTitle}
                                            onChange={handleInputChange}
                                            className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                                        />
                                    ) : (
                                        <p className="text-slate-900">{formData.jobTitle}</p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Quốc gia
                                </label>
                                <div className="flex items-center">
                                    <MapPin className="w-5 h-5 text-slate-400 mr-2" />
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="country"
                                            value={formData.country}
                                            onChange={handleInputChange}
                                            className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                                        />
                                    ) : (
                                        <p className="text-slate-900">{formData.country}</p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Thành phố
                                </label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                                    />
                                ) : (
                                    <p className="text-slate-900">{formData.city || 'Chưa cập nhật'}</p>
                                )}
                            </div>
                        </div>

                        <div className="mt-6">
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Giới thiệu bản thân
                            </label>
                            {isEditing ? (
                                <textarea
                                    name="bio"
                                    value={formData.bio}
                                    onChange={handleInputChange}
                                    rows={4}
                                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                                    placeholder="Viết vài dòng về bản thân..."
                                />
                            ) : (
                                <p className="text-slate-900">{formData.bio}</p>
                            )}
                        </div>
                    </div>

                    {/* Social Links */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                        <h3 className="text-lg font-bold text-secondary mb-6">Liên kết mạng xã hội</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    <div className="flex items-center">
                                        <Linkedin className="w-5 h-5 text-blue-600 mr-2" />
                                        LinkedIn
                                    </div>
                                </label>
                                {isEditing ? (
                                    <input
                                        type="url"
                                        name="linkedin"
                                        value={formData.linkedin}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                                        placeholder="https://linkedin.com/in/yourprofile"
                                    />
                                ) : (
                                    <a href={formData.linkedin} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                                        {formData.linkedin}
                                    </a>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    <div className="flex items-center">
                                        <Github className="w-5 h-5 text-slate-800 mr-2" />
                                        GitHub
                                    </div>
                                </label>
                                {isEditing ? (
                                    <input
                                        type="url"
                                        name="github"
                                        value={formData.github}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                                        placeholder="https://github.com/yourprofile"
                                    />
                                ) : (
                                    <a href={formData.github} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                                        {formData.github}
                                    </a>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    <div className="flex items-center">
                                        <Twitter className="w-5 h-5 text-sky-500 mr-2" />
                                        Twitter
                                    </div>
                                </label>
                                {isEditing ? (
                                    <input
                                        type="url"
                                        name="twitter"
                                        value={formData.twitter}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                                        placeholder="https://twitter.com/yourprofile"
                                    />
                                ) : (
                                    <a href={formData.twitter} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                                        {formData.twitter}
                                    </a>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    <div className="flex items-center">
                                        <Facebook className="w-5 h-5 text-blue-600 mr-2" />
                                        Facebook
                                    </div>
                                </label>
                                {isEditing ? (
                                    <input
                                        type="url"
                                        name="facebook"
                                        value={formData.facebook}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                                        placeholder="https://facebook.com/yourprofile"
                                    />
                                ) : (
                                    <a href={formData.facebook} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                                        {formData.facebook}
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentProfile;