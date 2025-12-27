import React from 'react';
import { Edit2, Trash2, Search } from 'lucide-react';
import Pagination from './Pagination';

export interface Column<T> {
    key: keyof T | string;
    label: string;
    render?: (row: T) => React.ReactNode; // tùy biến render cell
    width?: string;
    className?: string;
}

export interface RowAction<T> {
    label: string;
    icon?: React.ReactNode;
    onClick: (row: T) => void;
    className?: string;
    title?: string;
}

export interface TableProps<T> {
    columns: Column<T>[];
    data: T[];
    rowKey: keyof T;
    actions?: RowAction<T>[];
    selectedItems?: Set<any>;
    onToggleSelect?: (id: any) => void;
    onToggleSelectAll?: () => void;
    searchTerm?: string;
    onSearch?: (value: string) => void;
    pagination?: {
        currentPage: number;
        totalItems: number;
        pageSize: number;
        onPageChange: (page: number) => void;
    };
}

function DataTable<T extends { id?: any }>({
    columns,
    data,
    rowKey,
    actions = [],
    selectedItems = new Set(),
    onToggleSelect,
    onToggleSelectAll,
    searchTerm = '',
    onSearch,
    pagination,
}: TableProps<T>) {
    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {/* Table Actions / Search */}
            <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gray-50/50">
                {onSearch && (
                    <div className="relative rounded-md shadow-sm max-w-md w-full">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <Search className="h-4 w-4 text-gray-400" aria-hidden="true" />
                        </div>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => onSearch(e.target.value)}
                            className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand-600 sm:text-sm sm:leading-6"
                            placeholder="Lọc..."
                        />
                    </div>
                )}

                {selectedItems.size > 0 && (
                    <div className="flex items-center gap-2 bg-brand-50 px-3 py-1.5 rounded-md border border-brand-100">
                        <span className="text-sm text-brand-700 font-medium">Đã chọn {selectedItems.size}</span>
                        <div className="h-4 w-px bg-brand-200 mx-1"></div>
                        {actions
                            .filter(a => a.label.toLowerCase().includes('delete')) // ví dụ lọc action delete
                            .map((action) => (
                                <button
                                    key={action.label}
                                    onClick={() => data.forEach(row => selectedItems.has((row as any)[rowKey]) && action.onClick(row))}
                                    className="text-sm text-red-600 hover:text-red-800 font-medium flex items-center gap-1"
                                >
                                    {action.icon || <Trash2 size={14} />} {action.label}
                                </button>
                            ))}
                    </div>
                )}
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                        <tr>
                            {onToggleSelectAll && (
                                <th className="relative px-7 sm:w-12 sm:px-6">
                                    <input
                                        type="checkbox"
                                        className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-brand-600 focus:ring-brand-600"
                                        checked={selectedItems.size === data.length && data.length > 0}
                                        onChange={onToggleSelectAll}
                                    />
                                </th>
                            )}
                            {columns.map(col => (
                                <th
                                    key={col.key as any}
                                    scope="col"
                                    className={`px-3 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 ${col.className || ''}`}
                                    style={{ width: col.width }}
                                >
                                    {col.label}
                                </th>
                            ))}
                            {actions.length > 0 && <th className="relative py-3.5 pl-3 pr-4 sm:pr-6"><span className="sr-only">Thao tác</span></th>}
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200 bg-white">
                        {data.length === 0 ? (
                            <tr>
                                <td colSpan={columns.length + (actions.length > 0 ? 2 : 0)} className="py-8 text-center text-gray-500">
                                    Không có dữ liệu.
                                </td>
                            </tr>
                        ) : (
                            data.map(row => (
                                <tr
                                    key={String((row as any)[rowKey])}
                                    className={selectedItems.has(row[rowKey]) ? 'bg-brand-50/30' : 'hover:bg-gray-50/50 transition-colors'}
                                >
                                    {onToggleSelect && (
                                        <td className="relative px-7 sm:w-12 sm:px-6">
                                            {selectedItems.has(row[rowKey]) && <div className="absolute inset-y-0 left-0 w-0.5 bg-brand-600" />}
                                            <input
                                                type="checkbox"
                                                className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-brand-600 focus:ring-brand-600"
                                                checked={selectedItems.has((row as any)[rowKey])}
                                                onChange={() => onToggleSelect && onToggleSelect((row as any)[rowKey])}
                                            />
                                        </td>
                                    )}

                                    {columns.map(col => (
                                        <td key={col.key as any} className={`whitespace-nowrap px-3 py-4 text-sm ${col.className || ''}`}>
                                            {col.render ? col.render(row) : (row as any)[col.key]}
                                        </td>
                                    ))}

                                    {actions.length > 0 && (
                                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                            <div className="flex justify-end gap-2">
                                                {actions.map(action => (
                                                    <button
                                                        key={action.label}
                                                        onClick={() => action.onClick(row)}
                                                        className={action.className || 'text-brand-600 hover:text-brand-900 p-1 hover:bg-brand-50 rounded'}
                                                        title={action.title || action.label}
                                                    >
                                                        {action.icon || action.label}
                                                    </button>
                                                ))}
                                            </div>
                                        </td>
                                    )}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {pagination && (
                <Pagination
                    currentPage={pagination.currentPage}
                    totalItems={pagination.totalItems}
                    pageSize={pagination.pageSize}
                    onPageChange={pagination.onPageChange}
                    itemName="mục"
                />
            )}
        </div>
    );
}

export default DataTable;
