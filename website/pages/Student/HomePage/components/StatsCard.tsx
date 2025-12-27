import React from 'react';

interface StatsCardProps {
    number: string;
    label: string;
    icon: React.ReactNode;
}

export const StatsCard: React.FC<StatsCardProps> = ({ number, label, icon }) => (
    <div className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white transition-all">
        <div className="flex justify-center mb-3 text-primary">
            {icon}
        </div>
        <div className="text-4xl font-bold text-secondary mb-2">{number}</div>
        <div className="text-slate-600">{label}</div>
    </div>
);
