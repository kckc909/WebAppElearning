import { Presentation, User, Clock, Video } from "lucide-react"
import { StudentClass } from "../../../types/types"
import { STUDENT_CLASSES } from "../../../mockData"

const Tab_List = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {STUDENT_CLASSES.map((cls: StudentClass) => (
                <div key={cls.id} className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <div className="bg-blue-100 text-primary p-3 rounded-lg">
                            <Presentation className="w-6 h-6 text-current" strokeWidth={1.4} />

                        </div>
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded">Đang hoạt động</span>
                    </div>
                    <h3 className="text-xl font-bold text-secondary mb-2">{cls.name}</h3>
                    <p className="text-sm text-slate-500 mb-4 flex">
                        <User className="w-5 h-5 align-middle mr-1" strokeWidth={1.6} /> {cls.instructor}
                    </p>

                    <div className="space-y-3 mb-6">
                        <div className="flex items-center text-sm text-slate-700 bg-slate-50 p-2 rounded">
                            <Clock className="w-5 h-5 mr-3 text-slate-400" strokeWidth={1.5} />

                            <span>{cls.schedule}</span>
                        </div>
                        {cls.nextSession && (
                            <div className="flex items-center text-sm text-slate-700 bg-red-50 p-2 rounded border border-red-100">
                                <Video className="w-6 h-6 mr-3 text-red-500" strokeWidth={1.6} />

                                <span>Buổi tới: {cls.nextSession.title}</span>
                            </div>
                        )}
                    </div>

                    <div className="flex gap-3">
                        <button className="flex-1 bg-primary text-white py-2 rounded-md font-medium hover:bg-primary-hover transition-colors">
                            Vào lớp
                        </button>
                        <button className="px-3 py-2 border border-slate-300 rounded-md text-slate-600 hover:bg-slate-50">
                            Chi tiết
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Tab_List;