import React from 'react';
import { MenuIcon, SearchIcon } from '../../components/icons/icons'

interface HeaderProps {
    toggleSidebar: () => void;
    handleLogout: () => void;
}

const InstructorPageHeader: React.FC<HeaderProps> = ({ toggleSidebar, handleLogout }) => {
    return (
        <header className="bg-white shadow-sm flex items-center justify-between p-4 z-10 shrink-0">
            <div className="flex items-center">
                <button onClick={toggleSidebar} className="text-gray-500 lg:hidden mr-4">
                    <MenuIcon className="w-6 h-6" />
                </button>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <SearchIcon className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full max-w-xs pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-300 focus:border-green-300"
                    />
                </div>
            </div>
            <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                <button
                    onClick={handleLogout}
                    className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                    Logout
                </button>
            </div>
        </header>
    );
};

export default InstructorPageHeader;