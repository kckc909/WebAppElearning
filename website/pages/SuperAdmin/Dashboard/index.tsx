import React from 'react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, Legend
} from 'recharts';
import { Users, AlertTriangle, Activity, Database } from 'lucide-react';

const data = [
    { name: 'Jan', users: 4000, active: 2400 },
    { name: 'Feb', users: 3000, active: 1398 },
    { name: 'Mar', users: 2000, active: 9800 },
    { name: 'Apr', users: 2780, active: 3908 },
    { name: 'May', users: 1890, active: 4800 },
    { name: 'Jun', users: 2390, active: 3800 },
    { name: 'Jul', users: 3490, active: 4300 },
];

const roleData = [
    { name: 'Admins', value: 400 },
    { name: 'Editors', value: 300 },
    { name: 'Viewers', value: 300 },
    { name: 'Superadmins', value: 20 },
];

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

const Dashboard: React.FC = () => {
    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                    <p className="text-sm text-gray-500">Overview of system performance and user statistics.</p>
                </div>
                <div className="flex items-center gap-2">
                    <select className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-brand-500 sm:text-sm sm:leading-6 bg-white">
                        <option>Last 7 Days</option>
                        <option>Last 30 Days</option>
                        <option>Last 90 Days</option>
                    </select>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {[
                    { label: 'Total Users', value: '12,345', change: '+12%', icon: Users, color: 'text-blue-600', bg: 'bg-blue-100' },
                    { label: 'Active Sessions', value: '1,432', change: '+5%', icon: Activity, color: 'text-green-600', bg: 'bg-green-100' },
                    { label: 'System Errors', value: '23', change: '-2%', icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-100' },
                    { label: 'Storage Used', value: '45 TB', change: '+8%', icon: Database, color: 'text-purple-600', bg: 'bg-purple-100' },
                ].map((stat, idx) => (
                    <div key={idx} className="relative overflow-hidden rounded-lg bg-white p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <dt>
                            <div className={`absolute rounded-md p-3 ${stat.bg}`}>
                                <stat.icon className={`h-6 w-6 ${stat.color}`} aria-hidden="true" />
                            </div>
                            <p className="ml-16 truncate text-sm font-medium text-gray-500">{stat.label}</p>
                        </dt>
                        <dd className="ml-16 flex items-baseline pb-1 sm:pb-7">
                            <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                            <p className={`ml-2 flex items-baseline text-sm font-semibold ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                                {stat.change}
                            </p>
                        </dd>
                    </div>
                ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Area Chart */}
                <div className="lg:col-span-2 rounded-lg bg-white p-6 shadow-sm border border-gray-100">
                    <h3 className="text-base font-semibold leading-6 text-gray-900 mb-4">User Growth & Activity</h3>
                    <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                                <Tooltip
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Area type="monotone" dataKey="users" stroke="#3b82f6" fillOpacity={1} fill="url(#colorUsers)" strokeWidth={2} />
                                <Area type="monotone" dataKey="active" stroke="#10b981" fill="none" strokeWidth={2} strokeDasharray="5 5" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Pie Chart */}
                <div className="rounded-lg bg-white p-6 shadow-sm border border-gray-100">
                    <h3 className="text-base font-semibold leading-6 text-gray-900 mb-4">User Distribution</h3>
                    <div className="h-60 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={roleData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {roleData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend verticalAlign="bottom" height={36} iconType="circle" />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="mt-4 space-y-2">
                        {roleData.map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[idx] }}></span>
                                    <span className="text-gray-600">{item.name}</span>
                                </div>
                                <span className="font-medium text-gray-900">{item.value} users</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;