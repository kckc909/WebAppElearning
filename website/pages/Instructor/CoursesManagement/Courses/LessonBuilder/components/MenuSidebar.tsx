import React, { useState } from 'react';
import { useDraggable } from '@dnd-kit/core';
import {
    Layout, Sparkles, Settings, ChevronDown, Plus,
    Wand2, Lightbulb, FileText, Target, Box,
    Type, Video, Code, CheckSquare, Activity, Globe,
    AlignLeft, Columns, HelpCircle, AlertCircle, Rows, UploadCloud, BookTemplate, Bot, Upload, Layers, Trash2
} from 'lucide-react';
import { CourseData, Lesson, ContentBlock } from '../../../../../../types/lesson-builder';

interface MenuSidebarProps {
    courseData: CourseData;
    activeLessonId: string | null;
    currentLayoutType?: string; // Current layout from actual data
    templates: Record<string, any>; // Received from parent
    onSelectLesson: (id: string) => void;
    onSelectSection: (id: string) => void;
    onAddSection: () => void;
    onAddLesson: (sectionId: string) => void;
    onUpdateLesson: (updates: Partial<Lesson>) => void;
    onApplyTemplate: (templateKey: string) => void;
    onCreateTemplate: (name: string) => void;
    onDeleteTemplate: (key: string) => void;
    onAIGenerate: (scope: 'lesson' | 'section' | 'course', prompt: string, files: File[]) => void;
}

type MenuTab = 'structure' | 'layout' | 'templates' | 'blocks' | 'ai';

const BLOCK_TYPES = [
    { type: 'smart-file', label: 'Tải lên thông minh', icon: <UploadCloud size={18} />, description: 'Tự nhận diện Video, Ảnh, PDF' },
    { type: 'text', label: 'Văn bản', icon: <Type size={18} />, description: 'Giải thích' },
    { type: 'video', label: 'Video', icon: <Video size={18} />, description: 'Tải lên / Nhúng' },
    { type: 'question-slot', label: 'Câu hỏi', icon: <HelpCircle size={18} />, description: 'Liên kết ngân hàng câu hỏi' },
    { type: 'ide', label: 'Code Editor', icon: <Code size={18} />, description: 'IDE tương tác' },
    { type: 'document', label: 'Tài liệu', icon: <FileText size={18} />, description: 'PDF / Slides' },
    { type: 'quiz', label: 'Trắc nghiệm', icon: <CheckSquare size={18} />, description: 'Kiểm tra nhanh' },
    { type: 'practice', label: 'Thực hành', icon: <Activity size={18} />, description: 'Nộp bài' },
    { type: 'embed', label: 'Nhúng', icon: <Globe size={18} />, description: 'Công cụ ngoài' },
];

