import React, { useState } from 'react';
import { FileText, Image, Plus, Edit, Trash2, Eye, Save } from 'lucide-react';

interface Page {
    id: number;
    title: string;
    slug: string;
    status: 'published' | 'draft';
    lastModified: string;
}

const AdminCMS: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'pages' | 'banners' | 'faq'>('pages');
    const [editingPage, setEditingPage] = useState<number | null>(null);

    const [pages] = useState<Page[]>([
        { id: 1, title: 'Trang chủ', slug: 'home', status: 'published', lastModified: '2024-12-10' },
        { id: 2, title: 'Giới thiệu', slug: 'about', status: 'published', lastModified: '2024-12-08' },
        { id: 3, title: 'Điều khoản sử dụng', slug: 'terms', status: 'published', lastModified: '2024-11-20' },
        { id: 4, title: 'Chính sách bảo mật', slug: 'privacy', status: 'published', lastModified: '2024-11-20' },
    ]);

    const [banners] = useState([
        { id: 1, title: 'Banner khuyến mãi mùa đông', image: 'https://picsum.photos/seed/banner1/1200/400', active: true },
        { id: 2, title: 'Banner khóa học mới', image: 'https://picsum.photos/seed/banner2/1200/400', active: true },
    ]);

    const [faqs] = useState([
        { id: 1, question: 'Làm thế nào để đăng ký khóa học?', answer: 'Bạn có thể đăng ký khóa học bằng cách...', category: 'Chung' },
        { id: 2, question: 'Chính sách hoàn tiền như thế nào?', answer: 'Chúng tôi có chính sách hoàn tiền trong vòng 30 ngày...', category: 'Thanh toán' },
    ]);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800">Quản lý nội dung (CMS)</h1>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                    <Plus className="w-5 h-5" />
                    Tạo mới
                </button>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="border-b border-gray-200">
                    <div className="flex gap-4 px-6">
                        {[
                            { id: 'pages', label: 'Trang', icon: FileText },
                            { id: 'banners', label: 'Banner', icon: Image },
                            { id: 'faq', label: 'FAQ', icon: FileText },
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${activeTab === tab.id
                                        ? 'border-blue-600 text-blue-600'
                                        : 'border-transparent text-gray-600 hover:text-gray-900'
                                    }`}
                            >
                                <tab.icon className="w-5 h-5" />
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="p-6">
                    {/* Pages Tab */}
                    {activeTab === 'pages' && (
                        <div className="space-y-4">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Tiêu đề</th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Slug</th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Trạng thái</th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Cập nhật</th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Hành động</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {pages.map((page) => (
                                            <tr key={page.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 font-medium text-gray-900">{page.title}</td>
                                                <td className="px-6 py-4 text-gray-600 font-mono text-sm">{page.slug}</td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${page.status === 'published'
                                                            ? 'bg-green-100 text-green-700'
                                                            : 'bg-yellow-100 text-yellow-700'
                                                        }`}>
                                                        {page.status === 'published' ? 'Đã xuất bản' : 'Nháp'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-gray-600 text-sm">
                                                    {new Date(page.lastModified).toLocaleDateString('vi-VN')}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex gap-2">
                                                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors">
                                                            <Eye className="w-4 h-4" />
                                                        </button>
                                                        <button className="p-2 text-green-600 hover:bg-green-50 rounded transition-colors">
                                                            <Edit className="w-4 h-4" />
                                                        </button>
                                                        <button className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors">
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* Banners Tab */}
                    {activeTab === 'banners' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {banners.map((banner) => (
                                <div key={banner.id} className="border border-gray-200 rounded-lg overflow-hidden">
                                    <img src={banner.image} alt={banner.title} className="w-full h-48 object-cover" />
                                    <div className="p-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <h3 className="font-semibold text-gray-900">{banner.title}</h3>
                                            <span className={`px-2 py-1 rounded text-xs font-medium ${banner.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                                                }`}>
                                                {banner.active ? 'Đang hiển thị' : 'Ẩn'}
                                            </span>
                                        </div>
                                        <div className="flex gap-2">
                                            <button className="flex-1 px-3 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded hover:bg-blue-50 transition-colors">
                                                Chỉnh sửa
                                            </button>
                                            <button className="flex-1 px-3 py-2 text-sm font-medium text-red-600 border border-red-600 rounded hover:bg-red-50 transition-colors">
                                                Xóa
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* FAQ Tab */}
                    {activeTab === 'faq' && (
                        <div className="space-y-4">
                            {faqs.map((faq) => (
                                <div key={faq.id} className="border border-gray-200 rounded-lg p-4">
                                    <div className="flex items-start justify-between mb-2">
                                        <div className="flex-1">
                                            <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded">
                                                {faq.category}
                                            </span>
                                            <h3 className="font-semibold text-gray-900 mt-2">{faq.question}</h3>
                                            <p className="text-gray-600 mt-1 text-sm">{faq.answer}</p>
                                        </div>
                                        <div className="flex gap-2 ml-4">
                                            <button className="p-2 text-green-600 hover:bg-green-50 rounded transition-colors">
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Editor (shown when editing) */}
            {editingPage && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h2 className="text-xl font-bold mb-4">Chỉnh sửa trang</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Tiêu đề</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Nhập tiêu đề trang"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Nội dung</label>
                            <textarea
                                rows={10}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Nhập nội dung trang (hỗ trợ HTML)"
                            />
                        </div>
                        <div className="flex gap-2">
                            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                                <Save className="w-5 h-5" />
                                Lưu
                            </button>
                            <button
                                onClick={() => setEditingPage(null)}
                                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                            >
                                Hủy
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminCMS;