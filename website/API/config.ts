/**
 * Mock API Configuration
 * Toggle giữa Mock Data và Real Database API
 */

// Đọc từ localStorage, mặc định là false (Real API - Database)
const getApiMode = (): boolean => {
    if (typeof window === 'undefined') return false;
    const stored = localStorage.getItem('USE_MOCK_API');
    return stored === null ? false : stored === 'true';
};

// Toggle này quyết định dùng Mock hay Real API
export const USE_MOCK_API = getApiMode();

// Hàm để lấy giá trị realtime (không cache)
export const isUsingMockAPI = (): boolean => getApiMode();

// Delay mô phỏng network latency (ms)
export const MOCK_DELAY = 300;

// Helper function để simulate API delay
export const simulateDelay = (ms: number = MOCK_DELAY): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

export interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
    error?: string;
}

export const successResponse = <T>(data: T, message?: string): ApiResponse<T> => ({
    success: true,
    data,
    message
});

export const errorResponse = <T>(error: string, data?: T): ApiResponse<T> => ({
    success: false,
    data: data as T,
    error
});

// ============================================
// ERROR HANDLING HELPERS
// ============================================

export interface ApiError {
    code: string;
    message: string;
    details?: any;
}

// Các mã lỗi phổ biến
export const ERROR_CODES = {
    NETWORK_ERROR: 'NETWORK_ERROR',
    NOT_FOUND: 'NOT_FOUND',
    UNAUTHORIZED: 'UNAUTHORIZED',
    VALIDATION_ERROR: 'VALIDATION_ERROR',
    SERVER_ERROR: 'SERVER_ERROR',
    EMPTY_DATA: 'EMPTY_DATA',
    CREATE_FAILED: 'CREATE_FAILED',
    UPDATE_FAILED: 'UPDATE_FAILED',
    DELETE_FAILED: 'DELETE_FAILED',
} as const;

// Xử lý lỗi từ axios
export const handleApiError = (error: any): ApiError => {
    // Network error (không kết nối được server)
    if (error.code === 'ERR_NETWORK' || error.message === 'Network Error') {
        return {
            code: ERROR_CODES.NETWORK_ERROR,
            message: 'Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng hoặc backend.',
            details: error,
        };
    }

    // Timeout
    if (error.code === 'ECONNABORTED') {
        return {
            code: ERROR_CODES.NETWORK_ERROR,
            message: 'Yêu cầu quá thời gian chờ. Vui lòng thử lại.',
            details: error,
        };
    }

    // HTTP errors
    if (error.response) {
        const status = error.response.status;
        const data = error.response.data;

        switch (status) {
            case 400:
                return {
                    code: ERROR_CODES.VALIDATION_ERROR,
                    message: data?.message || 'Dữ liệu không hợp lệ',
                    details: data,
                };
            case 401:
                return {
                    code: ERROR_CODES.UNAUTHORIZED,
                    message: 'Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.',
                    details: data,
                };
            case 404:
                return {
                    code: ERROR_CODES.NOT_FOUND,
                    message: data?.message || 'Không tìm thấy dữ liệu',
                    details: data,
                };
            case 500:
            default:
                return {
                    code: ERROR_CODES.SERVER_ERROR,
                    message: data?.message || 'Lỗi server. Vui lòng thử lại sau.',
                    details: data,
                };
        }
    }

    // Unknown error
    return {
        code: ERROR_CODES.SERVER_ERROR,
        message: error.message || 'Đã xảy ra lỗi không xác định',
        details: error,
    };
};

// Helper để kiểm tra response có dữ liệu không
export const hasData = <T>(response: ApiResponse<T[]>): boolean => {
    return response.success && Array.isArray(response.data) && response.data.length > 0;
};

// Helper để lấy dữ liệu hoặc mảng rỗng
export const getDataOrEmpty = <T>(response: ApiResponse<T[]>): T[] => {
    return response.success && Array.isArray(response.data) ? response.data : [];
};

// Helper để lấy dữ liệu hoặc null
export const getDataOrNull = <T>(response: ApiResponse<T | null>): T | null => {
    return response.success ? response.data : null;
};
