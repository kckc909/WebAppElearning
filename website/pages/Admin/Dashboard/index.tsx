import StatCard from '../../../components/StatCard';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Users, BookOpen, DollarSign } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useRecentAdminActivities } from '../../../hooks/useAdminActivities';

// Static chart data (UI constants, not from DB)
const revenueChartData = [
    { name: 'Jan', revenue: 4000 },
    { name: 'Feb', revenue: 3000 },
    { name: 'Mar', revenue: 2000 },
    { name: 'Apr', revenue: 2780 },
    { name: 'May', revenue: 1890 },
    { name: 'Jun', revenue: 2390 },
    { name: 'Jul', revenue: 3490 },
];

// Helper to format time ago
const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours} hours ago`;
    if (diffHours < 48) return 'Yesterday';
    return `${Math.floor(diffHours / 24)} days ago`;
};

export default function AdminDashboard() {
    const navigate = useNavigate();
    const { data: activities, loading, error } = useRecentAdminActivities(10);

    const getTitle = (type: string) => {
        switch (type) {
            case 'course_submitted':
                return "New course submitted";
            case 'course_updated':
                return "Course updated";
            case 'user_registered':
                return "New instructor registered";
            case 'payment_received':
                return "Payment received";
            default:
                return "Notification";
        }
    };

    const handleClick = () => {
        navigate("/admin/courses/approval");
    };

    return (
        <>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-800 m-1 ">Dashboard Overview</h1>
                    <div className="text-sm text-gray-500">Last updated: Just now</div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard title="Total Students" value="12,450" icon={Users} color="bg-blue-600" trend={12} />
                    <StatCard title="Active Courses" value="234" icon={BookOpen} color="bg-green-600" trend={5} />
                    <StatCard title="Total Revenue" value="$45,231" icon={DollarSign} color="bg-yellow-600" trend={-2} />
                    <StatCard title="New Instructors" value="15" icon={Users} color="bg-purple-600" trend={8} />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-lg font-bold mb-4">Revenue Analytics</h3>
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={revenueChartData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="revenue" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-lg font-bold mb-4">Recent Activities</h3>
                        <div className="space-y-4">
                            {loading ? (
                                <div className="text-center text-gray-500">�ang t?i...</div>
                            ) : error ? (
                                <div className="text-center text-red-500">{error}</div>
                            ) : (
                                <div>
                                    {activities.map((item) => (
                                        <div
                                            key={item.id}
                                            onClick={handleClick}
                                            className="flex items-start space-x-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0 cursor-pointer hover:bg-gray-50 rounded-md p-2"
                                        >
                                            <div className={`w-2 h-2 mt-2 rounded-full ${item.is_read ? 'bg-gray-300' : 'bg-blue-500'}`} />
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">
                                                    {getTitle(item.type)}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    {item.instructor_name && `Instructor ${item.instructor_name}`} {item.description}
                                                </p>
                                                <p className="text-xs text-gray-400 mt-1">{getTimeAgo(item.timestamp)}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
