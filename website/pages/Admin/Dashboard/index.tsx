import StatCard from '../../../components/StatCard';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Users, BookOpen, DollarSign } from "lucide-react";
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
    const navigate = useNavigate();

    const [notifications, setNotifications] = useState<any[]>([]);

    useEffect(() => {
        // fetch api
        setNotifications(mockData);
    }, [])

    const getTitle = (type: any) => {
        if (type === 0) return "New course submitted";
        if (type === 1) return "Course updated";
        return "Notification";
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
                                <BarChart data={data}>
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
                            <div>
                                {notifications.map((item) => (
                                    <div
                                        key={item.id}
                                        onClick={handleClick}
                                        className="flex items-start space-x-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0 cursor-pointer hover:bg-gray-50 rounded-md p-2"
                                    >
                                        <div className="w-2 h-2 mt-2 rounded-full bg-blue-500" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">
                                                {getTitle(item.type)}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                Instructor {item.instructor} {item.type === 0 ? "created" : "updated"} "{item.course}"
                                            </p>
                                            <p className="text-xs text-gray-400 mt-1">{item.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}


const data = [
    { name: 'Jan', revenue: 4000 },
    { name: 'Feb', revenue: 3000 },
    { name: 'Mar', revenue: 2000 },
    { name: 'Apr', revenue: 2780 },
    { name: 'May', revenue: 1890 },
    { name: 'Jun', revenue: 2390 },
    { name: 'Jul', revenue: 3490 },
];

const mockData = [
    {
        id: 1,
        type: 0, // 0 = create
        instructor: "John Doe",
        course: "React Mastery",
        time: "2 hours ago"
    },
    {
        id: 2,
        type: 1, // 1 = update
        instructor: "Anna Smith",
        course: "NodeJS Zero to Hero",
        time: "5 hours ago"
    },
    {
        id: 3,
        type: 0,
        instructor: "Michael Lee",
        course: "UI/UX Design 101",
        time: "Yesterday"
    }
];
