import React, { useEffect } from 'react';
import { FileText, Download } from 'lucide-react';
import { useClassDocuments } from '../../../../hooks/useClassDocuments';

const StudentDocuments: React.FC = () => {
    // TODO: Get class ID from params/context
    const classId = 1;

    // Get documents from API hook
    const { data: documentsData, isLoading, error, refetch } = useClassDocuments(classId);

    useEffect(() => {
        if (classId) {
            refetch();
        }
    }, [classId]);

    const documents = (documentsData || []).map((doc: any) => ({
        id: doc.id,
        name: doc.name || doc.title,
        className: doc.class_name,
        size: doc.size || 'N/A',
        date: doc.uploaded_at || doc.created_at,
    }));

    if (isLoading) {
        return <div className="flex items-center justify-center h-64">�ang t?i...</div>;
    }

    if (error) {
        return <div className="text-red-500">L?i: {(error as Error).message}</div>;
    }

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

            {documents.length === 0 && (
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
                    <FileText className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">Chưa có tài liệu</h3>
                    <p className="text-slate-600">Tài liệu học tập sẽ hiển thị ở đây</p>
                </div>
            )}
        </div>
    );
};

export default StudentDocuments;
