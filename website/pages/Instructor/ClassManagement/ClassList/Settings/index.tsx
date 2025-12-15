import React from 'react';
import { Settings as SettingsIcon } from 'lucide-react';

const InstructorClassSettings: React.FC = () => {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-secondary">Cài đặt lớp học</h1>
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Tên lớp học</label>
                        <input type="text" className="w-full px-4 py-2 border border-slate-300 rounded-lg" defaultValue="Web Development - Lớp A1" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Lịch học</label>
                        <input type="text" className="w-full px-4 py-2 border border-slate-300 rounded-lg" defaultValue="T2, T4, T6 - 19:00-21:00" />
                    </div>
                    <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                        Lưu thay đổi
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InstructorClassSettings;
