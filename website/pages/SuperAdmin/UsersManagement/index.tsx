import React, { useEffect, useState } from 'react';
import { Account } from '../../../API/interfaces/IAccountsApi';
import { Edit2, Trash2, Download, Plus } from 'lucide-react';
import AccountModal from './AccountModal';
import DataTable from '../../../components/DataTable'
import { useAccounts } from '../../../hooks/useAccounts'

// Helper for Role Mapping
// Database trả về enum string: SUPER_ADMIN, ADMIN, INSTRUCTOR, STUDENT
export const getRoleName = (role?: string | number | null) => {
    if (typeof role === 'string') {
        switch (role.toUpperCase()) {
            case 'SUPER_ADMIN': return 'Quản trị viên cao cấp';
            case 'ADMIN': return 'Quản trị viên';
            case 'INSTRUCTOR': return 'Giảng viên';
            case 'STUDENT': return 'Học viên';
            default: return 'Không rõ';
        }
    }
    switch (role) {
        case -1: return 'Quản trị viên cao cấp';
        case 0: return 'Quản trị viên';
        case 1: return 'Giảng viên';
        case 2: return 'Học viên';
        default: return 'Không rõ';
    }
};

// Helper for Status Mapping
export const getStatusLabel = (status?: number | null) => {
    switch (status) {
        case 1: return 'Hoạt động';
        case 2: return 'Đang chờ';
        case 0: return 'Không hoạt động';
        default: return 'Không rõ';
    }
};

const UserManagement: React.FC = () => {
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
            setSelectedAccounts(new Set(paginatedAccounts.map(u => u.id).filter((id): id is number => id !== undefined)));
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
        if (!window.confirm("Bạn có chắc muốn xóa người dùng này?")) return;

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
            await updateAccount(editingUser.id!, data);
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
                    <h1 className="text-2xl font-bold text-gray-900">Quản lý người dùng</h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Danh sách tất cả người dùng (Tài khoản) trong hệ thống.
                    </p>
                </div>
                <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none flex gap-2">
                    <button
                        type="button"
                        className="inline-flex items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                        <Download className="-ml-0.5 h-4 w-4 text-gray-400" />
                        Xuất file
                    </button>

                    <button
                        onClick={handleAddNew}
                        className="inline-flex items-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold text-white bg-blue-500 hover:bg-blue-600"
                    >
                        <Plus className="-ml-0.5 h-4 w-4" />
                        Thêm người dùng
                    </button>
                </div>
            </div>

            {/* Loading */}
            {loading && <p className="text-gray-500">�ang t?i...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {/* Table */}
            {!loading && (
                <DataTable<Account>
                    columns={[
                        { key: 'full_name', label: 'Họ tên' },
                        { key: 'email', label: 'Email' },
                        { key: 'username', label: 'Tên đăng nhập' },
                        { key: 'role', label: 'Vai trò', render: row => getRoleName(row.role) },
                        { key: 'status', label: 'Trạng thái', render: row => getStatusLabel(row.status) },
                        // { key: 'created_at', label: 'Created At' },
                    ]}
                    data={paginatedAccounts}
                    rowKey="id"
                    selectedItems={selectedAccounts}
                    onToggleSelect={toggleSelectUser}
                    onToggleSelectAll={toggleSelectAll}
                    actions={[
                        { label: 'Sửa', icon: <Edit2 size={16} />, onClick: row => handleEdit(row) },
                        { label: 'Xóa', icon: <Trash2 size={16} />, onClick: row => handleDelete(row.id) },
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
                title={editingUser ? 'Sửa tài khoản' : 'Thêm tài khoản mới'}
            />
        </div>
    );
};

export default UserManagement;
