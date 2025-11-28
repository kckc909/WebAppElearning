import { LessonComment } from "../../../cus_types";

const CommentsPanel: React.FC<{ comments: LessonComment[] }> = ({ comments }) => (
    <div className="p-6">
        <h2 className="text-xl font-bold text-secondary mb-4">Bình luận</h2>
        <div className="flex items-start space-x-3 mb-6">
            <img src="https://picsum.photos/seed/currentUser/100/100" alt="Current User" className="w-10 h-10 rounded-full" />
            <textarea placeholder="Viết bình luận của bạn..." className="w-full border-slate-300 rounded-md focus:ring-primary focus:border-primary text-sm"></textarea>
            <button className="bg-primary text-white px-4 py-2 rounded-md font-semibold text-sm hover:bg-primary-hover">Gửi</button>
        </div>
        <div className="space-y-6">
            {comments.map(comment => (
                <div key={comment.id} className="flex items-start space-x-3">
                    <img src={comment.avatar} alt={comment.author} className="w-10 h-10 rounded-full" />
                    <div className="flex-1">
                        <p>
                            <span className="font-semibold text-sm">{comment.author}</span>
                            <span className="text-xs text-slate-500 ml-2">{comment.date}</span>
                        </p>
                        <p className="text-sm text-slate-700 mt-1">{comment.comment}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
);


export default CommentsPanel;