import React from 'react';
import { Settings as SettingsIcon } from 'lucide-react';

const InstructorCourseSettings: React.FC = () => {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-secondary">Cài đặt khóa học</h1>
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Tên khóa học</label>
                        <input type="text" className="w-full px-4 py-2 border border-slate-300 rounded-lg" defaultValue="Complete Web Development" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Giá</label>
                        <input type="number" className="w-full px-4 py-2 border border-slate-300 rounded-lg" defaultValue="299000" />
                    </div>
                    <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                        Lưu thay đổi
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InstructorCourseSettings;
