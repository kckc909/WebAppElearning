import React, { useState } from "react";
import { Calendar, CalendarDays, Clock, Edit3, FolderOpen, List, Presentation, User, Video, ToolCase } from 'lucide-react'
import { STUDENT_CLASSES } from '../../../mockData'
import { StudentClass } from "../../../cus_types";
import Tab_List from './Tab_List'
import Tab_Schedule from './Tab_Schedule'
import Tab_Docs from './Tab_Docs'
import Tab_Homework from './Tab_Homework'

export default function Student_Clases() {
    const [activeTab, setActiveTab] = useState<'list' | 'schedule' | 'docs' | 'homework'>('list');

    // Currently defaulting to the first class for detail view demonstration
    const selectedClass = STUDENT_CLASSES[0];

    return (
        <div className="space-y-8 w-full mx-10 min-h-[calc(100vh-140px)] flex flex-col">
            <h1 className="text-2xl font-bold text-secondary mb-6 flex-shrink-0">Lớp học của tôi</h1>

            <div className="bg-white w-full rounded-xl shadow-sm border border-slate-200 flex-1 flex flex-col overflow-hidden">

                {/* Tabs */}
                <div className="flex border-b border-slate-200 overflow-x-auto flex-nowrap no-scrollbar">
                    <button
                        onClick={() => setActiveTab('list')}
                        className={`px-6 py-4 text-sm font-medium whitespace-nowrap min-w-max border-b-2 transition-colors flex ${activeTab === 'list'
                                ? 'border-primary text-primary'
                                : 'border-transparent text-slate-500 hover:text-slate-700'
                            }`}
                    >
                        <List className="w-5 h-5 mr-2 align-middle mb-1" strokeWidth={1.5} /> Danh sách lớp
                    </button>

                    <button
                        onClick={() => setActiveTab('schedule')}
                        className={`px-6 py-4 text-sm font-medium whitespace-nowrap min-w-max border-b-2 transition-colors flex ${activeTab === 'schedule'
                                ? 'border-primary text-primary'
                                : 'border-transparent text-slate-500 hover:text-slate-700'
                            }`}
                    >
                        <Calendar className="w-5 h-5 mr-2 align-middle mb-1" strokeWidth={1.5} /> Lịch học
                    </button>

                    <button
                        onClick={() => setActiveTab('docs')}
                        className={`px-6 py-4 text-sm font-medium whitespace-nowrap min-w-max border-b-2 transition-colors flex ${activeTab === 'docs'
                                ? 'border-primary text-primary'
                                : 'border-transparent text-slate-500 hover:text-slate-700'
                            }`}
                    >
                        <FolderOpen className="w-5 h-5 mr-2 align-middle mb-1" strokeWidth={1.5} /> Tài liệu
                    </button>

                    <button
                        onClick={() => setActiveTab('homework')}
                        className={`px-6 py-4 text-sm font-medium whitespace-nowrap min-w-max border-b-2 transition-colors flex ${activeTab === 'homework'
                                ? 'border-primary text-primary'
                                : 'border-transparent text-slate-500 hover:text-slate-700'
                            }`}
                    >
                        <Edit3 className="w-5 h-5 mr-2 align-middle mb-1" strokeWidth={1.4} /> Bài tập
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 overflow-y-auto bg-slate-50">
                    {activeTab === 'list' && <Tab_List />}
                    {activeTab === 'schedule' && <Tab_Schedule selectedClass={selectedClass} />}
                    {activeTab === 'docs' && <Tab_Docs selectedClass={selectedClass} />}
                    {activeTab === 'homework' && <Tab_Homework selectedClass={selectedClass} />}
                </div>

            </div>
        </div>

    );
} 