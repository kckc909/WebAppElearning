import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, Eye, Plus, ChevronLeft, X, Layout, Settings, FileText, Grid, Video, Code, Upload, HelpCircle, Link, Trash2, Edit, GripVertical } from 'lucide-react';
import toast from 'react-hot-toast';

type MenuTab = 'structure' | 'content' | 'config' | 'templates';

interface ContentBlock {
    id: string;
    type: string;
    title: string;
    icon: React.ReactNode;
    description: string;
}

interface LessonBlock {
    id: string;
    type: string;
    title: string;
    content?: string;
}

const CreateLessonPage: React.FC = () => {
    const { courseId, lessonId } = useParams();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<MenuTab>('structure');
    const [lessonTitle, setLessonTitle] = useState('Intro to React & JSX');
    const [lessonBlocks, setLessonBlocks] = useState<LessonBlock[]>([]);
    const [isSaving, setIsSaving] = useState(false);

    // Content block types
    const contentBlocks: ContentBlock[] = [
        { id: 'rich-text', type: 'Rich Text', title: 'Rich Text', icon: <FileText className="w-5 h-5" />, description: 'Codeblock, Instructions' },
        { id: 'video', type: 'Video Player', title: 'Video Player', icon: <Video className="w-5 h-5" />, description: 'Youtube, Video URL' },
        { id: 'document', type: 'Document', title: 'Document', icon: <FileText className="w-5 h-5" />, description: 'PDF, Office Viewer' },
        { id: 'ide', type: 'Interactive IDE', title: 'Interactive IDE', icon: <Code className="w-5 h-5" />, description: 'Code Editor + Runner' },
        { id: 'quiz', type: 'Mini Quiz', title: 'Mini Quiz', icon: <HelpCircle className="w-5 h-5" />, description: 'Check for understanding' },
        { id: 'upload', type: 'Practice Upload', title: 'Practice Upload', icon: <Upload className="w-5 h-5" />, description: 'File/Link Submission' },
        { id: 'embed', type: 'Live Embed', title: 'Live Embed', icon: <Link className="w-5 h-5" />, description: 'Figma, CodeSandbox, Replat' },
    ];

    const menuItems = [
        { id: 'structure' as MenuTab, label: 'Cấu trúc bài', icon: <Layout className="w-5 h-5" /> },
        { id: 'content' as MenuTab, label: 'Content Blocks', icon: <Grid className="w-5 h-5" /> },
        { id: 'config' as MenuTab, label: 'Cấu hình', icon: <Settings className="w-5 h-5" /> },
        { id: 'templates' as MenuTab, label: 'Templates', icon: <FileText className="w-5 h-5" /> },
    ];

    const handleAddBlock = (block: ContentBlock) => {
        const newBlock: LessonBlock = {
            id: `${block.id}-${Date.now()}`,
            type: block.type,
            title: block.title,
        };
        setLessonBlocks([...lessonBlocks, newBlock]);
        toast.success(`Đã thêm ${block.title}`);
        setActiveTab('structure');
    };

    const handleRemoveBlock = (blockId: string) => {
        setLessonBlocks(lessonBlocks.filter(b => b.id !== blockId));
        toast.success('Đã xóa block');
    };

    const handleSaveDraft = async () => {
        setIsSaving(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsSaving(false);
        toast.success('Đã lưu bản nháp!');
    };

    const handlePublish = async () => {
        if (lessonBlocks.length === 0) {
            toast.error('Vui lòng thêm ít nhất 1 block nội dung!');
            return;
        }
        setIsSaving(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsSaving(false);
        toast.success('Đã xuất bản bài học!');
        navigate(`/instructor/courses/${courseId}`);
    };

    const handlePreview = () => {
        toast('Mở preview trong tab mới...', { icon: '👀' });
    };

    const handleBack = () => {
        navigate(`/instructor/courses/${courseId}`);
    };

    return (
        <div className="h-screen flex flex-col bg-slate-50">
            {/* Header */}
            <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button
                        onClick={handleBack}
                        className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <div>
                        <span className="text-xs text-slate-500 uppercase">Bài học • Chương 1</span>
                        <input
                            type="text"
                            value={lessonTitle}
                            onChange={(e) => setLessonTitle(e.target.value)}
                            className="block text-xl font-bold text-secondary bg-transparent border-none focus:outline-none focus:ring-0 p-0 w-full"
                            placeholder="Nhập tiêu đề bài học..."
                        />
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={handlePreview}
                        className="px-4 py-2 text-slate-700 hover:bg-slate-100 rounded-lg flex items-center gap-2 transition-colors"
                    >
                        <Eye className="w-4 h-4" />
                        Preview
                    </button>
                    <button
                        onClick={handleSaveDraft}
                        disabled={isSaving}
                        className="px-4 py-2 bg-slate-200 hover:bg-slate-300 rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50"
                    >
                        <Save className="w-4 h-4" />
                        Lưu nháp
                    </button>
                    <button
                        onClick={handlePublish}
                        disabled={isSaving}
                        className="px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50"
                    >
                        <Save className="w-4 h-4" />
                        Xuất bản
                    </button>
                </div>
            </header>

            <div className="flex-1 flex overflow-hidden">
                {/* Left Sidebar - Menu */}
                <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">
                    <div className="p-4 space-y-1">
                        {menuItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === item.id
                                    ? 'bg-primary/10 text-primary font-semibold'
                                    : 'text-slate-700 hover:bg-slate-50'
                                    }`}
                            >
                                {item.icon}
                                <span>{item.label}</span>
                            </button>
                        ))}
                    </div>
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 overflow-y-auto p-6">
                    {activeTab === 'structure' && (
                        <LessonStructureTab
                            blocks={lessonBlocks}
                            onRemoveBlock={handleRemoveBlock}
                            onAddClick={() => setActiveTab('content')}
                        />
                    )}
                    {activeTab === 'content' && (
                        <ContentBlocksTab
                            blocks={contentBlocks}
                            onAddBlock={handleAddBlock}
                        />
                    )}
                    {activeTab === 'config' && <LessonConfigTab lessonTitle={lessonTitle} setLessonTitle={setLessonTitle} />}
                    {activeTab === 'templates' && <TemplatesTab onSelectTemplate={(blocks) => setLessonBlocks(blocks)} />}
                </main>
            </div>
        </div>
    );
};

// Lesson Structure Tab - Shows added blocks
const LessonStructureTab: React.FC<{
    blocks: LessonBlock[];
    onRemoveBlock: (id: string) => void;
    onAddClick: () => void;
}> = ({ blocks, onRemoveBlock, onAddClick }) => {
    return (
        <div className="max-w-4xl">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-xl font-bold text-secondary">Cấu trúc bài học</h2>
                        <p className="text-sm text-slate-500 mt-1">{blocks.length} block nội dung</p>
                    </div>
                    <button
                        onClick={onAddClick}
                        className="px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg flex items-center gap-2 transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        Thêm block
                    </button>
                </div>

                {blocks.length === 0 ? (
                    <div className="border-2 border-dashed border-slate-300 rounded-xl p-12 text-center">
                        <Grid className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                        <p className="text-slate-500 mb-4">Chưa có nội dung nào</p>
                        <button
                            onClick={onAddClick}
                            className="px-6 py-3 bg-primary hover:bg-primary-hover text-white rounded-lg font-semibold transition-colors"
                        >
                            Thêm block đầu tiên
                        </button>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {blocks.map((block, index) => (
                            <div
                                key={block.id}
                                className="flex items-center gap-3 p-4 bg-slate-50 border border-slate-200 rounded-xl hover:border-primary/50 transition-colors group"
                            >
                                <GripVertical className="w-5 h-5 text-slate-400 cursor-grab" />
                                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary font-bold">
                                    {index + 1}
                                </div>
                                <div className="flex-1">
                                    <p className="font-semibold text-secondary">{block.title}</p>
                                    <p className="text-sm text-slate-500">{block.type}</p>
                                </div>
                                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="p-2 hover:bg-slate-200 rounded-lg transition-colors">
                                        <Edit className="w-4 h-4 text-slate-600" />
                                    </button>
                                    <button
                                        onClick={() => onRemoveBlock(block.id)}
                                        className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4 text-red-500" />
                                    </button>
                                </div>
                            </div>
                        ))}

                        <button
                            onClick={onAddClick}
                            className="w-full p-4 border-2 border-dashed border-slate-300 rounded-xl text-slate-600 hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-2"
                        >
                            <Plus className="w-5 h-5" />
                            Thêm block
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

// Content Blocks Tab
const ContentBlocksTab: React.FC<{
    blocks: ContentBlock[];
    onAddBlock: (block: ContentBlock) => void;
}> = ({ blocks, onAddBlock }) => {
    return (
        <div className="max-w-4xl">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <h2 className="text-xl font-bold mb-2 text-secondary">Content Blocks</h2>
                <p className="text-slate-600 mb-6">Chọn block để thêm vào bài học</p>

                <div className="grid grid-cols-2 gap-4">
                    {blocks.map((block) => (
                        <button
                            key={block.id}
                            onClick={() => onAddBlock(block)}
                            className="p-4 border-2 border-slate-200 rounded-xl hover:border-primary hover:shadow-md transition-all text-left group"
                        >
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-12 h-12 bg-slate-100 group-hover:bg-primary/10 rounded-xl flex items-center justify-center text-slate-600 group-hover:text-primary transition-colors">
                                    {block.icon}
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-secondary">{block.title}</h3>
                                    <p className="text-xs text-slate-500">{block.description}</p>
                                </div>
                            </div>
                            <div className="text-sm text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                                <Plus className="w-4 h-4" />
                                Thêm vào bài học
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

// Lesson Config Tab
const LessonConfigTab: React.FC<{
    lessonTitle: string;
    setLessonTitle: (title: string) => void;
}> = ({ lessonTitle, setLessonTitle }) => {
    const [layout, setLayout] = useState<'single' | 'split'>('single');

    return (
        <div className="max-w-4xl">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <h2 className="text-xl font-bold mb-6 text-secondary">Cấu hình bài học</h2>

                <div className="space-y-6">
                    {/* Metadata */}
                    <div>
                        <h3 className="font-semibold mb-3 text-secondary">Thông tin cơ bản</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Tiêu đề bài học</label>
                                <input
                                    type="text"
                                    value={lessonTitle}
                                    onChange={(e) => setLessonTitle(e.target.value)}
                                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Mục tiêu học tập</label>
                                <textarea
                                    defaultValue="Understand JSX syntax while practicing."
                                    rows={3}
                                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Thời lượng (phút)</label>
                                    <input
                                        type="number"
                                        defaultValue={15}
                                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Loại bài học</label>
                                    <select className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary">
                                        <option>Bắt buộc</option>
                                        <option>Tùy chọn</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Layout Configuration */}
                    <div>
                        <h3 className="font-semibold mb-3 text-secondary">Cấu hình layout</h3>
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                onClick={() => setLayout('single')}
                                className={`p-4 border-2 rounded-lg transition-colors ${layout === 'single' ? 'border-primary bg-primary/5' : 'border-slate-200 hover:border-primary'
                                    }`}
                            >
                                <div className="w-full h-16 bg-white border-2 border-slate-300 rounded mb-2"></div>
                                <span className="text-sm font-medium">Single Column</span>
                            </button>
                            <button
                                onClick={() => setLayout('split')}
                                className={`p-4 border-2 rounded-lg transition-colors ${layout === 'split' ? 'border-primary bg-primary/5' : 'border-slate-200 hover:border-primary'
                                    }`}
                            >
                                <div className="w-full h-16 bg-white border-2 border-slate-300 rounded mb-2 grid grid-cols-2 gap-1 p-1">
                                    <div className="bg-slate-200 rounded"></div>
                                    <div className="bg-slate-200 rounded"></div>
                                </div>
                                <span className="text-sm font-medium">Split 50/50</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Templates Tab
const TemplatesTab: React.FC<{
    onSelectTemplate: (blocks: LessonBlock[]) => void;
}> = ({ onSelectTemplate }) => {
    const templates = [
        {
            id: '1',
            name: 'Video Lesson',
            description: 'Video player + ghi chú',
            preview: '🎥',
            blocks: [
                { id: 'video-1', type: 'Video Player', title: 'Video bài giảng' },
                { id: 'text-1', type: 'Rich Text', title: 'Ghi chú bài học' },
            ]
        },
        {
            id: '2',
            name: 'Coding Challenge',
            description: 'Hướng dẫn + IDE + Test cases',
            preview: '💻',
            blocks: [
                { id: 'text-2', type: 'Rich Text', title: 'Hướng dẫn' },
                { id: 'ide-1', type: 'Interactive IDE', title: 'Code Editor' },
            ]
        },
        {
            id: '3',
            name: 'Reading + Quiz',
            description: 'Nội dung text + bài kiểm tra',
            preview: '📖',
            blocks: [
                { id: 'text-3', type: 'Rich Text', title: 'Nội dung bài học' },
                { id: 'quiz-1', type: 'Mini Quiz', title: 'Bài kiểm tra' },
            ]
        },
        {
            id: '4',
            name: 'Interactive Tutorial',
            description: 'Split view với IDE và hướng dẫn',
            preview: '🔧',
            blocks: [
                { id: 'text-4', type: 'Rich Text', title: 'Hướng dẫn step-by-step' },
                { id: 'ide-2', type: 'Interactive IDE', title: 'Live coding' },
                { id: 'quiz-2', type: 'Mini Quiz', title: 'Kiểm tra hiểu biết' },
            ]
        },
    ];

    const handleSelectTemplate = (template: typeof templates[0]) => {
        onSelectTemplate(template.blocks);
        toast.success(`Đã áp dụng template "${template.name}"`);
    };

    return (
        <div className="max-w-4xl">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <h2 className="text-xl font-bold mb-2 text-secondary">Lesson Templates</h2>
                <p className="text-slate-600 mb-6">Chọn template để bắt đầu nhanh</p>

                <div className="grid grid-cols-2 gap-4">
                    {templates.map((template) => (
                        <button
                            key={template.id}
                            onClick={() => handleSelectTemplate(template)}
                            className="p-6 border-2 border-slate-200 rounded-xl hover:border-primary hover:shadow-md transition-all text-left group"
                        >
                            <div className="text-4xl mb-3">{template.preview}</div>
                            <h3 className="font-semibold text-secondary mb-1">{template.name}</h3>
                            <p className="text-sm text-slate-500 mb-2">{template.description}</p>
                            <p className="text-xs text-slate-400">{template.blocks.length} blocks</p>
                            <div className="mt-4 text-sm text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                                Sử dụng template →
                            </div>
                        </button>
                    ))}
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
                    <p className="text-sm text-blue-700">
                        💡 <strong>Tip:</strong> Templates có thể được tùy chỉnh sau khi áp dụng. Bạn có thể thêm hoặc xóa blocks.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CreateLessonPage;
