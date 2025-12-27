import React, { useState, useEffect } from 'react';
import { Award, Download, Share2, Search, Filter, ExternalLink, CheckCircle, Eye } from 'lucide-react';
import CertificateDialog from '../../../components/CertificateDialog';
import { useMyCertificates } from '../../../hooks/useApi';

// Certificate type
type Certificate = {
    id: number;
    courseId?: number;
    courseTitle: string;
    instructor: string;
    instructorName?: string;
    category: string;
    completedAt?: string;
    issuedDate?: string;
    certificateCode: string;
    certificateUrl: string;
    verificationUrl: string;
    user_id: number;
    studentName?: string;
    studentId?: number;
};

const StudentCertificates: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState<string>('all');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
    const [showPreview, setShowPreview] = useState(false);

    // Get current user ID from localStorage
    const getCurrentUserId = (): number => {
        const accountData = sessionStorage.getItem('Account');
        if (accountData) {
            try {
                const account = JSON.parse(accountData);
                return account.id || 0;
            } catch {
                return 0;
            }
        }
        return 0;
    };

    const currentUserId = getCurrentUserId();

    // Get certificates from API hook
    const { data: certificatesData, loading, error, refetch } = useMyCertificates(currentUserId);

    useEffect(() => {
        if (currentUserId) {
            refetch();
        }
    }, [currentUserId]);

    const certificates = certificatesData || [];

    // Debug log
    console.log('Certificates Page - Data:', {
        currentUserId,
        certificatesData,
        certificates,
        loading,
        error
    });


    const categories = ['all', ...Array.from(new Set(certificates.map((c) => c.category)))];

    const filteredCertificates = certificates.filter((cert) => {
        const matchesSearch = cert.courseTitle.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = categoryFilter === 'all' || cert.category === categoryFilter;
        return matchesSearch && matchesCategory;
    });

    const formatDate = (dateString?: string) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const handleDownload = (cert: Certificate) => {
        console.log('Downloading certificate:', cert.certificateCode);
        // TODO: Implement download
    };

    const handleShare = (cert: Certificate) => {
        if (navigator.share) {
            navigator.share({
                title: `Chứng chỉ: ${cert.courseTitle}`,
                text: `Tôi đã hoàn thành khóa học ${cert.courseTitle}!`,
                url: cert.verificationUrl,
            });
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(cert.verificationUrl);
            alert('Đã copy link xác minh vào clipboard!');
        }
    };

    const handlePreview = (cert: Certificate) => {
        setSelectedCertificate(cert);
        setShowPreview(true);
    };

    const CertificateCard: React.FC<{ certificate: Certificate }> = ({ certificate }) => (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow group">
            {/* Certificate Preview */}
            <div className="relative aspect-[16/10] bg-gradient-to-br from-blue-50 to-indigo-50 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center p-6">
                    <div className="text-center">
                        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-indigo-600 flex items-center justify-center">
                            <Award className="w-10 h-10 text-white" />
                        </div>
                        <h3 className="text-lg font-bold text-secondary mb-2 line-clamp-2">{certificate.courseTitle}</h3>
                        <p className="text-sm text-slate-600">Giảng viên: {certificate.instructor}</p>
                        <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 bg-white rounded-full text-xs font-medium text-primary border border-primary">
                            <CheckCircle className="w-3 h-3" />
                            Đã xác minh
                        </div>
                    </div>
                </div>
                {/* Decorative elements */}
                <div className="absolute top-4 left-4 w-16 h-16 border-4 border-primary/20 rounded-full"></div>
                <div className="absolute bottom-4 right-4 w-12 h-12 border-4 border-indigo-600/20 rounded-full"></div>
            </div>

            {/* Certificate Info */}
            <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <p className="text-xs text-slate-500 mb-1">Mã chứng chỉ</p>
                        <p className="text-sm font-mono font-semibold text-slate-900">{certificate.certificateCode}</p>
                    </div>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                        {certificate.category}
                    </span>
                </div>

                <div className="mb-4">
                    <p className="text-xs text-slate-500 mb-1">Ngày cấp</p>
                    <p className="text-sm text-slate-900">{formatDate(certificate.issuedDate)}</p>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                    <button
                        onClick={() => handlePreview(certificate)}
                        className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors flex items-center justify-center gap-2 text-sm font-medium"
                    >
                        <Eye className="w-4 h-4" />
                        Xem chi tiết
                    </button>
                    <button
                        onClick={() => handleDownload(certificate)}
                        className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors flex items-center justify-center"
                    >
                        <Download className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => handleShare(certificate)}
                        className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors flex items-center justify-center"
                    >
                        <Share2 className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );

    const CertificateListItem: React.FC<{ certificate: Certificate }> = ({ certificate }) => (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex gap-6">
                {/* Preview */}
                <div className="flex-shrink-0 w-32 h-20 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
                    <Award className="w-8 h-8 text-primary" />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-secondary mb-2">{certificate.courseTitle}</h3>
                    <div className="flex flex-wrap gap-4 text-sm text-slate-600 mb-3">
                        <span>Giảng viên: {certificate.instructor}</span>
                        <span>•</span>
                        <span>Mã: {certificate.certificateCode}</span>
                        <span>•</span>
                        <span>{formatDate(certificate.issuedDate)}</span>
                    </div>
                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                        {certificate.category}
                    </span>
                </div>

                {/* Actions */}
                <div className="flex-shrink-0 flex flex-col gap-2">
                    <button
                        onClick={() => handleDownload(certificate)}
                        className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors flex items-center gap-2 text-sm font-medium whitespace-nowrap"
                    >
                        <Download className="w-4 h-4" />
                        Tải xuống
                    </button>
                    <div className="flex gap-2">
                        <button
                            onClick={() => handleShare(certificate)}
                            className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors flex items-center justify-center"
                        >
                            <Share2 className="w-4 h-4" />
                        </button>
                        <a
                            href={certificate.verificationUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors flex items-center justify-center"
                        >
                            <ExternalLink className="w-4 h-4" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );

    // Loading state
    if (loading) {
        return (
            <div className="max-w-7xl mx-auto py-20">
                <div className="flex flex-col items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
                    <p className="text-slate-600">Đang tải chứng chỉ...</p>
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="max-w-7xl mx-auto py-20">
                <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
                    <p className="text-red-600 font-semibold mb-2">Lỗi khi tải chứng chỉ</p>
                    <p className="text-red-500 text-sm mb-4">{error}</p>
                    <button
                        onClick={() => refetch()}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                        Thử lại
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-3xl font-bold text-secondary">Chứng chỉ của tôi</h1>
                    <p className="text-slate-600 mt-1">Quản lý và chia sẻ chứng chỉ của bạn</p>
                </div>
                <div className="flex items-center gap-2 bg-white rounded-lg border border-slate-200 p-1">
                    <button
                        onClick={() => setViewMode('grid')}
                        className={`px-3 py-2 rounded ${viewMode === 'grid' ? 'bg-primary text-white' : 'text-slate-600 hover:bg-slate-100'
                            }`}
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                        </svg>
                    </button>
                    <button
                        onClick={() => setViewMode('list')}
                        className={`px-3 py-2 rounded ${viewMode === 'list' ? 'bg-primary text-white' : 'text-slate-600 hover:bg-slate-100'
                            }`}
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-slate-600">Tổng chứng chỉ</p>
                            <p className="text-3xl font-bold text-primary mt-1">{certificates.length}</p>
                        </div>
                        <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center">
                            <Award className="w-7 h-7 text-primary" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-slate-600">Danh mục</p>
                            <p className="text-3xl font-bold text-green-600 mt-1">{categories.length - 1}</p>
                        </div>
                        <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
                            <Filter className="w-7 h-7 text-green-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-slate-600">Mới nhất</p>
                            <p className="text-lg font-bold text-purple-600 mt-1">
                                {formatDate(certificates[0]?.issuedDate || new Date().toISOString())}
                            </p>
                        </div>
                        <div className="w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center">
                            <CheckCircle className="w-7 h-7 text-purple-600" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Search */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Tìm kiếm</label>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Tìm theo tên khóa học..."
                                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                            />
                        </div>
                    </div>

                    {/* Category Filter */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Danh mục</label>
                        <select
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                        >
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat === 'all' ? 'Tất cả danh mục' : cat}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Certificates Display */}
            {filteredCertificates.length > 0 ? (
                viewMode === 'grid' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredCertificates.map((cert) => (
                            <CertificateCard key={cert.id} certificate={cert} />
                        ))}
                    </div>
                ) : (
                    <div className="space-y-4">
                        {filteredCertificates.map((cert) => (
                            <CertificateListItem key={cert.id} certificate={cert} />
                        ))}
                    </div>
                )
            ) : (
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12">
                    <div className="flex flex-col items-center text-center">
                        <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                            <Award className="w-10 h-10 text-slate-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-slate-900 mb-2">Không tìm thấy chứng chỉ</h3>
                        <p className="text-slate-600 mb-6">Thử thay đổi bộ lọc hoặc hoàn thành khóa học để nhận chứng chỉ</p>
                    </div>
                </div>
            )}

            {/* Certificate Preview Dialog */}
            <CertificateDialog
                isOpen={showPreview}
                onClose={() => {
                    setShowPreview(false);
                    setSelectedCertificate(null);
                }}
                certificate={selectedCertificate ? {
                    id: selectedCertificate.id,
                    course_id: selectedCertificate.courseId || selectedCertificate.id,
                    course_title: selectedCertificate.courseTitle,
                    student_name: selectedCertificate.studentName || 'Học viên',
                    instructor_name: selectedCertificate.instructorName || selectedCertificate.instructor,
                    certificate_url: selectedCertificate.certificateUrl,
                    issued_at: selectedCertificate.issuedDate,
                    certificate_code: selectedCertificate.certificateCode
                } : null}
            />
        </div>
    );
};

export default StudentCertificates;