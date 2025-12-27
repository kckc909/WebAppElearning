import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
    currentPage: number;
    totalItems: number;
    pageSize: number;
    onPageChange: (page: number) => void;
    itemName?: string;
}

const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalItems,
    pageSize,
    onPageChange,
    itemName = 'kết quả'
}) => {
    const totalPages = Math.ceil(totalItems / pageSize);
    const startItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
    const endItem = Math.min(currentPage * pageSize, totalItems);

    if (totalItems === 0) return null;

    return (
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-700">
                        Hiển thị <span className="font-medium">{startItem}</span> đến <span className="font-medium">{endItem}</span> của <span className="font-medium">{totalItems}</span> {itemName}
                    </p>
                </div>
                <div>
                    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                        <button
                            onClick={() => onPageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <span className="sr-only">Trước</span>
                            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                        </button>

                        {/* Simple Page Numbers Logic: Show current, maybe simple logic for now */}
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                            // Only show first, last, current, and neighbors (simplified for this demo to just show all or limit if needed, 
                            // but for < 10 pages showing all is fine. For scalable solution, logic would be more complex)
                            if (totalPages > 7 && Math.abs(page - currentPage) > 2 && page !== 1 && page !== totalPages) {
                                if (Math.abs(page - currentPage) === 3) return <span key={page} className="px-2 py-2 text-gray-400">...</span>;
                                return null;
                            }

                            return (
                                <button
                                    key={page}
                                    onClick={() => onPageChange(page)}
                                    className={`relative z-10 inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${page === currentPage
                                        ? 'bg-brand-600 text-white focus-visible:outline-brand-600'
                                        : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
                                        }`}
                                >
                                    {page}
                                </button>
                            );
                        })}

                        <button
                            onClick={() => onPageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <span className="sr-only">Sau</span>
                            <ChevronRight className="h-5 w-5" aria-hidden="true" />
                        </button>
                    </nav>
                </div>
            </div>

            {/* Mobile View */}
            <div className="flex items-center justify-between sm:hidden w-full">
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                >
                    Trước
                </button>
                <span className="text-sm text-gray-700">
                    Trang {currentPage} / {totalPages}
                </span>
                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                >
                    Sau
                </button>
            </div>
        </div>
    );
};

export default Pagination;
