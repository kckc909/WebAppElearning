import React, { useState } from "react";
import { Calendar, Edit3, FolderOpen, List, Loader2 } from 'lucide-react'
import { useMyClasses } from '../../../hooks/useApi';
import { useAuth } from '../../../contexts/AuthContext';
import Tab_List from './Tab_List'
import Tab_Schedule from './Tab_Schedule'
import Tab_Docs from './Tab_Docs'
import Tab_Homework from './Tab_Homework'
import { ErrorState } from '../../../components/DataStates';

export default function Student_Clases() {
    const [activeTab, setActiveTab] = useState<'list' | 'schedule' | 'docs' | 'homework'>('list');
    const [selectedClassId, setSelectedClassId] = useState<number | null>(null);

    // Use AuthContext instead of hardcoded ID
    const { user } = useAuth();
    const userId = user?.id || 7; // Fallback to 7 for backward compatibility

    const { data: myClasses, loading, error, refetch } = useMyClasses(userId);

    // Đảm bảo myClasses luôn là array
    const classList = Array.isArray(myClasses) ? myClasses : [];

    // Auto-select first class if none selected and classes exist
    React.useEffect(() => {
        if (classList.length > 0 && selectedClassId === null) {
            setSelectedClassId(classList[0].id);
        }
    }, [classList, selectedClassId]);

    // Find selected class by ID (not index)
    const selectedClass = classList.find(c => c.id === selectedClassId) || null;

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                <span className="ml-3 text-slate-500">Đang tải lớp học...</span>
            </div>
        );
    }

    if (error) {
        return <ErrorState error={error} onRetry={refetch} />;
    }


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
                    {activeTab === 'list' && <Tab_List classes={classList} selectedClassId={selectedClassId} onSelectClass={setSelectedClassId} />}
                    {activeTab === 'schedule' && <Tab_Schedule selectedClass={selectedClass} />}
                    {activeTab === 'docs' && <Tab_Docs selectedClass={selectedClass} />}
                    {activeTab === 'homework' && <Tab_Homework selectedClass={selectedClass} />}
                </div>

            </div>
        </div>

    );
} 