import React from 'react';

interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
    <div className="group relative bg-white p-8 rounded-2xl border border-slate-200 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div className="relative">
            <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary-hover rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
                {icon}
            </div>
            <h3 className="text-xl font-bold text-secondary mb-3">{title}</h3>
            <p className="text-slate-600 leading-relaxed">{description}</p>
        </div>
    </div>
);
