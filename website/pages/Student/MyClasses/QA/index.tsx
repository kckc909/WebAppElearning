import React from 'react';
import { MessageSquare, ThumbsUp } from 'lucide-react';

const StudentQA: React.FC = () => {
    const questions = [
        {
            id: 1,
            question: 'Làm thế nào để sử dụng useEffect?',
            askedBy: 'Nguyễn Văn A',
            answers: 3,
            likes: 5,
            date: '2024-12-10',
        },
        {
            id: 2,
            question: 'Sự khác biệt giữa useState và useReducer?',
            askedBy: 'Trần Thị B',
            answers: 2,
            likes: 3,
            date: '2024-12-08',
        },
    ];

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
        </div>
    );
};

export default StudentQA;
