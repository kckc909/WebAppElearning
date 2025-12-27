/**
 * SECTION SETTINGS PANEL
 * Edit properties of selected section
 */

import React, { useState, useEffect } from 'react';
import { X, Settings, Hash, FileText, Trash2 } from 'lucide-react';

interface Section {
    id: string;
    title: string;
    lessons: Array<{
        id: string;
        title: string;
        layout?: string;
    }>;
}

interface SectionSettingsPanelProps {
    section: Section;
    onUpdate: (updates: Partial<Section>) => void;
    onDelete: () => void;
    onClose: () => void;
}

export const SectionSettingsPanel: React.FC<SectionSettingsPanelProps> = ({
    section,
    onUpdate,
    onDelete,
    onClose
}) => {
    const [title, setTitle] = useState(section.title);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    // Update local state when section changes
    useEffect(() => {
        setTitle(section.title);
    }, [section.id, section.title]);

    // Debounced update to parent
    useEffect(() => {
        const timer = setTimeout(() => {
            if (title !== section.title) {
                onUpdate({ title });
            }
        }, 300);
        return () => clearTimeout(timer);
    }, [title, section.title, onUpdate]);

    const handleTitleChange = (newTitle: string) => {
        setTitle(newTitle);
    };

    const handleDelete = () => {
        if (showDeleteConfirm) {
            onDelete();
        } else {
            setShowDeleteConfirm(true);
            setTimeout(() => setShowDeleteConfirm(false), 3000);
        }
    };

    return (
        <div className="h-full flex flex-col">
            {/* Header */}
            <div className="p-4 border-b border-slate-200">
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                        <Settings size={18} className="text-slate-400" />
                        <h3 className="font-bold text-slate-800">Section Settings</h3>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1 text-slate-400 hover:text-slate-600 rounded"
                    >
                        <X size={18} />
                    </button>
                </div>
                <p className="text-xs text-slate-500">
                    Section ID: {section.id}
                </p>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {/* Section Title */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                        Section Title
                    </label>
                    <input
                        type="text"
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={title}
                        onChange={(e) => handleTitleChange(e.target.value)}
                    />
                </div>

                {/* Section Info */}
                <div className="space-y-3">
                    <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded border border-slate-200">
                        <Hash size={16} className="text-slate-400" />
                        <div className="flex-1">
                            <span className="text-xs text-slate-500">Section ID</span>
                            <p className="text-sm font-mono text-slate-700">{section.id}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded border border-slate-200">
                        <FileText size={16} className="text-slate-400" />
                        <div className="flex-1">
                            <span className="text-xs text-slate-500">Total Lessons</span>
                            <p className="text-sm font-bold text-slate-700">{section.lessons.length}</p>
                        </div>
                    </div>
                </div>

                {/* Lessons in Section */}
                <div>
                    <h4 className="text-sm font-bold text-slate-700 mb-3">Lessons in this Section</h4>
                    <div className="space-y-2">
                        {section.lessons.length > 0 ? (
                            section.lessons.map((lesson, index) => (
                                <div
                                    key={lesson.id}
                                    className="px-3 py-2 bg-white border border-slate-200 rounded flex items-center gap-2"
                                >
                                    <span className="text-xs font-mono text-slate-400">#{index + 1}</span>
                                    <span className="text-sm text-slate-700 truncate">{lesson.title}</span>
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-slate-400 italic">No lessons in this section yet.</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-slate-200 space-y-2">
                <button
                    onClick={handleDelete}
                    className={`w-full flex items-center justify-center gap-2 py-2 rounded-lg font-medium transition-all ${showDeleteConfirm
                        ? 'bg-red-600 text-white hover:bg-red-700'
                        : 'bg-red-50 text-red-600 hover:bg-red-100 border border-red-200'
                        }`}
                >
                    <Trash2 size={16} />
                    {showDeleteConfirm ? 'Click again to confirm' : 'Delete Section'}
                </button>
            </div>
        </div>
    );
};
