import { Link } from 'react-router-dom'
import { EnrolledCourse } from '../../../types/types'
import { Award } from 'lucide-react'

const CourseProgressCard: React.FC<{ course: EnrolledCourse }> = ({ course }) => (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow flex flex-col h-full">
        <div className="relative">
            <img src={course.thumbnail} alt={course.title} className="w-full h-40 object-cover" />
            <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded text-xs font-bold text-secondary">
                {course.category}
            </div>
        </div>
        <div className="p-4 flex-1 flex flex-col">
            <h3 className="font-bold text-secondary line-clamp-2 mb-2 h-12">{course.title}</h3>
            <p className="text-xs text-slate-500 mb-4">{course.instructor.name}</p>

            <div className="mt-auto">
                <div className="flex justify-between text-xs mb-1 text-slate-600">
                    <span>{course.progress === 100 ? 'Hoàn thành' : 'Đang học'}</span>
                    <span className="font-bold">{course.progress}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 mb-4">
                    <div
                        className={`h-2 rounded-full ${course.progress === 100 ? 'bg-emerald-500' : 'bg-primary'}`}
                        style={{ width: `${course.progress}%` }}
                    ></div>
                </div>

                {course.progress === 100 ? (
                    <button className="w-full border border-emerald-500 text-emerald-600 font-medium py-2 rounded hover:bg-emerald-50 transition-colors flex items-center justify-center">
                        <Award className='mr-2 text-lg' />
                        Xem chứng chỉ
                    </button>
                ) : (
                    <Link to={`/lesson/1`} className="block w-full text-center bg-primary text-white font-medium py-2 rounded hover:bg-primary-hover transition-colors">
                        Tiếp tục học
                    </Link>
                )}
            </div>
        </div>
    </div>
);

export default CourseProgressCard;