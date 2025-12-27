/**
 * CONFIRMATION MODAL
 * Reusable confirmation dialog (NO alert())
 * ESC key = Cancel
 */

import React, { useEffect, useRef } from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface ConfirmationModalProps {
    isOpen: boolean;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm: () => void;
    onCancel: () => void;
    variant?: 'danger' | 'warning' | 'info';
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
    isOpen,
    title,
    message,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    onConfirm,
    onCancel,
    variant = 'warning'
}) => {
    const modalRef = useRef<HTMLDivElement>(null);

    // ESC key handler - Cancel on ESC
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                e.preventDefault();
                onCancel();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        // Auto-focus modal for accessibility
        modalRef.current?.focus();

        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onCancel]);

    if (!isOpen) return null;

    const variantStyles = {
        danger: {
            bg: 'bg-red-50',
            icon: 'text-red-600',
            button: 'bg-red-600 hover:bg-red-700'
        },
        warning: {
            bg: 'bg-yellow-50',
            icon: 'text-yellow-600',
            button: 'bg-yellow-600 hover:bg-yellow-700'
        },
        info: {
            bg: 'bg-blue-50',
            icon: 'text-blue-600',
            button: 'bg-blue-600 hover:bg-blue-700'
        }
    };

    const styles = variantStyles[variant];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onCancel}
            />

            {/* Modal */}
            <div
                ref={modalRef}
                tabIndex={-1}
                className="relative bg-white rounded-xl shadow-2xl max-w-md w-full p-6 animate-in fade-in zoom-in duration-200 outline-none"
            >
                {/* Close button */}
                <button
                    onClick={onCancel}
                    className="absolute top-4 right-4 p-1 text-slate-400 hover:text-slate-600 rounded"
                >
                    <X size={18} />
                </button>

                {/* Icon */}
                <div className={`w-12 h-12 ${styles.bg} rounded-full flex items-center justify-center mb-4`}>
                    <AlertTriangle className={styles.icon} size={24} />
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-slate-800 mb-2">{title}</h3>
                <p className="text-sm text-slate-600 mb-6">{message}</p>

                {/* Actions */}
                <div className="flex gap-3">
                    <button
                        onClick={onCancel}
                        className="flex-1 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 transition-colors"
                    >
                        {cancelText}
                    </button>
                    <button
                        onClick={() => {
                            onConfirm();
                            onCancel();
                        }}
                        className={`flex-1 px-4 py-2 text-white rounded-lg font-medium transition-colors ${styles.button}`}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};
