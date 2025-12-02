import React, { useState } from 'react';
import { Accounts } from '../../../types/types';
import { Edit2, Trash2, Download, Plus, Search } from 'lucide-react';
import AccountModal from './AccountModal';
import Pagination from '../../../components/Pagination';

// Helper for Role Mapping
export const getRoleName = (role?: number | null) => {
    switch (role) {
        case 1: return 'Superadmin';
        case 2: return 'Admin';
        case 3: return 'Editor';
        case 4: return 'Viewer';
        default: return 0;
    }
};

// Helper for Status Mapping
export const getStatusLabel = (status?: number | null) => {
    switch (status) {
        case 1: return 'Active';
        case 2: return 'Pending';
        case 0: return 'Inactive';
        default: return 'Unknown';
    }
};

const MOCK_ACCOUNTS: Accounts[] = [
    { id: 1, full_name: 'Alice Johnson', email: 'alice@example.com', password_hash: 'hash1', role: 1, status: 1, created_at: '2023-10-25', avatar_url: 'https://picsum.photos/seed/alice/40/40' },
    { id: 2, full_name: 'Bob Smith', email: 'bob@example.com', password_hash: 'hash2', role: 2, status: 1, created_at: '2023-10-24', avatar_url: 'https://picsum.photos/seed/bob/40/40' },
    { id: 3, full_name: 'Charlie Brown', email: 'charlie@example.com', password_hash: 'hash3', role: 3, status: 0, created_at: '2023-10-20', avatar_url: 'https://picsum.photos/seed/charlie/40/40' },
    { id: 4, full_name: 'Diana Prince', email: 'diana@example.com', password_hash: 'hash4', role: 4, status: 2, created_at: '2023-10-18', avatar_url: 'https://picsum.photos/seed/diana/40/40' },
    { id: 5, full_name: 'Evan Wright', email: 'evan@example.com', password_hash: 'hash5', role: 3, status: 1, created_at: '2023-10-25', avatar_url: 'https://picsum.photos/seed/evan/40/40' },
    { id: 6, full_name: 'Fiona Gallagher', email: 'fiona@example.com', password_hash: 'hash6', role: 4, status: 1, created_at: '2023-10-26', avatar_url: 'https://picsum.photos/seed/fiona/40/40' },
    { id: 7, full_name: 'George Martin', email: 'george@example.com', password_hash: 'hash7', role: 2, status: 0, created_at: '2023-09-15', avatar_url: 'https://picsum.photos/seed/george/40/40' },
];

