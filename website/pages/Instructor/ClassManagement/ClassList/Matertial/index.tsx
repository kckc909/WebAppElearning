import React from 'react';
import { FileText, Download, Upload } from 'lucide-react';

const InstructorClassMaterial: React.FC = () => {
    const materials = [
        { id: 1, name: 'Lecture Notes - Week 6.pdf', size: '2.5 MB', uploadDate: '2024-12-01' },
        { id: 2, name: 'Assignment Template.docx', size: '1.2 MB', uploadDate: '2024-12-05' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-secondary">Tài liệu</h1>
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2">
                    <Upload className="w-4 h-4" />
                    Tải lên
                </button>
            </div>
            <div className="space-y-3">
                {materials.map((material) => (
                    <div key={material.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <FileText className="w-5 h-5 text-red-500" />
                            <div>
                                <p className="font-medium text-slate-900">{material.name}</p>
                                <p className="text-xs text-slate-500">{material.size} • {material.uploadDate}</p>
                            </div>
                        </div>
                        <button className="p-2 text-green-600 hover:bg-green-50 rounded">
                            <Download className="w-4 h-4" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InstructorClassMaterial;
