/**
 * PROPERTY PANEL - Enhanced UX
 * Rich text editor, visual color/radius pickers
 */

import React, { useState, useEffect, useRef } from 'react';
import {
    X, Type, Video, Image as ImageIcon, FileText, Code, CheckSquare,
    Activity, Globe, HelpCircle, UploadCloud, Plus, Trash2,
    Bold, Italic, Underline, List, ListOrdered, AlignLeft, AlignCenter, AlignRight,
    Link, Quote
} from 'lucide-react';
import type { LessonBlock, BlockType } from '../../../../../../mock-db';
import { FileUploader } from './FileUploader';

interface PropertyPanelProps {
    block: LessonBlock | null;
    onUpdate: (updates: Partial<LessonBlock>) => void;
    onClose: () => void;
}

// Helper function to convert various YouTube URL formats to embed format
const convertToEmbedUrl = (url: string): string => {
    if (!url) return url;

    // Already an embed URL
    if (url.includes('youtube.com/embed/') || url.includes('player.vimeo.com/video/')) {
        return url;
    }

    // YouTube formats
    // https://www.youtube.com/watch?v=VIDEO_ID
    // https://youtu.be/VIDEO_ID
    // https://www.youtube.com/v/VIDEO_ID
    // https://m.youtube.com/watch?v=VIDEO_ID
    const ytMatch = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    if (ytMatch && ytMatch[1]) {
        return `https://www.youtube.com/embed/${ytMatch[1]}`;
    }

    // Vimeo formats
    // https://vimeo.com/VIDEO_ID
    const vimeoMatch = url.match(/(?:vimeo\.com\/)(\d+)/);
    if (vimeoMatch && vimeoMatch[1]) {
        return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
    }

    // Return as-is for direct video links or storage server URLs
    return url;
};

// Helper function to render video preview
const renderVideoPreview = (url: string) => {
    if (!url) return null;

    // Check if it's a blob URL (temporary preview) or direct video file (uploaded or direct link)
    if (url.startsWith('blob:') || 
        url.match(/\.(mp4|webm|ogg)$/i) || 
        url.includes('localhost:3001') || 
        url.includes('/uploads/') ||
        (url.startsWith('http://') && !url.includes('youtube') && !url.includes('vimeo'))) {
        return (
            <video
                src={url}
                controls
                className="w-full h-full object-contain"
            >
                Your browser does not support the video tag.
            </video>
        );
    }

    // Check if it's YouTube or Vimeo embed
    if (url.includes('youtube.com/embed/') || url.includes('player.vimeo.com/video/')) {
        return (
            <iframe
                src={url}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            />
        );
    }

    // Fallback for unknown formats
    return (
        <div className="flex flex-col items-center justify-center h-full text-slate-400">
            <Video size={32} className="mb-2" />
            <p className="text-sm">Preview not available</p>
            <p className="text-xs mt-1 break-all px-4">{url}</p>
        </div>
    );
};

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

// Color palette for background
const BACKGROUND_COLORS = [
    { value: 'bg-white', color: '#ffffff', label: 'White' },
    { value: 'bg-slate-50', color: '#f8fafc', label: 'Gray' },
    { value: 'bg-blue-50', color: '#eff6ff', label: 'Blue' },
    { value: 'bg-green-50', color: '#f0fdf4', label: 'Green' },
    { value: 'bg-yellow-50', color: '#fefce8', label: 'Yellow' },
    { value: 'bg-purple-50', color: '#faf5ff', label: 'Purple' },
    { value: 'bg-pink-50', color: '#fdf2f8', label: 'Pink' },
    { value: 'bg-orange-50', color: '#fff7ed', label: 'Orange' },
    { value: 'bg-red-50', color: '#fef2f2', label: 'Red' },
    { value: 'bg-cyan-50', color: '#ecfeff', label: 'Cyan' },
    { value: 'bg-slate-100', color: '#f1f5f9', label: 'Dark Gray' },
    { value: 'bg-slate-800', color: '#1e293b', label: 'Dark' },
];

