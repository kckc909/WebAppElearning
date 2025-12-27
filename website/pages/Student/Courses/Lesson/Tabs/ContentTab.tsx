import React from 'react';
import { Play, FileText, Code, CheckSquare, HelpCircle, Image as ImageIcon, Globe, Activity, Upload, CheckCircle, Loader2 } from 'lucide-react';

interface LessonBlock {
    id: number;
    slot_id: string;
    type: string;
    order_index: number;
    content: any;
    settings: any;
}

interface ContentTabProps {
    content?: string; // Fallback markdown content
    blocks?: LessonBlock[];
    layoutType?: string;
    isCompleted?: boolean;
    isMarkingComplete?: boolean;
    onMarkComplete?: () => void;
}

// Component to render individual block based on type
const BlockRenderer: React.FC<{ block: LessonBlock }> = ({ block }) => {
    const { type, content, settings } = block;
    const bgColor = settings?.background_color || 'bg-white';
    const padding = settings?.padding || 'p-6';
    const borderRadius = settings?.border_radius || 'rounded-xl';

    switch (type) {
        case 'text':
            return (
                <div className={`${bgColor} ${padding} ${borderRadius} shadow-sm`}>
                    <div
                        className="prose prose-slate max-w-none"
                        dangerouslySetInnerHTML={{ __html: content?.html || '' }}
                    />
                </div>
            );

        case 'video':
            const videoUrl = content?.url || '';
            const isYouTube = videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be');
            const embedUrl = isYouTube
                ? videoUrl.replace('watch?v=', 'embed/').replace('youtu.be/', 'youtube.com/embed/')
                : videoUrl;

            return (
                <div className={`${bgColor} ${padding} ${borderRadius} shadow-sm`}>
                    <div className="aspect-video rounded-lg overflow-hidden bg-black">
                        {isYouTube ? (
                            <iframe
                                src={embedUrl}
                                className="w-full h-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                title={content?.title || 'Video'}
                            />
                        ) : (
                            <video
                                src={videoUrl}
                                controls
                                className="w-full h-full"
                            />
                        )}
                    </div>
                    {content?.title && (
                        <p className="text-sm text-slate-600 mt-2">{content.title}</p>
                    )}
                </div>
            );

        case 'image':
            return (
                <div className={`${bgColor} ${padding} ${borderRadius} shadow-sm`}>
                    <img
                        src={content?.url}
                        alt={settings?.alt_text || content?.caption || 'Image'}
                        className="max-w-full h-auto rounded-lg mx-auto"
                    />
                    {content?.caption && (
                        <p className="text-sm text-slate-500 text-center mt-2">{content.caption}</p>
                    )}
                </div>
            );

        case 'quiz':
            return (
                <div className={`${bgColor} ${padding} ${borderRadius} shadow-sm border-l-4 border-blue-500`}>
                    <div className="flex items-start gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                            <CheckSquare className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                            <h4 className="font-semibold text-slate-700 mb-3">{content?.question}</h4>
                            <div className="space-y-2">
                                {content?.options?.map((opt: string, idx: number) => (
                                    <label key={idx} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 cursor-pointer transition-colors">
                                        <input type="radio" name={`quiz-${block.id}`} className="text-blue-500" />
                                        <span className="text-slate-700">{opt}</span>
                                    </label>
                                ))}
                            </div>
                            {settings?.points && (
                                <p className="text-xs text-slate-500 mt-3">{settings.points} điểm</p>
                            )}
                        </div>
                    </div>
                </div>
            );

        case 'ide':
            return (
                <div className={`bg-slate-900 ${padding} ${borderRadius} shadow-sm`}>
                    <div className="flex items-center gap-2 mb-3">
                        <Code className="w-4 h-4 text-slate-400" />
                        <span className="text-xs text-slate-400 uppercase">{settings?.language || 'code'}</span>
                    </div>
                    <pre className={`text-sm text-green-400 font-mono overflow-x-auto ${settings?.height || 'max-h-64'}`}>
                        <code>{content?.code || ''}</code>
                    </pre>
                </div>
            );

        case 'document':
            return (
                <div className={`${bgColor} ${padding} ${borderRadius} shadow-sm`}>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-red-100 rounded-lg text-red-600">
                            <FileText className="w-5 h-5" />
                        </div>
                        <div>
                            <h4 className="font-medium text-slate-700">{content?.title || 'Document'}</h4>
                            {content?.pages && <p className="text-xs text-slate-500">{content.pages} trang</p>}
                        </div>
                    </div>
                    <div className={`bg-slate-100 rounded-lg ${settings?.height || 'h-64'} flex items-center justify-center`}>
                        <span className="text-slate-500">Document viewer placeholder</span>
                    </div>
                </div>
            );

        case 'embed':
            return (
                <div className={`${bgColor} ${padding} ${borderRadius} shadow-sm`}>
                    <div className="flex items-center gap-2 mb-3">
                        <Globe className="w-4 h-4 text-slate-500" />
                        <span className="text-sm text-slate-600">{content?.title || 'External Content'}</span>
                    </div>
                    <div className={`${settings?.height || 'h-64'} rounded-lg overflow-hidden bg-slate-100`}>
                        <iframe
                            src={content?.url}
                            className="w-full h-full border-0"
                            title={content?.title || 'Embedded content'}
                        />
                    </div>
                </div>
            );

        case 'practice':
            return (
                <div className={`${bgColor} ${padding} ${borderRadius} shadow-sm border-l-4 border-green-500`}>
                    <div className="flex items-start gap-3">
                        <div className="p-2 bg-green-100 rounded-lg text-green-600">
                            <Activity className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                            <h4 className="font-semibold text-slate-700 mb-2">{content?.title}</h4>
                            <p className="text-slate-600 text-sm mb-4">{content?.description}</p>
                            {content?.requirements && (
                                <ul className="list-disc list-inside text-sm text-slate-600 space-y-1 mb-4">
                                    {content.requirements.map((req: string, idx: number) => (
                                        <li key={idx}>{req}</li>
                                    ))}
                                </ul>
                            )}
                            {settings?.points && (
                                <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                                    {settings.points} điểm
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            );

        default:
            return (
                <div className={`${bgColor} ${padding} ${borderRadius} shadow-sm border border-dashed border-slate-300`}>
                    <p className="text-slate-500 text-center">Block type: {type}</p>
                </div>
            );
    }
};

// Completion Button Component
const CompletionButton: React.FC<{
    isCompleted?: boolean;
    isMarkingComplete?: boolean;
    onMarkComplete?: () => void;
}> = ({ isCompleted, isMarkingComplete, onMarkComplete }) => {
    if (!onMarkComplete) return null;

    return (
        <div className="mt-8 pt-6 border-t border-slate-200">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-gradient-to-r from-slate-50 to-slate-100 rounded-2xl p-6">
                <div className="text-center sm:text-left">
                    <h3 className="font-semibold text-slate-700 text-lg">
                        {isCompleted ? '🎉 Bạn đã hoàn thành bài học này!' : 'Đã học xong bài này?'}
                    </h3>
                    <p className="text-sm text-slate-500 mt-1">
                        {isCompleted
                            ? 'Tuyệt vời! Bạn có thể tiếp tục sang bài học tiếp theo.'
                            : 'Nhấn nút bên dưới để đánh dấu hoàn thành và mở khóa bài tiếp theo.'}
                    </p>
                </div>
                <button
                    onClick={onMarkComplete}
                    disabled={isCompleted || isMarkingComplete}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 ${isCompleted
                            ? 'bg-green-100 text-green-700 cursor-default'
                            : isMarkingComplete
                                ? 'bg-slate-200 text-slate-500 cursor-wait'
                                : 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg hover:shadow-xl'
                        }`}
                >
                    {isMarkingComplete ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            <span>Đang xử lý...</span>
                        </>
                    ) : isCompleted ? (
                        <>
                            <CheckCircle className="w-5 h-5" />
                            <span>Đã hoàn thành</span>
                        </>
                    ) : (
                        <>
                            <CheckCircle className="w-5 h-5" />
                            <span>Đánh dấu hoàn thành</span>
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};

const ContentTab: React.FC<ContentTabProps> = ({ content, blocks, layoutType, isCompleted, isMarkingComplete, onMarkComplete }) => {
    // If we have blocks, render them
    if (blocks && blocks.length > 0) {
        // Group blocks by slot_id for layout rendering
        const blocksBySlot = blocks.reduce((acc, block) => {
            const slot = block.slot_id || 'main';
            if (!acc[slot]) acc[slot] = [];
            acc[slot].push(block);
            return acc;
        }, {} as Record<string, LessonBlock[]>);

        // Sort blocks within each slot
        Object.values(blocksBySlot).forEach(slotBlocks => {
            slotBlocks.sort((a, b) => a.order_index - b.order_index);
        });

        // Render based on layout type
        const renderLayout = () => {
            switch (layoutType) {
                case 'split':
                    return (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="space-y-6">
                                {(blocksBySlot['left'] || blocksBySlot['main'] || []).map(block => (
                                    <BlockRenderer key={block.id} block={block} />
                                ))}
                            </div>
                            <div className="space-y-6">
                                {(blocksBySlot['right'] || []).map(block => (
                                    <BlockRenderer key={block.id} block={block} />
                                ))}
                            </div>
                        </div>
                    );

                case 'sidebar-left':
                    return (
                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                            <div className="lg:col-span-1 space-y-4">
                                {(blocksBySlot['nav'] || blocksBySlot['sidebar'] || []).map(block => (
                                    <BlockRenderer key={block.id} block={block} />
                                ))}
                            </div>
                            <div className="lg:col-span-3 space-y-6">
                                {(blocksBySlot['main'] || []).map(block => (
                                    <BlockRenderer key={block.id} block={block} />
                                ))}
                            </div>
                        </div>
                    );

                case 'sidebar-right':
                    return (
                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                            <div className="lg:col-span-3 space-y-6">
                                {(blocksBySlot['main'] || []).map(block => (
                                    <BlockRenderer key={block.id} block={block} />
                                ))}
                            </div>
                            <div className="lg:col-span-1 space-y-4">
                                {(blocksBySlot['sidebar'] || []).map(block => (
                                    <BlockRenderer key={block.id} block={block} />
                                ))}
                            </div>
                        </div>
                    );

                case 'grid':
                    const gridSlots = ['grid-1', 'grid-2', 'grid-3', 'grid-4'];
                    return (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {gridSlots.map(slot => (
                                <div key={slot} className="space-y-4">
                                    {(blocksBySlot[slot] || []).map(block => (
                                        <BlockRenderer key={block.id} block={block} />
                                    ))}
                                </div>
                            ))}
                        </div>
                    );

                case 'stacked':
                    return (
                        <div className="space-y-6">
                            {(blocksBySlot['hero'] || []).map(block => (
                                <BlockRenderer key={block.id} block={block} />
                            ))}
                            {(blocksBySlot['content'] || blocksBySlot['main'] || []).map(block => (
                                <BlockRenderer key={block.id} block={block} />
                            ))}
                        </div>
                    );

                case 'focus':
                    return (
                        <div className="max-w-2xl mx-auto space-y-6">
                            {(blocksBySlot['center'] || blocksBySlot['main'] || []).map(block => (
                                <BlockRenderer key={block.id} block={block} />
                            ))}
                        </div>
                    );

                // Default: single column
                default:
                    return (
                        <div className="space-y-6">
                            {blocks.map(block => (
                                <BlockRenderer key={block.id} block={block} />
                            ))}
                        </div>
                    );
            }
        };

        return (
            <div className="max-w-6xl mx-auto p-6 lg:p-8 pb-20 lg:pb-8">
                {renderLayout()}
                <CompletionButton
                    isCompleted={isCompleted}
                    isMarkingComplete={isMarkingComplete}
                    onMarkComplete={onMarkComplete}
                />
            </div>
        );
    }

    // Fallback: render markdown content
    return (
        <div className="max-w-4xl mx-auto p-6 lg:p-8 pb-20 lg:pb-8">
            <div className="bg-white rounded-2xl shadow-sm p-8 prose prose-slate max-w-none">
                <div className="whitespace-pre-wrap">{content || 'Chưa có nội dung'}</div>
            </div>
            <CompletionButton
                isCompleted={isCompleted}
                isMarkingComplete={isMarkingComplete}
                onMarkComplete={onMarkComplete}
            />
        </div>
    );
};

export default ContentTab;

