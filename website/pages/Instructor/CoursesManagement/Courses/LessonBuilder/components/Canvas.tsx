import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
    GripVertical, Trash2,
    Video, Type, FileText, Code, CheckSquare, Activity, Globe,
    Layout, Settings, HelpCircle, Upload, Edit3, Image as ImageIcon, Lock, UploadCloud
} from 'lucide-react';
import { Section, Lesson, ContentBlock, BlockType } from '../../../../../../types/lesson-builder';

interface CanvasProps {
    sections: Section[];
    activeLessonId: string | null;
    activeBlockId: string | null;
    onSelectLesson: (id: string) => void;
    onSelectBlock: (id: string) => void;
    onDeleteBlock: (lessonId: string, region: string, blockId: string) => void;
    onUpdateBlock: (updates: Partial<ContentBlock>, id: string) => void;
}

export const Canvas: React.FC<CanvasProps> = ({
    sections, activeLessonId, activeBlockId,
    onSelectLesson, onSelectBlock, onDeleteBlock, onUpdateBlock
}) => {

    const activeLesson = sections
        .flatMap(s => s.lessons)
        .find(l => l.id === activeLessonId);

    return (
        <div className="flex h-full w-full">
            {/* Lesson Builder (Center) */}
            <div
                className={`flex-1 overflow-y-auto p-4 md:p-8 w-full transition-colors ${activeLesson?.metadata.backgroundColor || 'bg-slate-100/50'}`}
                onClick={(e) => {
                    // Select lesson properties if clicking empty canvas background
                    if (activeLessonId && e.target === e.currentTarget) {
                        onSelectLesson(activeLessonId);
                    }
                }}
            >
                {activeLesson ? (
                    <div className={`${activeLesson.metadata.containerWidth || 'max-w-5xl'} mx-auto transition-all duration-300 min-h-[80vh] flex flex-col`}>
                        {/* Lesson Header */}
                        <div
                            className="mb-8 flex items-start justify-between cursor-pointer p-4 -mx-4 rounded-xl hover:bg-black/5 transition-colors group"
                            onClick={() => onSelectLesson(activeLesson.id)}
                        >
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-xs font-bold bg-blue-100 text-blue-700 px-2 py-0.5 rounded uppercase tracking-wider">
                                        {activeLesson.layout.replace('-', ' ')}
                                    </span>
                                    {activeLesson.metadata.isOptional && (
                                        <span className="text-xs font-medium bg-slate-200 text-slate-600 px-2 py-0.5 rounded">Optional</span>
                                    )}
                                </div>
                                <h1 className="text-3xl font-bold text-slate-800 tracking-tight">{activeLesson.title}</h1>
                                {activeLesson.metadata.objective && (
                                    <p className="text-base text-slate-500 mt-2 max-w-2xl">{activeLesson.metadata.objective}</p>
                                )}
                            </div>

                            <button
                                className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-sm font-medium hover:bg-slate-50 shadow-sm transition-all opacity-0 group-hover:opacity-100"
                            >
                                <Settings size={14} />
                                <span className="hidden sm:inline">Settings</span>
                            </button>
                        </div>

                        {/* Layout Renderer */}
                        <div className="flex-1">
                            <LessonLayoutRenderer
                                lesson={activeLesson}
                                activeBlockId={activeBlockId}
                                onSelectLesson={() => onSelectLesson(activeLesson.id)}
                                onSelectBlock={onSelectBlock}
                                onDeleteBlock={onDeleteBlock}
                                onUpdateBlock={onUpdateBlock}
                            />
                        </div>
                    </div>
                ) : (
                    <div className="h-full flex flex-col items-center justify-center text-slate-400">
                        <Layout size={48} className="mb-4 opacity-50" />
                        <p className="text-lg font-medium">Select a lesson to start building</p>
                        <p className="text-sm">Or create a new one from the sidebar.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

// --- Layout Renderer ---

const LessonLayoutRenderer = ({ lesson, activeBlockId, onSelectBlock, onDeleteBlock, onSelectLesson, onUpdateBlock }: any) => {
    const gapClass = lesson.metadata.gapSize || 'gap-6';

    const renderRegion = (regionId: string, className: string = "") => (
        <div
            className={`flex flex-col h-full ${className} ${gapClass} transition-colors rounded-xl border-2 border-transparent hover:border-blue-200/50 p-1`}
            onClick={(e) => {
                // Allow selecting layout by clicking empty region space
                if (e.target === e.currentTarget) onSelectLesson();
            }}
        >
            {lesson.content[regionId]?.length === 0 && (
                <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 flex flex-col items-center justify-center text-slate-400 bg-white/50 h-full min-h-[150px]">
                    <span className="text-sm font-medium">Region: {regionId}</span>
                    <span className="text-xs">Drop content here</span>
                </div>
            )}
            <DroppableRegion
                id={`${lesson.id}-${regionId}`}
                items={lesson.content[regionId] || []}
                activeBlockId={activeBlockId}
                onSelectBlock={onSelectBlock}
                onDeleteBlock={(blockId: string) => onDeleteBlock(lesson.id, regionId, blockId)}
                onUpdateBlock={onUpdateBlock}
                gapClass={gapClass}
            />
        </div>
    );

    if (lesson.layout === 'split') {
        return (
            <div className={`grid grid-cols-1 lg:grid-cols-2 ${gapClass} items-stretch h-full`}>
                <div>
                    {renderRegion('left')}
                </div>
                <div>
                    {renderRegion('right')}
                </div>
            </div>
        );
    }

    // Default Single Layout
    return (
        <div className="w-full h-full">
            {renderRegion('main')}
        </div>
    );
};

const DroppableRegion = ({ id, items, activeBlockId, onSelectBlock, onDeleteBlock, onUpdateBlock, gapClass }: any) => {
    const { setNodeRef } = useDroppable({ id });

    return (
        <div ref={setNodeRef} className={`min-h-[50px] h-full flex flex-col ${gapClass}`}>
            <SortableContext
                id={id}
                items={items.map((b: ContentBlock) => b.id)}
                strategy={verticalListSortingStrategy}
            >
                {items.map((block: ContentBlock) => (
                    <SortableBlock
                        key={block.id}
                        block={block}
                        isActive={block.id === activeBlockId}
                        onSelect={() => onSelectBlock(block.id)}
                        onDelete={() => onDeleteBlock(block.id)}
                        onUpdateBlock={onUpdateBlock}
                    />
                ))}
            </SortableContext>
        </div>
    );
};

const SortableBlock = ({ block, isActive, onSelect, onDelete, onUpdateBlock }: any) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: block.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.4 : 1,
    };

    const getIcon = (type: BlockType) => {
        switch (type) {
            case 'text': return <Type size={16} />;
            case 'video': return <Video size={16} />;
            case 'image': return <ImageIcon size={16} />;
            case 'ide': return <Code size={16} />;
            case 'quiz': return <CheckSquare size={16} />;
            case 'practice': return <Activity size={16} />;
            case 'embed': return <Globe size={16} />;
            case 'question-slot': return <HelpCircle size={16} />;
            case 'smart-file': return <UploadCloud size={16} />;
            default: return <FileText size={16} />;
        }
    };

    // Construct dynamic visual classes from settings
    const visualClasses = [
        block.settings?.backgroundColor || 'bg-white',
        block.settings?.padding || 'p-5',
        block.settings?.borderRadius || 'rounded-xl',
        block.settings?.textAlign ? `text-${block.settings.textAlign}` : 'text-left',
        block.settings?.flexGrow ? 'flex-1' : '',
        block.settings?.isSticky ? 'sticky top-4 z-30 shadow-md ring-1 ring-blue-100' : 'shadow-sm', // Sticky Logic
        'border'
    ].join(' ');

    return (
        <div
            ref={setNodeRef}
            style={style}
            onClick={(e) => { e.stopPropagation(); onSelect(); }}
            className={`group relative transition-all cursor-pointer flex flex-col ${visualClasses} ${isActive
                    ? 'border-blue-500 ring-1 ring-blue-500 z-10'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
        >
            {/* Handle */}
            <div {...attributes} {...listeners} className="absolute left-2 top-2 text-slate-300 hover:text-slate-500 cursor-grab active:cursor-grabbing p-1 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                <GripVertical size={14} />
            </div>

            {/* Icon Badge */}
            <div className="absolute right-2 bottom-2 text-slate-200 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none flex items-center gap-1">
                {block.settings?.isSticky && <Lock size={12} className="text-blue-300" />}
                {getIcon(block.type)}
            </div>

            {/* Render Actual Content */}
            <div className="w-full flex-1">
                {renderBlockContent(block, onUpdateBlock)}
            </div>

            {/* Delete Action */}
            <button
                onClick={(e) => { e.stopPropagation(); onDelete(); }}
                className="absolute top-2 right-2 p-1.5 text-slate-300 hover:bg-red-50 hover:text-red-500 rounded opacity-0 group-hover:opacity-100 transition-all z-20"
            >
                <Trash2 size={14} />
            </button>
        </div>
    );
};

// Helper for video embeds
const getVideoEmbed = (url: string) => {
    if (!url) return null;

    // Blob URLs (temporary preview before upload completes)
    // Storage server URLs or Direct video files (MP4, WebM, OGG)
    if (url.startsWith('blob:') || 
        url.match(/\.(mp4|webm|ogg)$/i) || 
        url.includes('localhost:3001') || 
        url.includes('/uploads/')) {
        return { type: 'native', url };
    }

    // YouTube - handle both embed and watch URLs
    const ytMatch = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    if (ytMatch) {
        return { type: 'iframe', url: `https://www.youtube.com/embed/${ytMatch[1]}` };
    }

    // Vimeo - handle both embed and regular URLs
    const vimeoMatch = url.match(/(?:vimeo\.com\/|player\.vimeo\.com\/video\/)(\d+)/);
    if (vimeoMatch) {
        return { type: 'iframe', url: `https://player.vimeo.com/video/${vimeoMatch[1]}` };
    }

    return { type: 'unknown', url };
};

const renderBlockContent = (block: ContentBlock, onUpdateBlock: any) => {
    // Handler for Smart File Upload
    const handleSmartUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const mimeType = file.type;

            try {
                // Show loading state
                const loadingUrl = 'uploading...';
                if (mimeType.startsWith('video/')) {
                    onUpdateBlock({ type: 'video', content: { url: loadingUrl } }, block.id);
                } else if (mimeType.startsWith('image/')) {
                    onUpdateBlock({ type: 'image', content: { url: loadingUrl, altText: file.name } }, block.id);
                } else if (mimeType === 'application/pdf') {
                    onUpdateBlock({ type: 'document', content: { url: loadingUrl } }, block.id);
                }

                // Upload to storage server
                const formData = new FormData();
                formData.append('file', file);

                const API_BASE_URL = import.meta.env.VITE_BACK_END_API_PATH || 'http://localhost:4000';
                let uploadEndpoint = '/api/upload/file';
                
                if (mimeType.startsWith('video/')) {
                    uploadEndpoint = '/api/upload/video';
                } else if (mimeType.startsWith('image/')) {
                    uploadEndpoint = '/api/upload/image';
                } else if (mimeType === 'application/pdf') {
                    uploadEndpoint = '/api/upload/document';
                }

                const response = await fetch(`${API_BASE_URL}${uploadEndpoint}`, {
                    method: 'POST',
                    body: formData,
                });

                if (response.ok) {
                    const data = await response.json();
                    const uploadedUrl = data.file?.url || data.url;

                    // Update with real URL from storage server
                    if (mimeType.startsWith('video/')) {
                        onUpdateBlock({ type: 'video', content: { url: uploadedUrl } }, block.id);
                    } else if (mimeType.startsWith('image/')) {
                        onUpdateBlock({ type: 'image', content: { url: uploadedUrl, altText: file.name } }, block.id);
                    } else if (mimeType === 'application/pdf') {
                        onUpdateBlock({ type: 'document', content: { url: uploadedUrl } }, block.id);
                    }

                    console.log('File uploaded successfully:', uploadedUrl);
                } else {
                    throw new Error('Upload failed');
                }
            } catch (error) {
                console.error('Upload error:', error);
                alert(`Failed to upload ${file.name}. Please try again.`);
                // Revert to empty state
                onUpdateBlock({ type: 'smart-file', content: {} }, block.id);
            }
        }
    };

    switch (block.type) {
        case 'smart-file':
            return (
                <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-blue-200 bg-blue-50/50 rounded-lg hover:bg-blue-50 transition-colors">
                    <UploadCloud size={48} className="text-blue-400 mb-2" />
                    <h3 className="text-sm font-bold text-blue-900">Upload File</h3>
                    <p className="text-xs text-blue-600 mb-4 text-center">Video (MP4), Image (PNG/JPG), or Document (PDF)</p>
                    <label className="cursor-pointer bg-white border border-blue-200 text-blue-700 px-4 py-2 rounded-lg text-xs font-medium hover:shadow-sm shadow-blue-100 transition-all">
                        Choose File
                        <input type="file" className="hidden" accept="video/*,image/*,.pdf" onChange={handleSmartUpload} />
                    </label>
                </div>
            );

        case 'text':
            return (
                <div className={`prose prose-sm max-w-none text-slate-600 ${block.settings?.textAlign ? `text-${block.settings.textAlign}` : ''}`} dangerouslySetInnerHTML={{ __html: block.content.html || '<span class="text-slate-400 italic">Empty text block...</span>' }} />
            );

        case 'video':
            const videoEmbed = getVideoEmbed(block.content.url);

            return (
                <div className="space-y-2 h-full flex flex-col justify-center">
                    <div className="aspect-video bg-slate-900 rounded-lg flex items-center justify-center text-slate-500 relative overflow-hidden w-full">
                        {block.content.url && videoEmbed ? (
                            <div className="text-center w-full h-full relative group/video">
                                {videoEmbed.type === 'native' && (
                                    <video
                                        src={videoEmbed.url}
                                        controls={block.settings?.showControls !== false}
                                        autoPlay={block.settings?.autoplay}
                                        className="w-full h-full object-contain"
                                    />
                                )}
                                {videoEmbed.type === 'iframe' && (
                                    <iframe
                                        src={videoEmbed.url}
                                        className="w-full h-full"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
                                )}
                                {videoEmbed.type === 'unknown' && (
                                    <div className="flex flex-col items-center justify-center h-full p-4">
                                        <Video className="mb-2 opacity-50" size={32} />
                                        <span className="text-xs block break-all">{block.content.url}</span>
                                        <span className="text-[10px] text-slate-400 mt-1">Preview not available for this URL type</span>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center text-slate-500 h-full">
                                <Video size={32} className="opacity-50 mb-2" />
                                <span className="text-sm">No Video Configured</span>
                            </div>
                        )}
                    </div>
                </div>
            );

        case 'image':
            return (
                <div className={`w-full flex ${block.settings?.textAlign === 'center' ? 'justify-center' : block.settings?.textAlign === 'right' ? 'justify-end' : 'justify-start'}`}>
                    {block.content.url ? (
                        <img
                            src={block.content.url}
                            alt={block.settings?.altText || 'Lesson Image'}
                            className="max-w-full rounded-lg shadow-sm object-contain max-h-[600px]"
                        />
                    ) : (
                        <div className="w-full h-48 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400 border border-slate-200">
                            <ImageIcon size={32} />
                        </div>
                    )}
                </div>
            );

        case 'ide':
            return (
                <div className="font-mono text-sm h-full flex flex-col">
                    <div className="flex items-center justify-between bg-slate-800 text-slate-400 px-3 py-1.5 rounded-t-lg text-xs flex-shrink-0">
                        <span>{block.settings?.language || 'javascript'}</span>
                        <span>{block.settings?.readOnly ? 'Read Only' : 'Editable'}</span>
                    </div>
                    <div className="bg-slate-900 text-slate-300 p-4 rounded-b-lg overflow-x-auto flex-1 min-h-[150px]">
                        <pre>{block.content.code || '// Enter code here...'}</pre>
                    </div>
                </div>
            );

        case 'document':
            return (
                <div className={`${block.settings?.height || 'h-96'} bg-slate-100 border border-slate-200 rounded-lg flex flex-col items-center justify-center text-slate-500 w-full relative overflow-hidden`}>
                    {block.content.url && block.content.url.startsWith('blob:') && block.content.url.endsWith('.pdf') ? (
                        <iframe src={block.content.url} className="w-full h-full" title="PDF Viewer" />
                    ) : (
                        <>
                            <FileText size={32} className="mb-2 opacity-50" />
                            <span className="text-sm font-medium">{block.content.url ? 'Document Loaded' : 'No Document URL'}</span>
                            <span className="text-xs text-slate-400">{block.content.url}</span>
                        </>
                    )}
                </div>
            );

        case 'quiz':
            const qType = block.content.questionType || 'multiple-choice';
            return (
                <div className="flex flex-col gap-3">
                    {block.content.imageUrl && (
                        <div className="mb-2">
                            <img src={block.content.imageUrl} alt="Question" className="max-h-48 rounded-lg object-contain border border-slate-200" />
                        </div>
                    )}
                    <h4 className="font-semibold text-slate-800 text-base">{block.content.question || 'New Question'}</h4>

                    <div className="space-y-2">
                        {qType === 'multiple-choice' && (block.content.options || ['Option 1', 'Option 2']).map((opt: string, idx: number) => (
                            <div key={idx} className={`p-2 border rounded-lg text-sm flex items-center gap-2 ${block.content.correctAnswer === idx ? 'border-green-200 bg-green-50 text-green-800' : 'border-slate-200 text-slate-600'}`}>
                                <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${block.content.correctAnswer === idx ? 'border-green-500' : 'border-slate-300'}`}>
                                    {block.content.correctAnswer === idx && <div className="w-2 h-2 bg-green-500 rounded-full" />}
                                </div>
                                {opt}
                            </div>
                        ))}

                        {qType === 'text-input' && (
                            <div className="p-2 border border-slate-300 rounded-lg bg-white text-slate-400 text-sm italic flex items-center gap-2">
                                <Edit3 size={14} /> Student types answer here...
                            </div>
                        )}

                        {qType === 'file-upload' && (
                            <div className="p-8 border-2 border-dashed border-slate-200 rounded-lg bg-slate-50 text-slate-400 text-sm flex flex-col items-center gap-2">
                                <Upload size={20} /> Student uploads file
                            </div>
                        )}

                        {qType === 'mixed' && (
                            <div className="text-xs text-slate-500 italic">Mixed response type configured.</div>
                        )}
                    </div>
                </div>
            );

        case 'practice':
            return (
                <div className="border border-blue-100 bg-blue-50/50 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                        <Activity className="text-blue-500 mt-0.5" size={20} />
                        <div>
                            <h4 className="text-sm font-bold text-blue-900">Practice Activity</h4>
                            <p className="text-sm text-blue-800 mt-1">{block.content.instructions || 'No instructions provided.'}</p>
                            {block.settings?.points && (
                                <div className="mt-2 inline-block px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded font-medium">
                                    {block.settings.points} Points
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            );

        case 'question-slot':
            return (
                <div className="bg-purple-50 border border-purple-200 p-3 rounded-lg flex items-center gap-3">
                    <HelpCircle className="text-purple-500" size={20} />
                    <div>
                        <div className="font-medium text-purple-900">Question Bank Slot</div>
                        <div className="text-xs text-purple-600 font-mono">
                            {block.content.questionId ? `Linked ID: ${block.content.questionId}` : 'No question linked'}
                        </div>
                    </div>
                </div>
            );

        case 'embed':
            return (
                <div className={`${block.settings?.height || 'h-96'} bg-slate-100 rounded-lg flex items-center justify-center text-slate-400 border border-slate-200 w-full`}>
                    {block.content.url ? (
                        <div className="text-center">
                            <Globe className="mx-auto mb-2" size={24} />
                            <span className="text-xs">Embed: {block.content.url}</span>
                        </div>
                    ) : (
                        <span className="text-sm">Empty Embed Block</span>
                    )}
                </div>
            );

        default:
            return <div className="text-slate-500 italic">Unknown block type</div>;
    }
};
