import React from 'react';
import { AlertCircle, Clock } from 'lucide-react';
import { CourseState } from './types';

interface CourseAlertsProps {
    course: CourseState;
}

export const CourseAlerts: React.FC<CourseAlertsProps> = ({ course }) => {
    return (
        <>
            {course.status === 'REJECTED' && course.rejection_reason && (
                <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                        <div className="flex-1">
                            <h3 className="font-semibold text-red-900 mb-1">Khóa học bị từ chối</h3>
                            <p className="text-sm text-red-700 mb-2">
                                <strong>Lý do:</strong> {course.rejection_reason}
                            </p>
                            <p className="text-xs text-red-600">
                                Vui lòng chỉnh sửa khóa học theo yêu cầu và gửi lại để được duyệt.
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {course.status === 'PENDING' && (
                <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                        <Clock className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                        <div className="flex-1">
                            <h3 className="font-semibold text-yellow-900 mb-1">Đang chờ duyệt</h3>
                            <p className="text-sm text-yellow-700">
                                Khóa học của bạn đang được admin xem xét. Bạn không thể chỉnh sửa trong thời gian này.
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
