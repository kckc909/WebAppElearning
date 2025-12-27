/**
 * FILE UPLOADER Component
 * Beautiful drag-and-drop file uploader with progress indicator
 */

import React, { useState, useRef } from 'react';
import { Upload, File, CheckCircle, AlertCircle, X, Loader } from 'lucide-react';

interface FileUploaderProps {
    accept?: string;
    onUploadSuccess: (data: { url: string; filename: string }) => void;
    label?: string;
    hint?: string;
    maxSize?: number; // in MB
}

export const FileUploader: React.FC<FileUploaderProps> = ({
    accept = '*/*',
    onUploadSuccess,
    label = 'Upload File',
    hint = 'Drag and drop your file here, or click to browse',
    maxSize = 500 // 500MB default
}) => {
    const [isDragging, setIsDragging] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [error, setError] = useState<string | null>(null);
    const [uploadedFile, setUploadedFile] = useState<{ name: string; size: number } | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const formatFileSize = (bytes: number): string => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
    };

    const handleFile = async (file: File) => {
        setError(null);

        // Validate file size
        if (file.size > maxSize * 1024 * 1024) {
            setError(`File size exceeds ${maxSize}MB limit`);
            return;
        }

        setUploadedFile({ name: file.name, size: file.size });

        // STEP 1: Create blob URL for immediate preview
        const blobUrl = URL.createObjectURL(file);
        
        // Immediately show preview with blob URL
        onUploadSuccess({
            url: blobUrl,
            filename: file.name
        });

        // STEP 2: Upload to server in background
        setIsUploading(true);
        setUploadProgress(0);

        try {
            const formData = new FormData();
            formData.append('file', file);

            const STORAGE_URL = import.meta.env.VITE_STORAGE_SERVER_URL || 'http://localhost:3001';

            // Mock progress for better UX (since fetch doesn't support upload progress)
            const progressInterval = setInterval(() => {
                setUploadProgress((prev) => {
                    if (prev >= 90) {
                        clearInterval(progressInterval);
                        return prev;
                    }
                    return prev + 10;
                });
            }, 200);

            const response = await fetch(`${STORAGE_URL}/upload`, {
                method: 'POST',
                body: formData,
            });

            clearInterval(progressInterval);

            if (!response.ok) {
                throw new Error('Upload failed');
            }

            const data = await response.json();
            setUploadProgress(100);

            // STEP 3: Replace blob URL with server URL
            onUploadSuccess({
                url: data.url,
                filename: file.name
            });

            // Clean up blob URL
            URL.revokeObjectURL(blobUrl);

            // Reset after 2 seconds
            setTimeout(() => {
                setIsUploading(false);
                setUploadProgress(0);
            }, 2000);

        } catch (err) {
            console.error('Upload error:', err);
            setError('⚠️ File preview available, but upload to server failed. Video will not be saved permanently.');
            setIsUploading(false);
            setUploadProgress(0);
            
            // Keep blob URL for preview, but show warning
            // Don't remove uploadedFile so user knows file is selected
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);

        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFile(files[0]);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            handleFile(files[0]);
        }
    };

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const handleRemove = () => {
        setUploadedFile(null);
        setUploadProgress(0);
        setError(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className="space-y-3">
            <label className="block text-sm font-medium text-slate-700">
                {label}
            </label>

            {/* Upload Area */}
            <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={handleClick}
                className={`
                    relative border-2 border-dashed rounded-xl p-6 transition-all cursor-pointer
                    ${isDragging
                        ? 'border-blue-500 bg-blue-50 scale-[1.02]'
                        : 'border-slate-300 hover:border-blue-400 hover:bg-slate-50'
                    }
                    ${isUploading ? 'pointer-events-none opacity-60' : ''}
                `}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    accept={accept}
                    onChange={handleFileSelect}
                    className="hidden"
                />

                <div className="flex flex-col items-center gap-3 text-center">
                    {isUploading ? (
                        <>
                            <Loader className="w-10 h-10 text-blue-500 animate-spin" />
                            <div className="w-full max-w-xs">
                                <div className="flex justify-between text-xs text-slate-600 mb-1">
                                    <span>Uploading...</span>
                                    <span>{uploadProgress}%</span>
                                </div>
                                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-blue-500 transition-all duration-300"
                                        style={{ width: `${uploadProgress}%` }}
                                    />
                                </div>
                                {uploadedFile && (
                                    <p className="text-xs text-slate-500 mt-2">{uploadedFile.name}</p>
                                )}
                            </div>
                        </>
                    ) : uploadProgress === 100 ? (
                        <>
                            <CheckCircle className="w-10 h-10 text-green-500" />
                            <div className="text-sm">
                                <p className="font-medium text-green-700">Upload successful!</p>
                                <p className="text-xs text-green-600 mt-1">{uploadedFile?.name}</p>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className={`
                                p-3 rounded-full transition-colors
                                ${isDragging ? 'bg-blue-100' : 'bg-slate-100'}
                            `}>
                                <Upload className={`w-6 h-6 ${isDragging ? 'text-blue-600' : 'text-slate-400'}`} />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-slate-700">
                                    {isDragging ? 'Drop file here' : hint}
                                </p>
                                <p className="text-xs text-slate-500 mt-1">
                                    Maximum file size: {maxSize}MB
                                </p>
                            </div>
                            <button
                                type="button"
                                className="mt-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleClick();
                                }}
                            >
                                Choose File
                            </button>
                        </>
                    )}
                </div>
            </div>

            {/* Uploaded File Info */}
            {uploadedFile && uploadProgress === 100 && !isUploading && (
                <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-3">
                        <File className="w-5 h-5 text-green-600" />
                        <div>
                            <p className="text-sm font-medium text-green-900">{uploadedFile.name}</p>
                            <p className="text-xs text-green-600">{formatFileSize(uploadedFile.size)}</p>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={handleRemove}
                        className="p-1.5 text-green-600 hover:bg-green-100 rounded transition-colors"
                        title="Remove file"
                    >
                        <X size={16} />
                    </button>
                </div>
            )}

            {/* Error Message */}
            {error && (
                <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                    <p className="text-sm text-red-700">{error}</p>
                </div>
            )}

            {/* Accepted Formats Hint */}
            {!isUploading && !uploadedFile && (
                <p className="text-xs text-slate-400">
                    Accepted formats: {accept === '*/*' ? 'All files' : accept.split(',').join(', ')}
                </p>
            )}
        </div>
    );
};