export const MenuSidebar: React.FC<MenuSidebarProps> = ({
    courseData, activeLessonId, currentLayoutType, templates,
    onSelectLesson, onSelectSection, onAddSection, onAddLesson, onUpdateLesson,
    onApplyTemplate, onCreateTemplate, onDeleteTemplate, onAIGenerate
}) => {
    const [activeTab, setActiveTab] = useState<MenuTab>('structure');
    const [newTemplateName, setNewTemplateName] = useState('');
    const [isCreatingTemplate, setIsCreatingTemplate] = useState(false);
    const [expandedSections, setExpandedSections] = useState<string[]>(
        courseData.sections.map(s => s.id) // All sections expanded by default
    );

    // AI State
    const [aiScope, setAiScope] = useState<'lesson' | 'section' | 'course'>('lesson');
    const [aiPrompt, setAiPrompt] = useState('');
    const [aiFiles, setAiFiles] = useState<File[]>([]);
    const [isGenerating, setIsGenerating] = useState(false);

    const activeLesson = courseData.sections
        .flatMap(s => s.lessons)
        .find(l => l.id === activeLessonId);

    const toggleSection = (sectionId: string) => {
        setExpandedSections(prev =>
            prev.includes(sectionId)
                ? prev.filter(id => id !== sectionId)
                : [...prev, sectionId]
        );
    };

    const handleGenerate = () => {
        setIsGenerating(true);
        // Simulate API delay
        setTimeout(() => {
            onAIGenerate(aiScope, aiPrompt, aiFiles);
            setIsGenerating(false);
            setAiPrompt('');
            setAiFiles([]);
        }, 2000);
    };

    const handleSaveTemplate = () => {
        if (newTemplateName.trim()) {
            onCreateTemplate(newTemplateName);
            setNewTemplateName('');
            setIsCreatingTemplate(false);
        }
    };

    return (
        <div className="flex h-full border-r border-slate-200 bg-white">
            {/* Icon Rail */}
            <div className="w-16 flex flex-col items-center py-4 gap-4 bg-slate-50 border-r border-slate-200 z-20">
                <NavIcon
                    icon={<Layout size={20} />}
                    isActive={activeTab === 'structure'}
                    onClick={() => setActiveTab('structure')}
                    label="Cấu trúc khóa học"
                />
                <NavIcon
                    icon={<BookTemplate size={20} />}
                    isActive={activeTab === 'templates'}
                    onClick={() => setActiveTab('templates')}
                    label="Mẫu"
                />
                <NavIcon
                    icon={<Columns size={20} />}
                    isActive={activeTab === 'layout'}
                    onClick={() => setActiveTab('layout')}
                    label="Bố cục bài học"
                />
                <NavIcon
                    icon={<Box size={20} />}
                    isActive={activeTab === 'blocks'}
                    onClick={() => setActiveTab('blocks')}
                    label="Khối nội dung"
                />
                <NavIcon
                    icon={<Sparkles size={20} />}
                    isActive={activeTab === 'ai'}
                    onClick={() => setActiveTab('ai')}
                    label="Trợ lý AI"
                />
            </div>

            {/* Panel Content */}
            <div className="w-72 flex flex-col bg-white">

                {/* --- STRUCTURE TAB --- */}
                {activeTab === 'structure' && (
                    <div className="flex-1 flex flex-col overflow-hidden">
                        <div className="p-4 border-b border-slate-100 bg-white">
                            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Cấu trúc khóa học</h2>
                        </div>
                        <div className="flex-1 overflow-y-auto p-2 space-y-4">
                            {courseData.sections.map(section => {
                                const isExpanded = expandedSections.includes(section.id);
                                return (
                                    <div key={section.id}>
                                        <div
                                            onClick={() => toggleSection(section.id)}
                                            className="flex items-center justify-between group px-2 py-1 mb-1 hover:bg-slate-100 rounded cursor-pointer"
                                        >
                                            <div className="flex items-center gap-1 text-slate-700 font-semibold text-sm">
                                                <ChevronDown
                                                    size={16}
                                                    className={`transition-transform ${isExpanded ? '' : '-rotate-90'}`}
                                                />
                                                {section.title}
                                            </div>
                                            <button
                                                onClick={(e) => { e.stopPropagation(); onSelectSection(section.id); }}
                                                className="text-slate-400 hover:text-blue-600 opacity-0 group-hover:opacity-100 transition-all p-1"
                                                title="Cài đặt chương"
                                            >
                                                <Settings size={16} />
                                            </button>
                                        </div>
                                        {isExpanded && (
                                            <div className="ml-2 pl-2 border-l border-slate-200 space-y-1">
                                                {section.lessons.map(lesson => (
                                                    <button
                                                        key={lesson.id}
                                                        onClick={() => onSelectLesson(lesson.id)}
                                                        className={`w-full text-left px-2 py-1.5 rounded text-sm flex items-center gap-2 ${activeLessonId === lesson.id
                                                            ? 'bg-blue-50 text-blue-700 font-medium'
                                                            : 'text-slate-600 hover:bg-slate-50'
                                                            }`}
                                                    >
                                                        <span className={`truncate ${!lesson.title ? 'text-slate-400 italic' : ''}`}>
                                                            {lesson.title || '(Chưa đặt tên)'}
                                                        </span>
                                                    </button>
                                                ))}
                                                <button
                                                    onClick={() => onAddLesson(section.id)}
                                                    className="w-full text-left px-2 py-1 text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors"
                                                >
                                                    <Plus size={12} /> Thêm bài học
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                            <button
                                onClick={onAddSection}
                                className="w-full py-2 text-sm text-slate-500 border border-dashed border-slate-300 rounded hover:bg-slate-50 mt-2 transition-colors"
                            >
                                + Thêm chương
                            </button>
                        </div>
                    </div>
                )}

                {/* --- TEMPLATES TAB --- */}
                {activeTab === 'templates' && (
                    <div className="flex-1 flex flex-col overflow-hidden">
                        <div className="p-4 border-b border-slate-100 bg-white">
                            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Mẫu bài học</h2>
                            <p className="text-xs text-slate-400 mt-1">Áp dụng hoặc tạo mới</p>
                        </div>

                        {/* List of Templates */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-3">
                            {activeLesson ? (
                                <>
                                    {Object.entries(templates).map(([key, tmpl]: any) => (
                                        <TemplateCard
                                            key={key}
                                            title={tmpl.title || key}
                                            description={`${tmpl.layout} layout • ${Object.values(tmpl.content).flat().length} blocks`}
                                            icon={<Layout size={16} />}
                                            onClick={() => onApplyTemplate(key)}
                                            onDelete={() => {
                                                if (window.confirm('Xóa template này?')) onDeleteTemplate(key);
                                            }}
                                        />
                                    ))}

                                    <div className="mt-4 pt-4 border-t border-slate-100">
                                        {!isCreatingTemplate ? (
                                            <button
                                                onClick={() => setIsCreatingTemplate(true)}
                                                className="w-full py-2 flex items-center justify-center gap-2 text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors border border-blue-200"
                                            >
                                                <Plus size={14} /> Lưu làm Template
                                            </button>
                                        ) : (
                                            <div className="bg-slate-50 p-3 rounded-lg border border-blue-200">
                                                <label className="text-xs font-bold text-slate-500 mb-1 block">Tên template</label>
                                                <input
                                                    autoFocus
                                                    className="w-full px-2 py-1 text-sm border border-slate-300 rounded mb-2 focus:border-blue-500 outline-none"
                                                    value={newTemplateName}
                                                    onChange={(e) => setNewTemplateName(e.target.value)}
                                                    placeholder="VD: Bố cục tùy chỉnh"
                                                />
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={handleSaveTemplate}
                                                        disabled={!newTemplateName.trim()}
                                                        className="flex-1 bg-blue-600 text-white text-xs py-1.5 rounded font-medium hover:bg-blue-700 disabled:opacity-50"
                                                    >
                                                        Lưu
                                                    </button>
                                                    <button
                                                        onClick={() => setIsCreatingTemplate(false)}
                                                        className="flex-1 bg-white border border-slate-300 text-slate-600 text-xs py-1.5 rounded font-medium hover:bg-slate-50"
                                                    >
                                                        Hủy
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </>
                            ) : (
                                <div className="text-center text-slate-400 text-sm mt-10">Chọn bài học để quản lý template.</div>
                            )}
                        </div>
                    </div>
                )}

                {/* --- LAYOUT TAB --- */}
                {activeTab === 'layout' && (
                    <div className="flex-1 flex flex-col overflow-hidden">
                        <div className="p-4 border-b border-slate-100 bg-white">
                            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Bố cục bài học</h2>
                        </div>
                        <div className="p-4 overflow-y-auto">
                            {activeLesson ? (
                                <div className="space-y-3">
                                    <p className="text-xs text-slate-500 mb-3">Chọn cách bố trí các vùng nội dung cho bài học này.</p>

                                    {/* Single Column */}
                                    <LayoutOption
                                        label="Cột đơn"
                                        icon={
                                            <div className="w-8 h-6 bg-blue-100 rounded flex items-center justify-center">
                                                <div className="w-6 h-4 bg-blue-400 rounded-sm" />
                                            </div>
                                        }
                                        selected={(currentLayoutType || activeLesson?.layout) === 'single'}
                                        onClick={() => onUpdateLesson({ layout: 'single' })}
                                        desc="Bố cục dọc chuẩn. Phù hợp cho bài tập trung đọc."
                                    />

                                    {/* Split View 50-50 */}
                                    <LayoutOption
                                        label="Chia đôi"
                                        icon={
                                            <div className="w-8 h-6 bg-blue-100 rounded flex gap-0.5 items-center justify-center p-0.5">
                                                <div className="w-3 h-4 bg-blue-400 rounded-sm" />
                                                <div className="w-3 h-4 bg-blue-400 rounded-sm" />
                                            </div>
                                        }
                                        selected={(currentLayoutType || activeLesson?.layout) === 'split'}
                                        onClick={() => onUpdateLesson({ layout: 'split' })}
                                        desc="Hai cột bằng nhau. Phù hợp Video + Ghi chú."
                                    />

                                    {/* Sidebar Left */}
                                    <LayoutOption
                                        label="Sidebar trái"
                                        icon={
                                            <div className="w-8 h-6 bg-blue-100 rounded flex gap-0.5 items-center justify-center p-0.5">
                                                <div className="w-2 h-4 bg-blue-300 rounded-sm" />
                                                <div className="w-4 h-4 bg-blue-400 rounded-sm" />
                                            </div>
                                        }
                                        selected={(currentLayoutType || activeLesson?.layout) === 'sidebar-left'}
                                        onClick={() => onUpdateLesson({ layout: 'sidebar-left' })}
                                        desc="Thanh hẹp bên trái, nội dung chính bên phải."
                                    />

                                    {/* Sidebar Right */}
                                    <LayoutOption
                                        label="Sidebar phải"
                                        icon={
                                            <div className="w-8 h-6 bg-blue-100 rounded flex gap-0.5 items-center justify-center p-0.5">
                                                <div className="w-4 h-4 bg-blue-400 rounded-sm" />
                                                <div className="w-2 h-4 bg-blue-300 rounded-sm" />
                                            </div>
                                        }
                                        selected={(currentLayoutType || activeLesson?.layout) === 'sidebar-right'}
                                        onClick={() => onUpdateLesson({ layout: 'sidebar-right' })}
                                        desc="Nội dung chính với thanh ghi chú bên phải."
                                    />

                                    {/* Grid 2x2 */}
                                    <LayoutOption
                                        label="Lưới"
                                        icon={
                                            <div className="w-8 h-6 bg-blue-100 rounded grid grid-cols-2 gap-0.5 p-0.5">
                                                <div className="bg-blue-400 rounded-sm" />
                                                <div className="bg-blue-400 rounded-sm" />
                                                <div className="bg-blue-400 rounded-sm" />
                                                <div className="bg-blue-400 rounded-sm" />
                                            </div>
                                        }
                                        selected={(currentLayoutType || activeLesson?.layout) === 'grid'}
                                        onClick={() => onUpdateLesson({ layout: 'grid' })}
                                        desc="Bốn ô bằng nhau. Tuyệt vời cho dashboard."
                                    />

                                    {/* Stacked - Hero + Content */}
                                    <LayoutOption
                                        label="Xếp chồng"
                                        icon={
                                            <div className="w-8 h-6 bg-blue-100 rounded flex flex-col gap-0.5 p-0.5">
                                                <div className="h-2 bg-blue-400 rounded-sm" />
                                                <div className="flex-1 bg-blue-300 rounded-sm" />
                                            </div>
                                        }
                                        selected={(currentLayoutType || activeLesson?.layout) === 'stacked'}
                                        onClick={() => onUpdateLesson({ layout: 'stacked' })}
                                        desc="Vùng lớn ở trên, nội dung ở dưới. Phù hợp video."
                                    />

                                    {/* Focus Mode - Centered */}
                                    <LayoutOption
                                        label="Tập trung"
                                        icon={
                                            <div className="w-8 h-6 bg-blue-100 rounded flex items-center justify-center">
                                                <div className="w-4 h-4 bg-blue-400 rounded-sm" />
                                            </div>
                                        }
                                        selected={(currentLayoutType || activeLesson?.layout) === 'focus'}
                                        onClick={() => onUpdateLesson({ layout: 'focus' })}
                                        desc="Nội dung căn giữa. Phù hợp đọc và kiểm tra."
                                    />

                                    <div className="mt-4 p-3 bg-blue-50 rounded-lg text-xs text-blue-700 border border-blue-100">
                                        <AlertCircle size={14} className="inline mr-1 mb-0.5" />
                                        Đổi bố cục sẽ giữ nội dung nhưng có thể di chuyển blocks sang vùng khác.
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center text-slate-400 text-sm mt-10">Vui lòng chọn bài học trước.</div>
                            )}
                        </div>
                    </div>
                )}

                {/* --- BLOCKS TAB --- */}
                {activeTab === 'blocks' && (
                    <div className="flex-1 flex flex-col overflow-hidden bg-slate-50/50">
                        <div className="p-4 border-b border-slate-200 bg-white">
                            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Khối nội dung</h2>
                            <p className="text-xs text-slate-400 mt-1">Kéo thả vào bố cục</p>
                        </div>
                        <div className="flex-1 overflow-y-auto p-3 space-y-3">
                            {BLOCK_TYPES.map((item) => (
                                <DraggableSidebarItem key={item.type} item={item} />
                            ))}
                        </div>
                    </div>
                )}

                {/* --- AI TAB --- */}
                {activeTab === 'ai' && (
                    <div className="flex-1 flex flex-col overflow-hidden bg-indigo-50/30">
                        <div className="p-4 border-b border-indigo-100 bg-white">
                            <h2 className="text-xs font-bold text-indigo-900 uppercase tracking-wider flex items-center gap-2">
                                <Sparkles size={14} className="text-indigo-500" />
                                Trợ lý AI
                            </h2>
                        </div>
                        <div className="p-4 space-y-5 overflow-y-auto">

                            {/* 1. Scope Selection */}
                            <div>
                                <label className="text-xs font-semibold text-slate-600 mb-2 block flex items-center gap-1">
                                    <Target size={12} /> Phạm vi tạo
                                </label>
                                <div className="flex bg-slate-200 p-1 rounded-lg">
                                    {['lesson', 'section', 'course'].map(scope => (
                                        <button
                                            key={scope}
                                            onClick={() => setAiScope(scope as any)}
                                            className={`flex-1 py-1.5 text-xs font-medium rounded-md capitalize transition-all ${aiScope === scope ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                                                }`}
                                        >
                                            {scope}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* 2. Prompt Input */}
                            <div>
                                <label className="text-xs font-semibold text-slate-600 mb-2 block flex items-center gap-1">
                                    <Bot size={12} /> Mô tả
                                </label>
                                <textarea
                                    value={aiPrompt}
                                    onChange={(e) => setAiPrompt(e.target.value)}
                                    className="w-full h-24 p-3 text-sm border border-slate-300 rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none resize-none shadow-sm"
                                    placeholder={`Mô tả ${aiScope} bạn muốn tạo...`}
                                />
                            </div>

                            {/* 3. File Upload (Context) */}
                            <div>
                                <label className="text-xs font-semibold text-slate-600 mb-2 block flex items-center gap-1">
                                    <Upload size={12} /> Tài liệu tham khảo (Tùy chọn)
                                </label>
                                <div className="border border-dashed border-slate-300 rounded-xl bg-white p-3 hover:bg-slate-50 transition-colors relative">
                                    <input
                                        type="file"
                                        multiple
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        onChange={(e) => {
                                            if (e.target.files) setAiFiles(Array.from(e.target.files));
                                        }}
                                    />
                                    <div className="flex flex-col items-center justify-center gap-1 text-slate-400">
                                        <UploadCloud size={20} />
                                        <span className="text-[10px]">Tải lên PDF, Ảnh, Tài liệu</span>
                                    </div>
                                </div>
                                {aiFiles.length > 0 && (
                                    <div className="mt-2 space-y-1">
                                        {aiFiles.map((f, i) => (
                                            <div key={i} className="text-[10px] bg-white border border-slate-200 px-2 py-1 rounded flex items-center justify-between text-slate-600">
                                                <span className="truncate max-w-[150px]">{f.name}</span>
                                                <button onClick={() => setAiFiles(files => files.filter((_, idx) => idx !== i))} className="hover:text-red-500">×</button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* 4. Action */}
                            <button
                                onClick={handleGenerate}
                                disabled={!aiPrompt.trim() || isGenerating}
                                className={`w-full py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg ${(!aiPrompt.trim() || isGenerating) ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[1.02]'
                                    }`}
                            >
                                {isGenerating ? (
                                    <>
                                        <Wand2 size={14} className="animate-spin" /> Đang tạo...
                                    </>
                                ) : (
                                    <>
                                        <Wand2 size={14} /> Tạo {aiScope}
                                    </>
                                )}
                            </button>

                            {isGenerating && (
                                <div className="text-[10px] text-center text-indigo-400 animate-pulse">
                                    Đang phân tích và cấu trúc nội dung...
                                </div>
                            )}

                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

// --- Sub-components ---

const TemplateCard = ({ title, description, icon, onClick, onDelete }: any) => (
    <div
        onClick={onClick}
        className="bg-white border border-slate-200 rounded-lg p-3 hover:border-blue-400 hover:shadow-md transition-all cursor-pointer group relative"
    >
        <div className="flex items-center gap-2 mb-1 text-slate-700 group-hover:text-blue-600">
            <div className="p-1 bg-slate-100 rounded group-hover:bg-blue-50 transition-colors">
                {icon}
            </div>
            <span className="font-semibold text-sm">{title}</span>
        </div>
        <p className="text-xs text-slate-400 leading-tight pr-6">{description}</p>

        <button
            onClick={(e) => {
                e.stopPropagation();
                onDelete();
            }}
            className="absolute top-2 right-2 p-1 text-slate-300 hover:bg-red-50 hover:text-red-500 rounded opacity-0 group-hover:opacity-100 transition-all"
            title="Xóa template"
        >
            <Trash2 size={14} />
        </button>
    </div>
);

const NavIcon = ({ icon, isActive, onClick, label }: any) => (
    <button
        onClick={onClick}
        className={`p-3 rounded-xl transition-all group relative flex items-center justify-center ${isActive
            ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
            : 'text-slate-400 hover:bg-slate-100 hover:text-slate-600'
            }`}
        title={label}
    >
        {icon}
    </button>
);

const LayoutOption = ({ label, icon, selected, onClick, desc }: any) => (
    <button
        onClick={onClick}
        className={`w-full flex items-start gap-3 p-3 rounded-lg border text-left transition-all ${selected ? 'bg-blue-50 border-blue-500 ring-1 ring-blue-500' : 'bg-white border-slate-200 hover:border-slate-300'
            }`}
    >
        <div className={`mt-0.5 ${selected ? 'text-blue-600' : 'text-slate-400'}`}>{icon}</div>
        <div>
            <div className={`text-sm font-medium ${selected ? 'text-blue-800' : 'text-slate-700'}`}>{label}</div>
            <div className="text-[11px] text-slate-500 leading-tight mt-1">{desc}</div>
        </div>
    </button>
);

const DraggableSidebarItem: React.FC<{ item: any }> = ({ item }) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: `sidebar-${item.type}`,
        data: { type: item.type, fromSidebar: true, label: item.label }
    });

    const style = transform ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` } : undefined;

    return (
        <div
            ref={setNodeRef} {...listeners} {...attributes} style={style}
            className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-lg shadow-sm hover:border-blue-400 hover:shadow-md transition-all cursor-grab active:cursor-grabbing group"
        >
            <div className="p-2 bg-slate-50 rounded text-slate-400 group-hover:text-blue-500 group-hover:bg-blue-50 transition-colors">
                {item.icon}
            </div>
            <div>
                <div className="text-sm font-medium text-slate-700">{item.label}</div>
                <div className="text-xs text-slate-400">{item.description}</div>
            </div>
        </div>
    );
};
