import React, { useEffect, useState } from 'react';
import { Account } from '../../../types/types';
import { Edit2, Trash2, Download, Plus } from 'lucide-react';
import AccountModal from './AccountModal';
import DataTable from '../../../components/DataTable'
import { useAccounts } from '../../../hooks/accounts'

// Helper for Role Mapping
export const getRoleName = (role?: number | null) => {
    switch (role) {
        case -1: return 'Superadmin';
        case 0: return 'Admin';
        case 1: return 'Instrustor';
        case 2: return 'Student';
        default: return 'Unknown';
    }
};

// Helper for Status Mapping
export const getStatusLabel = (status?: number | null) => {
    switch (status) {
        case 1: return 'Inactive';
        case 2: return 'Pending';
        case 0: return 'Active';
        default: return 'Unknown';
    }
};

const UserManagement: React.FC = () => {
    // hook
    const {
        accounts,
        loading,
        error,
        fetchAccounts,
        createAccount,
        updateAccount,
        deleteAccount,
    } = useAccounts();

    const [selectedAccounts, setSelectedAccounts] = useState<Set<number | string>>(new Set());
    const [searchTerm, setSearchTerm] = useState('');

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(5);

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<Account | null>(null);

    // 👉 Fetch users when component mounts
    useEffect(() => {
        fetchAccounts();
    }, []);

    // Filter Logic
    const filteredAccounts = accounts.filter((user) =>
        user.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Pagination Logic
    const totalItems = filteredAccounts.length;
    const paginatedAccounts = filteredAccounts.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    // Selection Logic
    const toggleSelectAll = () => {
        if (selectedAccounts.size === paginatedAccounts.length && paginatedAccounts.length > 0) {
            setSelectedAccounts(new Set());
        } else {
            setSelectedAccounts(new Set(paginatedAccounts.map(u => u.id)));
        }
    };

    const toggleSelectUser = (id: number | string) => {
        const newSelected = new Set(selectedAccounts);
        newSelected.has(id) ? newSelected.delete(id) : newSelected.add(id);
        setSelectedAccounts(newSelected);
    };

    // CRUD Handlers
    const handleAddNew = () => {
        setEditingUser(null);
        setIsModalOpen(true);
    };

    const handleEdit = (user: Account) => {
        setEditingUser(user);
        setIsModalOpen(true);
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm("Are you sure you want to delete this user?")) return;  

        await deleteAccount(id);
        await fetchAccounts(); // refresh UI
        setSelectedAccounts(prev => {
            const newSet = new Set(prev);
            newSet.delete(id);
            return newSet;
        });
    };

    const handleModalSubmit = async (data: Account) => {
        if (editingUser) {
            // UPDATE mode
            await updateAccount(editingUser.id, data);
        } else {
            // CREATE mode
            await createAccount(data);
        }

        await fetchAccounts();
        setIsModalOpen(false);
    };

    return (
        <div className="space-y-6">

            {/* Header */}
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
                        <Download className="-ml-0.5 h-4 w-4 text-gray-400" />
                        Export
                    </button>

                    <button
                        onClick={handleAddNew}
                        className="inline-flex items-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold text-white bg-blue-500 hover:bg-blue-600"
                    >
                        <Plus className="-ml-0.5 h-4 w-4" />
                        Add User
                    </button>
                </div>
            </div>

            {/* Loading */}
            {loading && <p className="text-gray-500">Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {/* Table */}
            {!loading && (
                <DataTable
                    columns={[
                        { key: 'full_name', label: 'Name' },
                        { key: 'email', label: 'Email' },
                        { key: 'username', label: 'username' },
                        { key: 'role', label: 'Role', render: row => getRoleName(row.role) },
                        { key: 'status', label: 'Status', render: row => getStatusLabel(row.status) },
                        // { key: 'created_at', label: 'Created At' },
                    ]}
                    data={paginatedAccounts}
                    rowKey="id"
                    selectedItems={selectedAccounts}
                    onToggleSelect={toggleSelectUser}
                    onToggleSelectAll={toggleSelectAll}
                    actions={[
                        { label: 'Edit', icon: <Edit2 size={16} />, onClick: row => handleEdit(row) },
                        { label: 'Delete', icon: <Trash2 size={16} />, onClick: row => handleDelete(row.id) },
                    ]}
                    searchTerm={searchTerm}
                    onSearch={setSearchTerm}
                    pagination={{ currentPage, totalItems, pageSize, onPageChange: setCurrentPage }}
                />
            )}

            {/* Modal */}
            <AccountModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleModalSubmit}
                initialData={editingUser ?? undefined}
                title={editingUser ? 'Edit Account' : 'Add New Account'}
            />
        </div>
    );
};

export default UserManagement;
