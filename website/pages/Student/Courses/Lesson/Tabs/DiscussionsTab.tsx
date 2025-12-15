import React, { useState } from 'react';
import { Send, MessageSquare } from 'lucide-react';

interface Discussion {
    id: number;
    user: string;
    avatar: string;
    question: string;
    time: string;
    replies: number;
}

interface DiscussionsTabProps {
    discussions: Discussion[];
}

const DiscussionsTab: React.FC<DiscussionsTabProps> = ({ discussions }) => {
    const [newQuestion, setNewQuestion] = useState('');

    const handleSubmit = () => {
        if (newQuestion.trim()) {
            // TODO: Submit question to backend
            console.log('Submitting question:', newQuestion);
            setNewQuestion('');
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 lg:p-8 pb-20 lg:pb-8">
            <div className="bg-white rounded-2xl shadow-sm p-6">
                <h2 className="text-2xl font-bold text-secondary mb-6">Thảo luận</h2>

                {/* New Question Form */}
                <div className="mb-8 p-4 bg-slate-50 rounded-xl">
                    <textarea
                        value={newQuestion}
                        onChange={(e) => setNewQuestion(e.target.value)}
                        placeholder="Đặt câu hỏi của bạn..."
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary resize-none"
                        rows={3}
                    />
                    <div className="flex justify-end mt-3">
                        <button
                            onClick={handleSubmit}
                            disabled={!newQuestion.trim()}
                            className="px-6 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Send className="w-4 h-4" />
                            Gửi câu hỏi
                        </button>
                    </div>
                </div>

                {/* Discussions List */}
                {discussions.length === 0 ? (
                    <div className="text-center py-12 text-slate-500">
                        <MessageSquare className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                        <p>Chưa có thảo luận nào</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {discussions.map((discussion) => (
                            <div
                                key={discussion.id}
                                className="p-4 border border-slate-200 rounded-xl hover:border-primary transition-colors cursor-pointer"
                            >
                                <div className="flex gap-3">
                                    <img
                                        src={discussion.avatar}
                                        alt={discussion.user}
                                        className="w-10 h-10 rounded-full flex-shrink-0"
                                    />
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-2">
                                            <h4 className="font-semibold text-secondary">{discussion.user}</h4>
                                            <span className="text-sm text-slate-500">{discussion.time}</span>
                                        </div>
                                        <p className="text-slate-700 mb-3">{discussion.question}</p>
                                        <button className="text-sm text-primary hover:underline">
                                            {discussion.replies} câu trả lời
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default DiscussionsTab;
