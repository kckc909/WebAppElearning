import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, ShoppingCart as CartIcon, ArrowRight, Loader2, Star, Clock, Users } from 'lucide-react';
import toast from 'react-hot-toast';
import { useCart } from '../../../contexts/CartContext';

const StudentCart: React.FC = () => {
    const navigate = useNavigate();
    const { items, removeItem, clearCart, itemCount, total, loading, refreshCart } = useCart();

    // Refresh cart when page loads
    useEffect(() => {
        refreshCart();
    }, []);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(amount);
    };

    const formatDuration = (minutes: number) => {
        const hours = Math.floor(minutes / 60);
        return `${hours}h`;
    };

    const handleRemoveItem = async (courseId: number) => {
        try {
            await removeItem(courseId);
            toast.success('Đã xóa khóa học khỏi giỏ hàng');
        } catch (error) {
            toast.error('Không thể xóa khóa học');
        }
    };

    const handleClearCart = async () => {
        if (window.confirm('Bạn có chắc muốn xóa toàn bộ giỏ hàng?')) {
            try {
                await clearCart();
                toast.success('Đã xóa toàn bộ giỏ hàng');
            } catch (error) {
                toast.error('Không thể xóa giỏ hàng');
            }
        }
    };

    const handleCheckout = () => {
        if (items.length === 0) {
            toast.error('Giỏ hàng trống!');
            return;
        }
        navigate('/checkout');
    };

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto py-12">
                <div className="flex items-center justify-center py-20">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    <span className="ml-3 text-slate-600">Đang tải giỏ hàng...</span>
                </div>
            </div>
        );
    }

    if (items.length === 0) {
        return (
            <div className="max-w-7xl mx-auto py-12">
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
                    <CartIcon className="w-20 h-20 mx-auto text-slate-300 mb-4" />
                    <h2 className="text-2xl font-bold text-secondary mb-2">Giỏ hàng trống</h2>
                    <p className="text-slate-600 mb-6">Bạn chưa có khóa học nào trong giỏ hàng</p>
                    <button
                        onClick={() => navigate('/courses')}
                        className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors font-semibold"
                    >
                        Khám phá khóa học
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto py-8">
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-secondary">Giỏ hàng</h1>
                    <p className="text-slate-600 mt-1">{itemCount} khóa học</p>
                </div>
                {items.length > 0 && (
                    <button
                        onClick={handleClearCart}
                        className="text-red-500 hover:text-red-700 text-sm font-medium"
                    >
                        Xóa tất cả
                    </button>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left: Cart Items */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 divide-y divide-slate-100">
                        {items.map((item) => (
                            <div key={item.id} className="p-6 hover:bg-slate-50 transition-colors">
                                <div className="flex gap-4">
                                    {/* Thumbnail */}
                                    <img
                                        src={item.thumbnail}
                                        alt={item.title}
                                        className="w-40 h-24 object-cover rounded-lg flex-shrink-0"
                                    />

                                    {/* Info */}
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-semibold text-slate-900 line-clamp-2 mb-2">
                                            {item.title}
                                        </h3>
                                        <p className="text-sm text-slate-600 mb-3">
                                            Giảng viên: {item.instructor}
                                        </p>

                                        {/* Stats */}
                                        <div className="flex items-center gap-4 text-xs text-slate-500 mb-3">
                                            {item.rating && (
                                                <div className="flex items-center gap-1">
                                                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                                                    <span>{item.rating}</span>
                                                </div>
                                            )}
                                            {item.total_students != null && (
                                                <div className="flex items-center gap-1">
                                                    <Users className="w-3 h-3" />
                                                    <span>{item.total_students.toLocaleString()}</span>
                                                </div>
                                            )}
                                            {item.total_duration && (
                                                <div className="flex items-center gap-1">
                                                    <Clock className="w-3 h-3" />
                                                    <span>{formatDuration(item.total_duration)}</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Price & Actions */}
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                {(item.discount_price ?? item.price) === 0 ? (
                                                    <>
                                                        <span className="text-lg font-bold text-green-600">Miễn phí</span>
                                                        {/* Show original price if discounted to free */}
                                                        {item.price > 0 && (
                                                            <span className="text-sm text-slate-400 line-through">
                                                                {formatCurrency(item.price)}
                                                            </span>
                                                        )}
                                                    </>
                                                ) : (
                                                    <>
                                                        <span className="text-lg font-bold text-primary">
                                                            {formatCurrency(item.discount_price)}
                                                        </span>
                                                        {item.price > item.discount_price && (
                                                            <span className="text-sm text-slate-400 line-through">
                                                                {formatCurrency(item.price)}
                                                            </span>
                                                        )}
                                                    </>
                                                )}
                                            </div>

                                            <button
                                                onClick={() => handleRemoveItem(item.course_id)}
                                                className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors"
                                                title="Xóa khỏi giỏ hàng"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right: Summary */}
                <div>
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sticky top-24">
                        <h3 className="font-bold text-secondary mb-4">Tổng đơn hàng</h3>

                        <div className="space-y-3 mb-4">
                            <div className="flex justify-between text-slate-700">
                                <span>Tạm tính ({itemCount} khóa học)</span>
                                <span>{formatCurrency(total)}</span>
                            </div>

                            <div className="border-t border-slate-200 pt-3 flex justify-between text-lg font-bold text-secondary">
                                <span>Tổng cộng</span>
                                <span className="text-primary">{formatCurrency(total)}</span>
                            </div>
                        </div>

                        <button
                            onClick={handleCheckout}
                            className="w-full px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors font-semibold flex items-center justify-center gap-2"
                        >
                            Thanh toán
                            <ArrowRight className="w-5 h-5" />
                        </button>

                        <p className="text-xs text-slate-500 text-center mt-4">
                            Bạn có thể tiếp tục mua sắm và thanh toán sau
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentCart;
