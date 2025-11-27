import { CalendarDays } from "lucide-react"

const Tab_Schedule = ({ selectedClass }: any) => {

    return (
        <div className="text-center py-12">
            <div className="inline-block p-4 bg-white rounded-full shadow mb-4">
                <CalendarDays className="w-10 h-10 text-primary" strokeWidth={1.4} />

            </div>
            <h3 className="text-lg font-medium text-secondary">Lịch học chi tiết</h3>
            <p className="text-slate-500 mb-6">Xem lịch học của lớp {selectedClass.name}</p>
            {/* Placeholder Calendar Grid */}
            <div className="bg-white rounded-lg border border-slate-200 p-4 max-w-2xl mx-auto text-left">
                <div className="space-y-4">
                    <div className="flex p-4 bg-blue-50 border-l-4 border-primary rounded">
                        <div className="mr-4 text-center w-16">
                            <div className="text-sm font-bold text-slate-500">TH 2</div>
                            <div className="text-xl font-bold">12</div>
                        </div>
                        <div>
                            <h4 className="font-bold">Session 10: Advanced Vocabulary</h4>
                            <p className="text-sm text-slate-600">19:30 - 21:00</p>
                        </div>
                    </div>
                    <div className="flex p-4 bg-white border border-slate-200 rounded opacity-75">
                        <div className="mr-4 text-center w-16">
                            <div className="text-sm font-bold text-slate-500">TH 4</div>
                            <div className="text-xl font-bold">14</div>
                        </div>
                        <div>
                            <h4 className="font-bold">Session 11: Speaking Practice</h4>
                            <p className="text-sm text-slate-600">19:30 - 21:00</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Tab_Schedule;