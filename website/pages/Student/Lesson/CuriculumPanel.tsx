import { Link } from "react-router-dom";
import { CourseWithRelations as Course, Lecture } from "../../../types/types";

const CurriculumPanel: React.FC<{ course: Course, currentLessonId: number }> = ({ course, currentLessonId }) => (
    <div className="p-6">
        <h2 className="text-xl font-bold text-secondary mb-4">Mục lục khóa học</h2>
        <div className="space-y-4">
            {course.curriculum.map((section, index) => (
                <div key={index}>
                    <h3 className="font-semibold text-slate-600 bg-slate-100 p-2 rounded-md">{section.section}</h3>
                    <ul className="mt-2 space-y-1">
                        {section.lectures.map((lecture: any) => (
                            <li key={lecture.id}>
                                <Link to={`/lesson/${lecture.id}`} className={`flex items-center p-2 rounded-md text-sm transition-colors ${currentLessonId === lecture.id ? 'bg-blue-100 text-primary font-semibold' : 'hover:bg-slate-50 text-slate-700'}`}>
                                    <ion-icon name={lecture.type === 'coding' ? 'code-slash-outline' : 'play-circle-outline'} class="mr-3 text-lg"></ion-icon>
                                    <span className="flex-1">{lecture.title}</span>
                                    <span className="text-xs text-slate-500">{lecture.duration}</span>
                                </Link>
                            </li> 
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    </div>
);

export default CurriculumPanel;