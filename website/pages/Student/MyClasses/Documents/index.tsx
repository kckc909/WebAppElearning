import React from 'react';
import { FileText, Download } from 'lucide-react';

const StudentDocuments: React.FC = () => {
    const documents = [
        { id: 1, name: 'Lecture Notes - Week 6.pdf', className: 'Web Dev A1', size: '2.5 MB', date: '2024-12-01' },
        { id: 2, name: 'React Hooks Cheatsheet.pdf', className: 'Web Dev A1', size: '1.2 MB', date: '2024-12-05' },
    ];

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold text-secondary">Tài liệu học tập</h1>

            <div className="space-y-3">
                {documents.map((doc) => (
                    <div key={doc.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <FileText className="w-5 h-5 text-red-500" />
                            <div>
                                <p className="font-medium text-slate-900">{doc.name}</p>
                                <p className="text-xs text-slate-500">{doc.className} • {doc.size} • {doc.date}</p>
                            </div>
                        </div>
                        <button className="p-2 text-primary hover:bg-blue-50 rounded transition-colors">
                            <Download className="w-4 h-4" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StudentDocuments;
