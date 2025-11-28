import { LessonQA } from "../../../cus_types";

const QAPanel: React.FC<{ qas: LessonQA[], instructor: any }> = ({ qas, instructor }) => (
    <div className="p-6">
        <h2 className="text-xl font-bold text-secondary mb-4">Hỏi & Đáp</h2>
        <div className="bg-slate-50 p-4 rounded-lg mb-6">
            <h3 className="font-semibold mb-2">Đặt câu hỏi cho giảng viên</h3>
            <textarea placeholder="Nhập câu hỏi của bạn..." rows={3} className="w-full border-slate-300 rounded-md focus:ring-primary focus:border-primary text-sm"></textarea>
            <button className="mt-2 bg-primary text-white px-4 py-2 rounded-md font-semibold text-sm hover:bg-primary-hover">Gửi câu hỏi</button>
        </div>
        <div className="space-y-6">
            {qas.map(qa => (
                <div key={qa.id}>
                    <div className="flex items-start space-x-3">
                        <img src={qa.question.avatar} alt={qa.question.author} className="w-10 h-10 rounded-full" />
                        <div>
                            <p className="font-semibold text-sm">{qa.question.author}</p>
                            <p className="text-sm text-slate-700 mt-1">{qa.question.text}</p>
                            <p className="text-xs text-slate-500 mt-1">{qa.question.date}</p>
                        </div>
                    </div>
                    {qa.answer ? (
                        <div className="flex items-start space-x-3 mt-4 ml-8 bg-blue-50 p-3 rounded-md">
                            <img src={qa.answer.avatar} alt={qa.answer.author} className="w-10 h-10 rounded-full" />
                            <div>
                                <p className="font-semibold text-sm text-primary">{qa.answer.author} (Giảng viên)</p>
                                <p className="text-sm text-slate-700 mt-1">{qa.answer.text}</p>
                                <p className="text-xs text-slate-500 mt-1">{qa.answer.date}</p>
                            </div>
                        </div>
                    ) : (
                        <div className="ml-12 mt-2 text-sm text-slate-500">Chưa có câu trả lời.</div>
                    )}
                </div>
            ))}
        </div>
    </div>
);

export default QAPanel;