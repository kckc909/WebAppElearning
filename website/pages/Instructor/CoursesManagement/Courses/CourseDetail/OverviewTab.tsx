import React from 'react';
import { Plus, X, Upload, Image as ImageIcon } from 'lucide-react';
import { CourseState } from './types';
import { PreviewSettings } from './PreviewSettings';

interface OverviewTabProps {
    course: CourseState;
    setCourse: React.Dispatch<React.SetStateAction<CourseState>>;
    isDisabled: boolean;
    thumbnailPreview: string | null;
    thumbnailFile: File | null;
    onThumbnailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onRemoveThumbnail: () => void;
    courseId: string;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({
    course,
    setCourse,
    isDisabled,
    thumbnailPreview,
    thumbnailFile,
    onThumbnailChange,
    onRemoveThumbnail,
    courseId
}) => {
    const addItem = (field: 'what_you_will_learn' | 'requirements' | 'target_audience') => {
        setCourse({
            ...course,
            [field]: [...course[field], '']
        });
    };

    const updateItem = (field: 'what_you_will_learn' | 'requirements' | 'target_audience', index: number, value: string) => {
        const newArray = [...course[field]];
        newArray[index] = value;
        setCourse({
            ...course,
            [field]: newArray
        });
    };

    const removeItem = (field: 'what_you_will_learn' | 'requirements' | 'target_audience', index: number) => {
        setCourse({
            ...course,
            [field]: course[field].filter((_: any, i: number) => i !== index)
        });
    };

    return (
        <div className="space-y-6">
            {/* Preview Settings - NEW */}
            <PreviewSettings
                courseId={courseId}
                allowPreview={course.allow_preview || false}
                onUpdate={(allowPreview) => setCourse({ ...course, allow_preview: allowPreview })}
                isDisabled={isDisabled}
            />

            {/* Basic Info */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <h2 className="text-xl font-bold text-secondary mb-6">Thông tin cơ bản</h2>

                <div className="flex gap-6">
                    {/* Left: Thumbnail */}
                    <div className="flex-shrink-0">
                        <label className="block text-sm font-medium text-slate-700 mb-3">
                            Ảnh thumbnail
                        </label>

                        <div className="relative w-64 h-40 border-2 border-dashed border-slate-300 rounded-lg overflow-hidden bg-slate-50 mb-3">
                            {thumbnailPreview ? (
                                <>
                                    <img
                                        src={thumbnailPreview}
                                        alt="Thumbnail preview"
                                        className="w-full h-full object-cover"
                                    />
                                    {thumbnailFile && (
                                        <div className="absolute top-2 left-2 px-2 py-1 bg-yellow-500 text-white text-xs rounded-md font-medium">
                                            Chưa lưu
                                        </div>
                                    )}
                                    {!isDisabled && (
                                        <button
                                            onClick={onRemoveThumbnail}
                                            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    )}
                                </>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-full text-slate-400">
                                    <ImageIcon className="w-10 h-10 mb-2" />
                                    <span className="text-sm">Chưa có ảnh</span>
                                </div>
                            )}
                        </div>

                        <input
                            type="file"
                            id="thumbnail-upload"
                            accept="image/*"
                            onChange={onThumbnailChange}
                            disabled={isDisabled}
                            className="hidden"
                        />
                        <label
                            htmlFor="thumbnail-upload"
                            className={`inline-flex items-center justify-center gap-2 w-full px-4 py-2 border border-slate-300 rounded-lg cursor-pointer transition-colors ${
                                isDisabled
                                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                                    : 'bg-white text-slate-700 hover:bg-slate-50'
                            }`}
                        >
                            <Upload className="w-4 h-4" />
                            {thumbnailPreview ? 'Thay đổi ảnh' : 'Chọn ảnh'}
                        </label>
                        <p className="text-xs text-slate-500 mt-2">JPG, PNG, GIF (max 5MB)</p>
                        <p className="text-xs text-slate-500">Khuyến nghị: 1280x720px</p>
                        {thumbnailFile && (
                            <p className="text-xs text-yellow-600 mt-2 font-medium">
                                ⚠ Nhớ nhấn "Lưu thay đổi" để cập nhật ảnh
                            </p>
                        )}
                    </div>

                    {/* Right: Form Fields */}
                    <div className="flex-1 space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Tiêu đề khóa học <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={course.title || ''}
                                onChange={(e) => setCourse({ ...course, title: e.target.value })}
                                disabled={isDisabled}
                                placeholder="VD: Lập trình ReactJS từ cơ bản đến nâng cao"
                                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary disabled:bg-slate-50"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Mô tả ngắn
                            </label>
                            <textarea
                                value={course.short_description || ''}
                                onChange={(e) => setCourse({ ...course, short_description: e.target.value })}
                                disabled={isDisabled}
                                rows={3}
                                placeholder="Mô tả ngắn gọn về khóa học..."
                                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary disabled:bg-slate-50"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Giá bán (VNĐ)</label>
                                <input
                                    type="number"
                                    value={course.discount_price || 0}
                                    onChange={(e) => setCourse({ ...course, discount_price: Number(e.target.value) })}
                                    disabled={isDisabled}
                                    className="w-full px-4 py-3 border border-slate-300 rounded-lg disabled:bg-slate-50"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Giá gốc (VNĐ)</label>
                                <input
                                    type="number"
                                    value={course.price || 0}
                                    onChange={(e) => setCourse({ ...course, price: Number(e.target.value) })}
                                    disabled={isDisabled}
                                    className="w-full px-4 py-3 border border-slate-300 rounded-lg disabled:bg-slate-50"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mô tả khóa học */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <h2 className="text-xl font-bold text-secondary mb-2">Mô tả khóa học</h2>
                <p className="text-sm text-slate-600 mb-4">Về khóa học</p>

                <textarea
                    value={course.description || ''}
                    onChange={(e) => setCourse({ ...course, description: e.target.value })}
                    disabled={isDisabled}
                    rows={6}
                    placeholder="Khóa học ReactJS toàn diện nhất dành cho người mới..."
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary disabled:bg-slate-50"
                />
            </div>

            {/* Bạn sẽ học được gì */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h2 className="text-xl font-bold text-secondary">Bạn sẽ học được gì</h2>
                        <p className="text-sm text-slate-600 mt-1">Những kiến thức và kỹ năng học viên sẽ đạt được</p>
                    </div>
                    <button
                        onClick={() => addItem('what_you_will_learn')}
                        disabled={isDisabled}
                        className="flex items-center gap-2 px-4 py-2 text-primary border border-primary rounded-lg hover:bg-primary/5 transition-colors disabled:opacity-50"
                    >
                        <Plus className="w-4 h-4" />
                        Thêm
                    </button>
                </div>

                <div className="space-y-3">
                    {course.what_you_will_learn?.map((item: string, index: number) => (
                        <div key={index} className="flex items-start gap-3">
                            <div className="flex-1">
                                <input
                                    type="text"
                                    value={item}
                                    onChange={(e) => updateItem('what_you_will_learn', index, e.target.value)}
                                    disabled={isDisabled}
                                    placeholder="VD: Nắm vững React Hooks: useState, useEffect, useContext, useReducer"
                                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary disabled:bg-slate-50"
                                />
                            </div>
                            <button
                                onClick={() => removeItem('what_you_will_learn', index)}
                                disabled={isDisabled}
                                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    ))}

                    {course.what_you_will_learn?.length === 0 && (
                        <p className="text-sm text-slate-400 text-center py-4">
                            Chưa có mục nào. Click "Thêm" để bắt đầu.
                        </p>
                    )}
                </div>
            </div>

            {/* Yêu cầu */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h2 className="text-xl font-bold text-secondary">Yêu cầu</h2>
                        <p className="text-sm text-slate-600 mt-1">Kiến thức hoặc công cụ cần có trước khi học</p>
                    </div>
                    <button
                        onClick={() => addItem('requirements')}
                        disabled={isDisabled}
                        className="flex items-center gap-2 px-4 py-2 text-primary border border-primary rounded-lg hover:bg-primary/5 transition-colors disabled:opacity-50"
                    >
                        <Plus className="w-4 h-4" />
                        Thêm
                    </button>
                </div>

                <div className="space-y-3">
                    {course.requirements?.map((item: string, index: number) => (
                        <div key={index} className="flex items-start gap-3">
                            <div className="flex-1">
                                <input
                                    type="text"
                                    value={item}
                                    onChange={(e) => updateItem('requirements', index, e.target.value)}
                                    disabled={isDisabled}
                                    placeholder="VD: Có kiến thức cơ bản về HTML, CSS, JavaScript"
                                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary disabled:bg-slate-50"
                                />
                            </div>
                            <button
                                onClick={() => removeItem('requirements', index)}
                                disabled={isDisabled}
                                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    ))}

                    {course.requirements?.length === 0 && (
                        <p className="text-sm text-slate-400 text-center py-4">
                            Chưa có yêu cầu nào. Click "Thêm" để bắt đầu.
                        </p>
                    )}
                </div>
            </div>

            {/* Đối tượng học viên */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h2 className="text-xl font-bold text-secondary">Đối tượng học viên</h2>
                        <p className="text-sm text-slate-600 mt-1">Khóa học phù hợp với ai?</p>
                    </div>
                    <button
                        onClick={() => addItem('target_audience')}
                        disabled={isDisabled}
                        className="flex items-center gap-2 px-4 py-2 text-primary border border-primary rounded-lg hover:bg-primary/5 transition-colors disabled:opacity-50"
                    >
                        <Plus className="w-4 h-4" />
                        Thêm
                    </button>
                </div>

                <div className="space-y-3">
                    {course.target_audience?.map((item: string, index: number) => (
                        <div key={index} className="flex items-start gap-3">
                            <div className="flex-1">
                                <input
                                    type="text"
                                    value={item}
                                    onChange={(e) => updateItem('target_audience', index, e.target.value)}
                                    disabled={isDisabled}
                                    placeholder="VD: Người mới bắt đầu học lập trình web"
                                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary disabled:bg-slate-50"
                                />
                            </div>
                            <button
                                onClick={() => removeItem('target_audience', index)}
                                disabled={isDisabled}
                                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    ))}

                    {course.target_audience?.length === 0 && (
                        <p className="text-sm text-slate-400 text-center py-4">
                            Chưa có mục nào. Click "Thêm" để bắt đầu.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};