// Border radius options with visual icons
const BORDER_RADIUS_OPTIONS = [
    { value: 'rounded-none', label: 'None', icon: <div className="w-4 h-4 border border-slate-400 bg-slate-100" /> },
    { value: 'rounded', label: 'S', icon: <div className="w-4 h-4 border border-slate-400 bg-slate-100 rounded" /> },
    { value: 'rounded-lg', label: 'M', icon: <div className="w-4 h-4 border border-slate-400 bg-slate-100 rounded-lg" /> },
    { value: 'rounded-xl', label: 'L', icon: <div className="w-4 h-4 border border-slate-400 bg-slate-100 rounded-xl" /> },
    { value: 'rounded-2xl', label: 'XL', icon: <div className="w-4 h-4 border border-slate-400 bg-slate-100 rounded-2xl" /> },
    { value: 'rounded-full', label: 'Full', icon: <div className="w-4 h-4 border border-slate-400 bg-slate-100 rounded-full" /> },
];

// Simple Rich Text Editor Component
const RichTextEditor: React.FC<{
    value: string;
    onChange: (value: string) => void;
    blockId?: number;
}> = ({ value, onChange, blockId }) => {
    const editorRef = useRef<HTMLDivElement>(null);
    const isInternalChange = useRef(false);

    // Only update innerHTML when value changes from EXTERNAL source
    useEffect(() => {
        if (editorRef.current && !isInternalChange.current) {
            if (editorRef.current.innerHTML !== value) {
                editorRef.current.innerHTML = value || '<p>Start typing...</p>';
            }
        }
        isInternalChange.current = false;
    }, [value, blockId]);

    // Execute formatting command
    const execCommand = (command: string, commandValue?: string) => {
        document.execCommand(command, false, commandValue);
        editorRef.current?.focus();
        if (editorRef.current) {
            isInternalChange.current = true;
            onChange(editorRef.current.innerHTML);
        }
    };

    // Handle content changes from user input
    const handleInput = () => {
        if (editorRef.current) {
            isInternalChange.current = true;
            onChange(editorRef.current.innerHTML);
        }
    };

    // Handle keyboard shortcuts
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.ctrlKey || e.metaKey) {
            switch (e.key.toLowerCase()) {
                case 'b':
                    e.preventDefault();
                    execCommand('bold');
                    break;
                case 'i':
                    e.preventDefault();
                    execCommand('italic');
                    break;
                case 'u':
                    e.preventDefault();
                    execCommand('underline');
                    break;
            }
        }
    };

    return (
        <div className="border border-slate-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
            {/* Toolbar */}
            <div className="flex items-center gap-1 p-2 bg-slate-50 border-b border-slate-200 flex-wrap">
                {/* Heading Format */}
                <select
                    className="px-2 py-1 text-xs border border-slate-200 rounded bg-white hover:bg-slate-100 cursor-pointer"
                    onChange={(e) => execCommand('formatBlock', e.target.value)}
                    defaultValue=""
                    title="Heading"
                >
                    <option value="" disabled>Heading</option>
                    <option value="p">Normal</option>
                    <option value="h1">Heading 1</option>
                    <option value="h2">Heading 2</option>
                    <option value="h3">Heading 3</option>
                    <option value="h4">Heading 4</option>
                </select>

                {/* Font Size */}
                <select
                    className="px-2 py-1 text-xs border border-slate-200 rounded bg-white hover:bg-slate-100 cursor-pointer"
                    onChange={(e) => execCommand('fontSize', e.target.value)}
                    defaultValue="3"
                    title="Font Size"
                >
                    <option value="1">10px</option>
                    <option value="2">13px</option>
                    <option value="3">16px</option>
                    <option value="4">18px</option>
                    <option value="5">24px</option>
                    <option value="6">32px</option>
                    <option value="7">48px</option>
                </select>

                <div className="w-px h-5 bg-slate-300 mx-1" />

                <button
                    type="button"
                    onClick={() => execCommand('bold')}
                    className="p-1.5 rounded hover:bg-slate-200 transition-colors"
                    title="Bold (Ctrl+B)"
                >
                    <Bold size={16} />
                </button>
                <button
                    type="button"
                    onClick={() => execCommand('italic')}
                    className="p-1.5 rounded hover:bg-slate-200 transition-colors"
                    title="Italic (Ctrl+I)"
                >
                    <Italic size={16} />
                </button>
                <button
                    type="button"
                    onClick={() => execCommand('underline')}
                    className="p-1.5 rounded hover:bg-slate-200 transition-colors"
                    title="Underline (Ctrl+U)"
                >
                    <Underline size={16} />
                </button>

                <div className="w-px h-5 bg-slate-300 mx-1" />

                <button
                    type="button"
                    onClick={() => execCommand('insertUnorderedList')}
                    className="p-1.5 rounded hover:bg-slate-200 transition-colors"
                    title="Bullet List"
                >
                    <List size={16} />
                </button>
                <button
                    type="button"
                    onClick={() => execCommand('insertOrderedList')}
                    className="p-1.5 rounded hover:bg-slate-200 transition-colors"
                    title="Numbered List"
                >
                    <ListOrdered size={16} />
                </button>

                <div className="w-px h-5 bg-slate-300 mx-1" />

                <button
                    type="button"
                    onClick={() => execCommand('justifyLeft')}
                    className="p-1.5 rounded hover:bg-slate-200 transition-colors"
                    title="Align Left"
                >
                    <AlignLeft size={16} />
                </button>
                <button
                    type="button"
                    onClick={() => execCommand('justifyCenter')}
                    className="p-1.5 rounded hover:bg-slate-200 transition-colors"
                    title="Align Center"
                >
                    <AlignCenter size={16} />
                </button>
                <button
                    type="button"
                    onClick={() => execCommand('justifyRight')}
                    className="p-1.5 rounded hover:bg-slate-200 transition-colors"
                    title="Align Right"
                >
                    <AlignRight size={16} />
                </button>

                <div className="w-px h-5 bg-slate-300 mx-1" />

                <button
                    type="button"
                    onClick={() => {
                        const url = prompt('Enter link URL:');
                        if (url) execCommand('createLink', url);
                    }}
                    className="p-1.5 rounded hover:bg-slate-200 transition-colors"
                    title="Insert Link"
                >
                    <Link size={16} />
                </button>
                <button
                    type="button"
                    onClick={() => execCommand('formatBlock', 'blockquote')}
                    className="p-1.5 rounded hover:bg-slate-200 transition-colors"
                    title="Quote"
                >
                    <Quote size={16} />
                </button>
            </div>

            {/* Editor - NO dangerouslySetInnerHTML to avoid cursor reset */}
            <div
                ref={editorRef}
                contentEditable
                suppressContentEditableWarning
                className="min-h-[150px] p-3 text-sm focus:outline-none prose prose-sm max-w-none"
                onInput={handleInput}
                onKeyDown={handleKeyDown}
            />
        </div>
    );
};