const UserManagement: React.FC = () => {
    const [users, setUsers] = useState<Accounts[]>(MOCK_ACCOUNTS);
    const [selectedUsers, setSelectedUsers] = useState<Set<string | number>>(new Set());
    const [searchTerm, setSearchTerm] = useState('');

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(5);

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<Accounts | null>(null);

    // Filter Logic
    const filteredUsers = users.filter(user =>
        user.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Pagination Logic
    const totalItems = filteredUsers.length;
    const paginatedUsers = filteredUsers.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    // Selection Logic
    const toggleSelectAll = () => {
        if (selectedUsers.size === paginatedUsers.length && paginatedUsers.length > 0) {
            setSelectedUsers(new Set());
        } else {
            setSelectedUsers(new Set(paginatedUsers.map(u => u.id)));
        }
    };

    const toggleSelectUser = (id: string | number) => {
        const newSelected = new Set(selectedUsers);
        if (newSelected.has(id)) {
            newSelected.delete(id);
        } else {
            newSelected.add(id);
        }
        setSelectedUsers(newSelected);
    };

    // CRUD Handlers
    const handleAddNew = () => {
        setEditingUser(null);
        setIsModalOpen(true);
    };

    const handleEdit = (user: Accounts) => {
        setEditingUser(user);
        setIsModalOpen(true);
    };

    const handleDelete = (id: string | number) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            setUsers(prev => prev.filter(u => u.id !== id));
            setSelectedUsers(prev => {
                const newSet = new Set(prev);
                newSet.delete(id);
                return newSet;
            });
        }
    };

    const handleDeleteSelected = () => {
        if (window.confirm(`Are you sure you want to delete ${selectedUsers.size} users?`)) {
            setUsers(prev => prev.filter(u => !selectedUsers.has(u.id)));
            setSelectedUsers(new Set());
        }
    };

    const handleModalSubmit = (data: Accounts) => {
        const now = new Date().toISOString().split('T')[0];

        if (editingUser) {
            // Edit Mode
            setUsers(prev => prev.map(u => u.id === editingUser.id ? {
                ...u,
                full_name: data.full_name,
                email: data.email,
                role: data.role,
                status: data.status,
                updated_at: now
            } : u));
        } else {
            // Add Mode
            const newUser: Accounts = {
                id: Date.now(),
                full_name: data.full_name,
                email: data.email,
                role: data.role,
                status: data.status,
                password_hash: 'default_hash', // In a real app, this would be handled by backend
                created_at: now,
                updated_at: now,
                avatar_url: `https://ui-avatars.com/api/?name=${encodeURIComponent(data.full_name)}&background=random&color=fff`
            };
            setUsers(prev => [newUser, ...prev]);
        }
        setIsModalOpen(false);
    };

    const getStatusColor = (status?: number | null) => {
        switch (status) {
            case 1: return 'bg-green-100 text-green-700 ring-green-600/20'; // Active
            case 0: return 'bg-gray-100 text-gray-600 ring-gray-500/10'; // Inactive
            case 2: return 'bg-yellow-100 text-yellow-800 ring-yellow-600/20'; // Pending
            default: return 'bg-gray-50 text-gray-600';
        }
    };

    return (
        <div className="space-y-6">
            <div className="sm:flex sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
                    <p className="mt-1 text-sm text-gray-500">
                        A list of all the users (Accounts) in your system.
                    </p>
                </div>
                <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none flex gap-2">
                    <button
                        type="button"
                        className="inline-flex items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                        <Download className="-ml-0.5 h-4 w-4 text-gray-400" aria-hidden="true" />
                        Export
                    </button>
                    <button
                        type="button"
                        onClick={handleAddNew}
                        className="inline-flex items-center gap-x-1.5 rounded-md bg-brand-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
                    >
                        <Plus className="-ml-0.5 h-4 w-4" aria-hidden="true" />
                        Add User
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                {/* Table Filters/Actions */}
                <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gray-50/50">
                    <div className="relative rounded-md shadow-sm max-w-md w-full">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <Search className="h-4 w-4 text-gray-400" aria-hidden="true" />
                        </div>
                        <input
                            type="text"
                            name="filter-users"
                            id="filter-users"
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1); // Reset to page 1 on search
                            }}
                            className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand-600 sm:text-sm sm:leading-6"
                            placeholder="Filter by name or email..."
                        />
                    </div>

                    {selectedUsers.size > 0 && (
                        <div className="flex items-center gap-2 bg-brand-50 px-3 py-1.5 rounded-md border border-brand-100">
                            <span className="text-sm text-brand-700 font-medium">{selectedUsers.size} selected</span>
                            <div className="h-4 w-px bg-brand-200 mx-1"></div>
                            <button
                                onClick={handleDeleteSelected}
                                className="text-sm text-red-600 hover:text-red-800 font-medium flex items-center gap-1"
                            >
                                <Trash2 size={14} /> Delete
                            </button>
                        </div>
                    )}
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-300">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="relative px-7 sm:w-12 sm:px-6">
                                    <input
                                        type="checkbox"
                                        className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-brand-600 focus:ring-brand-600"
                                        checked={selectedUsers.size === paginatedUsers.length && paginatedUsers.length > 0}
                                        onChange={toggleSelectAll}
                                    />
                                </th>
                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 sm:pl-0">
                                    Account
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                    Role
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                    Status
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                    Created At
                                </th>
                                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                    <span className="sr-only">Edit</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {paginatedUsers.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="py-8 text-center text-gray-500">
                                        {searchTerm ? 'No users found matching your search.' : 'No users available.'}
                                    </td>
                                </tr>
                            ) : (
                                paginatedUsers.map((user) => (
                                    <tr key={user.id} className={selectedUsers.has(user.id) ? 'bg-brand-50/30' : 'hover:bg-gray-50/50 transition-colors'}>
                                        <td className="relative px-7 sm:w-12 sm:px-6">
                                            {selectedUsers.has(user.id) && (
                                                <div className="absolute inset-y-0 left-0 w-0.5 bg-brand-600" />
                                            )}
                                            <input
                                                type="checkbox"
                                                className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-brand-600 focus:ring-brand-600"
                                                value={user.id}
                                                checked={selectedUsers.has(user.id)}
                                                onChange={() => toggleSelectUser(user.id)}
                                            />
                                        </td>
                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-0">
                                            <div className="flex items-center">
                                                <div className="h-10 w-10 flex-shrink-0">
                                                    <img className="h-10 w-10 rounded-full" src={user.avatar_url || 'https://via.placeholder.com/40'} alt="" />
                                                </div>
                                                <div className="ml-4">
                                                    <div className="font-medium text-gray-900">{user.full_name}</div>
                                                    <div className="text-gray-500">{user.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                            <span className="inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                                                {getRoleName(user.role)}
                                            </span>
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm">
                                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${getStatusColor(user.status)}`}>
                                                {getStatusLabel(user.status)}
                                            </span>
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                            {user.created_at}
                                        </td>
                                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    onClick={() => handleEdit(user)}
                                                    className="text-brand-600 hover:text-brand-900 p-1 hover:bg-brand-50 rounded"
                                                    title="Edit"
                                                >
                                                    <Edit2 size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(user.id)}
                                                    className="text-gray-400 hover:text-red-600 p-1 hover:bg-red-50 rounded"
                                                    title="Delete"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Component */}
                <Pagination
                    currentPage={currentPage}
                    totalItems={totalItems}
                    pageSize={pageSize}
                    onPageChange={setCurrentPage}
                    itemName="users"
                />
            </div>

            {/* User Modal Component */}
            <AccountModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleModalSubmit}
                initialData={editingUser ? {
                    id: 0,
                    full_name: editingUser.full_name,
                    email: editingUser.email,
                    role: editingUser.role ?? 2, 
                    status: editingUser.status ?? 1, 
                    password_hash: '',
                } : undefined}
                title={editingUser ? 'Edit Account' : 'Add New Account'}
            />
        </div>
    );
};

export default UserManagement;