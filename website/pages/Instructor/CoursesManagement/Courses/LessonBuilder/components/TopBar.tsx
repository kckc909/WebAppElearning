import React from 'react';
import { ChevronLeft, Eye, Save, Send, Clock, MoreVertical } from 'lucide-react';
import { CourseData } from '../../../../../../types/lesson-builder';

interface TopBarProps {
    lessonData: CourseData;
    onTitleChange: (title: string) => void;
    onPreviewToggle: () => void;
    isPreview: boolean;
    onSaveDraft?: () => void;
    onPublish?: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
    lessonData,
    onTitleChange,
    onPreviewToggle,
    isPreview,
    onSaveDraft,
    onPublish
}) => {
    return (
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sticky top-0 z-50">
            <div className="flex items-center gap-4 flex-1">
                <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors">
                    <ChevronLeft className="w-5 h-5" />
                </button>

                <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                        <span className="bg-slate-100 text-slate-600 text-xs px-2 py-0.5 rounded font-medium uppercase tracking-wider">
                            {lessonData.status}
                        </span>
                        <span className="text-xs text-slate-400 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            Saved {lessonData.lastSaved.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                    </div>
                    <input
                        type="text"
                        value={lessonData.title}
                        onChange={(e) => onTitleChange(e.target.value)}
                        className="text-lg font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-100 rounded -ml-1 pl-1 bg-transparent hover:bg-slate-50 transition-colors w-full max-w-md"
                        placeholder="Enter lesson title..."
                    />
                </div>
            </div>

            <div className="flex items-center gap-2">
                <button
                    onClick={onPreviewToggle}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isPreview
                            ? 'bg-blue-50 text-blue-600 ring-1 ring-blue-200'
                            : 'text-slate-600 hover:bg-slate-100'
                        }`}
                >
                    <Eye className="w-4 h-4" />
                    {isPreview ? 'Edit' : 'Preview'}
                </button>

                {!isPreview && (
                    <>
                        <button
                            onClick={onSaveDraft}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors"
                        >
                            <Save className="w-4 h-4" />
                            Draft
                        </button>
                        <button
                            onClick={onPublish}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium shadow-sm transition-all hover:shadow-md"
                        >
                            <Send className="w-4 h-4" />
                            Publish
                        </button>
                        <button className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100">
                            <MoreVertical className="w-4 h-4" />
                        </button>
                    </>
                )}
            </div>
        </header>
    );
};