// Color Picker Component
const ColorPicker: React.FC<{
    value: string;
    onChange: (value: string) => void;
}> = ({ value, onChange }) => {
    return (
        <div className="grid grid-cols-6 gap-2">
            {BACKGROUND_COLORS.map((color) => (
                <button
                    key={color.value}
                    onClick={() => onChange(color.value)}
                    className={`w-8 h-8 rounded-lg border-2 transition-all hover:scale-110 ${value === color.value
                        ? 'border-blue-500 ring-2 ring-blue-200'
                        : 'border-slate-200 hover:border-slate-300'
                        }`}
                    style={{ backgroundColor: color.color }}
                    title={color.label}
                />
            ))}
        </div>
    );
};

// Border Radius Picker Component
const BorderRadiusPicker: React.FC<{
    value: string;
    onChange: (value: string) => void;
}> = ({ value, onChange }) => {
    return (
        <div className="flex gap-2">
            {BORDER_RADIUS_OPTIONS.map((option) => (
                <button
                    key={option.value}
                    onClick={() => onChange(option.value)}
                    className={`p-2 rounded-lg border-2 transition-all flex flex-col items-center gap-1 ${value === option.value
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-slate-200 hover:border-slate-300'
                        }`}
                    title={option.label}
                >
                    {option.icon}
                    <span className="text-[10px] text-slate-500">{option.label}</span>
                </button>
            ))}
        </div>
    );
};

// Text Align Picker Component
const TextAlignPicker: React.FC<{
    value: string;
    onChange: (value: 'left' | 'center' | 'right') => void;
}> = ({ value, onChange }) => {
    const options = [
        { value: 'left', icon: <AlignLeft size={16} /> },
        { value: 'center', icon: <AlignCenter size={16} /> },
        { value: 'right', icon: <AlignRight size={16} /> },
    ];

    return (
        <div className="flex gap-1">
            {options.map((option) => (
                <button
                    key={option.value}
                    onClick={() => onChange(option.value as 'left' | 'center' | 'right')}
                    className={`p-2 rounded-lg border transition-all ${value === option.value
                        ? 'border-blue-500 bg-blue-50 text-blue-600'
                        : 'border-slate-200 hover:border-slate-300 text-slate-500'
                        }`}
                >
                    {option.icon}
                </button>
            ))}
        </div>
    );
};

