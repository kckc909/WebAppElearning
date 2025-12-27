import React, { useEffect } from 'react';
import { MessageSquare, ThumbsUp } from 'lucide-react';
import { useClassQA } from '../../../../hooks/useClassQA';

const StudentQA: React.FC = () => {
    // TODO: Get class ID from params/context
    const classId = 1;

    // Get questions from API hook
    const { data: questionsData, isLoading, error, refetch } = useClassQA(classId);

    useEffect(() => {
        if (classId) {
            refetch();
        }
    }, [classId]);

    const questions = (questionsData || []).map((q: any) => ({
        id: q.id,
        question: q.question || q.title,
        askedBy: q.asked_by || q.author,
        answers: q.answers_count || 0,
        likes: q.likes_count || 0,
        date: q.created_at,
    }));

    if (isLoading) {
        return <div className="flex items-center justify-center h-64">�ang t?i...</div>;
    }

    if (error) {
        return <div className="text-red-500">L?i: {(error as Error).message}</div>;
    }

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-secondary">Hỏi & Đáp</h1>
                <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors">
                    Đặt câu hỏi
                </button>
            </div>

            <div className="space-y-4">
                {questions.map((q) => (
                    <div key={q.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                        <h3 className="text-lg font-bold text-slate-900 mb-2">{q.question}</h3>
                        <p className="text-sm text-slate-600 mb-3">Hỏi bởi: {q.askedBy} • {q.date}</p>
                        <div className="flex items-center gap-4 text-sm text-slate-600">
                            <div className="flex items-center gap-1">
                                <MessageSquare className="w-4 h-4" />
                                <span>{q.answers} câu trả lời</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <ThumbsUp className="w-4 h-4" />
                                <span>{q.likes} thích</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {questions.length === 0 && (
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
                    <MessageSquare className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">Chưa có câu hỏi</h3>
                    <p className="text-slate-600">Hãy là người đầu tiên đặt câu hỏi!</p>
                </div>
            )}
        </div>
    );
};

export default StudentQA;
