import React, { useState } from 'react';
import { Upload, File, Folder, Search, Grid, List, Download, Trash2, Share2, MoreVertical, Plus, FolderPlus } from 'lucide-react';

interface FileItem {
    id: number;
    name: string;
    type: 'file' | 'folder';
    size?: string;
    uploadDate: string;
    fileType?: string;
    url?: string;
}

const InstructorDocumentLibrary: React.FC = () => {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedFolder, setSelectedFolder] = useState<string>('all');

    const [files] = useState<FileItem[]>([
        {
            id: 1,
            name: 'Course Syllabus.pdf',
            type: 'file',
            size: '2.5 MB',
            uploadDate: '2024-12-10',
            fileType: 'pdf',
            url: '#',
        },
        {
            id: 2,
            name: 'Lecture Slides',
            type: 'folder',
            uploadDate: '2024-12-08',
        },
        {
            id: 3,
            name: 'Assignment Template.docx',
            type: 'file',
            size: '1.2 MB',
            uploadDate: '2024-12-05',
            fileType: 'docx',
            url: '#',
        },
        {
            id: 4,
            name: 'Code Examples.zip',
            type: 'file',
            size: '15.8 MB',
            uploadDate: '2024-11-28',
            fileType: 'zip',
            url: '#',
        },
        {
            id: 5,
            name: 'Video Tutorials',
            type: 'folder',
            uploadDate: '2024-11-20',
        },
    ]);

    const filteredFiles = files.filter((file) =>
        file.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getFileIcon = (fileType?: string) => {
        const iconClass = 'w-8 h-8';
        switch (fileType) {
            case 'pdf':
                return <File className={`${iconClass} text-red-500`} />;
            case 'docx':
                return <File className={`${iconClass} text-blue-500`} />;
            case 'zip':
                return <File className={`${iconClass} text-purple-500`} />;
            default:
                return <File className={`${iconClass} text-gray-500`} />;
        }
    };

    return (
        <div className="flex-1 overflow-y-auto bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Thư viện tài liệu</h1>
                        <p className="text-gray-600 mt-1">Quản lý tài liệu và file của bạn</p>
                    </div>
                    <div className="flex gap-2">
                        <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
                            <FolderPlus className="w-5 h-5" />
                            Tạo thư mục
                        </button>
                        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2">
                            <Upload className="w-5 h-5" />
                            Tải lên
                        </button>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Tổng file</p>
                                <p className="text-2xl font-bold text-gray-900 mt-1">
                                    {files.filter((f) => f.type === 'file').length}
                                </p>
                            </div>
                            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                                <File className="w-6 h-6 text-blue-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Thư mục</p>
                                <p className="text-2xl font-bold text-gray-900 mt-1">
                                    {files.filter((f) => f.type === 'folder').length}
                                </p>
                            </div>
                            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                                <Folder className="w-6 h-6 text-green-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Dung lượng</p>
                                <p className="text-2xl font-bold text-gray-900 mt-1">19.5 MB</p>
                            </div>
                            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                                <Upload className="w-6 h-6 text-purple-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Chia sẻ</p>
                                <p className="text-2xl font-bold text-gray-900 mt-1">8</p>
                            </div>
                            <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
                                <Share2 className="w-6 h-6 text-amber-600" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Toolbar */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                        {/* Search */}
                        <div className="relative flex-1 max-w-md w-full">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Tìm kiếm file..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            />
                        </div>

                        {/* View Toggle */}
                        <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white text-green-600 shadow-sm' : 'text-gray-600'
                                    }`}
                            >
                                <Grid className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-2 rounded ${viewMode === 'list' ? 'bg-white text-green-600 shadow-sm' : 'text-gray-600'
                                    }`}
                            >
                                <List className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Files Display */}
                {viewMode === 'grid' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {filteredFiles.map((file) => (
                            <div
                                key={file.id}
                                className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow group"
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
                                        {file.type === 'folder' ? (
                                            <Folder className="w-8 h-8 text-amber-500" />
                                        ) : (
                                            getFileIcon(file.fileType)
                                        )}
                                    </div>
                                    <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-gray-100 rounded">
                                        <MoreVertical className="w-5 h-5 text-gray-600" />
                                    </button>
                                </div>

                                <h3 className="font-semibold text-gray-900 mb-1 truncate" title={file.name}>
                                    {file.name}
                                </h3>
                                <p className="text-sm text-gray-600 mb-3">
                                    {file.type === 'folder' ? 'Thư mục' : file.size}
                                </p>
                                <p className="text-xs text-gray-500">{new Date(file.uploadDate).toLocaleDateString('vi-VN')}</p>

                                {file.type === 'file' && (
                                    <div className="mt-3 pt-3 border-t border-gray-100 flex gap-2">
                                        <button className="flex-1 px-3 py-1.5 text-sm font-medium text-green-600 border border-green-600 rounded hover:bg-green-50 transition-colors flex items-center justify-center gap-1">
                                            <Download className="w-4 h-4" />
                                            Tải
                                        </button>
                                        <button className="px-3 py-1.5 text-sm font-medium text-gray-600 border border-gray-300 rounded hover:bg-gray-50 transition-colors">
                                            <Share2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Tên</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Loại</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Kích thước</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Ngày tải</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Hành động</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {filteredFiles.map((file) => (
                                    <tr key={file.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                {file.type === 'folder' ? (
                                                    <Folder className="w-6 h-6 text-amber-500" />
                                                ) : (
                                                    getFileIcon(file.fileType)
                                                )}
                                                <span className="font-medium text-gray-900">{file.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {file.type === 'folder' ? 'Thư mục' : file.fileType?.toUpperCase()}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{file.size || '-'}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {new Date(file.uploadDate).toLocaleDateString('vi-VN')}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2">
                                                {file.type === 'file' && (
                                                    <>
                                                        <button className="p-2 text-green-600 hover:bg-green-50 rounded transition-colors">
                                                            <Download className="w-4 h-4" />
                                                        </button>
                                                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors">
                                                            <Share2 className="w-4 h-4" />
                                                        </button>
                                                    </>
                                                )}
                                                <button className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {filteredFiles.length === 0 && (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12">
                        <div className="flex flex-col items-center text-center">
                            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                                <File className="w-10 h-10 text-gray-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Không tìm thấy file</h3>
                            <p className="text-gray-600 mb-6">Thử tìm kiếm với từ khóa khác</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default InstructorDocumentLibrary;