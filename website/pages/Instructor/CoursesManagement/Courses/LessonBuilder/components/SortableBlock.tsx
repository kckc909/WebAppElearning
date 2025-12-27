/**
 * SORTABLE BLOCK
 * Individual draggable content block with INLINE EDITING for text blocks
 */

import React, { useRef, useEffect } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Trash2, Type, Video, Image as ImageIcon, Code, FileText, CheckSquare, Activity, Globe, HelpCircle, UploadCloud } from 'lucide-react';
import type { LessonBlock, BlockType } from '../../../../../../mock-db';

interface SortableBlockProps {
    block: LessonBlock;
    isSelected: boolean;
    isPreviewMode: boolean;
    onSelect: (id: number) => void;
    onUpdate: (id: number, updates: Partial<LessonBlock>) => void;
    onDelete: (id: number) => void;
}

const BLOCK_ICONS: Record<BlockType, React.ReactNode> = {
    'text': <Type size={16} />,
    'video': <Video size={16} />,
    'image': <ImageIcon size={16} />,
    'document': <FileText size={16} />,
    'ide': <Code size={16} />,
    'quiz': <CheckSquare size={16} />,
    'practice': <Activity size={16} />,
    'embed': <Globe size={16} />,
    'question-slot': <HelpCircle size={16} />,
    'smart-file': <UploadCloud size={16} />
};

export const SortableBlock: React.FC<SortableBlockProps> = ({
    block,
    isSelected,
    isPreviewMode,
    onSelect,
    onUpdate,
    onDelete
}) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id: block.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1
    };

    // Build visual classes from settings
    const visualClasses = [
        block.settings.background_color || 'bg-white',
        block.settings.padding || 'p-5',
        block.settings.border_radius || 'rounded-xl',
        'border',
        'shadow-sm',
        'relative',
        'group',
        'transition-all'
    ].join(' ');

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`${visualClasses} ${isSelected ? 'ring-2 ring-blue-500 border-blue-500' : 'border-slate-200 hover:border-slate-300'
                }`}
            onClick={(e) => {
                e.stopPropagation();
                onSelect(block.id);
            }}
        >
            {/* Drag Handle + Delete (Edit Mode Only) */}
            {!isPreviewMode && (
                <>
                    <div
                        {...attributes}
                        {...listeners}
                        className="absolute left-2 top-2 p-1 text-slate-300 hover:text-slate-600 cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100 transition-opacity z-10"
                    >
                        <GripVertical size={16} />
                    </div>

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onDelete(block.id);
                        }}
                        className="absolute right-2 top-2 p-1.5 text-slate-300 hover:bg-red-50 hover:text-red-600 rounded opacity-0 group-hover:opacity-100 transition-all z-10"
                    >
                        <Trash2 size={14} />
                    </button>
                </>
            )}

            {/* Block Type Badge */}
            {!isPreviewMode && (
                <div className="absolute right-2 bottom-2 flex items-center gap-1 text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity">
                    {BLOCK_ICONS[block.type]}
                    <span className="text-[10px] uppercase font-mono">{block.type}</span>
                </div>
            )}

            {/* Block Content Renderer */}
            <BlockContentRenderer
                block={block}
                isPreviewMode={isPreviewMode}
                isSelected={isSelected}
                onUpdate={onUpdate}
            />
        </div>
    );
};

// Block Content Renderer - with INLINE EDITING for text blocks
interface BlockContentRendererProps {
    block: LessonBlock;
    isPreviewMode: boolean;
    isSelected: boolean;
    onUpdate: (id: number, updates: Partial<LessonBlock>) => void;
}

const BlockContentRenderer: React.FC<BlockContentRendererProps> = ({
    block,
    isPreviewMode,
    isSelected,
    onUpdate
}) => {
    const textAlign = block.settings.text_align ? `text-${block.settings.text_align}` : 'text-left';
    const editorRef = useRef<HTMLDivElement>(null);
    const isInternalChange = useRef(false);

    // For text blocks: sync content when block changes (from external source)
    useEffect(() => {
        if (block.type === 'text' && editorRef.current && !isInternalChange.current) {
            if (editorRef.current.innerHTML !== (block.content.html || '')) {
                editorRef.current.innerHTML = block.content.html || '<p>Click to edit text...</p>';
            }
        }
        isInternalChange.current = false;
    }, [block.content.html, block.id]);

    // Handle inline text editing
    const handleTextInput = () => {
        if (editorRef.current && block.type === 'text') {
            isInternalChange.current = true;
            onUpdate(block.id, {
                content: { ...block.content, html: editorRef.current.innerHTML }
            });
        }
    };

    switch (block.type) {
        case 'text':
            // INLINE EDITABLE TEXT BLOCK
            if (isPreviewMode) {
                return (
                    <div
                        className={`prose prose-sm max-w-none ${textAlign}`}
                        dangerouslySetInnerHTML={{
                            __html: block.content.html || '<p class="text-slate-400 italic">Empty text block...</p>'
                        }}
                    />
                );
            }

            return (
                <div
                    ref={editorRef}
                    contentEditable
                    suppressContentEditableWarning
                    className={`prose prose-sm max-w-none ${textAlign} min-h-[60px] focus:outline-none cursor-text`}
                    onInput={handleTextInput}
                    data-text-editor="true"
                    style={{ whiteSpace: 'pre-wrap' }}
                />
            );

        case 'video':
            return (
                <div className="aspect-video bg-slate-900 rounded-lg flex items-center justify-center text-slate-400">
                    {block.content.url ? (
                        <iframe
                            src={block.content.url}
                            className="w-full h-full rounded-lg"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    ) : (
                        <div className="text-center">
                            <Video size={32} className="mx-auto mb-2 opacity-50" />
                            <span className="text-sm">No video configured</span>
                        </div>
                    )}
                </div>
            );

        case 'image':
            return (
                <div className={`flex ${textAlign === 'text-center' ? 'justify-center' : textAlign === 'text-right' ? 'justify-end' : 'justify-start'}`}>
                    {block.content.url ? (
                        <img
                            src={block.content.url}
                            alt={block.settings.alt_text || 'Image'}
                            className="max-w-full rounded-lg"
                        />
                    ) : (
                        <div className="w-full h-48 bg-slate-100 rounded-lg flex items-center justify-center border border-slate-200">
                            <ImageIcon size={32} className="text-slate-300" />
                        </div>
                    )}
                </div>
            );

        case 'quiz':
            return (
                <div className="space-y-3">
                    <h4 className="font-semibold text-slate-800">
                        {block.content.question || 'New Question'}
                    </h4>
                    {block.content.question_type === 'multiple-choice' && (
                        <div className="space-y-2">
                            {(block.content.options || []).map((opt: string, idx: number) => (
                                <div
                                    key={idx}
                                    className={`p-3 rounded-lg border text-sm ${block.content.correct_answer === idx
                                        ? 'bg-green-50 border-green-200 text-green-800'
                                        : 'bg-white border-slate-200'
                                        }`}
                                >
                                    {opt}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            );

        case 'ide':
            return (
                <div className="font-mono text-sm">
                    <div className="bg-slate-800 text-slate-200 px-3 py-1.5 rounded-t-lg text-xs">
                        {block.settings.language || 'javascript'}
                    </div>
                    <div className="bg-slate-900 text-slate-300 p-4 rounded-b-lg overflow-x-auto">
                        <pre>{block.content.code || '// Code here...'}</pre>
                    </div>
                </div>
            );

        default:
            return (
                <div className="text-slate-400 italic text-sm">
                    [{block.type}] block - Renderer not implemented
                </div>
            );
    }
};
