/**
 * LESSON SETTINGS PANEL
 * Edit lesson-level metadata and layout settings with auto-apply
 */

import React, { useState, useEffect } from 'react';
import { X, Settings, Layout as LayoutIcon, Info, Trash2 } from 'lucide-react';
import type { LessonVersion } from '../../../../../../mock-db';

interface LessonSettingsPanelProps {
    lessonVersion: LessonVersion;
    lessonTitle?: string;
    lessonDescription?: string;
    onUpdate: (metadata: LessonVersion['metadata']) => void;
    onUpdateTitle?: (title: string) => void;
    onUpdateDescription?: (description: string) => void;
    onDelete?: () => void;
    onClose: () => void;
}

export const LessonSettingsPanel: React.FC<LessonSettingsPanelProps> = ({
    lessonVersion,
    lessonTitle = 'Lesson',
    lessonDescription = '',
    onUpdate,
    onUpdateTitle,
    onUpdateDescription,
    onDelete,
    onClose
}) => {
    // Defensive: ensure metadata exists
    const initialMetadata = lessonVersion?.metadata || {};
    const [metadata, setMetadata] = useState(initialMetadata);
    const [title, setTitle] = useState(lessonTitle);
    const [description, setDescription] = useState(lessonDescription);
    
    // Ref for title input to auto-focus
    const titleInputRef = React.useRef<HTMLInputElement>(null);

    // Reset when lessonVersion changes
    useEffect(() => {
        if (lessonVersion?.metadata) {
            setMetadata(lessonVersion.metadata);
        }
    }, [lessonVersion?.id]);

    useEffect(() => {
        setTitle(lessonTitle);
        // Auto-focus title input when lesson changes and title is empty
        if (!lessonTitle || lessonTitle.trim() === '') {
            setTimeout(() => {
                titleInputRef.current?.focus();
                titleInputRef.current?.select();
            }, 100);
        }
    }, [lessonTitle]);

    useEffect(() => {
        setDescription(lessonDescription);
    }, [lessonDescription]);

    // Handler to allow empty title (like section title)
    const handleTitleChange = (newTitle: string) => {
        setTitle(newTitle);
    };

    // AUTO-APPLY: Update parent whenever metadata changes
    useEffect(() => {
        const timer = setTimeout(() => {
            onUpdate(metadata);
        }, 300);
        return () => clearTimeout(timer);
    }, [metadata]);

    // AUTO-APPLY: Update title
    useEffect(() => {
        const timer = setTimeout(() => {
            if (onUpdateTitle && title !== lessonTitle) {
                onUpdateTitle(title);
            }
        }, 300);
        return () => clearTimeout(timer);
    }, [title]);

    // AUTO-APPLY: Update description
    useEffect(() => {
        const timer = setTimeout(() => {
            if (onUpdateDescription && description !== lessonDescription) {
                onUpdateDescription(description);
            }
        }, 300);
        return () => clearTimeout(timer);
    }, [description]);

    return (
        <div className="h-full flex flex-col">
            {/* Header */}
            <div className="p-4 border-b border-slate-200">
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                        <LayoutIcon size={18} className="text-slate-400" />
                        <h3 className="font-bold text-slate-800">Lesson Settings</h3>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1 text-slate-400 hover:text-slate-600 rounded"
                    >
                        <X size={18} />
                    </button>
                </div>
                <p className="text-xs text-slate-500">
                    Layout: {lessonVersion?.layout_type || 'N/A'} • Version {lessonVersion?.version_number || 'N/A'}
                </p>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {/* Lesson Title */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                        Lesson Title
                    </label>
                    <input
                        ref={titleInputRef}
                        type="text"
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={title}
                        onChange={(e) => handleTitleChange(e.target.value)}
                        placeholder="Enter lesson title..."
                    />
                </div>

                {/* Learning Objective (per-lesson description) */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                        <Info size={14} className="inline mr-1" />
                        Learning Objective
                    </label>
                    <textarea
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        rows={3}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="What will students learn in this lesson?"
                    />
                </div>

                {/* Estimated Time */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                        Estimated Time (minutes)
                    </label>
                    <input
                        type="number"
                        min="1"
                        max="300"
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={metadata.estimated_time || 10}
                        onChange={(e) => setMetadata({ ...metadata, estimated_time: parseInt(e.target.value) || 10 })}
                    />
                </div>

                {/* Optional Lesson */}
                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        id="is_optional"
                        checked={metadata.is_optional || false}
                        onChange={(e) => setMetadata({ ...metadata, is_optional: e.target.checked })}
                        className="rounded"
                    />
                    <label htmlFor="is_optional" className="text-sm text-slate-700">
                        Mark as optional lesson
                    </label>
                </div>

                {/* Visual Settings */}
                <div className="pt-4 border-t border-slate-200">
                    <h4 className="text-sm font-bold text-slate-700 mb-3">Layout Settings</h4>

                    <div className="space-y-3">
                        <div>
                            <label className="block text-xs font-medium text-slate-600 mb-1">Container Width</label>
                            <select
                                className="w-full px-2 py-1.5 border border-slate-300 rounded text-sm"
                                value={metadata.container_width || 'max-w-7xl'}
                                onChange={(e) => setMetadata({ ...metadata, container_width: e.target.value })}
                            >
                                <option value="max-w-3xl">Narrow (max-w-3xl)</option>
                                <option value="max-w-5xl">Medium (max-w-5xl)</option>
                                <option value="max-w-7xl">Wide (max-w-7xl)</option>
                                <option value="max-w-full">Full Width</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-slate-600 mb-1">Gap Between Blocks</label>
                            <select
                                className="w-full px-2 py-1.5 border border-slate-300 rounded text-sm"
                                value={metadata.gap_size || 'gap-6'}
                                onChange={(e) => setMetadata({ ...metadata, gap_size: e.target.value })}
                            >
                                <option value="gap-2">Small (gap-2)</option>
                                <option value="gap-4">Medium (gap-4)</option>
                                <option value="gap-6">Large (gap-6)</option>
                                <option value="gap-8">Extra Large (gap-8)</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-slate-600 mb-1">Background Color</label>
                            <select
                                className="w-full px-2 py-1.5 border border-slate-300 rounded text-sm"
                                value={metadata.background_color || 'bg-slate-50'}
                                onChange={(e) => setMetadata({ ...metadata, background_color: e.target.value })}
                            >
                                <option value="bg-white">White</option>
                                <option value="bg-slate-50">Light Gray</option>
                                <option value="bg-blue-50">Light Blue</option>
                                <option value="bg-slate-100">Medium Gray</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-slate-200 space-y-2">
                <p className="text-xs text-green-700 text-center mb-2">
                    ✓ Changes are applied automatically
                </p>
                {onDelete && (
                    <button
                        onClick={onDelete}
                        className="w-full flex items-center justify-center gap-2 py-2 bg-red-50 text-red-600 border border-red-200 rounded-lg font-medium hover:bg-red-100 transition-colors"
                    >
                        <Trash2 size={16} />
                        Delete Lesson
                    </button>
                )}
            </div>
        </div>
    );
};