export const PropertyPanel: React.FC<PropertyPanelProps> = ({ block, onUpdate, onClose }) => {
    if (!block) return null;

    // Local state for form
    const [content, setContent] = useState(block.content);
    const [settings, setSettings] = useState(block.settings);

    // Reset when block changes
    useEffect(() => {
        setContent(block.content);
        setSettings(block.settings);
    }, [block.id]);

    // AUTO-APPLY: Update parent whenever content or settings change
    useEffect(() => {
        const timer = setTimeout(() => {
            onUpdate({ content, settings });
        }, 300); // Debounce 300ms
        return () => clearTimeout(timer);
    }, [content, settings]);

    return (
        <div className="h-full flex flex-col">
            {/* Header */}
            <div className="p-4 border-b border-slate-200 bg-white">
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                        {BLOCK_ICONS[block.type]}
                        <h3 className="font-bold text-slate-800 capitalize">{block.type} Block</h3>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1 text-slate-400 hover:text-slate-600 rounded"
                    >
                        <X size={18} />
                    </button>
                </div>
                <p className="text-xs text-slate-500">
                    ID: {block.id} • Slot: {block.slot_id}
                </p>
            </div>

            {/* Content Editor */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">

                {/* TEXT BLOCK - Formatting Toolbar (content edited inline on canvas) */}
                {block.type === 'text' && (
                    <div className="space-y-4">
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                            <p className="text-sm text-blue-700">
                                ✏️ Edit content directly on the canvas. Use the tools below to format selected text.
                            </p>
                        </div>

                        {/* Formatting Toolbar */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Text Formatting</label>
                            <div className="flex flex-wrap gap-1 p-2 bg-slate-50 border border-slate-200 rounded-lg">
                                {/* Heading Format */}
                                <select
                                    className="px-2 py-1.5 text-xs border border-slate-200 rounded bg-white hover:bg-slate-100 cursor-pointer"
                                    onChange={(e) => {
                                        document.execCommand('formatBlock', false, e.target.value);
                                    }}
                                    defaultValue=""
                                >
                                    <option value="" disabled>Heading</option>
                                    <option value="p">Normal</option>
                                    <option value="h1">H1</option>
                                    <option value="h2">H2</option>
                                    <option value="h3">H3</option>
                                    <option value="h4">H4</option>
                                </select>

                                {/* Font Size */}
                                <select
                                    className="px-2 py-1.5 text-xs border border-slate-200 rounded bg-white hover:bg-slate-100 cursor-pointer"
                                    onChange={(e) => {
                                        document.execCommand('fontSize', false, e.target.value);
                                    }}
                                    defaultValue="3"
                                >
                                    <option value="1">10px</option>
                                    <option value="2">13px</option>
                                    <option value="3">16px</option>
                                    <option value="4">18px</option>
                                    <option value="5">24px</option>
                                    <option value="6">32px</option>
                                    <option value="7">48px</option>
                                </select>

                                <div className="w-px h-6 bg-slate-300 mx-1" />

                                <button
                                    type="button"
                                    onClick={() => document.execCommand('bold')}
                                    className="p-1.5 rounded hover:bg-slate-200 transition-colors"
                                    title="Bold (Ctrl+B)"
                                >
                                    <Bold size={16} />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => document.execCommand('italic')}
                                    className="p-1.5 rounded hover:bg-slate-200 transition-colors"
                                    title="Italic (Ctrl+I)"
                                >
                                    <Italic size={16} />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => document.execCommand('underline')}
                                    className="p-1.5 rounded hover:bg-slate-200 transition-colors"
                                    title="Underline (Ctrl+U)"
                                >
                                    <Underline size={16} />
                                </button>

                                <div className="w-px h-6 bg-slate-300 mx-1" />

                                <button
                                    type="button"
                                    onClick={() => document.execCommand('insertUnorderedList')}
                                    className="p-1.5 rounded hover:bg-slate-200 transition-colors"
                                    title="Bullet List"
                                >
                                    <List size={16} />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => document.execCommand('insertOrderedList')}
                                    className="p-1.5 rounded hover:bg-slate-200 transition-colors"
                                    title="Numbered List"
                                >
                                    <ListOrdered size={16} />
                                </button>

                                <div className="w-px h-6 bg-slate-300 mx-1" />

                                <button
                                    type="button"
                                    onClick={() => document.execCommand('justifyLeft')}
                                    className="p-1.5 rounded hover:bg-slate-200 transition-colors"
                                    title="Align Left"
                                >
                                    <AlignLeft size={16} />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => document.execCommand('justifyCenter')}
                                    className="p-1.5 rounded hover:bg-slate-200 transition-colors"
                                    title="Align Center"
                                >
                                    <AlignCenter size={16} />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => document.execCommand('justifyRight')}
                                    className="p-1.5 rounded hover:bg-slate-200 transition-colors"
                                    title="Align Right"
                                >
                                    <AlignRight size={16} />
                                </button>

                                <div className="w-px h-6 bg-slate-300 mx-1" />

                                <button
                                    type="button"
                                    onClick={() => {
                                        const url = prompt('Enter link URL:');
                                        if (url) document.execCommand('createLink', false, url);
                                    }}
                                    className="p-1.5 rounded hover:bg-slate-200 transition-colors"
                                    title="Insert Link"
                                >
                                    <Link size={16} />
                                </button>
                            </div>
                        </div>

                        <p className="text-xs text-slate-400">
                            💡 Select text on canvas first, then click a formatting button
                        </p>
                    </div>
                )}

                {/* VIDEO BLOCK */}
                {block.type === 'video' && (
                    <div className="space-y-4">
                        {/* Show current video source type */}
                        {content.url && (
                            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Video size={16} className="text-blue-600" />
                                        <span className="text-sm font-medium text-blue-900">
                                            {content.url.startsWith('blob:') || content.url.includes('localhost:3001') || content.url.includes('/uploads/')
                                                ? '📁 Uploaded File'
                                                : content.url.includes('youtube.com') || content.url.includes('youtu.be')
                                                    ? '🎬 YouTube Video'
                                                    : content.url.includes('vimeo.com')
                                                        ? '🎬 Vimeo Video'
                                                        : '🔗 External Link'
                                            }
                                        </span>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setContent({ ...content, url: '', filename: '' });
                                        }}
                                        className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                                    >
                                        Change Source
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* File Upload Section - Only show if no URL */}
                        {!content.url && (
                            <>
                                <FileUploader
                                    accept="video/*"
                                    label="Upload Video from Device"
                                    hint="Drag and drop your video file here, or click to browse"
                                    maxSize={500}
                                    onUploadSuccess={(data) => {
                                        setContent({ ...content, url: data.url, filename: data.filename });
                                    }}
                                />

                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-slate-300"></div>
                                    </div>
                                    <div className="relative flex justify-center text-xs">
                                        <span className="px-2 bg-white text-slate-500">OR</span>
                                    </div>
                                </div>
                            </>
                        )}

                        {/* URL Input Section - Only show if no URL */}
                        {!content.url && (
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Video URL (YouTube, Vimeo, or Direct Link)
                                </label>
                                <input
                                    type="text"
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    value={content.url || ''}
                                    onChange={(e) => {
                                        const url = e.target.value;
                                        if (url) {
                                            // Auto-convert YouTube URLs to embed format
                                            const convertedUrl = convertToEmbedUrl(url);
                                            setContent({ ...content, url: convertedUrl, filename: '' });
                                        } else {
                                            setContent({ ...content, url: '', filename: '' });
                                        }
                                    }}
                                    placeholder="Paste YouTube, Vimeo, or direct video URL"
                                />
                                <p className="text-xs text-slate-500 mt-1">
                                    Supports: YouTube (any format), Vimeo, direct MP4/WebM links
                                </p>
                            </div>
                        )}

                        {/* Video Preview - Show when URL exists */}
                        {content.url && (
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-slate-700">Preview</label>
                                <div className="aspect-video bg-slate-900 rounded-lg overflow-hidden">
                                    {renderVideoPreview(content.url)}
                                </div>
                                {content.filename && (
                                    <p className="text-xs text-slate-600">
                                        📄 {content.filename}
                                    </p>
                                )}
                            </div>
                        )}

                        {/* Video Settings */}
                        <div className="pt-4 border-t border-slate-200">
                            <h4 className="text-sm font-medium text-slate-700 mb-3">Video Settings</h4>
                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        id="autoplay"
                                        checked={settings.autoplay || false}
                                        onChange={(e) => setSettings({ ...settings, autoplay: e.target.checked })}
                                        className="rounded text-blue-600 focus:ring-blue-500"
                                    />
                                    <label htmlFor="autoplay" className="text-sm text-slate-700">Autoplay</label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        id="showControls"
                                        checked={settings.showControls !== false}
                                        onChange={(e) => setSettings({ ...settings, showControls: e.target.checked })}
                                        className="rounded text-blue-600 focus:ring-blue-500"
                                    />
                                    <label htmlFor="showControls" className="text-sm text-slate-700">Show Controls</label>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* IMAGE BLOCK */}
                {block.type === 'image' && (
                    <>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Image URL</label>
                            <input
                                type="url"
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                value={content.url || ''}
                                onChange={(e) => setContent({ ...content, url: e.target.value })}
                                placeholder="https://example.com/image.jpg"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Alt Text</label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                value={settings.alt_text || ''}
                                onChange={(e) => setSettings({ ...settings, alt_text: e.target.value })}
                                placeholder="Describe the image..."
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Caption</label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                value={content.caption || ''}
                                onChange={(e) => setContent({ ...content, caption: e.target.value })}
                                placeholder="Optional image caption"
                            />
                        </div>
                    </>
                )}

                {/* QUIZ BLOCK */}
                {block.type === 'quiz' && (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Question</label>
                            <textarea
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                rows={3}
                                value={content.question || ''}
                                onChange={(e) => setContent({ ...content, question: e.target.value })}
                                placeholder="Enter your question..."
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Question Type</label>
                            <select
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                                value={content.question_type || 'multiple-choice'}
                                onChange={(e) => setContent({ ...content, question_type: e.target.value })}
                            >
                                <option value="multiple-choice">Multiple Choice</option>
                                <option value="text-answer">Text Answer</option>
                                <option value="true-false">True/False</option>
                            </select>
                        </div>

                        {/* Options for multiple choice */}
                        {(content.question_type === 'multiple-choice' || !content.question_type) && (
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Answer Options</label>
                                <div className="space-y-2">
                                    {(content.options || ['Option 1', 'Option 2']).map((opt: string, idx: number) => (
                                        <div key={idx} className="flex items-center gap-2">
                                            <input
                                                type="radio"
                                                name="correct_answer"
                                                checked={content.correct_answer === idx}
                                                onChange={() => setContent({ ...content, correct_answer: idx })}
                                                className="text-green-600"
                                            />
                                            <input
                                                type="text"
                                                className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm"
                                                value={opt}
                                                onChange={(e) => {
                                                    const newOptions = [...(content.options || [])];
                                                    newOptions[idx] = e.target.value;
                                                    setContent({ ...content, options: newOptions });
                                                }}
                                            />
                                            <button
                                                onClick={() => {
                                                    const newOptions = (content.options || []).filter((_: any, i: number) => i !== idx);
                                                    setContent({ ...content, options: newOptions });
                                                }}
                                                className="p-1.5 text-red-500 hover:bg-red-50 rounded"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        onClick={() => setContent({
                                            ...content,
                                            options: [...(content.options || []), `Option ${(content.options?.length || 0) + 1}`]
                                        })}
                                        className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
                                    >
                                        <Plus size={14} /> Add Option
                                    </button>
                                </div>
                                <p className="text-xs text-slate-400 mt-2">Select the radio button for the correct answer</p>
                            </div>
                        )}
                    </div>
                )}

                {/* IDE BLOCK */}
                {block.type === 'ide' && (
                    <>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Language</label>
                            <select
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                                value={settings.language || 'javascript'}
                                onChange={(e) => setSettings({ ...settings, language: e.target.value })}
                            >
                                <option value="javascript">JavaScript</option>
                                <option value="typescript">TypeScript</option>
                                <option value="python">Python</option>
                                <option value="java">Java</option>
                                <option value="csharp">C#</option>
                                <option value="cpp">C++</option>
                                <option value="html">HTML</option>
                                <option value="css">CSS</option>
                                <option value="sql">SQL</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Code</label>
                            <textarea
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono resize-none bg-slate-900 text-slate-100 focus:ring-2 focus:ring-blue-500"
                                rows={10}
                                value={content.code || ''}
                                onChange={(e) => setContent({ ...content, code: e.target.value })}
                                placeholder="// Your code here..."
                            />
                        </div>
                    </>
                )}

                {/* DOCUMENT BLOCK */}
                {block.type === 'document' && (
                    <div className="space-y-4">
                        <FileUploader
                            accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.txt"
                            label="Upload Document"
                            hint="Drag and drop your document here, or click to browse"
                            maxSize={100}
                            onUploadSuccess={(data) => {
                                setContent({
                                    ...content,
                                    url: data.url,
                                    filename: data.filename,
                                    title: content.title || data.filename
                                });
                            }}
                        />

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-slate-300"></div>
                            </div>
                            <div className="relative flex justify-center text-xs">
                                <span className="px-2 bg-white text-slate-500">OR</span>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Document URL</label>
                            <input
                                type="url"
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                                value={content.url || ''}
                                onChange={(e) => setContent({ ...content, url: e.target.value })}
                                placeholder="https://example.com/document.pdf"
                            />
                        </div>

                        {content.url && (
                            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                                <p className="text-xs text-green-700 font-medium">✓ Document loaded</p>
                                {content.filename && (
                                    <p className="text-xs text-green-600 mt-1">{content.filename}</p>
                                )}
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Document Title</label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                                value={content.title || ''}
                                onChange={(e) => setContent({ ...content, title: e.target.value })}
                                placeholder="Document name"
                            />
                        </div>
                    </div>
                )}

                {/* EMBED BLOCK */}
                {block.type === 'embed' && (
                    <>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Embed URL</label>
                            <input
                                type="url"
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                                value={content.url || ''}
                                onChange={(e) => setContent({ ...content, url: e.target.value })}
                                placeholder="https://example.com/embed"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Height (px)</label>
                            <input
                                type="number"
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                                value={settings.height || 400}
                                onChange={(e) => setSettings({ ...settings, height: e.target.value })}
                            />
                        </div>
                    </>
                )}

                {/* QUESTION-SLOT BLOCK */}
                {block.type === 'question-slot' && (
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <p className="text-sm text-blue-700">
                            This block links to questions from the Question Bank. Configure in Question Bank settings.
                        </p>
                    </div>
                )}

                {/* SMART-FILE BLOCK */}
                {block.type === 'smart-file' && (
                    <div className="space-y-4">
                        <FileUploader
                            accept="*/*"
                            label="Upload File"
                            hint="Drag and drop any file here, or click to browse"
                            maxSize={500}
                            onUploadSuccess={(data) => {
                                setContent({ ...content, url: data.url, filename: data.filename });
                            }}
                        />

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-slate-300"></div>
                            </div>
                            <div className="relative flex justify-center text-xs">
                                <span className="px-2 bg-white text-slate-500">OR</span>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">File URL</label>
                            <input
                                type="url"
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                                value={content.url || ''}
                                onChange={(e) => setContent({ ...content, url: e.target.value })}
                                placeholder="https://example.com/file.pdf"
                            />
                        </div>

                        {content.url && (
                            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                                <p className="text-xs text-green-700 font-medium">✓ File loaded</p>
                                {content.filename && (
                                    <p className="text-xs text-green-600 mt-1">{content.filename}</p>
                                )}
                            </div>
                        )}
                    </div>
                )}

                {/* VISUAL SETTINGS - All Blocks */}
                <div className="pt-4 border-t border-slate-200">
                    <h4 className="text-sm font-bold text-slate-700 mb-4">Visual Settings</h4>

                    <div className="space-y-4">
                        {/* Background Color - Color Picker */}
                        <div>
                            <label className="block text-xs font-medium text-slate-600 mb-2">Background Color</label>
                            <ColorPicker
                                value={settings.background_color || 'bg-white'}
                                onChange={(value) => setSettings({ ...settings, background_color: value })}
                            />
                        </div>

                        {/* Border Radius - Visual Icons */}
                        <div>
                            <label className="block text-xs font-medium text-slate-600 mb-2">Border Radius</label>
                            <BorderRadiusPicker
                                value={settings.border_radius || 'rounded-xl'}
                                onChange={(value) => setSettings({ ...settings, border_radius: value })}
                            />
                        </div>

                        {/* Text Align - Icon Buttons */}
                        <div>
                            <label className="block text-xs font-medium text-slate-600 mb-2">Text Align</label>
                            <TextAlignPicker
                                value={settings.text_align || 'left'}
                                onChange={(value) => setSettings({ ...settings, text_align: value })}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer - Auto-save indicator */}
            <div className="p-4 border-t border-slate-200 bg-green-50">
                <p className="text-xs text-green-700 text-center">
                    ✓ Changes are applied automatically
                </p>
            </div>
        </div>
    );
};
