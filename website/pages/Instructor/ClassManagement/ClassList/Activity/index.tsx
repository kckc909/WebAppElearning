import React, { useState } from 'react';
import { Clock, User, FileText, MessageSquare, CheckCircle } from 'lucide-react';

const Activity: React.FC = () => {
    // Mock data
    const activities = [
        {
            id: 1,
            type: 'assignment',
            user: 'Nguyen Van A',
            action: 'submitted assignment',
            target: 'Writing Task 1',
            time: '2 hours ago',
            icon: FileText,
            color: 'bg-blue-100 text-blue-700',
        },
        {
            id: 2,
            type: 'comment',
            user: 'Tran Thi B',
            action: 'commented on',
            target: 'Lesson 5 Discussion',
            time: '3 hours ago',
            icon: MessageSquare,
            color: 'bg-green-100 text-green-700',
        },
        {
            id: 3,
            type: 'completion',
            user: 'Le Van C',
            action: 'completed',
            target: 'Lesson 4: Grammar Review',
            time: '5 hours ago',
            icon: CheckCircle,
            color: 'bg-purple-100 text-purple-700',
        },
        {
            id: 4,
            type: 'assignment',
            user: 'Pham Thi D',
            action: 'submitted assignment',
            target: 'Speaking Practice',
            time: '1 day ago',
            icon: FileText,
            color: 'bg-blue-100 text-blue-700',
        },
    ];

    const [filter, setFilter] = useState<string>('all');

    const filteredActivities = filter === 'all' 
        ? activities 
        : activities.filter(activity => activity.type === filter);

    return (
        <div>
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Class Activity</h2>
                    <p className="text-gray-600 mt-1">Recent activities in this class</p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => setFilter('all')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                            filter === 'all'
                                ? 'bg-green-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                        All
                    </button>
                    <button
                        onClick={() => setFilter('assignment')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                            filter === 'assignment'
                                ? 'bg-green-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                        Assignments
                    </button>
                    <button
                        onClick={() => setFilter('comment')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                            filter === 'comment'
                                ? 'bg-green-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                        Comments
                    </button>
                    <button
                        onClick={() => setFilter('completion')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                            filter === 'completion'
                                ? 'bg-green-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                        Completions
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="divide-y divide-gray-200">
                    {filteredActivities.map((activity) => {
                        const Icon = activity.icon;
                        return (
                            <div key={activity.id} className="p-4 hover:bg-gray-50 transition-colors">
                                <div className="flex items-start gap-4">
                                    <div className={`p-2 rounded-lg ${activity.color}`}>
                                        <Icon className="w-5 h-5" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <span className="font-medium text-gray-900">{activity.user}</span>
                                            <span className="text-gray-600">{activity.action}</span>
                                            <span className="font-medium text-gray-900">{activity.target}</span>
                                        </div>
                                        <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                                            <Clock className="w-4 h-4" />
                                            <span>{activity.time}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Activity;
