import React from 'react';
import { BookOpen, ListTree, Users, Star, DollarSign } from 'lucide-react';
import { TabType } from './types';

interface TabNavigationProps {
    activeTab: TabType;
    setActiveTab: (tab: TabType) => void;
    curriculumCount: number;
    enrollmentsCount: number;
    reviewsCount: number;
    revenueCount: number;
}

export const TabNavigation: React.FC<TabNavigationProps> = ({
    activeTab,
    setActiveTab,
    curriculumCount,
    enrollmentsCount,
    reviewsCount,
    revenueCount
}) => {
    const tabs = [
        { id: 'overview' as TabType, label: 'Tổng quan', icon: BookOpen, count: null },
        { id: 'curriculum' as TabType, label: 'Mục lục', icon: ListTree, count: curriculumCount, countClass: 'bg-slate-100 text-slate-600' },
        { id: 'students' as TabType, label: 'Học viên', icon: Users, count: enrollmentsCount, countClass: 'bg-blue-100 text-blue-600' },
        { id: 'reviews' as TabType, label: 'Đánh giá', icon: Star, count: reviewsCount, countClass: 'bg-yellow-100 text-yellow-600' },
        { id: 'revenue' as TabType, label: 'Doanh thu', icon: DollarSign, count: revenueCount, countClass: 'bg-green-100 text-green-600' },
    ];

    return (
        <div className="mb-6 border-b border-slate-200 overflow-x-auto">
            <div className="flex gap-1 min-w-max">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-4 py-3 font-medium text-sm transition-colors relative ${
                            activeTab === tab.id
                                ? 'text-primary'
                                : 'text-slate-500 hover:text-slate-700'
                        }`}
                    >
                        <div className="flex items-center gap-2">
                            <tab.icon className="w-4 h-4" />
                            {tab.label}
                            {tab.count !== null && tab.count > 0 && (
                                <span className={`px-1.5 py-0.5 text-xs rounded-full ${tab.countClass}`}>
                                    {tab.count}
                                </span>
                            )}
                        </div>
                        {activeTab === tab.id && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
};
