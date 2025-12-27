import React from 'react';
import { FileText, Download } from 'lucide-react';

const AdminClassDocuments: React.FC = () => {
    const documents = [
        { id: 1, name: 'Syllabus - Web Dev A1.pdf', size: '2.5 MB', uploadDate: '2024-12-01' },
        { id: 2, name: 'Lecture Notes - React.pdf', size: '3.2 MB', uploadDate: '2024-12-05' },
    ];

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-800">Tài liệu lớp học</h1>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="space-y-3">
                    {documents.map((doc) => (
                        <div key={doc.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                            <div className="flex items-center gap-3">
                                <FileText className="w-5 h-5 text-red-500" />
                                <div>
                                    <p className="font-medium text-gray-900">{doc.name}</p>
                                    <p className="text-xs text-gray-500">{doc.size} • {doc.uploadDate}</p>
                                </div>
                            </div>
                            <button className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                                <Download className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminClassDocuments;