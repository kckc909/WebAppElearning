/**
 * Certificate Dialog Component
 * Hiển thị chứng chỉ dạng dialog với preview và tải xuống
 */

import React from 'react';
import { X, Download, Share2, Award, ExternalLink, Printer } from 'lucide-react';

interface CertificateDialogProps {
    isOpen: boolean;
    onClose: () => void;
    certificate: {
        id: number;
        course_id: number;
        course_title?: string;
        student_name?: string;
        instructor_name?: string;
        certificate_url?: string;
        issued_at?: string;
        certificate_code?: string;
    } | null;
}

const CertificateDialog: React.FC<CertificateDialogProps> = ({ isOpen, onClose, certificate }) => {
    if (!isOpen || !certificate) return null;

    const formatDate = (dateStr: string | undefined) => {
        if (!dateStr) return 'N/A';
        return new Date(dateStr).toLocaleDateString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    const handleDownload = () => {
        if (certificate.certificate_url) {
            window.open(certificate.certificate_url, '_blank');
        } else {
            // Create downloadable certificate
            alert('Chức năng tải xuống chứng chỉ đang được phát triển');
        }
    };

    const handlePrint = () => {
        window.print();
    };

    const handleShare = async () => {
        const shareData = {
            title: `Chứng chỉ: ${certificate.course_title}`,
            text: `Tôi đã hoàn thành khóa học "${certificate.course_title}" tại MiLearn!`,
            url: window.location.href
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (err) {
                console.log('Share cancelled');
            }
        } else {
            navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
            alert('Đã sao chép link chia sẻ!');
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Dialog */}
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden animate-fade-in-up">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                            <Award className="w-5 h-5 text-emerald-600" />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-secondary">Chứng chỉ hoàn thành</h2>
                            <p className="text-sm text-slate-500">Mã: {certificate.certificate_code || 'CERT-XXXXX'}</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-slate-100 transition-colors"
                    >
                        <X className="w-5 h-5 text-slate-500" />
                    </button>
                </div>

                {/* Certificate Preview */}
                <div className="p-6 bg-gradient-to-br from-slate-50 to-slate-100">
                    {/* Certificate Card */}
                    <div
                        className="relative bg-white rounded-xl shadow-lg overflow-hidden border-4 border-double border-emerald-200"
                        id="certificate-preview"
                    >
                        {/* Decorative corners */}
                        <div className="absolute top-4 left-4 w-16 h-16 border-t-4 border-l-4 border-emerald-500 rounded-tl-lg"></div>
                        <div className="absolute top-4 right-4 w-16 h-16 border-t-4 border-r-4 border-emerald-500 rounded-tr-lg"></div>
                        <div className="absolute bottom-4 left-4 w-16 h-16 border-b-4 border-l-4 border-emerald-500 rounded-bl-lg"></div>
                        <div className="absolute bottom-4 right-4 w-16 h-16 border-b-4 border-r-4 border-emerald-500 rounded-br-lg"></div>

                        <div className="p-12 text-center">
                            {/* Logo */}
                            <div className="flex justify-center mb-6">
                                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-indigo-600 flex items-center justify-center">
                                    <span className="text-3xl font-bold text-white">M</span>
                                </div>
                            </div>

                            {/* Title */}
                            <h1 className="text-3xl font-serif font-bold text-secondary mb-2">
                                CHỨNG CHỈ HOÀN THÀNH
                            </h1>
                            <p className="text-slate-500 mb-8">CERTIFICATE OF COMPLETION</p>

                            {/* Recipient */}
                            <p className="text-slate-600 mb-2">Chứng nhận rằng</p>
                            <h2 className="text-2xl font-bold text-primary mb-6 border-b-2 border-primary/30 pb-2 inline-block px-8">
                                {certificate.student_name || 'Học viên'}
                            </h2>

                            {/* Course */}
                            <p className="text-slate-600 mb-2">Đã hoàn thành xuất sắc khóa học</p>
                            <h3 className="text-xl font-semibold text-secondary mb-6">
                                {certificate.course_title || 'Tên khóa học'}
                            </h3>

                            {/* Details */}
                            <div className="flex justify-center gap-12 text-sm text-slate-500 mb-8">
                                <div>
                                    <p className="font-medium text-secondary">Giảng viên</p>
                                    <p>{certificate.instructor_name || 'N/A'}</p>
                                </div>
                                <div>
                                    <p className="font-medium text-secondary">Ngày cấp</p>
                                    <p>{formatDate(certificate.issued_at)}</p>
                                </div>
                            </div>

                            {/* Signature area */}
                            <div className="flex justify-between items-end px-12 mt-8">
                                <div className="text-center">
                                    <div className="w-32 h-px bg-slate-300 mb-2"></div>
                                    <p className="text-sm text-slate-500">Giảng viên</p>
                                </div>
                                <div className="text-center">
                                    <Award className="w-16 h-16 text-emerald-500 mx-auto mb-2" />
                                    <p className="text-xs text-slate-400">MiLearn Certified</p>
                                </div>
                                <div className="text-center">
                                    <div className="w-32 h-px bg-slate-300 mb-2"></div>
                                    <p className="text-sm text-slate-500">Ban giám đốc</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 bg-white">
                    <div className="text-sm text-slate-500">
                        Cấp ngày: {formatDate(certificate.issued_at)}
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={handleShare}
                            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
                        >
                            <Share2 className="w-4 h-4" />
                            Chia sẻ
                        </button>
                        <button
                            onClick={handlePrint}
                            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
                        >
                            <Printer className="w-4 h-4" />
                            In
                        </button>
                        <button
                            onClick={handleDownload}
                            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors"
                        >
                            <Download className="w-4 h-4" />
                            Tải xuống
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CertificateDialog;
