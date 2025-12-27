import React, { useEffect } from 'react';
import { FileText, CheckCircle, Clock } from 'lucide-react';
import { useClassHomework } from '../../../../hooks/useClassHomework';

const StudentHomework: React.FC = () => {
    // TODO: Get class ID from params/context
    const classId = 1;

    // Get homework from API hook
    const { data: homeworkData, isLoading, error, refetch } = useClassHomework(classId);

    useEffect(() => {
        if (classId) {
            refetch();
        }
    }, [classId]);

    const homework = (homeworkData || []).map((hw: any) => ({
        id: hw.id,
        title: hw.title,
        className: hw.class_name,
        deadline: hw.deadline || hw.due_date,
        status: hw.status,
    }));

    if (isLoading) {
        return <div className="flex items-center justify-center h-64">�ang t?i...</div>;
    }

    if (error) {
        return <div className="text-red-500">L?i: {(error as Error).message}</div>;
    }

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold text-secondary">Bài tập của tôi</h1>

            <div className="space-y-4">
                {homework.map((hw) => (
                    <div key={hw.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                        <div className="flex items-start justify-between mb-3">
                            <div>
                                <h3 className="text-lg font-bold text-slate-900">{hw.title}</h3>
                                <p className="text-sm text-slate-600 mt-1">{hw.className}</p>
                                <p className="text-sm text-slate-500 mt-1">Hạn nộp: {hw.deadline}</p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${hw.status === 'submitted'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-yellow-100 text-yellow-700'
                                }`}>
                                {hw.status === 'submitted' ? 'Đã nộp' : 'Chưa nộp'}
                            </span>
                        </div>
                        {hw.status === 'pending' && (
                            <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors">
                                Nộp bài
                            </button>
                        )}
                    </div>
                ))}
            </div>

            {homework.length === 0 && (
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
                    <FileText className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">Chưa có bài tập</h3>
                    <p className="text-slate-600">Bài tập sẽ hiển thị ở đây khi có</p>
                </div>
            )}
        </div>
    );
};

export default StudentHomework;
