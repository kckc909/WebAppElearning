/**
 * BLOCK TOOLBAR
 * Draggable block types for adding to lesson
 */

import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { Type, Video, Image, FileText, Code, CheckSquare, Activity, Globe, HelpCircle, UploadCloud } from 'lucide-react';
import type { BlockType } from '../../../../../../mock-db';

const BLOCK_TYPES: Array<{
    type: BlockType;
    label: string;
    icon: React.ReactNode;
    description: string;
}> = [
        { type: 'text', label: 'Rich Text', icon: <Type size={18} />, description: 'Formatted text content' },
        { type: 'video', label: 'Video', icon: <Video size={18} />, description: 'YouTube, Vimeo, or upload' },
        { type: 'image', label: 'Image', icon: <Image size={18} />, description: 'Upload or embed image' },
        { type: 'quiz', label: 'Quiz', icon: <CheckSquare size={18} />, description: 'Multiple choice or text input' },
        { type: 'ide', label: 'Code Editor', icon: <Code size={18} />, description: 'Interactive code block' },
        { type: 'document', label: 'Document', icon: <FileText size={18} />, description: 'PDF or presentation' },
        { type: 'practice', label: 'Practice', icon: <Activity size={18} />, description: 'Coding exercise' },
        { type: 'embed', label: 'Embed', icon: <Globe size={18} />, description: 'External content' },
        { type: 'question-slot', label: 'Question Slot', icon: <HelpCircle size={18} />, description: 'Link to question bank' },
        { type: 'smart-file', label: 'Smart Upload', icon: <UploadCloud size={18} />, description: 'Auto-detect file type' },
    ];

export const BlockToolbar: React.FC = () => {
    return (
        <div className="p-4">
            <div className="mb-4">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Content Blocks</h3>
                <p className="text-xs text-slate-400">Drag to add to lesson</p>
            </div>

            <div className="space-y-2">
                {BLOCK_TYPES.map(blockType => (
                    <DraggableBlockItem key={blockType.type} {...blockType} />
                ))}
            </div>
        </div>
    );
};

// Draggable Block Item
const DraggableBlockItem: React.FC<{
    type: BlockType;
    label: string;
    icon: React.ReactNode;
    description: string;
}> = ({ type, label, icon, description }) => {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: `block-${type}`,
        data: { type, fromSidebar: true }
    });

    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        opacity: isDragging ? 0.5 : 1
    } : undefined;

    return (
        <div
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            style={style}
            className="flex items-start gap-3 p-3 bg-white border border-slate-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all cursor-grab active:cursor-grabbing group"
        >
            <div className="p-2 bg-slate-50 rounded text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-500 transition-colors flex-shrink-0">
                {icon}
            </div>
            <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-slate-700 truncate">{label}</div>
                <div className="text-xs text-slate-400 line-clamp-2">{description}</div>
            </div>
        </div>
    );
};
