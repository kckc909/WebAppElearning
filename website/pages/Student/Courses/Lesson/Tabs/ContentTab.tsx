import React from 'react';

interface ContentTabProps {
    content: string;
}

const ContentTab: React.FC<ContentTabProps> = ({ content }) => {
    return (
        <div className="max-w-4xl mx-auto p-6 lg:p-8 pb-20 lg:pb-8">
            <div className="bg-white rounded-2xl shadow-sm p-8 prose prose-slate max-w-none">
                <div className="whitespace-pre-wrap">{content}</div>
            </div>
        </div>
    );
};

export default ContentTab;
