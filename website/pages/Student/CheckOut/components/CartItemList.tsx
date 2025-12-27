import React from 'react';
import { Trash2, Star, Clock, Users } from 'lucide-react';
import { CartItem } from '../../../../hooks/student/useCheckoutFlow';

interface CartItemListProps {
    items: CartItem[];
    onRemoveItem: (id: number) => void;
}

export const CartItemList: React.FC<CartItemListProps> = ({ items, onRemoveItem }) => {
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

    return (
        <div className="space-y-4">
            {items.map((item) => (
                <div key={item.id} className="flex gap-4 pb-4 border-b border-slate-100 last:border-0 last:pb-0">
                    <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-32 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                        <h3 className="font-semibold text-slate-900 line-clamp-2 mb-1">{item.title}</h3>
                        <p className="text-sm text-slate-600 mb-2">
                            Giảng viên: {typeof item.instructor === 'string' ? item.instructor : (item.instructor?.full_name || 'N/A')}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-slate-500 mb-2">
                            {item.rating && (
                                <div className="flex items-center gap-1">
                                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                                    <span>{item.rating}</span>
                                </div>
                            )}
                            {item.total_students != null && (
                                <div className="flex items-center gap-1">
                                    <Users className="w-3 h-3" />
                                    <span>{(item.total_students ?? 0).toLocaleString()}</span>
                                </div>
                            )}
                            {item.total_duration && (
                                <div className="flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    <span>{formatDuration(item.total_duration)}</span>
                                </div>
                            )}
                        </div>
                        <div className="flex items-center gap-2">
                            {(item.discount_price ?? item.price ?? 0) === 0 ? (
                                <>
                                    <span className="text-lg font-bold text-green-600">Miễn phí</span>
                                    {/* Show original price if discounted to free */}
                                    {(item.price ?? 0) > 0 && (
                                        <span className="text-sm text-slate-400 line-through">{formatCurrency(item.price ?? 0)}</span>
                                    )}
                                </>
                            ) : (
                                <>
                                    <span className="text-lg font-bold text-primary">{formatCurrency(item.discount_price ?? item.price ?? 0)}</span>
                                    {(item.price ?? 0) > (item.discount_price ?? item.price ?? 0) && (
                                        <span className="text-sm text-slate-400 line-through">{formatCurrency(item.price ?? 0)}</span>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                    <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-red-500 hover:text-red-700 p-2 h-fit"
                    >
                        <Trash2 className="w-5 h-5" />
                    </button>
                </div>
            ))}
        </div>
    );
};
