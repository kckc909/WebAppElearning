import React, { useState } from 'react';
import { Send, Loader2, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { DbCoursesApi } from '../API/implementations/db/DbCoursesApi';

interface SubmitCourseButtonProps {
    courseId: number;
    courseStatus: string;
    instructorId: number;
    onSuccess?: () => void;
}

export const SubmitCourseButton: React.FC<SubmitCourseButtonProps> = ({
    courseId,
    courseStatus,
    instructorId,
    onSuccess
}) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const coursesApi = new DbCoursesApi();

    // Only show button for DRAFT or REJECTED courses
    if (courseStatus !== 'DRAFT' && courseStatus !== 'REJECTED') {
        return null;
    }

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            const response = await coursesApi.submitForReview(courseId, instructorId);
            
            if (response.success) {
                toast.success('Đã gửi khóa học để admin duyệt!', {
                    icon: '✅',
                    duration: 3000
                });
                setShowConfirmDialog(false);
                onSuccess?.();
            } else {
                toast.error(response.message || 'Không thể gửi khóa học');
            }
        } catch (error: any) {
            toast.error(error.message || 'Có lỗi xảy ra');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <button
                onClick={() => setShowConfirmDialog(true)}
                disabled={isSubmitting}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isSubmitting ? (
                    <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Đang gửi...
                    </>
                ) : (
                    <>
                        <Send className="w-4 h-4" />
                        Gửi duyệt
                    </>
                )}
            </button>

            {/* Confirm Dialog */}
            {showConfirmDialog && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-md w-full p-6">
                        <div className="flex items-start gap-4 mb-4">
                            <div className="p-3 bg-primary/10 rounded-full">
                                <AlertCircle className="w-6 h-6 text-primary" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-xl font-bold text-secondary mb-2">
                                    Xác nhận gửi duyệt
                                </h3>
                                <p className="text-slate-600">
                                    Bạn có chắc chắn muốn gửi khóa học này để admin duyệt? 
                                    Sau khi gửi, bạn sẽ không thể chỉnh sửa cho đến khi admin phê duyệt hoặc từ chối.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-3 justify-end">
                            <button
                                onClick={() => setShowConfirmDialog(false)}
                                disabled={isSubmitting}
                                className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                            >
                                Hủy
                            </button>
                            <button
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors disabled:opacity-50"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Đang gửi...
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-4 h-4" />
                                        Xác nhận gửi
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
