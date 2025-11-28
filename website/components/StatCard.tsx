import { TrendingUp } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, color, trend }: any) => (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex items-center justify-between">
            <div>
                <p className="text-sm font-medium text-gray-500">{title}</p>
                <h3 className="text-2xl font-bold mt-2 text-gray-900">{value}</h3>
                <p className={`text-sm mt-2 flex items-center ${trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    <TrendingUp className="w-4 h-4 mr-1" />
                    {Math.abs(trend)}% from last month
                </p>
            </div>
            <div className={`p-3 rounded-full ${color} bg-opacity-10`}>
                <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
            </div>
        </div>
    </div>
);

export default StatCard;