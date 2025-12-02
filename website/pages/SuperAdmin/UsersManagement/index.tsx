import React, { useState } from 'react';
import { Accounts } from '../../../types/types';
import { Edit2, Trash2, Download, Plus, Search } from 'lucide-react';
import AccountModal from './AccountModal';
import Pagination from '../../../components/Pagination';
import DataTable from '../../../components/DataTable'

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
                        className="inline-flex items-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold text-white bg-blue-500 hover:bg-blue-600"
                    >
                        <Plus className="-ml-0.5 h-4 w-4" aria-hidden="true" />
                        Add User
                    </button>
                </div>
            </div>

            <DataTable
                columns={[
                    { key: 'full_name', label: 'Name', render: (row) => row.full_name },
                    { key: 'email', label: 'Email' },
                    { key: 'role', label: 'Role', render: (row) => <span>{getRoleName(row.role)}</span> },
                    { key: 'status', label: 'Status', render: (row) => <span>{getStatusLabel(row.status)}</span> },
                    { key: 'created_at', label: 'Created At' },
                ]}
                data={paginatedUsers}
                rowKey="id"
                selectedItems={selectedUsers}
                onToggleSelect={toggleSelectUser}
                onToggleSelectAll={toggleSelectAll}
                actions={[
                    { label: 'Edit', icon: <Edit2 size={16} />, onClick: (row) => handleEdit(row) },
                    { label: 'Delete', icon: <Trash2 size={16} />, onClick: (row) => handleDelete(row.id) },
                ]}
                searchTerm={searchTerm}
                onSearch={setSearchTerm}
                pagination={{ currentPage, totalItems, pageSize, onPageChange: setCurrentPage }}
            />


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