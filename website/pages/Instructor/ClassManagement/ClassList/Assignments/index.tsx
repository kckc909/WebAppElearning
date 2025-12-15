import React from 'react';
import { FileText, CheckCircle } from 'lucide-react';

const InstructorClassAssignments: React.FC = () => {
    const assignments = [
        { id: 1, title: 'Bài tập tuần 6', deadline: '2024-12-20', submitted: 18, total: 25 },
        { id: 2, title: 'Bài tập tuần 5', deadline: '2024-12-13', submitted: 25, total: 25 },
    ];

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-secondary">Bài tập</h1>
            <div className="space-y-3">
                {assignments.map((assignment) => (
                    <div key={assignment.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                        <div className="flex items-start justify-between mb-3">
                            <div>
                                <h3 className="font-bold text-slate-900">{assignment.title}</h3>
                                <p className="text-sm text-slate-600">Hạn nộp: {assignment.deadline}</p>
                            </div>
                            <FileText className="w-5 h-5 text-green-600" />
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <span className="text-slate-600">{assignment.submitted}/{assignment.total} đã nộp</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InstructorClassAssignments;